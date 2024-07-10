const DESCRIPTION = [
  'Неужели мы сюда выбрались?',
  'Лепестки этой черешни повергают в шок!',
  'Семья - главное в жизни',
  'Работа не волк, работа - ворк',
  'Ошибся один раз - не ошибайся второй.',
  'А по темным улицам гуляет дождь...',
  'Вы когда-нибудь видели настолько красивые пейзажи?',
  'Этот вид сводит меня с ума',
  'Не смотрите под ноги - закружится голова',
  'Как давно Вы бывали в Париже?',
  'Цель. Цель. Цель.',
  'Мечта - то, что движет человеком',
  'Ночь. Улица. Фонарь. Аптека.',
  'Советую каждому ознакомиться с творчеством Блока.',
  'Эффект и эффективность - разные вещи.',
  'Пятница-это мое любимое слово',
  'Плачут небеса',
  'Вчера был выпускной. Ну не здорово ли это?',
  'Что может быть лучше закатов на берегу моря?',
  'Как вы относитесь к памятникам?',
  'До скорой встречи!',
  'Трудный возраст...',
  'Никогда не забывай свои корни',
  'Если закрыть глаза, становится темно.',
  'Запомни: одна ошибка и ты ошибся.. ',
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = [
  'Андрей',
  'Артем',
  'Евгений',
  'Мария',
  'Валерия',
  'Тимофей',
  'Виктория',
  'Дмитрий',
  'Алексей',
  'Елизавета',
  'Кирилл',
  'Татьяна',
  'Клавдия',
  'Александр',
  'Юлия',
  'Анна',
  'София',
  'Екатерина',
  'Даниил',
  'Нина',
  'Владимир',
  'Иван',
  'Наталья',
  'Данил',
  'Алена',
];


//Генерация случайных чисел
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};


//Генерация случайных чисел и проверка на уникальность
const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomPostURL = createRandomIdFromRangeGenerator(1, 25);
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
const getRandomCommentID = createRandomIdFromRangeGenerator (1, 1000);

//Генерация чисел по порядку
let currentNumberID = 0;
const createCurrentNumber = () => {
  if (currentNumberID <= 25) {
    currentNumberID += 1;
  }
  return currentNumberID;
};


//Генерация случайного количества сообщений комментария
const createCommentMessage = () => {
  const numberOfMessage = getRandomInteger(1,2);
  let message;
  for (let i = 1; i <= numberOfMessage; i++) {
    message = (i === 2) ? `${getRandomArrayElement(MESSAGES) } ${ getRandomArrayElement(MESSAGES)}` : getRandomArrayElement(MESSAGES);
  }
  return message;
};


//Генерация комментариев
const createRandomComments = () => {
  const commentsObject = [];
  const randomIntegerForComment = getRandomInteger(0, 30);
  for (let i = 0; i <= randomIntegerForComment ; i++) {
    const randomComment = {
      commentID: getRandomCommentID(),
      commentAvatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
      commentMessage: createCommentMessage(),
      commentName: getRandomArrayElement(NAMES),
    };
    commentsObject.push(randomComment);
  }
  return commentsObject;
};


//Реализация постов
const createPost = () => ({
  id: createCurrentNumber(),
  url: `photos/${ getRandomPostURL() }.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(15,200),
  comments: createRandomComments()
});

const finalPost = Array.from({length: 25}, createPost);
console.log(finalPost);
