import { BookOpen } from "lucide-react";
import { pageMarginAndWidth } from "@/lib/constants";

"h-[3rem] w-auto"

export default function NavbarSkeleton() {
    return (
        <div>
            <div className="bg-secondary/70 backdrop-blur-md p-2 h-fit">
                <nav className={`flex items-center justify-between ${pageMarginAndWidth} min-h-[4rem] gap-5 py-5`}>
                    <div className="flex justify-between gap-10 items-center">
                        <div className={`h-[4rem]`}>
                            <BookOpen className="h-full w-auto" />
                        </div>
                    </div>

                    <div className="flex gap-5 items-center">
                        <div className="bg-background border-foreground border-[0.5px] rounded-full h-[3.5rem] w-[3.5rem] animate-pulse" />
                        <div className="bg-background border-foreground border-[0.5px] rounded-full h-[3.5rem] w-[3.5rem] animate-pulse" />
                        <div className="bg-background border-foreground border-[0.5px] rounded-full h-[3.5rem] w-[3.5rem] animate-pulse" />
                        <div className="bg-background border-foreground border-[0.5px] rounded-full h-[3.5rem] w-[3.5rem] animate-pulse" />
                    </div>
                </nav>
            </div>
        </div>

    )
}