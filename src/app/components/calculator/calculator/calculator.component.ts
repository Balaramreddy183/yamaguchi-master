import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule, CommonModule, CurrencyPipe, RouterModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  title = "Interest Calculator";
  principal: number = 0;
  ratePerHundred: number = 0; // Interest per 100 rupees per month
  ratePercentage: number = 0; // Annual interest rate as a percentage
  time: number = 0; // Time in months
  startDate: string = '';
  endDate: string = '';
  interestInRupees: number = 0;
  maturityAmount: number = 0;
  totalTenureMonths: number = 0; // Total tenure in months
  totalTenureDays: number = 0; // Remaining days

  calculateInterest() {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        const timeDiff = Math.abs(end.getTime() - start.getTime());
        this.totalTenureMonths = Math.floor(timeDiff / (1000 * 3600 * 24 * 30)); // Convert milliseconds to months
        this.totalTenureDays = Math.floor((timeDiff % (1000 * 3600 * 24 * 30)) / (1000 * 3600 * 24)); // Remaining days
      }
    } else {
      this.totalTenureMonths = this.time; // Use direct input if no dates are provided
      this.totalTenureDays = 0; // No additional days if using direct input
    }

    // Calculate interest using both methods
    const interestFromRatePerHundred = (this.principal * this.ratePerHundred * (this.totalTenureMonths + this.totalTenureDays / 30)) / 100;
    const interestFromRatePercentage = this.calculateSimpleInterest();

    // Choose the method that has a non-zero rate
    this.interestInRupees = this.ratePerHundred > 0 ? interestFromRatePerHundred : interestFromRatePercentage;
    this.maturityAmount = this.principal + this.interestInRupees;
  }

  calculateSimpleInterest(): number {
    const timeInYears = (this.totalTenureMonths + this.totalTenureDays / 30) / 12;
    return (this.principal * this.ratePercentage * timeInYears) / 100;
  }
}
