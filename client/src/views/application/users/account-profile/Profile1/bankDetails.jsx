import { useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

import { gridSpacing } from 'store/constant';

// assets
import DesktopWindowsTwoToneIcon from '@mui/icons-material/DesktopWindowsTwoTone';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SmartphoneTwoToneIcon from '@mui/icons-material/SmartphoneTwoTone';
import PhoneIphoneTwoToneIcon from '@mui/icons-material/PhoneIphoneTwoTone';

const deviceStateSX = {
    display: 'inline-flex',
    alignItems: 'center',
    '& >svg': {
        width: 12,
        height: 12,
        mr: 0.5
    }
};

// select options
const currencies = [
    {
        value: 'Washington',
        label: 'Washington'
    },
    {
        value: 'India',
        label: 'India'
    },
    {
        value: 'Africa',
        label: 'Africa'
    },
    {
        value: 'New-York',
        label: 'New York'
    },
    {
        value: 'Malaysia',
        label: 'Malaysia'
    }
];

const experiences = [
    {
        value: 'Startup',
        label: 'Startup'
    },
    {
        value: '2-year',
        label: '2 year'
    },
    {
        value: '3-year',
        label: '3 year'
    },
    {
        value: '4-year',
        label: '4 year'
    },
    {
        value: '5-year',
        label: '5 year'
    }
];

// ==============================|| PROFILE 1 - MY ACCOUNT ||============================== //

const MyAccount = () => {
    const [currency, setCurrency] = useState('Washington');
    const handleChange1 = (event) => {
        setCurrency(event.target.value);
    };

    const [experience, setExperience] = useState('Startup');
    const handleChange2 = (event) => {
        setExperience(event.target.value);
    };

    const [state1, setState1] = useState({
        checkedB: false
    });
    const [state2, setState2] = useState({
        checkedB: false
    });
    const [state3, setState3] = useState({
        checkedB: true
    });
    const handleSwitchChange1 = (event) => {
        setState1({ ...state1, [event.target.name]: event.target.checked });
    };
    const handleSwitchChange2 = (event) => {
        setState2({ ...state2, [event.target.name]: event.target.checked });
    };
    const handleSwitchChange3 = (event) => {
        setState3({ ...state3, [event.target.name]: event.target.checked });
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <SubCard title="General Settings">
                    <form noValidate autoComplete="off">
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="outlined-basic5"
                                    fullWidth
                                    label="Bank Account Name"
                                    defaultValue="Asoka_Tana_16"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="outlined-basic5"
                                    fullWidth
                                    label="Bank Account Number"
                                    defaultValue="Asoka_Tana_16"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField id="outlined-basic6" fullWidth label="Account Email" defaultValue="demo@sample.com" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="outlined-select-language"
                                    select
                                    fullWidth
                                    label="Bank Name"
                                    value={currency}
                                    onChange={handleChange1}
                                >
                                    {currencies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="outlined-select-experience1"
                                    select
                                    fullWidth
                                    label="Primary Bank Branch"
                                    value={experience}
                                    onChange={handleChange2}
                                >
                                    {experiences.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="outlined-basic5"
                                    fullWidth
                                    label="NIC "
                                    defaultValue="Asoka_Tana_16"
                                />
                            </Grid>
                        </Grid>
                    </form>
                </SubCard>
                <Grid item xs={12} sx={{ mt: 3 }}>
            <Grid spacing={2} container justifyContent="flex-end">
                <Grid item>
                    <AnimateButton>
                        <Button variant="contained">Update Bank Details</Button>
                    </AnimateButton>
                </Grid>
                <Grid item>
                    <Button sx={{ color: 'error.main' }}>Clear</Button>
                </Grid>
            </Grid>
        </Grid>
            </Grid>
            
        </Grid>
    );
};

export default MyAccount;
