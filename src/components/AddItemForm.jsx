import { useRef, useState } from "react";
import Button from "./Button";

export default function AddItemForm({ onAddItem }) {
  const [itemText, setItemText] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // basic validation
    if (!itemText.trim()) {
      alert("Item cant be empty");
      inputRef.current.focus();
      return;
    }

    onAddItem(itemText);

    setItemText("");
    inputRef.current.focus();
  };

  const handleChange = (event) => {
    setItemText(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add an item</h2>
      <input
        ref={inputRef}
        value={itemText}
        onChange={handleChange}
        autoFocus
      />
      <Button>Add to list</Button>
    </form>
  );
}
