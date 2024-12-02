const API_URL = 'http://localhost:8080/api';

export const fileApi = {
    uploadFile: async (file: File) => {
        if (file.size > 10 * 1024 * 1024) {
            throw new Error('File size exceeds 10MB limit');
        }
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch(`${API_URL}/files/upload`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Upload failed');
        }
        return response;
    },
    
    getFiles: () => fetch(`${API_URL}/files`).then(res => res.json()),
    
    downloadFile: (fileId: number) => 
        fetch(`${API_URL}/files/download/${fileId}`),
        
    deleteFiles: (fileIds: number[]) =>
        fetch(`${API_URL}/files/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fileIds)
        })
}; 