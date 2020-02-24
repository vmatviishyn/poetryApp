import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

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

  getPoem(id: string): Observable<any> {
    return this.afs.collection('poems', (ref: firebase.firestore.CollectionReference) => ref
      .where('poemId', '==', id)).get()
      .pipe(switchMap((snapshot: firebase.firestore.QuerySnapshot) => {
        return this.afs.doc(`poems/${snapshot.docs[0].id}`).valueChanges();
      }));
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
    return this.afs.collection('poems', (ref: firebase.firestore.CollectionReference) => ref
      .where('poemId', '==', poem.poemId)).get()
      .pipe(switchMap((snapshot: firebase.firestore.QuerySnapshot) => {
        return of(this.afs.doc(`poems/${snapshot.docs[0].id}`).update(poem));
      }));
  }

  addLike(poem: any, userInfo: any) {
    const like = {
      poemId: poem.poemId,
      userEmail: userInfo.email,
      userName: userInfo.name,
      userPhoto: userInfo.photoURL
    };

    this.afs.collection('likes').add(like);
  }

  removeLike(poem: any, userInfo: any) {
    return this.afs.collection('likes', (ref: firebase.firestore.CollectionReference) => ref
      .where('userEmail', '==', userInfo.email)
      .where('poemId', '==', poem.poemId)).get()
      .pipe(switchMap((snapshot: firebase.firestore.QuerySnapshot) => {
        return of(this.afs.doc(`likes/${snapshot.docs[0].id}`).delete());
      }));
  }

  getLikes(poemId: string) {
    return this.afs.collection('likes', (ref: firebase.firestore.CollectionReference) => ref
      .where('poemId', '==', poemId)).valueChanges();
  }

  addComment(poemId: string, userInfo: any, commentText: any) {
    // console.log('poems.service - poemId - addComment::: ', poemId);
    // console.log('poems.service - userInfo -  addComment::: ', userInfo);
    // console.log('poems.service - commentText -  addComment::: ', commentText);
  }
}
