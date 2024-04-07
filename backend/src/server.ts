import { app } from "./app";
import { env } from "./env";

const server = app.listen(env.PORT, () => {
    console.log(`http://localhost:${env.PORT}`);
});

server.on('error', (error) => {
    throw new Error(error.message);
})