/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import type { RootState } from "../store/Store";
import { useSelector } from "react-redux";
import { getRangeCount, getResultByPrize } from "../utils/number";
import ReportCard from "../components/ReportPrizeCard";
import PdfGenerator from "../components/PdfGenerator";
import { pdf } from "@react-pdf/renderer";

interface Values {
  even: number;
  odd: number;
  prime: number;
}

interface ResultItem {
  key: string;
  type: "prime" | "even" | "odd"; // Adjust based on other possible types
  count: number;
  values: Values;
}
type TSub = {
  number: string[];
  range: { label: string; value: number }[];
  prize: string;
  count: number;
};

type TMain = {
  number: string[];
  range: { label: string; value: number }[];
  prize: string;
  count: number;
  result: ResultItem[];
};

export interface IReportData {
  lotteryName: string;
  lotteryCode: string;
  drawDate: string;
  first: {
    count: number;
    number: string;
    prize: string;
    agentName: string;
    agentCode: string;
    location: string;
  };
  consol: TSub;
  second: TSub;
  third: TSub;
  fourth: TMain;
  fifth: TMain;
  sixth: TMain;
  seventh: TMain;
  eighth: TMain;
  ninth: TMain;
}

export default function ReportPage() {
  const [reportData, setReportData] = useState<IReportData[]>([]);
  const lotteryData = useSelector((state: RootState) => state.dashboard);

  const generatePDF = async () => {
    const blob = await pdf(
      <PdfGenerator
        title="Lottery Report"
        content="This is the content of the PDF"
        lotteryData={reportData}
      />
    ).toBlob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "lottery_report.pdf";
    link.click();
  };

  const generateReport = (code: string) => {
    const record = lotteryData.find((item) => item.lottery_code === code);
    if (!record) return;

    const output = {
      lotteryName: record?.lottery_name,
      lotteryCode: record?.lottery_code,
      drawDate: record?.draw_date,
      first: {
        count: 1,
        number: record.first.lottery[0].lottery_number,
        agentName: record.first.lottery[0].agent_name || "-",
        agentCode: record.first.lottery[0].agent_code || "-",
        location: record.first.lottery[0].location || "-",
        prize: record.first.prize,
      },
      consol: {
        number: record.consolation.lottery.map(
          (item: { lottery_number: string }) => item.lottery_number
        ),
        range: [],
        prize: record.consolation.prize,
        count: record.consolation.count,
      },
      second: {
        number: record.second.lottery.map(
          (item: { lottery_number: string }) => item.lottery_number
        ),
        range: [],
        prize: record.second.prize,
        count: record.second.count,
      },
      third: {
        number: record.third.lottery.map(
          (item: { lottery_number: string }) => item.lottery_number
        ),
        range: [],
        prize: record.third.prize,
        count: record.third.count,
      },
      fourth: {
        number: record.fourth.lottery.map(
          (item: { lottery_number: string }) => item.lottery_number
        ),
        range: getRangeCount(
          record.fourth.lottery.map((item) => item.lottery_number)
        ),
        prize: record.fourth.prize,
        count: record.fourth.count,
        result: getResultByPrize(record?.fourth.lottery),
      },
      fifth: {
        number: record.fifth.lottery.map(
          (item: { lottery_number: string }) => item.lottery_number
        ),
        range: getRangeCount(
          record.fifth.lottery.map((item) => item.lottery_number)
        ),
        prize: record.fifth.prize,
        count: record.fifth.count,
        result: getResultByPrize(record?.fifth.lottery),
      },
      sixth: {
        number: record.sixth.lottery.map(
          (item: { lottery_number: string }) => item.lottery_number
        ),
        range: getRangeCount(
          record.sixth.lottery.map((item) => item.lottery_number)
        ),
        prize: record.sixth.prize,
        count: record.sixth.count,
        result: getResultByPrize(record?.sixth.lottery),
      },
      seventh: {
        number: record.seventh.lottery.map(
          (item: { lottery_number: string }) => item.lottery_number
        ),
        range: getRangeCount(
          record.seventh.lottery.map((item) => item.lottery_number)
        ),
        prize: record.seventh.prize,
        count: record.seventh.count,
        result: getResultByPrize(record?.seventh.lottery),
      },
      eighth: {
        number: record.eighth.lottery.map(
          (item: { lottery_number: string }) => item.lottery_number
        ),
        range: getRangeCount(
          record.eighth.lottery.map((item) => item.lottery_number)
        ),
        prize: record.eighth.prize,
        count: record.eighth.count,
        result: getResultByPrize(record?.eighth.lottery),
      },
      ninth: {
        number: record.ninth.lottery.map(
          (item: { lottery_number: string }) => item.lottery_number
        ),
        range: getRangeCount(
          record.ninth.lottery.map((item) => item.lottery_number)
        ),
        prize: record.ninth.prize,
        count: record.ninth.count,
        result: getResultByPrize(record?.ninth.lottery),
      },
    };
    // need to fix later
    setReportData([output]);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div>
        <h3 className="text-3xl font-extrabold mb-6 text-center text-indigo-700">
          Report Page
        </h3>

        {/* Lottery List */}
        <div className="flex flex-wrap justify-center gap-6">
          {lotteryData.map((item: any, index: number) => (
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
                  generateReport(item.lottery_code);
                }}
              >
                Get Report
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Report Data Section */}
      {reportData.length > 0 && (
        <div className="flex flex-col min-h-full border rounded mt-2 p-2">
          {reportData.map((reportObj: any, mainIndex: number) => (
            <div key={mainIndex} className="w-full  mx-auto">
              {/* Lottery Information Header */}
              <div className="flex flex-row border-b pb-1">
                <div className="w-full  border-gray-600 mb-4">
                  <h3 className="text-2xl font-semibold text-indigo-600">
                    {reportObj.lotteryName}
                  </h3>
                  <h2 className="text-lg text-gray-700">
                    {`${reportObj.drawDate} - ${reportObj.lotteryCode}`}
                  </h2>
                </div>
                <button
                  onClick={generatePDF}
                  className="px-1 py-1 h-[50px] bg-indigo-600 text-white rounded-md text-xs font-medium transition-all duration-200 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 active:bg-indigo-800"
                >
                  Export
                </button>
              </div>

              {/* Prize Sections */}
              <div className="space-y-4">
                <ReportCard
                  prizeTitle="First Prize"
                  prize={reportObj.first.prize}
                  count={reportObj.first.count}
                  numberList={reportObj.first.number}
                  rangeList={[]}
                />

                <ReportCard
                  prizeTitle="Consolation Prize"
                  prize={reportObj.consol.prize}
                  count={reportObj.consol.count}
                  numberList={reportObj.consol.number}
                  rangeList={reportObj.consol.range}
                />

                <ReportCard
                  prizeTitle="Second Prize"
                  prize={reportObj.second.prize}
                  count={reportObj.second.count}
                  numberList={reportObj.second.number}
                  rangeList={reportObj.second.range}
                />

                <ReportCard
                  prizeTitle="Third Prize"
                  prize={reportObj.third.prize}
                  count={reportObj.third.count}
                  numberList={reportObj.third.number}
                  rangeList={reportObj.third.range}
                />

                <ReportCard
                  prizeTitle="Fourth Prize"
                  prize={reportObj.fourth.prize}
                  count={reportObj.fourth.count}
                  numberList={reportObj.fourth.number}
                  rangeList={reportObj.fourth.range}
                  result={reportObj.fourth.result}
                />

                <ReportCard
                  prizeTitle="Fifth Prize"
                  prize={reportObj.fifth.prize}
                  count={reportObj.fifth.count}
                  numberList={reportObj.fifth.number}
                  rangeList={reportObj.fifth.range}
                  result={reportObj.fifth.result}
                />

                <ReportCard
                  prizeTitle="Sixth Prize"
                  prize={reportObj.sixth.prize}
                  count={reportObj.sixth.count}
                  numberList={reportObj.sixth.number}
                  rangeList={reportObj.sixth.range}
                  result={reportObj.sixth.result}
                />

                <ReportCard
                  prizeTitle="Seventh Prize"
                  prize={reportObj.seventh.prize}
                  count={reportObj.seventh.count}
                  numberList={reportObj.seventh.number}
                  rangeList={reportObj.seventh.range}
                  result={reportObj.seventh.result}
                />

                <ReportCard
                  prizeTitle="Eighth Prize"
                  prize={reportObj.eighth.prize}
                  count={reportObj.eighth.count}
                  numberList={reportObj.eighth.number}
                  rangeList={reportObj.eighth.range}
                  result={reportObj.eighth.result}
                />

                <ReportCard
                  prizeTitle="Ninth Prize"
                  prize={reportObj.ninth.prize}
                  count={reportObj.ninth.count}
                  numberList={reportObj.ninth.number}
                  rangeList={reportObj.ninth.range}
                  result={reportObj.ninth.result}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
