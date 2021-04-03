import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service'

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShowvalueComponent } from './showvalue/showvalue.component';
import { BlocklyComponent } from './blockly/blockly.component';
import { NgxBlocklyModule } from 'ngx-blockly';
import { HomepageComponent } from './homepage/homepage.component';
import { ExcersiceComponent } from './excersice/excersice.component';
import { TestloginComponent } from './testlogin/testlogin.component';
import { LearningComponent } from './learning/learning.component';
import { LessionComponent } from './lession/lession.component';


export const firebaseConfig = {
  apiKey: "AIzaSyAyN3YOXzbHvqIfd5tDqg8lq7Vf7C6cgWk",
  authDomain: "learningman-fda77.firebaseapp.com",
  databaseURL: "https://learningman-fda77.firebaseio.com",
  projectId: "learningman-fda77",
  storageBucket: "learningman-fda77.appspot.com",
  messagingSenderId: "909927201261",
  appId: "1:909927201261:web:222ba37bec3ca01a100fe4",
  measurementId: "G-CFGW2DH6RJ"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ShowvalueComponent,
    BlocklyComponent,
    HomepageComponent,
    ExcersiceComponent,
    TestloginComponent,
    LearningComponent,
    LessionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxBlocklyModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    FormsModule,
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
