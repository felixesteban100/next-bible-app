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

    const [scope, animate] = useAnimate();
    // let wordsArray = words.split(" ");
    let versesArray = words.split(/\d+/).filter(Boolean);
    useEffect(() => {
        const verses = scope.current?.querySelectorAll("#verse");

        if (verses) {
            verses.forEach((verse: HTMLDivElement) => {
                const spans = verse.querySelectorAll("span");

                // getting closer to the goeal of making it as fast as the reader goes

                if (spans) {
                    spans.forEach((span: HTMLSpanElement) => {
                        const sentence = span.textContent ?? "";
                        const hasComma = /[,]$/.test(sentence);
                        const hasPeriod = /[.]$/.test(sentence);
                        const hasSemicolon = /[;]$/.test(sentence);

                        const textLength = (sentence).length; // Get the length of each string
                        const howManyWords = (sentence).split(" ").length; // Get the length of each string
                        const delay = estimateReadingTime(textLength, howManyWords, playVersesDurationParam, hasComma, hasPeriod, hasSemicolon)//Math.max(0.2, textLength * 0.05); // Calculate delay based on length, ensuring a minimum delay
                        console.log(sentence, delay)

                        animate(
                            span,
                            {
                                opacity: 1,
                            },
                            {
                                duration: 1,
                                // delay: stagger(delay, { from: 0 }),
                                delay: stagger(delay),
                            }
                        );
                    });
                }
            });
        }
    }, [scope, animate, playVersesDurationParam]);

    function estimateReadingTime(sentenceLength: number, wordCount: number, speedMultiplier: number = 1, hasComma: boolean = false, hasPeriod: boolean = false, hasSemicolon: boolean = false,): number {
        if (speedMultiplier < 0.5 || speedMultiplier > 2) {
            throw new Error("Speed multiplier must be between 0.5x and 2x");
        }

        const baseTime = wordCount / (250 / 60); // Faster base speed (~250 WPM)
        const avgWordFactor = sentenceLength / (5 * wordCount); // Adjust for longer words

        let readingTime = (baseTime * avgWordFactor) / speedMultiplier; // Lower time for faster reading

        // If pauses are considered, add a small delay (5-10% of the total time)
        switch (true) {
            case hasComma:
                readingTime *= 1; // 10% extra time
                break;

            case hasPeriod:
                readingTime *= 1.7; // 20% extra time
                break;

            case hasSemicolon:
                readingTime *= 1.7; // 30% extra time
                break;
        }

        return readingTime;
    }

    return (
        <div ref={scope} className={`${continousLine ? "space-x-4" : "flex flex-col gap-2"} `}>
            {versesArray.map((word, i) => {
                const verseNumber = i + 1
                if (verses.length !== 0 && !verses.includes(verseNumber)) return null
                const isPsalmsAndVerseNumber1 = chapter.route_object.book_id === 19 && verseNumber === 1

                // const words: string[] = word.split(" ");
                const words: string[] = word.match(/[^.,;!?]+[.,;!?]?/g) || [];
                return (
                    <div id="verse" key={verseNumber} className={`${selectedFontSize.text} inline`}>
                        <div
                            // className={`${verseNumber === 1 && selectedFontSize.firstVerse} text-primary font-bold opacity-15`}
                            className={`inline ${verseNumber === 1 && selectedFontSize.firstVerse} text-primary font-bold`}
                        >
                            {isPsalmsAndVerseNumber1 ? chapter.verses_content[0][0]
                                : verseNumber === 1 ? `${chapter.route_object.chapter_id} `
                                    : verseNumber + " "
                            }
                        </div>
                        {isPsalmsAndVerseNumber1 ? null : " "}
                        {words.map((word, indexWord) => {
                            return (
                                <motion.span
                                    key={verseNumber + indexWord}
                                    className={`leading-relaxed opacity-15`}
                                >
                                    {/* {isPsalmsAndVerseNumber1 && indexWord === 1 ? `${word.slice(1)}` : word}{" "} */}
                                    {isPsalmsAndVerseNumber1 && indexWord === 0 ? `${word.slice(2)}` : word}{/* {"**pause**"} */}
                                </motion.span>
                            )
                        })}
                    </div>
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
        </div>
    );
};
