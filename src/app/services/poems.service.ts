import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class PoemsService {

  constructor(private afs: AngularFirestore) { }

  getPoems() {
    return this.afs.collection('poems').valueChanges();
  }

  addPoem(poem: any) {
    return this.afs.collection('poems').add(poem);
  }
}
