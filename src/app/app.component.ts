import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environments/environment';
import { CryptoOpenClose } from '././models/CryptoOpenClose';
import { PolygonService } from './services/polygon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PolygonService]
})
export class AppComponent implements OnInit {

  constructor(private service: PolygonService) { }
  title = 'BrainbaseTestExercice - Crypto';

  resulatAPI: CryptoOpenClose[] = [];

  availableCrypto = new Map<string, string>([
    ["BTC", "Bitcoin"],
    ["ETH", "Ethereum"],
    ["LTC", "Litecoin"],
    ["DOT", "Polkadot"],
    ["Ð", "Dogecoin"], ])

  ngOnInit(): void {
  }


  submitSearch(data: { currency: string, date: string }) {
    this.resulatAPI = [];

    let tasks: Observable<CryptoOpenClose>[] = [];
    this.availableCrypto.forEach((value: string, key: string) => {
      tasks.push(this.service.getOpenClose(key, data.currency, data.date))
    });
    forkJoin<any>(tasks).subscribe((data) => {
      this.resulatAPI = data as CryptoOpenClose[];
      this.resulatAPI.forEach(c => {
        c.symbol = c.symbol.split("-")[0];
        c.name = this.availableCrypto.get(c.symbol);
      });
    });
  }




}
