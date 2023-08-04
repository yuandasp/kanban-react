import React from "react";
import TodoCard from "components/TodoCard";

function Home() {
  return (
    <>
      <div className="h-full bg-blue-50 dark:bg-slate-900 overflow-scroll">
        <TodoCard />
      </div>
    </>
  );
}

export default Home;
