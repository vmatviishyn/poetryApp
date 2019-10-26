import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PoemsService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getPoems() {
    return this.afs.collection('poems').valueChanges();
  }

  addPoem(poem: any) {
    return this.afs.collection('poems').add(poem);
  }

  deletePoem(poem: any) {
    return this.afs.collection('poems', (ref: firebase.firestore.CollectionReference) => ref
      .where('poemId', '==', poem.poemId)).get()
      .pipe(switchMap((snapshot: firebase.firestore.QuerySnapshot) => {
        return of(this.afs.doc(`poems/${snapshot.docs[0].id}`).delete());
      }));
  }

  editPoem(poem: any) {

  }
}
