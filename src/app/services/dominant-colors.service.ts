import {Injectable} from '@angular/core';

export type RGBColorArray = [number, number, number];
@Injectable({
  providedIn: 'root'
})
export class DominantColorsService {
    loadDominantColors(dominantsColors: any){
        return dominantsColors.map((colorArray: RGBColorArray) => {
            const [r, g, b] = colorArray;
            return `rgb(${r}, ${g}, ${b})`;
        })
    }

}
