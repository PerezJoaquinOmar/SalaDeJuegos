import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefono'
})
export class TelefonoPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let auxstr = value as string;
    let restring='';
    for (let index = 0; index < auxstr.length; index++) {
      if(index==2 || index==7){
        if(auxstr[index]!='-'){
          restring+='-';
        }
      }
      restring+=auxstr[index];
    }
    return restring;
  }

}
