import { ApiResponse    } from "src/app/utils/ApiResponse";
import { Box            } from "../Box";


export interface BoxResponse extends ApiResponse {
    data: Box[];
}