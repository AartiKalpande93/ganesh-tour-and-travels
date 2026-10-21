import groupAtPalace from "../assets/home2.jpeg";
import departureGroup from "../assets/home1.jpeg";
import gardenGroup from "../assets/team.jpeg";

export const INSTAGRAM_URL = "https://www.instagram.com/ganesh_yatra2.0/";
export const INSTAGRAM_HANDLE = "@ganesh_yatra2.0";
export const FACEBOOK_URL = "https://www.facebook.com/p/Ganesh-Yatra-Tourism-61561174809515/";

export const text = (value, lang) =>
  typeof value === "string" ? value : value?.[lang] || value?.en || "";

export const navLinks = [
  { id: "home" },
  { id: "about" },
  { id: "services" },
  { id: "packages" },
  { id: "gallery" },
  { id: "why" },
  { id: "contact" },
];

export const services = [
  {
    icon: "group",
    title: { en: "Group Tours", mr: "ग्रुप टूर्स" },
    description: {
      en: "Fixed-date trips for families, friends and groups. Healthy, hygienic meals and clean drinking water are provided. Jain food and other meal preferences can be arranged when shared in advance.",
      mr: "कुटुंबे, मित्र आणि ग्रुपसाठी ठरलेल्या तारखेच्या सहली. प्रवासात चांगले, स्वच्छ आणि आरोग्यदायी जेवण व पिण्याचे स्वच्छ पाणी दिले जाते. जैन जेवण किंवा इतर आवडीचे जेवण आधी कळवल्यास उपलब्ध करून दिले जाते.",
    },
  },
  {
    icon: "temple",
    title: { en: "Religious / Pilgrimage Tours", mr: "धार्मिक / तीर्थयात्रा" },
    description: {
      en: "Darshan-focused yatras such as Char Dham and other sacred destinations, planned around temple timings.",
      mr: "चारधाम आणि इतर पवित्र स्थळांच्या दर्शनाभोवती नियोजित यात्रा.",
    },
  },
  {
    icon: "custom",
    title: { en: "Customized Tour Packages", mr: "कस्टम टूर पॅकेज" },
    description: {
      en: "A route, pace and budget shaped around your family or a private group.",
      mr: "तुमच्या कुटुंबासाठी किंवा खाजगी ग्रुपसाठी मार्ग, वेग आणि बजेट.",
    },
  },
];

export const whyChooseUs = [
  {
    icon: "comfort",
    title: { en: "Comfortable Travel", mr: "आरामदायक प्रवास" },
    description: {
      en: "Planned road journeys and arranged vehicles so the ride itself feels easy.",
      mr: "नियोजित प्रवास आणि वाहनांची सोय, म्हणून वाटचाल आरामाची वाटते.",
    },
  },
  {
    icon: "plan",
    title: { en: "Well-Planned Tours", mr: "नियोजित सहली" },
    description: {
      en: "Dates, stays, meals and sightseeing are set before you leave.",
      mr: "निघण्यापूर्वी तारखा, राहणे, जेवण आणि दर्शन ठरवले जाते.",
    },
  },
  {
    icon: "trust",
    title: { en: "Trusted Service", mr: "विश्वासार्ह सेवा" },
    description: {
      en: "A local Amravati team you can call before, during and after the trip.",
      mr: "अमरावतीतील टीम — प्रवासापूर्वी, दरम्यान आणि नंतर संपर्क करता येतो.",
    },
  },
  {
    icon: "team",
    title: { en: "Experienced Team", mr: "अनुभवी टीम" },
    description: {
      en: "Tour managers who stay with the group and handle the day on the road.",
      mr: "ग्रुपसोबत राहणारे टूर मॅनेजर प्रवासाचे दिवस सांभाळतात.",
    },
  },
  {
    icon: "family",
    title: { en: "Family-Friendly Trips", mr: "कुटुंबस्नेही सहली" },
    description: {
      en: "Pace and stays chosen with families, children and seniors in mind.",
      mr: "कुटुंबे, मुले आणि ज्येष्ठ नागरिक लक्षात घेऊन वेग आणि राहणे.",
    },
  },
  {
    icon: "price",
    title: { en: "Affordable Packages", mr: "परवडणारी पॅकेजेस" },
    description: {
      en: "Clear package rates, with anything extra mentioned before you confirm.",
      mr: "स्पष्ट पॅकेज दर, आणि अतिरिक्त खर्च कन्फर्म करण्यापूर्वी सांगितले जातात.",
    },
  },
  {
    icon: "support",
    title: { en: "Customer Support", mr: "ग्राहक सहाय्य" },
    description: {
      en: "Phone and WhatsApp when you need a change, a detail or an update.",
      mr: "बदल, माहिती किंवा अपडेटसाठी फोन आणि WhatsApp.",
    },
  },
  {
    icon: "memory",
    title: { en: "Memorable Journeys", mr: "आठवणींचा प्रवास" },
    description: {
      en: "Time for darshan, photos and the places people actually come to see.",
      mr: "दर्शन, फोटो आणि ज्या ठिकाणांसाठी प्रवासी येतात त्यासाठी वेळ.",
    },
  },
];

const img = (id, width = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

export const galleryImages = [
  {
    src: groupAtPalace,
    alt: {
      en: "Ganesh Yatra group on a heritage tour",
      mr: "गणेश यात्रा ग्रुप वारसा स्थळाच्या सहलीवर",
    },
    featured: true,
  },
  {
    src: departureGroup,
    alt: {
      en: "Ganesh Yatra travellers before departure",
      mr: "निघण्यापूर्वी गणेश यात्रा प्रवासी",
    },
  },
  {
    src: gardenGroup,
    alt: {
      en: "Ganesh Yatra group during a tour stop",
      mr: "सहलीदरम्यान गणेश यात्रा ग्रुप",
    },
  },
  {
    src: img("photo-1730021618560-cdb6b81592c2"),
    alt: { en: "Himalayan pilgrimage landscape", mr: "हिमालयीन तीर्थयात्रेचे दृश्य" },
  },
  {
    src: img("photo-1619837567816-30f8694e19e3"),
    alt: { en: "High mountain journey, Leh Ladakh", mr: "लेह लडाखचा डोंगरी प्रवास" },
  },
  {
    src: img("photo-1582510003544-4d00b7f74220"),
    alt: { en: "Temple towers on a pilgrimage tour", mr: "तीर्थयात्रेतील मंदिर" },
  },
  {
    src: img("photo-1602216056096-3b40cc0c9944"),
    alt: { en: "Kerala backwaters", mr: "केरळचे बॅकवॉटर" },
  },
  {
    src: img("photo-1477587458883-47145ed94245"),
    alt: { en: "Rajasthan heritage architecture", mr: "राजस्थानची वास्तुकला" },
  },
  {
    src: img("photo-1599661046289-e31897846e41"),
    alt: { en: "Fort and palace country in Rajasthan", mr: "राजस्थानचे किल्ले आणि राजवाडे" },
  },
  {
    src: img("photo-1677820915317-b5e5174c1f7a"),
    alt: { en: "Himachal mountain holiday", mr: "हिमाचलची डोंगरी सुट्टी" },
  },
  {
    src: img("photo-1566228015668-4c45dbc4e2f5"),
    alt: { en: "Kashmir winter landscape", mr: "काश्मीरचा हिवाळी देखावा" },
  },
  {
    src: img("photo-1593202232429-549625b8660d"),
    alt: { en: "Coastal stop on an Andaman tour", mr: "अंदमान सहलीवरील किनारा" },
  },
];

export const contactInfo = {
  phones: ["+91 97638 76734", "+91 7058255525"],
  email: "travelganeshyaatra@gmail.com",
  address: "Shop no 26, AMC Complex, Rajapeth, Amravati, Maharashtra",
  website: "www.ganeshyatratourism.com",
  whatsapp: "919763876734",
  instagram: INSTAGRAM_URL,
  instagramHandle: INSTAGRAM_HANDLE,
  tagline: '"चला सहलीला, गणेश टूरिझम आहे ना साथीला!"',
  features: [
    "आरामदायक प्रवास",
    "स्वादिष्ट जेवण",
    "उत्तम हॉटेल",
    "अनुभवी टूर मॅनेजर",
    "पूर्ण सुरक्षित सहल",
  ],
};

export const popularJourneys = [
  { label: "Leh Ladakh", query: "Ladakh" },
  { label: "Char Dham", query: "Chardham" },
  { label: "Kashmir", query: "Kashmir" },
  { label: "Himachal", query: "Himachal" },
  { label: "Andaman", query: "Andaman" },
  { label: "Kerala", query: "Kerala" },
];
