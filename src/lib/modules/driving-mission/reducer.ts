import { createReducer } from "typesafe-actions";
import {
  DESELECT_DRIVING_LIST,
  SELECT_DRIVING_LIST,
  TOGGLE_DRIVING,
} from "./actions";
import { DrivingAction, DrivingState } from "./types";

const initialState: DrivingState = {
  item_count: 0,
  items: [
    {
      discriminator: "driving",
      id: 0,
      appliedAt: "0000.00.00(금) 00:00:00",
      certifiedPeriod: "0000.00.00",
      title: "asd fasdf asdfa fadsf",
      missionName: "a dfadsfasdfds",
      name: "asd fadsf f asd",
      contact: "000-0000-0000",
      status: "confirm",
    },
    {
      discriminator: "driving",
      id: 1,
      appliedAt: "0000.00.00(금) 00:00:00",
      certifiedPeriod: "0000.00.00",
      title: "asd fasdf asdfa fadsf",
      missionName: "a dfadsfasdfds",
      name: "asd fadsf f asd",
      contact: "000-0000-0000",
      status: "confirm",
    },
    {
      discriminator: "driving",
      id: 2,
      appliedAt: "0000.00.00(금) 00:00:00",
      certifiedPeriod: "0000.00.00",
      title: "asd fasdf asdfa fadsf",
      missionName: "a dfadsfasdfds",
      name: "asd fadsf f asd",
      contact: "000-0000-0000",
      status: "confirm",
    },
  ],
  selected: [],
};

const driving = createReducer<DrivingState, DrivingAction>(initialState, {
  [TOGGLE_DRIVING]: (state, { payload: drivingId }) => {
    let selected: number[];
    const driving = state.selected.find(id => id === drivingId);
    if (driving !== undefined) {
      selected = state.selected.filter(id => id !== driving);
    } else {
      selected = state.selected.concat(drivingId);
    }
    return { ...state, selected };
  },
  [SELECT_DRIVING_LIST]: state => {
    const selected = state.items.map(driving => driving.id);
    return { ...state, selected };
  },
  [DESELECT_DRIVING_LIST]: state => {
    return { ...state, selected: [] };
  },
});

export default driving;
