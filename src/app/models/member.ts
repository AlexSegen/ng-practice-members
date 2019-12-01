export class Member {

    id:String;
    name:String;
    email:String;
    company:String;
    salary:Number;
    isActive:Boolean;

    constructor(id, name, email, company, salary, active) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.company = company;
        this.salary = salary;
        this.isActive = active;
    }
}