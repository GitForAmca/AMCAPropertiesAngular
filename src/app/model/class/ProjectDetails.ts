export class ProjectDetails {
    projectId : number;
    area : number;
    developersId : number;
    projectType : number;
    status : number;
    completionYear : number;
    priceFrom : number;
    priceTo : number;
    beds: number[] = [];
    areaURL : string;
    developerURL : string;
    projectPageURL : string;
    pageNumber : number;
    pageSize : number;

    constructor(){
        this.projectId = 0;
        this.area = 0;
        this.developersId = 0;
        this.projectType = 0;
        this.status = 0;
        this.completionYear = 0;
        this.priceFrom = 0;
        this.priceTo = 0;
        this.beds = [];
        this.areaURL = "";
        this.developerURL = "";
        this.projectPageURL = "";
        this.pageNumber = 0;
        this.pageSize = 0;
    }
}