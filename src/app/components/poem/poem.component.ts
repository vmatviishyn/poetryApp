import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, take, takeUntil } from 'rxjs/operators';
import { PoemsService } from 'src/app/services/poems.service';
import { MatDialog } from '@angular/material/dialog';
import { NewPoemComponent } from '../new-poem/new-poem.component';
import { AuthService } from 'src/app/services/auth.service';
import { Subject } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-poem',
  templateUrl: './poem.component.html',
  styleUrls: ['./poem.component.scss']
})
export class PoemComponent implements OnInit, OnDestroy {

  poem: any = null;
  user: any = null;
  likes: any = [];
  isPoemLiked: any;
  comment: string = null;
  comments: any = [];
  isCommentsShown = false;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private poemsService: PoemsService,
    private router: Router,
    private authService: AuthService,
    private storage: AngularFireStorage,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.poemsService.getPoem(params.get('id'))),
      takeUntil(this.unsubscribe$)
    ).subscribe((poem: any) => {
      this.poem = poem;
      this.getUser();
      this.getLikes();
      this.getComments();
    });
  }

  showAddComment() {
    this.isCommentsShown = !this.isCommentsShown;
  }

  getLikes() {
    this.poemsService.getLikes(this.poem.poemId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(likes => {
        this.likes = likes;
        this.isPoemLiked = this.likes.find(element => {
          return element.userEmail === this.user.email && element.poemId === this.poem.poemId;
        });
      });
  }

  getUser() {
    this.authService.appUser$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(appUser => {
        this.user = appUser;
      });
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
        return element.userEmail === this.user.email && element.poemId === this.poem.poemId;
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

  getComments() {
    this.poemsService.getComments(this.poem.poemId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(comments => {
        this.comments = comments;
      });
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