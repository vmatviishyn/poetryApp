import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PoemsService } from 'src/app/services/poems.service';
import { MatDialog } from '@angular/material/dialog';
import { HashService } from 'src/app/services/hash.service';
import { take } from 'rxjs/operators';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-poem',
  templateUrl: './new-poem.component.html',
  styleUrls: ['./new-poem.component.scss']
})
export class NewPoemComponent implements OnInit {
  selectedImage = null;
  poemData: any;
  imagePath: any;
  imageLoaded = true;

  constructor(
    private poemsService: PoemsService,
    private hashService: HashService,
    private snackbarService: SnackbarService,
    private router: Router,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.poemData = this.data;
  }

  onAddNewPoem(text) {
    const poemId = this.hashService.generate();

    if (!this.selectedImage) {
      this.snackbarService.showSnackbar('Please add photo for poem!');
      return;
    } else if (!text) {
      this.snackbarService.showSnackbar('Please add text for poem!');
      return;
    }

    this.poemsService.addPoem({
      poemImagePath: this.imagePath,
      poemId,
      poemText: text,
      poemImage: this.selectedImage
    })
    .then(() => {
      this.onAddNewPoemDialogClose();
    })
    .then(() => {
      this.router.navigate(['/poem', poemId]);
    });
  }

  onEditPoem(text) {
    if (!this.imageLoaded) {
      this.snackbarService.showSnackbar('Please add photo for poem!');
      return;
    } else if (!text) {
      this.snackbarService.showSnackbar('Please add text for poem!');
      return;
    }

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

  onImageLoaded(imageLoaded) {
    if (imageLoaded) {
      this.selectedImage = imageLoaded.downloadURL;
      this.imagePath = imageLoaded.imagePath;
      this.imageLoaded = true;
    } else {
      this.imageLoaded = false;
    }
  }

  onAddNewPoemDialogClose() {
    this.dialog.closeAll();
  }
}
