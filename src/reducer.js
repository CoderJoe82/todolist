import todosList from "./todos.json";
import {
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  CLEAR_COMPLETED_TODOS
} from "./actions";

const initialState = {
  todos: todosList
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      const newTodoArray = state.todos.slice();
      newTodoArray.push(action.payload);
      return { todos: newTodoArray };
    }
    case TOGGLE_TODO: {
      const newTodos = state.todos.slice();
      const moreNewTodos = newTodos.map(todo => {
        if (todo.id === action.payload) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      return { todos: moreNewTodos }
    }
    case DELETE_TODO: {
      const filteredArray = state.todos.filter(todo => {
        if (todo.id === action.payload) {
          return false;
        }
        return true;
      });
      return { todos: filteredArray };
    }
    case CLEAR_COMPLETED_TODOS: {
      const checkedToRemove = state.todos.filter(todo => {
        if (todo.completed === true) {
          return false;
        }
        return true;
      });
      return { todos: checkedToRemove };
    }
    default:
      return state;
  }
};

export default reducer;
