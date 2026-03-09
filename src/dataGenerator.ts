import { User, Color } from './types';

const firstNames = [
  'Катерина', 'Олексій', 'Марія', 'Володимир', 'Олена', 'Дмитро',
  'Світлана', 'Андрій', 'Наталія', 'Сергій', 'Тетяна', 'Іван',
  'Юлія', 'Микола', 'Ірина', 'Віктор', 'Анна', 'Михайло',
  'Людмила', 'Олександр', 'Галина', 'Петро', 'Віра', 'Василь',
  'Оксана', 'Євген', 'Лариса', 'Ігор', 'Валентина', 'Роман'
];

const lastNames = [
  'Петренко', 'Іванов', 'Коваль', 'Сидоренко', 'Шевченко', 'Бондаренко',
  'Лі', 'Мельник', 'Ковальчук', 'Бойко', 'Ткаченко', 'Козак',
  'Савченко', 'Гриценко', 'Павленко', 'Кравченко', 'Остапенко', 'Яковенко',
  'Федоренко', 'Гончаренко', 'Левченко', 'Давиденко', 'Василенко', 'Захарченко',
  'Михайленко', 'Романенко', 'Соколов', 'Полтавець', 'Литвиненко', 'Демченко'
];

let userPool: User[] = [];

function generateUser(): User {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const name = `${firstName} ${lastName}`;
  
  const time = Math.floor(60000 + Math.random() * 120000);
  const speed = Math.floor(70 + Math.random() * 30);

  return {
    color: Math.floor(Math.random() * 3) as Color,
    name,
    speed,
    time
  };
}

const TOTAL_USERS = 2000;

for (let i = 0; i < 100; i++) {
  userPool.push(generateUser(i));
}

userPool.sort((a, b) => a.time - b.time);

let isGenerating = false;
async function ensureUsersGenerated(requiredCount: number): Promise<void> {
  if (userPool.length >= requiredCount || isGenerating) return;
  
  isGenerating = true;
  
  while (userPool.length < requiredCount && userPool.length < TOTAL_USERS) {
    const chunkSize = Math.min(100, requiredCount - userPool.length);
    for (let i = 0; i < chunkSize; i++) {
      userPool.push(generateUser(userPool.length));
    }
    
    userPool.sort((a, b) => a.time - b.time);
    
    await new Promise(resolve => setTimeout(resolve, 0));
  }
  
  isGenerating = false;
}

export async function loadUsers(offset: number, limit: number): Promise<User[]> {
  await ensureUsersGenerated(offset + limit);
  await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 200));

  const end = Math.min(offset + limit, userPool.length);
  return userPool.slice(offset, end);
}

export function getTotalUsersCount(): number {
  return TOTAL_USERS;
}
