import * as util from "./utils.js";

export class Person {
    constructor(name, age, termsAccepted){
        name = name.trim();
        name = name || "Guest";

        age = Number(age);

        this.name = name;
        this.age = age;
        this.termsAccepted = termsAccepted;
    }

    getFancyName(){
        let fancyName = this.name;
        const spaceIndex = fancyName.indexOf(" ");
        if(spaceIndex !== -1){
            const first = fancyName.slice(0, spaceIndex);
            const last = fancyName.slice(spaceIndex + 1).trim();
            fancyName = `${first} of House ${last}`;
        }
    return fancyName;
    }

    getBirthYear(){
        return util.calculateBirthYear(this.age);
    }

    getDescription(){
        return `${this.fancyName} was born in the year ${this.getBirthYear()}.`;
    }
}

export class Student extends Person {
    constructor(name, age, termsAccepted, major){
        super(name, age, termsAccepted);
        this.major = major;
    }

    getDescription(){
        return super.getDescription()
        + `${this.name} studies ${this.major}.`;
    }
}