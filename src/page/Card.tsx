interface IPageCardProps {
  label: string;
  data: string[];
}

export const PageCard = ({ label, data }: IPageCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg  mx-auto my-4">
      <div className="text-lg font-semibold mb-4">{label}</div>
      {/* Horizontal Line */}
      <hr className="border-t-2 border-gray-300 my-4" />
      <div className="flex flex-row flex-wrap space-x-2">
        {data.map((item, index) => (
          <p key={index} className="text-gray-700 text-sm mb-2">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};
