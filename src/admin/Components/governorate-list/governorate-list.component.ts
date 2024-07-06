import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDisplayMerchant } from '../../DTOs/DisplayDTOs/IDisplayMerchant';
import { GenericService } from '../../Services/generic.service';
import { IGovernorate } from '../../DTOs/DisplayDTOs/IGovernorate';
import { IGovernorateInsert } from '../../DTOs/InsertDTOs/IGovernorateInsert';
import { IGovernorateUpdate } from '../../DTOs/UpdateDTOs/IGovernorateUpdate';
import { Router } from 'express';
import { Status } from '../../Enums/Status';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-governorate-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './governorate-list.component.html',
  styleUrl: './governorate-list.component.css'
})
export class GovernorateListComponent implements OnInit, OnDestroy {
  data: IGovernorate[] = [];
  selectedEntries = 8;
  searchTerm = '';
  currentPage = 1;
  totalPages = 0;
  startIndex = 0;
  endIndex = 0;
  filteredData: IGovernorate[] = [];
  pagedData: IGovernorate[] = [];

  gSub:any;

  constructor(
    private governorateService: GenericService<IGovernorate, IGovernorateInsert, IGovernorateUpdate>
  ) {
    // this.governorateService.baseUrl = "Governorate";
  }
  
  ngOnInit(): void {
    this.loadGovernorates();
  }

  ngOnDestroy(): void {
    if (this.gSub) {
      this.gSub.unsubscribe();
    }
  }
  
  loadGovernorates(): void {
    this.governorateService.GetPage("").subscribe({
      next: data =>{
        this.data = data.List;
        this.totalPages = data.TotalPages;
      },
      error: error => {
        console.log(error);
      }
    })
  }

  onEntriesChange(): void {
    this.currentPage = 1;
    this.updateTable();
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.updateTable();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateTable();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateTable();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateTable();
    }
  }

  updateTable(): void {
    let filteredData = this.data;
    if (this.searchTerm) {
      filteredData = filteredData.filter(
        (row) =>
          row.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          // row.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          // row.phoneNumber.includes(this.searchTerm) ||
          // row.branchName
          //   .toLowerCase()
          //   .includes(this.searchTerm.toLowerCase()) ||
          this.getStatusText(row.status)
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredData = filteredData;
    this.totalPages = Math.ceil(
      this.filteredData.length / this.selectedEntries
    );
    this.startIndex = (this.currentPage - 1) * this.selectedEntries;
    this.endIndex = Math.min(
      this.startIndex + this.selectedEntries,
      this.filteredData.length
    );
    this.pagedData = this.filteredData.slice(this.startIndex, this.endIndex);
  }

  getStatusText(status: Status): string {
    return Status[status];
  }

  getRowIndex(index: number): number {
    return this.startIndex + index + 1;
  }
}
