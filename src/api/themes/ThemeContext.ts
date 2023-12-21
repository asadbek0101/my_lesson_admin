import { useMemo } from "react";

import { useApiBase } from "../ApiContext";
import { ThemeApi } from "./ThemeApi";

interface Props {
  readonly ThemeApi: ThemeApi;
}

export function useThemeContext(): Props {
  const data = useApiBase();

  const api = useMemo(() => new ThemeApi(data), [data]);

  return {
    ThemeApi: api,
  };
}