import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';

import { switchMap, take, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

import { PoemsService } from 'src/app/services/poems.service';

import { NewPoemComponent } from '../new-poem/new-poem.component';

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

  comments$: Observable<Comment[]>;

  poem: Poem = null;
  user: User = null;
  likes: Like[] = [];
  isPoemLiked: any;
  comment: string = null;
  isCommentsShown = false;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private poemsService: PoemsService,
    private router: Router,
    private storage: AngularFireStorage,
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
      .subscribe((user: User) => {
        this.user = user;
      });

    this.store.select(fromStore.getLikesSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((likes: Like[]) => {
        this.likes = likes;
        this.isPoemLiked = this.checkIsPoemLiked();
      });

    this.comments$ = this.store.select(fromStore.getCommentsSelector);
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

  onAddLike(poem: Poem, user: User) {
    if (user) {
      this.isPoemLiked
        ? this.store.dispatch(new fromStore.RemovePoemLike({poem, user}))
        : this.store.dispatch(new fromStore.AddPoemLike({poem, user}));
    }
  }

  showAddComment() {
    this.isCommentsShown = !this.isCommentsShown;
  }

  onAddComment(poem: Poem, user: User) {
    if (user) {
      this.store.dispatch(new fromStore.AddPoemComment({ poem, user, comment: this.comment }));
      this.comment = '';
    }
  }

  onDeleteComment(comment: Comment) {
    this.store.dispatch(new fromStore.RemovePoemComment(comment));
  }

  checkIsPoemLiked() {
    return this.likes.find((like: Like) => {
      return like?.userEmail === this.user?.email && like?.poemId === this.poem?.poemId;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
