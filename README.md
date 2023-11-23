# Copang
// TODO Badge
// Typescript NestJS PostgreSQL Prisma   


# Summary
* E-commerce 사이드 프로젝트 With Nest JS

## Demo
* TODO 호스팅 후 URL 추가 필요
* localhost:3000
* API docs With Swagger
    * localhost:5000/swagger

## System
// 시스템 그림 img


# DB ERD


# Structure
- NestJs 를 사용하여 Copang application들을 하나의 모노레포로 구성
- copang
    1. **store_api**
        - hexogonal Architecture를 참고하여 구성
    2. payment_api
        - 결제 시 PG 사를 연동하는 가상의 서버
    3. batch
        - product 크롤링
            - 쿠팡 사이트 데이터 크롤링 진행
            - 카테고리 별 물품 이미지, 이름, 가격 등을 추출해서 저장
    4. **front**
        - copang 프로젝트 front 결과물
        - React 라이브러리
        - atomic 패턴을 적용하여 개발을 진행

## Architecture

> ## Hexagonal 아키텍처란 ?
> - 비즈니스 규칙이 외부(database, framework, UI, 외부 System) 로부터 독립적으로 만들어 테스트를 용이하고 비즈니스 규칙이 외부의 영향을 받지 않도록 하는 아키텍처

- application, domain, infrastructure 로 레이어를 나누어 port 로 서로 레이어를 연결 시키는 구조의 아키텍처를 말합니다. 
  - 자세한 설명은 하단의 example 참고
- 목적
  - 요구사항에 의한 변경과 확장에 용이 해야 한다.
  - 각 구성요소는 느슨하게 결합되어야 하고 유지 보수성을 높아야 한다.
  - 테스트 하기 쉬워야 한다. 
- 목표
  - 외부로부터 독립적으로 만들어져야 한다.
  - 외부 코드나 로직의 주입을 막으며 분리 시킨다.
  - 비즈니스 로직에 유닛 테스트 코드를 작성한다.
- 한계점
  - NestJS 아키텍처도 외부 의존성 이므로 제거 해야 하는가 ?
    - 현재 단계에서는 불필요한 추상화, 불필요한 의존성 제거라고 생각하여 모든 레이어에서 NestJs에 대한 의존성을 제거하지 않고 진행했습니다.
  - 과한 추상화
    - 모든 레이어는 domain 에서만 의존성이 존재해야 하고, 서로 영향을 받지 않아야 한다.
    - interface 들이 중복되어 선언되어 있는 것들이 많다.
  - 코드가 많아진다.

### Layer example

- 폴더 구조 예시

    ```jsx
    |   +---review
    |   |   |   review.module.ts
    |   |   |
    |   |   +---api
    |   |   |       review.controller.ts
    |   |   |       review.req.dto.ts
    |   |   |       review.res.dto.ts
    |   |   |
    |   |   +---application
    |   |   |       review.service.spec.ts
    |   |   |       review.service.ts
    |   |   |
    |   |   +---domain
    |   |   |   |   reivew.repository.ts
    |   |   |   |   review.service.ts
    |   |   |   |   review.ts
    |   |   |   |
    |   |   |   \---port
    |   |   |           review.in.ts
    |   |   |           review.out.ts
    |   |   |
    |   |   \---infrastructure
    |   |           review.prisma.repository.ts
    ```

    - 예시로 review domain 을 위와 같이 표기
    - module은 모든 레이어를 알고(import) 있어야 하므로 상위 폴더에 두었다.

# Api
- infrastructure 에 존재 해야 하는 HTTP 에 의존하는 외부 레이어 이지만 HTTP 웹서버 특성상 input output, 데코레이터 등 중요하게 다뤄야 하는 것이 많아 폴더를 따로 구성
- controller, Request DTO, Response DTO 등을 작성 한다.
    - swagger 를 활용하기 위해 해당 dto 들은 전부 class 를 사용하는 컨벤션을 가진다.
    - 하나의 URL 에는 Request 혹은 Response 가 0개 혹은 1개의 class를 가진다.
        - Dto는 재사용 하지 않는다.

# Application

- 실제 비즈니스 레이어 구현체
    - service 를 주로 구현한다.
    - 유닛 테스트를 필수로 진행한다.
        - 외부 의존성 없이 테스트가 쉽게 가능하다.
        - DI 된 class는 mocking 하여 테스트를 진행한다.
- application은 infratsructure가 아닌 Domain Layer의 interface에 의존성을 갖고 있다.
    - 따라서 infratsructure를 알지 못하며, input output 만 알고 있다.

# Domain
- 주로 변경되지 않는다.
    - 코어한 로직, 변경될 경우 다른 레이어 에도 전부 영향이 있다.
- 모든 레이어가 해당 Domain 레이어의 의존성을 갖고 있다.
- interface를 주로 정의한다.
    - port
        - 외부에서 서버로 들어오는 Data 일 경우 in 에 정의
        - 서버에서 외부로 나가는 Data 일 경우 out 에 정의

# Infrastructure

- 외부와 연결되어있는 레이어이다.
- controller, repository 등의 실제 구현체이다.
    - 현재 ORM을 Prisma를 사용하고 있으므로 이름으로 표현하였다.
- 라이브러리도 변경될 수 있다는 것을 감안하여 분리하여 작성한다.
    - ex)
    - HTTP 통신, Database, ORM
