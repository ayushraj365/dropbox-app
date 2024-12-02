
## API Endpoints

- `POST /api/files/upload` - Upload a file
- `GET /api/files` - Get all files
- `GET /api/files/download/{id}` - Download a specific file
- `DELETE /api/files/delete` - Delete multiple files

## Storage Configuration

Files are stored locally in the `uploads` directory by default. The storage configuration can be modified in the application properties file.

## Security Note

This is a basic implementation and should not be used in production without proper security measures:

1. The CORS configuration is currently set to allow all origins
2. No authentication/authorization is implemented
3. File validation is basic

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
