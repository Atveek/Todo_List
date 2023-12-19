import React from "react";
import Todo from "./Todo/index";

const bgColor = "red";
const color = "white";

function App() {
  return (
    <>
      <div className="bg-black h-screen w-full overflow-hidden fixed">
        <Todo />
      </div>
    </>
  );
}

export default App;
