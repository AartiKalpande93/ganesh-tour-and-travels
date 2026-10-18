import { useLanguage } from "../context/useLanguage";
import SectionTitle from "../components/SectionTitle";
import { Icon } from "../components/Icons";
import teamImg from "../assets/team.jpeg";

const copy = {
  en: {
    eyebrow: "About us",
    title: "A travel team from Amravati",
    subtitle: "Ganesh Yatra Tourism plans group holidays and yatras so the journey stays comfortable and easy to follow.",
    heading: "Who we are",
    paragraphs: [
      "Ganesh Yatra Tourism is a travel company based in Amravati, Maharashtra. We organise group tours, family holidays, pilgrimage yatras and customised trips for people who want a memorable journey without managing every booking themselves.",
      "Departures cover sacred places such as Char Dham, along with Kashmir, Leh Ladakh, Himachal, the south, Andaman and selected trips further afield. A tour manager travels with the group, stays are arranged in advance, and the outline of the trip is shared before you leave.",
      "We look after timing, transport and meals so families, seniors and first-time travellers can enjoy the road. The goal is a safe, well-planned trip that feels straightforward from the first call until you are back home.",
    ],
    points: [
      { icon: "trust", text: "Safe, planned travel" },
      { icon: "family", text: "Built around families" },
      { icon: "comfort", text: "Comfortable journeys" },
      { icon: "support", text: "A team you can call" },
    ],
    badgeTitle: "Amravati",
    badgeSub: "Maharashtra",
  },
  mr: {
    eyebrow: "आमच्याबद्दल",
    title: "अमरावतीतील प्रवास टीम",
    subtitle: "गणेश यात्रा टुरिझम ग्रुप सुट्ट्या आणि यात्रा अशा आखते की प्रवास आरामदायक आणि सोपा राहावा.",
    heading: "आम्ही कोण",
    paragraphs: [
      "गणेश यात्रा टुरिझम ही अमरावती, महाराष्ट्र येथील प्रवास कंपनी आहे. आम्ही ग्रुप टूर, कौटुंबिक सुट्ट्या, तीर्थयात्रा आणि तुमच्या गरजेनुसार सहली आखतो, जेणेकरून प्रत्येक बुकिंगचा ताण तुमच्यावर येऊ नये.",
      "चारधामसारख्या पवित्र स्थळांपासून काश्मीर, लेह लडाख, हिमाचल, दक्षिण भारत, अंदमान आणि निवडक दूरच्या सहलींपर्यंत आमचे टूर जातात. ग्रुपसोबत टूर मॅनेजर असतो, राहण्याची सोय आधीच केलेली असते आणि प्रवासाची रूपरेषा निघण्यापूर्वी सांगितली जाते.",
      "वेळ, वाहन आणि जेवण आम्ही सांभाळतो, म्हणून कुटुंबे, ज्येष्ठ नागरिक आणि पहिल्यांदा प्रवास करणारेही सहल मनापासून अनुभवू शकतात. ध्येय सोपे आहे — सुरक्षित, नियोजित आणि त्रासमुक्त प्रवास.",
    ],
    points: [
      { icon: "trust", text: "सुरक्षित, नियोजित प्रवास" },
      { icon: "family", text: "कुटुंबांसाठी" },
      { icon: "comfort", text: "आरामदायक वाटचाल" },
      { icon: "support", text: "संपर्क करता येणारी टीम" },
    ],
    badgeTitle: "अमरावती",
    badgeSub: "महाराष्ट्र",
  },
};

const About = () => {
  const { lang } = useLanguage();
  const c = copy[lang] || copy.en;

  return (
    <section id="about" className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative">
            <img
              src={teamImg}
              alt={lang === "mr" ? "गणेश यात्रा प्रवासी ग्रुप" : "Ganesh Yatra travellers on a group tour"}
              className="h-72 w-full rounded-3xl object-cover shadow-lg ring-1 ring-line sm:h-96"
            />
            <div className="absolute -bottom-4 right-4 rounded-2xl bg-brand px-5 py-3 text-white shadow-lg sm:bottom-4">
              <p className="text-lg font-bold leading-none">{c.badgeTitle}</p>
              <p className="mt-1 text-xs font-medium text-white/90">{c.badgeSub}</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-ink">{c.heading}</h3>
            {c.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                {paragraph}
              </p>
            ))}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {c.points.map((item) => (
                <div key={item.text} className="flex min-h-14 items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3">
                  <span className="text-brand">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-ink">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
