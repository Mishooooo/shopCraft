import Link from "next/link";
import classes from "./StaticSuggestions.module.css";

  const fetchSuggestions = async (suggestionsDep) => {
    const dep = suggestionsDep.join(".");
    const url = `${process.env.PUBLIC_API_URL}/api/suggestions?dep=${dep}&suggestionLimit=4`;
    const revalidate = 3600; // revalidate at most every hour
    try {
      const response = await fetch(url, {
        method: "GET",
        next: { revalidate },
      });
      if (!response.ok || !(response.status >= 200 && response.status < 300)) {
        const error = new Error(response.statusText);
        error.status = response.status;
        throw error;
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  
const StaticSuggestions = async ({ suggestedDepName, suggestionsDep }) => {


  const suggestionData = await fetchSuggestions(suggestionsDep);

  return (
    <div className={classes.container}>
      <h3 >
        {suggestedDepName}
      </h3>
      <div className={classes.categories}>
        {suggestionData.map((product, i) => (
          <li key={i}>
            <Link href={`/product/${product._id}?dep=${suggestionsDep}`} >
              <img src={product.images[0]} alt="products image" />
              <h5>{product.title}</h5>
            </Link>
          </li>
        ))}
      </div>


    </div>
  );
};

export default StaticSuggestions;

