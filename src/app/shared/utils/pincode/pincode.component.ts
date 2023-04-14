import { Component, Input, OnInit, Output, QueryList, ViewChild, ViewChildren, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CodeInputComponent } from 'angular-code-input';
import { Subscription } from 'rxjs';
import { TimerComponent } from '../timer';

@Component({
  selector: 'app-pincode',
  templateUrl: './pincode.component.html',
  styleUrls: ['./pincode.component.css']
})
export class PincodeComponent implements OnInit {

  @Input() numOfDigits;
  @ViewChildren('inputs') inputs: QueryList<any>;
  @ViewChild('codeInput') codeInput !: CodeInputComponent;
  @ViewChild('timer') timer:TimerComponent;
  @Output() notifyParentBtn = new EventEmitter<boolean>();
  @Output() notifyTimeOut = new EventEmitter<boolean>();

  confirmCodeForm: FormGroup;
  countDown: Subscription;
  tick = 1000;
  timeLimit: number = 2;
  message: string = '';
  code: string = '';
  aux: string = '';

  constructor(
    private fb: FormBuilder
  ) { 
    this.confirmCodeForm = this.fb.group({
      digits: this.fb.array([]),
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.countDown = null;
  }

  emit(active: boolean): void {
    this.notifyParentBtn.emit(active);
  }

  timeOut():void{
    this.notifyTimeOut.emit(true)
  }

  onCodeChanged(code: string) {
    this.aux = code;
    this.emit(true);
  }

  onCodeCompleted(code: string) {
    this.code = code;
    this.emit(false);
  }

  confirmCode(): string {
    return this.code;
  }

  setErrorMessage(message: string){
    if(message === "Error:El código de verificación es incorrecto" ){
      this.message = "El código de verificación es incorrecto";
    }else{
      this.message = message;
    }
  }
}
