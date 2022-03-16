import { Directive, ElementRef, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { WindowSizeService } from "../services/window-size.service";

@Directive({
  selector: `[showIfWidthBetween]`
})
export class ShowIfBetweenWidthDirective implements OnInit, OnDestroy {
  
  private subscription?: Subscription;
  private min?: number;
  private max?: number;

  private backedUpDisplay?: string;

  constructor(private windowSizeService: WindowSizeService, private domEl: ElementRef) {}

  @Input()
  set showIfWidthBetween(state: number[]) {
    this.min = state[0];
    this.max = state[1];
  }

  ngOnInit(): void {
    this.subscription = this.windowSizeService.getSize().subscribe(size => {
      if(!this.min || !this.max) return;
      if(this.min <= size.width && size.width < this.max) {
        this.showDomEl();
      }else{
        this.hideDomEl();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  showDomEl(): void{
    this.domEl.nativeElement.style.display= this.backedUpDisplay;
  }

  hideDomEl(): void{
    if(this.domEl.nativeElement.style.display!=='none')
    this.backedUpDisplay = this.domEl.nativeElement.style.display;
    this.domEl.nativeElement.style.display='none';
  }
}