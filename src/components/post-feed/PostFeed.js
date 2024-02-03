import ShopPost from "../post/ShopPost";
import classes from "./PostFeed.module.css";
import Spinner from "../UI/spinner/Spinner";

export default function PostFeed({
  displayVertically,
  products,
  myAds,
  onProductDelete,
}) {

  if (!products)
    return (
      <div className="warning">
        <Spinner size={80} />
      </div>
    );

  if (products.length === 0) {
    return <p className="warning">Products not found</p>;
  }

  const totalPrices = products.reduce(
    (sum, product) => sum + product?.price,
    0
  );
  const averagePrice = totalPrices / products.length;

  // Calculate the standard deviation of prices
  const squaredDifferences = products.map((product) =>
    Math.pow(product.price - averagePrice, 2)
  );
  const averageSquaredDifference =
    squaredDifferences.reduce((sum, diff) => sum + diff, 0) / products.length;
  const standardDeviation = Math.sqrt(averageSquaredDifference);

  return (
    <div className={displayVertically ? classes.vertical_posts : classes.posts}>
      {products?.map((data, i) => {
        return (
          <ShopPost
            postData={data}
            displayVertically={displayVertically}
            key={data._id}
            averagePrice={averagePrice}
            standardDeviation={standardDeviation}
            myAds={myAds}
            onProductDelete={onProductDelete}
          />
        );
      })}
    </div>
  );
}
