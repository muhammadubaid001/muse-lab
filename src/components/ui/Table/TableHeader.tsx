import React, { FC } from "react"
import { ITable } from "./Table"

export const TableHeader: FC<ITable> = ({
    columns,
    rowSelection,
    data,
    onSort,
}) => {
    // const [type, setType] = React.useState("asc")
    // const [key, setKey] = React.useState("createdAt")
    const handleCheck = () => {
        if (data?.length > 0)
            return data?.every((current: { select: boolean }) => current.select)
        else return false
    }

    const handleAllCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked
        const newData = [...data]
        newData.forEach(current => (current.select = checked))
        // setData(newData)
    }

    return (
        <thead className=" border-t text-xs text-gray-500 ">
            <tr>
                {rowSelection && (
                    <th className="text-left pl-3 w-14">
                        <input
                            type="checkbox"
                            className="checked:border-transparent text-sm w-4 h-4"
                            onChange={handleAllCheck}
                            checked={handleCheck()}
                        />
                    </th>
                )}
                <th className="px-4 py-3 text-left">
                    #
                </th>
                {columns?.map((col: { key: string, title: string }, i: number) => (
                    <th
                        key={i}
                        scope="col"
                        className={`px-4 text-left
                        ${
                            col.key === "key" ? "flex" : ""
                        } whitespace-nowrap`}>
                            {col.title}
                    </th>
                ))}
            </tr>
        </thead>
    )
}
