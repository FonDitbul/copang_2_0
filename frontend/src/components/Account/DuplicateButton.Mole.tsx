import Button from '../Common/Atom/Button';
import { AvailableState } from '../../pages/Account/SignUp/SignUp';

export interface DuplicateButtonProps {
  title: string;
  value: string;
  onClick: () => Promise<void>;
  availableState: AvailableState;
}

export default function DuplicateButton({ title, value, onClick, availableState }: DuplicateButtonProps) {
  return (
    <>
      <Button onClick={onClick}> 중복 확인 </Button>
      {availableState === 'INIT' && <span>{title}을(를) 입력해 주세요.</span>}
      {availableState === 'AVAILABLE' && <span>사용 가능한 {title} 입니다.</span>}
    </>
  );
}
