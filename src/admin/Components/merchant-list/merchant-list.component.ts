import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IDisplayMerchant } from '../../DTOs/DisplayDTOs/IDisplayMerchant';
import { MerchantService } from '../../Services/merchant.service';
import { Status } from '../../Enums/Status';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-merchant-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css'],
})
export class MerchantListComponent implements OnInit, OnDestroy {
  data: IDisplayMerchant[] = [];
  selectedEntries = 8;
  searchTerm = '';
  currentPage = 1;
  totalPages = 0;
  startIndex = 0;
  endIndex = 0;
  filteredData: IDisplayMerchant[] = [];
  pagedData: IDisplayMerchant[] = [];
  private destroy$ = new Subject<void>();

  constructor(private merchantService: MerchantService) {}

  ngOnInit(): void {
    this.loadMerchants();
  }

  loadMerchants(): void {
    const url = `https://localhost:7057/api/Merchant?page=${this.currentPage}&pageSize=${this.selectedEntries}&searchTerm=${this.searchTerm}`;
    this.merchantService
      .GetPage(url)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          if (Array.isArray(response)) {
            // Handle the case where the response is an array
            this.data = response;
            this.totalPages = Math.ceil(response.length / this.selectedEntries); // Calculate totalPages based on response length
          } else if (
            response &&
            response.List &&
            Array.isArray(response.List)
          ) {
            // Handle the case where the response matches IPaginationDTO
            this.data = response.List;
            this.totalPages =
              response.TotalPages ||
              Math.ceil(response.TotalCount / this.selectedEntries); // Calculate totalPages based on TotalCount
          } else {
            console.error('Unexpected API response format:', response);
            return; // Exit the method early
          }

          this.updateTable();
        },
        error: (error) => {
          console.error('Error fetching merchants:', error);
        },
      });
  }

  onEntriesChange(): void {
    this.currentPage = 1;
    this.loadMerchants();
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.loadMerchants();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadMerchants();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadMerchants();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadMerchants();
    }
  }

  updateTable(): void {
    this.filteredData = this.data || []; // Ensure filteredData is always an array
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
