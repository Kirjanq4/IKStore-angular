import { Component, OnInit } from '@angular/core';
import {RegistrationService} from '../../services/registration.service';
import {Router} from '@angular/router';
import {User} from '../../common/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  login: string;

  password: string;

  email: string;

  city: string;

  address: string;

  constructor(private registrationService: RegistrationService, private router: Router ) { }

  ngOnInit(): void {
  }


  register(form) {

    if(this.validateForm(form)==='invalid'){
      return;
    }

    let theUser = new User();
    theUser.login = this.login;
    theUser.password = this.password;
    theUser.city = this.city;
    theUser.address = this.address;
    theUser.email = this.email;
    let response = this.registrationService.getRegistered(theUser);

    response.subscribe(data=>{
      if(data.message==='Welcome'){
        this.router.navigate(["/login"])
      }
      else {
        this.router.navigate(["/register"])
      }
    })



  }


  validateForm (form) {

    form.controls.login.touched = true;
    form.controls.password.touched = true;
    form.controls.email.touched = true;
    form.controls.city.touched = true;
    form.controls.address.touched = true;

    if(!form.valid){
      return 'invalid';
    }


  }

}
