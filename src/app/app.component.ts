import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Customer } from './interfaces/customer';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public now: Date = new Date();
  public isAdding = true;
  public items: Customer[] = [];
  constructor(private dataService: DataService) {
    setInterval(() => {
      this.now = new Date();
    }, 1000);
  }
  ngOnInit() {
    this.onLoadItems();
  }
  onLoadItems() {
    this.dataService
      .getCustomers()
      .pipe(first())
      .subscribe((data: any) => {
        console.log(data);
        this.items = data;
      });
  }
  onToggle() {
    this.isAdding = !this.isAdding;
  }
  onCreate(event) {
    this.onToggle();
    this.onLoadItems();
  }
  title = 'ICCUS.AI';
}
