## 📋 작업 배경

계산기의 사용자 인터페이스를 구현합니다. 디자인 파일(`docs/design/screen.png`)을 기반으로 HTML 구조를 만들고, 시맨틱 마크업과 접근성을 고려합니다.

## 🎯 작업 내용

### 1. HTML 구조 작성

**파일**: `src/index.html`

- [ ] 기본 HTML5 구조 생성
- [ ] Header 섹션
  - [ ] 히스토리 버튼
  - [ ] DEG/RAD 토글
  - [ ] 설정 버튼
- [ ] Display 섹션
  - [ ] 수식 표시 영역
  - [ ] 결과 표시 영역
- [ ] Keypad 섹션
  - [ ] 과학 함수 버튼 (sin, cos, tan, ln, log 등)
  - [ ] 숫자 버튼 (0-9)
  - [ ] 연산자 버튼 (+, -, ×, ÷)
  - [ ] 특수 버튼 (AC, =, ., ( ), 2nd 등)
- [ ] 접근성 속성 추가
  - [ ] ARIA labels
  - [ ] role 속성
  - [ ] tabindex 설정

### 2. 메타 태그 및 SEO

- [ ] 메타 태그 추가
  - [ ] charset, viewport
  - [ ] description, keywords
  - [ ] author
- [ ] Open Graph 태그
  - [ ] og:title, og:description
  - [ ] og:image
- [ ] Favicon 추가
  - [ ] favicon.ico 생성
  - [ ] apple-touch-icon

### 3. 외부 리소스 연결

- [ ] Google Fonts 연결 (Space Grotesk)
- [ ] Material Symbols 아이콘
- [ ] CSS 파일 연결
- [ ] JavaScript 모듈 연결

## ✅ 인수 조건 (Acceptance Criteria)

### 기능 요구사항
- [ ] 모든 버튼이 HTML에 정의됨
- [ ] 디스플레이 영역이 명확히 구분됨
- [ ] 디자인 파일과 레이아웃이 일치
- [ ] 모바일/데스크톱 모두 고려된 구조

### 접근성 요구사항
- [ ] 모든 버튼에 적절한 ARIA label
- [ ] 키보드로 모든 요소 접근 가능
- [ ] 스크린 리더 호환
- [ ] 시맨틱 HTML 사용

### SEO 요구사항
- [ ] 모든 메타 태그 존재
- [ ] Open Graph 태그 완성
- [ ] Favicon 표시됨

## 📊 예상 시간

**2시간**

## 🔗 관련 문서

- [ROADMAP.md - Task 3.1.1](../docs/ROADMAP.md)
- [Tech Spec](../docs/TECH_SPEC.md)
- [Design Files](../docs/design/)

## 🏷️ Labels

`enhancement` `ui` `html` `phase-3`

## 📌 Milestone

Phase 3: UI 구현
