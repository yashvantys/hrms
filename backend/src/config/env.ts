export default {
    jwtSecret: process.env.JWT_SECRET!,
    jwtRefresh: process.env.JWT_REFRESH_TOKEN!,
    bcryptRounds: Number(process.env.BCRYPT_SALT_ROUNDS ?? 10),
}