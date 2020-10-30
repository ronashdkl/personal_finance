import { TYPE_INCOME } from './../static/WalletTypes.static';
import { WalletInterface } from './../interface/Wallet.interface';

export class IncomeModel implements WalletInterface{
  type: string = TYPE_INCOME;
  title: string;
  amount: number;
  constructor(title:string, amount:number){
    this.title = title;
    this.amount = amount;
  }

}
