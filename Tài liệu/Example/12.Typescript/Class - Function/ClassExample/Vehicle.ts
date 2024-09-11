// Tính trừu tượng
abstract class Vehicle {
  // Tính đóng gói
  protected make!: string;
  protected model!: string;
  protected year!: number;

  public displayData(): void {
		console.log(`Make: ${this.make}, Model: ${this.model}, Year: ${this.year}`);
  }

  abstract startEngine(): void;
}
// Tính kế thừa
class Car extends Vehicle {
  private numberOfDoors: number;
  private isElectric: boolean;

  constructor(make?: string, model?: string, year?: number, numberOfDoors?: number, isElectric?: boolean) {
		super();
		this.make = make ?? 'Unknown';
		this.model = model ?? 'Unknown';
		this.year = year ?? 0;
		this.numberOfDoors = numberOfDoors ?? 0;
		this.isElectric = isElectric ?? false;
  }

  public override displayData() {
		console.log(`Make: ${this.make}, Model: ${this.model}, Year: ${this.year}, Number of Door: ${this.numberOfDoors}, ${this.isElectric? `Electric car` : ``}`);
  }

  startEngine(): void {
		console.log(`Start!!!`);
  }
}

// Tính đa hình
let myCar: Vehicle = new Car();
myCar.displayData();