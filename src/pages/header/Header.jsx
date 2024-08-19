import React, { useContext } from "react"
import { AuthContext } from "../../context/AuthContext";
import { IconButton } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
const Header = (props) => {
    const { logout } = useContext(AuthContext);
    const onLogout = (e) => {
        e.preventDefault();
        logout();

    }
    return (
        <>
            <IconButton color="inherit" onClick={onLogout}>

                <LogoutIcon />

            </IconButton>
        </>
    )
};

export default Header;
