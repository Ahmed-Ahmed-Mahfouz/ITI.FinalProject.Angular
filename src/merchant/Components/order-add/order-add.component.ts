import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../Services/order.service';
import { ProductService } from '../../Services/product.service';
import { ShippingService } from '../../Services/shipping.service';
import { CityService } from '../../Services/city.service';
import { GovernorateService } from '../../Services/governorate.service';
import { BranchService } from '../../Services/branch.service';
import { IAddOrder } from '../../DTOs/Insert DTOs/IAddOrder';
import { IAddProduct } from '../../DTOs/Insert DTOs/IAddProduct';
import { OrderStatus } from '../../Enums/OrderStatus';
import { OrderTypes } from '../../Enums/OrderTypes';
import { PaymentTypes } from '../../Enums/PaymentTypes';
import { ShippingTypes } from '../../Enums/ShippingTypes';
import { IDisplayShipping } from '../../DTOs/Display DTOs/IDisplayShipping';
import { IAddShipping } from '../../DTOs/Insert DTOs/IAddShipping';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css'],
})
export class OrderAddComponent implements OnInit {
  orderForm: FormGroup | undefined;

  cities: any[] = [];
  governorates: any[] = [];
  branches: any[] = [];
  shippings: IDisplayShipping[] = [];

  addingProduct: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private productService: ProductService,
    private cityService: CityService,
    private governorateService: GovernorateService,
    private branchService: BranchService,
    private shippingService: ShippingService
  ) {}

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      clientName: ['', Validators.required],
      phone: ['', Validators.required],
      phone2: [''],
      email: ['', [Validators.email]],
      villageAndStreet: ['', Validators.required],
      shippingToVillage: [false],
      governorateId: [0, Validators.required],
      cityId: [0, Validators.required],
      shippingId: [0, Validators.required],
      branchId: [0, Validators.required],
      status: [OrderStatus.Pending, Validators.required],
      type: [0, Validators.required],
      paymentType: [0, Validators.required],
      products: this.formBuilder.array([]),
    });

    this.loadDropdownData();
  }

  loadDropdownData() {
    const url = 'http://localhost:5241/api/';
    this.cityService
      .GetAll(url + 'Cities')
      .subscribe((data) => (this.cities = data));
    this.governorateService
      .GetAll(url + 'Governorate')
      .subscribe((data) => (this.governorates = data));
    this.branchService
      .GetAll(url + 'Branches')
      .subscribe((data) => (this.branches = data));
    this.shippingService
      .GetAll(url + 'Shipping')
      .subscribe((data: IDisplayShipping[]) => {
        this.shippings = data;
      });
  }

  getEnumKeyValue(enumObj: any): { key: number; value: string }[] {
    return Object.keys(enumObj)
      .filter((key) => !isNaN(Number(key)))
      .map((key) => ({ key: Number(key), value: enumObj[key] }));
  }

  getShippingTypeText(type: ShippingTypes): string {
    return ShippingTypes[type];
  }

  get orderTypes() {
    return this.getEnumKeyValue(OrderTypes);
  }

  get paymentTypes() {
    return this.getEnumKeyValue(PaymentTypes);
  }

  get orderStatuses() {
    return this.getEnumKeyValue(OrderStatus);
  }

  get shippingTypes() {
    return this.getEnumKeyValue(ShippingTypes);
  }

  get products(): FormArray {
    return this.orderForm?.get('products') as FormArray;
  }

  toggleAddProduct() {
    if (this.addingProduct) {
      // Save product logic
      this.saveProduct();
    } else {
      // Add new product row
      this.addProductRow();
    }
  }

  addProductRow() {
    const productGroup = this.formBuilder.group({
      name: ['', Validators.required],
      weight: [0, Validators.required],
      quantity: [0, Validators.required],
      price: [0, Validators.required],
      statusNote: [''],
      ProductStatus: [OrderStatus.Pending, Validators.required],
    });

    this.products.push(productGroup);
    this.addingProduct = true; // Set flag to true for saving mode
  }

  saveProduct() {
    if (this.orderForm && this.orderForm.valid) {
      // Assuming there's a method in the ProductService to save a product
      // This is a hypothetical example, adjust according to your actual ProductService
      const productData = this.products.at(this.products.length - 1).value; // Get the last product added
      const url = 'http://localhost:5241/api/Products';
      this.productService.Add(url, productData).subscribe({
        next: (response) => {
          console.log('Product saved successfully', response);
          this.addingProduct = false; // Reset flag after saving
        },
        error: (error) => {
          console.error('Error saving product', error);
        },
      });
    }
  }

  // Function to remove a product row
  removeProduct(index: number) {
    this.products.removeAt(index);
    this.addingProduct = false; // Reset flag after removing
  }
  onSubmit() {
    if (this.orderForm && this.orderForm.valid) {
      // Prepare the order data
      const orderData: IAddOrder = {
        clientName: this.orderForm.controls['clientName'].value,
        phone: this.orderForm.controls['phone'].value,
        phone2: this.orderForm.controls['phone2'].value,
        email: this.orderForm.controls['email'].value,
        villageAndStreet: this.orderForm.controls['villageAndStreet'].value,
        shippingToVillage: this.orderForm.controls['shippingToVillage'].value,
        governorateId: Number(this.orderForm.controls['governorateId'].value),
        cityId: Number(this.orderForm.controls['cityId'].value),
        shippingId: Number(this.orderForm.controls['shippingId'].value),
        branchId: Number(this.orderForm.controls['branchId'].value),
        status: Number(this.orderForm.controls['status'].value),
        type: Number(this.orderForm.controls['type'].value),
        paymentType: Number(this.orderForm.controls['paymentType'].value),
        products: this.products.value.map((product: any) => ({
          ...product,
          weight: +product.weight,
          quantity: +product.quantity,
          price: +product.price,
        })),
        merchantId: '1f4e64c0-3b12-49d2-bd29-2ba9ac31eaa5',
        RepresentativeId: '058944e8-9e9b-46d8-b53c-c0940a1ed1f8',
      };
      console.log(orderData);
      const url = 'http://localhost:5241/api/Orders';
      this.orderService.Add(url, orderData).subscribe(
        (response) => {
          console.log('Order and products added successfully', response);
        },
        (error) => {
          console.error('Error adding order and products', error);
        }
      );
    }
  }
}
