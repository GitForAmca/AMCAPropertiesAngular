export class AddEnquiryForm{
    opCode : number;
    unitId : number;
    name : string;
    email : string;
    countryCode : number;
    phone : string;
    message : string;

    constructor(){
        this.opCode = 1;
        this.unitId = 0;
        this.name = "";
        this.email = "";
        this.countryCode = 0;
        this.phone = "";
        this.message = "";
    }
}