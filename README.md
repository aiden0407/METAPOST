# METAPOST

METAPOST는 NFT 소유자들을 위한 웹 커뮤니티 페이지입니다.

## 관련 링크

[METAPOST](https://aiden0407.github.io/METAPOST/) (기존 서버를 내려서 백엔드 api 사용 불가)

[포트폴리오 노션 페이지](https://aiden0407.notion.site/METAPOST-aadbec2d1fab45acaf11e0db0131d253)

## 기능

1. 로그인/회원가입 (기존 서버를 내려서 해당 기능 테스트 불가)
2. MetaMask, WalletConnect를 통한 지갑 연동 (테스트 가능)
3. 포스트, 댓글, 프로필, 커뮤니티 CRUD (기존 서버를 내려서 해당 기능 테스트 불가)

## 스크립트

#### `npm install --legacy-peer-deps`

dependencies 다운로드 // 패키지 중 [wagmi](https://wagmi.sh/), [web3modal](https://web3modal.com/)의 typescript 종속성 필요 버전이 달라서 --legacy-peer-deps 옵션을 통한 설치가 필요

#### `npm run start`

프로덕션 서버 구동

#### `npm run build`

프로덕션 환경 빌드

#### `npm run deploy`

gh-pages를 통한 빌드된 파일 배포
