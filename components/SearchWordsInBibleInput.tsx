"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/lib/navigation';
// import { useTransitionRouter } from 'next-view-transitions';

function SearchWordsInBibleInput({ search, selectedFontSize }: { search: string, selectedFontSize: SelectedFontSize }) {
    const [searchValue, setSearchValue] = useState(search)
    const searchParams = useSearchParams()
    // const { push } = useTransitionRouter()
    const { push } = useRouter()
    const params = new URLSearchParams(searchParams)

    const { text, icon } = selectedFontSize


    return (
        <form onSubmit={(e) => e.preventDefault()} className='flex gap-5 items-center mx-auto max-w-[900px] w-[80vw] my-10'>
            <Input className={`${text} h-full py-[0.5rem]`} defaultValue={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            <Button
                onClick={() => {
                    params.set("search", searchValue)
                    push(`/search?${params.toString()}`)
                }}
                className={`${text} h-full py-[0.5rem]`}
            >
                <Search className={`${icon}`} />
            </Button>
        </form>
    )
}

export default SearchWordsInBibleInput