import { useState } from "react";
import CkeEditor from "./assets/CkeEditor/CkEditor";
import SetTime from "./assets/TimerSet/SetTime";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <CkeEditor />
      <SetTime/>
    </div>
  );
}

export default App;
