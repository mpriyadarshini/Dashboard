import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";
import "./App.css";
import EditableCell from "./Editable";


function App() {
  const [data, setData] = useState([]);
  const [originalData] = React.useState(data)

  useEffect(() => {
    (async () => {
      const result = await axios("https://s3-ap-southeast-1.amazonaws.com/he-public-data/reciped9d7b8c.json");
      console.log(result);
      setData(result.data);
    })();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Category A",
        columns: [
          {
            Header: "Name",
            accessor: "name"
          },
          {
            Header: "Category",
            accessor: "category",
            disableSortBy: true,
          }
        ]
      },
      {
        Header: "Category B",
        columns: [
          {
            Header: "Description",
            accessor: "description",
            disableSortBy: true,
          },
          {
            Header: "Label",
            accessor: "label",
            disableSortBy: true,
          },
          {
            Header: "Price",
            accessor: "price",
            Cell: EditableCell
          }
        ]
      }
    ],
    []
  );

  return (
    <div className="App">
            <Table columns={columns} data={data} />
    </div>
  );
}

export default App;
