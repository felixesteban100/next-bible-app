import { bibleBooks } from "./bibleBooks";

function removeAccents(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function extractBibleBook(reference: string, version: string): number | null {
    // // Regular expression to match the book name
    // const regex = /^(\d*\s?[A-Za-z]+(?:\s[A-Za-z]+)*)/;

    // const match = reference.match(regex);

    // if (match) {
    //     const bookName = normalizeName(match[1]);
    //     console.log(bookName)
    //     console.log(Object.entries(bibleBooks[version]).find(([key, value]) => normalizeName(value) === bookName))
    //     return parseInt(Object.entries(bibleBooks[version]).find(([key, value]) => normalizeName(value) === bookName)![0]) ?? null;
    //     // return 0
    // } else {
    //     return null;
    // }

    // Regular expression to match the book name
    const regex = /^(\d*\s?[A-Za-z]+(?:\s[A-Za-z]+)*)/;

    const match = removeAccents(reference).match(regex);

    if (match) {
        const bookName = removeAccents(match[1].trim());

        // Find the book name in the specified version
        const bookMap = bibleBooks[version];
        if (bookMap) {
            const entry = Object.entries(bookMap).find(([key, value]) => removeAccents(value) === bookName);

            if (entry) {
                // console.log(entry)
                // Return the numeric key for the book
                return parseInt(entry[0]) || null;
            }
        }

        // Optionally handle the case where the book is not found in the specified version
        // console.log(`Book (${match[1]}) not found in ${version}`);
        return null;
    } else {
        return null;
    }
}

export function getChapterNumber(input: string): number | null {
    // Strip any leading numbers and spaces
    const cleanedInput = input.replace(/^\d+\s*/, '');

    // Match the chapter number
    const match = cleanedInput.match(/(?:\s|^)(\d+)(?=\s|$|:)/);

    if (match) {
        return parseInt(match[1], 10);
    }

    return null;
}

export function extractBibleVerses(input: string): number[] {
    // Define a regex pattern to match Bible verse references
    const versePattern = /(\w+ \d+:\d+(-\d+)?(?:,\s*\d+(-\d+)?)*|\w+ \d+:\d+(\s*and\s*\d+)?(?:,\s*\d+(\s*and\s*\d+)*)*)/g;
    // const versePattern = /(\w+\s*\d+:\d+(\s*-\s*\d+)?(?:\s*,\s*\d+(\s*-\s*\d+)?)*|\w+\s*\d+:\d+(\s*and\s*\d+)?(?:\s*,\s*\d+(\s*and\s*\d+)*)*)/g;
    // const versePattern = /:\d+/g;

    // Extract all matches from the input string
    const matches = input.match(versePattern);
    if (!matches) return [];

    const versesToReturn: number[]/* BibleVerse[] */ = [];


    matches.forEach((match) => {
        // Split each match by commas to handle multiple references
        const refs = match.split(/,\s*/);

        refs.forEach((ref) => {
            // Extract the book, chapter, and verses
            const [_, versePart] = ref.split(/:\s*/);
            if (versePart) {
                versesToReturn.push(...extractVerses(versePart))
            }
        });
    });

    return versesToReturn;
}

function extractVerses(part: string): number[] {
    const result: number[] = [];

    // Handle single verse or range
    if (part.includes('-')) {
        const [start, end] = part.split('-').map(v => parseInt(v, 10));
        for (let i = start; i <= end; i++) {
            result.push(i);
        }
    } else if (part.includes('and')) {
        const [start, end] = part.split('and').map(v => parseInt(v, 10));
        result.push(start, end);
    } else {
        result.push(parseInt(part, 10));
    }

    return result;
}

export function translateRouteString(routeString: string, version: string): string {
    // Parse the route string
    const parts = routeString.split('-');
    if (parts.length !== 3) {
        // throw new Error('Invalid route string format');
        return ''
    }

    // const version = parts[0]; // We can ignore the version for this translation
    const bookNumber = parseInt(parts[1], 10);
    const chapterNumber = parseInt(parts[2], 10);

    // Lookup the book name
    const bookName = bibleBooks[version][bookNumber];
    if (!bookName) {
        // throw new Error('Invalid book number');
        return ''
    }

    // Return the formatted string
    return `${bookName} ${chapterNumber}`;
}