"use client"

import { ReactNode } from 'react'
import { Button } from '../ui/button'
import { usePathname } from '@/lib/navigation'
import { Link } from 'next-view-transitions'
import { cn } from '@/lib/utils'

type ButtonForNavbarLinkProps = {
    href: string
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
    size?: "default" | "sm" | "lg" | "icon" | null | undefined
    children: ReactNode
    aditionalClassNames?: string
}

export default function ButtonForNavbarLink({ href, variant, size, children, aditionalClassNames }: ButtonForNavbarLinkProps) {
    const pathname = usePathname()

    return (
        <Link href={href}>
            <Button
                variant={variant ?? "ghost"}
                size={size ?? "default"}
                className={cn(`text-xl ${pathname === href ? "text-primary font-bold" : "text-secondary-foreground font-thin"}`, aditionalClassNames)}
            >
                {children}
            </Button>
        </Link>
    )
}
