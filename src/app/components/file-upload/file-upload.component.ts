import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Output() imageLoaded = new EventEmitter<any>();
  @Input() downloadURL: string;
  @Input() path: string;

  spinnerColor = 'primary';
  mode = 'indeterminate';
  value = 50;
  showSpinner = false;

  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;

  task: AngularFireUploadTask;

  isHovering: boolean;
  loaded = false;

  constructor(
    private storage: AngularFireStorage,
  ) { }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    const file = event.item(0);
    this.showSpinner = true;

    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type');
      return;
    }

    this.path = `postImages/${new Date().getTime()}_${file.name}`;
    const customMetadata = { app: 'poetryApp' };

    const fileRef = this.storage.ref(this.path);

    this.task = this.storage.upload(this.path, file, { customMetadata });
    this.task.then(() => {
      fileRef.getDownloadURL()
      .pipe(
        take(1)
      )
      .subscribe(url => {
        if (url) {
          this.showSpinner = false;
          this.downloadURL = url;
          this.imageLoaded.emit({
            downloadURL: this.downloadURL,
            imagePath: this.path
          });
        }
      });
    });
  }

  deletePhoto() {
    this.storage.ref(this.path).delete();
    this.downloadURL = null;
    this.imageLoaded.emit(null);
  }
}
