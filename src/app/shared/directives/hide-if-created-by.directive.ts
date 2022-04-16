import { UserService } from 'src/app/shared/services/user.service';
import { Directive, ElementRef, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Directive({
  selector: `[hideIfCreatedBy]`
})
export class HideIfCreatedByDirective implements OnInit, OnDestroy {

  private subscription?: Subscription;
  private requiredState?: string[];

  private backedUpDisplay?: string;

  constructor(private domEl: ElementRef, private userService: UserService) { }

  @Input()
  set hideIfCreatedBy(state: string[]) {
    this.requiredState = state;
  }

  ngOnInit(): void {
    this.subscription = this.userService.getUserWithRelations().subscribe(response => {
      const user = response.body;
      if (this.requiredState?.includes(user.createdBy)) {
        this.hideDomEl();
      } else {
        this.showDomEl();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  showDomEl(): void {
    this.domEl.nativeElement.style.display = this.backedUpDisplay;
  }

  hideDomEl(): void {
    if (this.domEl.nativeElement.style.display !== 'none')
      this.backedUpDisplay = this.domEl.nativeElement.style.display;
    this.domEl.nativeElement.style.display = 'none';
  }
}