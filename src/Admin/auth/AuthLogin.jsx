import React from 'react';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox
} from '@mui/material';
import { Link } from 'react-router-dom';
import FixrLogo from '../../../pics/header_logo1.png';

import CustomTextField from '../../components/forms/theme-elements/CustomTextField';

export default function ({ title, subtitle, subtext, handleInputChange, handleLogin }) {
   return(
    <>
    <img src={FixrLogo} width={"200px"} height={"70px"} style={{marginLeft: "15%"}} alt="login" />
    {title ? (
        <Typography fontWeight="700" variant="h2" >
            {title}
        </Typography>
    ) : null}

    {subtext}
    <Stack>
        <Box>
            <Typography variant="subtitle1"
                fontWeight={600} component="label" htmlFor='username' mb="5px">Email</Typography>
            <CustomTextField id="username" variant="outlined" fullWidth name="email" onChange={handleInputChange} />
        </Box>
        <Box mt="25px">
            <Typography variant="subtitle1"
                fontWeight={600} component="label" htmlFor='password' mb="5px" >Password</Typography>
            <CustomTextField id="password" type="password" variant="outlined" fullWidth name="password"  onChange={handleInputChange} />
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
        
        </Stack>
    </Stack>
    <Box>
        <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            component={Link}
            type="submit"
            onClick={handleLogin}
        >
            Sign In
        </Button>
    </Box>
    {subtitle}
    </>
   )
};
