import React, {useState} from "react";
import { useSortBy, useTable } from "react-table";

export default function Table({ columns, data }) {
  
    const [filterInput, setFilterInput] = useState("");
  
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns,
    data
  },
  useSortBy);



    const handleFilterChange = e => {
        const value = e.target.value || undefined;
        setFilterInput(value);
      };
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.can}
                  {column.render("Header")}
                  <span>
                  {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
                </span>
                  </th>
            ))}
            <span>
                
            </span>
          </tr>
        ))}
      </thead>
      
      <tbody {...getTableBodyProps()}>
      
        {rows.map((row, i) => {
           
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
