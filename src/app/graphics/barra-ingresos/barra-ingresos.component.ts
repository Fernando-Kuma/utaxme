import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import d3Tip from "d3-tip";
import { DateValue } from 'src/app/shared/model/date-value';
import { MarginConf } from 'src/app/shared/model/margin-conf';

@Component({
  selector: 'app-barra-ingresos',
  templateUrl: './barra-ingresos.component.html',
  styleUrls: ['./barra-ingresos.component.css']
})

export class BarraIngresosComponent implements OnInit {

_data: Array<DateValue> = [];
  range: any;
@Input() set data(val: Array<any>) {
  this._data = val
  this.update();
}

get data() {
  return this._data;
}

@Input() margin?: MarginConf = {
  top: 10,
  right: 30,
  bottom: 10,
  left: 30,
};

isInitiated: boolean = false;

xAxis: any;
yAxis: any;
xScale: any;
yScale: any;


   svg: any;
   width;
   height;
   X: any;
   Y: any;
   I: any;
   @Input() sizex: number;
   @Input() sizey: number;
   @Input() barWidth = 40;
   @Input() border = true;
   @Input() tickEjeX = 15;
   @Input() unit = '$';
   @Input() textX= '';
   @Input() textY= '';
   @Input() sizeLabel= "12px";
   
   
  constructor() { }

  ngOnInit(): void {
    this.setDimensions()
  }

  private setDimensions() {
    this.width = this.sizex - this.margin.left - this.margin.right;
    this.height = this.sizey - this.margin.top - this.margin.bottom;
    this.createSvg();
    this.drawBars(this.data);
  }

   createSvg(): void {
    this.svg = d3.select("#barcharIngresos")
    .append("svg")
    .attr('class', 'barIngresos')
    .attr('width', this.width + this.margin.left + this.margin.right)
    .attr('height', this.height + this.margin.top + this.margin.bottom)
    .append("g")
    .attr('transform', 'translate(' + (this.margin.left+20) + ',5)')
  }

   drawBars(data: any[]): void {

    this.X = d3.map(this.data, (d: any) => d.id);
    this.Y = d3.map(this.data, (d: any) => d.total);
    this.I = d3.range(this.X.length);    

    const xDomain = d3.extent(this.X);

    this.range =  [Math.round(d3.min(this.Y) - (d3.min(this.Y) * .1)), Math.round(d3.max(this.Y) + (d3.max(this.Y) * .1))];
      if(this.range[0] < 10){
        this.range[0] = 0;
      }
      if(this.range[1] < 1){
        this.range[1] = 1;
      }
     let yDomain = this.range;
    

    const xType = d3.scaleTime;
    const yType = d3.scaleLinear;

    let xRange;

    if(this.Y[0] == 0){
      xRange = [0, this.width - this.margin.right];
     }else{
       xRange = [this.barWidth / 6, this.width - this.margin.right];
     }

    const yRange = [this.height - this.margin.bottom, this.margin.top];

    this.xScale = xType(xDomain, xRange);
    this.yScale = yType(yDomain, yRange);

    this.xAxis = d3
      .axisBottom(this.xScale)
      .tickSize(0)
      .tickFormat((d) => {
        const valor = this.Y[this.X.indexOf(+d)];
        if(valor == 0){
          return '';
        }else{
          return +d;
        }
       
      })
      .tickSizeInner(this.margin.top + this.margin.bottom - this.height)
      .tickSizeOuter(0)
      .tickPadding(0);

      this.xAxis.tickValues(
        this.xScale.ticks(this.tickEjeX)  
      ).tickPadding(2);

    this.yAxis = d3
      .axisLeft(this.yScale)
      .tickSize(0)
      .tickFormat((d) => {
        return this.unit + d;
      })
      .tickSizeInner(this.margin.right + this.margin.left - this.width - 20)
      .tickSizeOuter(0)
      .tickPadding(0);

      let r = this.range[1] - this.range[0];
      let d = 4;
      let array: number[] = [];
      let contador = 1;
      let rangoY;
      rangoY = r/d
      for (let index = 1; index < Math.round(d); index++) {
        array.push(this.range[0] + (Math.round(rangoY) * index))
        contador ++ ;
      }
      array.push(this.range[0] + (rangoY * contador));
      this.yAxis.tickValues(
        this.yScale.ticks(0).concat(array)
      ).tickPadding(1);
  
    // Draw the X-axis on the DOM
    this.svg.append("g")
    .attr(
      'transform',
      `translate(${this.Y[0] == 0 ? '0' : '5'}, ${this.height - this.margin.bottom})`
    )
    .call((this.xAxis))
    .attr('class', 'ejeXBarra')
    .call((g: any) => g.selectAll('.tick line').remove())
    .selectAll("text")
    .style('color','#6B778C')
    .attr(
    'transform',`translate(0,0)`);
    this.svg.append("text")
      .attr("transform", "translate(" + (this.width/2) + " ," + (this.height+15) + ")")
      .style("text-anchor", "middle")
      .style("font-size", this.sizeLabel)
      .text(this.textX);
  
    // Draw the Y-axis on the DOM
    this.svg.append("g")
    .attr("transform", "translate(0,0)")
    .call(this.yAxis)
    .attr('class', 'ejeYBarra')
    .style('color','#6B778C')
    .call((g: any) => g.selectAll('.tick line').remove())
    ;

    this.svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(this.height/2))
      .attr("y", -40)
      .style("text-anchor", "middle")
      .style("font-size", this.sizeLabel)
      .text(this.textY);

    let tip = d3Tip()
    .offset([-10, 6])
    .html((d)=> {
      return `<div class='TooltipGenerated' style='width: 150px; height: 50px; border-radius: 3px; text-align: center; padding-top: 5px; font-size: 16px; font-weight: 500; opacity: .8; background: #4e5d87;'>
          <span style='color: #FFFFFF !important'>Factura: ${d.target.__data__.id}</span>
          <br>
          <span style='font-size: 15px; font-weight: 500; color: #dbdbdb !important'>Ingreso: $${d.target.__data__.total}</span>
          </div>`
    });
  
    // Create and fill the bars
    this.svg.call(tip);
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (_: DateValue, i: number) => this.xScale(this.X[i]))
    .attr('y', (_: DateValue, i: number) => this.yScale(this.Y[i]))
    .attr("width",this.barWidth)
    .attr('height',(_: DateValue, i: number) => this.height - this.margin.bottom - this.yScale(this.Y[i]))
    .attr('rx', 2).attr(
      'transform',`translate(${this.barWidth / -10}, 0)`)
    .on('mouseover', tip.show )
    .on('mouseleave', tip.hide);
    this.isInitiated = true;
  }

  private update() {
    if (!this.isInitiated) {
      return;
    }

    d3.selectAll('.barIngresos').remove();

    /* this.svg.selectAll('g').remove();

    this.svg.selectAll('rect').remove(); */

    this.createSvg();
    this.drawBars(this.data);
    
  }
}

