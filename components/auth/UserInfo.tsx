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

    if (!session?.user) return <p>Error with user info</p>

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full h-[3.5rem] w-[3.5rem]">
                <Image
                    src={session.user.image!}
                    className="rounded-full h-full w-full"
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
                        <p className="font-bold text-2xl">{session.user.name}</p>
                        <p className="text-xl">{session.user.email}</p>
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
