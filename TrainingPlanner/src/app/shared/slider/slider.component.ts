import {
  Component,
  ViewChild,
  ElementRef,
  QueryList,
  ContentChildren
} from '@angular/core';
import { SliderItemDirective } from './slider-item.directive';
import { DataTransferService } from 'src/app/services/DataTransfer.service';

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

  constructor(private dataTransferService: DataTransferService) {}

  currentItem(): ElementRef<HTMLDivElement> {
    const it = this.items.find((item, index) => index === this.slidesIndex);
    if (it === undefined) {
      this.slidesIndex--;
      return this.items.find((item, index) => index === this.slidesIndex - 1);
    } else {
      return this.items.find((item, index) => index === this.slidesIndex);
    }
  }

  onClickLeft() {
    this.dataTransferService.setIsDeleteActivity(false);
    this.dataTransferService.setIsDeleteTrainer(false);
    this.dataTransferService.setIsDeleteExercise(false);
    this.slidesContainer.nativeElement.scrollLeft -= this.currentItem().nativeElement.offsetWidth;
    if (this.slidesIndex > 0) {
      this.slidesIndex--;
    }
  }

  onClickRight() {
    this.dataTransferService.setIsDeleteActivity(false);
    this.dataTransferService.setIsDeleteTrainer(false);
    this.dataTransferService.setIsDeleteExercise(false);
    this.slidesContainer.nativeElement.scrollLeft += this.currentItem().nativeElement.offsetWidth;

    if (this.slidesIndex < this.items.length - 1) {
      this.slidesIndex++;
    }
  }
}
