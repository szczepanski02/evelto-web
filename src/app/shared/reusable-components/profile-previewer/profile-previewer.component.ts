import { ICreator } from './../../interfaces/ICreator';
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-profile-previewer',
  templateUrl: './profile-previewer.component.html',
  styleUrls: ['./profile-previewer.component.scss']
})
export class ProfilePreviewerComponent implements OnInit {

  @Input() user?: ICreator;

  constructor() { }

  ngOnInit(): void {
  }

}
