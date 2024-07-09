import { IDisplayCity } from './../../../DTOs/DisplayDTOs/IDisplayCity';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CityService } from '../../../Services/city.service';
import { Status } from '../../../Enums/Status';
import { GenericService } from '../../../Services/generic.service';
import { IGovernorate } from '../../../DTOs/DisplayDTOs/IGovernorate';
import { IGovernorateInsert } from '../../../DTOs/InsertDTOs/IGovernorateInsert';
import { IGovernorateUpdate } from '../../../DTOs/UpdateDTOs/IGovernorateUpdate';

@Component({
  selector: 'app-city-list',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.css'
})
export class CityListComponent implements OnInit{
    data:IDisplayCity[]=[];
    governorates:IGovernorate[]=[];
    selectedEntries = 8;
    searchTerm = '';
    currentPage = 1;
    totalPages = 0;
    startIndex = 0;
    endIndex = 0;
    filteredData: IDisplayCity[]=[];
    pagedData: IDisplayCity[]=[];
  
    constructor(
      private cityService:CityService,
      private router:Router,
      private governorateService:GenericService<IGovernorate,IGovernorateInsert,IGovernorateUpdate>
    ){}

    ngOnInit(): void {
      this.loadCities();
    }

    loadCities(): void {
      this.cityService.GetAll("https://localhost:7057/api/Cities").subscribe(
        (cities) => {

          this.data = cities;
          this.updateTable();
          this.governorateService.GetAll("https://localhost:7057/api/governorate").subscribe(
            (governorates) => {
              this.governorates = governorates;
              this.updateTable();
            });
        },
        (error) => {
          console.error('Error fetching Cities:', error);
        }
      );
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
            row.name.toLowerCase().includes(this.searchTerm.toLowerCase())||
          this.getStatusText(row.status).toLowerCase().includes(this.searchTerm.toLowerCase())
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
    getGovernorateName(governorateId:number) {
      const governorate = this.governorates.find(gov => gov.id === governorateId);
      return governorate ? governorate.name : 'Unknown';
    }
}
