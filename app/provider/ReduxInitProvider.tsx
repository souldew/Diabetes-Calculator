import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeConfig } from "../store/configSlice";
import { RootState } from "../store/store";

export function ReduxInitProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  const isLibre = useSelector((state: RootState) => state.config.isLibre);
  useEffect(() => {
    dispatch(initializeConfig());
  }, [dispatch]);

  // 遅延読み込み
  if (isLibre === undefined) return;

  return <>{children}</>;
}
