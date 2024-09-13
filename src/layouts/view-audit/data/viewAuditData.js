import ArgonTypography from "../../../components/ArgonTypography";

// var data = [
//     {
//         "id": 1,
//         "refObjectId": 1001,
//         "eventType": "CREATE",
//         "eventOccurence": "2024-09-09T10:00:00Z",
//         "subData": [{
//             "id": 1,
//             "attributeName": "color",
//             "oldValue": "blue",
//             "newValue": "green",
//             "changedBy": "user123",

//         }, {
//             "id": 1,
//             "attributeName": "Name",
//             "oldValue": "Azhar",
//             "newValue": "Deen",
//             "changedBy": "user123",

//         },]
//     },
//     {
//         "id": 2,
//         "refObjectId": 1002,
//         "eventType": "UPDATE",
//         "eventOccurence": "2024-09-09T11:00:00Z",
//         "subData": [{
//             "id": 1,
//             "attributeName": "color",
//             "oldValue": "blue",
//             "newValue": "green",
//             "changedBy": "user123",

//         },]
//     },
//     {
//         "id": 3,
//         "refObjectId": 1003,
//         "eventType": "DELETE",
//         "eventOccurence": "2024-09-08T15:30:00Z",
//         "subData": [{
//             "id": 1,
//             "attributeName": "color",
//             "oldValue": "blue",
//             "newValue": "green",
//             "changedBy": "user123",

//         },]
//     },
//     {
//         "id": 4,
//         "refObjectId": 1004,
//         "eventType": "CREATE",
//         "eventOccurence": "2024-09-07T09:45:00Z",
//         "subData": [{
//             "id": 1,
//             "attributeName": "color",
//             "oldValue": "blue",
//             "newValue": "green",
//             "changedBy": "user123",

//         },]
//     },
//     {
//         "id": 5,
//         "refObjectId": 1005,
//         "eventType": "UPDATE",
//         "eventOccurence": "2024-09-06T12:15:00Z",
//         "subData": [{
//             "id": 1,
//             "attributeName": "color",
//             "oldValue": "blue",
//             "newValue": "green",
//             "changedBy": "user123",

//         },]
//     }
// ];

export function viewAuditTableData(data) {
    return {
        filterIntialValue : {
            sort: {},
            filter: {}
        },
        columns: [
            { name: "refObjectId", label: "Object ID", align: "left" },
            { name: "eventType", label: "Event Type", align: "left" },
            { name: "eventOccurence", label: "Event Occurrence", align: "center" },
            { name: "action", label: "Actions", align: "center" },
        ],
        rows:data==null?[]: data.map((audit) => ({
            refObjectId: (
                <ArgonTypography px={4} variant="caption" color="secondary" fontWeight="medium">
                    {audit.refObjectId}
                </ArgonTypography>
            ),
            eventType: (
                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                    {audit.eventType}
                </ArgonTypography>
            ),
            eventOccurence: (
                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                    {audit.eventOccurence}
                </ArgonTypography>
            ),
            subData: audit.attributeChanges,
            item:audit
        }))
    };
}
