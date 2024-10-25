import * as React from 'react';
import Grid from '@mui/material/Grid2';
import UsersTable from './component/UsersTable';

export default function ManageUseresContent({Skeleton}) {
    return(
        <Grid container spacing={1}>
        <Grid size={12}>
          <Skeleton height={10}>

            <UsersTable />
      
          </Skeleton>
        </Grid>
      </Grid>
    )


}