import { z } from "zod";
import { config } from "dotenv";

config();

const schema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.number().default(3000),
  DATABASE_URI: z.string(),
  JWT_SECRET_KEY: z.string(),
  CLIENT_URL: z.string(),
});

const _env = schema.safeParse(process.env);

if(_env.success === false) {
    console.error('❌ Invalid environment variables!', _env.error.format())

    throw new Error('Invalid environment variables.')
}

export const env = _env.data;