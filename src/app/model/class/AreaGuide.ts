export class AreaGuide{
    autoId : number;
    areaId : number;
    area : string;
    emiratesName : string;
    areaDescription : string;
    imageURL : string;
    isActive : boolean;
    url : string;
    constructor(){
        this.autoId = 0;
        this.areaId = 0;
        this.area = "";
        this.emiratesName = "";
        this.areaDescription = "";
        this.imageURL = "";
        this.isActive = true;
        this.url = "";
    }
}