export class Member {

    id:Number;
    name:String;
    email:String;
    company:String;
    salary:Number;
    isActive:Boolean;
    role:String;

    constructor(id, name, email, company, salary, role, active) {
        this.id = id || 0;
        this.name = name || "";
        this.email = email || "";
        this.company = company || "";
        this.salary = salary || 0;
        this.role = role || "";
        this.isActive = active || false;
    }
}