import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiredbService } from '../servicios/firedb.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  
  @ViewChild('scroll', { static: true }) scroll: any;

  chatmsg=""; 
  charCount=200;
  miuser:any;
  mensajes:any;

  constructor(private fdb:FiredbService, private myScrollContainer:ElementRef){
    this.fdb.traerChat();
    this.traermsg();
    //this.miuser = JSON.parse(localStorage.getItem("usuario") as string);
  }
  ngOnInit(): void {
    this.miuser = JSON.parse(localStorage.getItem("usuario") as string);
    console.log(this.miuser)
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    console.log(changes)
  }

  ngAfterViewInit() {
    this.scroll.nativeElement.scrollTo(0, this.scroll.nativeElement.scrollHeight);
  }

  async guardarMensaje(){
    if(this.chatmsg!=""&&this.charCount-this.chatmsg.length>=0){
      this.fdb.guardarChat(this.chatmsg);
      this.chatmsg="";
      await this.delay(250);
      this.scrollToBottom();
    }
  }

  async traermsg(){
    this.mensajes = this.fdb.chatcol;
    console.log(this.mensajes)
    await this.delay(1000);
    this.scrollToBottom();
  }

  show(msgg:any){
    console.log(msgg)
  }

  scrollToBottom(): void {
    try {
      this.scroll.nativeElement.scrollTo(0, this.scroll.nativeElement.scrollHeight);
    } catch(err) { }                 
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
