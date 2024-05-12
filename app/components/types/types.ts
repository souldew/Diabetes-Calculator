export type CalculateSettings = {
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
  recieveMinimunUnit: {
    alcohol: number | string;
    glucoseNeedle: number | string;
    LFS: number | string;
    insulinNeedle: number | string;
    fastActingInsulin: number | string;
    longActingInsulin: number | string;
  };
  reserveDays: number | string;
};
