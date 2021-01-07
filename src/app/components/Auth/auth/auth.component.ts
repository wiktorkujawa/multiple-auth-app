import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  

  @Output() LoginOrRegister: EventEmitter<{register: any, userData: any}> = new EventEmitter();
  environment: any;
  mobile: any;

  register!: boolean;

  userData = {
    displayName: '',
    email:'',
    password:'',
    password2:''
  };
  form = new FormGroup({});
  loginFields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
        appearance: 'outline'
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'password',
        placeholder: 'Enter password',
        required: true,
        appearance: 'outline'
      }
    }
  ];

  registerFields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
        appearance: 'outline'
      }
    },
    {
      key: 'displayName',
      type: 'input',
      templateOptions: {
        label: 'Name',
        placeholder: 'Enter name',
        required: true,
        appearance: 'outline'
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'password',
        placeholder: 'Enter password',
        required: true,
        appearance: 'outline'
      }
    },
    {
      key: 'password2',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Confirm password',
        placeholder: 'Confirm password',
        required: true,
        appearance: 'outline'
      }
    }
  ];


  constructor(public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) 
    public data:any) { }

  ngOnInit(): void {
    this.register = this.data.register;
    this.environment = this.data.environment;
    this.mobile = this.data.mobile;
  }


  onSubmit(){
    this.LoginOrRegister.emit({register: this.register, userData: this.userData})
  }

  onNoClick() {
    this.dialog.closeAll();
  };

  switchLogin(){
    this.register = !this.register
  }



}
