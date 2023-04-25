import { ApiResponse } from "src/app/utils/ApiResponse";
import { File } from "../File";

export interface FileResponse extends ApiResponse {
    data: File[];
}