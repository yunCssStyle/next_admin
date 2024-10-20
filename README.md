# 마인워즈 어드민
마인워즈 어드민 프로젝트입니다.

### 프로젝트 install
```bash
npm install
# or
npm i
```

### 개발용 Prisma 셋팅
현재는 프리즈마를 따로 셋팅할 필요가 없으며, 개발 DB나 운영 DB(포트포워딩시)에 접속되도록 되어있습니다.
* Prisma Migrate에 관련된 내용은 따로 정리하지 않음. 
* https://www.prisma.io/docs/concepts/components/prisma-migrate
```bash
# 인스톨
npm i prisma -D

# prisma init
npx prisma init --datasource-provider mysql

# prisma studio - 바로 웹상에서 데이터를 수동으로 조작할 수 있는 툴
# .env 파일에 DB 정보를 변경해주면 포트포워딩으로 접속시에도 사용 가능
# 운영 접속시 사용하지 않는 것을 권장
npx prisma studio
```

### 프로젝트 실행
로컬환경 Run시 .env.development.local 파일을 참조합니다.  
운영에 접속해야 할 경우 .env.development.local 파일의 내용중 개발DB주소와 운영DB주소를 변경 후 포트포워딩을 하고 실행해주면 됩니다. 
```bash
# 개발용 실행
npm run dev
```

### 프로젝트 배포
github action을 통해 배포가 이루어집니다.  
현재는 QA, 운영 환경이 동일한 소스로 구성되어있습니다. (QA가 별도로 구성되어있지 않음.)
* 개발 - .github/workflows/dev-minewarz-admin-workflow.yml
* QA - .github/workflows/qa-minewarz-admin-workflow.yml
* 운영 - .github/workflows/prod-minewarz-admin-workflow.yml
