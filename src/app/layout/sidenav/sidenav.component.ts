import { SidenavService, SidenavViews } from './sidenav.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  activeItemSubscription?: Subscription;
  activeItem = SidenavViews.HOME;

  constructor(
    private readonly sidenavService: SidenavService
  ) { }

  ngOnInit(): void {
    this.activeItemSubscription = this.sidenavService.getActiveItem().subscribe(currentItem => {
      this.activeItem = currentItem;
      this.setActiveItemClass();
    });
  }

  setActiveItemClass(): void {
    const listOfNavElDom = document.querySelectorAll('.sidenav__item');
    listOfNavElDom.forEach(el => {
      el.classList.remove('active');
    });
    const elId = this.activeItem.slice(9, this.activeItem.length);
    const domEl = document.getElementById(elId);
    if(domEl) {
      domEl.classList.add('active');
    }
  }

  ngOnDestroy(): void {
    this.activeItemSubscription?.unsubscribe();
  }

}
