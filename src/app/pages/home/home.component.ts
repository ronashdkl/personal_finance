import { TYPE_INCOME, TYPE_EXPENSE } from './../../static/WalletTypes.static';
import { IncomeModel } from './../../models/Income.modal';
import { ExpenseModel } from './../../models/Expense.modal';
import { WalletService } from './../../services/wallet.service';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit{

  displayForm:boolean = false
  visible:string = 'all'
  @ViewChild('chart') chartRef:ElementRef
  chart:typeof Chart

  constructor(
    public walletService:WalletService
  ) {



  }
  ngAfterViewInit(): void {
    var ctx = this.chartRef.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [TYPE_EXPENSE,TYPE_INCOME],
        datasets:[
          {
            data: [this.walletService.percentage.expense,this.walletService.percentage.income],
            backgroundColor:[
              '#FF5722',
              '#4ca754'

            ]
          }
        ]
      },
      options:{
        legend: {
          display: false
      },
      }
  });

  }

  updateChart(){
 this.chart.data.datasets[0].data =[this.walletService.percentage.expense,this.walletService.percentage.income];
 this.chart.update();
}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.walletService.calculate();
    //this.demo();
  }





  private demo() {
    setInterval(() => {
      this.walletService.add(new IncomeModel("Profit share",190))
      this.updateChart()
    }, 2000);
    setInterval(() => {
      this.walletService.add(new ExpenseModel("Monthly EMI",1000))
      this.updateChart()
    console.log(  this.walletService.percentage)
    }, 4000);

  }
}
