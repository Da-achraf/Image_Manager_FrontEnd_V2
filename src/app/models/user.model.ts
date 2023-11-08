export class User {
	id: string
	fname: string
	lname: string
	email: string

	constructor(obj: any) {
		this.id = obj?.id || null
		this.fname = obj?.fname || null
		this.lname = obj?.lname || null
		this.email = obj?.email || null
	}
}
