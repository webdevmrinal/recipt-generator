import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import ReciptGenerator from "./ReciptGenerator"

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ReciptGenerator />
    </>
  );
}

export default App;
