import { ApiResponse } from "src/app/utils/ApiResponse";
import { Menu } from "../Menu";

export interface MenuResponse extends ApiResponse {
    data: Menu[];
}