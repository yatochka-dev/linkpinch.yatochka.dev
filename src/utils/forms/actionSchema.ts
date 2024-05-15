import { type z } from "zod";
import { newUserSchema } from "@/utils/forms/parse-newUser";

export default async function actionSchema(
  schema: z.ZodObject<never>,
  formData: FormData,
) {
  const entries = Object.fromEntries(formData);
  return await newUserSchema.safeParseAsync(entries);
}
