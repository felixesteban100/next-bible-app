"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { useSearchParams } from "next/navigation";
// import { cn } from "@/lib/utils";

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

    // let wordsArray = words.split(" ");
    let versesArray = words.split(/\d+/).filter(Boolean);


    return (
        <span /* ref={scope} */ className={`${continousLine ? "space-x-4" : "flex flex-col gap-2"} `}>
            {versesArray.map((word, i) => {
                return <VerseScope
                    key={word + i}
                    word={word}
                    i={i}
                    selectedFontSize={selectedFontSize}
                    chapter={chapter}
                    verses={verses}
                    playVersesDurationParam={playVersesDurationParam}
                />

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
        </span>
    );
};


function VerseScope({ playVersesDurationParam, word, i, verses, chapter, selectedFontSize }: { playVersesDurationParam: number, word: string, i: number, verses: number[], chapter: Chapter, selectedFontSize: SelectedFontSize }) {
    const [scope, animate] = useAnimate();
    useEffect(() => {
        animate(
            // "span",
            scope.current.children,
            {
                opacity: 1,
                filter: true ? "blur(0px)" : "none",
            },
            {
                duration: playVersesDurationParam,
                delay: stagger(i + 2),
            }
        );
    }, [scope, animate, playVersesDurationParam, i]);
    // console.log(word)
    // console.log(i + 2)

    const verseNumber = i + 1
    if (verses.length !== 0 && !verses.includes(verseNumber)) return null
    const isPsalmsAndVerseNumber1 = chapter.route_object.book_id === 19 && verseNumber === 1

    // const words: string[] = word.split(" ");
    const words: string[] = word.match(/[^.,;!?]+[.,;!?]?/g) || [];

    return (
        <span key={verseNumber} className={`${selectedFontSize.text} `}>
            <span
                className={`${verseNumber === 1 && selectedFontSize.firstVerse} text-primary font-bold opacity-15`}
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
                        className={`leading-relaxed opacity-15`}
                    >
                        {/* {isPsalmsAndVerseNumber1 && indexWord === 1 ? `${word.slice(1)}` : word}{" "} */}
                        {isPsalmsAndVerseNumber1 && indexWord === 1 ? `${word.slice(1)}` : word}<span className="text-green-500">{"**pause**"}</span>
                    </motion.span>
                )
            })}
        </span>
    )
}