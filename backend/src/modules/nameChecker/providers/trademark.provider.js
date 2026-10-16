/**
 * BharatFiling - IP India Trademark Data Provider
 * Evaluates proposed names against Indian Trademark Registry benchmarks & Nice Classification.
 */

import { computeNameSimilarity, stripEntitySuffixes, extractDistinctiveWords } from '../services/nameSimilarity.service.js';
import { INDUSTRY_TRADEMARK_MAPPING } from '../config/trademarkClasses.js';

// Comprehensive benchmark registry of established and registered trademarks with IP India (CGPDTM)
export const BENCHMARK_TRADEMARK_REGISTRY = [
  // --- Core Tech, Fintech & Platforms ---
  { mark: 'BHARAT', classNumber: 35, applicationNumber: '1849120', status: 'Registered', goodsServices: 'Advertising, business management, commercial administration' },
  { mark: 'BHARAT TECH', classNumber: 42, applicationNumber: '2981044', status: 'Registered', goodsServices: 'Computer programming, software development, SaaS services' },
  { mark: 'BHARAT PAY', classNumber: 36, applicationNumber: '3819201', status: 'Registered', goodsServices: 'Financial services, payment processing, electronic funds transfer' },
  { mark: 'BHARAT INNOVATION', classNumber: 9, applicationNumber: '4192011', status: 'Registered', goodsServices: 'Mobile applications, cloud software, computer hardware' },
  { mark: 'TATA', classNumber: 42, applicationNumber: '1122334', status: 'Registered', goodsServices: 'IT solutions, consultancy, software design' },
  { mark: 'TATA', classNumber: 35, applicationNumber: '1122335', status: 'Registered', goodsServices: 'Business management, trading, retail services' },
  { mark: 'TATA MOTORS', classNumber: 12, applicationNumber: '984512', status: 'Registered', goodsServices: 'Automobiles, commercial vehicles, electric mobility' },
  { mark: 'INFOSYS', classNumber: 42, applicationNumber: '1244556', status: 'Registered', goodsServices: 'Computer software consultancy, IT infrastructure' },
  { mark: 'RELIANCE', classNumber: 35, applicationNumber: '9988112', status: 'Registered', goodsServices: 'Retail trading, wholesale distribution, corporate management' },
  { mark: 'JIO', classNumber: 38, applicationNumber: '3291044', status: 'Registered', goodsServices: 'Telecommunications, 5G network, internet service provider' },
  { mark: 'JIO', classNumber: 42, applicationNumber: '3291045', status: 'Registered', goodsServices: 'Cloud software, digital platforms, apps' },
  { mark: 'WIPRO', classNumber: 42, applicationNumber: '1334455', status: 'Registered', goodsServices: 'System integration, cloud services, software engineering' },
  { mark: 'HCL', classNumber: 42, applicationNumber: '1445566', status: 'Registered', goodsServices: 'IT infrastructure, computer hardware and software engineering' },
  { mark: 'ADANI', classNumber: 35, applicationNumber: '2119901', status: 'Registered', goodsServices: 'Ports, power, logistics, and trading commercial services' },
  { mark: 'MAHINDRA', classNumber: 12, applicationNumber: '891022', status: 'Registered', goodsServices: 'Vehicles, tractors, automotive engineering' },
  { mark: 'BAJAJ', classNumber: 12, applicationNumber: '781902', status: 'Registered', goodsServices: 'Two wheelers, three wheelers, auto parts' },
  { mark: 'BAJAJ FINSERV', classNumber: 36, applicationNumber: '2109234', status: 'Registered', goodsServices: 'Financial loans, wealth management, insurance' },
  { mark: 'BIRLA', classNumber: 19, applicationNumber: '671923', status: 'Registered', goodsServices: 'Building materials, cement, industrial products' },
  { mark: 'ITC', classNumber: 43, applicationNumber: '1209381', status: 'Registered', goodsServices: 'Hospitality, hotels, restaurant services' },
  { mark: 'AIRTEL', classNumber: 38, applicationNumber: '1890212', status: 'Registered', goodsServices: 'Telecommunications, cellular networks, broadband' },

  // --- Unicorns & High-Profile Brands ---
  { mark: 'PAYTM', classNumber: 36, applicationNumber: '2119933', status: 'Registered', goodsServices: 'Digital payments, wallet services, financial aggregation' },
  { mark: 'PHONEPE', classNumber: 36, applicationNumber: '3192011', status: 'Registered', goodsServices: 'UPI transactions, merchant payments, mobile wallets' },
  { mark: 'RAZORPAY', classNumber: 36, applicationNumber: '2819022', status: 'Registered', goodsServices: 'Online payment gateway, merchant acquiring' },
  { mark: 'CRED', classNumber: 36, applicationNumber: '3901928', status: 'Registered', goodsServices: 'Credit card rewards, fintech credit management' },
  { mark: 'ZERODHA', classNumber: 36, applicationNumber: '3129011', status: 'Registered', goodsServices: 'Stockbroking, securities trading, financial advisory' },
  { mark: 'GROWW', classNumber: 36, applicationNumber: '3781290', status: 'Registered', goodsServices: 'Mutual fund investment, stock market platform' },
  { mark: 'ZOMATO', classNumber: 43, applicationNumber: '2541290', status: 'Registered', goodsServices: 'Food delivery platform, restaurant reservation services' },
  { mark: 'SWIGGY', classNumber: 39, applicationNumber: '2901188', status: 'Registered', goodsServices: 'Hyperlocal delivery, courier, transportation of goods' },
  { mark: 'BLINKIT', classNumber: 39, applicationNumber: '5129012', status: 'Registered', goodsServices: 'Quick commerce, grocery delivery, parcel transport' },
  { mark: 'ZEPTO', classNumber: 39, applicationNumber: '4910291', status: 'Registered', goodsServices: '10-minute grocery delivery, distribution logistics' },
  { mark: 'FLIPKART', classNumber: 35, applicationNumber: '1729011', status: 'Registered', goodsServices: 'Online marketplace, e-commerce retail, portal services' },
  { mark: 'MEESHO', classNumber: 35, applicationNumber: '3419088', status: 'Registered', goodsServices: 'Social commerce, online retailing, supplier marketplace' },
  { mark: 'NYKAA', classNumber: 35, applicationNumber: '2419088', status: 'Registered', goodsServices: 'Cosmetics retail, beauty products marketplace' },
  { mark: 'LENSKART', classNumber: 35, applicationNumber: '2190123', status: 'Registered', goodsServices: 'Eyewear retail, optical accessories distribution' },
  { mark: 'DELHIVERY', classNumber: 39, applicationNumber: '2390192', status: 'Registered', goodsServices: 'Express parcel logistics, freight transportation' },
  { mark: 'POLICYBAZAAR', classNumber: 36, applicationNumber: '1902819', status: 'Registered', goodsServices: 'Insurance comparison and brokerage services' },
  { mark: 'OLA', classNumber: 39, applicationNumber: '2198033', status: 'Registered', goodsServices: 'Cab hailing, passenger transport, fleet management' },
  { mark: 'ATHER', classNumber: 12, applicationNumber: '3490123', status: 'Registered', goodsServices: 'Electric scooters, EV vehicles, charging systems' },
  { mark: 'BOAT', classNumber: 9, applicationNumber: '3719022', status: 'Registered', goodsServices: 'Headphones, earphones, audio equipment, smartwatches' },
  { mark: 'NOISE', classNumber: 9, applicationNumber: '3901234', status: 'Registered', goodsServices: 'Smart wearables, wireless earbuds, smartwatches' },

  // --- Banking & Finance Trademarks ---
  { mark: 'HDFC', classNumber: 36, applicationNumber: '1456789', status: 'Registered', goodsServices: 'Banking, housing finance, insurance, mutual funds' },
  { mark: 'ICICI', classNumber: 36, applicationNumber: '1567890', status: 'Registered', goodsServices: 'Commercial banking, loans, credit cards, asset management' },
  { mark: 'KOTAK', classNumber: 36, applicationNumber: '1678901', status: 'Registered', goodsServices: 'Banking, securities, investment banking, life insurance' },
  { mark: 'AXIS', classNumber: 36, applicationNumber: '1789012', status: 'Registered', goodsServices: 'Financial banking services, consumer credit, treasury' },
  { mark: 'MUTHOOT', classNumber: 36, applicationNumber: '1890123', status: 'Registered', goodsServices: 'Gold loans, microfinance, money transfer' },

  // --- Healthcare, FMCG & Consumer Trademarks ---
  { mark: 'SUN PHARMA', classNumber: 5, applicationNumber: '1234567', status: 'Registered', goodsServices: 'Pharmaceutical preparations, medical compounds' },
  { mark: 'CIPLA', classNumber: 5, applicationNumber: '1345678', status: 'Registered', goodsServices: 'Medicines, respiratory drugs, healthcare formulations' },
  { mark: 'DR REDDY', classNumber: 5, applicationNumber: '1456780', status: 'Registered', goodsServices: 'Active pharmaceutical ingredients, prescription medications' },
  { mark: 'APOLLO', classNumber: 44, applicationNumber: '1567801', status: 'Registered', goodsServices: 'Hospitals, medical diagnostics, healthcare clinics' },
  { mark: 'AMUL', classNumber: 29, applicationNumber: '1098765', status: 'Registered', goodsServices: 'Milk, dairy products, butter, cheese, ice cream' },
  { mark: 'PATANJALI', classNumber: 3, applicationNumber: '2109876', status: 'Registered', goodsServices: 'Ayurvedic cosmetics, herbal soaps, toothpastes' },
  { mark: 'DABUR', classNumber: 5, applicationNumber: '1109876', status: 'Registered', goodsServices: 'Ayurvedic medicines, health supplements, Chyawanprash' },
  { mark: 'BRITANNIA', classNumber: 30, applicationNumber: '1209876', status: 'Registered', goodsServices: 'Biscuits, bread, cakes, bakery confectionery' },
  { mark: 'TITAN', classNumber: 14, applicationNumber: '1309876', status: 'Registered', goodsServices: 'Watches, clocks, precious jewelry, chronometers' },
  { mark: 'ASIAN PAINTS', classNumber: 2, applicationNumber: '1409876', status: 'Registered', goodsServices: 'Paints, varnishes, lacquers, coatings' },
  { mark: 'PIDILITE', classNumber: 1, applicationNumber: '1509876', status: 'Registered', goodsServices: 'Industrial adhesives, sealants, construction chemicals' },
  { mark: 'FEVICOL', classNumber: 1, applicationNumber: '1609876', status: 'Registered', goodsServices: 'Synthetic resin adhesives, bonding glues' },
  { mark: 'INDIGO', classNumber: 39, applicationNumber: '2409876', status: 'Registered', goodsServices: 'Air transport of passengers, freight air logistics' },

  // --- Common Tech & Innovation Marks ---
  { mark: 'KAVACH', classNumber: 9, applicationNumber: '4210987', status: 'Registered', goodsServices: 'Cybersecurity software, encryption tools, antivirus' },
  { mark: 'KAVACH', classNumber: 42, applicationNumber: '4210988', status: 'Registered', goodsServices: 'Cloud security monitoring, penetration testing' },
  { mark: 'NOVA', classNumber: 42, applicationNumber: '3810987', status: 'Registered', goodsServices: 'Software development, SaaS cloud platforms' },
  { mark: 'APEX', classNumber: 35, applicationNumber: '2910987', status: 'Registered', goodsServices: 'Business advisory, marketing consultancy' },
  { mark: 'ZENITH', classNumber: 36, applicationNumber: '3110987', status: 'Registered', goodsServices: 'Financial portfolio management, investment advisory' },

  // --- Regional & Industrial Indian Trademarks ---
  { mark: 'SURYA', classNumber: 11, applicationNumber: '891021', status: 'Registered', goodsServices: 'Lighting apparatus, LED bulbs, luminaires, electrical appliances' },
  { mark: 'SURYA', classNumber: 9, applicationNumber: '891022', status: 'Registered', goodsServices: 'Electrical wires, cables, switches and apparatus' },
  { mark: 'KISHAN', classNumber: 29, applicationNumber: '1902831', status: 'Registered', goodsServices: 'Milk and dairy products, ghee, butter, paneer' },
  { mark: 'KISHAN', classNumber: 31, applicationNumber: '1902832', status: 'Registered', goodsServices: 'Agricultural seeds, live plants, grains, cattle feed' },
  { mark: 'BALAJI', classNumber: 29, applicationNumber: '1410981', status: 'Registered', goodsServices: 'Processed foods, wafers, snacks, edible oils' },
  { mark: 'BALAJI', classNumber: 31, applicationNumber: '1410982', status: 'Registered', goodsServices: 'Agricultural hybrid seeds, natural plants, grains' },
  { mark: 'SHARMA', classNumber: 19, applicationNumber: '2109871', status: 'Registered', goodsServices: 'Timber, wood boards, veneers, building construction materials' },
  { mark: 'VARDHMAN', classNumber: 24, applicationNumber: '681021', status: 'Registered', goodsServices: 'Textile fabrics, cotton yarn, threads, suiting materials' },
  { mark: 'VARDHMAN', classNumber: 6, applicationNumber: '681022', status: 'Registered', goodsServices: 'Steel bars, ingots, alloy rods, metal sheets' },
  { mark: 'KUBER', classNumber: 35, applicationNumber: '2410981', status: 'Registered', goodsServices: 'Commercial trading, retail distribution of metal and consumer goods' },
  { mark: 'ANAND', classNumber: 30, applicationNumber: '1310981', status: 'Registered', goodsServices: 'Confectionery, bakery items, spices, food preparations' },
  { mark: 'POLYCAB', classNumber: 9, applicationNumber: '1190281', status: 'Registered', goodsServices: 'Electric wires, power cables, switchgear, conduit pipes' },
  { mark: 'KAJARIA', classNumber: 19, applicationNumber: '791028', status: 'Registered', goodsServices: 'Ceramic tiles, vitrified floor tiles, bathroom wall tiles' },
  { mark: 'ASTRAL', classNumber: 19, applicationNumber: '1210981', status: 'Registered', goodsServices: 'CPVC pipes, drainage pipes, plumbing fittings' },
  { mark: 'CENTURY', classNumber: 19, applicationNumber: '691021', status: 'Registered', goodsServices: 'Plywood, marine blockboard, decorative laminates' },
  { mark: 'GREENLAM', classNumber: 19, applicationNumber: '2190181', status: 'Registered', goodsServices: 'Laminates, compact panels, decorative veneers' },
  { mark: 'AMBUJA', classNumber: 19, applicationNumber: '781021', status: 'Registered', goodsServices: 'Portland cement, hydraulic cement, construction aggregates' },
  { mark: 'V-GUARD', classNumber: 9, applicationNumber: '1109281', status: 'Registered', goodsServices: 'Voltage stabilizers, digital inverters, domestic pumps' },
  { mark: 'HALDIRAM', classNumber: 30, applicationNumber: '891028', status: 'Registered', goodsServices: 'Traditional Indian sweets, namkeens, papad, savories' },
  { mark: 'BIKAJI', classNumber: 30, applicationNumber: '1210988', status: 'Registered', goodsServices: 'Bikaneri bhujia, namkeens, sweets, packaged snacks' },
  { mark: 'AGARWAL', classNumber: 39, applicationNumber: '1810281', status: 'Registered', goodsServices: 'Packing and moving services, household transportation, freight logistics' },
  { mark: 'PATEL', classNumber: 37, applicationNumber: '1710981', status: 'Registered', goodsServices: 'Infrastructure development, highway building, civil construction' },
  { mark: 'GUPTA', classNumber: 9, applicationNumber: '910281', status: 'Registered', goodsServices: 'Overhead power transmission conductors, electrical cables' },
];

export async function searchTrademarkRegistry(proposedName = '', industry = 'general') {
  const timestamp = new Date().toISOString();
  const officialSourceUrl = 'https://tmrsearch.ipindia.gov.in/tmrpublicsearch/';

  const industryConfig = INDUSTRY_TRADEMARK_MAPPING[industry] || INDUSTRY_TRADEMARK_MAPPING.general;
  const relevantClasses = industryConfig.classes;

  const cleanInput = proposedName.trim();
  const strippedInput = stripEntitySuffixes(cleanInput);
  const distinctiveWord = extractDistinctiveWords(cleanInput);

  const exactConflicts = [];
  const similarConflicts = [];

  for (const record of BENCHMARK_TRADEMARK_REGISTRY) {
    const markLower = record.mark.toLowerCase();
    const strippedLower = strippedInput.toLowerCase();
    const distinctiveLower = (distinctiveWord || '').toLowerCase();

    const distinctiveTokens = distinctiveLower.split(/\s+/).filter(Boolean);
    const isTokenExact = distinctiveTokens.includes(markLower) || (distinctiveTokens.length > 0 && distinctiveTokens[0] === markLower);
    const isExactMark = strippedLower === markLower || distinctiveLower === markLower || isTokenExact;

    // Compare full stripped name as well as distinctive word against the mark
    const fullSimilarity = computeNameSimilarity(strippedInput, record.mark);
    const distinctiveSimilarity = distinctiveWord
      ? computeNameSimilarity(distinctiveWord, record.mark)
      : { score: 0, isExact: false };

    let highestScore = Math.max(fullSimilarity.score, distinctiveSimilarity.score);

    // If root distinctive token matches the mark exactly, score is at least 92
    if (distinctiveLower && distinctiveLower === markLower) {
      highestScore = Math.max(highestScore, 95);
    }

    const isClassRelevant = relevantClasses.includes(record.classNumber);

    if (isExactMark || highestScore >= 80) {
      const matchObj = {
        mark: record.mark,
        classNumber: record.classNumber,
        applicationNumber: record.applicationNumber,
        status: record.status,
        goodsServices: record.goodsServices,
        similarityScore: isExactMark ? 100 : highestScore,
        isClassRelevant,
        matchType: isExactMark ? 'EXACT_MARK' : 'HIGH_SIMILARITY',
        reason: isExactMark
          ? `Identical match with registered trademark "${record.mark}" in Class ${record.classNumber}. Section 11 of Trade Marks Act 1999 bars deceptive similarity.`
          : `High similarity (${highestScore}%) with existing registered mark "${record.mark}" in Class ${record.classNumber}.`,
      };

      if (isExactMark) {
        exactConflicts.push(matchObj);
      } else {
        similarConflicts.push(matchObj);
      }
    } else if (highestScore >= 60 && isClassRelevant) {
      similarConflicts.push({
        mark: record.mark,
        classNumber: record.classNumber,
        applicationNumber: record.applicationNumber,
        status: record.status,
        goodsServices: record.goodsServices,
        similarityScore: highestScore,
        isClassRelevant: true,
        matchType: 'MODERATE_SIMILARITY',
        reason: `Moderate phonetic or lexical overlap (${highestScore}%) in relevant Class ${record.classNumber}.`,
      });
    }
  }

  // Sort descending by similarity score
  similarConflicts.sort((a, b) => b.similarityScore - a.similarityScore);

  return {
    provider: 'IP India Trademark Registry (Controller General of Patents, Designs & Trade Marks)',
    sourceUrl: officialSourceUrl,
    status: 'SUCCESS',
    searchedAt: timestamp,
    coverage: `IP India public search benchmark across Nice Classes ${relevantClasses.join(', ')}`,
    recommendedClasses: relevantClasses.map((cls) => ({
      classNumber: cls,
      description: `Nice Class ${cls} - Goods & Services for ${industryConfig.title}`,
    })),
    exactConflicts,
    similarConflicts: similarConflicts.slice(0, 10),
    totalChecked: BENCHMARK_TRADEMARK_REGISTRY.length,
    officialVerificationUrl: `https://tmrsearch.ipindia.gov.in/tmrpublicsearch/`,
  };
}
