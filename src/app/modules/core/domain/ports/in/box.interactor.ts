import { Box } from "../../models/Box";

/**
 */
export abstract class BoxInteractor {



    abstract getBoxesDevTestCoppel(): Promise<Box[]>;

    abstract getBoxDevTestCoppelById(idBox: number): Promise<Box>;


}