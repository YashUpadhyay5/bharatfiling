/**
 * BharatFiling - Trademark Nice Classification Mapping by Industry
 * Covers Goods (Classes 1-34) and Services (Classes 35-45).
 */

export const INDUSTRY_TRADEMARK_MAPPING = {
  technology: {
    label: 'Technology, Software & IT',
    classes: [9, 42],
    descriptions: [
      { classNumber: 9, description: 'Software applications, mobile apps, electronics, digital apparatus.' },
      { classNumber: 42, description: 'SaaS, cloud computing, software development, IT consulting, cybersecurity.' },
    ],
  },
  ecommerce: {
    label: 'E-commerce & Retail Trading',
    classes: [35, 9, 39],
    descriptions: [
      { classNumber: 35, description: 'Online retail store services, marketplace operations, advertising, marketing.' },
      { classNumber: 9, description: 'E-commerce downloadable application software.' },
      { classNumber: 39, description: 'Packaging, courier, logistics, distribution of goods.' },
    ],
  },
  finance: {
    label: 'FinTech, Banking & Financial Services',
    classes: [36, 9, 42],
    descriptions: [
      { classNumber: 36, description: 'Financial transactions, digital wallets, payment gateways, wealth management, insurance.' },
      { classNumber: 9, description: 'Financial technology software, cryptocurrency apps.' },
      { classNumber: 42, description: 'Fintech software hosting and cloud infrastructure.' },
    ],
  },
  healthcare: {
    label: 'Healthcare, Pharma & Life Sciences',
    classes: [5, 10, 44],
    descriptions: [
      { classNumber: 5, description: 'Pharmaceutical drugs, medical preparations, vitamins, sanitary products.' },
      { classNumber: 10, description: 'Medical equipment, diagnostic instruments, surgical devices.' },
      { classNumber: 44, description: 'Hospitals, clinics, telemedicine, nursing, diagnostic laboratory services.' },
    ],
  },
  food: {
    label: 'Food, Beverages & Hospitality',
    classes: [29, 30, 32, 43],
    descriptions: [
      { classNumber: 29, description: 'Meat, fish, poultry, processed fruits, dairy products, edible oils.' },
      { classNumber: 30, description: 'Coffee, tea, rice, bakery, confectionery, spices, packaged food.' },
      { classNumber: 32, description: 'Mineral water, fruit juices, soft drinks, non-alcoholic beverages.' },
      { classNumber: 43, description: 'Restaurants, cloud kitchens, cafes, catering, hotels.' },
    ],
  },
  manufacturing: {
    label: 'Manufacturing & Industrial Machinery',
    classes: [7, 11, 12, 19],
    descriptions: [
      { classNumber: 7, description: 'Machines, machine tools, motors, industrial manufacturing equipment.' },
      { classNumber: 11, description: 'Lighting, heating, cooking, cooling, air conditioning apparatus.' },
      { classNumber: 12, description: 'Vehicles, automobiles, electric vehicles, automotive components.' },
      { classNumber: 19, description: 'Non-metallic building materials, cement, concrete, pipes.' },
    ],
  },
  consulting: {
    label: 'Consulting, Legal & Professional Services',
    classes: [35, 41, 45],
    descriptions: [
      { classNumber: 35, description: 'Business management, business advisory, human resources, accounting.' },
      { classNumber: 41, description: 'Training, skill development, workshops, executive coaching.' },
      { classNumber: 45, description: 'Legal services, statutory compliance, intellectual property licensing.' },
    ],
  },
  education: {
    label: 'Education, EdTech & Publishing',
    classes: [41, 9, 16],
    descriptions: [
      { classNumber: 41, description: 'Schools, coaching institutes, online academies, certification programs.' },
      { classNumber: 9, description: 'E-learning apps, educational software, recorded course materials.' },
      { classNumber: 16, description: 'Printed books, study material, educational journals.' },
    ],
  },
  realestate: {
    label: 'Real Estate & Construction',
    classes: [36, 37],
    descriptions: [
      { classNumber: 36, description: 'Real estate brokerage, property management, leasing, real estate advisory.' },
      { classNumber: 37, description: 'Building construction, architecture execution, civil repair, infrastructure.' },
    ],
  },
  logistics: {
    label: 'Logistics, Supply Chain & Transport',
    classes: [39, 35],
    descriptions: [
      { classNumber: 39, description: 'Freight forwarding, shipping, warehousing, supply chain transportation.' },
      { classNumber: 35, description: 'Logistics tracking management, dispatch optimization.' },
    ],
  },
  general: {
    label: 'General Commercial Trade',
    classes: [35],
    descriptions: [
      { classNumber: 35, description: 'General trading, distribution, commercial representation, retail.' },
    ],
  },
};
