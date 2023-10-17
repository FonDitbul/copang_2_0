import StarAtom from "../Common/Atom/Star";
import { useEffect, useState } from "react";

interface Props {
  currentRating: number;
  setFunction: any;
}

export default function ReviewRatingCreateMole({ currentRating, setFunction }: Props) {
  const [rating, setRating] = useState(currentRating);
  const [starIndexArray, setStarIndexArray] = useState(
    [1, 2, 3, 4, 5].map((num) => {
      return {
        index: num,
        isFull: false,
      };
    }),
  );

  useEffect(() => {
    const starTemp = [1, 2, 3, 4, 5].map((num) => {
      const isFull = rating >= num;
      return {
        index: num,
        isFull: isFull,
      };
    });
    setStarIndexArray(starTemp);
  }, [rating]);

  return (
    <div className="flex items-center mb-1">
      {starIndexArray.map((star) => (
        <StarAtom
          key={star.index}
          id={"" + star.index}
          isFull={star.isFull}
          onClick={(e: any) => {
            setRating(star.index);
            setFunction(star.index);
          }}
        />
      ))}
    </div>
  );
}
