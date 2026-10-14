const DESTINATION_ORDER = [
  { rank: 0, pattern: /kerala/i, exclude: /rameshwar|madurai/i },
  { rank: 1, pattern: /assam/i },
  { rank: 2, pattern: /rajasthan|rajsthan/i },
  { rank: 3, pattern: /kashmir/i },
  { rank: 4, pattern: /himachal/i },
  { rank: 5, pattern: /guj[ae]rat/i },
  { rank: 6, pattern: /ladakh|\bleh\b/i },
  { rank: 7, pattern: /andaman/i },
  { rank: 8, pattern: /chardham/i },
  { rank: 9, pattern: /rameshwar|madurai/i },
  { rank: 10, pattern: /thailand|singapore|malaysia/i },
  { rank: 11, pattern: /\bbali\b/i },
  { rank: 12, pattern: /vietnam/i },
  { rank: 13, pattern: /dubai/i },
  { rank: 14, pattern: /europe/i },
];

const MONTHS = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};

const packageText = (pkg) => `${pkg?.title || ""} ${pkg?.destination || ""}`;

export const packageDisplayRank = (pkg) => {
  const text = packageText(pkg);
  const match = DESTINATION_ORDER.find(
    (rule) => rule.pattern.test(text) && !(rule.exclude && rule.exclude.test(text))
  );
  return match ? match.rank : DESTINATION_ORDER.length;
};

const departureValue = (pkg) => {
  const year = Number(pkg?.year) || 9999;
  const date = String(pkg?.date || "").toLowerCase();
  const monthMatch = date.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/);
  const dayMatch = date.match(/\d+/);
  const month = monthMatch ? MONTHS[monthMatch[0]] : 12;
  const day = dayMatch ? Number(dayMatch[0]) : 31;
  return year * 10000 + month * 100 + day;
};

export const comparePackages = (a, b) => {
  const rankDiff = packageDisplayRank(a) - packageDisplayRank(b);
  if (rankDiff !== 0) return rankDiff;
  const dateDiff = departureValue(a) - departureValue(b);
  if (dateDiff !== 0) return dateDiff;
  return String(a?.title || "").localeCompare(String(b?.title || ""));
};

export const sortPackages = (packages) => [...packages].sort(comparePackages);
