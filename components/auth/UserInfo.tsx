import { auth } from "@/auth"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { SignIn } from "./sign-in"

export default async function UserInfo() {
    const session = await auth()

    if (!session?.user) return null

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full">
                <Image
                    src={session.user.image!}
                    className="rounded-full h-8 w-8"
                    alt="user_image"
                    width={500}
                    height={500}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="backdrop-blur-md bg-background/50">
                <div className="flex gap-5 justify-start items-center p-5">
                    <Image
                        src={session.user.image!}
                        className="rounded-full h-14 w-14"
                        alt="user_image"
                        width={500}
                        height={500}
                    />
                    <div>
                        <p className="font-bold">{session.user.name}</p>
                        <p>{session.user.email}</p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <div className="w-full flex justify-center p-3">
                    <SignIn />
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
