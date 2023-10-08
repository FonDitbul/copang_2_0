import StarAtom from "../Common/Atom/Star";

interface Props {
  currentRating: number;
}
export default function ReviewRatingMole({ currentRating }: Props) {
  const maxRating = 5;

  const starArray: boolean[] = [];

  for (let i = 0; i < maxRating; i++) {
    const isFull = currentRating > i;
    starArray.push(isFull);
  }

  return (
    <div className="flex items-center mb-1">
      {starArray.map((star) => (
        <StarAtom key={1} isFull={star} />
      ))}
    </div>
  );
}
