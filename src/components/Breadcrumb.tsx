import { usePathname } from "next/navigation"
import classNames from "classnames"

export const Breadcrumb = ({ label }: { label?: string}) => {
    const pathname = usePathname()
    const paths = pathname.split('/')
    paths.push(label as string)
    const items = paths.filter(item => item)

    return (
        <ol className="flex items-center whitespace-nowrap" aria-label="Breadcrumb">
            <svg className="flex-shrink-0 size-4 text-primary-gold" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                 viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                 strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            {items.map((item, index) => (
                <div key={item} className="flex items-center">
                    <svg className="flex-shrink-0 mx-2 overflow-visible size-4 text-primary-gold"
                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                    <p className={classNames("text-sm", {
                        "text-primary-gold font-libre-sb": index === items.length - 1,
                        "text-gray-600": index !== items.length - 1
                    })}>
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                    </p>
                </div>
            ))}
        </ol>
    )
}
