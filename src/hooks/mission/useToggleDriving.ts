import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  toggleDrivingAction as toggleDrivingMissionAction,
  selectDrivingListAction as selectAllDrivingMissionAction,
  deselectDrivingListAction as deselectAllDrivingMissionAction,
} from "lib/modules/driving-mission";

const useToggleDriving = () => {
  const dispatch = useDispatch();
  const toggleDriving = useCallback(
    (missionId: number) => dispatch(toggleDrivingMissionAction(missionId)),
    [dispatch]
  );
  const selectAllDriving = useCallback(
    () => dispatch(selectAllDrivingMissionAction()),
    [dispatch]
  );
  const deselectAllDriving = useCallback(
    () => dispatch(deselectAllDrivingMissionAction()),
    [dispatch]
  );
  return {
    toggleDriving,
    selectAllDriving,
    deselectAllDriving,
  };
};

export default useToggleDriving;
