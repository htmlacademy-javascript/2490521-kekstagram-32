import {getRandomInteger, getRandomArrayElement, createRandomIdFromRangeGenerator} from './util.js';

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

const MIN_URL_COUNT = 1;
const MAX_URL_COUNT = 25;
const MIN_COMMENT_ID_COUNT = 1;
const MAX_COMMENT_ID_COUNT = 1000;
const POST_COUNT = 25;
const MIN_COMMENT_MESSAGE_COUNT = 1;
const MAX_COMMENT_MESSAGE_COUNT = 2;
const MIN_COMMENT_COUNT = 0;
const MAX_COMMENT_COUNT = 30;
const MIN_COMMENT_AVATAR_COUNT = 1;
const MAX_COMMENT_AVATAR_COUNT = 6;
const MIN_POST_LIKES_COUNT = 15;
const MAX_POST_LIKES_COUNT = 200;

const getRandomPostURL = createRandomIdFromRangeGenerator(MIN_URL_COUNT, MAX_URL_COUNT);
const getRandomCommentID = createRandomIdFromRangeGenerator (MIN_COMMENT_ID_COUNT, MAX_COMMENT_ID_COUNT);

//Генерация чисел по порядку
let currentNumberID = 0;
const createCurrentNumber = () => {
  if (currentNumberID <= POST_COUNT) {
    currentNumberID += 1;
  }
  return currentNumberID;
};


//Генерация случайного количества сообщений комментария
const createCommentMessage = () => {
  const numberOfMessage = getRandomInteger(MIN_COMMENT_MESSAGE_COUNT, MAX_COMMENT_MESSAGE_COUNT);
  let message;
  for (let i = 1; i <= numberOfMessage; i++) {
    message = (i === 2) ? `${getRandomArrayElement(MESSAGES) } ${ getRandomArrayElement(MESSAGES)}` : getRandomArrayElement(MESSAGES);
  }
  return message;
};


//Генерация комментариев
const createRandomComments = () => {
  const commentsObject = [];
  const randomIntegerForComment = getRandomInteger(MIN_COMMENT_COUNT, MAX_COMMENT_COUNT);
  for (let i = 0; i <= randomIntegerForComment ; i++) {
    const randomComment = {
      commentID: getRandomCommentID(),
      commentAvatar: `img/avatar-${ getRandomInteger(MIN_COMMENT_AVATAR_COUNT, MAX_COMMENT_AVATAR_COUNT) }.svg`,
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
  likes: getRandomInteger(MIN_POST_LIKES_COUNT, MAX_POST_LIKES_COUNT),
  comments: createRandomComments()
});

const finalPosts = () => Array.from({length: POST_COUNT}, createPost);
export {finalPosts};
