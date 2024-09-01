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
import { ChevronDown, Search } from "lucide-react";

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
import NavigatePassages from "./NavigatePassages";
import { useEffect } from "react";

import { ScrollArea } from "@/components/ui/scroll-area"
import { bibleBooks } from "@/lib/bibleBooks";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useTransitionRouter } from "next-view-transitions";

type SearchBibleReferenceProps = {
    versions: Version[];
    previous_chapter: string;
    next_chapter: string;
    versionParam: string
    searchParam: string
    fontSizeParam: string;
    continousLineParam: boolean;
    selectedFontSize: { text: string, firstVerse: string, icon: string, gap_between_elements: string, aligmentForFlexElements: string }
}

"gap-10"

function SearchBibleReference({ versions, previous_chapter, next_chapter, versionParam, searchParam, fontSizeParam, continousLineParam, selectedFontSize }: SearchBibleReferenceProps) {
    const linkClasses = "text-foreground hover:text-primary p-1"
    const textSize = selectedFontSize.text
    const iconSize = selectedFontSize.icon
    const gapForElements = selectedFontSize.gap_between_elements
    const alignmentForFlexElements = selectedFontSize.aligmentForFlexElements

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
        params.set("verseToHighlight", "0")

        params.delete('search')
        if (values.search !== "") params.set('search', values.search)

        params.delete('version')
        if (values.version !== "") params.set('version', values.version)

        push(`${pathname}?${params.toString()}`)
    }

    function changeFontSize(value: number) {
        params.set('fontSizeNumber', value.toString())
        push(`${pathname}?${params.toString()}`)
    }

    function changeContinousLine(value: boolean) {
        params.set('continousLine', value.toString())
        push(`${pathname}?${params.toString()}`)
    }

    return (
        <div className={`flex flex-col ${gapForElements}`}>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    // className="flex flex-col lg:flex-row justify-center items-end lg:items-start gap-2 w-full"
                    className="w-full flex flex-col lg:grid lg:grid-cols-9 grid-flow-row gap-5 items-end "
                >
                    <FormField
                        control={form.control}
                        name="search"
                        render={({ field }) => (
                            <FormItem className="w-full h-full col-span-4">
                                <FormControl>
                                    <Input placeholder={t("enterPassage")} className={`${textSize} h-full py-[0.5rem]`} {...field} />
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
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
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

                <div className={`flex ${alignmentForFlexElements} justify-between items-center w-full ${gapForElements}`}>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button type="button" variant={'link'} className={`${linkClasses} flex items-center ${textSize} h-fit`}>
                                {t("Bible_book_list")}
                                <ChevronDown className={iconSize} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[80vw] max-w-[40rem]">
                            <p className={`${textSize} h-fit p-5`}>{t("Bible_book_list")} ({form.getValues("version") ?? versionParam})</p>
                            <ScrollArea className="h-[400px] rounded-md p-4">
                                <Accordion type="single" collapsible>
                                    {Object.entries(bibleBooks[form.getValues("version") ?? versionParam]).map(([key, value]) => {
                                        return (
                                            <AccordionItem key={key} value={key}>
                                                <AccordionTrigger className={`${searchParam.toLowerCase().includes(value.toLowerCase()) && "text-primary"} ${textSize} h-fit p-5`}>{value}</AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="flex flex-col">
                                                        <PopoverClose>
                                                            <Button
                                                                onClick={() => {
                                                                    onSubmit({
                                                                        search: `${value} 0`,
                                                                        version: form.getValues("version") ?? versionParam,
                                                                    })
                                                                }}
                                                                key={key}
                                                                type="button"
                                                                variant={'ghost'}
                                                                className={`${textSize} h-fit p-5`}
                                                            >
                                                                {t("Read chapter info")}
                                                            </Button>
                                                        </PopoverClose>
                                                        <PopoverClose>
                                                            <Button
                                                                onClick={() => {
                                                                    onSubmit({
                                                                        search: `${value} 1`,
                                                                        version: form.getValues("version") ?? versionParam,
                                                                    })
                                                                }}
                                                                key={key}
                                                                type="button"
                                                                variant={'ghost'}
                                                                className={`${textSize} h-fit p-5`}
                                                            >
                                                                {t("Read first chapter")}
                                                            </Button>
                                                        </PopoverClose>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        )
                                    })}
                                </Accordion>
                            </ScrollArea>
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button type="button" variant={'link'} className={`${linkClasses} flex items-center ${textSize} h-fit`}>
                                {t("Font_size")}
                                <ChevronDown className={iconSize} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col gap-2 justify-center items-center w-fit p-2">
                            <div className="flex items-center space-x-2">
                                <Switch id="continuous_line" checked={continousLineParam} onCheckedChange={(c) => changeContinousLine(c)} />
                                <Label htmlFor="continuous_line">{t("continuous_line")}</Label>
                            </div>

                            <Button variant={'outline'} className={`${fontSizeParam === '0' && "text-primary"} mt-5 capitalize w-full ${textSize} h-fit`} onClick={() => changeFontSize(0)}>
                                {t("xs")}
                            </Button>
                            <Button variant={'outline'} className={`${fontSizeParam === '1' && "text-primary"} mt-5 capitalize w-full ${textSize} h-fit`} onClick={() => changeFontSize(1)}>
                                {t("sm")}
                            </Button>
                            <Button variant={'outline'} className={`${fontSizeParam === '2' && "text-primary"} mt-5 capitalize w-full ${textSize} h-fit`} onClick={() => changeFontSize(2)}>
                                {t("md")}
                            </Button>
                            <Button variant={'outline'} className={`${fontSizeParam === '3' && "text-primary"} mt-5 capitalize w-full ${textSize} h-fit`} onClick={() => changeFontSize(3)}>
                                {t("lg")}
                            </Button>
                            {/* <Button variant={'outline'} className={`${fontSizeParam === '4' && "text-primary"} mt-5 capitalize w-full ${textSize} h-fit`} onClick={() => changeFontSize(4)}>
                                {t("xl")}
                            </Button> */}
                        </PopoverContent>
                    </Popover>
                </div>
            </Form>

            <NavigatePassages
                next_chapter={next_chapter}
                previous_chapter={previous_chapter}
                textSize={textSize}
                iconSize={iconSize}
                gapForElements={gapForElements}
                alignmentForFlexElements={alignmentForFlexElements}
            />
        </div>
    )
}

export default SearchBibleReference