import { Guid } from "guid-typescript";
import http from "../http-common";
import {
  IObjectiveDataRequest,
  IObjectiveDataResponse,
} from "@/types/objective.type";

class ObjectiveDataService {
  getAll() {
    return http.get<Array<IObjectiveDataResponse>>("/Objective");
  }
  get(id: Guid) {
    return http.get<IObjectiveDataResponse>(`/Objective/${id}`);
  }
  create(data: IObjectiveDataRequest) {
    return http.post<IObjectiveDataRequest>("/Objective/", data);
  }
  update(data: IObjectiveDataRequest, id: Guid) {
    return http.post<IObjectiveDataRequest>(`/Objective/${id}`, data);
  }
  delete(id: Guid) {
    return http.delete<any>(`/Objective/${id}`);
  }
}

export default new ObjectiveDataService();
