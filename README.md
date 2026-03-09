# Leaderboard UI - Рейтингова таблиця

Веб-додаток для відображення рейтингової таблиці гравців у мобільній міні-грі "Гоночки".

## 🎯 Особливості

- ✅ **React з TypeScript** - функціональні компоненти та хуки
- ✅ **Infinite Scroll** - lazy-load підвантаження по 50 елементів
- ✅ **Адаптивний дизайн** - підтримка екранів 320px - 1920px
- ✅ **Висока продуктивність** - плавна робота з 1000+ користувачів
- ✅ **Smooth анімації** - плавне вирівнювання аватарок при підвантаженні
- ✅ **Виділення рядків** - клік для виділення фіолетовим кольором
- ✅ **Імітація API** - генерація даних на клієнті з затримкою мережі

## 🚀 Швидкий старт

### Встановлення залежностей

```bash
npm install
```

### Запуск у режимі розробки

```bash
npm start
```

Відкрийте [http://localhost:3000](http://localhost:3000) у браузері.

### Збірка для продакшну

```bash
npm run build
```

Створить оптимізовану збірку в папці `build/`.

## 📦 Розгортання

### Vercel (Рекомендовано)

1. Встановіть Vercel CLI:
```bash
npm install -g vercel
```

2. Виконайте деплой:
```bash
vercel
```

3. Для продакшн деплою:
```bash
vercel --prod
```

**АБО** використайте веб-інтерфейс:
1. Зайдіть на [vercel.com](https://vercel.com)
2. Підключіть ваш GitHub репозиторій
3. Vercel автоматично визначить налаштування та задеплоїть

### Netlify

1. Встановіть Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Виконайте білд:
```bash
npm run build
```

3. Деплой:
```bash
netlify deploy --prod --dir=build
```

**АБО** використайте веб-інтерфейс:
1. Зайдіть на [netlify.com](https://netlify.com)
2. Перетягніть папку `build` в Netlify Drop
3. Готово!

### GitHub Pages

1. Встановіть `gh-pages`:
```bash
npm install --save-dev gh-pages
```

2. Додайте в `package.json`:
```json
{
  "homepage": "https://your-username.github.io/your-repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. Виконайте деплой:
```bash
npm run deploy
```

## 🏗️ Структура проекту

```
src/
├── components/
│   ├── Avatar.tsx          # Компонент аватарки
│   ├── Avatar.css
│   ├── Leaderboard.tsx     # Головний компонент таблиці
│   ├── Leaderboard.css
│   ├── LeaderboardRow.tsx  # Компонент рядка таблиці
│   └── LeaderboardRow.css
├── types.ts                # TypeScript інтерфейси (Color, User)
├── dataGenerator.ts        # Генератор даних користувачів
├── App.tsx
├── App.css
└── index.tsx
```

## 🔧 Технічні деталі

### Типи даних

```typescript
enum Color {
  RED,
  GREEN,
  BLUE
}

interface User {
  color: Color;
  name: string;
  speed: number;
  time: number; // мілісекунди
}
```

### Ключові технології

- **React 19** з функціональними компонентами
- **TypeScript** для типобезпеки
- **Intersection Observer API** для infinite scroll
- **CSS Transitions** для smooth анімацій
- **React Hooks** (useState, useEffect, useCallback, useMemo, useRef)

### Оптимізації продуктивності

- ⚡ Віртуалізація через lazy-load (завантаження по запиту)
- ⚡ Мемоізація колбеків через `useCallback`
- ⚡ Оптимізація обчислень через `useMemo`
- ⚡ Intersection Observer з `threshold` та `rootMargin`

## 📱 Адаптивність

- **320px - 480px**: мобільні пристрої
- **481px - 768px**: планшети
- **769px - 1920px**: десктоп

## ✨ Функціонал

### Ініціалізація
При першому завантаженні відображаються перші 50 користувачів з імітацією затримки мережі (300-800ms).

### Infinite Scroll
Автоматичне підвантаження наступних 50 користувачів при наближенні до кінця списку.

### Виділення рядків
Клік по рядку виділяє його фіолетовим кольором. Повторний клік знімає виділення.

### Вирівнювання аватарок
При збільшенні розрядності номерів (1→10, 99→100, тощо) всі аватарки плавно зміщуються для утворення єдиної вертикальної лінії (CSS transition на width).

## 📄 Ліцензія

MIT
