import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-city-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.css'
})
export class CityListComponent implements OnInit{
    data = [
      {
        id: 1,
        name: 'Benha',
        Governorate: 'Qaluoibya',
        NormalShippingCost: '100',
        PickUpShippingCost: '150',
      },
      {
        id: 2,
        name: 'Maadi',
        Governorate: 'Cairo',
        NormalShippingCost: '40',
        PickUpShippingCost: '250',
      },
      {
        id: 3,
        name: 'Sidi Gaber',
        Governorate: 'Alexandria',
        NormalShippingCost: '500',
        PickUpShippingCost: '750',
      },
      {
        id: 4,
        name: 'Faisal',
        Governorate: 'Giza',
        NormalShippingCost: '500',
        PickUpShippingCost: '800',
      }
    ];
  
    selectedEntries = 8;
    searchTerm = '';
    currentPage = 1;
    totalPages = 0;
    startIndex = 0;
    endIndex = 0;

    filteredData: {
      id: number;
      name: string;
      Governorate: string;
      NormalShippingCost: string;
      PickUpShippingCost: string;
    }[] = [];
    pagedData: {
      id: number;
      name: string;
      Governorate: string;
      NormalShippingCost: string;
      PickUpShippingCost: string;
    }[] = [];
  
    ngOnInit(): void {
      this.updateTable();
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
            row.Governorate.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            row.NormalShippingCost.includes(this.searchTerm) ||
            row.PickUpShippingCost.toLowerCase().includes(this.searchTerm.toLowerCase())
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
  
}
