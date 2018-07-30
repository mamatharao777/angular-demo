import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Employee} from '../models/employee';
import {switchMap} from 'rxjs/operators';
import {FakeserverService} from '../fakeserver.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private fakeService: FakeserverService) {
  }

  empId: number;
  employee: Employee = <Employee> {};
  polarChartData: any;
  barGraphData: any;

  ngOnInit() {
    this.getChartData();
    this.getChartData2();
    const emp = this.route.paramMap.pipe(
      switchMap((params) =>
        // todo: get the object from cache service instead of network call here.
        this.fakeService.getEmployee(parseInt(params.get('employeeId'), 10)))
    );

    emp.subscribe(data => this.employee = data);
  }

  getRandomNumbers(num, min?, max?) {
    const a = min ? min : 5;
    const b = max ? max : 20;
    const nums: number[] = [];
    for (let i = 0; i < num; i++) {
      nums.push(Math.floor(Math.random() * (b - a + 1)) + a);
    }
    return nums;
  }

  getChartData() {
    this.polarChartData = {
      datasets: [{
        data: this.getRandomNumbers(5),
        backgroundColor: [
          '#FF6384',
          '#4BC0C0',
          '#FFCE56',
          '#E7E9ED',
          '#36A2EB'
        ],
        label: 'Number of commits per month'
      }],
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'April',
        'May'
      ]
    };
  }

  private getChartData2() {
    this.barGraphData = {
      labels: ['Sprint 20', 'Sprint 21', 'Sprint 22', 'Sprint 23', 'Sprint 24', 'Sprint 25', 'Sprint 26'],
      datasets: [
        {
          label: 'Tickets assigned',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: this.getRandomNumbers(7, 10, 12)
        },
        {
          label: 'Tickets cleared',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: this.getRandomNumbers(7, 6, 10)
        }
      ]
    };
  }
}
