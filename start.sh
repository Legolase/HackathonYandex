#!/bin/bash

git pull origin dev
# Переходим в каталог frontend, устанавливаем зависимости и собираем проект
cd ./frontend && npm install && npm run build

# Переходим в каталог backend, устанавливаем зависимости, выполняем миграции, генерируем документацию и запускаем сервер
cd ../backend && npm install && npm run migrate && npm run documentation && npm start
