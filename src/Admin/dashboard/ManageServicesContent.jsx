import * as React from 'react';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function ManageServicesContent({Skeleton}){
    return(
        <>
        <Grid container spacing={1}>
            <Grid size={7}>
            <Skeleton height={500} sx={{padding: "3%"}}>
                Add Service
                <Box 
                component="form"
                autoComplete="off"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                >
              <TextField
              label={"Service Name"}
              />
                      <TextField

          label="Multiline"
          multiline
          rows={4}
        />
              </Box>
            </Skeleton>
            </Grid>
            <Grid size={5}>
            <Skeleton height={500}>
            </Skeleton>
            </Grid>
            
        </Grid>
        </>
    )
};