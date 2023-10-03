const seller1: any = {
  userId: 'SOMSONG',
  password: 'SOMSONG_PASSWORD',

  ceoName: '이모씨',
  companyName: '솜송',
  address: '경기도 화성시 삼성역',
  Products: {
    createMany: {
      data: [
        {
          name: '갤럭시 북',
          code: 'SOMSONG-1',
          description: '노트북',
          information: '가볍고 좋은노트북',
          quantity: 20000,
          cost: 1_150_000,
        },
        {
          name: '갤럭시 워치',
          code: 'SOMSONG-2',
          description: '시계',
          information: '스마트 워치',
          quantity: 300000,
          cost: 150_000,
        },
        {
          name: '갤럭시S2000',
          code: 'SOMSONG-3',
          description: '핸드폰',
          information: '스마트폰',
          quantity: 20000,
          cost: 1_150_000,
        },
        {
          name: '갤럭시 폴드',
          code: 'SOMSONG-4',
          description: '스마트폰',
          information: '접는핸드폰',
          quantity: 20000,
          cost: 1_150_000,
        },
        {
          name: '갤럭시 버즈',
          code: 'SOMSONG-5',
          description: '무선이어폰',
          information: '블루투스 이어폰',
          quantity: 20000,
          cost: 1_500_000,
        },
      ],
    },
  },
};

const seller2: any = {
  userId: 'APPLE',
  password: 'APPLE_PASSWORD',

  ceoName: '스모씨',
  companyName: '아플',
  address: '경기도 분당시 실리콘밸리역',
  Products: {
    createMany: {
      data: [
        {
          name: '맥북',
          code: 'APPLE-1',
          description: '노트북',
          information: '가볍고 좋은노트북',
          quantity: 20000,
          cost: 1_150_000,
        },
        {
          name: '애플 워치',
          code: 'APPLE-2',
          description: '시계',
          information: '스마트 워치',
          quantity: 300000,
          cost: 850_000,
        },
        {
          name: '에어팟',
          code: 'APPLE-3',
          description: '무선이어폰',
          information: '무선이어폰',
          quantity: 20000,
          cost: 300_000,
        },
        {
          name: '애플 폴드',
          code: 'APPLE-4',
          description: '스마트폰',
          information: '접는핸드폰',
          quantity: 20000,
          cost: 1_150_000,
        },
        {
          name: '아이폰',
          code: 'SOMSONG-5',
          description: '스마트폰',
          information: '스마트폰',
          quantity: 20000,
          cost: 1_500_000,
        },
      ],
    },
  },
};

const seller3: any = {
  userId: 'VEGA',
  password: 'VEGA',

  ceoName: '이모씨',
  companyName: '베가',
  address: '경기도 화성시 엘지역',
  Products: {
    createMany: {
      data: [
        {
          name: '베가북',
          code: 'VEGA-1',
          description: '노트북',
          information: '가볍고 좋은노트북',
          quantity: 20000,
          cost: 1_150_000,
        },
        {
          name: '베가 워치',
          code: 'VEGA-2',
          description: '시계',
          information: '스마트 워치',
          quantity: 300000,
          cost: 850_000,
        },
        {
          name: '베가팟',
          code: 'VEGA-3',
          description: '무선이어폰',
          information: '무선이어폰',
          quantity: 20000,
          cost: 300_000,
        },
        {
          name: '베가 폴드',
          code: 'VEGA-4',
          description: '스마트폰',
          information: '접는핸드폰',
          quantity: 20000,
          cost: 1_150_000,
        },
        {
          name: '베가폰',
          code: 'VEGA-5',
          description: '스마트폰',
          information: '스마트폰',
          quantity: 20000,
          cost: 1_500_000,
        },
      ],
    },
  },
};

const seller4: any = {
  userId: 'SONY',
  password: 'SONY_PASSWORD',

  ceoName: '나모씨',
  companyName: '손이',
  address: '경기도 화성시 쏘니역',
  Products: {
    createMany: {
      data: [
        {
          name: '쏘니북',
          code: 'SONY-1',
          description: '노트북',
          information: '가볍고 좋은노트북',
          quantity: 20000,
          cost: 1_150_000,
        },
        {
          name: '쏘니 워치',
          code: 'SONY-2',
          description: '시계',
          information: '스마트 워치',
          quantity: 300000,
          cost: 850_000,
        },
        {
          name: '쏘니팟',
          code: 'SONY-3',
          description: '무선이어폰',
          information: '무선이어폰',
          quantity: 20000,
          cost: 300_000,
        },
        {
          name: '쏘니 폴드',
          code: 'SONY-4',
          description: '스마트폰',
          information: '접는핸드폰',
          quantity: 20000,
          cost: 1_150_000,
        },
        {
          name: '쏘니폰',
          code: 'SONY-5',
          description: '스마트폰',
          information: '스마트폰',
          quantity: 20000,
          cost: 1_500_000,
        },
      ],
    },
  },
};

export const createSeller = [seller1, seller2, seller3, seller4];
