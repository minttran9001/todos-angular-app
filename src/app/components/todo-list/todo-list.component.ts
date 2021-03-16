import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todo$ : Observable<Todo[]> = new Observable<Todo[]>()

  constructor(private _todoService : TodoService) { }
  onToggleTodoStatus(todo : Todo)
  {
    this._todoService.toggleTodoStatus(todo.id,todo.isCompleted)
  }
  onEditTodoContent(todo : Todo)
  {
    this._todoService.editTodoContent(todo.id,todo.content)
  }
  onRemoveBlankTodo(id : number)
  {
    this._todoService.removeTodo(id)
  }
  ngOnInit(): void {
    this.todo$ = this._todoService.todos$
  }

}
