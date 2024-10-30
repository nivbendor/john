// src/utils/registrationUrls.ts

export const registrationUrls: Record<string, string> = {
    ken: 'https://form.jotform.com/243035049611146',
    amf: 'https://form.jotform.com/242686908801162',
    default: 'https://form.jotform.com/242687072734160',
  };
  
  export const getRegistrationUrl = (cpValue: string | undefined): string => {
    if (cpValue && cpValue in registrationUrls) {
      return registrationUrls[cpValue];
    }
    return registrationUrls.default;
  };