import { Person } from "./Person";
import { Role   } from "./Role";

export interface User {
    idUser      : number;
    status      : number;
    userName    : string;
    password    : string;
    email       ?: string;
    lastLogin   ?: string;
    code        ?: string;
    isCorporate ?: number;
    person      : Person;
    roles       : Role[];
    token       ?: string;
    expiredAt   ?: Date;    
    startAt     ?: Date;
}

export interface UsersSelect{
    idUser          : number;
    userName        : string;
    firstName       : string;
    middleName      : string;
    lastName        : string;
    secondLastName  : string;
}