import axios from "axios";
import { Repository } from "../interfaces/Repository";

const GITHUB_API_URL =
  import.meta.env.VITE_GITHUB_API_URL || "https://api.github.com";
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const fetchRepositories = async (): Promise<Repository[]> => {
  try {
    const response = await axios.get<Repository[]>(
      `${GITHUB_API_URL}/user/repos`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
        params: {
          per_page: 100,
          sort: "created",
          direction: "desc",
        },
      },
    );

    return response.data as Repository[];
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
};