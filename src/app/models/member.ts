export class Member {

    id:Number;
    name:String;
    email:String;
    company:String;
    salary:Number;
    isActive:Boolean;
    role:String;

    constructor(name?:String, email?:String, company?:String, salary?:Number, role?:String, active?:Boolean) {
        this.id = 0;
        this.name = name;
        this.email = email;
        this.company = company;
        this.salary = salary;
        this.role = role;
        this.isActive = active;
    }
}