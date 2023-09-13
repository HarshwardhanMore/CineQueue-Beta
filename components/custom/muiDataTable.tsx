// // "use client";

// import * as React from "react";
// import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

// import LoadingComponent from "@/components/custom/loadingComponent";
// import { useState, useEffect } from "react";
// import { useUser } from "@clerk/nextjs";

// const columns: GridColDef[] = [
//   { field: "id", headerName: "ID", width: 70 },
//   { field: "firstName", headerName: "First name", width: 130 },
//   { field: "lastName", headerName: "Last name", width: 130 },
//   {
//     field: "age",
//     headerName: "Age",
//     type: "number",
//     width: 90,
//   },
//   {
//     field: "fullName",
//     headerName: "Full name",
//     description: "This column has a value getter and is not sortable.",
//     sortable: false,
//     width: 160,
//     valueGetter: (params: GridValueGetterParams) =>
//       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
//   },
// ];

// export default function DataTable() {
//   const rows = [
//     { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//     { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//     { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//     { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//     { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//     { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//     { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//     { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//     { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
//   ];

//   const { isLoaded, isSignedIn, user } = useUser();
//   if (!user) return null;

//   const [data, setData] = useState<any>(null);
//   const [isLoading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     fetch("/api/addmovie")
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data);
//         setLoading(false);
//       });
//   }, []);

//   if (isLoading) return <LoadingComponent />;
//   if (!data) return <p>No data found</p>;
//   console.log(data);

//   return (
//     <div style={{ height: 400, width: "100%" }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[5, 10]}
//         checkboxSelection
//       />
//     </div>
//   );
// }

import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Separator } from "@/components/ui/separator";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";

import Link from "next/link";

const columns: GridColDef[] = [
  // { field: "id", headerName: "ID", width: 150 },
  { field: "name", headerName: "Movie", width: 250 },
  { field: "status", headerName: "Status", width: 150 },
  { field: "genre", headerName: "Genre", width: 500 },
  // {
  //   field: "age",
  //   headerName: "Age",
  //   type: "number",
  //   width: 90,
  // },
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
];

const WishList = ({ rows }: any) => {
  // const rows = [
  //   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  //   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  //   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  //   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  //   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  //   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  //   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  //   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  //   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  // ];
  console.log(rows);
  // const { isLoaded, isSignedIn, user } = useUser();
  // if (!user) return null;

  // const [data, setData] = useState<any>(null);
  // const [isLoading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   fetch("/api/addmovie")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //       setLoading(false);
  //     });
  // }, []);

  // if (isLoading) return <div>Loading ...</div>;
  // if (!data) return <p>No data found</p>;

  return (
    // <>

    <div className=" h-full w-full">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>

    // </>
  );
};

export default WishList;
