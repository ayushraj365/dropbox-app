package com.typeface.dropbox.repository;

import com.typeface.dropbox.model.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<FileEntity, Long> {
    boolean existsByFileName(String fileName);
} 