// import { Button } from '@/components/Button'
import React, { Dispatch, FC, SetStateAction } from 'react'
// import { Search } from '@/components/Utils/Search'

interface Props {
    title: string
    buttonTitle: string
    setShowModal: Dispatch<SetStateAction<boolean>>
    setItemsPerPage: Dispatch<SetStateAction<number>>
}

export const Header: FC<Props> = ({
    title,
    buttonTitle,
    setShowModal,
    setItemsPerPage,
}) => {
    const itemsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (setItemsPerPage) {
            setItemsPerPage(+event.target.value)
        }
    }
    return (
        <>
            <div className="flex justify-between mb-4">
                <div className="relative text-gray-600 flex space-x-3">
                    <header className="max-w-full mx-auto">
                        <div className=" ">
                            <h1 className="text-xl font-light text-gray-900">
                                {title}
                            </h1>
                        </div>
                    </header>
                </div>
                <div>
                    {buttonTitle && (
                        <button
                            onClick={() =>
                                setShowModal ? setShowModal(true) : false
                            }>
                            <svg
                                className="h-4 w-4"
                                data-todo-x-description="Heroicon name: solid/plus"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true">
                                <path
                                    fillRule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {buttonTitle}
                        </button>
                    )}
                </div>
            </div>
            <div className="flex space-x-1 mb-3">
                <label className="mt-2">Show: </label>
                <select
                    className="focus:ring-blue-400 bg-white  border-2 h-10 shadow-sm sm:text-sm border-gray-300 focus:outline-none rounded-lg"
                    onChange={itemsPerPage}>
                    <option value={10} defaultChecked={true}>
                        10
                    </option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                    <option value={30}>30</option>
                </select>
                {/*<Search onChange={onSearchChange} />*/}
            </div>
        </>
    )
}

export default Header
