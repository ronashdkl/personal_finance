import { TYPE_INCOME } from './../static/WalletTypes.static';
import { ExpenseModel } from './../models/Expense.modal';
import { IncomeModel } from './../models/Income.modal';
import { WalletInterface, WalletCalculatorInterface } from './../interface/Wallet.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalletService implements WalletCalculatorInterface {

  /**
   * decleare transaction variable to store all income and expense.
   * WalletInterface
   */
  transaction: WalletInterface[]

  income: number = 0; //store total income,  calculates form calculate() method
  expense: number = 0; //store total expense,  calculates form calculate() method

  /**
   * variable for storing calculated percentage
   */
  percentage:{income:number,expense:number} = {income:0,expense:0}

  /**
   *  initialize decleared variables
   */
  constructor() {
    /**
     *
     */
    this.transaction = [
      new IncomeModel("Salary", 4500),
      new ExpenseModel("Fuel Swift", 155),
      new ExpenseModel("Electricity Bill", 500),
    ];
  }


  /**
   * calculate total balance form income - expense
   */
  balance(): number {
    return this.income - this.expense
  }

  /**
   * Add transaction
   * @param item
   */
  add(item: WalletInterface):void {
    this.transaction.push(item);
    this.updateWallet(item);
  }

  /**
   *
   * @param item
   * @param remove
   */
  private updateWallet(item: WalletInterface, remove:boolean = false) {
    if (item.type === TYPE_INCOME) {
      if(remove){
        this.income -= item.amount;

      }else{
        this.income += item.amount;
      }

    } else {
      if(remove){
        this.expense -= item.amount;

      }else{
        this.expense += item.amount;
      }

    }
    this.calculatepercentage();
  }

  remove(id:number){
    const userConfirm = confirm("Are you sure? This will remove the transaction from memory");

    if(!userConfirm) return;

   this.updateWallet(this.transaction[id], true);
    this.transaction = this.transaction.filter((x,i)=>i!=id);
  }

  /**
   * Calculate the sum of transaction according to its type.
   */
  calculate(): void {
    this.transaction.forEach((x:WalletInterface) => this.updateWallet(x))
  }

  /**
   * calculate percentage
   */
  calculatepercentage(){
    const total = this.totalTransaction();
    this.percentage.income = Math.round( this.income/total *100);
    this.percentage.expense = Math.round(this.expense/total *100);
  }

  private totalTransaction() {
    return this.income + this.expense;
  }
}
