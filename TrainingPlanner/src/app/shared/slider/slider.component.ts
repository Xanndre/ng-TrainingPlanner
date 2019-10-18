import {
  Component,
  ViewChild,
  ElementRef,
  AfterContentInit,
  QueryList,
  ContentChildren
} from '@angular/core';
import { SliderItemDirective } from './slider-item.directive';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements AfterContentInit {
  @ContentChildren(SliderItemDirective, { read: ElementRef }) items: QueryList<
    ElementRef<HTMLDivElement>
  >;
  @ViewChild('slides', null) slidesContainer: ElementRef<HTMLDivElement>;

  private slidesIndex = 0;

  get currentItem(): ElementRef<HTMLDivElement> {
    return this.items.find((item, index) => index === this.slidesIndex);
  }

  ngAfterContentInit() {
    console.log('items', this.items);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    console.log('slides', this.slidesContainer);
  }

  onClickLeft() {
    this.slidesContainer.nativeElement.scrollLeft -= this.currentItem.nativeElement.offsetWidth;

    if (this.slidesIndex > 0) {
      this.slidesIndex--;
    }
  }

  onClickRight() {
    this.slidesContainer.nativeElement.scrollLeft += this.currentItem.nativeElement.offsetWidth;

    if (this.slidesIndex < this.items.length - 1) {
      this.slidesIndex++;
    }
  }
}
