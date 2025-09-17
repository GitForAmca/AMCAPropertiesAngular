export class AddEnquiryFormProjects{
    opCode : number;
    projectId : number;
    name : string;
    email : string;
    countryCode : number;
    phone : string;
    message : string;

    constructor(){
        this.opCode = 3;
        this.projectId = 0;
        this.name = "";
        this.email = "";
        this.countryCode = 0;
        this.phone = "";
        this.message = "";
    }
}