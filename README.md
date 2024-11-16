# Notes app backend

## Description

Backend built with NestJS for a markdown-based notes application. It allows users to create, read, update, and delete notes stored in a PostgreSQL database with markdown formatting. Features include user authentication, note pinning, and retrieval of notes by user. The application is designed for easy export and integration with other services.

## Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/notes-backend.git
    cd notes-backend
    ```
2. **Install dependencies**
    ```bash
    npm install
    ```
3. **Configure environment variables**
    - Rename `.env.example` to `.env` and fill in the required values.
4. **Run database migrations**
    ```bash
    npm run typeorm migration:run
    ```
5. **Start the application**
    ```bash
    npm run start:dev
    ```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Features

- **CRUD Operations**: Create, read, update, and delete notes.
- **User Authentication**: Register and log in users securely.
- **Note Pinning**: Pin important notes for quick access.
- **Markdown Support**: Write notes in Markdown format.
- **Search and Filter**: Easily find notes by title or content.
- **Export**: Export notes for backup or migration.

## Usage

### API Endpoints

- **List All Notes**
    ```http
    GET /notes
    ```
- **Create a New Note**
    ```http
    POST /notes
    Content-Type: application/json

    {
      "title": "Sample Note",
      "content": "This is a sample markdown **note**.",
      "userId": "user-id-123",
      "isPinned": false
    }
    ```
- **Update a Note**
    ```http
    PUT /notes/:id
    Content-Type: application/json

    {
      "title": "Updated Note",
      "content": "Updated content.",
      "isPinned": true
    }
    ```
- **Delete a Note**
    ```http
    DELETE /notes/:id
    ```

## Technologies

- **NestJS**: Framework for building efficient and scalable server-side applications.
- **TypeORM**: ORM for managing database interactions.
- **PostgreSQL**: Relational database system.
- **JWT**: For secure user authentication.
- **Swagger**: API documentation and testing.
- **Jest**: Testing framework.

## Contributing

1. **Fork the repository**
2. **Create a new branch**
    ```bash
    git checkout -b feature/YourFeature
    ```
3. **Commit your changes**
    ```bash
    git commit -m "Add your message"
    ```
4. **Push to the branch**
    ```bash
    git push origin feature/YourFeature
    ```
5. **Open a Pull Request**

## Contact

- **Author**: [Domen Gnezda](https://www.linkedin.com/in/domen-gnezda/)

## License

This project is licensed under the [MIT License](LICENSE).
