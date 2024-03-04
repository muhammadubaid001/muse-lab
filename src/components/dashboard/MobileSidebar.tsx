import React, { Dispatch, FC, Fragment, SetStateAction, useCallback, useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Sidebar } from "./Sidebar"
import { usePathname, useSearchParams } from "next/navigation"

type Props = {
    sidebarOpen: boolean
    setSidebarOpen: Dispatch<SetStateAction<boolean>>
}

export const MobileSidebar: FC<Props> = ({ sidebarOpen, setSidebarOpen }) => {
    const [width, setWidth] = useState(0); // default width, detect on server.
    const handleResize = useCallback(() => setWidth(window.innerWidth) ,[]);

    const pathname = usePathname()

    useEffect(() => {
        if (sidebarOpen) {
            setSidebarOpen(!sidebarOpen);
        }
    }, [pathname]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        if(width > 1024) {
            setSidebarOpen(false)
        }
        return () => window.removeEventListener('resize', handleResize);
    }, [width, handleResize]);


    return (
        <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
                as="div"
                static
                className="relative "
                open={sidebarOpen}
                onClose={setSidebarOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <Dialog.Overlay className="fixed inset-0 bg-black/20"
                                    onClick={() => setSidebarOpen(false)}
                    />
                </Transition.Child>
                <div className="fixed inset-0 overflow-hidden">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full">
                        <div className="max-w-xs w-full relative h-full">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0">
                                <div className="absolute top-0 -right-12 pt-2">
                                    <button
                                        className="ml-1 bg-gray-100 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        onClick={() => setSidebarOpen(false)}>
                                    <span className="sr-only">
                                        Close sidebar
                                    </span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-5 h-5 text-black">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </Transition.Child>
                            <Sidebar />
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
