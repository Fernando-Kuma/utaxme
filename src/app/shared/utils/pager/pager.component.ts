import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Page } from '../../model/pager.model';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

  @Input() changePage: number;
  _pageModel : Page<any>;
  @Input() set pageModel(val: Page<any>) {
    console.log("Paginador:",val);
    this._pageModel = val;
    this.arrayPages();
  }
  get data() {
    return this._pageModel;
  }
  @Output() paged = new EventEmitter<number>();
  pages: number[] = [];
  minPage: number;

  ngOnInit() {
    if(this._pageModel.totalPages == 0){
      this.pages[0] = 1;
      this._pageModel.totalPages = 1;
    }else{
      this.arrayPages()
    }
  }

  arrayPages(){
    
    if(this._pageModel.totalPages >= 3){
      if(this._pageModel.currentPage <= (this._pageModel.totalPages - 2)){
        this.minPage = this._pageModel.current;
        this.pages = [];
        for (let i = 0; i <= (this._pageModel.totalPages - this.minPage) && i < 3; i++ ){
          
          this.pages[i] = this.minPage + i;
        }
      }else{
        for (let i = 0; i <= this._pageModel.totalPages - 1; i++ ){
          this.pages[i] = 1 + i;
        }
        this.pages = this.pages.slice(-3) 
      }
    }else{
      this.pages = [];
      for (let i = 0; i <= this._pageModel.totalPages - 1; i++ ){
        this.pages[i] = 1 + i;
      }
    }
  }
  
  page(pagina:number){
    console.log(pagina)
    this.paged.emit(pagina);
    this.arrayPages();
  }
}
