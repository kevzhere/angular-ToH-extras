import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  name = new FormControl('');
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl('')
    })
  });

  profileFormBuilder = this.fb.group({
    firstName2: ['', Validators.required],
    lastName2: [''],
    address2: this.fb.group({
      street2: [''],
      city2: [''],
      state2: [''],
      zip2: ['']
    }),
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    console.log(this.name);
  }

  updateName() {
    this.name.setValue('hello world');
  }

  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: 'I my me strawberry'
      }
    });
  }

  get aliases() {
    return this.profileFormBuilder.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }
}
