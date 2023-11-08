export class Theme {
	id: string
	label?: string
	UserId?: string

	constructor(obj: any) {
		this.id = obj?.id || null
		this.label = obj?.label || null
		this.UserId = obj?.UserId || null
	}
}
