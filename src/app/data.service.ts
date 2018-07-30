import {Injectable} from '@angular/core';
import {Observable} from '../../node_modules/rxjs/Observable';
import {Employee} from './models/employee';
import 'rxjs/add/observable/of';
import {FakeserverService} from './fakeserver.service';
import {HttpClient} from '@angular/common/http';
import {User} from './models/User';

@Injectable()
export class DataService {

  constructor(private http: HttpClient, private fakeServer: FakeserverService) {
  }

  public getEmployeeDetails(empId: number): Observable<Employee> {
    // Do rest api call here, to get employee details

    // eg - this.http.get('api/v1/employee/empId')

    // Simulating rest api results
    return this.fakeServer.getEmployee(empId);
  }

  public getAllEmployees(): Observable<Employee[]> {
    return this.fakeServer.getAllEmployees(50);
  }

  public login(username: string, password: string): Observable<User> {
    return this.fakeServer.login(username, password);
  }

}
