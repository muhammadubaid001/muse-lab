import React, { FC, Dispatch, SetStateAction } from "react";

export interface IPropsPagination {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  pagination?: any;
  setPagination?: any;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  showingData: any;
}

export const Pagination: FC<IPropsPagination> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  pagination,
  setPagination,
  setCurrentPage,
  showingData,
}) => {
  const pageNumber: number[] = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumber.push(i);
  }

  // const items = showingData?.length + itemsPerPage * (currentPage - 1);
  // const skipped = currentPage * itemsPerPage - itemsPerPage + 1;

  return (
    <div className="flex p-3 items-center justify-between">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className="disabled:opacity-50 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
          disabled={currentPage === pageNumber[0]}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === pageNumber.length}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between text-right">
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-700">
            Page {" "}
            <span className="font-medium">
              {pagination ? pagination.page  : currentPage} of {pageNumber.length}
            </span>{" "}
            {/* to <span className="font-medium">{items ? items : 0}</span> {"of"}{" "}
            <span className="font-medium">{totalItems ? totalItems : 0}</span>{" "}
            result(s) */}
          </p>
          <select
            onChange={(eve) => {
              setCurrentPage(+eve.target.value)
              setPagination &&
              setPagination({
                ...pagination,
                page: +eve.target.value,
                limit: pagination?.limit,
              });
            }}
            className="p-1.5 rounded-md border border-gray-200 focus:border-gray-200 focus:ring-0 focus:outline-none text-xs text-gray-700"
          >
            <option>Go to page</option>
            {pageNumber.map((number) => (
              <option
                key={number}
                value={number}
                
              >
                {number}
              </option>
            ))}
          </select>
        </div>

        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-1"
          aria-label="Pagination"
        >
          <button
            onClick={() => {
              setCurrentPage(currentPage - 1);
              setPagination &&
                setPagination({
                  ...pagination,
                  page: currentPage - 1,
                  limit: pagination?.limit,
                });
            }}
            className={`disabled:cursor-not-allowed disabled:bg-gray-100 relative focus:outline-none dis inline-flex items-center justify-center py-2 w-24 text-center rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
            disabled={currentPage === pageNumber[0]}
          >
            <span>Previous</span>
          </button>
          <button
            onClick={() => {
              setCurrentPage(currentPage + 1);
              setPagination &&
                setPagination({
                  ...pagination,
                  page: pagination.page + 1,
                  limit: pagination?.limit,
                });
            }}
            className={`${
              currentPage === pageNumber.length && "cursor-not-allowed"
            } relative focus:outline-none inline-flex items-center justify-center py-2 w-24 text-center rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
            disabled={currentPage === pageNumber.length}
          >
            <span>Next</span>
          </button>
        </nav>
      </div>
    </div>
  );
};
