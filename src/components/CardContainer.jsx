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
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

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
      // change 'size < difficulty * 6' ==> diff 1 = 6 cards, etc.
      const uniqueChamps = new Set();
      for (let i = 0; uniqueChamps.size < 12; i++) {
        const randomName =
          allChamps[Math.floor(Math.random() * allChamps.length)];
        uniqueChamps.add(data.data[randomName]);
      }
      setCards([...uniqueChamps]);
    };

    loadData();
  }, []); // only on page load

  // https://www.reddit.com/r/reactjs/comments/y4p2x4/cards_only_shuffle_when_you_click_the_first/
  const shuffleCards = (array) => {
    let newArray = [...array];
    let currentIndex = newArray.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      // eslint-disable-next-line react-hooks/purity
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [newArray[currentIndex], newArray[randomIndex]] = [
        newArray[randomIndex],
        newArray[currentIndex],
      ];
    }
    console.log("AAAA");
    return newArray;
  };

  function handleButtonClick(id) {
    // on click, 'mark' cark
    setClickedCards([...clickedCards, id]);

    console.log("Clicked. " + clickedCards);

    // shuffle card positions
    const shuffled = shuffleCards([...cards]);
    setCards(shuffled);

    // if clicked card is clicked again, lose
    // https://stackoverflow.com/questions/45277306/check-if-item-exists-in-array-react
    if (clickedCards.includes(id)) {
      // render You Lost! popup
      alert("You Lost!");

      // set highScore
      if (highScore < score) setHighScore(score);

      // reset states on lose
      setClickedCards([]);
      setScore(0);
    } else {
      setClickedCards([...clickedCards, id]);
      setScore((prevScore) => prevScore + 1);
      console.log(score);
    }
  }

  return (
    <>
      {/* scale/change padding depending on difficulty? */}
      <h1 style={{ padding: 20 + "px", paddingBottom: 10 + "px" }}>
        Memory Card Game
      </h1>
      <p style={{ padding: 20 + "px", fontSize: 20 + "px", color: "tomato" }}>
        Don't click the same champion!
      </p>
      <p id="score">
        Score: {score} <br />
        Highscore: {highScore}
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
              handleClick={() => handleButtonClick(champ.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
