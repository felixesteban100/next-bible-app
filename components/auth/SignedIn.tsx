import { auth } from "@/auth"
import { ReactNode } from "react"

export default async function SignedIn({ children }: { children: ReactNode }) {
    const session = await auth()

    if (session) {
        return (
            <>
                {children}
            </>
        )
    }

    return (
        <>
        </>
    )
}
