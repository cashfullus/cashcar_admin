import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as HomeSvg } from 'assets/home.svg';
import { ReactComponent as AdListSvg } from 'assets/ad-list.svg';
import { ReactComponent as AllUsersSvg } from 'assets/all-users.svg';
import { ReactComponent as AdApplySvg } from 'assets/ad-apply.svg';
import { ReactComponent as MissionCertifiedSvg } from 'assets/mission-certified.svg';
import { ReactComponent as PointSvg } from 'assets/point.svg';
import { ReactComponent as ContentsSvg } from 'assets/contents.svg';
import { ReactComponent as NoticeSvg } from 'assets/notice.svg';
import { ReactComponent as AdQnASvg } from 'assets/ad-qna.svg';
import { ReactComponent as ChartSvg } from 'assets/chart.svg';
import { ReactComponent as LogoutSvg } from 'assets/logout.svg';
import InfoIcon from '@material-ui/icons/Info';
import { BRAND_COLOR_DARK_ORANGE, GRAY_SCALE_BLACK, GRAY_SCALE_WHITE } from 'styles/color.constants';
import { DRAWER_WIDTH } from 'styles/size.constants';
import { NavLink, useLocation } from 'react-router-dom';
import routes from 'routes/index';
import { Collapse, List } from '@material-ui/core';
import Modal from 'components/modal/Modal';
import LogoutBox from 'components/modal/LogoutBox';
import useLogin from 'hooks/useLogin';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';

interface DrawerItemProps {
  linkTo: string;
  SvgIcon:
    | React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & {
          title?: string;
        }
      >
    | OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  collapse?: boolean;
  collapseItems?: { text: string; linkTo: string }[];
  text: string;
}

const DrawerContainer = styled.div`
  min-width: ${DRAWER_WIDTH};
  position: relative;
  height: 100%;
  overflow: auto;
  padding: 0 1rem;
  padding-top: 1.5rem;
  background-color: ${GRAY_SCALE_BLACK};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const DrawerItemCSS = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-decoration: none;
  color: ${GRAY_SCALE_WHITE};
`;

const DrawerItemContainer = styled(NavLink)`
  ${DrawerItemCSS}
`;

const LogoutButton = styled.button`
  ${DrawerItemCSS}
  background-color: transparent;
  border: none;
  padding: 0;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
`;

const DrawerItem: React.FC<DrawerItemProps & { style?: React.CSSProperties }> = React.memo(
  ({ linkTo, SvgIcon, text, collapse, style }) => {
    return (
      <DrawerItemContainer
        to={linkTo}
        exact={linkTo === '/'}
        isActive={(_, location) => location.pathname.split('/')[1] === linkTo.split('/')[1]}
        activeStyle={{ color: BRAND_COLOR_DARK_ORANGE }}
        style={{ ...(!collapse && { marginBottom: '2rem' }), ...style }}
      >
        <SvgIcon style={{ marginRight: '1rem' }} />
        <div>{text}</div>
      </DrawerItemContainer>
    );
  },
);

const DrawerCollapseItem: React.FC<DrawerItemProps> = React.memo(({ collapseItems = [], linkTo, text, SvgIcon }) => {
  const location = useLocation();
  const isMatch = location.pathname.split('/')[1] === linkTo.split('/')[1];
  const [open, setOpen] = useState(isMatch);
  useEffect(() => {
    setOpen(isMatch);
  }, [location, isMatch]);
  return (
    <div style={{ marginBottom: '2rem' }}>
      <DrawerItemContainer
        to={linkTo}
        isActive={() => isMatch}
        activeStyle={{ color: BRAND_COLOR_DARK_ORANGE }}
        style={{ marginBottom: '0' }}
      >
        <SvgIcon style={{ marginRight: '1rem' }} />
        <div>{text}</div>
      </DrawerItemContainer>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {collapseItems.map(({ text, linkTo }) => (
            <DrawerItemContainer key={linkTo} to={linkTo} exact activeStyle={{ color: BRAND_COLOR_DARK_ORANGE }}>
              <div
                style={{
                  width: '100%',
                  paddingLeft: '3rem',
                  marginTop: '1rem',
                }}
              >
                {text}
              </div>
            </DrawerItemContainer>
          ))}
        </List>
      </Collapse>
    </div>
  );
});

const drawerItems: DrawerItemProps[] = [
  {
    linkTo: routes.home,
    SvgIcon: HomeSvg,
    text: '메인',
  },
  {
    linkTo: routes.adList,
    SvgIcon: AdListSvg,
    text: '광고 목록',
  },
  {
    linkTo: routes.userList,
    SvgIcon: AllUsersSvg,
    text: '전체 회원',
  },
  {
    linkTo: routes.adApplyList,
    SvgIcon: AdApplySvg,
    text: '광고 신청 회원',
  },
  {
    linkTo: routes.certified,
    SvgIcon: MissionCertifiedSvg,
    text: '미션 인증 관리',
    collapse: true,
    collapseItems: [
      { text: '미션인증', linkTo: routes.certified },
      { text: '드라이빙', linkTo: routes.driving },
    ],
  },
  {
    linkTo: routes.pointOverview,
    SvgIcon: PointSvg,
    text: '포인트 관리',
    collapse: true,
    collapseItems: [
      { text: '전체', linkTo: routes.pointOverview },
      { text: '출금하기', linkTo: routes.pointWithdraw },
      { text: '기부하기', linkTo: routes.pointDonate },
    ],
  },
  {
    linkTo: routes.contentCashcarTip,
    SvgIcon: ContentsSvg,
    text: '컨텐츠 관리',
    collapse: true,
    collapseItems: [
      { text: '캐시카팁', linkTo: routes.contentCashcarTip },
      { text: '공지사항', linkTo: routes.contentNotification },
      { text: 'Q&A', linkTo: routes.contentQna },
    ],
  },
  {
    linkTo: routes.alarmPush,
    SvgIcon: NoticeSvg,
    text: '알림 관리',
    collapse: true,
    collapseItems: [
      { text: 'Push', linkTo: routes.alarmPush },
      { text: '문자', linkTo: routes.alarmSMS },
      { text: '메일', linkTo: routes.alarmEmail },
    ],
  },
  {
    linkTo: routes.adQna,
    SvgIcon: AdQnASvg,
    text: '광고주 문의',
  },
  {
    linkTo: routes.chart,
    SvgIcon: ChartSvg,
    text: '통계',
  },
];

const Drawer = () => {
  const { logout } = useLogin();
  const [logoutModal, setLogoutModal] = useState(false);
  const onClose = () => setLogoutModal(false);
  const onLogout = () => {
    logout();
    onClose();
  };
  return (
    <DrawerContainer>
      {drawerItems.map(item =>
        item.collapse ? <DrawerCollapseItem key={item.text} {...item} /> : <DrawerItem key={item.text} {...item} />,
      )}
      <LogoutButton onClick={() => setLogoutModal(true)}>
        <LogoutSvg style={{ marginRight: '1rem' }} />
        <div>로그아웃</div>
      </LogoutButton>
      <div style={{ flex: 1, fontSize: '0.75rem', display: 'flex', alignItems: 'flex-end' }}>
        <DrawerItem
          linkTo={routes.release}
          text="Ver 0.1.0"
          SvgIcon={InfoIcon}
          style={{ marginTop: '2rem', marginBottom: '1rem' }}
        />
      </div>
      {logoutModal && (
        <Modal onClose={onClose}>
          <LogoutBox onClose={onClose} onLogout={onLogout} />
        </Modal>
      )}
    </DrawerContainer>
  );
};

export default React.memo(Drawer);
