import en from '../messages/en.json';
type Messages = typeof en;

declare global {
    // Use type safe message keys with `next-intl`
    interface IntlMessages extends Messages { }

    declare type Book = {
        route_string: string // format: `${VERSION_INITIALS}-${BOOK_ID}`  
        route_object: {
            version_initials: number,
            book_id: number
        },

        chapters_routes_string: string[]
        description: string,
        name: string,
        initials: string,
        written_by: string,
        date_written: string,
        type_of_written: string,
        // characters: string[]
    }
    declare type Chapter = {
        route_string: string // format: `${VERSION_INITIALS}-${BOOK_ID}-${CHAPTER_ID}`
        route_object: {
            version_initials: string,
            book_id: number,
            chapter_id: number
        },
        verses_routes_string: string[],
        verses_content: string[]
        footnotes: { verse_route_string: string, content: string }[]
        matchingIndices?: number[]
    }
    declare type Version = {
        initials: string,
        name: string,
        year: number,
        date: Date,
        language: string,
        books_routes_string: string[]
    }


    declare type SelectedFontSize = { text: string, firstVerse: string, icon: string, gap_between_elements: string, aligmentForFlexElements: string }
}