"use client"

import { CopyCheck, CopyIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export default function CopyVersesButton({ verses }: { verses: string[] }) {
    const [isClicked, setIsClicked] = useState(false);

    function copyToClipboard() {
        navigator.clipboard.writeText(verses.join("\n"));
        setIsClicked(true);
        setTimeout(() => {
            setIsClicked(false);
        }, 1000); // Duration of the animation
    };

    return (
        <>
            <Button
                onClick={() => copyToClipboard()}
                className={`transition-all ${isClicked ? 'scale-125' : 'scale-100'} duration-300`}
            >
                {isClicked ? <CopyCheck /> : <CopyIcon />}
            </Button>
        </>
    )
}
