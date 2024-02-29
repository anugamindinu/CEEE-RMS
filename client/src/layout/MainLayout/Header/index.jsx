import { useTheme } from '@mui/material/styles';
import { Box, Hidden } from '@mui/material'; 
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
      {/* logo, dashboard link & courses link */}
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
          {/* Dashboard link */}
          <Hidden mdDown>
            <Link to="/dashboard" style={{ textDecoration: 'none', marginLeft: '30px', marginRight: '16px', display: 'flex', alignItems: 'center', fontSize: '1.2rem', color: '#0444B0' }}> {/* Added inline style for margin */}
              <DashboardIcon sx={{ marginRight: '4px', verticalAlign: 'middle', fontSize: '1.5rem' }} />
              <span style={{ verticalAlign: 'middle', fontSize: '1rem' }}>Dashboard</span> {/* Added span for text */}
            </Link>
          </Hidden>
          {/* Courses link */}
          <Hidden mdDown>
            <Link to="/courseDetails" style={{ textDecoration: 'none', marginLeft: '8px', marginRight: '8px', display: 'flex', alignItems: 'center', fontSize: '1.2rem', color: '#0444B0' }}> {/* Added inline style for margin */}
              <SchoolIcon sx={{ marginRight: '4px', verticalAlign: 'middle', fontSize: '1.5rem' }} />
              <span style={{ verticalAlign: 'middle', fontSize: '1rem' }}>Courses</span> {/* Added span for text */}
            </Link>
          </Hidden>
        </Box>
      </Box>

      {/* profile section */}
      <ProfileSection />
    </>
  );
};

export default Header;
