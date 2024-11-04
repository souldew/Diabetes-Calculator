export type CalculateSettings = {
  // 1日消費量
  consume: {
    fastActingInsulin: {
      morning: string;
      noon: string;
      night: string;
    };
    longActingInsulin: {
      morning: string;
      noon: string;
      night: string;
    };
    dustInsulin: string;
    alcohol: string;
    glucoseNeedle: string;
    LFS: string;
    insulinNeedle: string;
  };
  // 最小受け取り単位
  recieveMinimunUnit: {
    alcohol: string;
    glucoseNeedle: string;
    LFS: string;
    insulinNeedle: string;
    fastActingInsulin: string;
    longActingInsulin: string;
  };
  // 残数
  rest: {
    alcohol: string;
    glucoseNeedle: string;
    LFS: string;
    insulinNeedle: string;
    fastActingInsulin: string;
    longActingInsulin: string;
    libre: string;
  };
  // 予備日数
  reserveDays: string;
  // 日付指定
  date: {
    today: Date;
    nextVisitDay: Date;
  };
};

export type Result = {
  required: {
    alcohol: number;
    glucoseNeedle: number;
    LFS: number;
    insulinNeedle: number;
    fastActingInsulin: number;
    longActingInsulin: number;
    libre: number;
  };
  plusSpared: {
    alcohol: number;
    glucoseNeedle: number;
    LFS: number;
    insulinNeedle: number;
    fastActingInsulin: number;
    longActingInsulin: number;
    libre: number;
  };
  recieved: {
    alcohol: number;
    glucoseNeedle: number;
    LFS: number;
    insulinNeedle: number;
    fastActingInsulin: number;
    longActingInsulin: number;
    libre: number;
  };
};
