import React, { FC } from "react";
import { IColumn, ITableBody } from "./Table";

export const TableBody: FC<ITableBody> = ({
  data,
  columns,
  loadingData,
  currentPage,
  pagination,
  itemsPerPage,
}) => {
  const renderTableColumnData = (col: IColumn, data: Array<any>) => {
    let column =
      col.dbColName !== undefined && data[col.dbColName as keyof typeof data];

    if (col.hasOwnProperty("render") && !col.hasOwnProperty("dbColName")) {
      return (
        <td
          key={col.key}
          className="p-5 text-sm whitespace-nowrap text-gray-900"
        >
          {col.render(data)}
        </td>
      );
    } else if (
      col.hasOwnProperty("render") &&
      col.hasOwnProperty("dbColName")
    ) {
      return (
        <td
          key={col.key}
          onClick={() => col.render(data)}
          className="p-5 text-sm whitespace-nowrap text-gray-700"
        >
          {col.render(column)}
        </td>
      );
    } else {
      return (
        <td
          key={col.key}
          className=" whitespace-nowrap p-5 text-sm text-gray-700"
        >
          {column}
        </td>
      );
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;

  return (
    <tbody className="bg-white divide-y divide-gray-100">
      <tr>
        {(data?.length === 0 || !data) && !loadingData && (
          <td colSpan={13} className="text-center p-5">
            <svg
              className="w-16 h-16 mx-auto text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="text-gray-900 font-medium mt-1">No data found</p>
          </td>
        )}
        {loadingData && (
          <td colSpan={10} className="p-14 text-center mr-4">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-full h-8 mr-2 text-center text-gray-200 animate-spin dark:text-gray-600 fill-primary"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
            <p className="ml-3 mt-1 text-gray-700">Loading...</p>
          </td>
        )}
      </tr>
      {data?.length !== 0 &&
        data?.map((d: any, index: number) => (
          <tr
            key={index}
            className={`${
              index % 2 !== 0 ? "bg-gray-50" : "bg-white"
            } hover:bg-gray-50`}
          >
            <td className="p-5 text-gray-700 text-sm">
              {pagination && pagination?.page > 1
                ? pagination?.limit * pagination?.page + index + 1 - 10
                : startIndex + index + 1}
            </td>
            {columns.map((col: any) => renderTableColumnData(col, d))}
          </tr>
        ))}
    </tbody>
  );
};
