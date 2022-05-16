import { useState } from "react";
import { ColorBox } from "./ColorBox";

export function AddColor() {

  // const color = "skyblue";
  const [color, setColor] = useState("skyblue");

  // const colorList = ["orange", "green", "red"];
  const [colorList, setcolorList] = useState(["orange", "green", "red"]);
  const styles = {
    fontSize: "24px",
    backgroundColor: color,
  };

  return (
    <div>
      <div className="add-color">
        <input onChange={(event) => setColor(event.target.value)}
          style={styles}
          type="text"
          placeholder="Enter the color"
          value={color} />

        <button onClick={() => setcolorList([...colorList, color])}>Add Color</button>


      </div>
      {colorList.map((clr) => (<ColorBox color={clr} />))}

    </div>

  );
}
