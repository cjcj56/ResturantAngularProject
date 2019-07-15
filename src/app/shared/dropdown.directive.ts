import { Directive, Renderer2, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
        // if (this.isOpen) {
        //     this.renderer.addClass(this.elementRef.nativeElement, 'open');
        // } else {
        //     this.renderer.removeClass(this.elementRef.nativeElement, 'open');
        // }
    }
}
