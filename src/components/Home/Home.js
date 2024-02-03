import classes from "./Home.module.css";

import StaticSuggestions from "./CategoriesProduct/StaticSuggestions";
import Slides from "./Slides";
import Recomendations from "../Recommendations";
import ProdCategories from "./CategoriesProduct/ProdCategories";


export default function Home() {
  return (
    <main>
      <Slides />
      <div className={`${classes["first-products"]}  ${classes.products}`}>
        <StaticSuggestions
          suggestedDepName="Smartphones"
          suggestionsDep={["electronics", "smartphones"]}
        />
        <StaticSuggestions
          suggestedDepName="exercise equipment"
          suggestionsDep={["sports and fitness", "exercise equipment"]}
        />
        <StaticSuggestions
          suggestedDepName="Home appliances"
          suggestionsDep={["home and kitchen", "appliances"]}
        />
        <StaticSuggestions
          suggestedDepName="Wristwatches"
          suggestionsDep={["watches and jewelry", "wristwatches"]}
        />
      </div>

      <ProdCategories />

      <div className={classes["recommendations-container"]}>
        <Recomendations
          suggestionsDep={["electronics"]}
          header="Electronic products"
        />
      </div>
      <div className={classes.products}>
        <StaticSuggestions
          suggestedDepName="Sports and fitness"
          suggestionsDep={["sports and fitness"]}
        />
        <StaticSuggestions
          suggestedDepName="Board games"
          suggestionsDep={["toys and games", "Board games"]}
        />
        <StaticSuggestions
          suggestedDepName="Game accessories"
          suggestionsDep={["sports and fitness", "exercise equipment"]}
        />
        <StaticSuggestions
          suggestedDepName="books and stationery"
          suggestionsDep={["books and stationery"]}
        />
      </div>
      <Recomendations
        header="Recently added"
        suggestionsDep={["sports and fitness", "exercise equipment"]}
      />
    </main>
  );
}
