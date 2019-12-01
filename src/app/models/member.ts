export class Member {

    id:String;
    name:String;
    email:String;
    company:String;
    isActive:Boolean;

    constructor(id, name, email, company, active) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.company = company;
        this.isActive = active;
    }
}