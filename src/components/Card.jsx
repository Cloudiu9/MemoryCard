// - make src attribute a prop received from parent? (api img, passed down from parent)

// ONLY on page load, get 1 random img for each card

export default function Card({ name, image }) {
  return (
    <div className="card">
      <img src={image} alt="Champ" />
      <h1>{name}</h1>
    </div>
  );
}
