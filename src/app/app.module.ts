import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { annotation, menu, HeroIconModule } from 'ng-heroicon';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    HeaderComponent,
    FooterComponent,
    TodoInputComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HeroIconModule.withIcons({
      annotation,
      menu
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
