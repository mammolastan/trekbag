import ReactSelect from "react-select";
import EmptyView from "./EmptyView";
import { useMemo, useState } from "react";
import { useItemsStore } from "../store/itemsStore";

const sortingOptions = [
  { value: "default", label: "Sort by default" },
  { value: "packed", label: "Show packed on top" },
  { value: "unpacked", label: "Show unpacked on top" },
];

export default function ItemList() {
  const items = useItemsStore((state) => state.items);
  const handleDeleteItem = useItemsStore((state) => state.deleteItem);
  const togglePacked = useItemsStore((state) => state.togglePacked);

  const [sorting, setSorting] = useState("default");
  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (sorting === "packed") {
          return b.packed - a.packed;
        }
        if (sorting === "unpacked") {
          return a.packed - b.packed;
        }
        return 0;
      }),
    [items, sorting]
  );

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
