import { ChemicalService } from './../../shared/services/chemical.service';
import { Component, OnInit } from '@angular/core';
import { IMaster } from 'src/app/shared/models/master.model';

@Component({
  selector: 'app-chemical',
  templateUrl: './chemical.component.html',
  styleUrls: ['./chemical.component.scss']
})
export class ChemicalComponent implements OnInit {
  searchValue: string = '';
  chemicalItemsOfMaster: IMaster[]
  constructor(private _chemicalService: ChemicalService) { }

  ngOnInit(): void {
    this.getChemical()
  }
  getChemical() {
    this._chemicalService.getChemicalItems().subscribe({
      next: (data: any) => this.chemicalItemsOfMaster = data,
      error: (error: any) => error
    })
  }
  handleClearSearch() {
    this.searchValue = ''
  }
}
