import * as leoProfanity from 'leo-profanity';

leoProfanity.loadDictionary('ru');


export const filterProfanity = (text) => {
  if (leoProfanity.check(text)) {
    return leoProfanity.clean(text, '*');
  }
  return text;
};

export const hasProfanity = (text) => leoProfanity.check(text);