import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import routes from '.';
import HomePage from 'pages/home/HomePage';
import AdListPage from 'pages/ad/AdListPage';
import UserListPage from 'pages/UserListPage';
import AdApplyListPage from 'pages/ad/AdApplyListPage';
import PointOverviewPage from 'pages/point/PointOverviewPage';
import ContentCashcarTipPage from 'pages/content/ContentCashcarTipPage';
import AlarmPushPage from 'pages/alarm/AlarmPushPage';
import AdQnAPage from 'pages/ad/AdQnAPage';
import ChartPage from 'pages/ChartPage';
import CertifiedMissionPage from 'pages/mission/CertifiedMissionPage';
import DrivingMissionPage from 'pages/mission/DrivingMissionPage';
import PointWithdrawPage from 'pages/point/PointWithdrawPage';
import PointDonatePage from 'pages/point/PointDonatePage';
import AdListFormPage from 'pages/ad/AdListFormPage';
import AlarmSMSPage from 'pages/alarm/AlarmSMSPage';
import AlarmEmailPage from 'pages/alarm/AlarmEmailPage';
import useInitialization from 'hooks/useInitialization';
import ContentNotificationPage from 'pages/content/ContentNotificationPage';
import ContentQNAPage from 'pages/content/ContentQNAPage';
import ReleasePage from 'pages/ReleasePage';

const Router = () => {
  useInitialization();
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={routes.home} component={HomePage} />
        <Route exact path={routes.adList} component={AdListPage} />
        <Route exact path={routes.editAD()} component={AdListFormPage} />
        <Route exact path={routes.createAD} component={AdListFormPage} />
        <Route exact path={routes.userList} component={UserListPage} />
        <Route exact path={routes.adApplyList} component={AdApplyListPage} />
        <Route exact path={routes.certified} component={CertifiedMissionPage} />
        <Route exact path={routes.driving} component={DrivingMissionPage} />
        <Route exact path={routes.pointOverview} component={PointOverviewPage} />
        <Route exact path={routes.pointWithdraw} component={PointWithdrawPage} />
        <Route exact path={routes.pointDonate} component={PointDonatePage} />
        <Route exact path={routes.contentCashcarTip} component={ContentCashcarTipPage} />
        <Route exact path={routes.contentNotification} component={ContentNotificationPage} />
        <Route exact path={routes.contentQna} component={ContentQNAPage} />
        <Route exact path={routes.alarmPush} component={AlarmPushPage} />
        <Route exact path={routes.alarmSMS} component={AlarmSMSPage} />
        <Route exact path={routes.alarmEmail} component={AlarmEmailPage} />
        <Route exact path={routes.adQna} component={AdQnAPage} />
        <Route exact path={routes.chart} component={ChartPage} />
        <Route exact path={routes.release} component={ReleasePage} />
        <Redirect from="*" to={routes.home} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
