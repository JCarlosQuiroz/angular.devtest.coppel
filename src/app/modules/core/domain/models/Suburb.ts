/**
 */
export interface Suburb {
    idSuburb: number;
    nameSuburb: string;
    idPostalCode: number;
    idState: number;
    nameState: string;
    idMunicipality: number;
    nameMunicipality: string;
    idCity: number;
    nameCity: string;
    idSettlementType: number;
    nameSettlementType: string;
    zone: string;
    status: number;
    creationUser?: number;
    creationDate?: Date;
}