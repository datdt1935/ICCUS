import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Customer } from '../interfaces/customer';

@Component({
  selector: 'app-view-home',
  templateUrl: './view-home.component.html',
  styleUrls: ['./view-home.component.scss', '../app.component.scss'],
})
export class ViewHomeComponent implements OnInit {
  constructor(private dataService: DataService) {}
  public items: Customer[] = [];
  ngOnInit() {
    this.dataService.getCustomers().subscribe( (data:any) => {
      console.log(data);
      this.items = data;
    });
  }
}
