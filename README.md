WEEBUR
📋 프로젝트 개요
사용자가 상품 목록을 검색하고, 필터링하며, 무한 스크롤을 통해 더 많은 상품을 로드할 수 있는 페이지입니다.
상품은 리스트형 또는 그리드형으로 표시되며, DummyJSON API를 활용해 데이터를 가져옵니다.
사용자는 검색어와 정렬 조건을 적용할 수 있으며, 검색 결과가 없을 경우 적절한 메시지를 확인할 수 있습니다.

🎯 주요 기능

상품 목록 표시:

페이지 진입 시 기본 20개의 상품 표시.
각 상품은 title, description, thumbnail, rating, reviews 포함.
description과 리뷰는 한 줄 초과 시 "..."으로 잘림 처리.
상품 카드는 여백이 넉넉한 디자인으로 구현.

뷰 방식:

리스트형(List): 한 줄에 1개 아이템.
그리드형(Grid): 한 줄에 4개 아이템.
최초 진입 시 50% 확률로 랜덤 결정, 24시간 유지 (handleViewType.ts 사용).
ViewList.tsx에서 뷰 방식에 따라 스타일링.

데이터 가져오기:

DummyJSON Products API 활용.
productService.ts에서 API 호출 로직 구현.
useProducts.ts 훅스를 통해 데이터 페칭.

무한스크롤을 이용한 페이지네이션:

Limit과 Skip 활용.
초기 로드: 20개 상품.
무한 스크롤로 페이지 하단 도달 시 다음 20개 로드.
페이지 하단 도달 시 다음 20개 상품 자동 로드.
필터링된 결과에도 적용.
마지막 데이터 로드 시 "더 이상 불러올 수 없습니다." 메시지 표시 (ProductListPage.tsx).

검색 필터:

Search API로 문자열 검색.
Sort API로 별점(rating) 기준 내림차순 정렬.
Filter.tsx에서 form을 사용해 검색 버튼 구현.
URL 파라미터를 통해 필터 값 유지 (페이지 새로고침 후에도 유지).
NotFound.tsx로 검색 결과 없을 시 "일치하는 결과가 없습니다." 표시.


🛠️ 기술 스택

프론트엔드: Next.js, React, TypeScript
스타일링: Tailwind CSS
데이터 페칭: Fetch API, Tanstack Query
빌드 도구: Next.js

📦 디렉토리 구조
src/
├── app/ # Next.js 앱 라우팅
│ ├── favicon.ico # 파비콘
│ ├── globals.css # 전역 스타일
│ ├── layout.tsx # 레이아웃 컴포넌트
│ └── page.tsx # 메인 페이지
├── components/ # 재사용 가능한 컴포넌트
│ ├── product/ # 상품 관련 컴포넌트
│ │ ├── Filter.tsx # 필터 컴포넌트
│ │ ├── index.ts # 컴포넌트 내보내기
│ │ ├── ViewCard.tsx # 상품 카드
│ │ └── ViewList.tsx # 상품 리스트/그리드 뷰
│ └── shared/ # 공통 컴포넌트
│ ├── Error.tsx # 에러 메시지
│ ├── index.ts # 컴포넌트 내보내기
│ ├── Loading.tsx # 로딩 UI
│ └── NotFound.tsx # 검색 결과 없음 UI
├── container/ # 페이지 컨테이너
│ └── ProductListPage.tsx # 상품 리스트 페이지
├── hooks/ # 커스텀 훅스
│ ├── productKeys.ts # Tanstack Query 키 관리
│ └── useProducts.ts # 상품 데이터 페칭 훅스
├── lib/ # 외부 라이브러리 설정
│ └── queryClient.tsx # Tanstack Query 클라이언트 설정
├── services/ # API 호출 서비스
│ └── productService.ts # 상품 관련 API 호출
├── types/ # 타입스크립트 타입 정의
│ └── productType.ts # 상품 관련 타입
└── utils/ # 유틸리티 함수
├── formatDate.ts # 날짜 포맷팅 유틸
├── handleViewType.ts # 뷰 타입 관리 유틸
└── index.ts # 유틸 내보내기

📝 작업 내용 설명

뷰 방식 구현:

handleViewType.ts에서 로컬 스토리지를 활용해 뷰 타입 저장.
페이지 최초 진입 시 50% 확률로 grid 또는 list 결정, 24시간 유지.
ViewList.tsx에서 뷰 타입에 따라 스타일링 조정 (Grid: 한 줄에 4개, List: 한 줄에 1개).

데이터 페칭:

productService.ts에서 DummyJSON API 호출 로직 작성.
useProducts.ts 훅스를 통해 무한 스크롤 지원 (useInfiniteQuery 활용).
검색 및 정렬 필터 적용 (q, sortBy, order).

검색 필터:

Filter.tsx에서 form을 통해 검색어 입력, 정렬 선택, 페이지당 항목 수 선택.
URL 파라미터로 필터 상태 관리, 새로고침 후에도 유지.
NotFound.tsx로 검색 결과 없음 UI 구현.

무한 스크롤:

ProductListPage.tsx에서 스크롤 이벤트 감지, 하단 도달 시 fetchNextPage 호출.
마지막 데이터까지 로드 시 "더 이상 불러올 수 없습니다." 메시지 표시.
필터링된 결과에도 무한 스크롤 적용.

UI 개선:

ViewCard.tsx에서 description과 리뷰가 한 줄 초과 시 잘림 처리 (truncate).
여백을 넉넉히 조정 (p-6, space-y-3 등).
로딩, 에러, 검색 결과 없음 UI를 화면 가운데에 보기 좋게 표시 (Loading.tsx, Error.tsx, NotFound.tsx).

🚀 실행 방법

저장소 클론:
git clone https://github.com/Dragonite-Lee/weebur-assignment

의존성 설치:
npm install

개발 서버 실행:
npm run dev

브라우저에서 http://localhost:3000 접속.