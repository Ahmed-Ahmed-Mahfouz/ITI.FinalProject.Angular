import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface TableRow {
  id: number;
  serialNumber: string;
  status: string;
  vendor: string;
  client: string;
  phone: string;
  governorate: string;
  city: string;
  orderCost: number;
  amountReceived: number;
  shippingCost: number;
  paidShippingValue: number;
  companyValue: number;
  date: string;
}

@Component({
  selector: 'app-order-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-report.component.html',
  styleUrl: './order-report.component.css',
})
export class OrderReportComponent implements OnInit {
  data: TableRow[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  filteredData: TableRow[] = [];
  pagedData: TableRow[] = [];
  selectedEntries = 5;

  ngOnInit() {
    // Fetch data and initialize it
    this.fetchData();
    this.updatePagination();
  }

  fetchData() {
    // Replace this with your actual data fetching logic
    this.data = [
      // Sample data
      {
        id: 1,
        serialNumber: '001',
        status: 'Shipped',
        vendor: 'Vendor A',
        client: 'Client A',
        phone: '1234567890',
        governorate: 'Gov A',
        city: 'City A',
        orderCost: 100,
        amountReceived: 90,
        shippingCost: 10,
        paidShippingValue: 5,
        companyValue: 5,
        date: '2024-01-01',
      },
      {
        id: 1,
        serialNumber: '001',
        status: 'Shipped',
        vendor: 'Vendor A',
        client: 'Client A',
        phone: '1234567890',
        governorate: 'Gov A',
        city: 'City A',
        orderCost: 100,
        amountReceived: 90,
        shippingCost: 10,
        paidShippingValue: 5,
        companyValue: 5,
        date: '2024-01-01',
      },
      {
        id: 1,
        serialNumber: '001',
        status: 'Shipped',
        vendor: 'Vendor A',
        client: 'Client A',
        phone: '1234567890',
        governorate: 'Gov A',
        city: 'City A',
        orderCost: 100,
        amountReceived: 90,
        shippingCost: 10,
        paidShippingValue: 5,
        companyValue: 5,
        date: '2024-01-01',
      },
      {
        id: 1,
        serialNumber: '0010',
        status: 'Shipped',
        vendor: 'Vendor A',
        client: 'Client A',
        phone: '1234567890',
        governorate: 'Gov A',
        city: 'City A',
        orderCost: 100,
        amountReceived: 90,
        shippingCost: 10,
        paidShippingValue: 5,
        companyValue: 5,
        date: '2024-01-01',
      },
      {
        id: 1,
        serialNumber: '001',
        status: 'Shipped',
        vendor: 'Vendor A',
        client: 'Client A',
        phone: '1234567890',
        governorate: 'Gov A',
        city: 'City A',
        orderCost: 100,
        amountReceived: 90,
        shippingCost: 10,
        paidShippingValue: 5,
        companyValue: 5,
        date: '2024-01-01',
      },
      {
        id: 1,
        serialNumber: '001',
        status: 'Shipped',
        vendor: 'Vendor A',
        client: 'Client A',
        phone: '1234567890',
        governorate: 'Gov A',
        city: 'City A',
        orderCost: 100,
        amountReceived: 90,
        shippingCost: 10,
        paidShippingValue: 5,
        companyValue: 5,
        date: '2024-01-01',
      },
      {
        id: 1,
        serialNumber: '001',
        status: 'Shipped',
        vendor: 'Vendor A',
        client: 'Client A',
        phone: '1234567890',
        governorate: 'Gov A',
        city: 'City A',
        orderCost: 100,
        amountReceived: 90,
        shippingCost: 10,
        paidShippingValue: 5,
        companyValue: 5,
        date: '2024-01-01',
      },
    ];
    this.filteredData = [...this.data];
    this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
    this.updatePagination();
  }

  onSearchChange() {
    this.filteredData = this.data.filter((row) =>
      Object.values(row).some((val) =>
        val.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
    this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
    this.currentPage = 1;
    this.updatePagination();
  }

  onEntriesChange() {
    this.pageSize = parseInt(
      (<HTMLSelectElement>document.getElementById('entries')).value,
      10
    );
    this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(
      startIndex + this.pageSize,
      this.filteredData.length
    );
    this.pagedData = this.filteredData.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize, this.filteredData.length);
  }

  trackById(index: number, item: TableRow): number {
    return item.id;
  }
}
