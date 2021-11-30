import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public buyPrice: number;
  public sellPrice: number;

  //Simple buy/sell price form for now
  public pricesForm = new FormGroup({
    buyPrice: new FormControl('', [Validators.required, Validators.min(1)]),
    sellPrice: new FormControl('', [Validators.required, Validators.min(2)])
  })

  ngOnInit(): void {
    this.buyPriceValidator();
    this.sellPriceValidator();
  }

  onSubmit() {
    console.log(`submitted form: Buy price ${this.pricesForm.controls.buyPrice.value} | Sell price ${this.pricesForm.controls.sellPrice.value}`)
  }

  buyPriceValidator() {
    this.pricesForm.controls.buyPrice.valueChanges.subscribe(price => {
      if(price >= this.sellPrice)
      {
        this.pricesForm.controls.buyPrice.setErrors({priceError: true})
      }
    })
  }

  sellPriceValidator() {
    this.pricesForm.controls.sellPrice.valueChanges.subscribe(price => {
      if(price <= this.buyPrice)
      {
        this.pricesForm.controls.sellPrice.setErrors({priceError: true})
      }
    })
  }
}
