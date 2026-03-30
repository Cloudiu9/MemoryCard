// will need to change amount of card dynamically (difficulty), probably state passed down from parent?

import Card from "./Card";

export default function CardContainer() {
  // PASS DOWN IMAGE AND TITLE API TO EACH CARD? USEEFFECT?
  // images need to remain 'static' (don't change ALL images after one click)
  // https://ddragon.leagueoflegends.com/cdn/13.1.1/data/en_US/champion.json
  // https://developer.riotgames.com/docs/lol

  return (
    <>
      {/* scale/change padding depending on difficulty */}
      <h1 style={{ padding: 50 + "px" }}>Memory Card Game</h1>
      <div id="flexCon">
        <div id="cardContainer">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
}
