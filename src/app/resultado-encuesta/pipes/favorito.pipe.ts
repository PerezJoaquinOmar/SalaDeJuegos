import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'favorito'
})
export class FavoritoPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let auxstr='';

    switch (value) {
      case "ahorcado":
        auxstr="Ahorcado"
        break;
      case "preguntados":
        auxstr="Preguntados"
        break;
      case "punteria":
        auxstr="Punteria"
        break;
      case "mayormenor":
        auxstr="Mayor o Menor"
        break;
      default:
        break;
    }
    return auxstr;
  }

}
