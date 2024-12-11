import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeConfig } from "@/store/configSlice";
import { RootState } from "@/store/store";
import {
  initializeConsumeMedicine,
  initializeMinUnitMedicine,
  initializeRestMedicine,
} from "@/store/medicineSlice";
import { initializeInsulin } from "@/store/insulinSlice";

export function ReduxInitProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  const isLibre = useSelector((state: RootState) => state.config.isLibre);
  useEffect(() => {
    dispatch(initializeConfig());
    dispatch(initializeConsumeMedicine());
    dispatch(initializeMinUnitMedicine());
    dispatch(initializeRestMedicine());
    dispatch(initializeInsulin());
  }, [dispatch]);

  // 遅延読み込み
  if (isLibre === undefined) return;

  return <>{children}</>;
}
