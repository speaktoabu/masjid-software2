### Pre-requsite:
- Mongo DB - [Download](https://www.mongodb.com/download-center/community)
  - The version used here is mongo db version v4.0.7
- Java JDK 8 or above 
  - Note : Remove the test -->  "masjid-software/spring-boot-jwts-master/src/test/java/com/example/" in order to get successful build.
- Angular 5

### Procedure to Build & Setup

```
# Clone project
git clone https://github.com/speaktoabu/masjid-software.git


# prepare Json-Server as fake Restful API
cd ng-md-app

# WINDOWS only. In terminal as administrator
npm install -g node-pre-gyp

# install the packages with npm
npm install

# Or use yarn (recommended)
yarn

# start the app
npm run demo
# or
yarn demo 

# development
npm run server:dev
# or
yarn server:dev

# serve with hot reload at localhost:3000
npm run server:dev:hmr
# or
yarn server:dev:hmr

# build for production 
npm run build:prod

# run as production
npm run server:prod

```


# Welcome to fork or clone!

For detailed explanation on how things work, checkout following links please.

* [angular](https://angular.io/)
* [angular-material](https://material.angular.io/)
* [ng-charts](https://github.com/valor-software/ng2-charts)

#### Alternatives

There are some similar projects respectively built on the Vue.js and React. If you have interests in those technical stacks. You can find and clone those repositories below.

* [Vue2Crm](https://github.com/harryho/vue2crm.git).
* [React-Crm](https://github.com/harryho/react-crm.git).
