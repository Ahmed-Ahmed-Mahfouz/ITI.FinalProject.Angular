import { Component, OnDestroy, OnInit } from '@angular/core';
import { IRolePower } from '../../DTOs/DisplayDTOs/IRolePower';
import { IRolePowerInsert } from '../../DTOs/InsertDTOs/IRolePowerInsert';
import { IRolePowerUpdate } from '../../DTOs/UpdateDTOs/IRolePowerUpdate';
import { GenericService } from '../../Services/generic.service';
import { Status } from '../../Enums/Status';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { error } from 'console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role-powers-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './role-powers-list.component.html',
  styleUrl: './role-powers-list.component.css'
})
export class RolePowersListComponent implements OnInit, OnDestroy {

  data: IRolePower[] = [];
  selectedEntries = 8;
  searchTerm = '';
  currentPage = 1;
  totalPages = 0;
  totalCount = 0;
  // startIndex = 0;
  // endIndex = 0;
  // filteredData: IRolePower[] = [];
  // pagedData: IRolePower[] = [];

  rSub:any;

  showModal:boolean;

  roleName:string;

  aSub:any;

  remSub:any;

  isValid:boolean;

  constructor(
    private roleService: GenericService<IRolePower, IRolePowerInsert, IRolePowerUpdate>,
    private router:Router
  ) {
    this.showModal = false;
    this.roleName = ''
    this.isValid = true;
  }
  
  ngOnInit(): void {
    this.loadRolePowers();
  }

  ngOnDestroy(): void {
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
    if (this.remSub) {
      this.remSub.unsubscribe();
    }
  }
  
  loadRolePowers(): void {
    // console.log(this.searchTerm);
    
    this.rSub = this.roleService.GetPage(`https://localhost:7057/api/RolePowerPage?pageNumber=${this.currentPage}&pageSize=${this.selectedEntries}&name=${this.searchTerm}`).subscribe({
      next: data =>{
        console.log("data",data);
        
        this.data = data.list;
        this.totalPages = data.totalPages;
        this.totalCount = data.totalCount
        // this.updateTable();
      },
      error: error => {
        console.log(error);
      }
    })
  }

  onEntriesChange(): void {
    this.currentPage = 1;
    // this.updateTable();
    this.loadRolePowers();
  }

  onSearchChange(): void {
    this.currentPage = 1;
    // this.updateTable();
    this.loadRolePowers();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      // this.updateTable();
      this.loadRolePowers();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      // this.updateTable();
      this.loadRolePowers();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      // this.updateTable();
      this.loadRolePowers();
    }
  }

  // updateTable(): void {
  //   let filteredData = this.data;
  //   if (this.searchTerm) {
  //     filteredData = filteredData.filter(
  //       (row) =>
  //         row.roleName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
  //         row.timeOfAddtion.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) 
  //         // ||
  //         // row.phoneNumber.includes(this.searchTerm) ||
  //         // row.branchName
  //         //   .toLowerCase()
  //         //   .includes(this.searchTerm.toLowerCase()) ||
  //         // this.getStatusText(row.status)
  //         //   .toLowerCase()
  //         //   .includes(this.searchTerm.toLowerCase())
  //     );
  //   }

  //   this.filteredData = filteredData;
  //   this.totalPages = Math.ceil(
  //     this.filteredData.length / this.selectedEntries
  //   );
  //   this.startIndex = (this.currentPage - 1) * this.selectedEntries;
  //   this.endIndex = Math.min(
  //     this.startIndex + this.selectedEntries,
  //     this.filteredData.length
  //   );
  //   this.pagedData = this.filteredData.slice(this.startIndex, this.endIndex);
  // }

  getStatusText(status: Status): string {
    return Status[status];
  }

  // getRowIndex(index: number): number {
  //   return this.startIndex + index + 1;
  // }

  toggleModal() {
    this.showModal = !this.showModal;
    this.roleName = '';
    this.isValid = true;
  }

  closeModal() {
    this.showModal = false;
    this.roleName = '';
    this.isValid = true;
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  addRole(){
    if (this.roleName.length < 3) {
      alert("Role Name Is Required and must be more than 2 characters");
      return;
    }
    let role:IRolePowerInsert = {
      roleName:this.roleName
    } 
    this.aSub = this.roleService.Add("https://localhost:7057/api/RolePowers", role).subscribe({
      next: data => {
        this.toggleModal()
        // window.location.reload();
        // this.router.navigate([this.router.url]);
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
      },
      error: error => {
        console.log(error);
      }
    })
  }

  roleNameModified() {
    if (this.roleName.length < 3) {
      this.isValid = false;
    }else{
      this.isValid = true;
    }
  }

  deleteRole(id:string){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.remSub = this.roleService.Delete(`https://localhost:7057/api/RolePowers/${id}`).subscribe({
          next: data => {
            console.log(data);
            const currentUrl = this.router.url;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([currentUrl]);
            });
          },
          error: error => {
            console.log(error);
          }
        })
        
      }
    });
  }
}
