import RestService from "./RestService";

const baseUrl = "/audit-module";

const AuditModuleServiceAPI = {
    findAll: async () => {
        return await RestService.GetAllData(baseUrl);
    },
}
export default AuditModuleServiceAPI;