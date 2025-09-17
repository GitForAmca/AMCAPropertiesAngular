import { DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-mortgagecalculator',
  standalone: true,
  imports: [DecimalPipe, FormsModule],
  templateUrl: './mortgagecalculator.component.html',
  styleUrl: './mortgagecalculator.component.scss'
})
export class MortgagecalculatorComponent {

  @Input() PropertyPrice! : number;

  purchasePrice : number = 0;
  min = 20;
  max = 80;

  MinLoanPeriod = 1;
  MaxLoanPeriod = 25;
  DefaultLoanPeriod = 25;

  MinInterestRate = 1;
  MaxInterestRate = 10;
  DefaultInterestRate = 3.75;

  staticMinPrice!: number;
  staticMaxPrice!: number;
  downPaymentPercentage!: number;
  loanAmountPercentage!: number;
  downPayment!: number;
  loanAmount!: number;
  LoanPeriod!: number;
  InterestRate!: number;
  MonthlyRateAmount!: number;
  MonthlyPayment!: number;

  ngOnInit() {
    debugger
    this.purchasePrice = this.PropertyPrice;
    this.staticMinPrice = Math.round((this.purchasePrice * this.min) / 100);
    this.staticMaxPrice = Math.round((this.purchasePrice * this.max) / 100);

    this.downPaymentPercentage = this.min;
    this.loanAmountPercentage = 100 - this.downPaymentPercentage;

    this.downPayment = this.calculateDownPayment(this.downPaymentPercentage);
    this.loanAmount = this.calculateLoanAmount(this.downPaymentPercentage);

    this.LoanPeriod = this.DefaultLoanPeriod;
    this.InterestRate = this.DefaultInterestRate;


    this.MonthlyRateAmount = this.calculateMonthlyRateAmount(this.calculateAnnualRate(this.InterestRate));
    
    this.MonthlyPayment = this.calculateMonthlyPayment(this.loanAmount,this.MonthlyRateAmount,this.LoanPeriod);
  }


  

  calculateAnnualRate(InterestRate: number) {
    return InterestRate / 100;
  }

  calculateMonthlyRateAmount(AnnualRate: number) {
    return AnnualRate / 12;
  }


  calculateDownPayment(percentage: number) {
    return Math.round((this.purchasePrice * percentage) / 100);
  }

  calculateMonthlyPayment(loanAmount: number,MonthlyRateAmount: number,LoanPeriod:number) {
    return Math.round((loanAmount * MonthlyRateAmount * Math.pow(1 + MonthlyRateAmount, (LoanPeriod * 12))) / (Math.pow(1 + MonthlyRateAmount, (LoanPeriod * 12)) - 1));
  }

  calculateLoanAmount(downPaymentPercentage: number) {
    return this.purchasePrice - this.calculateDownPayment(downPaymentPercentage);
  }

  onSliderChange(slider: 'downPayment' | 'loan', value: number) {
    if (slider === 'downPayment') {
      this.downPaymentPercentage = value;
      this.loanAmountPercentage = 100 - value;
    } else if (slider === 'loan') {
      this.loanAmountPercentage = value;
      this.downPaymentPercentage = 100 - value;
    }

    this.downPayment = this.calculateDownPayment(this.downPaymentPercentage);
    this.loanAmount = this.calculateLoanAmount(this.downPaymentPercentage);
    
    this.MonthlyPayment = this.calculateMonthlyPayment(this.loanAmount,this.MonthlyRateAmount,this.LoanPeriod);

  }

  onLoanPeriod(event : any){
    const value = +(event.target as HTMLInputElement).value;
    this.LoanPeriod = value;
    this.calculateMonthlyRateAmount(this.calculateAnnualRate(this.InterestRate));
    this.MonthlyPayment = this.calculateMonthlyPayment(this.loanAmount,this.MonthlyRateAmount,this.LoanPeriod);
  }
  onInterestRate(event : any){
    const value = +(event.target as HTMLInputElement).value;
    this.InterestRate = value;

    this.MonthlyRateAmount = this.calculateMonthlyRateAmount(this.calculateAnnualRate(this.InterestRate));
    this.MonthlyPayment = this.calculateMonthlyPayment(this.loanAmount,this.MonthlyRateAmount,this.LoanPeriod);
  }

}
