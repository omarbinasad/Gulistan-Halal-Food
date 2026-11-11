/**
 * DEMO DATA — placeholder country collections for frontend development only.
 * Consumed exclusively through src/services/mock. Replace with API data.
 */
import type { CountryCollection } from "@/types";

export const demoCountries: CountryCollection[] = [
  { id: "demo-country-bd", slug: "bangladesh", countryCode: "BD", name: "Bangladesh", nameJa: "バングラデシュ", tagline: "Hilsa, chinigura rice & mustard oil", productCount: 214 },
  { id: "demo-country-in", slug: "india", countryCode: "IN", name: "India", nameJa: "インド", tagline: "Masalas, basmati & lentils", productCount: 268 },
  { id: "demo-country-np", slug: "nepal", countryCode: "NP", name: "Nepal", nameJa: "ネパール", tagline: "Momos, timur & Himalayan teas", productCount: 76 },
  { id: "demo-country-pk", slug: "pakistan", countryCode: "PK", name: "Pakistan", nameJa: "パキスタン", tagline: "Sella basmati & biryani blends", productCount: 142 },
  { id: "demo-country-th", slug: "thailand", countryCode: "TH", name: "Thailand", nameJa: "タイ", tagline: "Jasmine rice, pastes & herbs", productCount: 118 },
  { id: "demo-country-id", slug: "indonesia", countryCode: "ID", name: "Indonesia", nameJa: "インドネシア", tagline: "Kecap manis, sambal & noodles", productCount: 97 },
  { id: "demo-country-my", slug: "malaysia", countryCode: "MY", name: "Malaysia", nameJa: "マレーシア", tagline: "Roti paratha & teh tarik", productCount: 84 },
  { id: "demo-country-vn", slug: "vietnam", countryCode: "VN", name: "Vietnam", nameJa: "ベトナム", tagline: "Rice paper, coffee & pho", productCount: 63 },
  { id: "demo-country-br", slug: "brazil", countryCode: "BR", name: "Brazil", nameJa: "ブラジル", tagline: "Halal chicken & guaraná", productCount: 58 },
];
