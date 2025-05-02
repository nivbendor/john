import { TAA } from "./config";
import { Plan, Product } from "./insuranceTypes";
import { isDistributor } from "./isDistributor";

export function getPlanLabel(product: Product, plan: Plan) {
    if (product === 'Dental' && plan === 'Premium' && isDistributor(TAA)) {
        return 'Enhanced';
    }
    return plan;
}