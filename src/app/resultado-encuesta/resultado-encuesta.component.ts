import { Component } from '@angular/core'; 
import CanvasJS from '@canvasjs/charts';
import { ResultadoService } from '../resultadoEncuesta/services/resultado.service';




@Component({
  selector: 'app-resultado-encuesta',
  templateUrl: './resultado-encuesta.component.html',
  styleUrls: ['./resultado-encuesta.component.css']
})
export class ResultadoEncuestaComponent{

  modo="graficos"
  //chart:any;
  dataEnc:any;
  showcharts=false;

  chart: any;
	chartOptionsFav = {
    title: {
    	text: "Juego más popular"
    },
    data: [{
      type: "column",
      dataPoints: [
        { label: "Apple",  y: 10  },
        { label: "Orange", y: 15  },
        { label: "Banana", y: 25  },
        { label: "Mango",  y: 30  },
        { label: "Grape",  y: 28  }
      ]
    }]                
  };

  chartOptionsChat = {
    title: {
    	text: "Probaron el Chat"
    },
    data: [{
      type: "pie",
      dataPoints: [
        { label: "Apple",  y: 10  },
        { label: "Orange", y: 15  },
        { label: "Banana", y: 25  },
        { label: "Mango",  y: 30  },
        { label: "Grape",  y: 28  }
      ]
    }]                
  };

  chartOptionsEdad = {
    title: {
    	text: "Edades de los usuarios"
    },
    data: [{
      type: "column",
      dataPoints: [
        { label: "Apple",  y: 10  },
        { label: "Orange", y: 15  },
        { label: "Banana", y: 25  },
        { label: "Mango",  y: 30  },
        { label: "Grape",  y: 28  }
      ]
    }]                
  };

  constructor(private resserv:ResultadoService){
    const encol = resserv.traerEncuesta();
    encol.subscribe((data:any)=>{
      this.dataEnc = data;
      console.log(this.dataEnc)
      this.crearGraph();
    })
  }

  crearGraph(){
    this.favorito()
  }

  favorito(){
    console.log("asd")
    let auxar1=[{label:"Ahorcado", y:0}, {label:"Preguntados", y:0}, {label:"Puntería", y:0}, {label:"Mayor o Menor", y:0}]
    let auxar2=[{label:"Si", y:0}, {label:"No", y:0}]
    let auxar3=[{label:"", y:0}];

    for (let index = 0; index < this.dataEnc.length; index++) {
      switch (this.dataEnc[index].favorito) {
        case "ahorcado":
          auxar1[0].y++
          break;
        case "preguntados":
          auxar1[1].y++
          break;
        case "punteria":
          auxar1[2].y++
          break;
        case "mayormenor":
          auxar1[3].y++
          break;
        default:
          break;
      }

      if(this.dataEnc[index].chat){
        auxar2[0].y++
      }else{
        auxar2[1].y++
      }

      if(index==0){
        auxar3 = [{label: this.dataEnc[index].edad as string, y:1}]
      }else{
        for (let j = 0; j < auxar3.length; j++) {
          if(auxar3[j].label == this.dataEnc[index].edad as string){
            auxar3[j].y++;
          }else{
            auxar3.push({label: this.dataEnc[index].edad as string, y:1})
            break;
          }
          
        }
      }
    }

    this.chartOptionsFav.data[0].dataPoints=auxar1;
    this.chartOptionsChat.data[0].dataPoints=auxar2;
    this.chartOptionsEdad.data[0].dataPoints=auxar3;

    this.showcharts=true;
  }

  cambiar(modo:string){
    this.modo=modo;
  }

}
