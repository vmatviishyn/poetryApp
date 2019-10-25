import { Component } from '@angular/core';
import { PoemsService } from 'src/app/services/poems.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-poem',
  templateUrl: './new-poem.component.html',
  styleUrls: ['./new-poem.component.scss']
})
export class NewPoemComponent {
  selectedImage = null;

  constructor(
    private poemsService: PoemsService,
    public dialog: MatDialog,
  ) { }

  onAddNewPoem(text) {
    this.poemsService.addPoem({
      poemText: text,
      poemImage: this.selectedImage
    })
    .then(() => {
      console.log('Poem added');
      this.onAddNewPoemDialogClose();
    });
  }

  onImageLoaded(image) {
    this.selectedImage = image;
  }

  onAddNewPoemDialogClose() {
    this.dialog.closeAll();
  }
}
