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
import { usePathname, useRouter } from "@/lib/navigation"
import { useSearchParams } from "next/navigation"
import { useLocale, useTranslations } from "next-intl";
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

type SearchBibleReferenceProps = {
    versions: Version[];
    previous_chapter: string;
    next_chapter: string;
    versionParam: string
    searchParam: string
    fontSizeParam: string
}

function SearchBibleReference({ versions, previous_chapter, next_chapter, versionParam, searchParam, fontSizeParam }: SearchBibleReferenceProps) {
    const linkClasses = "text-foreground hover:text-primary p-1"

    const searchParams = useSearchParams()
    const { push } = useRouter()
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

    return (
        <div className="flex flex-col gap-5">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col lg:flex-row justify-center items-end lg:items-start gap-2 w-full">
                    <FormField
                        control={form.control}
                        name="search"
                        render={({ field }) => (
                            <FormItem className="text-xl w-full">
                                <FormControl>
                                    <Input placeholder={t("enterPassage")} className="text-xl" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="version"
                        render={({ field }) => (
                            <FormItem className="text-xl w-full">
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder={t("selectVersion")} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {versions.map(c => {
                                            return (
                                                <SelectItem key={c.name} value={c.initials}>{c.name} ({c.initials})</SelectItem>
                                            )
                                        })}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit"><Search /></Button>
                </form>

                <div className="flex flex-row justify-between items-center w-full">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button type="button" variant={'link'} className={linkClasses}>
                                {t("Bible_book_list")}
                                <ChevronDown />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <p>{t("Bible_book_list")} ({form.getValues("version") ?? versionParam})</p>
                            <ScrollArea className="h-[400px] rounded-md  p-4">
                                <Accordion type="single" collapsible>
                                    {Object.entries(bibleBooks[form.getValues("version") ?? versionParam]).map(([key, value], i) => {
                                        return (
                                            <AccordionItem key={key} value={key}>
                                                <AccordionTrigger className={`${searchParam.toLowerCase().includes(value.toLowerCase()) && "text-primary"}`}>{value}</AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="flex flex-wrap">
                                                        <PopoverClose>
                                                            <Button onClick={() => {
                                                                onSubmit({
                                                                    search: `${value} 0`,
                                                                    version: form.getValues("version") ?? versionParam,
                                                                })
                                                            }} key={key} type="button" variant={'ghost'}>
                                                                {t("Read chapter info")}
                                                            </Button>
                                                        </PopoverClose>
                                                        <PopoverClose>
                                                            <Button onClick={() => {
                                                                onSubmit({
                                                                    search: `${value} 1`,
                                                                    version: form.getValues("version") ?? versionParam,
                                                                })
                                                            }} key={key} type="button" variant={'ghost'}>
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
                            <Button type="button" variant={'link'} className={linkClasses}>
                                {t("Font_size")}
                                <ChevronDown />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col gap-2 justify-center items-center w-fit p-2">
                            <Button variant={'outline'} className={`${fontSizeParam === '0' && "text-primary"} mt-5 p-1 capitalize w-full`} onClick={() => changeFontSize(0)}>
                                {t("xs")}
                            </Button>
                            <Button variant={'outline'} className={`${fontSizeParam === '1' && "text-primary"} mt-5 p-1 capitalize w-full`} onClick={() => changeFontSize(1)}>
                                {t("sm")}
                            </Button>
                            <Button variant={'outline'} className={`${fontSizeParam === '2' && "text-primary"} mt-5 p-1 capitalize w-full`} onClick={() => changeFontSize(2)}>
                                {t("md")}
                            </Button>
                            <Button variant={'outline'} className={`${fontSizeParam === '3' && "text-primary"} mt-5 p-1 capitalize w-full`} onClick={() => changeFontSize(3)}>
                                {t("lg")}
                            </Button>
                        </PopoverContent>
                    </Popover>
                </div>
            </Form>

            <NavigatePassages
                next_chapter={next_chapter}
                previous_chapter={previous_chapter}
            />
        </div>
    )
}

export default SearchBibleReference