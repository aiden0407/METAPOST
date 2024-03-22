# METAPOST

METAPOST는 NFT 소유자들을 위한 웹 커뮤니티 페이지입니다.

## METAPOST 프로덕트 문서

[포트폴리오 노션 페이지](https://aiden0407.notion.site/METAPOST-aadbec2d1fab45acaf11e0db0131d253)

## METAPOST 기능

1. 로그인/회원가입 (현재 백엔드 서버 다운으로 인한 테스트 해당 기능 테스트 불가)
2. MetaMask, WalletConnect를 통한 지갑 연동 (테스트 가능)
3. 포스트, 댓글, 프로필, 커뮤니티 CRUD (현재 백엔드 서버 다운으로 인한 테스트 해당 기능 테스트 불가)

## METAPOST 실행

#### `npm install --legacy-peer-deps`

dependencies 다운로드 // 패키지 중 wagmi, web3modal의 typescript 종속성 필요 버전이 달라서 --legacy-peer-deps를 사용해야 함

#### `npm run start`

프로덕션 서버 구동

#### `npm run build`

프로덕션 환경 빌드

#### `npm run deploy`

빌드된 파일을 gh-pages를 활용하여 배포
