import React, { useRef } from 'react';
import CloseButton from './CloseButton';

interface PropsType {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export const Modal = ({ onClose, children }: PropsType) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeModal = () => {
    onClose(false);
  };

  // 이벤트 핸들러 함수
  const modalOutEvent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modalRef.current === e.target) {
      closeModal();
    }
  };

  return (
    <div
      ref={modalRef}
      className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      onClick={modalOutEvent}
    >
      <div className="relative w-full max-w-2xl max-h-full">
        {/*<!-- Modal content -->*/}
        <div className="relative bg-white rounded-lg dark:bg-gray-700">
          {/*<!-- Modal header -->*/}
          <div className="flex items-start justify-between border-b rounded-t dark:border-gray-600">
            <CloseButton onClick={closeModal}></CloseButton>
          </div>
          {/*<!-- Modal body content -->*/}
          <div className="items-center justify-center p-6 space-y-6">{children}</div>
          {/*<!-- Modal footer -->*/}
          {/*<div className="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">*/}
          {/*  <Button*/}
          {/*    data-modal-hide="defaultModal"*/}
          {/*    type="button"*/}
          {/*    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"*/}
          {/*  >*/}
          {/*    확인*/}
          {/*  </Button>*/}
          {/*  <Button*/}
          {/*    data-modal-hide="defaultModal"*/}
          {/*    type="button"*/}
          {/*    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"*/}
          {/*    onClick={closeModal}*/}
          {/*  >*/}
          {/*    닫기*/}
          {/*  </Button>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};
