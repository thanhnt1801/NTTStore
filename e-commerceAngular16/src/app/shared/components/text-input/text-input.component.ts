import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements ControlValueAccessor{
  @Input() type = 'text';
  @Input() label = '';

  constructor(@Self() public controlDir: NgControl){
    this.controlDir.valueAccessor = this; 
    // register itself as `ControlValueAccessor`for `NgCOntrol`, allow TextInputComponent work as input from and be able to interact with ANgular form
    // when value in form change or update, Angular will call writeValue, registerOnChange, registerOnTouched
  }


  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

  get control(): FormControl {
    return this.controlDir.control as FormControl;
    //return an instance of `AbstractControl` - a base class for all controls (FormControl, FormGroup, FormArray)
    //this getter provide a convenient way to access FormControl, so it can interact with porperty and method of FormControl
    //example: invalid, touch, dirty, status ...
  }


}
