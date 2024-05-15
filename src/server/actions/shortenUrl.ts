"use server";
import auth from "@/utils/functools/auth";
import parseNewUser from "@/utils/forms/parse-shortenUrl";
import generateURLPath from "@/utils/helpers/generateURLPath";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";

export default async function Action_ShortenUrl(
  _state: NonNullable<unknown>,
  formData: FormData,
) {
  const session = await auth();

  const { success, data, error } = await parseNewUser(formData);

  if (!success) {
    return {
      error: {
        url: error?.errors.find((e) => e.path[0] === "url")?.message,
        alias: error?.errors.find((e) => e.path[0] === "alias")?.message,
      },
    };
  }

  const path = data.alias ?? (await generateURLPath());

  await db.shortenedURL.create({
    data: {
      originalURL: data.url,
      path,
      user: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });

  revalidatePath("/dashboard");

  return {
    error: {
      url: "",
      alias: "",
    },
  };
}
