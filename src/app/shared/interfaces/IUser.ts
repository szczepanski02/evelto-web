import { Gender } from './../constants/gender';
import { AccountType } from "../constants/account-type";
import { ClientIsActive } from "../constants/client-is-active";
import { Lang } from "../constants/lang";

export interface IUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  lang: Lang;
  accountType: AccountType;
  isActive: ClientIsActive;
  userDetails?: IUserDetails;
  refreshTokens?: IRefreshToken[];
}

export interface IUserDetails {
  id: string;
  profileImg?: string;
  bithDate?: Date;
  gender: Gender;
  createdAt: Date;
  userAddress?: IUserAddress;
}

export interface IRefreshToken {
  id: number;
  ipAddress: string;
  createdAt: Date;
  token: string;
}

export interface IUserAddress {
  id: number;
  country: string;
  city: string;
  zipCode: number;
  address1: string;
  address2: string;
}