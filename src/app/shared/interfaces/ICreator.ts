import { IUser } from "./IUser";

export interface ICreator extends IUser {
  creatorDetails: ICreatorDetails;
}

export interface ICreatorDetails {
  id: number;
  isVerificated: boolean;
}