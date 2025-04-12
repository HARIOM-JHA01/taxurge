const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export function verifyAdminPassword(password: string): boolean {
    return password === ADMIN_PASSWORD && password.length === 16;
}
