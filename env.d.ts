declare namespace NodeJS {
  interface ProcessEnv {
    POSTGRES_PASSWORD: string,
    POSTGRES_USER: string,
    POSTGRES_HOST: string,
    POSTGRES_PORT: string;
    POSTGRES_DATABASE: string;
  }
}
