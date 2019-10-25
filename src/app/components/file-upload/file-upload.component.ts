import { Component, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Output() imageLoaded = new EventEmitter<any>();

  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;

  task: AngularFireUploadTask;
  downloadURL: Observable<string> = null;
  isHovering: boolean;
  loaded = false;

  constructor(
    private storage: AngularFireStorage
  ) { }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    const file = event.item(0);

    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type');
      return;
    }

    const path = `postImages/${new Date().getTime()}_${file.name}`;
    const customMetadata = { app: 'poetryApp' };

    const fileRef = this.storage.ref(path);

    this.task = this.storage.upload(path, file, { customMetadata });
    this.task.then(() => {
      fileRef.getDownloadURL().subscribe(url => {
        if (url) {
          this.downloadURL = url;
          this.imageLoaded.emit(this.downloadURL);
        }
      });
    });
  }
}
