
type VersesDisplayerProps = {
    chapter: Chapter | null,
    selectedFontSize: {
        firstVerse: string,
        text: string
    },
    verses: number[],
    error_message: string
}

export default function VersesDisplayer({ chapter, selectedFontSize, verses, error_message }: VersesDisplayerProps) {
    if (!chapter) return <div>{error_message}</div>

    return (
        <div>
            {
                chapter.verses_content.map((c, i) => {
                    const verseNumber = i + 1
                    const verseJSX = (
                        <p key={chapter.verses_routes_string[i]} className={`${selectedFontSize.text} leading-relaxed`}>
                            <span
                                className={`${verseNumber === 1 && `${selectedFontSize.firstVerse} font-bold`}`}
                            >
                                {chapter.route_object.book_id === 19 && verseNumber === 1 ? chapter.verses_content[0][0]
                                    : verseNumber === 1 ? chapter.route_object.chapter_id
                                        : verseNumber
                                }
                            </span>
                            {" "}
                            {chapter.route_object.book_id === 19 && verseNumber === 1 ? `${c.slice(1)}` : c}
                        </p>
                    )
                    if (verses.length === 0) return (verseJSX)
                    if (!verses.includes(i + 1)) return null
                    return (verseJSX)
                })
            }
        </div>
    )

}


VersesDisplayer