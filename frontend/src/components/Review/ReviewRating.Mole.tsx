import StarAtom from '../Common/Atom/Star';

interface Props {
  currentRating: number;
}
export default function ReviewRatingMole({ currentRating }: Props) {
  const starIndexArray = [1, 2, 3, 4, 5].map((num) => {
    const isFull = currentRating >= num;
    return {
      index: num,
      isFull: isFull,
    };
  });

  return (
    <div className="flex items-center mb-1">
      {starIndexArray.map((star) => (
        <StarAtom key={star.index} isFull={star.isFull} />
      ))}
    </div>
  );
}
