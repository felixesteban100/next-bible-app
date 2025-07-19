import NavbarSkeleton from '@/components/navbar/NavbarSkeleton'
import { pageMarginAndWidth } from '@/lib/constants'
import { Loader } from 'lucide-react'

export default function loading() {
    return (
        <div>
            {/* <NavbarSkeleton /> */}
            <div className={`${pageMarginAndWidth} pb-10 p-2 flex flex-col items-center h-[70vh] w-full`}>
                <Loader size={"100px"} className='animate-spin' />
            </div>
        </div>
    )
}