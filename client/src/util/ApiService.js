import { API_URL, USER_ID } from "../constants";

export class ApiService {

  async request(url, options) {
    if (options?.body) {
      options = {
        ...options,
        headers: {
          ...options.headers,
          'Content-Type': 'application/json'
        }
      };
    }

    const res = await fetch(url, options);
    const json = await res.json();
    return json;
  }

  async getKnowledgeCheckBlocks() {
    return this.request(`${API_URL}knowledge-check-blocks`);
  }

  async getUserQuestionsState() {
    return this.request(`${API_URL}user-questions-state?userId=${USER_ID}`);
  }

  async updateQuestionState(questionId, questionState) {
    return this.request(`${API_URL}user-questions-state`, {
      method: "PUT",
      body: JSON.stringify({
        userId: USER_ID,
        questionId,
        questionState
      })
    });
  }

}

export default new ApiService();
