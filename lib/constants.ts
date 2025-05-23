export const DEFAULT_EN_VERSION = "NKJV" // "KJV"
export const DEFAULT_ES_VERSION = "RV1960"

export const fontSize: SelectedFontSize[] = [
    { text: 'text-xl', firstVerse: "text-3xl", icon: "h-[3rem] w-auto", gap_between_elements: "gap-5", aligmentForFlexElements: "flex-row" },
    { text: 'text-2xl', firstVerse: "text-4xl", icon: "h-[3rem] w-auto", gap_between_elements: "gap-5", aligmentForFlexElements: "flex-row" },
    { text: 'text-3xl', firstVerse: "text-5xl", icon: "h-[4rem] w-auto", gap_between_elements: "gap-5", aligmentForFlexElements: "flex-row" },
    { text: 'text-4xl', firstVerse: "text-6xl", icon: "h-[4rem] w-auto", gap_between_elements: "gap-10", aligmentForFlexElements: "flex-row" },
]
export const pageMarginAndWidth = "w-[90vw] lg:w-[83vw] mx-auto overflow-hidden max-w-[1700px] pt-5"

export type DAILY_VERSE_ROUTE_STRING = {
    "route_string": string,
    "verses": number[]
}

export const DAILY_VERSES_ROUTE_STRING: DAILY_VERSE_ROUTE_STRING[] = [
    { "route_string": "43-3", "verses": [16] },
    { "route_string": "50-4", "verses": [13] },
    { "route_string": "24-29", "verses": [11] },
    { "route_string": "45-8", "verses": [28] },
    { "route_string": "19-23", "verses": [1] },
    { "route_string": "1-1", "verses": [1] },
    { "route_string": "2-14", "verses": [14] },
    { "route_string": "20-3", "verses": [5, 6] },
    { "route_string": "23-40", "verses": [31] },
    { "route_string": "40-11", "verses": [28] },
    { "route_string": "19-46", "verses": [1] },
    { "route_string": "55-1", "verses": [7] },
    { "route_string": "45-15", "verses": [13] },
    { "route_string": "19-119", "verses": [105] },
    { "route_string": "59-1", "verses": [5] },
    { "route_string": "45-5", "verses": [8] },
    { "route_string": "62-4", "verses": [9] },
    { "route_string": "60-5", "verses": [7] },
    { "route_string": "23-41", "verses": [10] },
    { "route_string": "49-2", "verses": [8, 9] },
    { "route_string": "19-27", "verses": [1] },
    { "route_string": "58-11", "verses": [1] },
    { "route_string": "47-5", "verses": [17] },
    { "route_string": "40-6", "verses": [33] },
    { "route_string": "43-14", "verses": [6] },
    { "route_string": "19-118", "verses": [24] },
    { "route_string": "45-12", "verses": [2] },
    { "route_string": "48-5", "verses": [22, 23] },
    { "route_string": "46-13", "verses": [4, 5, 6, 7] },
    { "route_string": "51-3", "verses": [2] },
    { "route_string": "19-34", "verses": [8] },
    { "route_string": "20-31", "verses": [25] },
    { "route_string": "52-5", "verses": [16, 17, 18] },
    { "route_string": "6-1", "verses": [9] },
    { "route_string": "58-13", "verses": [5] },
    { "route_string": "19-19", "verses": [14] },
    { "route_string": "14-7", "verses": [14] },
    { "route_string": "40-7", "verses": [7] },
    { "route_string": "41-10", "verses": [27] },
    { "route_string": "62-1", "verses": [9] },
    { "route_string": "45-8", "verses": [1] },
    { "route_string": "46-10", "verses": [13] },
    { "route_string": "19-37", "verses": [4] },
    { "route_string": "23-43", "verses": [2] },
    { "route_string": "50-4", "verses": [6] },
    { "route_string": "46-16", "verses": [13] },
    { "route_string": "49-6", "verses": [10] },
    { "route_string": "19-55", "verses": [22] },
    { "route_string": "40-5", "verses": [14] },
    { "route_string": "19-121", "verses": [1, 2] },
    { "route_string": "45-3", "verses": [23] },
    { "route_string": "61-3", "verses": [9] },
    { "route_string": "19-62", "verses": [1] },
    { "route_string": "23-26", "verses": [3] },
    { "route_string": "43-16", "verses": [33] },
    { "route_string": "47-12", "verses": [9] },
    { "route_string": "58-4", "verses": [16] },
    { "route_string": "48-6", "verses": [9] },
    { "route_string": "50-1", "verses": [6] },
    { "route_string": "19-51", "verses": [10] },
    { "route_string": "2-20", "verses": [12] },
    { "route_string": "9-16", "verses": [7] },
    { "route_string": "20-4", "verses": [23] },
    { "route_string": "40-19", "verses": [26] },
    { "route_string": "23-55", "verses": [8, 9] },
    { "route_string": "43-10", "verses": [10] },
    { "route_string": "20-18", "verses": [10] },
    { "route_string": "19-139", "verses": [14] },
    { "route_string": "46-2", "verses": [9] },
    { "route_string": "19-139", "verses": [23, 24] },
    { "route_string": "24-33", "verses": [3] },
    { "route_string": "23-40", "verses": [29] },
    { "route_string": "55-3", "verses": [16, 17] },
    { "route_string": "19-9", "verses": [10] },
    { "route_string": "40-5", "verses": [16] },
    { "route_string": "19-30", "verses": [5] },
    { "route_string": "59-4", "verses": [7] },
    { "route_string": "45-6", "verses": [23] },
    { "route_string": "19-86", "verses": [5] },
    { "route_string": "58-12", "verses": [1, 2] },
    { "route_string": "50-4", "verses": [19] },
    { "route_string": "62-3", "verses": [1] },
    { "route_string": "20-15", "verses": [1] },
    { "route_string": "19-91", "verses": [4] },
    { "route_string": "23-54", "verses": [17] },
    { "route_string": "47-4", "verses": [16, 17] },
    { "route_string": "49-3", "verses": [20] },
    { "route_string": "43-15", "verses": [5] },
    { "route_string": "19-121", "verses": [7, 8] },
    { "route_string": "51-3", "verses": [23] },
    { "route_string": "48-2", "verses": [20] },
    { "route_string": "43-8", "verses": [32] },
    { "route_string": "20-16", "verses": [3] },
    { "route_string": "19-94", "verses": [19] },
    { "route_string": "60-2", "verses": [9] },
    { "route_string": "10-22", "verses": [31] },
    { "route_string": "23-43", "verses": [18, 19] },
    { "route_string": "53-3", "verses": [3] },
    { "route_string": "19-66", "verses": [19] },
    { "route_string": "62-4", "verses": [4] },
    { "route_string": "46-1", "verses": [30] },
    { "route_string": "50-2", "verses": [13] },
    { "route_string": "19-103", "verses": [12] },
    { "route_string": "59-1", "verses": [2, 3, 4] },
    { "route_string": "46-15", "verses": [57] },
    { "route_string": "45-8", "verses": [37] },
    { "route_string": "20-3", "verses": [7] },
    { "route_string": "23-49", "verses": [16] },
    { "route_string": "40-5", "verses": [44] },
    { "route_string": "19-100", "verses": [4] },
    { "route_string": "23-61", "verses": [1] },
    { "route_string": "45-6", "verses": [6] },
    { "route_string": "19-91", "verses": [1] },
    { "route_string": "19-18", "verses": [2] },
    { "route_string": "50-3", "verses": [13, 14] },
    { "route_string": "55-2", "verses": [15] },
    { "route_string": "19-16", "verses": [11] },
    { "route_string": "40-22", "verses": [37, 38, 39] },
    { "route_string": "60-1", "verses": [3] },
    { "route_string": "19-37", "verses": [23] },
    { "route_string": "43-14", "verses": [27] },
    { "route_string": "47-10", "verses": [4] },
    { "route_string": "45-13", "verses": [12] },
    { "route_string": "19-147", "verses": [3] },
    { "route_string": "42-1", "verses": [37] },
    { "route_string": "49-4", "verses": [29] },
    { "route_string": "60-1", "verses": [23] },
    { "route_string": "19-119", "verses": [11] },
    { "route_string": "19-73", "verses": [26] },
    { "route_string": "47-3", "verses": [17] },
    { "route_string": "46-13", "verses": [13] },
    { "route_string": "40-28", "verses": [19, 20] },
    { "route_string": "19-103", "verses": [2] },
    { "route_string": "43-1", "verses": [12] },
    { "route_string": "19-9", "verses": [1] },
    { "route_string": "20-11", "verses": [25] },
    { "route_string": "24-31", "verses": [3] },
    { "route_string": "19-145", "verses": [9] },
    { "route_string": "43-6", "verses": [35] },
    { "route_string": "52-4", "verses": [16, 17] },
    { "route_string": "19-40", "verses": [1, 2] },
    { "route_string": "20-18", "verses": [22] },
    { "route_string": "55-4", "verses": [7] },
    { "route_string": "19-34", "verses": [10] },
    { "route_string": "20-11", "verses": [30] },
    { "route_string": "42-10", "verses": [19] },
    { "route_string": "19-139", "verses": [7] },
    { "route_string": "40-6", "verses": [14, 15] },
    { "route_string": "19-107", "verses": [9] },
    { "route_string": "43-7", "verses": [38] },
    { "route_string": "45-10", "verses": [17] },
    { "route_string": "50-4", "verses": [8] },
    { "route_string": "40-6", "verses": [21] },
    { "route_string": "23-60", "verses": [1] },
    { "route_string": "19-68", "verses": [19] },
    { "route_string": "9-12", "verses": [24] },
    { "route_string": "20-22", "verses": [6] },
    { "route_string": "19-37", "verses": [5] },
    { "route_string": "43-4", "verses": [24] },
    { "route_string": "58-10", "verses": [23] },
    { "route_string": "19-31", "verses": [24] },
    { "route_string": "48-3", "verses": [26] },
    { "route_string": "54-1", "verses": [15] },
    { "route_string": "20-2", "verses": [6] },
    { "route_string": "19-55", "verses": [22] },
    { "route_string": "46-9", "verses": [24] },
    { "route_string": "43-11", "verses": [25] },
    { "route_string": "49-6", "verses": [11] },
    { "route_string": "19-19", "verses": [14] },
    { "route_string": "43-6", "verses": [63] },
    { "route_string": "45-4", "verses": [7, 8] },
    { "route_string": "19-143", "verses": [8] },
    { "route_string": "61-1", "verses": [3] },
    { "route_string": "59-1", "verses": [12] },
    { "route_string": "19-89", "verses": [1] },
    { "route_string": "40-7", "verses": [12] },
    { "route_string": "45-14", "verses": [8] },
    { "route_string": "19-73", "verses": [24] },
    { "route_string": "46-10", "verses": [31] },
    { "route_string": "43-8", "verses": [12] },
    { "route_string": "19-145", "verses": [18] },
    { "route_string": "45-15", "verses": [4] },
    { "route_string": "58-12", "verses": [28, 29] },
    { "route_string": "43-17", "verses": [17] },
    { "route_string": "49-2", "verses": [10] },
    { "route_string": "19-16", "verses": [8] },
    { "route_string": "23-59", "verses": [1] },
    { "route_string": "40-12", "verses": [34] },
    { "route_string": "45-14", "verses": [17] },
    { "route_string": "59-2", "verses": [19] },
    { "route_string": "23-61", "verses": [3] },
    { "route_string": "52-5", "verses": [9] },
    { "route_string": "20-3", "verses": [13, 14] },
    { "route_string": "19-22", "verses": [24] },
    { "route_string": "45-8", "verses": [35] },
    { "route_string": "19-119", "verses": [30] },
    { "route_string": "60-3", "verses": [15] },
    { "route_string": "19-33", "verses": [4] },
    { "route_string": "54-4", "verses": [8] },
    { "route_string": "62-2", "verses": [16] },
    { "route_string": "19-127", "verses": [3] },
    { "route_string": "19-46", "verses": [10] },
    { "route_string": "52-5", "verses": [9] },
    { "route_string": "59-1", "verses": [22] },
    { "route_string": "19-23", "verses": [4] },
    { "route_string": "23-40", "verses": [28] },
    { "route_string": "50-4", "verses": [11] },
    { "route_string": "20-10", "verses": [28] },
    { "route_string": "62-5", "verses": [4] },
    { "route_string": "45-5", "verses": [5] },
    { "route_string": "19-18", "verses": [30] },
    { "route_string": "20-17", "verses": [17] },
    { "route_string": "19-62", "verses": [6] },
    { "route_string": "45-8", "verses": [32] },
    { "route_string": "59-5", "verses": [16] },
    { "route_string": "55-4", "verses": [18] },
    { "route_string": "19-63", "verses": [1] },
    { "route_string": "45-6", "verses": [14] },
    { "route_string": "20-12", "verses": [25] },
    { "route_string": "19-111", "verses": [10] },
    { "route_string": "62-5", "verses": [14] },
    { "route_string": "20-11", "verses": [17] },
    { "route_string": "49-5", "verses": [19] },
    { "route_string": "46-15", "verses": [10] },
    { "route_string": "19-125", "verses": [1] },
    { "route_string": "51-2", "verses": [6] },
    { "route_string": "19-31", "verses": [19] },
    { "route_string": "59-4", "verses": [10] },
    { "route_string": "45-13", "verses": [10] },
    { "route_string": "19-119", "verses": [165] },
    { "route_string": "23-12", "verses": [2] },
    { "route_string": "54-6", "verses": [12] },
    { "route_string": "19-115", "verses": [1] },
    { "route_string": "40-6", "verses": [30] },
    { "route_string": "49-2", "verses": [14] },
    { "route_string": "23-43", "verses": [4] },
    { "route_string": "43-1", "verses": [16] },
    { "route_string": "20-16", "verses": [9] },
    { "route_string": "19-42", "verses": [5] },
    { "route_string": "59-1", "verses": [19] },
    { "route_string": "45-7", "verses": [24, 25] },
    { "route_string": "50-1", "verses": [21] },
    { "route_string": "19-27", "verses": [14] },
    { "route_string": "20-13", "verses": [12] },
    { "route_string": "19-40", "verses": [8] },
    { "route_string": "46-4", "verses": [7] },
    { "route_string": "40-22", "verses": [21] },
    { "route_string": "19-31", "verses": [19, 20] },
    { "route_string": "45-14", "verses": [12] },
    { "route_string": "19-47", "verses": [1] },
    { "route_string": "55-1", "verses": [9] },
    { "route_string": "59-1", "verses": [18] },
    { "route_string": "19-30", "verses": [11] },
    { "route_string": "58-11", "verses": [6] },
    { "route_string": "47-9", "verses": [8] },
    { "route_string": "19-40", "verses": [1] },
    { "route_string": "20-9", "verses": [10] },
    { "route_string": "19-56", "verses": [3] },
    { "route_string": "43-15", "verses": [7] },
    { "route_string": "45-8", "verses": [11] },
    { "route_string": "19-84", "verses": [11] },
    { "route_string": "20-19", "verses": [21] },
    { "route_string": "49-1", "verses": [3] },
    { "route_string": "19-18", "verses": [1, 2] },
    { "route_string": "23-40", "verses": [5] },
    { "route_string": "19-100", "verses": [5] },
    { "route_string": "20-24", "verses": [16] },
    { "route_string": "40-11", "verses": [29] },
    { "route_string": "19-54", "verses": [4] },
    { "route_string": "50-3", "verses": [8] },
    { "route_string": "45-11", "verses": [33] },
    { "route_string": "19-119", "verses": [75] },
    { "route_string": "59-4", "verses": [8] },
    { "route_string": "62-2", "verses": [1] },
    { "route_string": "20-10", "verses": [12] },
    { "route_string": "19-23", "verses": [6] },
    { "route_string": "23-53", "verses": [5] },
    { "route_string": "19-56", "verses": [13] },
    { "route_string": "60-1", "verses": [13] },
    { "route_string": "40-25", "verses": [21] },
    { "route_string": "19-37", "verses": [7] },
    { "route_string": "20-28", "verses": [1] },
    { "route_string": "58-12", "verses": [6] },
    { "route_string": "43-14", "verses": [13] },
    { "route_string": "19-139", "verses": [9, 10] },
    { "route_string": "45-12", "verses": [12] },
    { "route_string": "49-4", "verses": [15] },
    { "route_string": "19-77", "verses": [14] },
    { "route_string": "43-4", "verses": [14] },
    { "route_string": "19-116", "verses": [1] },
    { "route_string": "50-4", "verses": [5] },
    { "route_string": "10-22", "verses": [32] },
    { "route_string": "43-14", "verses": [18] },
    { "route_string": "20-8", "verses": [17] },
    { "route_string": "19-119", "verses": [65] },
    { "route_string": "45-5", "verses": [1] },
    { "route_string": "19-116", "verses": [7] },
    { "route_string": "50-4", "verses": [4] },
    { "route_string": "19-55", "verses": [16] },
    { "route_string": "60-5", "verses": [10] },
    { "route_string": "19-107", "verses": [1] },
    { "route_string": "23-59", "verses": [2] },
    { "route_string": "43-15", "verses": [13] },
    { "route_string": "20-21", "verses": [30] },
    { "route_string": "19-24", "verses": [1] },
    { "route_string": "40-16", "verses": [24] },
    { "route_string": "45-12", "verses": [10] },
    { "route_string": "19-103", "verses": [8] },
    { "route_string": "62-2", "verses": [28] },
    { "route_string": "23-51", "verses": [12] },
    { "route_string": "59-5", "verses": [11] },
    { "route_string": "19-19", "verses": [1] },
    { "route_string": "45-15", "verses": [5] },
    { "route_string": "19-19", "verses": [7] },
    { "route_string": "47-1", "verses": [3] },
    { "route_string": "19-62", "verses": [8] },
    { "route_string": "20-3", "verses": [24] },
    { "route_string": "60-2", "verses": [24] },
    { "route_string": "19-5", "verses": [11] },
    { "route_string": "50-1", "verses": [27] },
    { "route_string": "20-29", "verses": [11] },
    { "route_string": "43-3", "verses": [30] },
    { "route_string": "19-119", "verses": [114] },
    { "route_string": "23-43", "verses": [1] },
    { "route_string": "19-68", "verses": [3] },
    { "route_string": "50-4", "verses": [12] },
    { "route_string": "20-3", "verses": [1, 2] },
    { "route_string": "19-62", "verses": [5] },
    { "route_string": "54-6", "verses": [6] },
    { "route_string": "19-30", "verses": [4] },
    { "route_string": "58-10", "verses": [24] },
    { "route_string": "19-27", "verses": [13] },
    { "route_string": "19-119", "verses": [130] },
    { "route_string": "43-8", "verses": [36] },
    { "route_string": "45-8", "verses": [39] },
    { "route_string": "23-25", "verses": [1] },
    { "route_string": "20-16", "verses": [32] },
    { "route_string": "40-11", "verses": [30] },
    { "route_string": "19-19", "verses": [10] },
    { "route_string": "43-17", "verses": [4] },
    { "route_string": "19-16", "verses": [5] },
    { "route_string": "19-33", "verses": [18] },
    { "route_string": "23-54", "verses": [10] },
    { "route_string": "19-19", "verses": [14] },
    { "route_string": "19-29", "verses": [11] },
    { "route_string": "19-84", "verses": [10] },
    { "route_string": "58-11", "verses": [8] },
    { "route_string": "52-1", "verses": [3] },
    { "route_string": "19-119", "verses": [14] },
    { "route_string": "19-91", "verses": [9] },
    { "route_string": "46-16", "verses": [14] },
    { "route_string": "45-3", "verses": [24] },
    { "route_string": "19-113", "verses": [9] },
    { "route_string": "19-25", "verses": [4] },
    { "route_string": "23-55", "verses": [12] },
    { "route_string": "40-6", "verses": [22] },
    { "route_string": "19-104", "verses": [34] },
    { "route_string": "43-10", "verses": [14] },
    { "route_string": "50-3", "verses": [20] },
    { "route_string": "19-121", "verses": [1] },
    { "route_string": "19-128", "verses": [2] },
    { "route_string": "19-5", "verses": [7] },
    { "route_string": "19-116", "verses": [9] },
    { "route_string": "49-1", "verses": [18] },
    { "route_string": "40-21", "verses": [22] },
    { "route_string": "19-48", "verses": [14] },
    { "route_string": "45-8", "verses": [26] },
    { "route_string": "19-116", "verses": [8] },
    { "route_string": "54-6", "verses": [17] },
    { "route_string": "23-51", "verses": [6] },
    { "route_string": "19-19", "verses": [9] },
    { "route_string": "20-11", "verses": [10] },
    { "route_string": "19-127", "verses": [2] },
    { "route_string": "19-37", "verses": [6] },
    { "route_string": "58-10", "verses": [35] },
    { "route_string": "19-128", "verses": [1] },
    { "route_string": "20-3", "verses": [16] },
    { "route_string": "19-145", "verses": [13] },
    { "route_string": "45-14", "verses": [8] },
    { "route_string": "19-103", "verses": [19] },
    { "route_string": "19-9", "verses": [9] },
    { "route_string": "19-85", "verses": [10] },
    { "route_string": "19-32", "verses": [8] },
    { "route_string": "50-2", "verses": [15] },
    { "route_string": "45-15", "verses": [13] },
    { "route_string": "19-56", "verses": [4] },
    { "route_string": "58-10", "verses": [22] },
    { "route_string": "23-30", "verses": [18] },
    { "route_string": "19-86", "verses": [7] },
    { "route_string": "20-10", "verses": [30] },
    { "route_string": "23-35", "verses": [4] },
    { "route_string": "60-4", "verses": [8] },
    { "route_string": "19-72", "verses": [18] },
    { "route_string": "45-6", "verses": [4] },
    { "route_string": "19-20", "verses": [4] },
    { "route_string": "23-44", "verses": [22] },
    { "route_string": "19-91", "verses": [11] },
    { "route_string": "43-3", "verses": [3] },
    { "route_string": "23-52", "verses": [7] },
    { "route_string": "62-4", "verses": [19] },
    { "route_string": "19-91", "verses": [3] },
    { "route_string": "20-3", "verses": [8] },
    { "route_string": "19-16", "verses": [9] },
    { "route_string": "19-31", "verses": [14] },
    { "route_string": "19-105", "verses": [4] },
    { "route_string": "19-66", "verses": [1, 2] },
    { "route_string": "20-10", "verses": [11] },
    { "route_string": "47-4", "verses": [6] },
    { "route_string": "20-24", "verses": [23] },
    { "route_string": "19-119", "verses": [54] },
    { "route_string": "45-1", "verses": [16] },
    { "route_string": "19-94", "verses": [18] },
    { "route_string": "52-2", "verses": [13] },
    { "route_string": "20-4", "verses": [20, 21, 22] },
    { "route_string": "19-61", "verses": [2] },
    { "route_string": "19-19", "verses": [2] },
    { "route_string": "19-34", "verses": [7] },
    { "route_string": "23-62", "verses": [5] },
    { "route_string": "19-8", "verses": [2] },
    { "route_string": "43-16", "verses": [24] },
    { "route_string": "19-24", "verses": [3] },
    { "route_string": "19-107", "verses": [8] },
    { "route_string": "40-7", "verses": [25] },
    { "route_string": "19-126", "verses": [5] },
    { "route_string": "62-1", "verses": [7] },
    { "route_string": "20-14", "verses": [26] },
    { "route_string": "45-6", "verses": [23] },
    { "route_string": "19-121", "verses": [3] },
    { "route_string": "60-4", "verses": [12] },
    { "route_string": "23-42", "verses": [16] },
    { "route_string": "19-38", "verses": [15] },
    { "route_string": "47-12", "verses": [10] },
    { "route_string": "43-5", "verses": [24] },
    { "route_string": "19-31", "verses": [6] },
    { "route_string": "19-64", "verses": [10] },
    { "route_string": "46-2", "verses": [10] },
    { "route_string": "20-15", "verses": [3] },
    { "route_string": "19-31", "verses": [23] },
    { "route_string": "19-33", "verses": [12] },
    { "route_string": "19-19", "verses": [8] },
    { "route_string": "19-36", "verses": [5] },
    { "route_string": "55-1", "verses": [14] },
    { "route_string": "19-78", "verses": [35] },
    { "route_string": "62-2", "verses": [28] },
    { "route_string": "19-32", "verses": [7] },
    { "route_string": "19-128", "verses": [4] },
    { "route_string": "19-77", "verses": [20] },
    { "route_string": "20-17", "verses": [22] },
    { "route_string": "43-16", "verses": [33] },
    { "route_string": "19-126", "verses": [3] },
    { "route_string": "19-100", "verses": [1] },
    { "route_string": "19-103", "verses": [4] },
    { "route_string": "19-34", "verses": [15] },
    { "route_string": "19-139", "verses": [2] },
    { "route_string": "45-15", "verses": [5] },
    { "route_string": "19-9", "verses": [18] }
]

export const DAILY_VERSES_AGAINS_SIN_ROUTE_STRING: DAILY_VERSE_ROUTE_STRING[] = [
    { "route_string": "1-4", "verses": [7] },  // Genesis 4:7
    { "route_string": "1-39", "verses": [9] },  // Genesis 39:9
    { "route_string": "3-18", "verses": [22] },  // Leviticus 18:22
    { "route_string": "3-19", "verses": [29] },  // Leviticus 19:29
    { "route_string": "3-20", "verses": [10] },  // Leviticus 20:10
    { "route_string": "3-20", "verses": [13] },  // Leviticus 20:13
    { "route_string": "3-20", "verses": [15] },  // Leviticus 20:15
    { "route_string": "5-22", "verses": [22] },  // Deuteronomy 22:22
    { "route_string": "18-31", "verses": [1] },  // Job 31:1
    { "route_string": "18-31", "verses": [9] },  // Job 31:9
    { "route_string": "19-1", "verses": [1] },  // Psalm 1:1
    { "route_string": "19-19", "verses": [9] },  // Psalm 19:9
    { "route_string": "19-51", "verses": [10] },  // Psalm 51:10
    { "route_string": "19-97", "verses": [104] },  // Psalm 97:10
    { "route_string": "19-101", "verses": [3] },  // Psalm 101:3
    { "route_string": "19-119", "verses": [11] },  // Psalm 119:11
    { "route_string": "19-119", "verses": [37] },  // Psalm 119:37
    { "route_string": "19-119", "verses": [133] },  // Psalm 119:133
    { "route_string": "19-119", "verses": [163] },  // Psalm 119:163
    { "route_string": "20-4", "verses": [23] },  // Proverbs 4:23
    { "route_string": "20-5", "verses": [3, 4] },  // Proverbs 5:3-4
    { "route_string": "20-5", "verses": [8, 9] },  // Proverbs 5:8-9
    { "route_string": "20-6", "verses": [16, 17, 18, 19] },  // Proverbs 6:16-19
    { "route_string": "20-6", "verses": [25] },  // Proverbs 6:25
    { "route_string": "20-6", "verses": [32] },  // Proverbs 6:32
    { "route_string": "20-7", "verses": [21, 22, 23] },  // Proverbs 7:21-23
    { "route_string": "20-9", "verses": [13, 14, 15, 16, 17, 18] },  // Proverbs 9:13-18
    { "route_string": "20-23", "verses": [31, 32] },  // Proverbs 23:31-32
    { "route_string": "20-28", "verses": [13] },  // Proverbs 28:13
    { "route_string": "21-7", "verses": [26] },  // Ecclesiastes 7:26
    { "route_string": "23-5", "verses": [20] },  // Isaiah 5:20
    { "route_string": "23-55", "verses": [7] },  // Isaiah 55:7
    { "route_string": "23-64", "verses": [6] },  // Isaiah 64:6
    { "route_string": "24-17", "verses": [9] },  // Jeremiah 17:9
    { "route_string": "24-23", "verses": [14] },  // Jeremiah 23:14
    { "route_string": "26-18", "verses": [30] },  // Ezekiel 18:30
    { "route_string": "28-4", "verses": [12] },  // Hosea 4:12
    { "route_string": "28-7", "verses": [4] },  // Hosea 7:4
    { "route_string": "28-9", "verses": [9] },  // Hosea 9:9
    { "route_string": "28-14", "verses": [9] },  // Hosea 14:9
    { "route_string": "40-5", "verses": [8] },  // Matthew 5:8
    { "route_string": "40-5", "verses": [27, 28] },  // Matthew 5:27-28
    { "route_string": "40-6", "verses": [13] },  // Matthew 6:13
    { "route_string": "40-6", "verses": [24] },  // Matthew 6:24
    { "route_string": "40-7", "verses": [21, 22, 23] },  // Matthew 7:21-23
    { "route_string": "40-15", "verses": [19] },  // Matthew 15:19
    { "route_string": "40-26", "verses": [41] },  // Matthew 26:41
    { "route_string": "41-7", "verses": [21, 22, 23] },  // Mark 7:21-23
    { "route_string": "41-9", "verses": [43, 44, 45, 46, 47, 48] },  // Mark 9:43-48
    { "route_string": "42-12", "verses": [15] },  // Luke 12:15
    { "route_string": "42-16", "verses": [13] },  // Luke 16:13
    { "route_string": "43-3", "verses": [19, 20] },  // John 3:19-20
    { "route_string": "43-8", "verses": [11] },  // John 8:11
    { "route_string": "43-8", "verses": [34] },  // John 8:34
    { "route_string": "43-14", "verses": [15] },  // John 14:15
    { "route_string": "44-2", "verses": [38] },  // Acts 2:38
    { "route_string": "44-3", "verses": [19] },  // Acts 3:19
    { "route_string": "44-17", "verses": [30] },  // Acts 17:30
    { "route_string": "45-1", "verses": [24, 25, 26, 27] },  // Romans 1:24-27
    { "route_string": "45-3", "verses": [23] },  // Romans 3:23
    { "route_string": "45-6", "verses": [12, 13] },  // Romans 6:12-13
    { "route_string": "45-6", "verses": [23] },  // Romans 6:23
    { "route_string": "45-8", "verses": [1, 2] },  // Romans 8:1-2
    { "route_string": "45-12", "verses": [1, 2] },  // Romans 12:1-2
    { "route_string": "45-13", "verses": [12, 13, 14] },  // Romans 13:12-14
    { "route_string": "46-5", "verses": [1, 2] },  // 1 Corinthians 5:1-2
    { "route_string": "46-6", "verses": [9, 10] },  // 1 Corinthians 6:9-10
    { "route_string": "46-6", "verses": [18, 19, 20] },  // 1 Corinthians 6:18-20
    { "route_string": "46-10", "verses": [12, 13] },  // 1 Corinthians 10:12-13
    { "route_string": "46-10", "verses": [31] },  // 1 Corinthians 10:31
    { "route_string": "47-6", "verses": [14, 15, 16, 17] },  // 2 Corinthians 6:14-17
    { "route_string": "48-5", "verses": [16] },  // Galatians 5:16
    { "route_string": "48-5", "verses": [19, 20, 21] },  // Galatians 5:19-21
    { "route_string": "49-4", "verses": [22, 23, 24] },  // Ephesians 4:22-24
    { "route_string": "49-5", "verses": [3, 4, 5] },  // Ephesians 5:3-5
    { "route_string": "50-4", "verses": [8] },  // Philippians 4:8
    { "route_string": "51-3", "verses": [5, 6, 7] },  // Colossians 3:5-7
    { "route_string": "52-4", "verses": [3, 4, 5] },  // 1 Thessalonians 4:3-5
    { "route_string": "53-2", "verses": [11, 12] },  // 2 Thessalonians 2:11-12
    { "route_string": "54-6", "verses": [9, 10] },  // 1 Timothy 6:9-10
    { "route_string": "55-2", "verses": [22] },  // 2 Timothy 2:22
    { "route_string": "56-2", "verses": [11, 12] },  // Titus 2:11-12
    { "route_string": "58-13", "verses": [4] },  // Hebrews 13:4
    { "route_string": "59-1", "verses": [14, 15] },  // James 1:14-15
    { "route_string": "59-4", "verses": [7] },  // James 4:7
    { "route_string": "60-2", "verses": [11] },  // 1 Peter 2:11
    { "route_string": "60-4", "verses": [3] },  // 1 Peter 4:3
    { "route_string": "60-5", "verses": [8, 9] },  // 1 Peter 5:8-9
    { "route_string": "62-1", "verses": [8, 9] },  // 1 John 1:8-9
    { "route_string": "62-2", "verses": [15, 16, 17] },  // 1 John 2:15-17
    { "route_string": "62-3", "verses": [4, 5, 6] },  // 1 John 3:4-6
    { "route_string": "62-3", "verses": [8] },  // 1 John 3:8
    { "route_string": "66-21", "verses": [8] }   // Revelation 21:8
]

export const DAILY_VERSES_AGAINST_LUST: DAILY_VERSE_ROUTE_STRING[] = [
 
]