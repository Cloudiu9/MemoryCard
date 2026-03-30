import { useEffect } from "react";
import CardContainer from "./components/CardContainer";

export default function App() {
  const BACKGROUND_URL =
    "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/";

  const fetchBackground = async () => {
    // right now, fetches static Aatrox_1 background img
    // need to fetch random champ and random number (1-4)
    const image = BACKGROUND_URL + "Aatrox_1.jpg";

    const appCon = document.querySelector("#App");
    console.log(appCon);

    appCon.style.backgroundImage = `url(${image})`;
  };

  useEffect(() => {
    fetchBackground();
  }, []);

  return (
    <div
      style={{
        height: 100 + "vh",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      id="App"
    >
      <CardContainer />
    </div>
  );
}
