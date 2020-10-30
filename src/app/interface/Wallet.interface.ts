export interface WalletInterface{
  type:string
  title:string
  amount:number
}

export interface WalletCalculatorInterface{
  income:number;
  expense:number;
  balance():number;
}
