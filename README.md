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

- `HTML, CSS, TypeScript, React Native`를 기반으로 프론트엔드 개발을 완성하였습니다. 또한, `Ne각 기능의 시연 영상

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
