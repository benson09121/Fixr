import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';


const columns = [
    { field: 'id', headerName: 'ID', width: 90, editable: false },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 240,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 240,
        editable: true,
    },
    {
        field: 'Role',
        headerName: 'Role',
        type: 'singleSelect',
        valueOptions: ['client', 'worker', 'admin'],
        width: 150,
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
        width: 200,
        editable: true,
    },
    ];



const paginationModel = { page: 0, pageSize: 10 };

export default function DataTable({users, onDataChange}) {
  const rows = users;

  const processRowUpdate = (newRow, oldRow) => {
    onDataChange(newRow);
    return newRow;
  };

  return (
    <Paper sx={{ height: 550, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 15,20]}
        disableSelectionOnClick
        disableColumnResize
        disableMultipleRowSelection
        sx={{ border: 0 }}
        processRowUpdate={processRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Paper>
  );
}