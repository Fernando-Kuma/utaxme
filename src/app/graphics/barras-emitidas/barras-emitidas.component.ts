import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as d3 from 'd3';
import d3Tip from "d3-tip";
import { Observable } from 'rxjs';
import { ES_MX_LOCALE } from 'src/app/shared/helper/es-mx-locale';
import { DateValue } from 'src/app/shared/model/date-value';
import { MarginConf } from 'src/app/shared/model/margin-conf';

@Component({
  selector: 'app-barras-emitidas',
  templateUrl: './barras-emitidas.component.html',
  styleUrls: ['./barras-emitidas.component.css']
})

export class BarrasEmitidasComponent implements AfterViewInit, OnInit, OnDestroy {

  isDarkTheme: Observable<boolean>;
  public dark: boolean = false;

  @ViewChild('barchar') svgBarChart: ElementRef;
  @Input() sizex: number;
  @Input() sizey: number;
  @Input() margin?: MarginConf = {
    top: 10,
    right: 0,
    bottom: 5,
    left: 30,
  };
  @Input() isDynamicRange = false;
  @Input() range: number[] = [50, 90];
  @Input() unit: string = ' hrs';
  @Input() full: boolean = false;
  @Input() grid: boolean = false;
  @Input() tooltipLabel: string = '';
  @Input() tickets: boolean = false;
  @Input() general: boolean = false;

  @Input() different?: boolean = false;
  @Input('different-color') differentcolor = '#FFB84B';
  _color = '#FFB84B';
  @Input() set color(val: string) {
    this._color = val;
  }

  _colorText = '#0B112A'
  @Input() set colorText(val: string) {
    this._colorText = val;
  }

  get color() {
    return this._color;
  }
  @Input() rx = 5;
  @Input() barWidth = 40;
  @Input() showLimits = true;
  @Input() showXLabels = true;
  @Input() showYLabels = true;
  @Input() secondary = false;
  @Input('secondary-color') secondaryColor = '#F9896B';
  @Input() border = false;
  @Input() xposition: number = 0;

  _showScale: boolean = true;
  @Input() opacity: number = 1;
  @Input() set showScale(val: boolean) {
    this._showScale = val;
  }

  _showDomain: boolean = true;
  @Input() set showDomain(val: boolean) {
    this._showDomain = val;
  }

  _data: Array<DateValue> = [];
  @Input() set data(val: Array<any>) {
    this._data = val
    this.update();
  }

  get data() {
    console.log(this._data)
    return this._data;
  }

  private svg;
  public g: any;

  private width: number;
  private height: number;

  X: any;
  Y: any;
  I: any;

  xAxis: any;
  yAxis: any;
  xScale: any;
  yScale: any;

  isInitiated: boolean = false;

  @Input() viewTooltip: boolean = true;
  constructor() {
    this.removeTooltips();
  }

  ngOnInit(): void {
    this.removeTooltips();
  }

  ngAfterViewInit(): void {
    this.setDimensions();
    this.draw();
  }

  ngOnDestroy(): void {
    d3.selectAll('.d3-tip').remove();
  }

  private removeTooltips(){
    d3.selectAll('.TooltipGenerated').remove();    
  }

  private create() {    
    this.removeTooltips();
    this.X = d3.map(this.data, (d: DateValue) => d.id);
    this.Y = d3.map(this.data, (d: DateValue) => d.total);
    this.I = d3.range(this.X.length);

    const xDomain = d3.extent(this.X);
    let yDomain;
    if (this.isDynamicRange) {
      yDomain = this.range;
    } else {
      this.range = [Math.round(d3.min(this.Y) - (d3.min(this.Y) * .1)), Math.round(d3.max(this.Y) + (d3.max(this.Y) * .1))]
      if(this.range[0] < 10){
        this.range[0] = 0;
      }
      if(this.range[1] < 1){
        this.range[1] = 1;
      }
      yDomain = this.range;

      
    }

    const xType = d3.scaleTime;
    const yType = d3.scaleLinear;

    const xRange = [this.margin.left, this.width - this.margin.right];
    const yRange = [this.height - this.margin.bottom, this.margin.top];

    this.xScale = xType(xDomain, xRange);
    this.yScale = yType(yDomain, yRange);

    this.xAxis = d3
      .axisBottom(this.xScale)
      .tickSize(0)
      .tickFormat((d) => {
        return + d;
      })
      .tickSizeInner(this.margin.top + this.margin.bottom - this.height)
      .tickSizeOuter(0)
      .tickPadding(5);

      

    this.yAxis = d3
      .axisLeft(this.yScale)
      .tickSize(0)
      .tickFormat((d) => {
        return this.unit + d;
      })
      .tickSizeInner(this.margin.right + this.margin.left - this.width - 20)
      .tickSizeOuter(0)
      .tickPadding(5);

      if (this.showYLabels) {
        let r = this.range[1] - this.range[0];
        let d = 8;
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
        ).tickPadding(5);
      }else{
        this.yAxis.tickValues(
          this.yScale.ticks(0)
        ).tickPadding(5);
      }
  }

  private defineXAxis() {
    this.svg
      .append('g')
      .attr(
        'transform',
        `translate(${this.xposition} , ${this.height - this.margin.bottom})`
      )
      .style('font-size', (g) => {
        if (this.full) {
          return '18px';
        } else {
          return '10px';
        }
      })
      .style('color', '#697181')
      .call(this.xAxis)
      .attr('class', 'ejeXBarra')
      .call((g: any) => {
        if (!this._showDomain) {
          g.select('.domain').remove();
        }
      })
      .call((g: any) => g.selectAll('.tick line').remove())
      .call((g: any) => {
        if (!this._showScale) {
          g.selectAll('.tick').remove();
        }
      });
  }

  private defineYAxis() {
    this.svg
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',0)')
      .style('font-size', (g) => {
        if (this.full) {
          return '18px';
        } else {
          return '11px';
        }
      })
      .style('font-weight', '600')
      .style('color', '#6B778C')
      .call(this.yAxis)
      .attr('class', 'ejeYBarra')
      .call((g: any) => {
        if (!this._showDomain) {
          g.select('.domain').remove();
        }
      })
      .call((g: any) => {
        return g.selectAll('.tick line').attr('opacity', 0.1);
      })
  }

  private draw() {
    this.create();

    this.svg = d3
      .select(this.svgBarChart.nativeElement)
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

    this.defineXAxis();
    this.defineYAxis();
    this.isInitiated = true;
    this.setForms();
  }

  private setDimensions() {
    this.width = this.sizex - this.margin.left - this.margin.right;
    this.height = this.sizey - this.margin.top - this.margin.bottom;
  }

  private setForms() {
    if (this.showLimits) {
      this.svg
        .append('line')
        .attr('class', 'line')
        .call(d3.line())
        .style('stroke', '#27509B')
        .style('stroke-dasharray', '3, 2')
        .style('stroke-width', 1)
        .attr('x1', this.margin.left)
        .attr('x2', this.width + this.barWidth)
        .attr('y1', this.margin.top)
        .attr('y2', this.margin.top);

      this.svg
        .append('line')
        .attr('class', 'line')
        .call(d3.line())
        .style('stroke', '#27509B')
        .style('stroke-dasharray', '3, 2')
        .style('stroke-width', 1)
        .attr('x1', this.margin.left)
        .attr('x2', this.width + this.barWidth)
        .attr('y1', this.height / 2)
        .attr('y2', this.height / 2);
    }

    let defs = this.svg.append('defs');

    let filter = defs.append('filter').attr('id', 'dropshadow');

    let feMerge = filter.append('feMerge');

    feMerge.append('feMergeNode').attr('in', 'offsetBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    let tip = d3Tip()
    .offset([-10, 6])
    .html((d)=> {
      if(this.viewTooltip){
        if(this.full){
          return `<div class='TooltipGenerated' style='width: 150px; height: 50px; border-radius: 3px; text-align: center; padding-top: 5px; font-size: 16px; font-weight: 500; opacity: .8; background: #4e5d87;'>
          <span style='color: #FFFFFF !important'>Factura: ${d.target.__data__.id}</span>
          <br>
          <span style='font-size: 15px; font-weight: 500; color: #dbdbdb !important'>Ingreso: $${d.target.__data__.total}</span>
          </div>`
        }else{
          return `<div class='TooltipGenerated' style='width: 120px; height: 40px; border-radius: 3px; text-align: center; padding-top: 5px; font-size: 10px; font-weight: 400; opacity: .8; background: #4e5d87;'>
          <span style='color: #FFFFFF !important'>Factura: ${d.target.__data__.id}</span>
          <br>
          <span style='font-size: 11px; font-weight: 400; color: #dbdbdb !important'>Ingreso: $${d.target.__data__.total}</span>
          </div>`
        }
      }
    });

    this.svg.call(tip);
    console.log(this.sizex, '/', this._data.length , '=' ,)
    console.log(this.sizex / this._data.length)
    let rects = this.svg
      .selectAll('rect')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('x', (_: DateValue, i: number) => this.xScale(this.X[i]))
      .attr('width', 10)
      .attr('height', 0)
      .attr('y', (_: DateValue, i: number) => this.yScale(50))
      .on('mouseover', tip.show )
      .on('mouseleave', tip.hide);
    rects
      .transition()
      .delay(function (d, i) {
        return i * 50;
      })
      .duration(300)
      .attr('y', (_: DateValue, i: number) => this.yScale(this.Y[i]))
      .attr(
        'height',
        (_: DateValue, i: number) =>
          this.height - this.margin.bottom - this.yScale(this.Y[i])
      )
      .attr('fill', (_: DateValue, i) => {
        if (this.different) {
          if (d3.max(this.Y) == _.total) {
            return this.differentcolor;
          } else {
            return this.color;
          }
        } else {
          if (this.secondary) {
            if (i % 2 == 0) {
              return this.color;
            } else {
              return this.secondaryColor;
            }
          } else {
            return this.color;
          }
        }
      })
      .attr('fill-opacity', this.opacity)
      .style('stroke-width', (d) => {
        if (this.border) {
          return '1';
        } else {
          return 'none';
        }
      })
      .style('stroke', (d) => {
        if (this.border) {
          return '#285CED';
        } else {
          return 'none';
        }
      })
      .attr('rx', this.rx)
      .attr('cursor', 'pointer')
      .attr('filter', 'url(#dropshadow)');
  }

  private update() {
    if (!this.isInitiated) {
      return;
    }

    d3.selectAll('.d3-tip').remove();

    this.svg.selectAll('g').remove();

    this.svg.selectAll('rect').remove();

    this.svg.selectAll('line').remove();

    this.svg.selectAll('text').remove();

    this.create();
    this.defineXAxis();
    this.defineYAxis();
    this.setForms();
  }
}