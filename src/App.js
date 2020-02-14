import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";
import { Route, NavLink } from "react-router-dom";
import TodoList from "./TodoList.js";

class App extends Component {
  state = {
    todos: todosList
  };

  handleRemoveChecked = event => {
    const checkedToRemove = this.state.todos.filter(todo => {
      if (todo.completed === true) {
        return false;
      }
      return true;
    });
    this.setState({ todos: checkedToRemove });
  };

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

  handleItemsLeft () {
    let itemsLeftArray = this.state.todos.filter(todo => {
      if (todo.completed === true) {
        return false
      }
      return true
    })
    return itemsLeftArray.length;
  }

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
        <Route
          exact
          path="/"
          render={() => (
            <TodoList
              todos={this.state.todos}
              handleToggleComplete={this.handleToggleComplete}
              handleDeleteTodo={this.handleDeleteTodo}
              handleRemoveChecked={this.handleRemoveChecked}
            />
          )}
        />
        <Route
          path="/active"
          render={() => (
            <TodoList
              todos={this.state.todos.filter(todo => {
                if (todo.completed === false) {
                  return true;
                }
                return false;
              })}
              handleToggleComplete={this.handleToggleComplete}
              handleDeleteTodo={this.handleDeleteTodo}
              handleRemoveChecked={this.handleRemoveChecked}
            />
          )}
        />
        <Route
          path="/completed"
          render={() => (
            <TodoList
              todos={this.state.todos.filter(todo => {
                if (todo.completed === false) {
                  return false;
                }
                return true;
              })}
              handleToggleComplete={this.handleToggleComplete}
              handleDeleteTodo={this.handleDeleteTodo}
              handleRemoveChecked={this.handleRemoveChecked}
            />
          )}
        />
        <footer className="footer">
          {/* <!-- This should be `0 items left` by default --> */}
          <span className="todo-count">
            <strong>
              {this.handleItemsLeft()}
            </strong> item(s) left
          </span>
          <ul className="filters">
            <li>
              <NavLink exact to="/" activeClassName="selected">
                All
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="selected" to="/active">
                Active
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="selected" to="/completed">
                Completed
              </NavLink>
            </li>
          </ul>
          <button
            className="clear-completed"
            onClick={this.handleRemoveChecked}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
