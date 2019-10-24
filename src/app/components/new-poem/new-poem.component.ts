import { Component } from '@angular/core';
import { PoemsService } from 'src/app/services/poems.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-poem',
  templateUrl: './new-poem.component.html',
  styleUrls: ['./new-poem.component.scss']
})
export class NewPoemComponent {
  selectedFile = null;
  url = null;
  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;

  constructor(
    private poemsService: PoemsService,
    public dialog: MatDialog,
    private http: HttpClient,
  ) { }

  onAddNewPoem(text) {
    // this.poemsService.addPoem({
    //   poemText: text,
    // })
    // .then(() => console.log('Poem added'));

    // --------------------------

    // this.http.post()
  }

  onFileChanges(event) {
    this.selectedFile = event.target.files[0];


    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.url = event.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  onAddNewPoemDialogClose() {
    this.dialog.closeAll();
  }
}
