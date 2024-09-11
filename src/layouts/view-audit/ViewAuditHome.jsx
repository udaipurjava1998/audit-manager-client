import React from "react"
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../dashboard/DashboardNavbar";
import ArgonBox from "../../components/ArgonBox";
import { Card } from "@mui/material";
import ArgonTypography from "../../components/ArgonTypography";
import { viewAuditTableData } from "./data/viewAuditData";
import ViewAuditTable from "./components/ViewAuditTable";
import AuditModuleServiceAPI from "../../rest-services/audit-module-service";
import ViewAuditTableSkeleton from "./components/ViewAuditTableSkeleton";
import ArgonButton from "../../components/ArgonButton";
import { Link } from "react-router-dom";

const ViewAuditHome = (props) => {
    const [response, setResponse] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const { columns, rows } = viewAuditTableData(response != null ? response.data : []);
    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await AuditModuleServiceAPI.findAll()
                setResponse(response)
            } catch (e) {

            } finally {
                setLoading(false);
            }
        }
        fetchData()
    }, [])
    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
                <ArgonBox py={3}>
                    <ArgonBox mb={3}>
                        <Card>
                            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={2} >
                                <ArgonTypography variant="h6">Audit View</ArgonTypography>
                                <ArgonButton component={Link} to={"./create"} color={"info"}>Create</ArgonButton>
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
                            >{loading ? <ViewAuditTableSkeleton columns={columns} /> : <ViewAuditTable columns={columns} rows={rows} />}</ArgonBox>
                        </Card>
                    </ArgonBox>
                </ArgonBox>
            </DashboardLayout>
        </>
    )
};

export default ViewAuditHome;
