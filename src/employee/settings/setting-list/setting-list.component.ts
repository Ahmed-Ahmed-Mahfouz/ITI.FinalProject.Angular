import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ISettings } from '../../../admin/DTOs/DisplayDTOs/ISettings';
import { GenericService } from '../../../admin/Services/generic.service';
import { IAddSettings } from '../../../admin/DTOs/InsertDTOs/IAddSettings';
import { IUpdateSettings } from '../../../admin/DTOs/UpdateDTOs/IUpdateSettings';
@Component({
  selector: 'app-setting-list',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './setting-list.component.html',
  styleUrl: './setting-list.component.css'
})
export class SettingListComponent implements OnInit {
settingsList:ISettings[]=[];
constructor(
private settingService:GenericService<ISettings,IAddSettings,IUpdateSettings>,
private router:Router
) { }
  ngOnInit(): void {
    this.loadSettings();
  }
  loadSettings(): void {
    this.settingService.GetAll("https://localhost:7057/api/Settings").subscribe(
      (settings) => {
        console.log(settings);
        this.settingsList = settings;
      },
      (error) => {
        console.error('Error fetching Settings:', error);
      }
    );
  }

}
