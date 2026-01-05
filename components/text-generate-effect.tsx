"use client";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "@/lib/navigation"

export const TextGenerateEffect = ({
    words,
    selectedFontSize,
    chapter,
    verses,
    next_chapter,
}: {
    words: string;
    className?: string;
    selectedFontSize: SelectedFontSize;
    chapterIndex: number;
    chapter: Chapter;
    verses: number[];
    next_chapter: string
}) => {
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const playVersesDurationParam = parseFloat(params.get("playVersesDuration") ?? "1")
    const { push } = useRouter()

    const versesArray = words.split(/\d+/).filter(Boolean);

    const delayOfEachVerse = versesArray.map((sentence) => {
        const commas = (sentence.match(/[,]/g) ?? []).length;
        const periods = (sentence.match(/[.]/g) ?? []).length;
        const semicolons = (sentence.match(/[;]/g) ?? []).length;

        const sentenceLength = sentence.length;
        const wordCount = sentence.split(" ").length;

        const baseTime = wordCount / (250 / 60); // Faster base speed (~250 WPM)
        const avgWordFactor = sentenceLength / (5 * wordCount); // Adjust for longer words

        let readingTime = (baseTime * avgWordFactor) / playVersesDurationParam; // Lower time for faster reading

        // If pauses are considered, add a small delay (5-10% of the total time)

        if (commas > 0) readingTime += commas;
        if (periods > 0) readingTime += parseFloat(`${periods}.7`);
        if (semicolons > 0) readingTime += parseFloat(`${semicolons}.5`);

        return readingTime
    })

    const [visibleItems, setVisibleItems] = useState<number[]>([]);

    useEffect(() => {
        const animateSequentially = async () => {
            for (let i = 0; i < versesArray.length; i++) {
                setVisibleItems((prev) => [...prev, i + 1]); // Show current item
                await new Promise((resolve) => setTimeout(resolve, 400 + delayOfEachVerse[i] * 750)); // Wait for animation + delay

                // console.log(next_chapter, i === versesArray.length)
                // if (i === versesArray.length) {
                //     params.set("search", next_chapter);
                //     params.set('verseToHighlight', `${0}`);
                //     push(`/read?${params.toString()}`)
                // }
            }
        };

        animateSequentially();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {versesArray.map((verse, i) => {
                const verseNumber = i + 1
                if (verses.length !== 0 && !verses.includes(verseNumber)) return null
                const isPsalmsAndVerseNumber1 = chapter.route_object.book_id === 19 && verseNumber === 1

                const words: string[] = verse.match(/[^.,;!?]+[.,;!?]?/g) || [];
                return (
                    <motion.div
                        key={verseNumber}
                        id="verse"
                        className={`${selectedFontSize.text} inline`}
                        initial={{ opacity: 0.5 }}
                        animate={visibleItems.includes(verseNumber) ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <div
                            className={`inline ${verseNumber === 1 && selectedFontSize.firstVerse} text-primary font-bold`}
                        >
                            {isPsalmsAndVerseNumber1 ? chapter.verses_content[0][0]
                                : verseNumber === 1 ? `${chapter.route_object.chapter_id} `
                                    : verseNumber + " "
                            }
                        </div>
                        {isPsalmsAndVerseNumber1 ? null : " "}
                        {words.map((sentence, indexWord) => {
                            return (
                                <span
                                    key={verseNumber + indexWord + sentence}
                                    className={`leading-relaxed`}
                                >
                                    {isPsalmsAndVerseNumber1 && indexWord === 0 ? `${sentence.slice(2)}` : sentence}
                                </span>
                            )
                        })}
                    </motion.div>
                )
            })}
        </>
    );
};
