import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  currencyList: string[] = [];

  @Output() changeEvent = new EventEmitter<any>();

  formGroup: FormGroup;
  minDate: Date;
  maxDate: Date;

  constructor(private fb: FormBuilder) {
    let now = new Date();
    this.minDate = new Date(now.getTime() - 31556952000);
    this.maxDate = new Date(now);

    this.formGroup = this.fb.group({
      currency: new FormControl('USD', [Validators.required]),
      date: new FormControl(now, [Validators.required, Validators.min(this.minDate.getTime())])
    });

     this.inputChange();
  }

  ngOnInit(): void {
    this.currencyList = environment.availableCurrencies;
  }

  inputChange() {
    let formattedDate = formatDate(this.formGroup.get("date")?.value, "yyyy-MM-dd", "en-US") 
    let currency = this.formGroup.get("currency")?.value
    this.changeEvent.emit({currency: currency, date: formattedDate });
  }

}
