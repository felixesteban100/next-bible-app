"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export const TextGenerateEffect = ({
    words,
    filter = true,
    selectedFontSize,
    chapter,
    verses,
}: {
    words: string;
    className?: string;
    filter?: boolean;
    selectedFontSize: SelectedFontSize;
    chapterIndex: number;
    chapter: Chapter;
    verses: number[];
}) => {

    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const playVersesDurationParam = parseFloat(params.get("playVersesDuration") ?? "1")
    const continousLine = params.get("continousLine") === "true"

    const [scope, animate] = useAnimate();
    // let wordsArray = words.split(" ");
    let versesArray = words.split(/\d+/).filter(Boolean);
    useEffect(() => {
        animate(
            "span",
            {
                opacity: 1,
                filter: filter ? "blur(0px)" : "none",
            },
            {
                duration: playVersesDurationParam,
                delay: stagger(0.1),
            }
        );
    }, [animate, filter, playVersesDurationParam]);

    // console.log("words", words)

    return (
        <motion.div ref={scope} className={`${continousLine ? "space-x-4" : "flex flex-col gap-2"} `}>
            {versesArray.map((word, i) => {
                const verseNumber = i + 1
                if (verses.length !== 0 && !verses.includes(verseNumber)) return null
                const isPsalmsAndVerseNumber1 = chapter.route_object.book_id === 19 && verseNumber === 1

                const words: string[] = word.split(" ");

                return (
                    <span key={verseNumber} className={`${selectedFontSize.text} `}>
                        <span
                            className={`${verseNumber === 1 && selectedFontSize.firstVerse} text-primary font-bold`}
                        >
                            {isPsalmsAndVerseNumber1 ? chapter.verses_content[0][0]
                                : verseNumber === 1 ? `${chapter.route_object.chapter_id} `
                                    : verseNumber + " "
                            }
                        </span>
                        {isPsalmsAndVerseNumber1 ? null : " "}
                        {words.map((word, indexWord) => {
                            return (
                                <motion.span
                                    key={verseNumber + indexWord}
                                    className={` leading-relaxed opacity-15`}
                                    style={{
                                        filter: filter ? "blur(10px)" : "none",
                                    }}
                                >
                                    {isPsalmsAndVerseNumber1 && indexWord === 1 ? `${word.slice(1)}` : word}{" "}
                                </motion.span>
                            )
                        })}
                    </span>
                )

                /* return (
                    <motion.span
                        id={`${verseNumber}`}
                        key={word + i}
                        className={`${selectedFontSize.text} leading-relaxed opacity-15`}
                        style={{
                            filter: filter ? "blur(10px)" : "none",
                        }}
                    >
                        <motion.span
                            className={`${verseNumber === 1 && `${selectedFontSize.firstVerse}`} text-primary font-bold`}
                        >
                            {isPsalms ? chapter.verses_content[0][0]
                                : verseNumber === 1 ? `${chapter.route_object.chapter_id} `
                                    : verseNumber + " "
                            }
                        </motion.span>
                        {isPsalms ? `${word.slice(2)}` : word}
                    </motion.span>
                ); */
            })}
        </motion.div>
    );
};
