import { ApiResponse } from "src/app/utils/ApiResponse";
import { StateId } from "../valueObjects/StateId";

export interface StateIdResponse extends ApiResponse {
    data: StateId[];
}