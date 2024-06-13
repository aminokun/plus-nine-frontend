// import { Guid } from "guid-typescript";

export interface IObjectiveDataResponse {
  objectiveName: string;
  currentAmount: number;
  amountToComplete: number;
  progress: number;
  completed: boolean;
  id: string;
  userId: string;
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
  userId: string;
  objectiveName: string;
  currentAmount: number;
  amountToComplete: number;
  progress: number;
  completed: boolean;
}
