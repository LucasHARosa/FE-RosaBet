"use client";
import { useContext, useState, useCallback, useEffect } from "react";
import { UserContext } from "@/contexts/UserContext";
import { updateMe } from "@/service/auth";
import debounce from "lodash/debounce";

export default function useLimits() {
  const { getUser, handleUser } = useContext(UserContext);
  const [limits, setLimits] = useState({
    _1_day: getUser.self_limits?.deposit?._1_day || 0,
    _7_days: getUser.self_limits?.deposit?._7_days || 0,
    _30_days: getUser.self_limits?.deposit?._30_days || 0,
  });

  const handleLimits = useCallback(
    debounce((value: any) => {
      updateMe({ self_limits: { deposit: value } }).then((newUser) => {
        handleUser(newUser);
      });
    }, 300),
    [],
  );

  const handleInputChange = (value: any) => {
    setLimits(value);
    handleLimits(value);
  };

  useEffect(() => {
    setLimits({
      _1_day: getUser.self_limits?.deposit?._1_day || 0,
      _7_days: getUser.self_limits?.deposit?._7_days || 0,
      _30_days: getUser.self_limits?.deposit?._30_days || 0,
    });
  }, [getUser]);

  return { getUser, limits, setLimits, handleInputChange };
}
