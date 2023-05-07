import { EnumModel } from "../enum.model";

export interface MovieModel {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    type: number;
    country: string;
    gener: number;
    score: number;
    directorEmail: string;
    directorName: string;
}
