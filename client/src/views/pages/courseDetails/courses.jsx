import * as React from 'react';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import { useMediaQuery, Typography, TextField, InputAdornment } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import config from '../../../config';
import LinearProgress from '@mui/material/LinearProgress';

import { useAuthContext } from '../../../contexts/useAuthContext';
import { useLogout } from '../../../hooks/useLogout';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  ['& .MuiDataGrid-row.even']: {
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

export default function ViewCourses() {
  const [courseData, setCourseData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { logout } = useLogout();
  const [loading, setLoading] = useState(true);

  const { user } = useAuthContext();

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    const filteredCourses = courseData.filter((course) => course.name.toLowerCase().includes(term));
    setFilteredData(filteredCourses);
  };

  async function fetchCourseDetails() {
    try {
      const response = await fetch(config.apiUrl + 'api/courses', {
        method: 'GET',
        headers: { Authorization: `Bearer ${user.token}` }
      });

      if (!response.ok) {
        if (response.status === 401) {
          console.error('Unauthorized access. Logging out.');
          logout();
        }
        if (response.status === 500) {
          console.error('Internal Server Error.');
          logout();
          return;
        }
        return;
      }

      const allCourses = await response.json();
      const filteredCourses = allCourses.filter((course) => course.status === true);
      const formattedData = filteredCourses.map((course) => ({ id: course._id, ...course }));
      setCourseData(formattedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const columns = [
    { field: 'name', headerName: 'Course Name', flex: 1.5 },
    { field: 'description', headerName: 'Referral Fee(LKR)', flex: 3 }
  ];

  return (
    <>
      <MainCard>
        {loading && <LinearProgress />}
        <Grid container alignItems="center" justifyContent="space-between" sx={{ px: 3, py: 2 }}>
          <Grid item>
            <Typography variant="h3" component="h3">
              Course List
            </Typography>
          </Grid>
          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              margin="normal"
              name="course"
              type="text"
              SelectProps={{ native: true }}
              defaultValue=""
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              onChange={handleSearch}
            />
          </Grid>
        </Grid>
        <div style={{ height: 710, width: '100%' }}>
          <StripedDataGrid
            rows={filteredData.length > 0 ? filteredData : courseData}
            columns={columns}
            getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 }
              }
            }}
            getRowId={(row) => row.id}
            pageSizeOptions={[10, 25, 100]}
          />
        </div>
      </MainCard>
    </>
  );
}
