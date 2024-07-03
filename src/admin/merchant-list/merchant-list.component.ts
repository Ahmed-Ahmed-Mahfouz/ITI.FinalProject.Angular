import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-merchant-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css'],
})
export class MerchantListComponent implements OnInit {
  data = [
    {
      id: 1,
      name: 'Eslam Abuelyazeed',
      email: 'Eslam@gmail.com',
      phone: '01022756323',
      branch: 'Cairo',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Ahmed Mahfouz',
      email: 'Ahmed@gmail.com',
      phone: '01022756323',
      branch: 'Cairo',
      status: 'Inactive',
    },
    {
      id: 3,
      name: 'Deep Javiya',
      email: 'abeer6530@gmail.com',
      phone: '01022756323',
      branch: 'Cairo',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Deep Javiya',
      email: 'mahmoud55@gmail.com',
      phone: '01022756323',
      branch: 'Cairo',
      status: 'Active',
    },
    {
      id: 1,
      name: 'Eslam Abuelyazeed',
      email: 'Eslam@gmail.com',
      phone: '01022756323',
      branch: 'Cairo',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Ahmed Mahfouz',
      email: 'Ahmed@gmail.com',
      phone: '01022756323',
      branch: 'Cairo',
      status: 'Inactive',
    },
    {
      id: 3,
      name: 'Deep Javiya',
      email: 'abeer6530@gmail.com',
      phone: '01022756323',
      branch: 'Cairo',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Deep Javiya',
      email: 'mahmoud55@gmail.com',
      phone: '01022756323',
      branch: 'Cairo',
      status: 'Active',
    },
    {
      id: 1,
      name: 'Eslam Abuelyazeed',
      email: 'Eslam@gmail.com',
      phone: '01022756323',
      branch: 'Cairo',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Ahmed Mahfouz',
      email: 'Ahmed@gmail.com',
      phone: '01022756323',
      branch: 'Cairo',
      status: 'Inactive',
    },
    {
      id: 3,
      name: 'Deep Javiya',
      email: 'abeer6530@gmail.com',
      phone: '01022756323',
      branch: 'Cairo',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Deep Javiya',
      email: 'mahmoud55@gmail.com',
      phone: '01022756323',
      branch: 'Cairo',
      status: 'Active',
    },
    {
      id: 1,
      name: 'Eslam Abuelyazeed',
      email: 'Eslam@gmail.com',
      phone: '01022756323',
      branch: 'Cairo',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Ahmed Mahfouz',
      email: 'Ahmed@gmail.com',
      phone: '01022756323',
      branch: 'Cairo',
      status: 'Inactive',
    },
    {
      id: 3,
      name: 'Deep Javiya',
      email: 'abeer6530@gmail.com',
      phone: '01022756323',
      branch: 'Cairo',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Deep Javiya',
      email: 'mahmoud55@gmail.com',
      phone: '01022756323',
      branch: 'Cairo',
      status: 'Active',
    },
    {
      id: 1,
      name: 'Eslam Abuelyazeed',
      email: 'Eslam@gmail.com',
      phone: '01022756323',
      branch: 'Cairo',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Ahmed Mahfouz',
      email: 'Ahmed@gmail.com',
      phone: '01022756323',
      branch: 'Cairo',
      status: 'Inactive',
    },
    {
      id: 3,
      name: 'Deep Javiya',
      email: 'abeer6530@gmail.com',
      phone: '01022756323',
      branch: 'Cairo',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Deep Javiya',
      email: 'mahmoud55@gmail.com',
      phone: '01022756323',
      branch: 'Cairo',
      status: 'Active',
    },
    // Add more rows as needed
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
    email: string;
    phone: string;
    branch: string;
    status: string;
  }[] = [];
  pagedData: {
    id: number;
    name: string;
    email: string;
    phone: string;
    branch: string;
    status: string;
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
          row.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          row.phone.includes(this.searchTerm) ||
          row.branch.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          row.status.toLowerCase().includes(this.searchTerm.toLowerCase())
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
