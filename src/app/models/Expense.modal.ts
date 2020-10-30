import { TYPE_EXPENSE } from './../static/WalletTypes.static';
import { WalletInterface } from '../interface/Wallet.interface';

export class ExpenseModel implements WalletInterface{
  type: string = TYPE_EXPENSE;
  title: string;
  amount: number;
  constructor(title:string, amount:number){
    this.title = title;
    this.amount = amount;
  }

}
