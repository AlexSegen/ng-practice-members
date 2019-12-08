export class Member {

    id:Number;
    constructor(private name?:String, private email?:String, private company?:String, private salary?:Number, private role?:String, private isActive?:Boolean) {
        this.id = 0;
    }
}