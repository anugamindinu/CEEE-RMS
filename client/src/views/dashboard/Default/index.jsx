import React from 'react';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { Container, Typography, Grid, Table, Box, TableContainer, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';

function SamplePage() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h1" gutterBottom>
            Welcome Miller
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>Use this portal to refer potential students to us, we will pay you a referral fee if the student registers with us!</b>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant="contained" sx={{ width: '100%', color: 'black' }}>
            Create A New Referral
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant="contained" sx={{ width: '100%', backgroundColor: '#DCC030', color: 'black' }}>
            View Referral
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ borderRadius: 1, p: 2, backgroundColor: '#D9D9D9' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Box
                  sx={{
                    borderRadius: 2,
                    pt: 3,
                    textAlign: 'center',
                    backgroundColor: '#0061A6',
                    width: '250px',
                    height: '100px'
                  }}
                >
                  <Typography variant="body2" gutterBottom>
                    Registrations
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    1
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box
                  sx={{
                    borderRadius: 2,
                    pt: 3,
                    textAlign: 'center',
                    backgroundColor: '#0061A6',
                    width: '250px',
                    height: '100px'
                  }}
                >
                  <Typography variant="body2" gutterBottom>
                    Potential Earnings (LKR)
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    0
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box
                  sx={{
                    borderRadius: 2,
                    pt: 3,
                    textAlign: 'center',
                    backgroundColor: '#0061A6',
                    width: '250px',
                    height: '100px'
                  }}
                >
                  <Typography variant="body2" gutterBottom>
                    Paid (LKR)
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    2000
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box
                  sx={{
                    borderRadius: 2,
                    pt: 3,
                    textAlign: 'center',
                    backgroundColor: '#0061A6',
                    width: '250px',
                    height: '100px'
                  }}
                >
                  <Typography variant="body2" gutterBottom>
                    To Be Paid (LKR)
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    0
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box
                  sx={{
                    borderRadius: 2,
                    pt: 3,
                    textAlign: 'center',
                    backgroundColor: '#0061A6',
                    width: '250px',
                    height: '100px'
                  }}
                >
                  <Typography variant="body2" gutterBottom>
                    Referrals
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    0
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2" gutterBottom>
            Activity
          </Typography>
          <Grid container justifyContent="flex-end">
            <Box sx={{ display: 'flex', alignItems: 'center', border: 1, borderRadius: 3, pl: 2, mt: -6, backgroundColor: '#20061A6' }}>
              <Typography variant="body2" gutterBottom sx={{ flexGrow: 5 }}>
                Search for a referrals
              </Typography>
              <IconButton sx={{ color: 'gray' }}>
                <SearchIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#c0c0c0' }}>
                  <TableCell>Referrals</TableCell>
                  <TableCell>Course Name</TableCell>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>Earnings/Potential Earnings (LKR)</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell>Steav</TableCell>
                  <TableCell>Access</TableCell>
                  <TableCell>0445548964</TableCell>
                  <TableCell>20000</TableCell>
                  <TableCell>Processing</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Miller</TableCell>
                  <TableCell>Access</TableCell>
                  <TableCell>0414188964</TableCell>
                  <TableCell>20000</TableCell>
                  <TableCell>Processing</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}
export default SamplePage;