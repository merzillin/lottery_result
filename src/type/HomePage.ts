export type LotteryDetails = {
  lottery_number: string;
  location?: string;
  agent_name?: string;
  agent_code?: string;
};

export type IndividualLottery = {
  count: number;
  prize: string;
  lottery: LotteryDetails[];
};

export type TLottery = {
  lottery_name: string;
  lottery_code: string;
  draw_date: string;
  first: IndividualLottery;
  consolation: IndividualLottery;
  second: IndividualLottery;
  third: IndividualLottery;
  fourth: IndividualLottery;
  fifth: IndividualLottery;
  sixth: IndividualLottery;
  seventh: IndividualLottery;
  eighth: IndividualLottery;
  ninth: IndividualLottery;
};
