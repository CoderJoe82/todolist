import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";
import { Route, NavLink } from "react-router-dom";
import TodoList from "./TodoList.js";
import { connect } from "react-redux";
import {
  addTodo,
  clearCompletedTodos,
  deleteTodo,
  toggleTodo
} from "./actions";

class App extends Component {
  state = {
    todos: todosList
  };

  handleRemoveChecked = event => {
    this.props.clearCompletedTodos();
  };

  handleToggleComplete = (event, todoIdToToggle) => {
    this.props.toggleTodo();
  };

  handleCreateTodo = event => {
    if (event.key === "Enter") {
      this.props.addTodo(event.target.value);

      event.target.value = "";
    }
  };

  handleItemsLeft() {
    let itemsLeftArray = this.state.todos.filter(todo => {
      if (todo.completed === true) {
        return false;
      }
      return true;
    });
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
        <Route exact path="/">
          <TodoList todos={this.props.todos} />
        </Route>
        <Route
          exact
          path="/active"
          render={() => (
            <TodoList
              todos={this.props.todos.filter(todo => todo.completed === false)}
            />
          )}
        />
        <Route
          exact
          path="/completed"
          render={() => (
            <TodoList
              todos={this.props.todos.filter(todo => {
                if (todo.completed === false) {
                  return false;
                }
                return true;
              })}
            />
          )}
        />
        <footer className="footer">
          {/* <!-- This should be `0 items left` by default --> */}
          <span className="todo-count">
            <strong>{this.handleItemsLeft()}</strong> item(s) left
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

const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};

const mapDispatchToProps = {
  addTodo,
  clearCompletedTodos,
  deleteTodo,
  toggleTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
