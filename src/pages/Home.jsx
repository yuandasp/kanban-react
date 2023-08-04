import React, { useEffect, useState } from "react";
import TodoCard from "components/TodoCard";
import { Button } from "@chakra-ui/react";

function Home() {
  return (
    <>
      <div className="h-full bg-blue-50 dark:bg-slate-900">
        <div>
          <TodoCard />
        </div>
      </div>
    </>
  );
}

export default Home;
