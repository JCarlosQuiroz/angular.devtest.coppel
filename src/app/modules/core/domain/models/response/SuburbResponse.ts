import { ApiResponse } from "src/app/utils/ApiResponse";
import { Suburb } from "../Suburb";

 export interface SuburbResponse extends ApiResponse {
    data: Suburb[];
}