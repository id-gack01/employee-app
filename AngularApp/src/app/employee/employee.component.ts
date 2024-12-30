import { Component } from '@angular/core';
//can generate componnents with the command prompt phrase ng generate [componentname] --type=[type of component]
//can make fake html tags using the selector(app-employee) below 
import { EmployeeService } from '../shared/employee.service';
import {Employee} from '../shared/employee.model';
import { Form, NgForm } from '@angular/forms';
// the employee service class gets injected into the employee component

declare var M:any; //made a variable of any type that I use to do the toast action 

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent {

  //this is the constructor parameter for employeeService, i set the employeeService parameter as public instead of private
  //this kets the employee Component use the fields of the employeeModel  
  constructor(public employeeService: EmployeeService){
    
  }

  // ngOnInit is called whenever an employee component is fully loaded
  ngOnInit(){
    // console.log("pls wurk");
    this.resetForm(); //makes sure the form is blank when the page is loaded
    //when the resetForm first fires ERROR TypeError: ctx.employeeService.selectedEmployee is undefined, 
    this.refreshEmployeeList();
  }
  

  //potentially i have to use this.employeeService.selectedEmployee, but that youtube comment might be full of s--t
  //so the parameter name comes first, followed by the type, in this case, it's a Form interface. 
  // for on submit, I must insert a new employee into the mongodb database using the post request in the employeecontroller (nodeJS api)
   onSubmit(form: NgForm){
    // console.log(employeeForm + "is entered");
    // form.value holds the values of the form
    //console.log(form.value);  so form.value is  ing empty
    if (form.value._id ==""){
    this.employeeService.postEmployee(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshEmployeeList();
      M.toast({html:'Saved successfuly', classes: 'rounded'});
    });
    }
    else {
      this.employeeService.putEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({html:'Updated successfuly', classes: 'rounded'});
      });
    } 
  }

   resetForm(form?: NgForm){

    //if the form was incorrect, and there was no brackets after the if condition 
    if (form)
      form.reset();
    this.employeeService.selectedEmployee = {
      _id: "",
      name:"", 
      position:"",
      office:"",
      salary:0 //originally supposed to be null, but typescript doesn't like null passed into number variables, so I put 0 instead
    }
    
   }

   refreshEmployeeList(){
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[]; //takes the response from get employeeList (in the employeeservice) and assigns it to the employee array 
    });
   }

   onEdit(emp: Employee){
    //i need to set that emp (Employee) object into the selectedEmployee property of EmployeeService
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(_id: string, form: NgForm){
    // needs a confirm operation on the client side
    if (confirm('Are you sure you want to delete this record?') == true){
      this.employeeService.deleteEmployee(_id).subscribe((res) =>{
        this.refreshEmployeeList(); //refreshes the list we see after deletion
        this.resetForm(form); //resets the form to initial state
        M.toast({html:'Deleted successfuly', classes: 'rounded'});

      });
    }

  }


}

// Property 'onSubmit' does not exist on type 'EmployeeComponent'.

// for some reason you have to hit reset for the form to  ing work now
// so I gotta fix that ngOnInit issue
// i have to hit refresh for it to actually start off the way it's intended for some reason. 
// the problem is that I had and  if (form){form.reset} {fill up the form} when the if needed no {} to do the program
