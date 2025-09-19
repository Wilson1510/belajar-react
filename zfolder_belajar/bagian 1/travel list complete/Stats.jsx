export default function Stats({ items }) {
  const numItems = items.length;
  if (numItems === 0) return (
    <footer className="stats">
      <em>Start adding some items to your packing list 🚀</em>
    </footer>
  );
  const numPacked = items.filter((item) => item.packed).length;
  return (
    <footer className="stats">
      <em>
        {numPacked === numItems ? 'You got everything! Ready to go ✈️' : `You have ${numItems} items on your list, and you already packed ${numPacked} (${((numPacked / numItems) * 100).toFixed(2)}%)`}
      </em>
    </footer>
  );
}
