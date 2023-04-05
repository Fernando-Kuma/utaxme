import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.css']
})
export class HeaderHomeComponent implements OnInit {

  @Input() color: string = '#122D4F';
  @Input() logo: string = 'image-toolbar';

  constructor() { }

  ngOnInit(): void {
  }

}
