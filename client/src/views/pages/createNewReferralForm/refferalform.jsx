import React, { useState } from "react";
import MainCard from "ui-component/cards/MainCard";
import { Button, CardActions, Divider, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';


export default function Reffral() {
  const [ReffralData, setReffralData] = useState({
    studentname: "",
    email: "",
    NIC: "",
    birthday: "",
    mobilenumber: "",
    course: "",
    branch: "",
    additionalcomments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReffralData((prevData) => ({
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
      <MainCard title='Create a New Referral'>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <Typography variant="h5" component="h5">
                Student Name
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                name="studentname"
                value={ReffralData.studentname}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" component="h5">
                Email
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                name="email"
                value={ReffralData.email}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" component="h5">
                NIC
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                name="NIC"
                value={ReffralData.NIC}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" component="h5">
                birthday
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                name="birthday"
                value={ReffralData.birthday}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" component="h5">
                Mobile Number
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                name="mobilenumber"
                value={ReffralData.mobilenumber}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" component="h5">
                Course
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                name="course"
                value={ReffralData.course}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            
            
               <Grid item xs={12} sm={6}>
              <Typography variant="h5" component="h5">
                Branch
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                name="branch"
                value={ReffralData.branch}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" component="h4">
                Additional Comments
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                name="additionalcomments"
                value={ReffralData.additionalcomments}
                onChange={handleChange}
                variant="outlined"
                
              />
            </Grid>
            
            
            

          </Grid>
          <Divider sx={{ mt: 5, mb: 2 }} />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </CardActions>
        </form>
      </MainCard>
    </>
  );
}