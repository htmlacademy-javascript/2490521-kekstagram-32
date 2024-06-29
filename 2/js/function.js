//Функция для проверки длины строки
const isValidString = (inputString, maxLength) => inputString.length <= maxLength;
isValidString ('Текст, который нужно проверить', 20);

//Функция для проверки палиндрома
const isStringPalindrome = (inputString) => {
  const normalizedString = inputString.replaceAll(' ', '').toLowerCase();
  let reverseString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--){
    reverseString += normalizedString.at(i);
  }
  return reverseString === normalizedString;
};

isStringPalindrome('А роза упала на лапу Азора');

//Функция с извлечением цифр
const extractingNumbers = (inputString) => {
  let parsedString = '';
  for (let i = 0; i <= inputString.length; i++){
    if(!isNaN(parseInt(inputString[i], 10))){
      parsedString += inputString[i];
    }
  }
  return parseInt(parsedString, 10);
};
extractingNumbers('2023 год');
