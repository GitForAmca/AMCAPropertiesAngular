export class AddContactUs{
    opCode : number;
    name : string;
    email : string;
    countryCode : number;
    phone : string;
    message : string;

    constructor(){
        this.opCode = 2;
        this.name = "";
        this.email = "";
        this.countryCode = 0;
        this.phone = "";
        this.message = "";
    }
}