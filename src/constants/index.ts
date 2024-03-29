import {
  IObjectiveItem,
  IObjectiveDataResponse,
} from "../types/objective.type";

export const objective: IObjectiveItem[] = [
  {
    objectiveName: "Pushups",
    currentAmount: 0,
    amountToComplete: 0,
    get progress() {
      return (this.currentAmount / this.amountToComplete) * 100;
    },
    completed: false,
  },
];

export const defaultObjectiveResponse: IObjectiveDataResponse[] = [
  {
    objectiveName: "",
    currentAmount: 0,
    amountToComplete: 0,
    progress: 0,
    completed: false,
    id: "00000000-0000-0000-0000-000000000000",
    addedDate: "2000-01-00T00:00:00.000000",
    updatedDate: "2000-01-00T00:00:00.000000",
    status: 1,
  },
];
