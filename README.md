# Nadoga - 나에게 도서관을 가깝게
## 사용자 맞춤형 도서를 추천 받고, 원하는 도서를 소장 중인 도서관을 쉽게 찾을 수 있는 서비스

## 목차
- [프로젝트 설명](#프로젝트-설명)  
- [기술 스택](#기술-스택)
- [ERD](#ERD)
- [구현 핵심 기능 1 : 사용자 위치 기반 도서 및 도서관 조회 기능 구현](#구현-핵심-기능-1-:-사용자-위치-기반-도서-및-도서관-조회-기능-구현)
- [구현 핵심 기능 2 : 무중단 배포 기능 구현](#구현-핵심-기능-2-:-무중단-배포-기능-구현)
- [구현 핵심 기능 3 : 도서 추천 알고리즘 개발](#구현-핵심-기능-3-:-도서-추천-알고리즘-개발)
- [각 기능의 시연 영상](#각-기능의-시연-영상)
- [추천 알고리즘 Github 링크](#추천-알고리즘-Github-링크)

## 프로젝트 설명

> 사용자의 도서 찜 목록 및 평가 목록을 바탕으로 도서를 추천받을 수 있습니다. 협업 필터링 및 콘텐츠 필터링 기법을 기반으로 추천 알고리즘이 작동합니다. 키워드를 바탕으로 원하는 도서를 검색할 수 있고, 검색한 도서를 소장하고 있는 도서관을 해당 위치에서 가장 가까운 순으로 보여줍니다.  

`Nest.JS` 를 사용하여 서버에 필요한 module, entity, dto, controller 그리고 service 파일들을 생성하고 관리함으로써, 백엔드 단에서 이루어지는 데이터 흐름을 이해할 수 있었고, 그 흐름을 `TypeORM` 기술을 통해 더욱 편리하게 구현할 수 있었습니다.

또한, 콘텐츠 필터링 및 협업 필터링 알고리즘을 바탕으로 도서 추천 기능을 구현해봄으로써 Python의 Pandas, Numpy 등의 모듈 활용 능력을 기를 수 있었고, Flask 프레임워크를 통해 파이썬 기반 추천 알고리즘의 결과를 서버로 전송할 수 있었습니다.


## 기술 스택

- `HTML, CSS, TypeScript, React Native`를 기반으로 프론트엔드 개발을 완성하였습니다. 또한, `Nest.JS`를 통해 백엔드 단을 구축하였고, `Python과 Flask를 활용`하여 완성된 추천 알고리즘의 결과를 서버로 전송하였습니다.  
- `AWS Lightsail` 을 활용하여 서버 인스턴스를 생성하고, `RDS를 통해 DB 환경을 구축`하였습니다. MySQL의 config 정보들을 서버 프로젝트 config 폴더내의 typeorm.config.ts 파일에 적어서 관리를 하였습니다. 이 config 파일을 바탕으로 TypeORM 모듈을 통해 필요한 dto를 생성하여 관계형 데이터 모델들을 만들고 관리할 수 있었습니다.

## ERD
![image](https://github.com/2023-KU-GraduationProject-Team3/Nadoga-Client/assets/49470452/00138c66-b672-4412-a465-8d8b45ceb2b0)

## 구현 핵심 기능 1 : 사용자 위치 기반 도서 및 도서관 조회 기능 구현  


https://github.com/2023-KU-GraduationProject-Team3/Nadoga-Client/assets/49470452/b1cd5c5b-ccd0-4636-9bf6-be23d1b44bc2  

*유저 주변 도서관 탐색 및 특정 도서 검색 후, 해당 도서 대출 가능한 도서관을 거리순으로 조회*  

https://github.com/2023-KU-GraduationProject-Team3/Nadoga-Client/assets/49470452/22c53e9f-f7bc-4f8f-a627-96e1460332ea  

*도서관 상세 정보 조회 화면 - 유저에게 적합한 인기 대출 도서 조회*

- `도서관 찾기` 메뉴 접속 시, 가장 먼저 유저의 위치를 기준으로 가까운 도서관 5곳을 보여줍니다.
-  원하는 도서를 검색한 후, 하나의 도서를 선택하여 클릭 시 도서 상세 정보 화면으로 이동하게 되고, 현 도서 대출 가능한 도서관 보기 버튼을 누를 시, 도서관 찾기 맵 화면으로 이동하여, `사용자를 기준으로 가장 가까운 도서관 5곳에서 대출이 가능한지에 대한 여부`를 보여줍니다.
- 사용자의 현 위치를 useContext API를 사용하여 전역 상태로 관리하였습니다. 이를 통해 도서 상세 정보 화면에서 바로 맵화면으로 넘어갈 때 올바른 위치 정보를 바탕으로 도서관 데이터를 불러와서, 그 도서관에서의 대출 가능 여부를 정확히 보여줄 수 있기 때문입니다.
- `도서관 상세 정보 화면`에서는 유저의 `나이 및 성별`에 맞는 `인기 대출 도서`를 조회할 수 있습니다. 도서 선택 시, 앞의 예시와 동일하게 해당 도서를 대출할 수 있는 도서관 5곳을 가까운 순으로 조회 가능합니다.
https://github.com/2023-KU-GraduationProject-Team3/Nadoga-Client/assets/49470452/d57b77ea-2beb-490a-908a-03d3e67a53ea

## 구현 핵심 기능 2 : 무중단 배포 기능 구현

- pm2 패키지를 활용하여 서버를 `무중단 배포 상태로 관리`하였습니다. SFTP 방식으로 로컬 환경에 있는 프로젝트 파일을 우분투 인스턴스 내에 복사하여 서버를 실행하고 있었습니다. 매번 우분투 터미널에서 서버를 실행시켜야 하는 번거로움이 존재하여서, 이를 해결하기 위해 pm2 패키지를 설치하였습니다.
- pm2를 이용하여 서버의 메인 js 파일을 실행시켰고, 이로 인해 서버 인스턴스를 일일이 시작시킬 필요 없이 프로젝트 파일을 편하게 수정할 수 있는 환경을 만들었습니다.

## 구현 핵심 기능 3 : 도서 추천 알고리즘 개발

https://github.com/2023-KU-GraduationProject-Team3/Nadoga-Client/assets/49470452/33e7d10a-077d-4c67-ba6c-7ff3528682d3  

*찜목록 기반 도서 추천*



https://github.com/2023-KU-GraduationProject-Team3/Nadoga-Client/assets/49470452/f4a5bbd7-cb3f-4df8-bd2b-1b8600b3228f  

*평가 목록 기반 도서 추천*


- `콘텐츠 필터링은 TF-IDF 벡터화 기술`을 통해 구현하였고, `협업 필터링은 SVD 벡터화`를 기반으로 완성하였습니다.
- 도서의 각 요소마다 적용되는 가중치를 달리 적용하여 더 의미 있는 데이터를 만들어보기로 하였습니다. 도서명, 작가, 출판사, 그리고 장르, 총 4가지의 정보가 있어서 `장르에 더 많은 가중치를 부여`하여 벡터화 과정을 한 번 더 거쳤습니다. 이에 따라, 사용자에게 더욱 적합한 추천 결과를 보여줄 수 있었습니다.

## 각 기능의 시연 영상

### 유저 회원 가입

https://github.com/2023-KU-GraduationProject-Team3/Nadoga-Client/assets/49470452/493fc092-f898-4451-abf5-c7c0c8699cb9


### 유저 정보 수정

https://github.com/2023-KU-GraduationProject-Team3/Nadoga-Client/assets/49470452/57c86965-7cf3-48d2-95ad-d7cb47bc509e

### 도서 평점 등록

https://github.com/2023-KU-GraduationProject-Team3/Nadoga-Client/assets/49470452/a1e53b54-da38-420c-a349-b4d255f982a5

### 도서 검색 기록 -> 나의 서재에 기록

https://github.com/2023-KU-GraduationProject-Team3/Nadoga-Client/assets/49470452/d57b77ea-2beb-490a-908a-03d3e67a53ea

### 나의 서재(찜, 평가, 검색 도서 목록)기반 통계 정보 조회

https://github.com/2023-KU-GraduationProject-Team3/Nadoga-Client/assets/49470452/46d40185-3b9b-4006-8e77-16dbc4f52e0d

## 추천 알고리즘 Github 링크
- https://github.com/2023-KU-GraduationProject-Team3/Recommendation-Server/tree/main/algorithm  
- collab_filtering.py 에는 `협업 필터링 알고리즘` 코드가 있고, content_filtering.py 에는 `콘텐츠 필터링 알고리즘`을 구현한 결과가 있습니다. 
