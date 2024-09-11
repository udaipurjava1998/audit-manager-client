
import React from "react"
import ArgonButton from "../../../components/ArgonButton";
const ActionButton = ({ isOpened, onClick }) => {


    return (

        <ArgonButton
            //endIcon={isOpened ? <Remove /> : <Add />}
            size="small"
            sx={{ width: 40, fontSize: 10 }}
            onClick={onClick} to={"/dev"}
            color={isOpened ? "error" : "success"} >
            {isOpened ? 'Close' : 'History'}
        </ArgonButton>

    )
};

export default ActionButton;
