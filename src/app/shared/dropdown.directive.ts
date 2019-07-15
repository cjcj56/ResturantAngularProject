import { Directive, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;

    // constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
    constructor(private elementRef: ElementRef) {}

    // @HostListener('click') toggleOpen() {
    //     if (this.isOpen) {
    //         this.renderer.addClass(this.elementRef.nativeElement, 'open');
    //     } else {
    //         this.renderer.removeClass(this.elementRef.nativeElement, 'open');
    //     }
    // }
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isOpen : false;
        // if (this.isOpen) {
        //     this.renderer.addClass(this.elementRef.nativeElement, 'open');
        // } else {
        //     this.renderer.removeClass(this.elementRef.nativeElement, 'open');
        // }
    }
}
