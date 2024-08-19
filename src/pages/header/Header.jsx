import React, { Suspense, useContext } from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from "../../context/AuthContext";
import { mainListItems, secondaryListItems } from "./listItems";
import Routes from "../../routes";
// import { AnimatePresence } from "framer-motion";
import { unstable_HistoryRouter as BrowserRouter } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import profile from "../../assets/images/profile.png"
import logo from "../../assets/logo.png"
import { makeStyles } from '@mui/styles';
import history from "../../history";
import Copyright from "../../components/Copyright";
import config from "../../config";

const drawerWidth = 220;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
    typography: {
        fontFamily: 'Bahnschrift', // Replace 'YourFont' with the name of the font you want to use
    },
    palette: {
        primary: {
            main: '#ffffff', // Replace with your desired color
        },
        secondary: {
            main: '#333333'
        }
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: config.appBarBackgroundColor, // Change to your preferred App Bar color
              },
            },
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: config.muiDrawerBackgroundColor, // Change to your preferred Side Nav Bar color
              },
            },
          },
        MuiCssBaseline: {
            styleOverrides: `
              body {
                background: ${config.backgroundLinearGradient};
              }
            `,
          },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#1a237e',
                    '&$focused': {
                        color: '#f50057', // Set the focused label color to a different color (e.g., pink in this example)
                    },
                },
                filled: {
                    color: '#1a237e',
                    '&$focused': {
                        color: '#f50057', // Set the focused label color to a different color (e.g., pink in this example)
                    },
                }
            },
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    '&:before': {
                        borderBottom: '2px solid var(--TextField-brandBorderColor)',
                    },
                    '&:hover:not(.Mui-disabled, .Mui-error):before': {
                        borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
                    },
                    '&.Mui-focused:after': {
                        borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
                    },
                },
            },
        },
    },
});
const useStyles = makeStyles((theme) => ({
    logo: {
        // marginRight: theme.spacing(2), // Adjust as needed
        // Add any other logo styling here
    },
    title: {
        flexGrow: 1,
    },
}));
export default function HeaderComponent() {
    const classes = useStyles();
    const userDetail = JSON.parse(localStorage.getItem('userDetail'))
    console.log(userDetail)
    const { logout } = useContext(AuthContext);
    const onLogout = (e) => {
        e.preventDefault();
        logout();

    }
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return userDetail && (
        // <AnimatePresence>
        <Suspense
            fallback={
                <div className="d-flex align-items-center vh-100 justify-content-center text-center font-weight-bold font-size-lg py-3">
                    <div className="w-50 mx-auto">
                        {/* <Loader /> */}
                    </div>
                </div>
            }>
            <BrowserRouter history={history}>
                <ThemeProvider theme={defaultTheme}>
                    <Box sx={{ display: 'flex' }}>
                        <CssBaseline />
                        <AppBar color="secondary" position="absolute" open={open}>
                            <Toolbar
                                sx={{
                                    pr: '2px', // keep right padding when drawer closed
                                }}
                            >
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={toggleDrawer}
                                    sx={{
                                        marginRight: '30px',
                                        ...(open && { display: 'none' }),
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography
                                    component="h1"
                                    variant="h6"
                                    color="inherit"
                                    noWrap
                                    sx={{ flexGrow: 1 }}
                                >
                                    {`Hello! ${userDetail.userName}`}
                                </Typography>
                                <Avatar alt="profile" src={profile} />
                                <IconButton color="inherit" onClick={onLogout}>

                                    <LogoutIcon />

                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        <Drawer variant="permanent" open={open}>
                            <Toolbar
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    px: [0.1],
                                }}
                            >
                                {open && (
                                    <img
                                        src={logo}
                                        alt="Logo"
                                        //className={classes.logo}
                                        style={{
                                            width: '100%',   // Set the width to 'auto' to fit the image within the Toolbar
                                            height: '50%', // Set the height to '100%' to maintain the aspect ratio
                                        }}
                                    />
                                )}
                                <IconButton onClick={toggleDrawer}>
                                    <ChevronLeftIcon />
                                </IconButton>
                            </Toolbar>
                            <Divider />
                            <List component="nav">
                                {mainListItems}
                                <Divider sx={{ my: 1 }} />
                                {secondaryListItems}
                            </List>
                        </Drawer>
                        <Box
                            component="main"
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'light'
                                        ? theme.palette.white
                                        : theme.palette.white,
                                flexGrow: 1,
                                height: '100vh',
                                overflow: 'auto',
                                display: 'flex', // Add this line
                                flexDirection: 'column', // Add this line
                            }}
                        >
                            <Toolbar />
                            <Container
                                maxWidth={false}
                                disableGutters
                                sx={{
                                  mt: 0.2,
                                    mb: 2,
                                    flexGrow: 1
                                }}>
                                <Routes />
                            </Container>
                            <Copyright sx={{ pt: 4 }} />

                        </Box>
                    </Box>
                </ThemeProvider>
            </BrowserRouter>
        </Suspense>
        // </AnimatePresence>
    );
}
