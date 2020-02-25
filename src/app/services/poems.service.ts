import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { HashService } from './hash.service';

@Injectable({
  providedIn: 'root'
})
export class PoemsService {

  constructor(
    private afs: AngularFirestore,
    private hashService: HashService
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

  addComment(poem: any, userInfo: any, commentText: string) {
    const comment = {
      commentId: this.hashService.generate(),
      poemId: poem.poemId,
      userEmail: userInfo.email,
      userName: userInfo.name,
      userPhoto: userInfo.photoURL,
      date: Date.now(),
      commentText,
    };

    this.afs.collection('comments').add(comment);
  }

  getComments(poemId: string) {
    return this.afs.collection('comments', (ref: firebase.firestore.CollectionReference) => ref
      .where('poemId', '==', poemId)
      .orderBy('date', 'asc'))
      .valueChanges();
  }

  deleteComment(comment: any) {
    return this.afs.collection('comments', (ref: firebase.firestore.CollectionReference) => ref
      .where('commentId', '==', comment.commentId)).get()
      .pipe(switchMap((snapshot: firebase.firestore.QuerySnapshot) => {
        return of(this.afs.doc(`comments/${snapshot.docs[0].id}`).delete());
      }));
  }
}
