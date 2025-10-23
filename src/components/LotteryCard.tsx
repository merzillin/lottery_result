type TCount = {
  first: number;
  consolation: number;
  second: number;
  third: number;
  fourth: number;
  fifth: number;
  sixth: number;
  seventh: number;
  eigth: number;
  ninth: number;
};

type TLotteryCardData = {
  lotteryName: string;
  firstPrize: string;
  prizes: string;
  draw_day: string;
  count: TCount;
};

interface ILotteryCardProps {
  data: TLotteryCardData;
}

export const LotteryCard = ({ data }: ILotteryCardProps) => {
  const prizeLevels = [
    { label: "First", value: data.count.first },
    { label: "Conso", value: data.count.consolation },
    { label: "Second", value: data.count.second },
    { label: "Third", value: data.count.third },
    { label: "Fourth", value: data.count.fourth },
    { label: "Fifth", value: data.count.fifth },
    { label: "Sixth", value: data.count.sixth },
    { label: "Seventh", value: data.count.seventh },
    { label: "Eighth", value: data.count.eigth },
    { label: "Ninth", value: data.count.ninth },
  ];
  return (
    <div className="max-w-md mx-5 my-4 border border-gray-300 rounded-xl shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col">
      {/* Lottery Name */}
      <h2 className="text-2xl font-extrabold text-indigo-700 text-center mb-4 uppercase tracking-wide">
        {data.lotteryName}
      </h2>

      {/* First Prize */}
      <div className="bg-indigo-100 rounded-lg p-5 mb-5 text-center">
        <p className="text-gray-700 font-semibold text-xl mb-1">First Prize</p>
        <p className="text-4xl font-bold text-indigo-800 text-xl">
          {data.firstPrize}
        </p>
      </div>

      {/* Other Details */}
      <div className="flex justify-between text-gray-700 mb-4">
        <div>
          <p className="font-medium">Total Prizes</p>
          <p className="text-xl font-semibold">{data.prizes}</p>
        </div>
        <div>
          <p className="font-medium">Draw Day</p>
          <p className="capitalize text-xl font-semibold">{data.draw_day}</p>
        </div>
      </div>

      {/* Prize Count Table */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-indigo-600">
          Prize Counts
        </h3>
        <div className="grid grid-cols-5 gap-3 text-gray-700">
          {prizeLevels.map(({ label, value }) => (
            <div
              key={label}
              className="bg-indigo-50 rounded-md p-3 flex flex-col items-center shadow-sm"
            >
              <span className="font-medium text-xs">{label}</span>
              <span className="text-lg font-semibold text-indigo-800">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
