/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { IReportData } from "../page/Report";

// Define the styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
    fontFamily: "Helvetica",
    backgroundColor: "#f4f4f9",
  },
  section: {
    marginBottom: 10,
    padding: 10,
    borderBottom: "1px solid #cccccc",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#2e3b4e",
  },
  header: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2e3b4e",
  },
  prizeTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#3b4c5d",
  },
  prizeText: {
    fontSize: 12,
    color: "#555555",
    marginBottom: 4,
  },
  prizeBox: {
    marginBottom: 15,
    padding: 10,
    border: "1px solid #dcdcdc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  boldText: {
    fontWeight: "bold",
    color: "#333",
  },
  prizeDetails: {
    marginBottom: 5,
    fontSize: 12,
    color: "#555",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2d3b45",
    marginBottom: 10,
  },
  subSection: {
    marginBottom: 8,
  },
  listItem: {
    fontSize: 12,
    color: "#555",
    marginBottom: 4,
  },
  numberGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
  },
  numberBox: {
    width: "auto",
    margin: 3,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 3,
    paddingRight: 3,
    border: "1px solid #dcdcdc",
    borderRadius: 1,
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    fontSize: 8,
    color: "#333",
    minWidth: 30,
  },
  smallNumberBox: {
    margin: 3,
    padding: 3,
    border: "1px solid #dcdcdc",
    borderRadius: 1,
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    fontSize: 8,
    color: "#333",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rangeLabel: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 12,
    color: "#333",
  },
  rangeBox: {
    backgroundColor: "#f0f0f0",
    padding: 5,
    borderRadius: 5,
    border: "1px solid #dcdcdc",
    marginRight: 5,
    marginBottom: 5,
  },
  resultCard: {
    border: "1px solid #dcdcdc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  resultTitle: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 5,
  },
  resultText: {
    fontSize: 12,
    color: "#555",
    marginBottom: 3,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
  },
  gridItem: {
    margin: 3,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
    textAlign: "center",
    width: "auto",
  },
  rangeNumberLabel: {
    fontSize: 12,
    fontWeight: "medium",
    color: "#4a5568",
    marginBottom: 10,
  },
  rangeNumberGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  rangeNumberBox: {
    width: "auto",
    padding: 2,
    backgroundColor: "#f7fafc",
    borderRadius: 3,
    marginBottom: 5,
  },
  rangeNumberText: {
    fontSize: 8,
    color: "#4a5568",
  },
  resultContainer: {
    marginBottom: 10,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
  },
  probabilityTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  probabilityText: {
    fontSize: 12,
    color: "#555",
    marginBottom: 2,
  },

  resultDetails: {
    marginTop: 6,
  },
  resultItem: {
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center", // Aligns text items vertically in the center
    justifyContent: "space-between", // Distributes space evenly
    marginBottom: 6, // Space between each resultItem
  },
  probabilityKey: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#333",
    flex: 1, // Ensures the key takes as much space as needed
  },
  probabilityCount: {
    fontSize: 8,
    color: "#555",
    marginRight: 4,
  },
  valueText: {
    fontSize: 8,
    color: "#555",
    marginRight: 4,
  },
});

interface PdfGeneratorProps {
  title: string;
  content: string;
  lotteryData: IReportData[];
}

const PdfGenerator: React.FC<PdfGeneratorProps> = ({
  title,
  content,
  lotteryData,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Document Title */}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.prizeText}>{content}</Text>

        {/* Lottery Data Section */}
        {lotteryData && lotteryData.length > 0 && (
          <View style={styles.section}>
            {lotteryData.map((reportObj, index) => (
              <View key={index}>
                {/* Lottery Header */}
                <Text
                  style={styles.header}
                >{`Lottery Name: ${reportObj.lotteryName}`}</Text>
                <Text
                  style={styles.header}
                >{`Lottery Code: ${reportObj.lotteryCode}`}</Text>
                <Text
                  style={styles.header}
                >{`Draw Date: ${reportObj.drawDate}`}</Text>

                {/* First Prize Section */}
                <View style={styles.prizeBox}>
                  <Text style={styles.prizeTitle}>First Prize</Text>
                  <View style={styles.numberGrid}>
                    <Text style={styles.numberBox}>
                      {reportObj.first.number}
                    </Text>
                  </View>
                  <Text
                    style={styles.prizeText}
                  >{`Prize: ${reportObj.first.prize}`}</Text>
                  <Text
                    style={styles.prizeText}
                  >{`Count: ${reportObj.first.count}`}</Text>
                </View>

                {/* Consolation Prize Section */}
                <View style={styles.prizeBox}>
                  <Text style={styles.prizeTitle}>Consolation Prize</Text>
                  {reportObj.consol.number.length > 0 && (
                    <View style={styles.numberGrid}>
                      {reportObj.consol.number.map((num, idx) => (
                        <Text key={idx} style={styles.numberBox}>
                          {num}
                        </Text>
                      ))}
                    </View>
                  )}
                  <Text
                    style={styles.prizeText}
                  >{`Prize: ${reportObj.consol.prize}`}</Text>
                  <Text
                    style={styles.prizeText}
                  >{`Count: ${reportObj.consol.count}`}</Text>
                </View>

                {/* Second Prize Section */}
                <View style={styles.prizeBox}>
                  <Text style={styles.prizeTitle}>Second Prize</Text>
                  {reportObj.second.number.length > 0 && (
                    <View style={styles.numberGrid}>
                      {reportObj.second.number.map((num, idx) => (
                        <Text key={idx} style={styles.numberBox}>
                          {num}
                        </Text>
                      ))}
                    </View>
                  )}
                  <Text
                    style={styles.prizeText}
                  >{`Prize: ${reportObj.second.prize}`}</Text>
                  <Text
                    style={styles.prizeText}
                  >{`Count: ${reportObj.second.count}`}</Text>
                </View>

                {/* Third Prize Section */}
                <View style={styles.prizeBox}>
                  <Text style={styles.prizeTitle}>Third Prize</Text>
                  {reportObj.third.number.length > 0 && (
                    <View style={styles.numberGrid}>
                      {reportObj.third.number.map((num, idx) => (
                        <Text key={idx} style={styles.numberBox}>
                          {num}
                        </Text>
                      ))}
                    </View>
                  )}
                  <Text
                    style={styles.prizeText}
                  >{`Prize: ${reportObj.third.prize}`}</Text>
                  <Text
                    style={styles.prizeText}
                  >{`Count: ${reportObj.third.count}`}</Text>
                </View>

                {/* Fourth Prize Section */}
                <View style={styles.prizeBox}>
                  <Text style={styles.prizeTitle}>Fourth Prize</Text>
                  {reportObj.fourth.number.length > 0 && (
                    <View style={styles.numberGrid}>
                      {reportObj.fourth.number.map((num, idx) => (
                        <Text key={idx} style={styles.smallNumberBox}>
                          {num}
                        </Text>
                      ))}
                    </View>
                  )}
                  <Text
                    style={styles.prizeText}
                  >{`Prize: ${reportObj.fourth.prize}`}</Text>
                  <Text
                    style={styles.prizeText}
                  >{`Count: ${reportObj.fourth.count}`}</Text>
                  <>
                    {reportObj.fourth.range.length > 0 && (
                      <>
                        <Text style={styles.rangeNumberLabel}>Range</Text>
                        <View style={styles.rangeNumberGrid}>
                          {reportObj.fourth.range.map((item, idx) => (
                            <View key={idx} style={styles.rangeBox}>
                              <Text
                                style={styles.rangeNumberText}
                              >{`${item.label}: ${item.value}`}</Text>
                            </View>
                          ))}
                        </View>
                      </>
                    )}
                    {reportObj.fourth.result.map(
                      (resultObj: any, resultIdx) => {
                        return (
                          <View key={resultIdx} style={styles.resultContainer}>
                            {/* Displaying Probability and Count */}
                            <Text
                              style={styles.probabilityTitle}
                            >{`Probability: ${resultObj.type}`}</Text>
                            <Text
                              style={styles.probabilityText}
                            >{`Count: ${resultObj.count}`}</Text>

                            {/* Displaying Nested Values (even, odd, prime) */}
                            {resultObj.result.map(
                              (valueObj: any, idx: number) => (
                                <View key={idx} style={styles.resultDetails}>
                                  {valueObj.map(
                                    (recordObj: any, recordIdx: number) => (
                                      <View
                                        key={recordIdx}
                                        style={styles.resultItem}
                                      >
                                        <Text style={styles.probabilityKey}>
                                          {recordObj.key}
                                        </Text>
                                        <Text
                                          style={styles.probabilityCount}
                                        >{`Count: ${recordObj.count}`}</Text>
                                        <Text
                                          style={styles.valueText}
                                        >{`Even: ${recordObj.values.even}`}</Text>
                                        <Text
                                          style={styles.valueText}
                                        >{`Odd: ${recordObj.values.odd}`}</Text>
                                        <Text
                                          style={styles.valueText}
                                        >{`Prime: ${recordObj.values.prime}`}</Text>
                                      </View>
                                    )
                                  )}
                                </View>
                              )
                            )}
                          </View>
                        );
                      }
                    )}
                  </>
                </View>
                {/* Fifth Prize Section */}
                <View style={styles.prizeBox}>
                  <Text style={styles.prizeTitle}>Fifth Prize</Text>

                  {/* Displaying Numbers for Fifth Prize */}
                  {reportObj.fifth.number.length > 0 && (
                    <View style={styles.numberGrid}>
                      {reportObj.fifth.number.map((num, idx) => (
                        <Text key={idx} style={styles.smallNumberBox}>
                          {num}
                        </Text>
                      ))}
                    </View>
                  )}

                  {/* Displaying Prize and Count for Fifth Prize */}
                  <Text
                    style={styles.prizeText}
                  >{`Prize: ${reportObj.fifth.prize}`}</Text>
                  <Text
                    style={styles.prizeText}
                  >{`Count: ${reportObj.fifth.count}`}</Text>

                  {reportObj.fifth.range.length > 0 && (
                    <>
                      <Text style={styles.rangeNumberLabel}>Range</Text>
                      <View style={styles.rangeNumberGrid}>
                        {reportObj.fourth.range.map((item, idx) => (
                          <View key={idx} style={styles.rangeBox}>
                            <Text
                              style={styles.rangeNumberText}
                            >{`${item.label}: ${item.value}`}</Text>
                          </View>
                        ))}
                      </View>
                    </>
                  )}
                  {/* Iterating over the result data in Fifth Prize */}
                  {reportObj.fifth.result.map((resultObj: any, resultIdx) => {
                    return (
                      <View key={resultIdx} style={styles.resultContainer}>
                        {/* Displaying Probability and Count */}
                        <Text
                          style={styles.probabilityTitle}
                        >{`Probability: ${resultObj.type}`}</Text>
                        <Text
                          style={styles.probabilityText}
                        >{`Count: ${resultObj.count}`}</Text>

                        {/* Displaying Nested Values (even, odd, prime) */}
                        {resultObj.result.map((valueObj: any, idx: number) => (
                          <View key={idx} style={styles.resultDetails}>
                            {valueObj.map(
                              (recordObj: any, recordIdx: number) => (
                                <View key={recordIdx} style={styles.resultItem}>
                                  <Text style={styles.probabilityKey}>
                                    {recordObj.key}
                                  </Text>
                                  <Text
                                    style={styles.probabilityCount}
                                  >{`Count: ${recordObj.count}`}</Text>
                                  <Text
                                    style={styles.valueText}
                                  >{`Even: ${recordObj.values.even}`}</Text>
                                  <Text
                                    style={styles.valueText}
                                  >{`Odd: ${recordObj.values.odd}`}</Text>
                                  <Text
                                    style={styles.valueText}
                                  >{`Prime: ${recordObj.values.prime}`}</Text>
                                </View>
                              )
                            )}
                          </View>
                        ))}
                      </View>
                    );
                  })}
                </View>

                {/* Sixth Prize Section */}
                <View style={styles.prizeBox}>
                  <Text style={styles.prizeTitle}>Sixth Prize</Text>
                  {reportObj.sixth.number.length > 0 && (
                    <View style={styles.numberGrid}>
                      {reportObj.sixth.number.map((num, idx) => (
                        <Text key={idx} style={styles.smallNumberBox}>
                          {num}
                        </Text>
                      ))}
                    </View>
                  )}
                  <Text
                    style={styles.prizeText}
                  >{`Prize: ${reportObj.sixth.prize}`}</Text>
                  <Text
                    style={styles.prizeText}
                  >{`Count: ${reportObj.sixth.count}`}</Text>
                  {reportObj.sixth.range.length > 0 && (
                    <>
                      <Text style={styles.rangeNumberLabel}>Range</Text>
                      <View style={styles.rangeNumberGrid}>
                        {reportObj.sixth.range.map((item, idx) => (
                          <View key={idx} style={styles.rangeBox}>
                            <Text
                              style={styles.rangeNumberText}
                            >{`${item.label}: ${item.value}`}</Text>
                          </View>
                        ))}
                      </View>
                    </>
                  )}
                  {/* Iterating over the result data in Fifth Prize */}
                  {reportObj.sixth.result.map((resultObj: any, resultIdx) => {
                    return (
                      <View key={resultIdx} style={styles.resultContainer}>
                        {/* Displaying Probability and Count */}
                        <Text
                          style={styles.probabilityTitle}
                        >{`Probability: ${resultObj.type}`}</Text>
                        <Text
                          style={styles.probabilityText}
                        >{`Count: ${resultObj.count}`}</Text>

                        {/* Displaying Nested Values (even, odd, prime) */}
                        {resultObj.result.map((valueObj: any, idx: number) => (
                          <View key={idx} style={styles.resultDetails}>
                            {valueObj.map(
                              (recordObj: any, recordIdx: number) => (
                                <View key={recordIdx} style={styles.resultItem}>
                                  <Text style={styles.probabilityKey}>
                                    {recordObj.key}
                                  </Text>
                                  <Text
                                    style={styles.probabilityCount}
                                  >{`Count: ${recordObj.count}`}</Text>
                                  <Text
                                    style={styles.valueText}
                                  >{`Even: ${recordObj.values.even}`}</Text>
                                  <Text
                                    style={styles.valueText}
                                  >{`Odd: ${recordObj.values.odd}`}</Text>
                                  <Text
                                    style={styles.valueText}
                                  >{`Prime: ${recordObj.values.prime}`}</Text>
                                </View>
                              )
                            )}
                          </View>
                        ))}
                      </View>
                    );
                  })}
                </View>

                {/* Seventh Prize Section */}
                <View style={styles.prizeBox}>
                  <Text style={styles.prizeTitle}>Seventh Prize</Text>
                  {reportObj.seventh.number.length > 0 && (
                    <View style={styles.numberGrid}>
                      {reportObj.seventh.number.map((num, idx) => (
                        <Text key={idx} style={styles.smallNumberBox}>
                          {num}
                        </Text>
                      ))}
                    </View>
                  )}
                  <Text
                    style={styles.prizeText}
                  >{`Prize: ${reportObj.seventh.prize}`}</Text>
                  <Text
                    style={styles.prizeText}
                  >{`Count: ${reportObj.seventh.count}`}</Text>
                  <>
                    {reportObj.seventh.range.length > 0 && (
                      <>
                        <Text style={styles.rangeNumberLabel}>Range</Text>
                        <View style={styles.rangeNumberGrid}>
                          {reportObj.seventh.range.map((item, idx) => (
                            <View key={idx} style={styles.rangeBox}>
                              <Text
                                style={styles.rangeNumberText}
                              >{`${item.label}: ${item.value}`}</Text>
                            </View>
                          ))}
                        </View>
                      </>
                    )}
                  </>
                  {reportObj.seventh.result.map((resultObj: any, resultIdx) => {
                    return (
                      <View key={resultIdx} style={styles.resultContainer}>
                        {/* Displaying Probability and Count */}
                        <Text
                          style={styles.probabilityTitle}
                        >{`Probability: ${resultObj.type}`}</Text>
                        <Text
                          style={styles.probabilityText}
                        >{`Count: ${resultObj.count}`}</Text>

                        {/* Displaying Nested Values (even, odd, prime) */}
                        {resultObj.result.map((valueObj: any, idx: number) => (
                          <View key={idx} style={styles.resultDetails}>
                            {valueObj.map(
                              (recordObj: any, recordIdx: number) => (
                                <View key={recordIdx} style={styles.resultItem}>
                                  <Text style={styles.probabilityKey}>
                                    {recordObj.key}
                                  </Text>
                                  <Text
                                    style={styles.probabilityCount}
                                  >{`Count: ${recordObj.count}`}</Text>
                                  <Text
                                    style={styles.valueText}
                                  >{`Even: ${recordObj.values.even}`}</Text>
                                  <Text
                                    style={styles.valueText}
                                  >{`Odd: ${recordObj.values.odd}`}</Text>
                                  <Text
                                    style={styles.valueText}
                                  >{`Prime: ${recordObj.values.prime}`}</Text>
                                </View>
                              )
                            )}
                          </View>
                        ))}
                      </View>
                    );
                  })}
                </View>

                {/* Eighth Prize Section */}
                <View style={styles.prizeBox}>
                  <Text style={styles.prizeTitle}>Eighth Prize</Text>
                  {reportObj.eighth.number.length > 0 && (
                    <View style={styles.numberGrid}>
                      {reportObj.eighth.number.map((num, idx) => (
                        <Text key={idx} style={styles.smallNumberBox}>
                          {num}
                        </Text>
                      ))}
                    </View>
                  )}
                  <Text
                    style={styles.prizeText}
                  >{`Prize: ${reportObj.eighth.prize}`}</Text>
                  <Text
                    style={styles.prizeText}
                  >{`Count: ${reportObj.eighth.count}`}</Text>
                  <>
                    {reportObj.eighth.range.length > 0 && (
                      <>
                        <Text style={styles.rangeNumberLabel}>Range</Text>
                        <View style={styles.rangeNumberGrid}>
                          {reportObj.eighth.range.map((item, idx) => (
                            <View key={idx} style={styles.rangeBox}>
                              <Text
                                style={styles.rangeNumberText}
                              >{`${item.label}: ${item.value}`}</Text>
                            </View>
                          ))}
                        </View>
                      </>
                    )}
                  </>
                  {reportObj.eighth.result.map((resultObj: any, resultIdx) => {
                    return (
                      <View key={resultIdx} style={styles.resultContainer}>
                        {/* Displaying Probability and Count */}
                        <Text
                          style={styles.probabilityTitle}
                        >{`Probability: ${resultObj.type}`}</Text>
                        <Text
                          style={styles.probabilityText}
                        >{`Count: ${resultObj.count}`}</Text>

                        {/* Displaying Nested Values (even, odd, prime) */}
                        {resultObj.result.map((valueObj: any, idx: number) => (
                          <View key={idx} style={styles.resultDetails}>
                            {valueObj.map(
                              (recordObj: any, recordIdx: number) => (
                                <View key={recordIdx} style={styles.resultItem}>
                                  <Text style={styles.probabilityKey}>
                                    {recordObj.key}
                                  </Text>
                                  <Text
                                    style={styles.probabilityCount}
                                  >{`Count: ${recordObj.count}`}</Text>
                                  <Text
                                    style={styles.valueText}
                                  >{`Even: ${recordObj.values.even}`}</Text>
                                  <Text
                                    style={styles.valueText}
                                  >{`Odd: ${recordObj.values.odd}`}</Text>
                                  <Text
                                    style={styles.valueText}
                                  >{`Prime: ${recordObj.values.prime}`}</Text>
                                </View>
                              )
                            )}
                          </View>
                        ))}
                      </View>
                    );
                  })}
                </View>

                {/* Ninth Prize Section */}
                <View style={styles.prizeBox}>
                  <Text style={styles.prizeTitle}>Ninth Prize</Text>
                  {reportObj.ninth.number.length > 0 && (
                    <View style={styles.numberGrid}>
                      {reportObj.ninth.number.map((num, idx) => (
                        <Text key={idx} style={styles.smallNumberBox}>
                          {num}
                        </Text>
                      ))}
                    </View>
                  )}
                  <Text
                    style={styles.prizeText}
                  >{`Prize: ${reportObj.ninth.prize}`}</Text>
                  <Text
                    style={styles.prizeText}
                  >{`Count: ${reportObj.ninth.count}`}</Text>
                  <>
                    {reportObj.ninth.range.length > 0 && (
                      <>
                        <Text style={styles.rangeNumberLabel}>Range</Text>
                        <View style={styles.rangeNumberGrid}>
                          {reportObj.ninth.range.map((item, idx) => (
                            <View key={idx} style={styles.rangeBox}>
                              <Text
                                style={styles.rangeNumberText}
                              >{`${item.label}: ${item.value}`}</Text>
                            </View>
                          ))}
                        </View>
                      </>
                    )}
                  </>
                  {reportObj.ninth.result.map((resultObj: any, resultIdx) => {
                    return (
                      <View key={resultIdx} style={styles.resultContainer}>
                        {/* Displaying Probability and Count */}
                        <Text
                          style={styles.probabilityTitle}
                        >{`Probability: ${resultObj.type}`}</Text>
                        <Text
                          style={styles.probabilityText}
                        >{`Count: ${resultObj.count}`}</Text>

                        {/* Displaying Nested Values (even, odd, prime) */}
                        {resultObj.result.map((valueObj: any, idx: number) => (
                          <View key={idx} style={styles.resultDetails}>
                            {valueObj.map(
                              (recordObj: any, recordIdx: number) => (
                                <View key={recordIdx} style={styles.resultItem}>
                                  <Text style={styles.probabilityKey}>
                                    {recordObj.key}
                                  </Text>
                                  <Text
                                    style={styles.probabilityCount}
                                  >{`Count: ${recordObj.count}`}</Text>
                                  <Text
                                    style={styles.valueText}
                                  >{`Even: ${recordObj.values.even}`}</Text>
                                  <Text
                                    style={styles.valueText}
                                  >{`Odd: ${recordObj.values.odd}`}</Text>
                                  <Text
                                    style={styles.valueText}
                                  >{`Prime: ${recordObj.values.prime}`}</Text>
                                </View>
                              )
                            )}
                          </View>
                        ))}
                      </View>
                    );
                  })}
                </View>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default PdfGenerator;
