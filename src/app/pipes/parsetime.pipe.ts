import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parsetime'
})
export class ParsetimePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let auxstr='';
    let auxsec='';
    let auxnan='';
    let secflag=false;
    let secpass=false;
    let nanoflag=false;



    for (let index = 0; index < value.length; index++) {
      if(value[index]==","&&!secpass){
        secflag=false;
        secpass=true;
      }
      if(value[index]==","&&secpass){nanoflag=false;}

      if(secflag){
        auxsec+=value[index]
      }
      if(nanoflag){
        auxnan+=value[index]
      }


      if(value[index]=="="&&!secpass){
        secflag=true;
      }else if(value[index]=="="&&secpass){
        nanoflag=true;
      }
    }

    console.log(auxsec, "lmao", auxnan);
    auxstr=auxsec+auxnan
    return auxstr;
  }

}
