import { useMemo } from "react";

import { useApiBase } from "../ApiContext";
import { LessonsApi } from "./LessonsApi";

interface Props {
  readonly LessonsApi: LessonsApi;
}

export function useLessonContext(): Props {
  const data = useApiBase();

  const api = useMemo(() => new LessonsApi(data), [data]);

  return {
    LessonsApi: api,
  };
}