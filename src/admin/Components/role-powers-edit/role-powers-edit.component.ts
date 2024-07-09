import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IRolePower } from '../../DTOs/DisplayDTOs/IRolePower';
import { GenericService } from '../../Services/generic.service';
import { IRolePowerInsert } from '../../DTOs/InsertDTOs/IRolePowerInsert';
import { IRolePowerUpdate } from '../../DTOs/UpdateDTOs/IRolePowerUpdate';
import { ActivatedRoute, Router } from '@angular/router';
import { Tables } from '../../Enums/Tables';
import { IPowers } from '../../DTOs/DisplayDTOs/IPowers';

@Component({
  selector: 'app-role-powers-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './role-powers-edit.component.html',
  styleUrl: './role-powers-edit.component.css'
})
export class RolePowersEditComponent {
  // tables:any;

  // options:string[];

  form:FormGroup;

  rSub:any;

  roleSub:any;

  arSub:any;

  powers:IPowers[];

  roleId:string;

  constructor(
    private roleService:GenericService<IRolePower, IRolePowerInsert, IRolePowerUpdate>,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private fb: FormBuilder
  ) {    
    // this.tables = Tables;
    
    // this.options = Object.keys(this.tables).map(key => this.tables[key]);
    
    // this.options = this.options.filter(el => typeof(el) != "number" );

    // this.form = new FormGroup({
    //   id: new FormControl(0, Validators.required),
    //   name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    //   // status: new FormControl(-1, [Validators.required, Validators.min(0)])
    //   // for (let i = 0; i < options.length; i++) {
        
        
    //   // }
    // })

    this.form = this.fb.group({});

    this.powers = [];

    this.roleId = '';
  }

   ngOnInit(): void {
    this.arSub = this.activatedRoute.params.subscribe({
      next: id => {
        // console.log(id['id']);
        this.roleId = id['id'];
        this.roleSub = this.roleService.GetById(`https://localhost:7057/api/RolePowers/${id['id']}`).subscribe({
          next: data => {
            if (data) {
              // this.form.patchValue(data);
              console.log(data);
              if (data.powers) {
                this.addControls(data.powers, data.roleName);
                this.powers = data.powers;
                console.log(this.form);
              }
            }
          }, 
          error: error => console.log(error)
        });
      },
      error: error => console.log(error)
    })

  }

  ngOnDestroy(): void {
    if (this.rSub) {
      this.rSub.unsubscribe();
    }

    if (this.roleSub) {
      this.roleSub.unsubscribe();
    }

    if (this.arSub) {
      this.arSub.unsubscribe();
    }
  }

  addControls(powers: IPowers[], roleName:string) {
    this.form.addControl('name', new FormControl(roleName, [Validators.required, Validators.minLength(4)]))
    powers.forEach(item => {
      this.form.addControl(`${Tables[item.tableName]}Create`, new FormControl(item.create, [Validators.required]));
      this.form.addControl(`${Tables[item.tableName]}Delete`, new FormControl(item.delete, [Validators.required]));
      this.form.addControl(`${Tables[item.tableName]}Read`, new FormControl(item.read, [Validators.required]));
      this.form.addControl(`${Tables[item.tableName]}Update`, new FormControl(item.update, [Validators.required]));
    });
  }

  get getName(){
    return this.form.controls['name'];
  }

  getTableName(nameIndex:number): string{
    return Tables[nameIndex];
  }

  // get getStatus(){
  //   return this.form.controls['status'];
  // }

  editRole() {

    if (this.form.status == 'INVALID') {
      // Swal.fire({
      //   icon: "error",
      //   title: "Error",
      //   text: "Please Input All the Required Fields with Valid Values",
      // })
      alert("Please Input All the Required Fields with Valid Values");
      return;
    }
    console.log(this.form.value);
    // let governorate:IGovernorateUpdate = {
    //   id:Number(this.form.controls['id'].value),
    //   name:this.getName.value,
    //   status:Number(this.getStatus.value)
    // }
    for (let i = 0; i < this.powers.length; i++) {
      this.powers[i].create = this.form.controls[`${Tables[this.powers[i].tableName]}Create`].value;
      this.powers[i].delete = this.form.controls[`${Tables[this.powers[i].tableName]}Delete`].value;
      this.powers[i].read = this.form.controls[`${Tables[this.powers[i].tableName]}Read`].value;
      this.powers[i].update = this.form.controls[`${Tables[this.powers[i].tableName]}Update`].value;
    }

    console.log(this.powers);
    
    let role:IRolePowerUpdate = {
      roleId: this.roleId,
      roleName: this.getName.value,
      powers:this.powers
    }

    console.log(role);
    this.rSub = this.roleService.Edit(`https://localhost:7057/api/RolePowers/${this.roleId}`, role).subscribe({
      next: data => {
        this.router.navigate(["/admin/role"]);
      },
      error: error => {
        console.log(error);
      }
    })
  }
}
