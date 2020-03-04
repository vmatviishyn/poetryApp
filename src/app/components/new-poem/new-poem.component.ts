import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { HashService } from 'src/app/services/hash.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

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
    private store: Store<fromStore.AppState>,
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

    this.store.dispatch(new fromStore.AddPoem({
      poemImagePath: this.imagePath,
      poemId,
      poemText: text,
      poemImage: this.selectedImage
    }));

    this.onAddNewPoemDialogClose();
    this.router.navigate(['/poem', poemId]);
  }

  onEditPoem(text) {
    if (!this.imageLoaded) {
      this.snackbarService.showSnackbar('Please add photo for poem!');
      return;
    } else if (!text) {
      this.snackbarService.showSnackbar('Please add text for poem!');
      return;
    }

    this.store.dispatch(new fromStore.EditPoem({
      poemImagePath: this.imagePath || this.poemData.poemImagePath,
      poemId: this.poemData.poemId,
      poemText: text,
      poemImage: this.selectedImage || this.poemData.poemImage,
    }));

    this.onAddNewPoemDialogClose();
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
