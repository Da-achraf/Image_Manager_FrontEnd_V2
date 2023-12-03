export class Image {
	id: string
	name?: string
  	publicId?: string
	url?: string
	mimeType?: string
	size?: number
	width?: number
	height?: number
	histogram: string
	dominantColors: string
	moments: string
	gaborFilterValues: string
	tamura: string
	ThemeId?: string
  	createdAt?: string

	constructor(obj: any) {
		this.id = obj?.id || null
		this.name = obj?.name || null
		this.publicId = obj?.publicId || null
		this.url = obj?.url || null
		this.mimeType = obj?.mimeType || null
		this.size = obj?.size || null
		this.width = obj?.width || null
		this.height = obj?.height || null
		this.histogram = obj?.histogram || null
		this.dominantColors = obj?.dominantColors || null
		this.moments = obj?.moments || null
		this.gaborFilterValues = obj?.gaborFilterValues || null
		this.tamura = obj?.tamura || null
		this.ThemeId = obj?.ThemeId || null
		this.createdAt = obj?.createdAt || null
	}
}
