import React from 'react';
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DataTable.css';

// Global Search Filter Component
function GlobalFilter({ globalFilter, setGlobalFilter }) {
  return (
    <div className="dataTable_search">
      <input
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="form-control"
        placeholder="Search..."
        style={{ width: '200px' }} // Fixed width for search
      />
    </div>
  );
}

// Reusable DataTable Component
export default function DataTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div className="dataTable_wrapper">
      {/* Global Search Filter */}
      <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />

      {/* Table */}
      <table {...getTableProps()} className="table dataTable_table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="dataTable_headerRow">
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="dataTable_headerCell"
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="dataTable_body">
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="dataTable_row">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="dataTable_cell">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="dataTable_pagination">
        <div>
          <button
            className="btn btn-sm btn-primary dataTable_previous"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous
          </button>
          <button
            className="btn btn-sm btn-primary dataTable_next ms-2"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </button>
        </div>
        <div className="dataTable_pageInfo">
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </div>
        <div>
          <select
            className="form-select dataTable_pageSize"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 20].map((size) => (
              <option key={size} value={size}>
                Show &ensp;{size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
