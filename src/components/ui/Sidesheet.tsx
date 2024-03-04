import React, {
    Dispatch,
    FC,
    Fragment,
    ReactNode,
    SetStateAction,
} from "react"
import { Dialog, Transition } from "@headlessui/react"
import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon"
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button"

type Props = {
    sidebarOpen: boolean;
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
    children: ReactNode;
    handleClickPrimary?: any
    handleClickSecondary?: any
    title: string;
};

export const SideSheet: FC<Props> = ({
                                         title,
                                         sidebarOpen,
                                         setSidebarOpen,
                                         handleClickPrimary,
                                         handleClickSecondary,
                                         children,
                                     }) => {
    return (
        <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setSidebarOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/20" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel
                                    className="pointer-events-auto relative w-screen max-w-md border-l border-gray-200">
                                    <div className="flex h-full flex-col overflow-y-auto bg-white">
                                        <Dialog.Title className="flex gap-4 items-center font-libre-b border-b p-5">
                                            <button type="button" className="text-gray-600 focus:outline-none"
                                                    onClick={() => setSidebarOpen(false)}>
                                                <CloseIcon />
                                            </button>
                                            <p className="text-xl text-primary-charcol">{title}</p>
                                        </Dialog.Title>
                                        <div
                                            className="h-full flex-1 px-6 py-4">
                                            {children}
                                        </div>

                                        <div className="border-t flex gap-4 p-5">
                                            <PrimaryButton type="button" className="px-4 py-2 w-full" label="Update"
                                                           onClick={() => handleClickPrimary && handleClickPrimary()}
                                                           container="flex-1" />
                                            <SecondaryButton type="button" className="px-4 py-1.5 w-full "
                                                             label="Cancel"
                                                             onClick={() => handleClickSecondary && handleClickSecondary()}
                                                             container="flex-1" />
                                        </div>
                                    </div>


                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
