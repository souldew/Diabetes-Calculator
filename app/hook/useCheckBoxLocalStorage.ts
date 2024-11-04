"use client";

import React, { useEffect, useState } from "react";

export default function useCheckBoxLocalStorage(key: string) {
  // const getIsLibreFromLocalStorage = () => {
  //   if (typeof window == "undefined") {
  //     return false;
  //   }
  //   const storedValue = localStorage.getItem(key);
  //   if (storedValue) {
  //     return JSON.parse(storedValue);
  //   } else {
  //     return false;
  //   }
  // };
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleIsChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("useCheckBoxLocalStorage handleIsChecked call");
    setIsChecked(event.target.checked);
    localStorage.setItem(key, JSON.stringify(event.target.checked));
    console.log("value check", isChecked);
  };

  useEffect(() => {
    if (typeof window == "undefined") {
      return;
    }
    const storedValue: string | null = localStorage.getItem(key);
    // storedValueがnullの場合は処理を行わない
    if (storedValue && storedValue !== "undefined") {
      setIsChecked(JSON.parse(storedValue)!);
    }
    return;
  }, [key]);

  useEffect(() => {
    if (typeof window == "undefined") {
      return;
    }
    const storedValue = localStorage.getItem("isLibre");
    if (storedValue != null && storedValue != "undefined") {
      console.log("aiu", typeof storedValue);
      if (storedValue == "true") {
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }
      // setIsChecked(storedValue as unknown as boolean);
    }
  }, [key, isChecked]);

  return [isChecked, handleIsChecked] as const;
}
