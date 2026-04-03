// will need to change amount of card dynamically (difficulty), probably state passed down from parent?

// PASS DOWN IMAGE AND TITLE API TO EACH CARD? USEEFFECT?
// images need to remain 'static' (don't change ALL images after one click)
// https://ddragon.leagueoflegends.com/cdn/13.1.1/data/en_US/champion.json
// https://developer.riotgames.com/docs/lol

import { useEffect, useState } from "react";
import Card from "./Card";
import Popup from "./Popup";

export default function CardContainer() {
  const API_URL = "https://ddragon.leagueoflegends.com/cdn/16.1.1/";

  const [difficulty, setDifficulty] = useState(0);
  const [gameStart, setGameStart] = useState(true);

  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);

  const [score, setScore] = useState(0);
  // Retrieving highScore from localStorage on page load
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("highScore");
    return saved ? parseInt(saved) : 0;
  });

  const [gameOver, setGameOver] = useState(false);
  const [status, setStatus] = useState("");

  function handleGameStart(level) {
    setDifficulty(level);
    setGameStart(false);
    setGameOver(false);
  }

  // When highscore changes, update it
  useEffect(() => {
    localStorage.setItem("highScore", highScore);
  }, [highScore]);

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
      for (let i = 0; uniqueChamps.size < difficulty * 6; i++) {
        const randomName =
          allChamps[Math.floor(Math.random() * allChamps.length)];
        uniqueChamps.add(data.data[randomName]);
      }
      setCards([...uniqueChamps]);
    };

    loadData();
  }, [difficulty]); // only on page load

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
    return newArray;
  };

  function handleButtonClick(id) {
    // on click, 'mark' cark
    setClickedCards([...clickedCards, id]);

    // shuffle card positions
    const shuffled = shuffleCards([...cards]);
    setCards(shuffled);

    // if clicked card is clicked again, lose
    // guard clause with early return

    // https://stackoverflow.com/questions/45277306/check-if-item-exists-in-array-react
    if (clickedCards.includes(id)) {
      // mark game as lost
      setStatus("You Lost");
      setGameOver(true);

      // set highScore
      if (highScore < score) setHighScore(score);

      // reset states on lose
      setClickedCards([]);
      setScore(0);
      return;
    }

    // mark game as won if score === 11  (difficulty * 6) - 1
    if (score === difficulty * 6 - 1) {
      if (highScore < score) setHighScore(difficulty * 6);
      setClickedCards([]);
      setScore(0);
      setStatus("You Won");
      setGameOver(true);

      return;
    }

    setClickedCards([...clickedCards, id]);
    setScore((prevScore) => prevScore + 1);
    setCards(shuffleCards(cards));
  }

  return (
    <>
      {gameStart && (
        <Popup
          difficulty={difficulty}
          msg={"Select your difficulty"}
          onSelectDifficulty={handleGameStart}
        />
      )}
      {gameOver && (
        <Popup
          difficulty={difficulty}
          msg={status}
          onSelectDifficulty={handleGameStart}
        />
      )}

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
