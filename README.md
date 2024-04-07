![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
[![Netlify Status](https://api.netlify.com/api/v1/badges/bd2b1b59-8d1f-4dd6-8e15-82246fdd28da/deploy-status)](https://app.netlify.com/sites/poetic-dasik-afa0e5/deploys)
## Мессенджер inLogin
https://deploy--poetic-dasik-afa0e5.netlify.app/

### При использовании Docker

- `docker-compose build` — установка стабильной версии,
- `docker-compose up -d` — смонтировать контейнер,
- `docker-compose down --remove-orphans` — размонтировать контейнер
- `docker-compose exec node bash` — войти в bash контейнера node для запуска команд
- `npm run build` — сборка стабильной версии

### Без использования

- `npm install` — установка стабильной версии,
- `npm run dev` — запуск версии для разработчика,
- `npm run build` — сборка стабильной версии

### Страницы
- `/chats` - страница с активным диалогом
- `/many-chats`  - страница с большим количеством диалогов
- `/registration` - регистрация
- `/login` - вход
- `/nav` - разводящая
- `/profile` - профиль
- `/setting` - редактирование данных
- `/loadimage` - модалка загрузки аватара