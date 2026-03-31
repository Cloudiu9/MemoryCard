import { useEffect, useState } from "react";
import CardContainer from "./components/CardContainer";

export default function App() {
  const [bgImage, setbgImage] = useState("");

  const BACKGROUND_URL =
    "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/";

  const API_URL = "https://ddragon.leagueoflegends.com/cdn/16.1.1/";

  useEffect(() => {
    let isActive = true; // Cleanup flag
    const fetchBackground = async () => {
      // Fetching all champs
      const res = await fetch(API_URL + "data/en_US/champion.json");
      const data = await res.json();
      const allChamps = Object.keys(data.data);

      // Getting a random champion
      const randomName =
        allChamps[Math.floor(Math.random() * allChamps.length)];
      // Making a random number 1-4 (assuming all champs have at least 4 skins)
      const randomNum = Math.floor(Math.random() * 4) || 1;
      console.log(randomNum);

      // Make default something safe in case champ younger than Zoe (by release date)
      const image = BACKGROUND_URL + `${randomName}_${randomNum}.jpg`;
      const fallbackImage = BACKGROUND_URL + "Aatrox_0.jpg";

      const img = new Image();
      img.src = image;

      // used help for this
      img.onload = () => {
        if (isActive) setbgImage(image); // Only update if this effect is still "fresh"
      };
      img.onerror = () => {
        if (isActive) setbgImage(fallbackImage);
      };
    };

    fetchBackground();

    return () => {
      isActive = false;
    }; // "Kill" the previous effect run
  }, []);

  return (
    <div
      style={{
        height: 100 + "vh",
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        transition: "background-image 0.5s ease-in-out",
      }}
      id="App"
    >
      <CardContainer />
    </div>
  );
}
