# Installation
First of all, you need to download Nodejs, you can do this [here](https://nodejs.org/en/download)
Always prefer to download the latest versions.

After downloading the project, you can open each folder and do:

`npm install`<br>
`npm install -g tsc`

## Client-side
To run the clint-side of the project, you need to type:
`npm run start` for development or `npm run build` for production.

## Server-side
To run the server-side of the project, you need to type:
`npm run start` for development or `npm run dev` for production.

Also, you need to set the environment variables listed below:
1. **DATABASE_URI**: The database URI to connect to your database, that needs to be a MongoDB connection. You can create an [MongoDB Account](https://www.mongodb.com/) and create a new database or use [MongoDB Community Server](www.mongodb.com/try/download/community) to use it locally. This has to be a string.

2. **JWT_SECRET_KEY**: The secret to be used in JWT encryption. This has to be a string.

3. **CLIENT_URL**: The URL of your client-side application. Don't forget to add https:// or https://. This also needs to be a string.
