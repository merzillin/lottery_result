import { LotteryCard } from "../components/LotteryCard";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="w-full p-4 text-center text-3xl font-bold text-indigo-700">
        Lottery
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto px-4 py-6">
          {data.map((item, idx) => (
            <LotteryCard key={idx} data={item} />
          ))}
        </div>
      </main>
    </div>
  );
}

const data = [
  {
    lotteryName: "Samrudhi",
    firstPrize: "₹1,00,00,000/-",
    prizes: "10",
    draw_day: "Sunday",
    count: {
      first: 1,
      consolation: 11,
      second: 1,
      third: 1,
      fourth: 19,
      fifth: 6,
      sixth: 25,
      seventh: 76,
      eigth: 92,
      ninth: 150,
    },
  },
  {
    lotteryName: "Bhagyathara",
    firstPrize: "₹1,00,00,000/-",
    prizes: "10",
    draw_day: "Monday",
    count: {
      first: 1,
      consolation: 11,
      second: 1,
      third: 1,
      fourth: 19,
      fifth: 6,
      sixth: 25,
      seventh: 76,
      eigth: 94,
      ninth: 144,
    },
  },
  {
    lotteryName: "Sthree-Sakthi",
    firstPrize: "₹1,00,00,000/-",
    prizes: "10",
    draw_day: "Tuesday",
    count: {
      first: 1,
      consolation: 11,
      second: 1,
      third: 1,
      fourth: 19,
      fifth: 6,
      sixth: 25,
      seventh: 76,
      eigth: 90,
      ninth: 150,
    },
  },
  {
    lotteryName: "Dhanalakhsmi",
    firstPrize: "₹1,00,00,000/-",
    prizes: "10",
    draw_day: "Wednesday",
    count: {
      first: 1,
      consolation: 11,
      second: 1,
      third: 1,
      fourth: 19,
      fifth: 6,
      sixth: 25,
      seventh: 76,
      eigth: 96,
      ninth: 138,
    },
  },
  {
    lotteryName: "Karunya Plus",
    firstPrize: "₹1,00,00,000/-",
    prizes: "10",
    draw_day: "Thurday",
    count: {
      first: 1,
      consolation: 11,
      second: 1,
      third: 1,
      fourth: 19,
      fifth: 6,
      sixth: 25,
      seventh: 76,
      eigth: 84,
      ninth: 156,
    },
  },
  {
    lotteryName: "Suverna Keralam",
    firstPrize: "₹1,00,00,000/-",
    prizes: "10",
    draw_day: "Friday",
    count: {
      first: 1,
      consolation: 11,
      second: 1,
      third: 1,
      fourth: 19,
      fifth: 6,
      sixth: 25,
      seventh: 76,
      eigth: 92,
      ninth: 144,
    },
  },
  {
    lotteryName: "Karunya",
    firstPrize: "₹1,00,00,000/-",
    prizes: "10",
    draw_day: "Saturday",
    count: {
      first: 1,
      consolation: 11,
      second: 1,
      third: 1,
      fourth: 19,
      fifth: 6,
      sixth: 25,
      seventh: 76,
      eigth: 92,
      ninth: 144,
    },
  },
];
