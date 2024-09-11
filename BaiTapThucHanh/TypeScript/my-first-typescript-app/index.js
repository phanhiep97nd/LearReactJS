"use strict";
class People {
	constructor(name, age, address) {
		this.showInfo = () => console.log(`Hello ${this.name} , age: ${this.age}, address: ${this.address}!`);
		this.name = name;
		this.age = age;
		//this.address = address;
	}
}
let people = new People('HiepPV', 27, 'NamDinh');
people.showInfo();
