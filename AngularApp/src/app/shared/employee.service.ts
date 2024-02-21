// import statement for the service class
import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import * as Observable from 'rxjs'
// import 'rxjs/add/operator/map';
// import { map } from '../internal/operators/map';
import 'rxjs/internal/operators/map';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/internal/operators/toPromise'
import 'rxjs/internal/lastValueFrom';
// apparently toPromise is deprecated and I'll have to replace it with lastValueFrom somehow. See https://stackoverflow.com/a/67044352
// lastValueFrom is what it's called
import {Employee} from './employee.model'; //the employee.model.ts fil in the employee folder.

//all the posts, puts, deletes, gets are in here and get called through the employee component

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

      // https://bobbyhadz.com/blog/typescript-property-has-no-initializer
    // As written in the above article, the ! after the name declaration is the non-null assertion operator S

  //selected employee is the currently selected Employee object. Takes from the employee service   
  selectedEmployee: Employee; //the selectedEmployee will provide the data for the form used in the employee component html. It holds the employee from the employee model
  employees: Employee[]; //this array will save all the employees from the mongoDB collection, an array of Employee objects, labeled employees. the employee is the object imported 
  readonly baseURL = 'http://localhost:3000/employees'; //this is the url for the employees controller, so the angular app can talk to the backend

  // the http client isincluded in the constructor to know the employee service will 
  constructor(private http : HttpClient) { }


  // creating a function that allows me to post an employee, single parameter, emp, which is of the type Employee
  // in order to make the post request I have to make an http request into the NodeJS project. This is where HTTPclient comes into use
  //the postEmployee can then be called in the employee component file(? idk how to describe it), i bet it'll fire when onsubmit is fired
  // I'll call it as an employeeservice
  postEmployee(emp : Employee){
    // need to return the post function from the http object, first parameter is the url for the controller, the second parameter is the emp JSON object containing the new employee details which makes up the body
    return this.http.post(this.baseURL, emp);
  }
  
  //have to make a fetch all employees function here in the service class, and this gets injected into the employee component
  getEmployeeList(){
    return this.http.get(this.baseURL);
  }

  putEmployee(emp: Employee){
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }

  deleteEmployee(_id: string){
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}

// error TS2564: Property 'employees' has no initializer and is not definitely assigned in the constructor.