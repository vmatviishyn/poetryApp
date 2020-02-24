import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { PoemsService } from 'src/app/services/poems.service';
import { Observable, VirtualTimeScheduler } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NewPoemComponent } from '../new-poem/new-poem.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-poem',
  templateUrl: './poem.component.html',
  styleUrls: ['./poem.component.scss']
})
export class PoemComponent implements OnInit {

  poem: any;
  user: any;
  likes: any;
  isPoemLiked: any;
  comment: string;
  comments: any;

  constructor(
    private route: ActivatedRoute,
    private poemsService: PoemsService,
    private authService: AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.poemsService.getPoem(params.get('id')))
    ).subscribe((poem: any) => {
      this.poem = poem;
      this.getUser();
      this.getLikes();
      this.getComments();
    });
  }

  getLikes() {
    this.poemsService.getLikes(this.poem.poemId)
      .subscribe(likes => {
        this.likes = likes;
        this.isPoemLiked = this.likes.find(element => {
          return element.userEmail === this.user.email && element.poemId === this.poem.poemId;
        });
      });
  }

  getUser() {
    this.authService.appUser$
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
    this.poemsService.deletePoem(poem)
      .pipe(take(1))
      .subscribe();
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
      .subscribe(comments => {
        this.comments = comments;
      });
  }

}
