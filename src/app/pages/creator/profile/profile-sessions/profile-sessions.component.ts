import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IRefreshToken } from 'src/app/shared/interfaces/IUser';

@Component({
  selector: 'app-profile-sessions',
  templateUrl: './profile-sessions.component.html',
  styleUrls: ['./profile-sessions.component.scss'],
})
export class ProfileSessionsComponent implements OnInit {
  @Input() refreshTokens?: IRefreshToken[];

  displayedColumns: string[] = ['id', 'ipAddress', 'createdAt'];
  dataSource = new MatTableDataSource<IRefreshToken>();
  clickedRows = new Set<PeriodicElement>();

  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = this.refreshTokens!;
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

// createdAt: "2022-04-11T10:08:10.956Z"
// id: 44
// ipAddress: "::1"
// token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY0ODhmMmEwLWQ5MDktNGRjZi05ZTM2LTJkMGIxOWJjNWYwNCIsImlhdCI6MTY0OTY3MTY5MH0.sQ91dGaVu2nLWvIa1fK5l41XO1ihz-uKcrlrdNkAN4Y"
// userId: "f488f2a0-d909-4dcf-9e36-2d0b19bc5f04"
