import Fastify from "fastify";

const app = Fastify({
    logger: true,
});

app.get('/health', async () => {
    return {
        success: true,
        message: 'HRMS Backend Running',
        timestamp: new Date().toISOString(),
    };
});

export default app;