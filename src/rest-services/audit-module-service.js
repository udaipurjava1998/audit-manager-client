import RestService from "./RestService";

const baseUrl = "/audit-module";

const AuditModuleServiceAPI = {
    findAll: async () => {
        return await RestService.GetAllData(baseUrl);
    },
    createAuditObjectChangeTracker:async(data)=>{
        return await RestService.CreateData(baseUrl,data)
    }
}
export default AuditModuleServiceAPI;