import { useState } from "react";
import { initialItems } from "../lib/constants";

export default function ItemList() {
  const [items, setItems] = useState(initialItems);

  return (
    <ul>
      {items.map((item) => (
        <Item
          key={item.id}
          text={item.text}
          packed={item.packed}
        />
      ))}
    </ul>
  );
}

function Item({ text, packed }) {
  return (
    <li className="item">
      <label>
        <input
          checked={packed}
          type="checkbox"
        />
        {text}
      </label>
      <button>❌</button>
    </li>
  );
}
