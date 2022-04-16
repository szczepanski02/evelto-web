import { AuthService } from 'src/app/shared/services/auth.service';
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

  displayedColumns: string[] = ['id', 'ipAddress', 'createdAt', 'delete'];
  dataSource = new MatTableDataSource<IRefreshToken>();
  clickedRows = new Set<PeriodicElement>();

  constructor(
    readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.refreshTokens!;
  }

  delete(id: number): void {
    this.authService.deleteRefreshTokenById(id);
    const newArray = this.dataSource.data.filter(el => el.id !== id);
    this.dataSource.data = newArray;
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}