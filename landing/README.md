# Goulash.tech — продуктовая страница

Редизайн страницы продукта по текстам [goulash.tech](https://goulash.tech) и [goulash.cyber-nevod.ru](https://goulash.cyber-nevod.ru/). Приложение лежит в `landing/` и не затрагивает Figma-плагины в корне репозитория.

Стек: Next.js 16, React 19, Tailwind CSS 4, TypeScript. Шрифт Onest, акцент `#00FFFF`. Логотипы — PNG из брендбука в `public/brand/`.

## Запуск

```bash
cd landing
npm install
npm run dev
npm run build
npm run lint
```

## Состав

| Путь | Что это |
|---|---|
| `app/page.tsx` | страница: УТП, отзывы, география, тарифы, вопросы, заявка |
| `components/product-screens.tsx` | три экрана продукта: ресторан, курьер, клиент |
| `components/lead-form.tsx` | заявка: проверка полей, загрузка, успех, ошибка сети |
| `app/api/lead/route.ts` | приём заявки |
| `public/brand/` | знак, горизонтальный и двухстрочный логотип |

Продакшен: https://goulash-shift.vercel.app
