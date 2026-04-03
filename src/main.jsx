import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import CardContainer from "./components/CardContainer";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

/*

TODO:
- 12 cards each with diff img
- click 1 card => positions shuffle
- click same card => end game
- keep score and highscore top right

1. Card component, holds different images from an API (images gotten through useEffect?)
2. Card has a state for the img, changes image when a card is clicked OR cards change positions when a card is clicked (?)


EXTRA: 
TODO different difficulties (easy 6 cards, med 12, hard 18)
  - need to first display popup with difficulty choices on page load
  - send through popup chosen difficulty
DONE save highscore through reloads (localStorage? / cookie?)
DONE message for game end (won => clicked all, lost => clicked repeat)

TODO:
- DONE Fix responsiveness of cards (auto-fill?)
- DONE Make fetching dynamic and random

*/
