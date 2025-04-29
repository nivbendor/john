import { TAA } from './config';
import { REGULAR_PRODUCT_CONTENT, TAA_PRODUCT_CONTENT } from './insuranceConfig';
import { Product } from './insuranceTypes';
import { isDistributor } from './isDistributor';

type ProductContent = {
  paragraph: string;
  bulletPoints: string[];
};

export function getProductContent(product: Product): ProductContent | undefined {
  const content = isDistributor(TAA)
    ? TAA_PRODUCT_CONTENT[product]
    : REGULAR_PRODUCT_CONTENT[product];

  return content;
}
