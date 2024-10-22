import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-mock-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './mock-dialog.component.html',
  styleUrl: './mock-dialog.component.scss'
})
export class MockDialogComponent {
  @Input() product: Product | null = null
  @Output() dialogClosed = new EventEmitter<Product>()

  formBuilder = inject(FormBuilder)
  myForm: any = FormGroup

  eidtMode: boolean = false

  constructor() {
    this.myForm = this.formBuilder.nonNullable.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required]
    })
  }

  ngOnChanges(): void {
    if (this.product) {
      this.myForm.patchValue({
        name: this.product.name,
        price: this.product.price,
        category: this.product.category
      })
    }
  }

  onSubmit(): void {
    if (this.product) {
      this.myForm.value['id'] = this.product.id
    }
    this.dialogClosed.emit(this.myForm.value)

    this.myForm.reset()
  }
}
