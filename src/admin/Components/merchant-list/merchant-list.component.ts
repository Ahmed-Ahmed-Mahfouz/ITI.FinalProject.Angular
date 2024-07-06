import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IDisplayMerchant } from '../../DTOs/DisplayDTOs/IDisplayMerchant';
import { MerchantService } from '../../Services/merchant.service';
import { Status } from '../../Enums/Status';

@Component({
  selector: 'app-merchant-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css'],
})
export class MerchantListComponent implements OnInit {
  data: IDisplayMerchant[] = [];
  selectedEntries = 8;
  searchTerm = '';
  currentPage = 1;
  totalPages = 0;
  startIndex = 0;
  endIndex = 0;
  filteredData: IDisplayMerchant[] = [];
  pagedData: IDisplayMerchant[] = [];

  constructor(
    private merchantService: MerchantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMerchants();
  }

  loadMerchants(): void {
    // this.merchantService.GetAll().subscribe(
    //   (merchants) => {
    //     this.data = merchants;
    //     this.updateTable();
    //   },
    //   (error) => {
    //     console.error('Error fetching merchants:', error);
    //   }
    // );
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
          row.userName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          row.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          row.phoneNumber.includes(this.searchTerm) ||
          row.branchName
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
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
