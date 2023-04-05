import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{
 
  constructor(private productService:ProductService) {}

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate','updatedDate'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA); //Neyi listeleyeceğimizi buradaki veri kaynağından belirliyor olucaz.

  ngOnInit(): void {

    
  }

}
