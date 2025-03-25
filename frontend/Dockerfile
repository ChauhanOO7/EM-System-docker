FROM node

WORKDIR /frontend

COPY . .

ARG REACT_APP_backendurl
ENV REACT_APP_backendurl=$REACT_APP_backendurl

RUN npm install

RUN npm run build

RUN npm install -g serve

CMD ["serve","-s","build","-l","80" ]