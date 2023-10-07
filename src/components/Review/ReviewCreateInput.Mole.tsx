import Input from "../Common/Atom/Input";
import StarAtom from "../Common/Atom/Star";
import Button from "../Common/Atom/Button";

export default function ReviewCreateInputMole() {

  return (
    <div>
      <h1> 리뷰 </h1>
      <StarAtom isFull={true} />
      <Input />
      <Button> 작성하기 </Button>
    </div>
  );
}
