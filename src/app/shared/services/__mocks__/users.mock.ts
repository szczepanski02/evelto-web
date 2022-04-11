import { ICreator } from './../../interfaces/ICreator';
import { AccountType } from '../../constants/account-type';
import { ClientIsActive } from '../../constants/client-is-active';
import { CreationStrategyEnum } from '../../constants/creation-strategy';
import { Gender } from '../../constants/gender';
import { Lang } from '../../constants/lang';

export const _userDBMock: ICreator[] = [
  {
    id: '2idamidbdag3ifjacasjnn',
    username: 'rszczepanski',
    firstName: 'Radosław',
    lastName: 'Szczepański',
    email: 'r.szczepanski02@gmail.com',
    isActive: ClientIsActive.IS_ACTIVE,
    createdBy: CreationStrategyEnum.GOOGLE,
    lang: Lang.PL,
    accountType: AccountType.CREATOR,
    userDetails: {
      id: 1,
      gender: Gender.MALE,
      phoneNumber: '+48 733 593 336',
      createdAt: new Date(),
      userAddress: {
        id: 1,
        country: 'Poland',
        city: 'Rudawa',
        zipCode: '32-064',
        address1: 'Krótka 7',
      },
    },
    creatorDetails: {
      id: 1,
      isVerificated: true,
    },
  },
  {
    id: '3ij2pojoaijdsaoidj2',
    username: 'jan.kowalski',
    firstName: 'Jan',
    lastName: 'Kowalski',
    email: 'jan.kowalski@domain.com',
    isActive: ClientIsActive.IS_ACTIVE,
    createdBy: 'LOCAL',
    lang: Lang.PL,
    accountType: AccountType.CREATOR,
    userDetails: {
      id: 6,
      gender: Gender.MALE,
      createdAt: new Date(),
      userAddress: {
        id: 6,
        country: 'Poland',
        city: 'Cracow',
        zipCode: '30-220',
        address1: 'Wrocławska 22',
      },
    },
    creatorDetails: {
      id: 6,
      isVerificated: true,
    },
  },
  {
    id: '323jip2jfpokfpmdq3',
    username: 'austin001',
    firstName: 'Austin',
    lastName: 'Park',
    email: 'austin.park001@gmail.com',
    isActive: ClientIsActive.IS_ACTIVE,
    createdBy: 'GOOGLE',
    lang: Lang.EN,
    accountType: AccountType.CREATOR,
    userDetails: {
      id: 11,
      gender: Gender.MALE,
      createdAt: new Date(),
      phoneNumber: '(469) 536-4663',
      userAddress: {
        id: 11,
        country: 'China',
        city: 'Munster',
        zipCode: '123678',
        address1: 'Pede. St. 976-4803',
      },
    },
    creatorDetails: {
      id: 11,
      isVerificated: true,
    },
  },
];
