export type Gender = 0 | 1 | 2; // 0 = 무관, 1 = 남자, 2 = 여자
export type Marketing = 0 | 1; // 0 = 미동의, 1 = 동의
export type Supporters = 0 | 1; // 0 = 일반, 1 = 서포터즈

// scheduled(대기), ongoing(진행), done(종료)
export type ADStatus = 'scheduled' | 'ongoing' | 'done';

// reject(거절), success(성공 or 종료), accept(승인), stand_by(대기), fail(실패
export type ADApplyStatus = 'reject' | 'success' | 'accept' | 'stand_by';

// 미션 진행 현황(review(1차 인증), re_review(2차 인증) 같은 인증)
export type MissionStatus = 'review' | 're_review' | 'success' | 'reject' | 'fail';

// stand_by(대기), confirm(진행중), done(완료), reject(취소)
export type DonateStatus = 'stand_by' | 'confirm' | 'done' | 'reject';

// stand_by(대기), confirm(진행중), done(완료), reject(취소)
export type PointStatus = 'stand_by' | 'confirm' | 'done' | 'reject';

// stand_by(대기), fail(실패), success(성공)
export type AppPushStatus = 'stand_by' | 'fail' | 'success';
