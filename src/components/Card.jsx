// - make src attribute a prop received from parent? (api img, passed down from parent)

import { useEffect, useState } from "react";

// ONLY on page load, get 1 random img for each card

const API_URL = "https://ddragon.leagueoflegends.com/cdn/16.1.1/";

export default function Card() {
  const [img, setImg] = useState("https://placehold.co/100");
  const [champ, setChamp] = useState("");

  // get champ portrait + name
  const fetchImage = async () => {
    // fetching URL with info about all champs
    const res = await fetch(API_URL + "data/en_US/champion.json");
    const data = await res.json();

    // extracting the champion's name and img path
    // will need to get x different champs (depending on difficulty)
    const champImg = data.data.Ahri.image.full;
    const champName = data.data.Ahri.name;

    const image = API_URL + "img/champion/" + champImg;
    const champ = champName;

    setImg(image);
    setChamp(champ);
  };

  useEffect(() => {
    // disabling errors from linter IS bad, but this is a wrong error. (I think...)

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchImage();
  }, []); // only on page load

  return (
    <div className="card">
      <img src={img} alt="Champ" />
      <h1>{champ}</h1>
    </div>
  );
}
