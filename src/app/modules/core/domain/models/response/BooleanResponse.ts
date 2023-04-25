import { ApiResponse } from "src/app/utils/ApiResponse";

export interface BooleanResponse extends ApiResponse {
    data: Boolean;
}