// import { Guid } from "guid-typescript";

export interface IObjectiveDataResponse {
  objectiveName: string;
  currentAmount: number;
  amountToComplete: number;
  progress: number;
  completed: boolean;
  id: string;
  addedDate: string;
  updatedDate: string;
  status: number;
}
export interface IObjectiveDataRequest {
  objectiveName: string;
  currentAmount: number;
  amountToComplete: number;
  progress: number;
  completed: boolean;
}
export interface IObjectiveItem {
  objectiveId: string;
  objectiveName: string;
  currentAmount: number;
  amountToComplete: number;
  progress: number;
  completed: boolean;
}
