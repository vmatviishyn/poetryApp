import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { HashService } from './hash.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class PoemsService {

  constructor(
    private afs: AngularFirestore,
    private hashService: HashService,
    private notificationService: NotificationService,
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

    this.afs.collection('likes').add(like).then(() => {
      this.notificationService.addNotification({
        type: 'like',
        poemId: poem.poemId,
        poemImage: poem.poemImage,
        userEmail: userInfo.email,
        userName: userInfo.name,
        userPhoto: userInfo.photoURL,
        date: Date.now(),
        notificationId: this.hashService.generate()
      });
    });
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
      poemImage: poem.poemImage,
      userEmail: userInfo.email,
      userName: userInfo.name,
      userPhoto: userInfo.photoURL,
      date: Date.now(),
      commentText,
    };

    this.afs.collection('comments').add(comment).then(() => {
      this.notificationService.addNotification({
        type: 'comment',
        poemId: poem.poemId,
        userEmail: userInfo.email,
        userName: userInfo.name,
        userPhoto: userInfo.photoURL,
        date: Date.now(),
        notificationId: this.hashService.generate()
      });
    });
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

  removeLikeByPoemId(poemId: any) {
    return this.afs.collection('likes', (ref: firebase.firestore.CollectionReference) => ref
      .where('poemId', '==', poemId)).get()
      .pipe(switchMap((snapshot: firebase.firestore.QuerySnapshot) => {
          if (snapshot.docs.length) {
            return of(this.afs.doc(`likes/${snapshot.docs[0].id}`).delete());
          } else {
            return of(null);
          }
      }));
  }

  deleteCommentByPoemId(poemId: any) {
    return this.afs.collection('comments', (ref: firebase.firestore.CollectionReference) => ref
      .where('poemId', '==', poemId)).get()
      .pipe(switchMap((snapshot: firebase.firestore.QuerySnapshot) => {
          if (snapshot.docs.length) {
            return of(this.afs.doc(`comments/${snapshot.docs[0].id}`).delete());
          } else {
            return of(null);
          }
      }));
  }
}
