import { IRepository } from "./IRepository";

export interface IGetRepositoriesResponse {
    user: {
        avatarUrl: string,
        id: string,
        repositories: {
            nodes: IRepository[]
        },
        starredRepositories: {
            nodes: IRepository[]
        },
    } | null | undefined
}