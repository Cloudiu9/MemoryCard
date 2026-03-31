// will need to change amount of card dynamically (difficulty), probably state passed down from parent?

// PASS DOWN IMAGE AND TITLE API TO EACH CARD? USEEFFECT?
// images need to remain 'static' (don't change ALL images after one click)
// https://ddragon.leagueoflegends.com/cdn/13.1.1/data/en_US/champion.json
// https://developer.riotgames.com/docs/lol

import { useEffect, useState } from "react";
import Card from "./Card";

export default function CardContainer() {
  const API_URL = "https://ddragon.leagueoflegends.com/cdn/16.1.1/";

  const [cards, setCards] = useState([]);
  useEffect(() => {
    // get random champ portrait + name
    const loadData = async () => {
      // fetching URL with info about all champs
      const res = await fetch(API_URL + "data/en_US/champion.json");
      const data = await res.json();

      // Getting a random champion
      const allChamps = Object.keys(data.data);

      // used some help for this
      // Need a Set so there's no duplicate champs
      const uniqueChamps = new Set();
      for (let i = 0; uniqueChamps.size < 12; i++) {
        const randomName =
          allChamps[Math.floor(Math.random() * allChamps.length)];
        uniqueChamps.add(data.data[randomName]);
      }
      setCards(uniqueChamps);
    };

    loadData();
  }, []); // only on page load

  return (
    <>
      {/* scale/change padding depending on difficulty? */}
      <h1 style={{ padding: 20 + "px", paddingBottom: 10 + "px" }}>
        Memory Card Game
      </h1>
      <p style={{ padding: 20 + "px", fontSize: 20 + "px", color: "tomato" }}>
        Don't click the same champion!
      </p>
      <div id="flexCon">
        <div id="cardContainer">
          {/* used some help for this */}
          {/* spreading Set back into array */}
          {[...cards].map((champ) => (
            <Card
              key={champ.id}
              name={champ.name}
              image={API_URL + "img/champion/" + champ.image.full}
            />
          ))}
        </div>
      </div>
    </>
  );
}
