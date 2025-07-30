function Card({ title, children }) {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <h2 className="font-bold text-lg mb-2">{title}</h2>
      {children}
    </div>
  );
}
export default Card;
