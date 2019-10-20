import {
  Component,
  ViewChild,
  ElementRef,
  QueryList,
  ContentChildren
} from '@angular/core';
import { SliderItemDirective } from './slider-item.directive';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
  @ContentChildren(SliderItemDirective, { read: ElementRef }) items: QueryList<
    ElementRef<HTMLDivElement>
  >;
  @ViewChild('slides', null) slidesContainer: ElementRef<HTMLDivElement>;

  private slidesIndex = 0;

  get currentItem(): ElementRef<HTMLDivElement> {
    return this.items.find((item, index) => index === this.slidesIndex);
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
