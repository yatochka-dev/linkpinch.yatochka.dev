import {z} from "zod";


export const newUserSchema = z.object({
    url: z.string().url(),
})
export default async function parseNewUser(_: FormData): Promise<z.SafeParseReturnType<z.infer<typeof newUserSchema>, z.infer<typeof newUserSchema>>> {
    const entries = Object.fromEntries(_);
    return await newUserSchema.safeParseAsync(entries);
}