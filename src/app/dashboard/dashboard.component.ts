import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { from, interval, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

// const nums = of(1, 2, 3);
// const squared = map((val: number) => val * val);
// const squaredResult = squared(nums);
// squaredResult.subscribe(x => console.log(x));

// const apiData = ajax('/api/data');
// apiData.subscribe(res => console.log(res.status, res.response));

// const secondsCounter = interval(1000);
// secondsCounter.subscribe(n => console.log(`It's been ${n} seconds`));

// // create an observable out of a promise
// const data = from(fetch('/api/endpoint'));
// // subscribe to begin listining for async result
// data.subscribe({
//   next(response) { console.log(response); },
//   error(err) { console.log('Error: ' + err); },
//   complete() { console.log('Completed'); }
// })

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe((heroes) => (this.heroes = heroes.slice(0, 4)));
  }
}
