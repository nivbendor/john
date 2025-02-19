import { isDev } from './isDev';

export const BABRM = 'babrm';

export const config = {
    splash: {
      headline: "Benefits in a box",
      subheadline: "Enterprise level employee benefits",
    },
    zipCode: {
      headline: "Let's start with the hardest question",
      subheadline: "What's your zip code?",
    },
    age: {
      headline: "We almost have everything we need to get you affordable benefits",
      subheadline: "How old are you?",
    },
    dependents: {
      headline: "One last question before we can generate a personalized offer",
      subheadline: "Who would like to cover?",
    },
  };

export const URI_SETTINGS = {
  auth() {
    if (isDev()) {
      return 'https://ltfuhej4l0.execute-api.us-east-1.amazonaws.com/dev/auth';
    }
    return 'https://9t1c2qgm8j.execute-api.us-east-1.amazonaws.com/prod/auth';
  },
  quote() {
    if (isDev()) {
      return 'https://5kfkw0uyea.execute-api.us-east-1.amazonaws.com/dev/quote';
    }

    return 'https://ubucgvtxog.execute-api.us-east-1.amazonaws.com/prod/quote'
  }
}