import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from './user.service';
import { CheckExistNameValidator } from './validators/check-exist-name-validator';
import { passwordValidator } from './validators/validate-password';

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
    { id: 5, name: 'Jquery' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fullName: new FormControl(
        '',
        [Validators.required],
        [CheckExistNameValidator(this.userService)]
      ),
      password: new FormControl('', [
        Validators.required,
        passwordValidator(8),
      ]),
      listTech: this.formBuilder.array([]),
    });
    this.addCheckboxesToForm();
  }

  ngAfterViewInit(): void {
    console.log(this.form);
  }

  // bind value to array and to use in view
  get websFormArray() {
    return this.form.controls['listTech'] as FormArray;
  }

  // add Array Fake data
  private addCheckboxesToForm() {
    this.webData.map(() => this.websFormArray.push(new FormControl(false)));
  }

  submit() {
    const selectedIds = this.form.value.listTech
      .map((checked: any, i: number) => (checked ? this.webData[i].id : null))
      .filter((v: null) => v !== null);

    console.log(selectedIds);
    console.log(this.form);
  }

  refresh() {
    this.form.reset();
  }

  get f() {
    return this.form.controls;
  }
}
