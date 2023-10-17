export interface Address {
  postalCode: string; // 우편 번호 ex) 13561
  address: string; // 전체 주소
  roadAddress: string; // 도로명 주소
  jibunAddress: string; // 지번 주소
  etc?: string; // 기타 주소
}
