import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , ParamMap} from '@angular/router';
import { AppService } from '../app.service';
import * as _ from 'underscore';


@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.scss']
})
export class Page3Component implements OnInit {
view = true;
click = true;
prflid;
deletid: any;
searchdep: any;
searchemp: any ;
data: any;
data2: any;
id;
abc:any = {};
  constructor(public router: Router, public Route: ActivatedRoute, public ser: AppService) { }


  ngOnInit() {
    this.deptable();
    this.empytable();
    this.Route.paramMap.subscribe((params: ParamMap) => {
      // getting id using params
      const id = parseInt(params.get('id'));
      console.log(id);
      this.viewdata(id);
      this.prflid = id;
      this.ser.prflid = this.prflid;
    });
  
  }

  //  details of particular id
  viewdata(id) {
    this.ser.editandprflview(id).subscribe(data2 => {
      this.abc = data2[0];
      console.log(data2);
    });
  }

  // dept table data
deptable() {
  this.ser.deptdata().subscribe(data1 => {
    this.data = data1;
    console.log(data1);
  });
}
// employee table data
// tslint:disable-next-line: whitespace


empytable() {
  this.ser.emptablData().subscribe(data2 => {
      this.data2 = data2;
      console.log(data2);
    });
}

  // to delete data frm dept table
delfrmdept(id) {
  console.log(id);
  this.deletid = id;
  this.click = true;
}

// to delete data from employye table

delfrmempy(i) {
  console.log(i);
  this.deletid = i;
  this.click = false;

}

// deleting the data in  both the tables using popup

delusingpopup() {
 if (this.click === false) {
  this.ser.delEmp(this.deletid).subscribe(() => {
    this.empytable();
  });
 } else {
  this.ser.delDept(this.deletid).subscribe(() => {
    this.deptable();
  });
 }
}


// to edit dept table
editdept(i) {
  console.log(i);
  this.ser.id  = true;
  this.router.navigate(['edit', i.dept_id]);
}

// to edit employe table
empyedit(j) {
  this.ser.id = false;
  this.router.navigate(['edit', j.id]);
}

// to view  employee table
empview(j) {
  this.router.navigate(['page4', j.id]);
}

// to view the personal profile of login
prfl() {

  this.ser.prflid = this.prflid;
  this.router.navigate(['page4', this.prflid]);
}
  //  signout to login  page
  back() {
    this.router.navigate(['page1']);
  }
  // routing to dept table
  page1() {
    this.click = true;
    this.view = true;
  }
  // routing to employe table
  page2() {
    this.click = false;
    this.view = false;
  }
  // routing to  role management
page3() {
  this.ser.prflid = this.prflid;
  this.router.navigate(['role']);
}

// for adding new data into oarticular tables
add() {
  this.router.navigate(['page2']);
  this.ser.id = this.view;
}
design()
{
  this.router.navigate(['bootstrap']);
}
navtocalender()
{
  this.router.navigate(['calender']);
}

}
