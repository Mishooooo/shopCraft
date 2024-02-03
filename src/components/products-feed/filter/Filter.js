import styles from "./Filter.module.css";
import PriceSlider from "./priceSlider/PriceSlider";
import FilterSlice from "./FilterCategory";
import Department from "./Department";

const conditionsFilter = [
  "new",
  "used",
  ];


export default function Filter({maxPrice}) {


  return (
    <section className={styles.container}>
      <h3 className={styles.selected_filters}>Selected Filters</h3>
      <div>
        <Department
          departmentName={"technic"}
          previousDepartment={"products"}
        />
        <PriceSlider maxPrice={maxPrice} />
        <FilterSlice categoriesToSelect={conditionsFilter} filterName={"condition"} />
      </div>
    </section>
  );
}
