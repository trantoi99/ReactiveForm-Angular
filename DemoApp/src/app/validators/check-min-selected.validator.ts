import { FormGroup, FormArray } from "@angular/forms";

// custom validator to check that two fields match
export function MinSelectedCheckBoxes(controlName: string, min: number) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const formArray = formGroup.controls[controlName] as FormArray;
    const totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
      .map((control: { value: any }) => control.value)
      // total up the number of checked checkboxes
      .reduce((prev: any, next: any) => (next ? prev + next : prev), 0);

    if (totalSelected < min) {
      control.setErrors({ minSelected: true });
    } else {
      control.setErrors(null);
    }
  };
}
