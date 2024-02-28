import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import useAuth from 'hooks/useAuth';

const PersonalDetails = () => {
    const { user } = useAuth();

    const [currency, setCurrency] = useState('Washington');
    const handleChange1 = (event) => {
        setCurrency(event.target.value);
    };

    const [experience, setExperience] = useState('Startup');
    const handleChange2 = (event) => {
        setExperience(event.target.value);
    };

    const clearForm = () => {
        // Clearing form fields by setting their default values to empty strings
        // You can also set them to null or any other desired value
        // based on your application's requirements
        document.getElementById('outlined-basic1').value = '';
        document.getElementById('outlined-basic2').value = '';
        document.getElementById('outlined-basic3').value = '';
        document.getElementById('outlined-multiline-static2').value = '';
    };

    return (
        <Grid item xs={12} md={6}>
            <SubCard title="Personal Information">
                <form noValidate autoComplete="off">
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={16}>
                            <TextField id="outlined-basic1" fullWidth label="Full Name" defaultValue={user?.name} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField id="outlined-basic2" fullWidth label="Contact Phone" defaultValue="(+99) 9999 999 999" />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField id="outlined-basic3" fullWidth label="Email" defaultValue="demo@sample.com" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-multiline-static2"
                                label="Address"
                                multiline
                                fullWidth
                                rows={3}
                                defaultValue="3379 Monroe Avenue, Fort Myers, Florida(33912)"
                            />
                        </Grid>
                    </Grid>
                </form>
            </SubCard>
            <Grid item xs={12} sx={{ mt: 3 }}>
                <Grid spacing={2} container justifyContent="flex-end">
                    <Grid item>
                        <AnimateButton>
                            <Button variant="contained">Update Profile</Button>
                        </AnimateButton>
                    </Grid>
                    <Grid item>
                        <Button sx={{ color: 'error.main' }} onClick={clearForm}>Clear</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default PersonalDetails;
