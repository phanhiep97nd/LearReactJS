class People {
	name: string;
	age: number;
	address?: string | number;

	constructor(name: string, age: number, address: string | number) {
		this.name = name;
		this.age = age;
		//this.address = address;
	}

	showInfo = () => console.log(`Hello ${this.name} , age: ${this.age}, address: ${this.address}!`);
}

let people = new People('HiepPV', 27, 'NamDinh');
people.showInfo();