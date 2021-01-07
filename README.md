# AuthAndMulterApp

MEAN stack App with passport local nad social authorization.

## Description
App written with MEAN Stack(MongoDB, Express, Angular, Node.js) contains passport session authentication, passport oauth-google, API REST and adding files to database with multer/gridFs. Frontend created with Angular material components, formly forms, ngx-dropzone.
### Usage
To run create .env file with 'mongoUri' variable to connect to mongodb database and Api Keys and secret(Google client) and secret sessions: 
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- sessionSecret
```bash
# Run the client & server with concurrently
yarn dev

# Run the Express server only
yarn server

# Run the React client only
ng serve --open

# Server runs on http://localhost:4000 and client on http://localhost:4200