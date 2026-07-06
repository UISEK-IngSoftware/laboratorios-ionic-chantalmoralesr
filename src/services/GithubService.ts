import axios from "axios";
import { Repository } from "../interfaces/Repository";
import { RepositoryPayload } from "../interfaces/RepositoryPayload";
import { GithubUser } from "../interfaces/GithubUser";

const GITHUB_API_URL =
  import.meta.env.VITE_GITHUB_API_URL || "https://api.github.com";
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const githubActions = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
  },
});

export const fetchRepositories = async (): Promise<Repository[]> => {
  try {
    const response = await githubActions.get<Repository[]>("/user/repos", {
      params: {
        per_page: 100,
        sort: "created",
        direction: "desc",
        t: Date.now(),
      },
    });

    return response.data as Repository[];
  } catch (error) {
    throw new Error("Error obteniendo repositorios: " + error);
  }
};

export const createRepository = async (
  repository: RepositoryPayload,
): Promise<Repository | null> => {
  try {
    const response = await githubActions.post("/user/repos", repository);
    return response.data as Repository;
  } catch (error) {
    throw new Error("Error creando repositorio: " + error);
  }
};

export const updateRepository = async (
  owner: string,
  repo: string,
  repository: RepositoryPayload,
): Promise<Repository | null> => {
  try {
    const response = await githubActions.patch(
      `/repos/${owner}/${repo}`,
      repository,
    );
    return response.data as Repository;
  } catch (error) {
    throw new Error("Error actualizando repositorio: " + error);
  }
};

export const deleteRepository = async (
  owner: string,
  repo: string,
): Promise<void> => {
  try {
    await githubActions.delete(`/repos/${owner}/${repo}`);
  } catch (error) {
    throw new Error("Error eliminando repositorio: " + error);
  }
};

export const getUserInfo = async (): Promise<GithubUser | null> => {
  try {
    const response = await githubActions.get("/user");
    return response.data as GithubUser;
  } catch (error) {
    throw new Error("Error obteniendo la información del usuario: " + error);
  }
};