// This file was added in Step 5
import { Observable } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/todo';
import { AuthenticationService } from './authentication.service';

@Injectable() // Injectable needed here because we are injecting into this service
export class TodoDataService {
  //private rootURL: string = 'https://nicktodoapi.herokuapp.com/todos';
  private rootURL: string = 'https://localhost:3000/todos';

  // Built-in dependency injection
  constructor(private aHttpService: HttpClient, private authService: AuthenticationService) {}

  // Read/Get All todos
  getAllTodos(): Observable<Array<Todo>> {
    return this.aHttpService.get<Array<Todo>>(`${this.rootURL}`);
  }

  // Added for Step 7
  // Get all completed tasks
  completedTodos(): Observable<Array<Todo>> {
    return this.aHttpService.get<Array<Todo>>(`${this.rootURL}/complete?iscomplete=true`);
  }

  // Added for Step 7
  // Get all incomplete tasks
  incompletedTodos(): Observable<Array<Todo>> {
    return this.aHttpService.get<Array<Todo>>(`${this.rootURL}/complete?iscomplete=false`);
  }

  // Added for Step 8
  // Create/Post todo
  addTodo(todo: Todo): Observable<Todo> {
    return this.aHttpService.post<Todo>(`${this.rootURL}`, todo);
  }

  // Added for Step 9
  // Complete function
  toggleTodoComplete(todo: Todo): Observable<Todo> {
    todo.complete = !todo.complete;
    return this.updateTodoById(todo._id, todo);
  }

  // Added for Step 9
  // Update/Put todo
  updateTodoById(id: string, newTodo: Todo): Observable<Todo> {
    return this.aHttpService.put<Todo>(`${this.rootURL}/${id}`, newTodo);
  }

  // Added for Step 11
  // Delete todo
  deleteTodoById(id: string): Observable<Todo> {
    return this.aHttpService.delete<Todo>(`${this.rootURL}/${id}`);
  }

  // Added for Step 19
  getTodoById(todoid: string): Observable<Todo> {
    return this.aHttpService.get<Todo>(`${this.rootURL}/${todoid}`);
  }
}
