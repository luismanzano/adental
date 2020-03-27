import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';


@Component({
  selector: 'app-profile-doctor',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponentDoctor implements OnInit {

  mainUser = {
    name: '',
    lastname: '',
    username: '',
    type: '',
    id: '',
  };
  

  payments: FormGroup;
  metodoPago = [];
  transferencia: Boolean;
  zelle: Boolean;
  paypal: Boolean;
  efectivo: Boolean;
 
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    public firestore: AngularFirestore
  ) {
    this.payments=this.fb.group({
      checkArray: this.fb.array([])
    })
  }

  ngOnInit() {
    this.mainUser.id = localStorage.getItem('id');
    this.mainUser.name = localStorage.getItem('name');
    this.mainUser.lastname = localStorage.getItem('lastname');
    this.mainUser.username = localStorage.getItem('username');
    this.mainUser.type = localStorage.getItem('type');
    console.log(localStorage.getItem('id'));
    console.log(this.mainUser.id);
    console.log('QUE PASA CON ESTO');

    this.transferencia=false;

    this.authService.userData(this.mainUser.id).subscribe(user=>{
      this.transferencia=user.data().paymentMethod[0];
      this.zelle=user.data().paymentMethod[1];
      this.paypal=user.data().paymentMethod[2];
      this.efectivo=user.data().paymentMethod[3];
    })
  }

  
  workBlock(day: number, avl: boolean) {


    this.authService.saveBlock(this.mainUser.id, day, avl);


    alert('Esta funcionando el workblock ' + day);
  }

  onCheckboxChange(e){
    let payments = [];
    if(e.target.checked){
      this.firestore.collection('users').doc(this.mainUser.id).get().subscribe(user=>{
        payments=user.data().paymentMethod;
        payments[e.target.value] = true;
        this.firestore.collection('users').doc(this.mainUser.id).update({paymentMethod: payments})
      })
    } else{
      this.firestore.collection('users').doc(this.mainUser.id).get().subscribe(user=>{
        payments=user.data().paymentMethod;
        payments[e.target.value] = false;
        this.firestore.collection('users').doc(this.mainUser.id).update({paymentMethod: payments})
      })
    }
  }
}
