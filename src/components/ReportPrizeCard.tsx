/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

// Define types for the props of the ReportCard component
interface ReportCardProps {
  prizeTitle: string;
  prize: string;
  count: number;
  numberList: string[] | string; // Accept both string[] and string
  rangeList: { label: string; value: string }[];
  result?: { type: string; result: any[] }[];
}

const ReportCard: React.FC<ReportCardProps> = ({
  prizeTitle,
  prize,
  count,
  numberList,
  rangeList,
  result,
}) => {
  // Ensure that numberList is always an array
  const numberArray = Array.isArray(numberList) ? numberList : [numberList];

  return (
    <div className="border-b border-gray-300 my-4 p-4 rounded-lg shadow-md bg-white">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-xl font-semibold text-gray-800">
            {`${prizeTitle} - ${prize}`}
          </label>
          <label className="text-md text-gray-600">{`Count: ${count}`}</label>
        </div>

        {rangeList.length > 0 && (
          <>
            <label className="text-md font-medium text-gray-700">Range</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 w-full">
              {rangeList.map((item, idx) => (
                <div
                  key={idx}
                  className="text-sm text-gray-600 bg-gray-100 p-2 rounded-md"
                >
                  <label>{`${item.label}: ${item.value}`}</label>
                </div>
              ))}
            </div>
          </>
        )}

        <label className="text-md font-medium text-gray-700">Numbers</label>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
          {numberArray.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-100 p-2 rounded-md text-center text-gray-700 font-semibold"
            >
              {item}
            </div>
          ))}
        </div>

        {result && (
          <div className="space-y-4 sm:space-y-6 md:space-y-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-screen-xl mx-auto sm:mx-0 px-4">
            {result.map((resultObj, resultIdx) => (
              <div
                key={resultIdx}
                className="flex flex-col gap-4 border rounded-lg p-4 sm:p-6 min-h-[200px] sm:min-h-[250px] flex-grow"
              >
                <div className="w-full flex flex-col gap-2 flex-grow">
                  <label className="font-medium text-gray-700 text-center sm:text-left">
                    {`Probability ${resultObj.type}`}
                  </label>

                  {/* Map over each result's values */}
                  {resultObj.result.map((value: any, valueIdx) => (
                    <div key={valueIdx} className="space-y-2">
                      {value.map((valueObj: any) => (
                        <div key={valueObj.key} className="flex flex-col gap-2">
                          <div className="flex flex-col gap-1">
                            {/* Display key and type */}
                            <label className="text-sm text-gray-600">{`${valueObj.key}: ${valueObj.type}`}</label>

                            {/* Display count */}
                            <label className="text-sm text-gray-600">{`Count: ${valueObj.count}`}</label>
                          </div>

                          {/* Iterate over nested values (even, odd, prime) */}
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(valueObj.values).map(
                              ([valueType, valueCount]) => (
                                <div
                                  key={valueType}
                                  className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-lg"
                                >
                                  {`${valueType}: ${valueCount}`}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportCard;
