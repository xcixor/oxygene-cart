import zod from "zod";

const envSchema = zod.object({
  API_BASE_URL: zod.string().min(1, "API base URL is required"),
});
export const env = envSchema.parse(process.env);