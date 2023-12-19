import React, { Component, createRef } from "react";

export default class Todo extends Component {
  state = {
    todolist: [],
    todostatus: "all",
  };
  inputRef = createRef();

  addtodo = (e) => {
    e.preventDefault();
    const todotext = this.inputRef.current;
    if (todotext) {
      this.setState(
        ({ todolist }) => ({
          todolist: [
            ...todolist,
            { text: todotext.value, id: new Date().valueOf(), isDone: false },
          ],
        }),
        () => {
          this.inputRef.current.value = "";
        }
      );
    }
  };
  deletetodo = (item) => {
    this.setState(({ todolist }) => {
      const index = todolist.findIndex((c) => c.id === item.id);
      return {
        todolist: [...todolist.slice(0, index), ...todolist.slice(index + 1)],
      };
    });
  };
  toggole = (item) => {
    this.setState(({ todolist }) => {
      const index = todolist.findIndex((c) => c.id === item.id);
      return {
        todolist: [
          ...todolist.slice(0, index),
          { ...item, isDone: !item.isDone },
          ...todolist.slice(index + 1),
        ],
      };
    });
  };

  changeStatus = (status) => {
    this.setState({ todostatus: status });
  };
  render() {
    const { todolist, todostatus } = this.state;

    console.log("render");
    console.log({ todostatus });
    return (
      <>
        <div className="flex flex-col h-screen items-center">
          <div className="flex justify-center py-5 ">
            <h1 className="font-mono font-bold text-white text-3xl">
              Todo App
            </h1>
          </div>
          <div className="flex justify-center pb-7">
            <form onSubmit={this.addtodo}>
              <label htmlFor="search" className="sr-only">
                todolist
              </label>
              <input
                type="text"
                id="search"
                ref={this.inputRef}
                className="w-60 bg-stone-400 h-9 text-sm py-2 px-3 rounded-l-md outline-none"
              />
              <button type="submit" className="btn rounded-l-none">
                Add List
              </button>
            </form>
          </div>
          <div className="flex flex-1 flex-col h-fit overflow-y-scroll scroll w-full py-4 items-center">
            {todolist
              .filter((x) => {
                switch (todostatus) {
                  case "panding":
                    return x.isDone === false;

                  case "conpleted":
                    return x.isDone === true;
                  default:
                    return true;
                }
              })
              .map((item) => (
                <div key={item.id} className="flex w-full px-3 py-2">
                  <div>
                    <label htmlFor="check" className="sr-only">
                      todoList_Display
                    </label>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className=""
                      checked={item.isDone}
                      onChange={() => this.toggole(item)}
                    />
                  </div>
                  <div className="flex-1 px-4">
                    <h2 className="text-white">{item.text}</h2>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => this.deletetodo(item)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex w-full">
            <div className="flex-1">
              <button
                type="button"
                className="btn w-full rounded-none"
                onClick={() => this.changeStatus("all")}
              >
                All
              </button>
            </div>
            <div className="flex-1">
              <button
                type="button"
                className="btn w-full rounded-none"
                onClick={() => this.changeStatus("panding")}
              >
                Pending
              </button>
            </div>
            <div className="flex-1">
              <button
                type="button"
                className="btn w-full rounded-none"
                onClick={() => this.changeStatus("conpleted")}
              >
                Completed
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
