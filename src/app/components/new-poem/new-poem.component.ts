import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PoemsService } from 'src/app/services/poems.service';
import { MatDialog } from '@angular/material/dialog';
import { HashService } from 'src/app/services/hash.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-new-poem',
  templateUrl: './new-poem.component.html',
  styleUrls: ['./new-poem.component.scss']
})
export class NewPoemComponent implements OnInit {
  selectedImage = null;
  poemData: any;
  imagePath: any;

  constructor(
    private poemsService: PoemsService,
    private hashService: HashService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.poemData = this.data;
  }

  onAddNewPoem(text) {
    this.poemsService.addPoem({
      poemImagePath: this.imagePath,
      poemId: this.hashService.generate(),
      poemText: text,
      poemImage: this.selectedImage
    })
    .then(() => {
      this.onAddNewPoemDialogClose();
    });
  }

  onEditPoem(text) {
    this.poemsService.editPoem({
      poemImagePath: this.imagePath || this.poemData.poemImagePath,
      poemId: this.poemData.poemId,
      poemText: text,
      poemImage: this.selectedImage || this.poemData.poemImage,
    })
    .pipe(take(1))
    .subscribe(() => {
      this.onAddNewPoemDialogClose();
    });
  }

  onSavePoem(text) {
    if (this.poemData) {
      this.onEditPoem(text);
    } else {
      this.onAddNewPoem(text);
    }
  }

  onImageLoaded({downloadURL, imagePath}) {
    this.selectedImage = downloadURL;
    this.imagePath = imagePath;
  }

  onAddNewPoemDialogClose() {
    this.dialog.closeAll();
  }
}
