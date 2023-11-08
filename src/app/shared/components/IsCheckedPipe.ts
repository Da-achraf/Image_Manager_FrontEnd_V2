import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
	name: 'isChecked',
	standalone: true,
	pure: true
})
export class IsCheckedPipe implements PipeTransform {

	transform(allThemesId: string[] | null, themeId: string): boolean {
		let isChecked = false
		allThemesId?.forEach(id => {
			if (themeId === id) isChecked = true
		})
		return isChecked
	}

}
