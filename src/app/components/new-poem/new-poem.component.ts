import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PoemsService } from 'src/app/services/poems.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-new-poem',
  templateUrl: './new-poem.component.html',
  styleUrls: ['./new-poem.component.scss']
})
export class NewPoemComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private poemsService: PoemsService,
    private bottomSheet: MatBottomSheet
  ) { }

  onAddNewPoem(text) {
    this.poemsService.addPoem({poemText: text})
      .then(() => console.log('Poem added'));
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetComponent);
  }
}
