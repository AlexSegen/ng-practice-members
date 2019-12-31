export class Member {

    id:Number;
    constructor(public name?:String, public email?:String, public company?:String, public salary?:Number, public role?:String, public isActive?:Boolean) {
        this.id = 0;
        this.name = ""
        this.email = ""
        this.company = ""
        this.salary = 0
        this.role = "";
    }
}