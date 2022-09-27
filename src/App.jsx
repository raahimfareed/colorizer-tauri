import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { SketchPicker } from "react-color";

function App() {
  const [color, setColor] = useState("#facb48");
  const [grad, setGrad] = useState([]);
  return (
    <div>
      <SketchPicker
        color={color}
        onChange={async (color, event) => {
          console.log("Changed");
          setColor(color);
          console.log(color);
          setGrad(await invoke("generate_gradient", color.rgb));
        }}
      />
      {grad.map((color, index) => (
        <div
          key={index}
          style={{
            padding: "2rem",
            background: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
          }}
        >
          rgb({color[0]}, {color[1]}, {color[2]})
        </div>
      ))}
    </div>
  );
}

export default App;
