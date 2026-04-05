# Bank

## Мок-сервер

Для локальной разработки можно использовать мок-сервер.
Запуск локального мок-сервера `cd srv && node server.js`

На данный момент там заведен один пользователь с емэйлом `user@mail.ru` и паролем `123`; данные хранятся в файле `srv/data/users.json`

## Разработка

`set VITE_BASE_URL=<server-url> && npm run dev`

Например, при использовании локального мок-сервера:

`set VITE_BASE_URL=http://localhost:8090 && npm run dev`

## Сборка для прода

`set VITE_BASE_URL=<server-url> && npm run build`

Результат появится в папке dist