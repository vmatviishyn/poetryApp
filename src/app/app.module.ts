import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MaterialModule } from './material.module';
import { NewPoemComponent } from './components/new-poem/new-poem.component';
import { NgModule } from '@angular/core';
import { PoemsComponent } from './components/poems/poems.component';
import { environment } from 'src/environments/environment';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { TruncatePipe } from './truncate-pipe.pipe';
import { RouterModule, Routes } from '@angular/router';
import { PoemComponent } from './components/poem/poem.component';

const appRoutes: Routes = [
  { path: 'poem/:id', component: PoemComponent },
  {
    path: 'poems',
    component: PoemsComponent,
  },
  { path: '',
    redirectTo: '/poems',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NewPoemComponent,
    PoemsComponent,
    FileUploadComponent,
    TruncatePipe,
    PoemComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    AlifeFileToBase64Module,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
  entryComponents: [
    NewPoemComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
