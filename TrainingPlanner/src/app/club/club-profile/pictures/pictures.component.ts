import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Picture } from 'src/app/models/Picture';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.css']
})
export class PicturesComponent {
  constructor() {}
  @Input() pictures: Picture[];
  isPicturesLoaded: boolean;

  xd($event): void {
    this.readPicture($event.target);
  }

  readPicture(inputValue: any): void {
    const files: FileList = inputValue.files;
    for (let i = 0; i < files.length; i++) {
      const myReader: FileReader = new FileReader();
      myReader.onloadend = () => {
        const base = myReader.result;
        const pic = {
          data: base.toString(),
          displayOrder: 1,
          isMiniature: false
        };
        this.pictures.push(pic);
      };
      myReader.readAsDataURL(files.item(i));
    }
    this.isPicturesLoaded = true;
  }

  drop(event: CdkDragDrop<Picture[]>) {
    moveItemInArray(this.pictures, event.previousIndex, event.currentIndex);
    for (let i = 0; i < this.pictures.length; i++) {
      this.pictures[i].displayOrder = i;
      if (i !== 0) {
        this.pictures[i].isMiniature = false;
      }
    }
    this.pictures[0].isMiniature = true;
  }
}
