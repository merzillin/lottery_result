import type { LotteryDetails } from "../type/HomePage";

interface IPageCardProps {
  label: string;
  data: LotteryDetails[];
  count?: number;
}

export const PageCard = ({ label, data, count }: IPageCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg  mx-auto my-4">
      <div className="text-lg font-semibold mb-4 flex flex-col">
        <div>{label}</div>
        <div className="text-xs font-normal opacity-95">
          {count && " count : " + count}
        </div>
      </div>

      <hr className="border-t-2 border-gray-300 my-4" />
      <div className="flex flex-row flex-wrap space-x-2">
        {data.map((item, index) => (
          <p key={index} className="text-gray-700 text-sm mb-2">
            {item.lottery_number}
          </p>
        ))}
      </div>
    </div>
  );
};
