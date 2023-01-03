import { useState } from "react";
import CkeEditor from "./assets/CkeEditor/CkEditor";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <CkeEditor />
    </div>
  );
}

export default App;
