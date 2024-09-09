import React from "react"
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../dashboard/DashboardNavbar";
import ArgonBox from "../../components/ArgonBox";
import { Card } from "@mui/material";
import ArgonTypography from "../../components/ArgonTypography";
import Table from "../../examples/Tables/Table";
import { viewAuditTableData } from "./data/viewAuditData";
import ViewAuditTable from "./components/ViewAuditTable";

const ViewAuditHome = (props) => {
    const { columns, rows } = viewAuditTableData
    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
                <ArgonBox py={3}>
                    <ArgonBox mb={3}>
                        <Card>
                            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                                <ArgonTypography variant="h6">Audit View</ArgonTypography>
                            </ArgonBox>
                            <ArgonBox
                                sx={{
                                    "& .MuiTableRow-root:not(:last-child)": {
                                        "& td": {
                                            borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                                                `${borderWidth[1]} solid ${borderColor}`,
                                        },
                                    },
                                }}
                            > <ViewAuditTable columns={columns} rows={rows} /></ArgonBox>
                        </Card>
                    </ArgonBox>
                </ArgonBox>
            </DashboardLayout>
        </>
    )
};

export default ViewAuditHome;
