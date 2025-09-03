import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { StockService, Stock } from './stock.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  stocks: Stock[] = [];
  newStockText: string = '';

  constructor(private stockService: StockService) {}

  ngOnInit() {
    this.loadStocks();
  }


  loadStocks() {
    this.stockService.getStocks().subscribe(data => {
      this.stocks = data;
    });
  }

addStock() {
  if (!this.newStockText.trim()) return;

  this.stockService.addStock(this.newStockText).subscribe((saved: Stock) => {
    this.stocks.push(saved);
    this.newStockText = ''; // Input zurücksetzen
  });
}
}
