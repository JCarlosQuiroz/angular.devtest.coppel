import { StateIdResponse } from "../../models/response/StateIdResponse";
import { SuburbResponse } from "../../models/response/SuburbResponse";

/**
 */
export abstract class SuburbService {
    abstract getSuburbById(idSuburb: number): Promise<SuburbResponse>;

    abstract getCologneById(idCologne: number): Promise<SuburbResponse>;

    abstract getStates(): Promise<StateIdResponse>;
}