
import Navbar from "@/components/navbar/Navbar";
import SignedIn from "@/components/auth/SignedIn";
import SignedOut from "@/components/auth/SignedOut";
import UserInfo from "@/components/auth/UserInfo";
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <>
      <Navbar>
        <SignedOut>
          <Link href="/sign-in?lastHref=/read">
            <Button
              variant={"outline"}
              className="rounded-full h-[3.5rem] w-[3.5rem]"
              size={'icon'}
            >
              <User className="h-[2rem] w-[2rem]" />
            </Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserInfo />
        </SignedIn>
      </Navbar>

      {children}
    </>
  )
}