package com.typeface.dropbox;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import com.typeface.dropbox.config.StorageConfig;

@SpringBootApplication
@EnableConfigurationProperties(StorageConfig.class)
public class DropboxApplication {

	public static void main(String[] args) {
		SpringApplication.run(DropboxApplication.class, args);
	}

}
