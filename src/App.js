import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";

class App extends Component {
  state = {
    todos: todosList
  };

  handleRemoveChecked = (event) => {
      const checkedToRemove = this.state.todos.filter(todo => {
        if (todo.completed === true) {
            return false
        }
        return true
      })
      this.setState({todos: checkedToRemove})
  }

  handleDeleteTodo = (event, todoToDelete) => {
    const filteredArray = this.state.todos.filter(todo => {
      if (todo.id === todoToDelete) {
        return false;
      }
      return true;
    });
    this.setState({ todos: filteredArray });
  };

  handleToggleComplete = (event, todoIdToToggle) => {
    const newTodos = this.state.todos.slice();
    const moreNewTodos = newTodos.map(todo => {
      if (todo.id === todoIdToToggle) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    this.setState({ todos: moreNewTodos });
  };

  handleCreateTodo = event => {
    if (event.key === "Enter") {
      const newTodo = {
        userId: 1,
        id: this.state.todos.length + 1,
        title: event.target.value,
        completed: false
      };
      const newTodoArray = this.state.todos.slice();
      newTodoArray.push(newTodo);
      this.setState({ todos: newTodoArray });
      event.target.value = "";
    }
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onKeyDown={this.handleCreateTodo}
            autoFocus
          />
        </header>
        <TodoList
          todos={this.state.todos}
          handleToggleComplete={this.handleToggleComplete}
          handleDeleteTodo={this.handleDeleteTodo}
          handleRemoveChecked={this.handleRemoveChecked}
        />
        <footer className="footer">
          <span className="todo-count">
            <strong>0</strong> item(s) left
          </span>
          <button
            className="clear-completed"
            onClick={event => this.handleRemoveChecked()}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

class TodoItem extends Component {
  render() {
    return (
      <li className={this.props.completed ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.completed}
            onChange={event =>
              this.props.handleToggleComplete(event, this.props.id)
            }
          />
          <label>{this.props.title}</label>
          <button className="destroy" onClick={this.props.handleDeleteTodo} />
        </div>
      </li>
    );
  }
}

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

export default App;

