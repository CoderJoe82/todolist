import React, { Component } from "react";
import TodoItem from "./TodoItem.js";

class TodoList extends Component {
    render() {
      return (
        <section className="main">
          <ul className="todo-list">
            {this.props.todos.map(todo => (
              <TodoItem
                key={todo.id}
                title={todo.title}
                completed={todo.completed}
                id={todo.id}
                handleToggleComplete={this.props.handleToggleComplete}
                handleRemoveChecked={this.props.handleRemoveChecked}
                handleDeleteTodo={event =>
                  this.props.handleDeleteTodo(event, todo.id)
                }
              />
            ))}
          </ul>
        </section>
      );
    }
  }

export default TodoList;  