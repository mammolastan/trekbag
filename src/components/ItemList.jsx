export default function ItemList({ items }) {
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
