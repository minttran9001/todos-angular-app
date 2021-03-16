import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo = { id: 0, isCompleted: false, content: '' };
  @Output() toggleStatus: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() editTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() removeBlankTodo: EventEmitter<number> = new EventEmitter<number>();
  isHover = false;
  isEditing = false;
  constructor() {}
  toggleTodoStatus() {
    this.toggleStatus.emit({
      ...this.todo,
      isCompleted: !this.todo.isCompleted,
    });
  }
  removeTodo()
  {
    this.removeBlankTodo.emit(this.todo.id);
  }
  onSubmit() {
    if (this.todo.content.trim() === '') {
      this.removeBlankTodo.emit(this.todo.id)
    }
    this.editTodo.emit({
      ...this.todo,
    });
    this.isEditing = false;
  }
  ngOnInit(): void {}
}
