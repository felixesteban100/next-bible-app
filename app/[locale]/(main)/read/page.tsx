import { pageMarginAndWidth } from '@/lib/constants'
import { Loader } from 'lucide-react'
import { Suspense } from "react";
import PageContent from "./_components/PageContent"
import type { Metadata } from 'next'

export async function generateMetadata(
    { searchParams }: any,
): Promise<Metadata> {
    return {
        title: `${searchParams.search ?? ""} ${searchParams.version ?? "Read"}`
    }
}

export default function Page({ searchParams, params }: any) {
    const { dailyVerseType, search, version } = searchParams

    return (
        <Suspense key={`${JSON.stringify({ dailyVerseType, search, version })}`} fallback={<Loading />}>
            <PageContent searchParams={searchParams} params={params} />
        </Suspense>
    );
}

// https://github.com/vercel/next.js/issues/49297
//https://www.reddit.com/r/nextjs/comments/17jyiuj/how_do_you_show_the_loading_state_with_the_app/
//https://www.reddit.com/r/nextjs/comments/1bpwz5t/how_to_show_loading_process_indicator_in_server/
//https://chatgpt.com/c/67a7df02-b8a4-800f-9302-60d40ada268a

function Loading() {
    return (
        <div>
            {/* <NavbarSkeleton /> */}
            <div className={`${pageMarginAndWidth} pb-10 p-2 flex flex-col items-center h-[70vh] w-full`}>
                <Loader size={"100px"} className='animate-spin' />
            </div>
        </div>
    )
}