import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { RegisterService } from './register.service';

interface IStudent {
  id?: number;
  name: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isRegistered: boolean = false;
  model: IStudent = {
    name: ""
  };

  constructor(private router: Router, private registerService: RegisterService) {}

  onSubmitBtnClick() {
    //TODO: subscribe to some value passed from registerService,
    //which will give us info, if session has began, if we need to wait, or if the user has been kicked from lobby  
    this.isRegistered = this.registerService.register(this.model.name);
    //...
  }
}
