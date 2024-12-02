import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { fileApi } from '../api/fileApi';
import './FileManager.css';

interface FileEntity {
  id: number;
  fileName: string;
  fileType: string;
  size: number;
  uploadTime: string;
}

export const FileManager: React.FC = () => {
  const [files, setFiles] = useState<FileEntity[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileIds, setSelectedFileIds] = useState<number[]>([]);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      loadFiles();
      isMounted.current = true;
    }
  }, []);

  const loadFiles = async () => {
    try {
      const data = await fileApi.getFiles();
      setFiles(data);
      setSelectedFileIds([]);
    } catch (error) {
      toast.error('Error loading files');
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size exceeds 10MB limit');
        setSelectedFile(null);
        fileInput.value = '';
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    try {
      await fileApi.uploadFile(selectedFile);
      toast.success('File uploaded successfully');
      loadFiles();
      setSelectedFile(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Upload failed');
    }
  };

  const handleDownload = async (fileId: number, fileName: string) => {
    try {
      const response = await fileApi.downloadFile(fileId);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedFileIds.length === 0) return;
    try {
      await fileApi.deleteFiles(selectedFileIds);
      toast.success('Files deleted successfully');
      loadFiles();
    } catch (error) {
      toast.error('Error deleting files');
    }
  };

  const toggleFileSelection = (fileId: number) => {
    setSelectedFileIds(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  return (
    <div className="file-manager-container">
      <div className="action-buttons">
        <input type="file" onChange={handleFileSelect} />
        <button 
          onClick={handleUpload}
          disabled={!selectedFile}
          className="upload-button"
        >
          Upload
        </button>
        <button 
          onClick={handleDeleteSelected}
          disabled={selectedFileIds.length === 0}
          className="delete-button"
        >
          Delete Selected
        </button>
      </div>

      <div className="files-grid">
        {files.map((file) => (
          <div key={file.id} className={`file-item ${selectedFileIds.includes(file.id) ? 'selected' : ''}`}>
            <input
              type="checkbox"
              checked={selectedFileIds.includes(file.id)}
              onChange={() => toggleFileSelection(file.id)}
            />
            <span>{file.fileName}</span>
            <span>{(file.size / 1024).toFixed(2)} KB</span>
            <button
              onClick={() => handleDownload(file.id, file.fileName)}
              className="download-button"
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}; 