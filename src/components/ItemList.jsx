import ReactSelect from "react-select";
import EmptyView from "./EmptyView";
import { useState } from "react";

const sortingOptions = [
  { value: "default", label: "Sort by default" },
  { value: "packed", label: "Sort by packed" },
  { value: "unpacked", label: "Sort by unpacked" },
];

export default function ItemList({ items, handleDeleteItem, togglePacked }) {
  const [sorting, setSorting] = useState("default");

  const sortedItems = [...items].sort((a, b) => {
    if (sorting === "packed") {
      return b.packed - a.packed;
    }
    if (sorting === "unpacked") {
      return a.packed - b.packed;
    }
    return 0;
  });

  return (
    <ul className="item-list">
      {items.length === 0 && <EmptyView />}
      {items.length > 0 ? (
        <section className="sorting">
          <ReactSelect
            onChange={(option) => setSorting(option.value)}
            options={sortingOptions}
            defaultValue={sortingOptions[0]}
          />
        </section>
      ) : null}
      {sortedItems.map((item) => (
        <Item
          key={item.id}
          item={item}
          onDeleteItem={handleDeleteItem}
          onTogglePacked={togglePacked}
        />
      ))}
    </ul>
  );
}

function Item({ item, onDeleteItem, onTogglePacked }) {
  return (
    <li className="item">
      <label>
        <input
          onChange={() => onTogglePacked(item.id)}
          checked={item.packed}
          type="checkbox"
        />
        {item.text}
      </label>
      <button
        onClick={() => {
          onDeleteItem(item.id);
        }}
      >
        ❌
      </button>
    </li>
  );
}
