import { Grid } from "@mui/material";
import React from "react"
import ArgonBox from "../../../components/ArgonBox";
import ArgonInput from "../../../components/ArgonInput";

const AttributeInputField = ({ placeholder, fieldName,valid }) => {
    let error = valid.errors[fieldName];
    return (
        <Grid item xs={2} sm={3} md={3} key={fieldName}>
            <ArgonBox mb={2}>
                <ArgonInput
                    key={`key-${fieldName}`}
                    type="text"
                    id={fieldName}
                    name={fieldName}
                    placeholder={placeholder}
                    size="large"
                    helperText={error}
                    error={Boolean(error)}
                    onChange={(e) => valid.handleChange(fieldName, e.target.value)}
                    value={valid.state[fieldName]||''}
                />
            </ArgonBox>
        </Grid>
    )
};

export default AttributeInputField;
