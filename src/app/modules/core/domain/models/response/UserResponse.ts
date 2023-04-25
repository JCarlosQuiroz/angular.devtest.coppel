import { ApiResponse        } from "src/app/utils/ApiResponse";
import { User, UsersSelect  } from "../User";

 export interface UserResponse extends ApiResponse {
    data: User[];
}

export interface UsersSelectResponse extends ApiResponse{
    data: UsersSelect[];
}