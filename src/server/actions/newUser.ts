"use server";

import parseNewUser from "@/utils/forms/parse-newUser";
import {redirect} from "next/navigation";
import auth from "@/utils/functools/auth";
import {db} from "@/server/db";
import generateURLPath from "@/utils/helpers/generateURLPath";

export default async function Action_NewUser(_state: NonNullable<unknown>, formData: FormData) {

    //  imitate delay
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    const session = await auth()

    const {
        success,
        data
    } = await parseNewUser(formData);

    if (!success) {
        return {
            error: "Invalid data",
        };
    }

    await db.shortenedURL.create({
        data: {
            originalURL: data.url,
            path: await generateURLPath(),
            user: {
                connect: {
                    id: session.user.id
                }
            }
        }
    })


    redirect("/dashboard")
}