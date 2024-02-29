import React, { FC } from "react"
import cn from "classnames"
import Link from 'next/link'

type Props = {
    active: boolean
    icon?: React.ReactNode
    label: string
    to: string
    className?: string
}

export const NavLink: FC<Props> = ({ active, to, icon, label, className }) => {
    return (
        <div className="flex items-center group">
            <div
                className={cn({
                    "w-1 h-8  bg-primary-gold rounded-md": active,
                })}></div>
            <Link
                href={to}
                className={cn(
                    " flex py-1 px-8 items-center w-full " + className,
                    {
                        "text-primary-charcol ml-1": !active,
                    },
                )}>
                <div
                    className={cn(
                        "flex text-sm items-center tracking-wide gap-x-6 font-libre-sb w-full rounded-lg px-4 py-2.5",
                        {
                            "text-primary-gold bg-primary-gold/10 ":
                            active,
                            "hover:text-primary-gold text-primary-charcol hover:bg-primary-gold/10": !active,
                        },
                    )}>
                    {icon}
                    {label}
                </div>
            </Link>
        </div>
    )
}
