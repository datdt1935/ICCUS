import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-view-create-new',
  templateUrl: './view-create-new.component.html',
  styleUrls: ['./view-create-new.component.css', '../app.component.scss'],
})
export class ViewCreateNewComponent implements OnInit {
  public form: FormGroup;
  public submitted = true;
  @Output() submitEvent = new EventEmitter();
  public get f() {
    return this.form.controls;
  }
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      address: ['', [Validators.required]],
      postalcode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      phone: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      comments: ['', [Validators.required]],
    });
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    const bodyJson = {
      name: this.f.name.value,
      firstname: this.f.firstname.value,
      address: this.f.address.value,
      postalcode: this.f.postalcode.value,
      city: this.f.city.value,
      phone: this.f.phone.value,
      comments: this.f.comments.value,
      email: this.f.email.value,
    };
    this.dataService
      .create(bodyJson)
      .pipe(first())
      .subscribe(data => {
        if(data){
          this.submitEvent.emit('');
        }
      });
   
  }
}
