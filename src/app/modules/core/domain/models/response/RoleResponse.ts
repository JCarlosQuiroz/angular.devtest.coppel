import { ApiResponse } from "src/app/utils/ApiResponse";
import { Role } from "../Role";

 export interface RoleResponse extends ApiResponse {
    data: Role[];
}