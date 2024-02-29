import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useAuth from 'hooks/useAuth';

// navigate from react-router-dom
import { useNavigate } from 'react-router-dom';

// third-party
import OtpInput from 'react18-input-otp';

// project imports
import { ThemeMode } from 'config';

import config from '../../../../config';

// ============================|| STATIC - CODE VERIFICATION ||============================ //

async function sendVerificationCode(verificationCode) {
    try {
        // Make a fetch or axios call to your backend API to send the verification code
        // get the phoneNumber from localstorage tempUser
        const tempUser = JSON.parse(localStorage.getItem('tempUser'));
        const phoneNumber = tempUser.phoneNumber;

        if (!phoneNumber) {
            console.error('No phone number found');
            return;
        }

        const response = await fetch(config.apiUrl + 'api/referral/verifyCode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phoneNumber, verificationCode })
        });

        if (!response.ok) {
            throw new Error('Failed to send verification code');
        } else {
            const data = await response.json();
            console.log(data);
        }

        // Handle success response if necessary
        console.log('Verified'); // navigate to the login page
        navigate('/login');
    } catch (error) {
        console.error('Error sending verification code:', error.message);
        // Handle error
    }
}

const AuthCodeVerification = () => {
    const theme = useTheme();
    const [otp, setOtp] = useState('');
    const borderColor = theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[200] : theme.palette.grey[300];
    const navigate = useNavigate();

    const handleContinue = async () => {
        // Check if OTP is not empty before sending
        if (otp.trim() === '') {
            console.error('Verification code is empty');
            return;
        }

        // Send the verification code to the server
        await sendVerificationCode(otp);
        navigate('/login');
        // remove tempUser from localstorage
        localStorage.removeItem('tempUser');
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <OtpInput
                    value={otp}
                    onChange={(otpNumber) => setOtp(otpNumber)}
                    numInputs={4}
                    containerStyle={{ justifyContent: 'space-between' }}
                    inputStyle={{
                        width: '100%',
                        margin: '8px',
                        padding: '10px',
                        border: `1px solid ${borderColor}`,
                        borderRadius: 4,
                        ':hover': {
                            borderColor: theme.palette.primary.main
                        }
                    }}
                    focusStyle={{
                        outline: 'none',
                        border: `2px solid ${theme.palette.primary.main}`
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Button disableElevation fullWidth size="large" type="submit" variant="contained" onClick={handleContinue}>
                    Continue
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                    <Typography>Did not receive the massage?</Typography>
                    <Typography variant="body1" sx={{ minWidth: 85, ml: 2, textDecoration: 'none', cursor: 'pointer' }} color="primary">
                        Resend code
                    </Typography>
                </Stack>
            </Grid>
        </Grid>
    );
};
export default AuthCodeVerification;
