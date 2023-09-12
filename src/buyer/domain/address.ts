export interface Address {
  postalCode: string; // 우편 번호 ex) 13561
  addressRegion: string; // 주소 중 가장 큰 지역명 ex) 경기
  addressLocality: string; // 하위 지역 ex) 성남시 분당구
  streetAddress: string; // 도로명 포함 상세 주소 ex) 정자일로 95
  etc?: string; // 기타 주소
}
