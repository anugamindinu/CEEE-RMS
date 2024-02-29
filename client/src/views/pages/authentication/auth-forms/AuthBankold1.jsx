import React, { useEffect } from 'react';
import { useDispatch } from 'store';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Select, MenuItem } from '@mui/material';


// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import { openSnackbar } from 'store/slices/snackbar';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const JWTBank = ({ ...others }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const scriptedRef = useScriptRef();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = React.useState(false);
    const [checked, setChecked] = React.useState(false);

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState();
    const { register } = useAuth();


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('123456');
    }, []);

    return (
        <>
            <Formik
                initialValues={{
                account_name: '',
                account_no: '',
                bank_name: '',
                bank_branch: '',
                nic: '',
                submit: null
                }}
                validationSchema={Yup.object().shape({
                account_name: Yup.string().max(255).required('Account name is required'),
                account_no: Yup.string().max(100, 'Account number must be 100 characters').required('Account number is required'),
                bank_name: Yup.string().required('Please select the bank name'),
                bank_branch: Yup.string().required('Please select the bank branch'),
                nic: Yup.string()
                .matches(
                    /^(?:\d{9}[vVxX]|\d{12})$/,
                    'NIC should either contain 9 digits with an optional last character as a letter (v/V/x/X) or have exactly 12 digits'
                )
                .required('NIC is required'),
                con_password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        await register(values.email, values.password, values.firstName, values.lastName);
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: 'Your registration has been successfully completed.',
                                    variant: 'alert',
                                    alert: {
                                        color: 'success'
                                    },
                                    close: false
                                })
                            );

                            setTimeout(() => {
                                navigate('/login', { replace: true });
                            }, 1500);
                            
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                    <FormControl fullWidth error={Boolean(touched.account_name && errors.account_name)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-bank-account-name">Bank account name</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-bank-account-name"
                            type="text"
                            value={values.account_name}
                            name="account_name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                        />
                        {touched.account_name && errors.account_name && (
                            <FormHelperText error id="standard-weight-helper-text--register">
                            {errors.account_name}
                            </FormHelperText>
                        )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.account_no && errors.account_no)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-account-number">Account number</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-account-number"
                            type="numbers"
                            value={values.account_no}
                            name="account_no"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                        />
                        {touched.account_no && errors.account_no && (
                            <FormHelperText error id="standard-weight-helper-text--register">
                            {errors.account_no}
                            </FormHelperText>
                        )}
                        </FormControl>

                        <FormControl fullWidth error={Boolean(touched.bank_name && errors.bank_name)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-bank-account-name">Bank account name</InputLabel>
                            <Select
                                id="outlined-adornment-bank-account-name"
                                value={values.bank_name}
                                name="bank_name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{ id: 'outlined-adornment-bank-account-name' }}
                            >
                                <MenuItem value="co1">Sampath</MenuItem>
                                <MenuItem value="co2">Commercial</MenuItem>
                                <MenuItem value="co3">NSB</MenuItem>
                            </Select>
                            {touched.bank_name && errors.bank_name && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                {errors.bank_name}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl fullWidth error={Boolean(touched.bank_branch && errors.bank_branch)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-bank-branch-name">Primary bank branch</InputLabel>
                            <Select
                                id="outlined-adornment-bank-branch-name"
                                value={values.bank_branch}
                                name="bank_branch"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{ id: 'outlined-adornment-bank-branch-name' }}
                            >
                                <MenuItem value="co1">Colombo</MenuItem>
                                <MenuItem value="co2">Kottawa</MenuItem>
                                <MenuItem value="co3">Nugegoda</MenuItem>
                            </Select>
                            {touched.bank_branch && errors.bank_branch && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                {errors.bank_branch}
                                </FormHelperText>
                            )}
                        </FormControl>


                        <FormControl fullWidth error={Boolean(touched.nic && errors.nic)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-password-register">NIC</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password-register"
                            type={showPassword ? 'text' : 'nic'}
                            value={values.nic}
                            name="nic"
                            label="nic"
                            onBlur={handleBlur}
                            onChange={(e) => {
                            handleChange(e);
                            changePassword(e.target.value);
                            }}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                                >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            }
                            inputProps={{}}
                        />
                        {touched.nic && errors.nic && (
                            <FormHelperText error id="standard-weight-helper-text-password-register">
                            {errors.nic}
                            </FormHelperText>
                        )}
                        </FormControl>

                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1">
                                            Agree with &nbsp;
                                            <Typography variant="subtitle1" component={Link} to="#">
                                                Terms & Condition.
                                            </Typography>
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        {/* <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    content='Link'
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Next
                                </Button>
                            </AnimateButton>
                        </Box> */}
                    </form>
                )}
            </Formik>
        </>
    );
};

export default JWTBank;
