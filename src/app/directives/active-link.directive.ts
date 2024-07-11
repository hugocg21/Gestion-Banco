import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appActiveLink]'
})
export class ActiveLinkDirective {
  @Input('appActiveLink') sectionId!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const section = document.getElementById(this.sectionId);
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 0 && rect.bottom >= 0) {
        this.renderer.addClass(this.el.nativeElement, 'active');
      } else {
        this.renderer.removeClass(this.el.nativeElement, 'active');
      }
    }
  }
}
