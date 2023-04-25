import { Box } from "../../models/Box";
import { BoxResponse } from "../../models/response/BoxResponse";

/**
 */
export abstract class BoxService {



    abstract getBoxesDevTestCoppel(): Promise<BoxResponse>;

    abstract getBoxDevTestCoppelById(idBox: number): Promise<BoxResponse>;


}