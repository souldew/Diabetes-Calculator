export type CalculateSettings = {
  consume: {
    insulin: {
      fast: {
        morning: number;
        noon: number;
        night: number;
      };
      long: {
        morning: number;
        noon: number;
        night: number;
      };
      dust: number;
    };
    alcohol: number;
    glucoseNeedle: number;
    LFS: number;
    insulinNeedles: number;
  };
  recieveMinimunUnit: {
    alcohol: number;
    glucoseNeedle: number;
    LFS: number;
    insulinNeedle: number;
    fastActingInsulin: number;
    longActingInsulin: number;
  };
};
