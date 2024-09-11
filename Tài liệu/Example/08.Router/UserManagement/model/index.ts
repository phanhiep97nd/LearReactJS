interface User {
	id: number;
	name: string;
	createDate: string;
	role: string;
}

interface Depart {
	id: number;
	name: string;
}

export type { User, Depart }