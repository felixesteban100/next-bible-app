import { auth } from "@/auth"
import { ReactNode } from "react"

export default async function SignedOut({ children }: { children: ReactNode }) {
    const session = await auth()

    if (session) {
        return (
            <>
            </>
        )
    }

    return (
        <>
            {children}
        </>
    )
}