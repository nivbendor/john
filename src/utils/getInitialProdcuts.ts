import { TAA } from './config';
import { Product } from './insuranceTypes';
import { isDistributor } from './isDistributor';

export function getInitialProducts(): Partial<Record<Product, boolean>> {

  if (isDistributor(TAA)) {
    // TAA distributors don't have Hospital Indemnity
    return {
      LTD: true,
      STD: true,
      'Life / AD&D': true,
      Accident: true,
      Vision: true,
      Dental: true,
      // 'Critical Illness/Cancer': true, TODO: Critical-Illnness hidden temporarily
      Telehealth: true,
      'Identity Theft Protection': true,
      // 'Virtual Primary Care': true,
    };
  }

  return {
    LTD: true,
    STD: true,
    'Life / AD&D': true,
    Accident: true,
    Vision: true,
    Dental: true,
    'Critical Illness/Cancer': true,
    'Hospital Indemnity': true,
  };
}
