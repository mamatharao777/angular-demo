import {Component, OnInit} from '@angular/core';
import {Employee} from '../models/employee';
import {DataService} from '../data.service';

@Component({
  selector: 'app-home-landing',
  templateUrl: './home-landing.component.html',
  styleUrls: ['./home-landing.component.css']
})
export class HomeLandingComponent implements OnInit {

  constructor(private dataService: DataService) {
  }

  employees: Employee[] = [];
  loading = true;

  ngOnInit() {
    // todo: network call here
    this.dataService.getAllEmployees().subscribe(data => {
      this.loading = false;
      this.employees = data;
    });
  }

}
