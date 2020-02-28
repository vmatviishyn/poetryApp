import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private afs: AngularFirestore
  ) { }

  addNotification(notification) {
    return this.getNotifications()
      .pipe(take(1))
      .subscribe(notifications => {
        let isNotificationExist = notifications.find((element: any) => {
          return element.poemId === notification.poemId && element.userEmail === notification.userEmail;
        });

        if (!isNotificationExist) {
          return this.afs.collection('notifications').add(notification);
        }
      });
  }

  deleteNotification(notification) {
    return this.afs.collection('notifications', (ref: firebase.firestore.CollectionReference) => ref
      .where('notificationId', '==', notification.notificationId)).get()
      .pipe(switchMap((snapshot: firebase.firestore.QuerySnapshot) => {
        return of(this.afs.doc(`notifications/${snapshot.docs[0].id}`).delete());
      }));
  }

  getNotifications() {
    return this.afs.collection('notifications', (ref: firebase.firestore.CollectionReference) => ref
      .orderBy('date', 'desc'))
      .valueChanges();
  }

  deleteNotifications() {
    return this.afs.collection('notifications', (ref: firebase.firestore.CollectionReference) => ref).get()
      .pipe(switchMap((snapshot: firebase.firestore.QuerySnapshot) => {
        return snapshot.docs.map(doc => {
          return of(this.afs.doc(`notifications/${doc.id}`).delete());
        });
      }));
  }
}
