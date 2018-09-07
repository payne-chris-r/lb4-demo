import { Todo } from '../models';
import { TodoRepository } from '../repositories';
import { GeocoderService } from '../services';
export declare class TodoController {
    protected todoRepo: TodoRepository;
    protected geoService: GeocoderService;
    constructor(todoRepo: TodoRepository, geoService: GeocoderService);
    createTodo(todo: Todo): Promise<Todo>;
    findTodoById(id: number, items?: boolean): Promise<Todo>;
    findTodos(): Promise<Todo[]>;
    replaceTodo(id: number, todo: Todo): Promise<boolean>;
    updateTodo(id: number, todo: Todo): Promise<boolean>;
    deleteTodo(id: number): Promise<boolean>;
}
