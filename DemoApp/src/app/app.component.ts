import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MinSelectedCheckBoxes } from './validators/check-min-selected.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'DemoApp';

  form: FormGroup = new FormGroup({});

  webData = [
    { id: 1, name: 'Angular' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Vue' },
    { id: 4, name: 'Wordpress' },
    { id: 5, name: 'Jquerys' },
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.addCheckboxesToForm();
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      rePassword: new FormControl('', [Validators.required]),
      listTech: new FormArray([]),
    },{
      validators: MinSelectedCheckBoxes('listTech',1)
    });
  }

  ngAfterViewInit(): void {
    console.log(this.form)
  }

  // bind value to array and to use in view
  get websFormArray() {
    return this.form.controls['listTech'] as FormArray;
  }

  // add Array Fake data
  private addCheckboxesToForm() {
    this.webData.forEach(() => this.websFormArray.push(new FormControl(false)));
  }

  submit(){
    const selectedIds = this.form.value.listTech
      .map((checked: any, i: number) => checked ? this.webData[i].id : null)
      .filter((v: null) => v !== null);

    console.log(selectedIds);
    console.log(this.form);
  }
  
  refresh(){
    this.form.reset();
  }

  get errors(){
    return this.form.controls['errors'];
  }

}
