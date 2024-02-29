'use client'
import { Table } from '@/components/ui/Table/Table'

export default function Page() {
    const columns = [
        { key: "title", dbColName: "title", title: "Title"},
        { key: "name", dbColName: "name", title: "Name"},
        { key: "github", dbColName: "github", title: "Github"},
        { key: "actions", dbColName: "actions", title: "Actions"},
    ]
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-primary-charcol font-libre-sb text-xl">Users</h1>
            <Table
                data={[]}
                loadingData={false}
                columns={columns} totalItems={0}
            />
        </div>
    )
}
