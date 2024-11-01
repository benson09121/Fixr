import * as React from 'react';
import Grid from '@mui/material/Grid2';
import UsersTable from './component/UsersTable';

export default function ManageUseresContent({Skeleton, users, onDataChange}) {
    return(
        <Grid container spacing={1}>
        <Grid size={12}>
          <Skeleton height={10}>

            <UsersTable users={users} onDataChange={onDataChange}/>
      
          </Skeleton>
        </Grid>
      </Grid>
    )


}