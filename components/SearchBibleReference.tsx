"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { usePathname } from "@/lib/navigation"
import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl";
import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect } from "react";

import { ScrollArea } from "@/components/ui/scroll-area"
import { bibleBooks, bibleBooksNumberOfChapters } from "@/lib/bibleBooks";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { useTransitionRouter } from "next-view-transitions";
import { getChapterNumber } from "@/lib/queriesUtils";


type SearchBibleReferenceProps = {
    versions: Version[];
    versionParam: string
    searchParam: string
    selectedFontSize: SelectedFontSize;
    omitVerseToHightlight?: boolean;
    selectedBookNumber: number;
}

"gap-10"

function SearchBibleReference({ versions, versionParam, searchParam, selectedFontSize, omitVerseToHightlight, selectedBookNumber }: SearchBibleReferenceProps) {
    const textSize = selectedFontSize.text
    const iconSize = selectedFontSize.icon
    const gapForElements = selectedFontSize.gap_between_elements

    const { push } = useTransitionRouter()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const pathname = usePathname()

    const t = useTranslations()

    const formSchema = z.object({
        search: z.string(),
        version: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: searchParam,
            version: versionParam,
        },
    })

    useEffect(() => {
        form.reset({ search: searchParam, version: versionParam })
    }, [searchParam, versionParam, form])

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (omitVerseToHightlight) params.set("verseToHighlight", "0")

        params.delete('search')
        if (values.search !== "") params.set('search', values.search)

        params.delete('version')
        if (values.version !== "") params.set('version', values.version)

        push(`${pathname}?${params.toString()}`)
    }

    function translateBookName(bookNumber: number) {
        return bibleBooks[form.getValues('version') as "KJV" | "RV1960"][bookNumber] ?? ""
    }


    function removeFirstWord(inputString: string): string {
        // Split the string into words
        const words: string[] = inputString.split(' ');

        // Check if there are more than one word
        if (words.length > 1) {
            // Join the words back together, excluding the first word
            return words.slice(1).join(' ');
        } else {
            // If there's only one word, return an empty string
            return '';
        }
    }



    return (
        <div className={`flex flex-col ${gapForElements} p-2`}>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    // className="flex flex-col lg:flex-row justify-center items-end lg:items-start gap-2 w-full"
                    className="w-full flex flex-col lg:grid lg:grid-cols-9 grid-flow-row gap-5 items-end"
                >
                    <FormField
                        control={form.control}
                        name="search"
                        render={({ field }) => (
                            <FormItem className="w-full h-full col-span-4">
                                <FormControl>
                                    {pathname === "/search" ?
                                        <Input placeholder={t("enterWord")} className={`${textSize} h-full py-[0.5rem]`} autoComplete="off" {...field} />
                                        :
                                        <Popover>
                                            <PopoverTrigger className={`${textSize} h-full w-full`}>
                                                <Input placeholder={t("enterPassage")} className={`${textSize} h-full py-[0.5rem]`} autoComplete="off" {...field} />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[80vw] max-w-[40rem]">
                                                <p className={`${textSize} h-fit p-5`}>{t("Bible_book_list")} ({form.getValues("version") ?? versionParam})</p>
                                                <ScrollArea className="h-[400px] rounded-md p-4">
                                                    <Accordion type="single" collapsible>
                                                        {Object.entries(bibleBooks[form.getValues("version") ?? versionParam]).map(([key, value], index) => {
                                                            return (
                                                                <AccordionItem key={key} value={key}>
                                                                    <AccordionTrigger
                                                                        // className={`${searchParam.toLowerCase().includes(value.toLowerCase()) && "text-primary underline font-bold"} ${textSize} h-fit p-5`}
                                                                        className={`${form.getValues("search").toLowerCase().includes(value.toLowerCase()) && "text-primary underline font-bold"} ${textSize} h-fit p-5`}
                                                                    >
                                                                        {index + 1} - {value}
                                                                    </AccordionTrigger>
                                                                    <AccordionContent className="flex flex-col gap-5">
                                                                        <PopoverClose
                                                                            onClick={() => {
                                                                                onSubmit({
                                                                                    search: `${value}`,
                                                                                    version: form.getValues("version") ?? versionParam,
                                                                                })
                                                                            }}
                                                                            key={key}
                                                                            type="button"
                                                                            className={`${textSize} ${((getChapterNumber(searchParam.toLowerCase()) === 0 || getChapterNumber(searchParam.toLowerCase()) === null || getChapterNumber(searchParam.toLowerCase()) === undefined) && searchParam.toLowerCase().includes(value.toLowerCase())) ? "text-primary border-[0.2px] border-primary rounded-lg underline font-bold" : "border-[0.2px] border-foreground rounded-lg"} h-fit p-5`}
                                                                        >
                                                                            {t("Read book info")}
                                                                        </PopoverClose>
                                                                        <div>
                                                                            {Array.from(Array(bibleBooksNumberOfChapters[form.getValues("version")][value]), (_, i) => {
                                                                                const chapterNumber = i + 1

                                                                                return (
                                                                                    <PopoverClose
                                                                                        key={`${value}-${chapterNumber}-chapter`}
                                                                                        onClick={() => {
                                                                                            onSubmit({
                                                                                                search: `${value} ${chapterNumber}`,
                                                                                                version: form.getValues("version") ?? versionParam,
                                                                                            })
                                                                                        }}
                                                                                        className={`${textSize} ${(getChapterNumber(searchParam.toLowerCase()) === chapterNumber && searchParam.toLowerCase().includes(value.toLowerCase())) ? "text-primary border-[0.2px] border-primary" : "hover:border"}  rounded-lg h-fit p-5`}
                                                                                        type="button"
                                                                                    >
                                                                                        {chapterNumber}
                                                                                    </PopoverClose>
                                                                                )
                                                                            })}
                                                                        </div>
                                                                    </AccordionContent>
                                                                </AccordionItem>
                                                            )
                                                        })}
                                                    </Accordion>
                                                </ScrollArea>
                                            </PopoverContent>
                                        </Popover>}
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="version"
                        render={({ field }) => (
                            <FormItem className="w-full h-full col-span-4">
                                <Select onValueChange={(e) => {
                                    field.onChange(e)
                                    const newSearch = `${translateBookName(selectedBookNumber)} ${removeFirstWord(searchParam)}`
                                    if (selectedBookNumber !== null) form.setValue("search", newSearch)
                                }} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className={`${textSize} h-full py-[0.5rem]`}>
                                            <SelectValue placeholder={t("selectVersion")} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {versions.map(c => {
                                            return (
                                                <SelectItem key={c.name} value={c.initials} className={`${textSize} h-fit`}>{c.name} ({c.initials})</SelectItem>
                                            )
                                        })}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className={`${textSize} h-full col-span-1 w-[5rem] lg:w-full`} type="submit"><Search className={iconSize} /></Button>
                </form>
            </Form>
        </div>
    )
}

export default SearchBibleReference