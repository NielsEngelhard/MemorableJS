export function isDevelopmentEnvironment(): boolean {
    return process.env.NEXT_PUBLIC_ENVIRONMENT == "DEV";
}