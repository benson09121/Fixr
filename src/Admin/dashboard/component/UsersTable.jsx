import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';


const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 250,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 250,
        editable: true,
    },
    {
        field: 'Role',
        headerName: 'Role',
        type: 'singleSelect',
        valueOptions: ['Client', 'Service Provider', 'Admin'],
        width: 100,
        editable: true,
    },
    {
        field: 'Status',
        headerName: 'Active',
        type: 'boolean',
        width: 210,
        editable: true,
    },
    {
        field: 'createdAt',
        headerName: 'Created At',
        type: 'singleSelect',
        width: 210,
        editable: true,
    },
    ];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', Role: "Client", Status: true, createdAt: "2021-10-10", editable: false },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', Role: "Service Provider", Status: false, createdAt: "2021-10-10" },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', Role: "Admin", Status: false, createdAt: "2021-10-10" },
  { id: 4, lastName: 'Stark', firstName: 'Arya', Role: "Client", Status: true, createdAt: "2021-10-10" },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', Role: "Service Provider", Status: false, createdAt: "2021-10-10" },
  { id: 6, lastName: 'Melisandre', firstName: "Feranil", Role: "Admin", Status: true, createdAt: "2021-10-10" },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', Role: "Client", Status: true, createdAt: "2021-10-10" },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', Role: "Client", Status: false, createdAt: "2021-10-10" },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', Role: "Client", Status: true, createdAt: "2021-10-10" },
];

const paginationModel = { page: 0, pageSize: 10 };

export default function DataTable() {
  return (
    <Paper sx={{ height: 550, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 15,20]}
        disableSelectionOnClick
        sx={{ border: 0 }}
        
      />
    </Paper>
  );
}