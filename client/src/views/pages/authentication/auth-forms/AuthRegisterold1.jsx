// JWTRegister.js

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
import Typography from '@mui/material/Typography';

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

const JWTRegister = ({ ...others }) => {
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
        <Formik
            initialValues={{
                full_name: '',
                email: '',
                contact_no: '',
                password: '',
                con_password: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                full_name: Yup.string()
                    .matches(/^[A-Za-z]+$/, 'Full name should not contain numbers')
                    .max(255)
                    .required('First name is required'),
                contact_no: Yup.string()
                    .matches(/^\+?\d{10,12}$/, 'Contact No should be 10 to 12 digits with an optional leading + sign')
                    .required('Contact No is required'),
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                password: Yup.string().max(255).required('Password is required'),
                con_password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    // await register(values.email, values.password, values.firstName, values.lastName);
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

                    // Navigate to bank details page
                    navigate('/AuthBank');
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
                    <FormControl fullWidth error={Boolean(touched.full_name && errors.full_name)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-email-register">Full name</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-register"
                            type="text"
                            value={values.full_name}
                            name="full_name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                        />
                        {touched.full_name && errors.full_name && (
                            <FormHelperText error id="standard-weight-helper-text--register">
                                {errors.full_name}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-register"
                            type="email"
                            value={values.email}
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                        />
                        {touched.email && errors.email && (
                            <FormHelperText error id="standard-weight-helper-text--register">
                                {errors.email}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FormControl fullWidth error={Boolean(touched.contact_no && errors.contact_no)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-contact-number">Contact number</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-contact-number"
                            type="numbers"
                            value={values.contact_no}
                            name="contact_no"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                        />
                        {touched.contact_no && errors.contact_no && (
                            <FormHelperText error id="standard-weight-helper-text--register">
                                {errors.contact_no}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password-register"
                            type={showPassword ? 'text' : 'password'}
                            value={values.password}
                            name="password"
                            label="Password"
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
                        {touched.password && errors.password && (
                            <FormHelperText error id="standard-weight-helper-text-password-register">
                                {errors.password}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FormControl fullWidth error={Boolean(touched.con_password && errors.con_password)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-confrim-password-register">Confrim Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-confrim-password-register"
                            type={showPassword ? 'text' : 'password'}
                            value={values.con_password}
                            name="con_password"
                            label="Password"
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
                        {touched.con_password && errors.con_password && (
                            <FormHelperText error id="standard-weight-helper-text-confirm-password-register">
                                {errors.con_password}
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
    );
};

export default JWTRegister;
