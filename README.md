# 비즈니스캔버스 프론트엔드 개발자 채용 과제

> 회원 목록을 관리할 수 있는 테이블

## 목차

#### 1. [구현 사항](#구현-사항)

#### 2. [기술 스택](#기술-스택)

#### 3. [시작하기](#시작하기)

#### 4. [파일 구조](#파일-구조)

## 구현 사항

### 필수 요구 사항

🔗 링크: https://businesscanvas.notion.site/1158a6dbf83980488d96cbfcd9bc3426

### 추가 구현 사항

1. 테이블의 레코드 개수가 10개를 넘어가면 페이지네이션이 됩니다.
2. 가입일 선택 시 오늘 이후의 날짜는 비활성화해두었습니다.
3. 모달의 제목을 경우에 따라 변경해주었습니다. (추가라면 '회원 추가', 수정이라면 '회원 수정')

### 코드 작성 의도

#### 1. 추상화

- `InputFactory` 필드 타입에 따라 입력 컴포넌트(Input, DatePicker, Select 등)를 생성해, 다양한 입력 유형을 하나의 통합된 인터페이스로 관리할 수 있도록 했습니다.
- `utils/storage` 저장소 로직을 추상화하여 사용하는 스토리지와 상관 없이 동일한 인터페이스로 접근할 수 있습니다.

#### 2. 확장성과 재사용성

- `components/ui` UI 컴포넌트는 Ant Design과 Styled Components를 조합하여 설계했으며, antd 컴포넌트와 동일한 방식으로 import할 수 있도록 구성했습니다. 필요한 컴포넌트를 에디터에 입력해서 추천 import에 components/ui가 없다면 antd의 기본 컴포넌트를 사용하면 됩니다.
- `Table` 관련 유틸리티 함수는 별도로 추출하여 다른 테이블에서도 쉽게 재사용할 수 있습니다.

#### 3. 가독성

- 파일 구조를 기능별(`features`)로 나누고, 공통 컴포넌트는 한 곳에(`src/components`) 모아두었습니다.

## 기술 스택

- 코어: React, TypeScript
- 스타일링: Styled Components, Ant Design
- 패키지 매니저: PNPM
- 빌드 도구: Vite

## 시작하기

```zsh
pnpm install
pnpm run dev               # NOTE: default STORAGE는 in-memory입니다.
pnpm run dev:in-memory     # NOTE: STORAGE가 in-memory로 설정됩니다.
pnpm run dev:local-storage # NOTE: STORAGE가 local-storage로 설정됩니다.
```

## 파일 구조

```
src/
├── assets/                                     # 폰트, 이미지 등의 애셋 모음
│   └── PretendardVariable.woff2
├── components/                                 # 공통 컴포넌트 모음
│   ├── ui/                                     # UI 관련 공통 컴포넌트
│   │   ├── Table/                              # 테이블 UI 및 관련 유틸리티
│   │   │   ├── utils/
│   │   │   │   ├── createActionColumn.tsx
│   │   │   │   └── createColumnFilters.tsx
│   │   │   └── index.tsx
│   │   ├── Checkbox.tsx
│   │   ├── DatePicker.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Select.tsx
│   └── InputFactory.tsx
├── features/                                   # 도메인별 기능 모음
│   └── MemberList/
│       ├── components/
│       │   ├── MemberFormModal.tsx
│       │   └── MemberTable.tsx
│       ├── data/
│       │   └── memberData.ts
│       └── services/
│           └── memberStorage.ts
├── models/                                     # 데이터 모델 정리
│   ├── field.interface.ts
│   └── member.interface.ts
├── providers/                                  # 글로벌 프로바이더
│   ├── AntdConfigProvider.tsx
│   └── StyledThemeProvider.tsx
├── theme/                                      # 테마
│   └── customTheme.ts
├── utils/                                      # 공통 유틸리티 함수
│   └── storage/
│       ├── index.ts
│       ├── inMememoryStorage.ts
│       └── localStorage.ts
├── views/                                      # 페이지 단위 컴포넌트
│   └── MemberList.tsx
├── App.tsx
├── index.css
├── main.tsx
└── vite-env.d.ts
```
