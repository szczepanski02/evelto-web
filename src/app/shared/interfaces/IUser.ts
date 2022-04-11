import { Gender } from './../constants/gender';
import { AccountType } from '../constants/account-type';
import { ClientIsActive } from '../constants/client-is-active';
import { Lang } from '../constants/lang';

export interface IUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  lang: Lang;
  accountType: AccountType;
  createdBy: string;
  isActive: ClientIsActive;
  userDetails?: IUserDetails;
  refreshTokens?: IRefreshToken[];
}

export interface IUserDetails {
  id: number;
  profileImg?: string;
  phoneNumber?: string;
  birthDate?: Date;
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
  country?: string;
  city?: string;
  zipCode?: string;
  address1?: string;
  address2?: string;
}

export interface ICreatorDetails {
  id: number;
  verificated: boolean;
}
