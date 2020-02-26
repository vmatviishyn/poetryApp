import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private afs: AngularFirestore
  ) { }

  addNotification(notification) {
    return this.afs.collection('notifications').add(notification);
  }

  getNotification() {
    return this.afs.collection('notifications', (ref: firebase.firestore.CollectionReference) => ref
      .orderBy('date', 'desc'))
      .valueChanges();
  }
}
