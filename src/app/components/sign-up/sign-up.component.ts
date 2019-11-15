import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray, FormsModule, ReactiveFormsModule}  from '@angular/forms';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})

export class SignUpComponent implements OnInit {
    constructor(private fb: FormBuilder, private _auth: AuthService) { }
    @Input() user: User;
    @Output() userSubmitted = new EventEmitter<any>();

    signup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    confirmpassword: new FormControl(''),
    email:new FormControl(''),
    confirmemail:new FormControl('')
    });

  ngOnInit() {
      this.signup = this.fb.group({
      username: [this.user.userName],
      password: [this.user.password],
      confirmpassword: [this.user.confirmPassword],
      email:[this.user.email],
      confirmemail:[this.user.confirmEmail]
    });
  }

  get username(){return this.signup.get('username');}
  get password(){return this.signup.get('password');}
  get confirmpassword(){return this.signup.get('confrimpassword');}
  get email(){return this.signup.get('email');}
  get confirmemail(){return this.signup.get('confirmemail');}

  onSubmit(){
    console.log(this.signup.value);
    this.userSubmitted.emit(this.signup.value);
    this.signup.valueChanges.subscribe(Data =>
      {
        this.user.userName,
        this.user.email,
        this.user.password
      });
      this._auth.signUp(this.user.userName,this.user.email,this.user.password);
  }
}
