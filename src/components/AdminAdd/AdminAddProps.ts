export type IAdd = {
	name: string;
	jobTitle: string;
	salary: string;
};

export interface IOptions {
	value: string,
	label: string
}

export interface IAddServer extends IAdd {
	id: string,
}

