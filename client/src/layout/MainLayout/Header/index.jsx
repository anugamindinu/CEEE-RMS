import { useTheme } from '@mui/material/styles';
import { Box, Button } from '@mui/material'; 
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';

// project imports
import LogoSection from '../LogoSection';
import ProfileSection from './ProfileSection';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
  const theme = useTheme();

  return (
    <>
      {/* logo, dashboard button & courses button */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%', // changed width to fill parent
          maxWidth: 1280, // added max width
          marginX: 'auto', // horizontally center the container
          paddingX: 2, // added padding
          [theme.breakpoints.down('md')]: {
            paddingX: 1, // reduced padding for smaller screens
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}> {/* Added margin to the right of the logo */}
          <LogoSection />
          {/* Dashboard button */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<DashboardIcon />}
            component={Link}
            to="/dashboard"
            sx={{ ml:3 }} 
          >
            Dashboard
          </Button>
          {/* Courses button */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<SchoolIcon />}
            component={Link}
            to="/courses"
            sx={{ ml: 1.5 }} 
          >
            Courses
          </Button>
        </Box>      
      </Box>

      {/* profile section */}
      <ProfileSection />
    </>
  );
};

export default Header;
