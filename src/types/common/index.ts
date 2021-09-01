import { ExtendedADApply } from 'lib/modules/ad-apply';
import { ExtendedCertified } from 'lib/modules/certified-mission';
import { ExtendedDriving } from 'lib/modules/driving-mission';
import { ExtendedNotice } from 'lib/modules/notice';
import { ExtendedDonate } from 'lib/modules/point-donate';
import { ExtendedWithdraw } from 'lib/modules/point-withdraw';
import { ExtendedUser } from 'lib/modules/users';
import { ExtendedAD, ExtendedADUser } from 'src/lib/modules/ad';
import { ExtendedAppPush, ExtendedAppPushUser, ExtendedMarketingUser } from 'lib/modules/push';
import { ExtendedPoint } from 'lib/modules/point-overview';
import { ExtendedCashcarTip } from 'lib/modules/tip';

// dropdown 및 checkbox의 props에서 사용
export interface Option {
  label: string;
  value: string | number;
}

export interface FilterItem {
  name: string;
  label: string;
  filters?: Option[];
  date?: boolean;
  range?: boolean;
  minPlaceholder?: string;
  maxPlaceholder?: string;
}

// AccordionList 및 그 하위 컴포넌트에서 사용
export type RootData =
  | ExtendedAD
  | ExtendedAppPush
  | ExtendedPoint
  | ExtendedCashcarTip
  | ExtendedMarketingUser
  | ExtendedAppPushUser
  | ExtendedADUser
  | ExtendedUser
  | ExtendedADApply
  | ExtendedCertified
  | ExtendedDriving
  | ExtendedWithdraw
  | ExtendedDonate
  | ExtendedNotice;
