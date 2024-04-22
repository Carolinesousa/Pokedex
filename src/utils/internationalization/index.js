import enTexts from "./en";
import esTexts from "./es";
import ptTexts from "./pt";

const INTERNATIONALIZATION_KEY = "language";
const LANGUAGES = {
  en: enTexts,
  pt: ptTexts,
  es: esTexts,
};

export const setLanguage = (language) => {
  window.localStorage.setItem(INTERNATIONALIZATION_KEY, language);
};

export const getLanguage = () => {
  return window.localStorage.getItem(INTERNATIONALIZATION_KEY) ?? "en";
};

const getTexts = () => {
  const language = window.localStorage.getItem(INTERNATIONALIZATION_KEY);
  return LANGUAGES[language] ?? enTexts;
};

const texts = getTexts();

export default texts;
