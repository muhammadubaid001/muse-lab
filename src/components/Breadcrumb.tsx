export const Breadcrumb = ({ label }: { label: string}) => {
    return (
        <ol className="flex items-center whitespace-nowrap mt-1" aria-label="Breadcrumb">
            <li className="inline-flex items-center">
                <a className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600"
                   href="#">
                    <svg className="flex-shrink-0 me-3 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                         viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                         strokeLinecap="round" strokeLinejoin="round">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    Dashboard
                </a>
                <svg className="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400"
                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                </svg>
            </li>







            <li className="inline-flex items-center text-sm font-libre-sb text-primary-charcol truncate"
                aria-current="page">
                {label}
            </li>
        </ol>
    )
}
