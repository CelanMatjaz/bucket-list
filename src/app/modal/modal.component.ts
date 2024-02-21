import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit, OnDestroy {
  elementRef: ElementRef;
  @Input("text") text: string = ""
  @Output() closeClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();

  constructor(element: ElementRef) {
    this.elementRef = element;
  }

  ngOnInit(): void {
    document.querySelector('body')?.appendChild(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    const body = document.querySelector('body')!;
    if (body.querySelector('.modal-container')) {
      body.removeChild(this.elementRef.nativeElement);
    }
  }

  close() {
    this.closeClick.emit();
  }

  delete() {
    this.deleteClick.emit();
  }

}
