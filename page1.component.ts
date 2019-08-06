import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class Page1Component implements OnInit {
  constructor( public formbuilder: FormBuilder, public router: Router , public ser: AppService) { }

 view = this.ser.view;
  registerForm: FormGroup;
data;

  ngOnInit() {
    this.registerForm = this.formbuilder.group({
      Username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

//  to sign in func
  signin(item) {
    console.log(item)
    this.ser.getdata(item).subscribe(arg => {
        this.data = arg;
        console.log(this.data);
        // getting id from backend into data

        // tslint:disable-next-line: triple-equals
        if (this.data.length != 0) {
          this.router.navigate(['page3', this.data[0].id]);
          }
      else
       {
         // if the username and password doesnt match
         alert('invalid username and password');
        // to clear the form
        this.registerForm.reset();
      };
       }
       // if there is an invalid username
      ,error=>{
        alert("invalid username and password");
        this.registerForm.reset();
    });
  }
  }