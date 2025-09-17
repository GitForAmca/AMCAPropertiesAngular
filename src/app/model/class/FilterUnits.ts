export class FilterUnits{
    unitId : number;
    developerId : number;
    areaId : number;
    unitType : number;
    priceFrom : number;
    priceTo : number;
    beds : number;
    bathroom : number;

    constructor(){
        this.unitId = 0;
        this.developerId = 0;
        this.areaId = 0;
        this.unitType = 0;
        this.priceFrom = 0;
        this.priceTo = 0;
        this.beds = 0;
        this.bathroom = 0;
    }
}