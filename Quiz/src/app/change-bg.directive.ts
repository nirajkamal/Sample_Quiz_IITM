import { Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {

  constructor(private el: ElementRef, private render : Renderer2) { }
  @HostListener('click') answer(){
    this.render.setStyle(this.el.nativeElement,'background','grey')
    
  }

}
