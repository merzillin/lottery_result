/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import type { RootState } from "../store/Store";
import { useState } from "react";
import { getResultByPrize } from "../utils/number";

export default function DashboardPage() {
  const lotteryData = useSelector((state: RootState) => state.dashboard);
  const [reportResult, setReportResult] = useState<any[]>([]);

  const getResult = (code: string) => {
    const record = lotteryData.find((item) => item.lottery_code === code);
    //console.log("record", record);
    if (!record?.fourth.lottery) return;
    const prizeFourth = getResultByPrize(record?.fourth.lottery);
    if (!record?.fifth.lottery) return;
    const prizeFifth = getResultByPrize(record?.fifth.lottery);
    if (!record?.sixth.lottery) return;
    const prizeSixth = getResultByPrize(record?.sixth.lottery);
    if (!record?.seventh.lottery) return;
    const prizeSeventh = getResultByPrize(record?.seventh.lottery);
    if (!record?.eighth.lottery) return;
    const prizeEighth = getResultByPrize(record?.eighth.lottery);
    if (!record?.ninth.lottery) return;
    const prizeNinth = getResultByPrize(record?.ninth.lottery);
    const report = [
      {
        lotteryName: record.lottery_name,
        lotteryCode: record.lottery_code,
        date: record.draw_date,
        fourth: prizeFourth,
        fifth: prizeFifth,
        sixth: prizeSixth,
        seventh: prizeSeventh,
        eighth: prizeEighth,
        ninth: prizeNinth,
      },
    ];
    //console.log("report", JSON.stringify(report));
    setReportResult((prev) => [...prev, ...report]);
  };

  console.log("reportResult :", reportResult);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div>
        <h3 className="text-3xl font-extrabold mb-6 text-center text-indigo-700">
          Dashboard
        </h3>
        <div className="flex flex-wrap justify-center gap-6">
          {lotteryData.map((item, index) => (
            <div
              key={index}
              className="w-[220px] bg-white border border-gray-300 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <div className="p-4 flex flex-col space-y-3">
                <label className="text-lg font-semibold text-center text-indigo-600 uppercase tracking-wide">
                  {item.lottery_name}
                </label>
                <div className="flex justify-between text-gray-600 font-medium text-sm">
                  <span>{item.lottery_code}</span>
                  <span>{item.draw_date}</span>
                </div>
              </div>
              <button
                className="mt-auto bg-indigo-600 text-white py-2 rounded-b-xl hover:bg-indigo-700 transition-colors duration-200 font-semibold"
                onClick={() => {
                  getResult(item.lottery_code);
                }}
              >
                Get Result
              </button>
            </div>
          ))}
        </div>
      </div>
      {reportResult.length > 0 && (
        <div className="w-full flex flex-col space-y-8  p-4">
          {reportResult.map((item, index) => (
            <div key={index} className="w-full  p-4">
              <div className="border rounded px-2 py-1 flex flex-col">
                <label className="block">{item.lotteryName}</label>

                <div className="flex flex-row space-x-4 overflow-x-auto">
                  {["fourth", "fifth", "sixth", "seventh", "ninth"].map(
                    (prize, prizeIndex) => (
                      <div
                        key={prizeIndex}
                        className="flex flex-col border p-4 rounded-lg shadow-sm"
                      >
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                          {`${
                            prize.charAt(0).toUpperCase() + prize.slice(1)
                          } Prize`}
                        </h3>
                        <div className="flex flex-row">
                          {item[prize].map((obj: any, objIndex: number) => (
                            <div
                              key={objIndex}
                              className="p-4 border rounded-lg shadow-sm mb-6 flex flex-col ml-2 mr-2"
                            >
                              <label className="block text-lg font-semibold text-gray-700 mb-2">
                                Probability: {obj.type}
                              </label>

                              {obj.result.map(
                                (resultObj: any, resultIndex: number) => (
                                  <div key={resultIndex} className="mt-4 ">
                                    {resultObj.map(
                                      (outputObj: any, outputIndex: number) => (
                                        <div
                                          key={outputIndex}
                                          className="mb-4  p-4 border-t border-gray-300"
                                        >
                                          <div className="flex flex-col gap-3">
                                            <div className="flex flex-col items-start">
                                              <label className="font-medium text-gray-700">
                                                {outputObj.key}
                                              </label>
                                              <label className="text-sm text-gray-600">
                                                {obj.type}: {outputObj.count}
                                              </label>
                                            </div>

                                            <div className="text-sm text-gray-500 flex flex-row">
                                              <div className="flex flex-row">
                                                <span className="font-semibold">
                                                  Even:
                                                </span>{" "}
                                                <p>{outputObj.values.even}</p>
                                              </div>
                                              <div className="flex flex-row">
                                                <span className="ml-2 font-semibold">
                                                  Odd:
                                                </span>{" "}
                                                <p>{outputObj.values.odd}</p>
                                              </div>
                                              <div className="flex flex-row">
                                                <span className="ml-2 font-semibold">
                                                  Prime:
                                                </span>{" "}
                                                <p>{outputObj.values.prime}</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
