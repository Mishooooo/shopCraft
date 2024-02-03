import Home from "@/components/Home/Home";

export const dynamic = "force-static";

export default function page({ suggestionData, reccomendationData }) {
  return (
    <Home suggestionData={suggestionData} reccomendationData={reccomendationData} />
  );
}

