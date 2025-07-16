import { z } from "zod";

const EnvSchema = z.object({
  VITE_API_URL: z.string().url(),
  // retorna um booleano.
  VITE_ENABLE_API_DELAY: z.string().transform((value) => value === "true"),
});

export const env = EnvSchema.parse(import.meta.env);
