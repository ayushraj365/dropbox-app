package com.typeface.dropbox.service;

import com.typeface.dropbox.model.FileEntity;
import com.typeface.dropbox.repository.FileRepository;
import com.typeface.dropbox.service.storage.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FileService {
    private final FileRepository fileRepository;
    private final StorageService storageService;
    
    public FileEntity uploadFile(MultipartFile file) throws Exception {
        String storagePath = storageService.storeFile(file);
        
        FileEntity fileEntity = new FileEntity();
        fileEntity.setFileName(file.getOriginalFilename());
        fileEntity.setFileType(file.getContentType());
        fileEntity.setSize(file.getSize());
        fileEntity.setFilePath(storagePath);
        fileEntity.setUploadTime(LocalDateTime.now());
        
        return fileRepository.save(fileEntity);
    }
    
    public List<FileEntity> getAllFiles() {
        return fileRepository.findAll();
    }
    
    public Resource downloadFile(Long fileId) {
        FileEntity fileEntity = fileRepository.findById(fileId)
            .orElseThrow(() -> new RuntimeException("File not found"));
        return storageService.loadFile(fileEntity.getFilePath());
    }
    
    public void deleteFiles(List<Long> fileIds) {
        List<FileEntity> files = fileRepository.findAllById(fileIds);
        for (FileEntity file : files) {
            storageService.deleteFile(file.getFilePath());
        }
        fileRepository.deleteAllById(fileIds);
    }
} 