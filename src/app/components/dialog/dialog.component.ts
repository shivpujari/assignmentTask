import { CommonModule } from '@angular/common'
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output } from '@angular/core'
import { DialogModule } from 'primeng/dialog'
import { Product } from '../../interfaces/product.interface'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { DialogModes } from '../../../enums/product.enum'
import { MessagesModule } from 'primeng/messages';
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, ReactiveFormsModule, InputTextModule, ButtonModule, MessagesModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})

export class DialogComponent implements OnChanges {
  @Input() product: Product | null = null
  @Output() dialogClosed = new EventEmitter<Product>()

  formBuilder = inject(FormBuilder)

  form!: FormGroup
  dialogModes = DialogModes
  mode: DialogModes = this.dialogModes.Add

  constructor() {
    this.form = this.formBuilder.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(100)]],
      category: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  ngOnChanges(): void {
    if (this.product) {
      this.mode = this.dialogModes.Edit
      this.form.patchValue({
        name: this.product.name,
        price: this.product.price,
        category: this.product.category
      })
    } else {
      this.mode = this.dialogModes.Add
      this.form.reset()
    }

  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.mode === this.dialogModes.Edit && this.product) {
        this.form.value['id'] = this.product.id
      }
      this.dialogClosed.emit(this.form.value)
    }
    this.form.reset()
  }
}
