import Input from '../Common/Atom/Input';
import Button from '../Common/Atom/Button';
import { useState } from 'react';
import { Client } from '../../context/api';
import ReviewRatingCreateMole from './ReviewRatingCreate.Mole';
import { Modal } from '../Common/Atom/Modal';

interface Props {
  orderProductId: number;
  onClose: Function;
}

export default function ReviewCreateInputModalMole({ orderProductId, onClose }: Props) {
  const [star, setStar] = useState(1);
  const [content, setContent] = useState('');

  const clickHandler = async () => {
    if (!content) {
      alert('리뷰 내용을 입력해 주세요.');
      return;
    }

    await Client.post('/review/buyer', {
      star,
      content,
      orderProductId,
    });

    alert('리뷰 작성이 완료 되었습니다.');
    location.reload();
    return;
  };

  return (
    <Modal onClose={onClose}>
      <div>
        <h1> 리뷰 </h1>
        <ReviewRatingCreateMole currentRating={star} setFunction={setStar} />

        <Input
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />

        <Button onClick={clickHandler}> 작성하기 </Button>
      </div>
    </Modal>
  );
}
