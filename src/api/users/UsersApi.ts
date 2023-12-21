import { BaseApi } from "../BaseApi";
import { CreateUserProps, GetAllUsersProps } from "./UsersDto";

export class UsersApi extends BaseApi {
  public getAllUsers(query: GetAllUsersProps){
    return this.get("User/GetAllUser", {
        query
    });
  }

  public getOneUser(id: number){
    return this.get("User/GetOneUser", {
        query: { id }
    });
  }

  public getAllRoles(){
    return this.get("Role/GetAllRole/:userId", {
        params: { userId: this.userId },
    });
  }

  public createUser(json: CreateUserProps){
    return this.post("User/CreateUser", {
        json
    });
  }

  public updateUser(json: CreateUserProps){
    return this.put("User/UpdateUser", {
        json
    });
  }

  public updateUserStatus(json: any){
    return this.put("User/UpdateStatus", {
        json
    });
  }

  public deleteUsers(json: number[]){
    return this.delete("User/DeleteUsers", {
        json
    });
  }
}