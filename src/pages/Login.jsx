import { Box, Button, CircularProgress, createTheme, CssBaseline, Grid, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import logo from "../assets/logo.png"
import { AuthContext } from "../context/AuthContext";
import { useToast } from "../components/toast/Toast";
import config from "../config";

const defaultTheme = createTheme({
    gradients: {
        primary: 'linear-gradient(to right, #4332e9, #6e9336)',
    },
});

const Login = (props) => {
    const { state: ContextState, login } = useContext(AuthContext);
    const [userNameError, setUserNameError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const { toast } = useToast();
    const networkErrorMsg = "I'm sorry, but it seems like there is a network error preventing me from displaying the requested content. Please check your internet connection and try again later. If the issue persists, please contact your network administrator for further assistance.";

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get('username'))
        console.log(data.get('password'))
        console.log((userNameError !== '' && passwordError !== ''))
        if (data.get('username') === '') {
            setUserNameError("Please Enter User Name");
        } else {
            setUserNameError(null)
        }

        if (data.get('password') === '') {
            setPasswordError("Please Enter Password");
        } else {
            setPasswordError(null)
        }


        if (userNameError !== '' && passwordError !== '') {

            let res = await login(data.get('username'), data.get('password'));

            console.log(res)
            let loginError;
            if (res != null) {
                if (res.code == "ERR_NETWORK") {
                    loginError = networkErrorMsg
                } else {
                    if(res.response){
                        switch (res.response.status) {
                            case 401:
                                loginError = "Invalid Username or Password"
                                break;
                        }
                    }
                 
                }

                if (loginError) {
                    toast('error', loginError);
                }

            }






        }
    };
    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Box sx={{ display: 'flex' }}>
                    <Grid
                        container
                        component="main"
                        sx={{
                            background: config.backgroundLinearGradient,
                            minHeight: '100vh', // Ensures full height of the viewport
                            justifyContent: { xs: 'center', md: 'flex-start' }, // Center on small screens
                            alignItems: { xs: 'center', md: 'flex-start' },     // Center on small screens
                            padding: { xs: 2, md: 0 },                          // Add padding on smaller screens
                        }}
                    >
                        <CssBaseline />
                        <Grid
                            m={2}
                            container
                            spacing={2}
                            direction="column"
                            justifyContent="center"
                            alignItems="flex-start"
                        >
                            <Grid item xs="2" sm="2" md="3">

                                <img
                                    alt="LOGO"
                                    src={logo}
                                    style={{
                                        width: '40%',   // Set the width to 'auto' to fit the image within the Toolbar
                                        height: 'auto', // Set the height to '100%' to maintain the aspect ratio
                                    }}></img>
                            </Grid>
                            <Grid item xs="2" sm="2" md="3">
                                <Typography variant="h4" component="h2">Identify risks, ensure business success.</Typography>
                            </Grid>
                            <Grid item xs={8} sm={8} md={5} >
                                <Box
                                    component={Paper} elevation={6}
                                    sx={{
                                        p: 4,
                                        m: 2,
                                        borderRadius: '30px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        //  height: '50%', // Set the desired height
                                    }}
                                >

                                    <Grid>
                                        <Typography component="h4" variant="h4">
                                            Log in
                                        </Typography>

                                        <Box
                                            sx={{

                                                width: '100%',
                                                height: '4px',
                                                background: defaultTheme.gradients.primary, // Example gradient
                                            }}
                                        />
                                    </Grid>

                                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                        <TextField
                                            margin="normal"
                                            size="small"
                                            required
                                            fullWidth
                                            id="username"
                                            label="User Name"
                                            name="username"
                                            error={Boolean(userNameError)}
                                            helperText={userNameError}
                                            autoComplete="username"
                                            autoFocus
                                        />
                                        <TextField
                                            margin="normal"
                                            size="small"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            error={Boolean(passwordError)}
                                            helperText={passwordError}
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                        />


                                        {!ContextState.isLoginPending ? (
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{
                                                    mt: 8,
                                                    width: '30%',
                                                    mb: 2,
                                                    background: defaultTheme.gradients.primary,
                                                    transition: 'transform 0.3s ease', // Smooth transition for the transform effect
                                                    '&:hover': {
                                                        background: defaultTheme.gradients.secondary, // Hover background color
                                                        transform: 'scale(1.1)', // Scale up by 10%
                                                    }
                                                }}
                                            >
                                                Sign In
                                            </Button>
                                        ) : (
                                            <Box
                                                display='flex'
                                                justifyContent='center'
                                                alignItems='center'
                                                sx={{ width: '30%', height: '56px' }} // Adjust height to match button
                                            >
                                                <CircularProgress size={56} /> {/* Adjust size to match button height */}
                                            </Box>
                                        )}




                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </ThemeProvider>
        </>
    );
};

export default Login;
