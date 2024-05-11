export type CalculateSettings = {
  consume: {
    insulin: {
      fast: {
        morning: number | undefined;
        noon: number | undefined;
        night: number | undefined;
      };
      long: {
        morning: number | undefined;
        noon: number | undefined;
        night: number | undefined;
      };
      dust: number | undefined;
    };
    alcohol: number | undefined;
    glucoseNeedle: number | undefined;
    LFS: number | undefined;
    insulinNeedle: number | undefined;
  };
  recieveMinimunUnit: {
    alcohol: number | undefined;
    glucoseNeedle: number | undefined;
    LFS: number | undefined;
    insulinNeedle: number | undefined;
    fastActingInsulin: number | undefined;
    longActingInsulin: number | undefined;
  };
  reserveDays: number | undefined;
};
