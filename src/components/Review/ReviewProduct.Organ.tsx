import ReviewCardMole from "./ReviewCard.Mole";
import ReviewCreateInputMole from "./ReviewCreateInput.Mole";
import { useEffect, useState } from "react";
import { Client, ResponseData } from "../../context/api";
import { Review } from "../../interface/Review";

interface PropsType {
  productId: number;
}

export type ServerReview = Omit<Review, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};
interface getReviewByServer {
  list: ServerReview[];
}

export default function ReviewProductOrgan({ productId }: PropsType) {
  const [reviewArray, setReviewArray] = useState([] as ServerReview[]);

  useEffect(() => {
    const getReviewAll = async () => {
      const response = await Client.get(`/review/${productId}`);
      const result = response.data as ResponseData<getReviewByServer>;

      setReviewArray(result.content.list);
    };
    getReviewAll();
  }, []);

  return (
    <div>
      <section className="border-2 p-2">
        <ReviewCreateInputMole />
      </section>

      <section className="border-2">
        {reviewArray.map((review) => (
          <ReviewCardMole key={review.id} {...review} />
        ))}
      </section>
    </div>
  );
}
