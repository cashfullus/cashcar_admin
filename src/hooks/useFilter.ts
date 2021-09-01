import { RootState } from "lib/modules";
import { FilterState, setFilter as setFilterAction } from "lib/modules/filter";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const useFilter = (field: keyof FilterState) => {
  const dispatch = useDispatch();
  const selectedFilter = useSelector((state: RootState) => state.filter[field]);
  const setFilter = useCallback(
    (value: any) => dispatch(setFilterAction({ field, value })),
    [dispatch, field]
  );
  return { setFilter, selectedFilter };
};

export default useFilter;
