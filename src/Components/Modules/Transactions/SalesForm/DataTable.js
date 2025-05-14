import React, { useState, useEffect } from "react";
import { Table, Form } from "react-bootstrap";
import { useTable, useGlobalFilter } from "react-table";

const DataTable = ({ columns, data, initialSearchValue = "" }) => {
  const [globalFilter, setGlobalFilter] = useState(initialSearchValue);

  useEffect(() => {
    setGlobalFilter(initialSearchValue);
  }, [initialSearchValue]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter: setTableGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { globalFilter },
    },
    useGlobalFilter
  );

  useEffect(() => {
    setTableGlobalFilter(globalFilter);
  }, [globalFilter, setTableGlobalFilter]);

  const getColumnWidth = (header) => {
    const length = header?.length || 10;
    const baseWidth = 10;
    return `${Math.max(baseWidth, length + 5)}ch`;
  };

  return (
    <div>
      {/* <Form.Control
        type="text"
        placeholder="Search..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        style={{ maxWidth: "300px", marginBottom: "10px" }}
      /> */}

      <Table striped bordered hover responsive {...getTableProps()} style={{whiteSpace:"nowrap"}}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, j) => (
                <th
                  {...column.getHeaderProps()}
                  key={j}
                  style={{
                    width: getColumnWidth(column.render("Header")),
                    fontSize: "13px",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell, j) => (
                  <td
                    {...cell.getCellProps()}
                    key={j}
                    style={{
                      width: getColumnWidth(cell.column.render("Header")),
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontSize: "13px",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default DataTable;
