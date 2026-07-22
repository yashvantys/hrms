import app from "./app.js";
import prisma from "./config/database.js";

const start = async () => {
    try {
        await prisma.$connect()
        console.log('Database connected successfully!')
        await app.listen({
            port: 3000,
            host: "0.0.0.0",
        });

        console.log("Server running on http://localhost:3000");
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();