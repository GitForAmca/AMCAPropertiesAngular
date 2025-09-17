export class UnitDetails{
    unitId : number;
    area : number;
    developersId : number;
    unitType : number;
    priceFrom : number;
    priceTo : number;
    beds: number[] = [];
    bathroom: number[] = [];
    status : number;
    purpose : number;
    pageNumber : number;
    pageSize : number;
    areaURL : string;
    developerURL : string;
    unitPageURL : string;

    constructor(){
        this.unitId = 0;
        this.area = 0;
        this.developersId = 0;
        this.unitType = 0;
        this.priceFrom = 0;
        this.priceTo = 0;
        this.beds = [];
        this.bathroom = [];
        this.status = 0;
        this.purpose = 0;
        this.pageNumber = 0;
        this.pageSize = 0;
        this.areaURL = "";
        this.developerURL = "";
        this.unitPageURL = "";
    }
}