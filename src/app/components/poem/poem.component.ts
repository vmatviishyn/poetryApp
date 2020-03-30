import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { takeUntil, switchMap } from 'rxjs/operators';
import { Subject, Observable, of } from 'rxjs';

import { NewPoemComponent } from '../new-poem/new-poem.component';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

import { Poem } from '../../models/poem.model';
import { Like } from '../../models/like.model';
import { Comment } from '../../models/comment.model';
import { User } from '../../models/user.model';

import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-poem',
  templateUrl: './poem.component.html',
  styleUrls: ['./poem.component.scss']
})
export class PoemComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  comments$: Observable<Comment[]>;

  poemId;

  poem: Poem = null;
  user: User = null;
  likes: Like[] = [];
  isPoemLiked: any;
  comment: string = null;
  isCommentsShown = false;

  constructor(
    public dialog: MatDialog,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromStore.AppState>,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => of(this.store.dispatch(new fromStore.GetPoem(params.get('id'))))),
      takeUntil(this.unsubscribe$)
    ).subscribe();

    this.store.select(fromStore.getActivePoemSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((poem: Poem) => {
        this.poem = poem;

        if (this.poem) {
          this.store.dispatch(new fromStore.GetPoemLikes(this.poem));
          this.store.dispatch(new fromStore.GetPoemComments(this.poem));
        }
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
    this.router.navigate(['/poems']);
    this.store.dispatch(new fromStore.RemovePoem(poem));
  }

  onAddLike(poem: Poem, user: User) {
    if (user) {
      this.isPoemLiked
        ? this.store.dispatch(new fromStore.RemovePoemLike({poem, user}))
        : this.store.dispatch(new fromStore.AddPoemLike({poem, user}));
    } else {
      this.snackbarService.showSnackbar('Please login to add likes!');
    }
  }

  showAddComment() {
    this.isCommentsShown = !this.isCommentsShown;
  }

  onAddComment(poem: Poem, user: User) {
    if (user) {
      this.store.dispatch(new fromStore.AddPoemComment({ poem, user, comment: this.comment }));
      this.comment = '';
    } else {
      this.snackbarService.showSnackbar('Please login to add comments!');
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
