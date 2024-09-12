import RestService from "./RestService";

const baseUrl = "/audit-object-change-tracker";

const AuditObjectChangeTrackerServiceAPI = {
    findAll: async () => {
        return await RestService.GetAllData(baseUrl);
    },
    createAuditObjectChangeTracker:async(data)=>{
        return await RestService.CreateData(baseUrl,data)
    }
}
export default AuditObjectChangeTrackerServiceAPI;