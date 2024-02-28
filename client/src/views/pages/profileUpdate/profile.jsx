import React, { useState } from "react";
import MainCard from "ui-component/cards/MainCard";
import { Button, CardActions, Divider, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
//import EmailIcon from '@mui/icons-material/Email';
import Grid from '@mui/material/Grid';
//import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Profile() {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    newPassword: "",
    bankAccountName: "",
    bankAccountNumber: "",
    bankName: "",
    primaryBank: "",
    NIC: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your submit logic here
  };

  return (
    <>
      <MainCard title='Update Profile'>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">
                Name
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">
                Email
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">
                Mobile Number
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                name="mobileNumber"
                value={profileData.mobileNumber}
                onChange={handleChange}
                variant="outlined"
               
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">
                New Password
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                name="newPassword"
                value={profileData.newPassword}
                onChange={handleChange}
                variant="outlined"
               
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">
                Bank Account Name
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                name="bankAccountName"
                value={profileData.bankAccountName}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">
                Bank Account Number
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                name="bankAccountNumber"
                value={profileData.bankAccountNumber}
                onChange={handleChange}
                variant="outlined"
               
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">
                Bank Name
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                name="bankName"
                value={profileData.bankName}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">
                Primary Bank
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                name="primaryBank"
                value={profileData.primaryBank}
                onChange={handleChange}
                variant="outlined"
               
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">
                NIC
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                name="NIC"
                value={profileData.NIC}
                onChange={handleChange}
                variant="outlined"
               
              />
            </Grid>
            {/* Add similar fields for other profile details */}
          </Grid>
          <Divider sx={{ mt: 3, mb: 2 }} />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </CardActions>
        </form>
      </MainCard>
    </>
  );
}
