import {Injectable} from '@angular/core';
import {PollResults} from "./model";
import {API_URL} from "../../config";


interface GetAllPollsApiResponse {
  readonly results: PollResults,
}

@Injectable({
  providedIn: 'root'
})
export class PollResultsService {
  get pollResults(): Promise<PollResults> {
    return fetch(`${API_URL}/game/polls/all`, {
      method: "get"
    }).then(response => {
      if (response.ok) {
        return (response.json() as Promise<GetAllPollsApiResponse>)
          .then(apiResponse => apiResponse.results)
      } else {
        return response.text().then(text => {
          throw new Error(`Request for poll results failed: ${text}`);
        });
      }
    })
  }
}
