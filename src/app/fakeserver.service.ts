import {Injectable} from '@angular/core';
import {Employee} from './models/employee';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import {User} from './models/User';

@Injectable()
export class FakeserverService {

  users: User[] = [];

  constructor() {
    for (let i = 1; i < 5; i++) {
      const user: User = <User> {};
      user.userId = 'user' + i;
      user.emailId = 'sample.email' + i + '@email.com';
      user.username = 'User ' + i;
      if (i % 2 === 0) {
        user.roles = ['ADMIN', 'USER'];
      } else {
        user.roles = ['USER'];
      }
      this.users.push(user);
    }
  }

  // this service is to simulate network calls and to provide sample data for application
  getAllEmployees(numOfEmployees: number): Observable<Employee[]> {
    const employeeList: Employee[] = [];
    for (let i = 1; i <= numOfEmployees; i++) {
      const employee: Employee = <Employee>{};
      employee.empId = i;
      employee.firstName = 'First Name ' + i;
      employee.lastName = 'Last Name ' + i;
      employee.empManager = 'Employee\'s Manager ' + i;
      if (i % 2 === 0) {
        employee.roles = ['employee', 'admin', 'public'];
      } else {
        employee.roles = ['employee', 'admin', 'manager', 'public'];
      }
      employeeList.push(employee);
    }
    return Observable.of(employeeList).delay(2000);
  }

  getEmployee(empId: number): Observable<Employee> {
    const employee: Employee = <Employee>{};
    employee.empId = empId;
    employee.firstName = 'First Name ' + empId;
    employee.lastName = 'Last Name ' + empId;
    employee.empManager = 'Employee\'s Manager ' + empId;
    if (empId % 2 === 0) {
      employee.roles = ['employee', 'admin', 'public'];
    } else {
      employee.roles = ['employee', 'admin', 'manager', 'public'];
    }
    return Observable.of(employee);
  }

  login(userId: string, password: string): Observable<User> {
    let user: User = null;
    this.users.forEach(eachUser => {
      if (eachUser.userId === userId) {
        user = eachUser;
      }
    });
    return Observable.of(user).delay(1500);
  }
}
