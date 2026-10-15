import { Injectable, signal, inject } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

@Injectable({
  providedIn: 'root', // once instance for the entire app
})
export class TasksService {
  private tasks = signal<Task[]>([]);
  private loggingService = inject(LoggingService);

  allTasks = this.tasks.asReadonly();

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN',
    };
    // It's especially useful for arrays, objects, counters, and other state that depends on the previous state. set(value)	Replaces the current value
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
    this.loggingService.log('added task with title' + taskData.title);
  }

  removeTask(id: string) {
    this.tasks.update((oldTasks) => oldTasks.filter((task) => task.id !== id));
  }

  updateTaskStatus(id: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) =>
      oldTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task,
      ),
    );
  }
}
