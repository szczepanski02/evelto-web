import { AccountType } from './../constants/account-type';
import { Lang } from './../constants/lang';

export interface IAuthorizatedUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  lang: Lang;
  accountType: AccountType;
}