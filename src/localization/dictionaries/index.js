import { en } from "./en";
import { np } from "./np";

const dictionaries = {
  en,
  np,
};

export const getDictionary = async (locale) => {
  return dictionaries[locale] || dictionaries.en;
};
