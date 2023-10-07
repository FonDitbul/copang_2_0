import ReviewCardMole from "./ReviewCard.Mole";
import ReviewCreateInputMole from "./ReviewCreateInput.Mole";

export default function ReviewProductOrgan() {
  return (
    <div>
      <section className='border-2 p-2'>
        <ReviewCreateInputMole />
      </section>

      <section className='border-2'>
        <ReviewCardMole />
      </section>

    </div>
  );
}
