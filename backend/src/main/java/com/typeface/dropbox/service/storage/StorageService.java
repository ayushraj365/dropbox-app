package com.typeface.dropbox.service.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface StorageService {
    String storeFile(MultipartFile file) throws IOException;
    Resource loadFile(String path);
    void deleteFile(String path);
}
