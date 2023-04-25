import { Suburb } from '../../models/Suburb';
import { StateId } from '../../models/valueObjects/StateId';

/**
 */
export abstract class SuburbInteractor {
    abstract getSuburbsById(idSuburb: number): Promise<Suburb[]>;

    abstract getCologneById(idCologne: number): Promise<Suburb>;

    abstract getStates(): Promise<StateId[]>;
}