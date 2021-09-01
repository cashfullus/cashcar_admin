import React from 'react';
import { RootData } from 'types/common';
import instanceOfType from 'lib/instanceOfType';
import { ExtendedAD, AD_DISCRIMINATOR } from 'lib/modules/ad';
import ADDetail from 'components/detail/ADDetail';
import { ExtendedUser, USER_DISCRIMINATOR } from 'lib/modules/users';
import UserDetail from 'components/detail/UserDetail';
import { CERTIFIED_DISCRIMINATOR, ExtendedCertified } from 'lib/modules/certified-mission';
import CertifiedDetail from 'components/detail/CertifiedDetail';
import ExtendedAccordion from 'components/shared/ExtendedAccordion';
import { ExtendedPoint, POINT_DISCRIMINATOR } from 'lib/modules/point-overview';
import PointDetail from 'components/detail/PointDetail';
import useItemColumn, { ListItemProps } from 'hooks/list/useItemColumn';

const AccordionListItem = <Data extends RootData>({ checked, onCheckboxClick, keyAndColumns, data }: ListItemProps<Data>) => {
  const { gridColumns } = useItemColumn({ keyAndColumns, data });
  return (
    <ExtendedAccordion checked={checked} onCheckboxClick={() => onCheckboxClick && onCheckboxClick(data)} columns={gridColumns}>
      {instanceOfType<ExtendedAD>(data, AD_DISCRIMINATOR) && <ADDetail data={data} />}
      {instanceOfType<ExtendedUser>(data, USER_DISCRIMINATOR) && <UserDetail data={data} />}
      {instanceOfType<ExtendedCertified>(data, CERTIFIED_DISCRIMINATOR) && <CertifiedDetail data={data} />}
      {instanceOfType<ExtendedPoint>(data, POINT_DISCRIMINATOR) && <PointDetail data={data} />}
    </ExtendedAccordion>
  );
};

export default React.memo(AccordionListItem) as typeof AccordionListItem;
