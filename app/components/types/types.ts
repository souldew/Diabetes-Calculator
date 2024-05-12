export type CalculateSettings = {
  // 1日消費量
  consume: {
    insulin: {
      fast: {
        morning: number | string;
        noon: number | string;
        night: number | string;
      };
      long: {
        morning: number | string;
        noon: number | string;
        night: number | string;
      };
      dust: number | string;
    };
    alcohol: number | string;
    glucoseNeedle: number | string;
    LFS: number | string;
    insulinNeedle: number | string;
  };
  // 最小受け取り単位
  recieveMinimunUnit: {
    alcohol: number | string;
    glucoseNeedle: number | string;
    LFS: number | string;
    insulinNeedle: number | string;
    fastActingInsulin: number | string;
    longActingInsulin: number | string;
  };
  // 残数
  rest: {
    alcohol: number | string;
    glucoseNeedle: number | string;
    LFS: number | string;
    insulinNeedle: number | string;
    fastActingInsulin: number | string;
    longActingInsulin: number | string;
  };
  // 予備日数
  reserveDays: number | string;
  // 日付指定
  date: {
    today: Date;
    nextVisitDay: Date;
  };
};
