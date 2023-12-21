import { BaseApi } from "../BaseApi";

export class DashboardApi extends BaseApi {
  public getAllCounts(): Promise<any> {
    return this.get("Dashboard/GetAll");
  }
}
