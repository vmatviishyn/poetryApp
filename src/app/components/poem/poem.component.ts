import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, take, takeUntil } from 'rxjs/operators';
import { PoemsService } from 'src/app/services/poems.service';
import { MatDialog } from '@angular/material/dialog';
import { NewPoemComponent } from '../new-poem/new-poem.component';
import { Subject, from } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';

import { Poem } from '../../models/poem.model';
import { Like } from '../../models/like.model';
import { Comment } from '../../models/comment.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-poem',
  templateUrl: './poem.component.html',
  styleUrls: ['./poem.component.scss']
})
export class PoemComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  poem: Poem = null;
  user: User = null;
  likes: Like[] = [];
  isPoemLiked: any;
  comment: string = null;
  comments: Comment[] = [];
  isCommentsShown = false;

  constructor(
    private route: ActivatedRoute,
    private poemsService: PoemsService,
    private router: Router,
    private storage: AngularFireStorage,
    public dialog: MatDialog,
    private store: Store<fromStore.AppState>,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.poemsService.getPoem(params.get('id'))),
      takeUntil(this.unsubscribe$)
    ).subscribe((poem: any) => {
      this.poem = poem;

      this.store.dispatch(new fromStore.GetPoemLikes(this.poem));
      this.store.dispatch(new fromStore.GetPoemComments(this.poem));
    });

    this.store.select(fromStore.getUserSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(appUser => {
        this.user = appUser;
      });

    this.store.select(fromStore.getLikesSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((likes: Like[]) => {
        this.likes = likes;

        this.isPoemLiked = this.likes.find((like: Like) => {
          return like.userEmail === this.user?.email && like?.poemId === this.poem?.poemId;
        });
      });

    this.store.select(fromStore.getCommentsSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((comments: Comment[]) => {
        this.comments = comments;
      });
  }

  showAddComment() {
    this.isCommentsShown = !this.isCommentsShown;
  }

  onEditPoem() {
    this.dialog.open(NewPoemComponent, {
      width: '80vh',
      data: this.poem
    });
  }

  onDeletePoem(poem) {
    const poemId = poem.poemId;
    this.router.navigate(['/poems']);

    this.poemsService.deletePoem(poem)
    .pipe(take(1))
    .subscribe(() => {
        this.storage.ref(poem.poemImagePath).delete();
        this.poemsService.deleteCommentByPoemId(poemId).pipe(take(1)).subscribe();
        this.poemsService.removeLikeByPoemId(poemId).pipe(take(1)).subscribe();
      });
  }

  onAddLike(poem, user) {
    if (this.user && this.likes) {
      this.isPoemLiked = this.likes.find(element => {
        return element?.userEmail === this.user?.email && element.poemId === this.poem.poemId;
      });

      this.isPoemLiked
        ? this.poemsService.removeLike(poem, user).pipe(take(1)).subscribe()
        : this.poemsService.addLike(poem, user);
    }
  }

  onAddComment(poem, user) {
    if (this.user) {
      this.poemsService.addComment(poem, user, this.comment);
      this.comment = '';
    }
  }

  onDeleteComment(comment: any) {
    this.poemsService.deleteComment(comment)
      .pipe(take(1))
      .subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
