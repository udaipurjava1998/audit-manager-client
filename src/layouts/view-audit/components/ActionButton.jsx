import { Icon, Menu, MenuItem } from "@mui/material";
import React from "react"

const ActionButton = ({isOpened, onClick }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>


            <Icon onClick={handleClick} sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
                more_vert
            </Icon>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => {
                    setAnchorEl(null);
                    onClick()
                }}>{isOpened?'Close':'History'}</MenuItem>
            </Menu>
        </div>
    )
};

export default ActionButton;
