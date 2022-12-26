import { Directive } from "@angular/core";
import { FormControl, FormGroup, NG_VALIDATORS, Validator } from "@angular/forms";

@Directive({
  selector: '[validateLocation]',
  providers: [{ provide: NG_VALIDATORS, useExisting: locationValidator, multi: true }]
})

export class locationValidator implements Validator {

  validate(formGroup: FormGroup): { [key: string]: any } | null {

    let addressControl = formGroup.controls['address'];
    let cityControl = formGroup.controls['city'];
    let countryControl = formGroup.controls['country'];
    let onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl'];

    if ((addressControl && addressControl.value && cityControl && cityControl.value
      && countryControl && countryControl.value) || (onlineUrlControl && onlineUrlControl.value)) {
      return null;
    } else {
      return { 'validatelocation': false }
    }
  }
}
