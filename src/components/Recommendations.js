"use client";

import classes from "./Recommendations.module.css";
import CarouselContainer from "./slider/CarouselContainer";
import useSWR from "swr";
import fetchFunction from "@/lib/fetch/fetchFunction";

export default function Recomendations({
  productId,
  header,
  marginStyle,
  suggestionsDep,
  searchParams,
}) {

  const dep = searchParams?.get("dep");
  const department = suggestionsDep ? suggestionsDep.join(".") : dep;

  let url = `/api/suggestions?`;

  if (department) {
    url += `dep=${department}`;
  }
  if (productId) {
    url += `&productId=${productId}`;
  }
  const { data, error } = useSWR(url, fetchFunction);

  if (error) throw error;

  return (
    <section className={classes.container} style={marginStyle}>
      <h3>{header}</h3>
      <CarouselContainer
        feed={true}
        showArrows={true}
        arrowIcon={true}
        emulateTouch={true}
        suggestionData={data}
      />
    </section>
  );
}
