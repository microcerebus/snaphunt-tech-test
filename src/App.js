import React from "react";
import WeatherCard from "./components/WeatherCard.js";
import Swipe, { SwipeItem } from "swipejs/react";
import "./style.css";

const data = [
  { location: "Singapore", code: "SG", bgColor: "#1cc7d0" },
  { location: "New Delhi", code: "IN", bgColor: "#ff6c5f" },
  { location: "Dubai", code: "UAE", bgColor: "#2dde98" }
];

const cards = data.map((obj, i) => (
  <SwipeItem key={i}>
    <WeatherCard
      page={i}
      location={obj.location}
      code={obj.code}
      bgColor={obj.bgColor}
    />
  </SwipeItem>
));

function App() {
  let swipe;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}
      className="App"
    >
      <Swipe
        className="swipe"
        style={{ margin: "10px", width: "315px", height: "375px" }}
        ref={o => (swipe = o)}
        startSlide={0}
        speed={300}
        auto={3000}
        draggable={false}
        continuous={true}
        autoRestart={false}
        disableScroll={false}
        stopPropagation={false}
      >
        {cards}
      </Swipe>
      <button onClick={() => swipe.prev()}>Previous</button>
      <button onClick={() => swipe.next()}>Next</button>
    </div>
  );
}

export default App;
