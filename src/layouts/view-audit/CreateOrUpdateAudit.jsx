import React from "react"
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../dashboard/DashboardNavbar";
import ArgonBox from "../../components/ArgonBox";
import { Card, Grid } from "@mui/material";
import ArgonTypography from "../../components/ArgonTypography";
import ArgonInput from "../../components/ArgonInput";
import SubTable from "./components/SubTable";
import ArgonButton from "../../components/ArgonButton";
import AttributeInputField from "./components/AttributeInputField";
import useValidation from "../../hooks/GlobalValidationHook";
import { ValidationRuleNames } from "../../hooks/validation";

const CreateOrUpdateAudit = (props) => {
    const initialTempAttibuteData = {
        id: null,
        attributeName: null,
        oldValue: null,
        newValue: null,
        changedBy: null,
        validationRules: {
            attributeName: [
                { name: ValidationRuleNames.isRequired, value: true },
            ],
        }

    };
    const [subData, setSubData] = React.useState([]);
    const [attributeTrackerObject, setAttributeTrackerObject] = React.useState(initialTempAttibuteData);

    const valid = useValidation(attributeTrackerObject, setAttributeTrackerObject);
    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
                <ArgonBox py={3}>
                    <ArgonBox mb={3} >
                        <Card>
                            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={2} >
                                <ArgonTypography variant="h6">Add Audit Object Tracker</ArgonTypography>
                                <ArgonButton sx={{ width: 30 }} color={"success"}>Save</ArgonButton>
                            </ArgonBox>
                            <ArgonBox
                                px={4}
                                sx={{
                                    // height: '400px', // Set your desired height here
                                    "& .MuiTableRow-root:not(:last-child)": {
                                        "& td": {
                                            borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                                                `${borderWidth[1]} solid ${borderColor}`,
                                        },
                                    },
                                }}
                                //  component="form"
                                //  role="form"
                                onSubmit={() => { }}
                            >

                                <Grid container
                                    spacing={3}
                                    direction="row"
                                    sx={{
                                        justifyContent: "space-between",
                                        alignItems: "start",
                                    }}>

                                    <Grid item xs={2} sm={4} md={4} >
                                        <ArgonBox mb={2}>
                                            <ArgonInput type="text" id="refObjectId" name="refObjectId" placeholder="Ref Object Id" size="large" />
                                        </ArgonBox>
                                    </Grid>
                                    <Grid item xs={2} sm={4} md={4} >
                                        <ArgonBox mb={2}>
                                            <ArgonInput type="text" id="eventType" name="eventType" placeholder="Event Type" size="large" />
                                        </ArgonBox>
                                    </Grid>
                                    <Grid item xs={2} sm={4} md={4}>
                                        <ArgonBox mb={2}>
                                            <ArgonInput type="text" id="eventOccurence" name="eventOccurence" placeholder="Event Occurence" size="large" />
                                        </ArgonBox>
                                    </Grid>

                                </Grid>
                            </ArgonBox>
                            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={2} >
                                <ArgonTypography variant="h6">Add Audit  Attribute  Tracker</ArgonTypography>
                                <ArgonButton
                                    onClick={async () => {
                                        if (await valid.validateForm()) {
                                            console.log("Adding attribute:", attributeTrackerObject);
                                            setSubData((previousValue) => [
                                                ...previousValue,
                                                attributeTrackerObject
                                            ]);
                                            console.log("Resetting attribute tracker to:", initialTempAttibuteData);
                                            setAttributeTrackerObject(initialTempAttibuteData);
                                            console.log("after reset attribute:", attributeTrackerObject)
                                        }
                                    }}
                                    sx={{ width: 30 }}
                                    color={"success"}
                                >
                                    Add
                                </ArgonButton>

                            </ArgonBox>
                            <ArgonBox
                                px={4}
                                sx={{
                                    // height: '400px', // Set your desired height here
                                    "& .MuiTableRow-root:not(:last-child)": {
                                        "& td": {
                                            borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                                                `${borderWidth[1]} solid ${borderColor}`,
                                        },
                                    },
                                }}
                                component="form"
                                role="form"
                                onSubmit={() => {

                                }}
                            >

                                <Grid container
                                    spacing={3}
                                    direction="row"
                                    sx={{
                                        justifyContent: "space-between",
                                        alignItems: "start",
                                    }}>
                                    <AttributeInputField
                                        placeholder={"Attribute Name"}
                                        value={attributeTrackerObject.attributeName}
                                        fieldName={"attributeName"}
                                        valid={valid}
                                    />
                                    
                                    <AttributeInputField
                                        placeholder={"Old Value"}
                                        value={attributeTrackerObject.oldValue}
                                        fieldName={"oldValue"}
                                        valid={valid}
                                    />
                                    <AttributeInputField
                                        placeholder={"New Value"}
                                        value={attributeTrackerObject.newValue}
                                        fieldName={"newValue"}
                                        valid={valid}
                                    />
                                    <AttributeInputField
                                        placeholder={"Changed By"}
                                        value={attributeTrackerObject.changedBy}
                                        fieldName={"changedBy"}
                                        valid={valid}
                                    />

                                    {/* <AttributeInputField
                                        id={'oldValue'}
                                        placeholder="Old Value"
                                        data={attributeTrackerObject}
                                        onChange={(e) => onChangeTempValue('oldValue', e.target.value)} />
                                    <AttributeInputField
                                        id={'newValue'}
                                        placeholder="New Value"
                                        data={attributeTrackerObject}
                                        onChange={(e) => onChangeTempValue('newValue', e.target.value)} />
                                    <AttributeInputField
                                        id={'changedBy'}
                                        placeholder="Changed By"
                                        data={attributeTrackerObject}
                                        onChange={(e) => onChangeTempValue('changedBy', e.target.value)} /> */}



                                </Grid>
                            </ArgonBox>
                            <SubTable
                                subData={subData}
                                gridSize={{ xs: 12 }}
                                title={null}></SubTable>
                        </Card>
                    </ArgonBox>
                </ArgonBox>
            </DashboardLayout>

        </>
    )
};

export default CreateOrUpdateAudit;
