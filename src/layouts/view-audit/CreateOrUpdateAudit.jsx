import React from "react"
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../dashboard/DashboardNavbar";
import ArgonBox from "../../components/ArgonBox";
import { Card, Grid, Tooltip } from "@mui/material";
import ArgonTypography from "../../components/ArgonTypography";
import ArgonInput from "../../components/ArgonInput";
import SubTable from "./components/SubTable";
import ArgonButton from "../../components/ArgonButton";
import AttributeInputField from "./components/AttributeInputField";
import useValidation from "../../hooks/GlobalValidationHook";
import { initialTempAttibuteData, initialTempObjectData } from "./data/createOrUpdate";
import ObjectTrackerInputField from "./components/ObjectTrackerInputField";
import { DatePicker } from "@mui/x-date-pickers";
import CustomDatepicker from "./components/CustomDatePicker";
import moment from "moment";
import { DateFormatter, eventOccurenceDateFormat } from "../../utils/DateFormatter";
import AuditModuleServiceAPI from "../../rest-services/audit-module-service";

const CreateOrUpdateAudit = (props) => {

    const [subData, setSubData] = React.useState([]);
    const [attributeTrackerData, setAttributeTrackerData] = React.useState(initialTempAttibuteData);
    const attributeTrackerValidator = useValidation(attributeTrackerData, setAttributeTrackerData);
    const [objectTrackerData, setObjectTrackerData] = React.useState(initialTempObjectData);
    const objectTrackerValidator = useValidation(objectTrackerData, setObjectTrackerData);
    const isCreated = () => {
        return objectTrackerData.id === null;
    }

    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
                <ArgonBox py={3}>
                    <ArgonBox mb={3} >
                        <Card>
                            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={2} >
                                <ArgonTypography variant="h6">Add Audit Object Tracker</ArgonTypography>
                                <ArgonButton onClick={async () => {
                                    if (await objectTrackerValidator.validateForm()) {
                                        console.log("Adding attribute:", objectTrackerData);
                                        var response = await AuditModuleServiceAPI.createAuditObjectChangeTracker(objectTrackerData);
                                       console.log(response)
                                        if(response.status===200){
                                            objectTrackerValidator.handleChange("id",response.data.id);
                                        }
                                    }
                                }}
                                    sx={{ width: 30 }}
                                    color={"success"}>Save</ArgonButton>
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
                            >

                                <Grid container
                                    spacing={3}
                                    direction="row"
                                    sx={{
                                        justifyContent: "space-between",
                                        alignItems: "start",
                                    }}>

                                    {/* <Grid item xs={2} sm={4} md={4} >
                                        <ArgonBox mb={2}>
                                            <ArgonInput type="text" id="refObjectId" name="refObjectId" placeholder="Ref Object Id" size="large" />
                                        </ArgonBox>
                                    </Grid> */}
                                    <ObjectTrackerInputField
                                        placeholder={"Ref Object Id"}
                                        value={objectTrackerData.refObjectId}
                                        fieldName={"refObjectId"}
                                        validator={objectTrackerValidator} />
                                    <ObjectTrackerInputField
                                        placeholder={"Event Type"}
                                        value={objectTrackerData.eventType}
                                        fieldName={"eventType"}
                                        validator={objectTrackerValidator} />

                                    {/* <ObjectTrackerInputField
                                        placeholder={"Event Occurence"}
                                        value={objectTrackerData.eventOccurence}
                                        fieldName={"eventOccurence"}
                                        validator={objectTrackerValidator} /> */}
                                    <Grid item xs={2} sm={4} md={4} >
                                        <ArgonBox mb={2}>
                                            <CustomDatepicker defaultValue={objectTrackerData.eventOccurence} onChange={(newDate) => {

                                                objectTrackerValidator.handleChange("eventOccurence", DateFormatter.dateToString(newDate, eventOccurenceDateFormat))
                                            }}></CustomDatepicker>
                                        </ArgonBox>
                                    </Grid>
                                    {/* <Grid item xs={2} sm={4} md={4} >
                                        <ArgonBox mb={2}>
                                            <ArgonInput type="text" id="eventType" name="eventType" placeholder="Event Type" size="large" />
                                        </ArgonBox>
                                    </Grid>
                                    <Grid item xs={2} sm={4} md={4}>
                                        <ArgonBox mb={2}>
                                            <ArgonInput type="text" id="eventOccurence" name="eventOccurence" placeholder="Event Occurence" size="large" />
                                        </ArgonBox>
                                    </Grid> */}

                                </Grid>
                            </ArgonBox>
                            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={2} >
                                <ArgonTypography variant="h6">Add Audit  Attribute  Tracker</ArgonTypography>
                                <Tooltip title={isCreated() ? "" : "Please Save Audit first"}>
                                    <div>
                                        <ArgonButton
                                            onClick={async () => {
                                                if (await attributeTrackerValidator.validateForm()) {
                                                    console.log("Adding attribute:", attributeTrackerData);
                                                    setSubData((previousValue) => [
                                                        ...previousValue,
                                                        attributeTrackerData
                                                    ]);
                                                    console.log("Resetting attribute tracker to:", initialTempAttibuteData);
                                                    setAttributeTrackerData(initialTempAttibuteData);
                                                    console.log("after reset attribute:", attributeTrackerData)
                                                }
                                            }}
                                            sx={{ width: 30 }}
                                            disabled={isCreated()}
                                            color={"success"}
                                        >
                                            Add
                                        </ArgonButton>
                                    </div>
                                </Tooltip>

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
                                        value={attributeTrackerData.attributeName}
                                        fieldName={"attributeName"}
                                        validator={attributeTrackerValidator}
                                    />

                                    <AttributeInputField
                                        placeholder={"Old Value"}
                                        value={attributeTrackerData.oldValue}
                                        fieldName={"oldValue"}
                                        validator={attributeTrackerValidator}
                                    />
                                    <AttributeInputField
                                        placeholder={"New Value"}
                                        value={attributeTrackerData.newValue}
                                        fieldName={"newValue"}
                                        validator={attributeTrackerValidator}
                                    />
                                    <AttributeInputField
                                        placeholder={"Changed By"}
                                        value={attributeTrackerData.changedBy}
                                        fieldName={"changedBy"}
                                        validator={attributeTrackerValidator}
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
