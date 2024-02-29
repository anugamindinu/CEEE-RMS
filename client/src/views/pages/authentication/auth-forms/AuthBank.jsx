import React, { useEffect } from 'react';
import { useDispatch } from 'store';
import { Link, useNavigate } from 'react-router-dom';
import {
    Button,
    Box,
    Typography,
    Grid,
    FormControlLabel,
    Checkbox,
    IconButton,
    InputAdornment,
    FormControl,
    InputLabel,
    OutlinedInput,
    FormHelperText,
    Select,
    MenuItem
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTheme } from '@mui/material/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { openSnackbar } from 'store/slices/snackbar';
import { strengthIndicator, strengthColor } from 'utils/password-strength'; // Import password strength functions if not already imported

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
                    account_number: '',
                    bank_name: '',
                    branch: '',
                    NIC: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    account_name: Yup.string().max(255).required('Account name is required'),
                    account_number: Yup.string().max(100, 'Account number must be 100 characters').required('Account number is required'),
                    bank_name: Yup.string().required('Please select the bank name'),
                    branch: Yup.string().required('Please select the bank branch'),
                    NIC: Yup.string()
                        .matches(
                            /^(?:\d{9}[vVxX]|\d{12})$/,
                            'NIC should either contain 9 digits with an optional last character as a letter (v/V/x/X) or have exactly 12 digits'
                        )
                        .required('NIC is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        // get the tempUser from localStorage
                        const tempUser = JSON.parse(localStorage.getItem('tempUser'));

                        // add tempUser to the values
                        values = { ...values, ...tempUser };

                        console.log('Verification code sent to your account:', values);

                        await register(values);
                        
                        // navigate to /pages/code-verification/code-verification3
                        navigate('/pages/code-verification/code-verification3', { replace: true });

                        // await register(values);

                        // if (scriptedRef.current) {
                        //     setStatus({ success: true });
                        //     setSubmitting(false);
                        //     dispatch(
                        //         openSnackbar({
                        //             open: true,
                        //             message: 'Your bank details have been successfully registered.',
                        //             variant: 'alert',
                        //             alert: {
                        //                 color: 'success'
                        //             },
                        //             close: false
                        //         })
                        //     );

                        //     setTimeout(() => {
                        //         // Redirect the user to the login page or any other desired page
                        //         navigate('/login', { replace: true });
                        //     }, 1500);
                        // }
                    } catch (err) {
                        console.error(err);
                        // if (scriptedRef.current) {
                        //     setStatus({ success: false });
                        //     setErrors({ submit: err.message });
                        //     setSubmitting(false);
                        // }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.account_name && errors.account_name)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-account-name">Account name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-account-name"
                                type="text"
                                value={values.account_name}
                                name="account_name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.account_name && errors.account_name && (
                                <FormHelperText error id="standard-weight-helper-text-account-name">
                                    {errors.account_name}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.account_number && errors.account_number)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-account-no">Account number</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-account-no"
                                type="text"
                                value={values.account_number}
                                name="account_number"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.account_number && errors.account_number && (
                                <FormHelperText error id="standard-weight-helper-text-account-no">
                                    {errors.account_no}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.bank_name && errors.bank_name)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-bank-name">Bank name</InputLabel>
                            <Select
                                id="outlined-adornment-bank-name"
                                value={values.bank_name}
                                name="bank_name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            >
                                <MenuItem value="Sampath">Sampath</MenuItem>
                                <MenuItem value="Commercial">Commercial</MenuItem>
                                <MenuItem value="NSB">NSB</MenuItem>
                            </Select>
                            {touched.bank_name && errors.bank_name && (
                                <FormHelperText error id="standard-weight-helper-text-bank-name">
                                    {errors.bank_name}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.branch && errors.branch)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-bank-branch">Bank branch</InputLabel>
                            <Select
                                id="outlined-adornment-bank-branch"
                                value={values.branch}
                                name="branch"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            >
                                <MenuItem value="Colombo">Colombo</MenuItem>
                                <MenuItem value="Kottawa">Kottawa</MenuItem>
                                <MenuItem value="Nugegoda">Nugegoda</MenuItem>
                            </Select>
                            {touched.branch && errors.branch && (
                                <FormHelperText error id="standard-weight-helper-text-bank-branch">
                                    {errors.branch}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.NIC && errors.NIC)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-NIC">NIC</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-NIC"
                                type={showPassword ? 'text' : 'text'}
                                value={values.NIC}
                                name="NIC"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                }}
                                inputProps={{}}
                            />
                            {touched.NIC && errors.NIC && (
                                <FormHelperText error id="standard-weight-helper-text-NIC">
                                    {errors.NIC}
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
                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Complete
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default JWTBank;
