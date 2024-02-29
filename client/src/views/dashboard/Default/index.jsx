import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Typography, Grid, Button, Paper, Container, InputBase } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

const ODD_OPACITY = 0.1;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    },
    '&.Mui-selected': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY + theme.palette.action.selectedOpacity),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
        ),
        '@media (hover: none)': {
          backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY + theme.palette.action.selectedOpacity)
        }
      }
    }
  }
}));

const HeaderPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(3)
}));

const ReferralBoxPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  background: '#fff', // White background
  marginBottom: theme.spacing(2)
}));

const ReferralItemPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  backgroundColor: '#0444B0', // Blue background
  color: '#FFFFFF', // White text color
  height: '100px', // Increase the height as needed
  marginBottom: theme.spacing(2)
}));


const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#1976d2', 
  color: '#FFFFFF', // White text color
  '&:hover': {
    backgroundColor: '#1976d2', // Darker green color on hover
  }
}));

const SearchBoxPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius
}));

function SamplePage() {
  const filteredData = [];
  const courseData = [
    { _id: 1, referrals: 1, courseName: 'Course A', mobileNumber: '123-456-7890', earnings: 100, status: 'Active' },
    { _id: 2, referrals: 2, courseName: 'Course B', mobileNumber: '987-654-3210', earnings: 50, status: 'Inactive' },
    // Add more sample data if needed
  ];
  const columns = [
    { field: 'referrals', headerName: 'Referrals', width: 150 },
    { field: 'courseName', headerName: 'Course Name', width: 150 },
    { field: 'mobileNumber', headerName: 'Mobile Number', width: 150 },
    { field: 'earnings', headerName: 'Earnings/Potential Earnings (LKR)', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 }
  ];

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HeaderPaper>
            <Typography variant="h4" gutterBottom>
              Welcome Miller
            </Typography>
            <Typography variant="body1">
              <b>Use this portal to refer potential students to us, we will pay you a referral fee if the student registers with us!</b>
            </Typography>
          </HeaderPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <ActionButton variant="contained" fullWidth>
            Create A New Referral
          </ActionButton>
        </Grid>
        <Grid item xs={12} md={6}>
          <ActionButton variant="contained" fullWidth>
            View Referral
          </ActionButton>
        </Grid>
        <Grid item xs={12}>
          <ReferralBoxPaper>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <ReferralItemPaper elevation={3}>
                  <Typography variant="subtitle1">Registrations</Typography>
                  <Typography variant="h4">1</Typography>
                </ReferralItemPaper>
              </Grid>
              <Grid item xs={12} md={4}>
                <ReferralItemPaper elevation={3}>
                  <Typography variant="subtitle1">Potential Earnings (LKR)</Typography>
                  <Typography variant="h4">0</Typography>
                </ReferralItemPaper>
              </Grid>
              <Grid item xs={12} md={4}>
                <ReferralItemPaper elevation={3}>
                  <Typography variant="subtitle1">Paid (LKR)</Typography>
                  <Typography variant="h4">2000</Typography>
                </ReferralItemPaper>
              </Grid>
              <Grid item xs={12} md={4}>
                <ReferralItemPaper elevation={3}>
                  <Typography variant="subtitle1">To Be Paid (LKR)</Typography>
                  <Typography variant="h4">0</Typography>
                </ReferralItemPaper>
              </Grid>
              <Grid item xs={12} md={4}>
                <ReferralItemPaper elevation={3}>
                  <Typography variant="subtitle1">Referrals</Typography>
                  <Typography variant="h4">0</Typography>
                </ReferralItemPaper>
              </Grid>
            </Grid>
          </ReferralBoxPaper>
        </Grid>
        <Grid item xs={12}>
          <SearchBoxPaper>
            <Grid container alignItems="center">
              <Grid item xs={1}>
                <SearchIcon />
              </Grid>
              <Grid item xs={11}>
                <InputBase placeholder="Search for referrals" inputProps={{ 'aria-label': 'search referrals' }} fullWidth />
              </Grid>
            </Grid>
          </SearchBoxPaper>
        </Grid>
        <Grid item xs={12}>
          <StripedDataGrid
            rows={filteredData.length > 0 ? filteredData : courseData}
            rowHeight={40}
            columns={columns}
            getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 25 }
              }
            }}
            getRowId={(row) => row._id}
            getRowStyle={(params) => ({
              backgroundColor: params.index % 2 === 0 ? '#fff' : '#f0f8ff'
            })}
            pageSizeOptions={[10, 25, 100]}
            checkboxSelection
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default SamplePage;
