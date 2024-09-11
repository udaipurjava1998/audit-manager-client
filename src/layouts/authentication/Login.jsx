import { Box, Button, CircularProgress, createTheme, CssBaseline, Grid, Link, Paper, Switch, TextField, ThemeProvider, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useToast } from "../../components/toast/Toast";
import config from "../../config";
import IllustrationLayout from "./components/IllustrationLayout";
import ArgonBox from "../../components/ArgonBox";
import ArgonInput from "../../components/ArgonInput";
import ArgonTypography from "../../components/ArgonTypography";
import ArgonButton from "../../components/ArgonButton";

const defaultTheme = createTheme({
    gradients: {
        primary: 'linear-gradient(to right, #4332e9, #6e9336)',
    },
});
// Image
const bgImage =
    "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg";

const Login = (props) => {
    const { state: ContextState, login } = useContext(AuthContext);
    const [userNameError, setUserNameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const { toast } = useToast();
    const networkErrorMsg = "I'm sorry, but it seems like there is a network error preventing me from displaying the requested content. Please check your internet connection and try again later. If the issue persists, please contact your network administrator for further assistance.";
    const [rememberMe, setRememberMe] = useState(false);

    const handleSetRememberMe = () => setRememberMe(!rememberMe);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get('username'))
        console.log(data.get('password'))
        console.log((userNameError !== '' && passwordError !== ''))
        let isValid = false;
        if (data.get('username') === '') {
            setUserNameError("Please Enter User Name");
            isValid = false;
        } else {
            setUserNameError(null)
            isValid = true;
        }

        if (data.get('password') === '') {
            setPasswordError("Please Enter Password");
            isValid = false;
        } else {
            setPasswordError(null)
            isValid = true;
        }


        if (isValid) {

            let res = await login(data.get('username'), data.get('password'));

            console.log(res)
            let loginError;
            if (res != null) {
                if (res.code == "ERR_NETWORK") {
                    loginError = networkErrorMsg
                } else {
                    if (res.response) {
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
            <IllustrationLayout
                title="Sign In"
                description="Enter your email and password to sign in"
                illustration={{
                    image: bgImage,
                    title: '"Attention is the new currency"',
                    description:
                        "The more effortless the writing looks, the more effort the writer actually put into the process.",
                }}
            >
                <ArgonBox component="form" role="form" onSubmit={handleSubmit}>
                    <ArgonBox mb={2}>
                        <ArgonInput helperText={userNameError} error={Boolean(userNameError)} type="text" id="username" name="username" placeholder="Email" size="large" />
                    </ArgonBox>
                    <ArgonBox mb={2}>
                        <ArgonInput helperText={passwordError} error={Boolean(passwordError)} type="password" id="password" name="password" placeholder="Password" size="large" />
                    </ArgonBox>
                    <ArgonBox display="flex" alignItems="center">
                        <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                        <ArgonTypography
                            variant="button"
                            fontWeight="regular"
                            onClick={handleSetRememberMe}
                            sx={{ cursor: "pointer", userSelect: "none" }}
                        >
                            &nbsp;&nbsp;Remember me
                        </ArgonTypography>
                    </ArgonBox>
                    <ArgonBox mt={4} mb={1}>
                        <ArgonButton type="submit" disabled={ContextState.isLoginPending} color={ContextState.isLoginPending ? "secondary" : "info"} size="large" fullWidth>
                            Sign In
                        </ArgonButton>
                    </ArgonBox>
                    <ArgonBox mt={3} textAlign="center">
                        <ArgonTypography variant="button" color="text" fontWeight="regular">
                            Don&apos;t have an account?{" "}
                            <ArgonTypography
                                component={Link}
                                to="/authentication/sign-up"
                                variant="button"
                                color="info"
                                fontWeight="medium"
                            >
                                Sign up
                            </ArgonTypography>
                        </ArgonTypography>
                    </ArgonBox>
                </ArgonBox>
            </IllustrationLayout>
        </>
    );
};

export default Login;
