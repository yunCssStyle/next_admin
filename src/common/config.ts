import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {
  ADMIN_LOG_TYPE_INSPECTION_CREATE,
  ADMIN_LOG_TYPE_INSPECTION_REMOVE,
  ADMIN_LOG_TYPE_INSPECTION_UPDATE,
  ADMIN_LOG_TYPE_INSPECTION_WLCREATE,
  ADMIN_LOG_TYPE_INSPECTION_WLCREMOVE,
  ADMIN_LOG_TYPE_PERMISSIONS,
  ADMIN_LOG_TYPE_REVENUEPOT_CALC,
  ADMIN_LOG_TYPE_SIGNUP,
  ADMIN_LOG_TYPE_USER_BLOCK,
  ADMIN_LOG_TYPE_USER_CLEAR,
  ADMIN_LOG_TYPE_USER_GOLDUPDATE,
  ADMIN_LOG_TYPE_USER_KICK,
  ADMIN_LOG_TYPE_USER_MININGCLEAR,
  ADMIN_LOG_TYPE_USER_NICKUPDATE,
  ADMIN_LOG_TYPE_USER_PFPREMOVE,
  ADMIN_LOG_TYPE_USER_S_BLOCK,
  ADMIN_LOG_TYPE_USER_S_CLEAR,
  ADMIN_LOG_TYPE_WLC_CREATE,
  ADMIN_LOG_TYPE_WLC_LEGENDUPDATE,
  ADMIN_LOG_TYPE_WLC_REMOVE,
  ADMIN_LOG_TYPE_WLC_UPDATE,
  BLOCK_STATUS_BLOCK,
  BLOCK_STATUS_CLEAR,
  BLOCK_STATUS_TEMP,
  INSPECT_LIMIT_TYPE_APP,
  INSPECT_LIMIT_TYPE_WEB,
  LOG_TYPE_ACCOUNT_LINK,
  LOG_TYPE_ATTACK,
  LOG_TYPE_COMBINE_MININGRIGHTS,
  LOG_TYPE_CONVERT_GOLD,
  LOG_TYPE_CONVERT_MININGRIGHTS,
  LOG_TYPE_CONVERT_MZT,
  LOG_TYPE_COUNTERATTACK,
  LOG_TYPE_CREATE_BOX,
  LOG_TYPE_DEFEND,
  LOG_TYPE_DELETE,
  LOG_TYPE_END_EXPLORATION,
  LOG_TYPE_END_TRANSPORT,
  LOG_TYPE_GET_BOX,
  LOG_TYPE_GET_EXPLORATION_BOX,
  LOG_TYPE_GET_GOLD,
  LOG_TYPE_GET_ITEM,
  LOG_TYPE_GET_PURCHASE_PRODUCTS,
  LOG_TYPE_LOCK_MININGRIGHTS,
  LOG_TYPE_LOCK_PFP,
  LOG_TYPE_LOGIN,
  LOG_TYPE_LOGOUT,
  LOG_TYPE_MUTATE_PFP,
  LOG_TYPE_NICK_CHANGE,
  LOG_TYPE_PACKING,
  LOG_TYPE_REGISTER_PFP,
  LOG_TYPE_RESERVATION_TRANSPORT,
  LOG_TYPE_RESET_ATTACK,
  LOG_TYPE_SET_MP,
  LOG_TYPE_SHORTEN_EXPLORATION,
  LOG_TYPE_SIGNUP,
  LOG_TYPE_START_EXPLORATION,
  LOG_TYPE_START_TRANSPORT,
  LOG_TYPE_UNLOCK_MININGRIGHTS,
  LOG_TYPE_UNLOCK_PFP,
  LOG_TYPE_UNPACKING,
  LOG_TYPE_USE_GOLD,
  LOG_TYPE_USE_ITEM,
  LOG_TYPE_WEB_ACCOUNT_CHANGE,
  PAYMENT_TYPE_CANCELED,
  PAYMENT_TYPE_COMPLETED,
  USER_GOLD_CHANGE_TYPE_MINUS,
  USER_GOLD_CHANGE_TYPE_PLUS,
  USER_PLATFORM_TYPE_ALL,
  USER_PLATFORM_TYPE_APPLE,
  USER_PLATFORM_TYPE_GOOGLE,
  USER_SEARCH_TYPE_APPLE,
  USER_SEARCH_TYPE_GOOGLE,
  USER_SEARCH_TYPE_NICKNAME,
  USER_SEARCH_TYPE_UID,
  USER_STATUS_ACTIVE,
  USER_STATUS_BLOCKED,
  USER_STATUS_DORMANCY,
  USER_STATUS_TEMP_BLOCKED,
  USER_STATUS_WITHDRAWAL,
  USER_TIER_PUBLIC,
  USER_TIER_ZONEA,
  USER_TIER_ZONEB,
  USER_TIER_ZONEC,
  USER_TIER_ZONED,
  USER_TRANSPORT_STATUS_FINISH,
  USER_TRANSPORT_STATUS_WAIT
} from '@/common/constant';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('UTC');

// UTC 기준 현재 날짜
export const nowDate = new Date(
  dayjs.utc(new Date()).format('YYYY-MM-DD HH:mm:ss')
);

// 탑/사이드 메뉴 정보 타입
type tabsType = {
  name: string;
  path: string;
};
export type subMenuType = {
  name: string;
  path: string;
  tabs?: tabsType[];
};
export type menuInfoType = {
  title: string;
  name: string;
  path: string;
  subMenu: subMenuType[];
};

export const authRoleInfo: { [key: string]: string } = {
  CS: '유저 조회',
  ALL: '유저 조회, 운영 관리, SC 관리'
};

// 탑/사이드 메뉴 정보
export const menuInfo = [
  {
    title: '유저 조회',
    name: '유저 조회',
    path: 'user',
    role: ['ALL', 'CS'],
    subMenu: [
      {
        name: '유저 정보',
        path: 'info',
        tabs: [
          { name: '기본 정보', path: 'information' },
          { name: 'PFP', path: 'pfp' },
          { name: '채굴권', path: 'miningrights' },
          { name: '아이템', path: 'items' },
          { name: '수송', path: 'transport' },
          { name: '탐사', path: 'exploration' },
          { name: '결제', path: 'payment' }
        ]
      },
      { name: '유저 로그', path: 'log' }
    ]
  },
  {
    title: '운영 관리',
    name: '운영 관리',
    path: 'operation',
    role: ['ALL'],
    subMenu: [
      {
        name: '유저 관리',
        path: 'management',
        tabs: [
          { name: '기본 정보', path: 'information' },
          { name: 'PFP', path: 'pfp' },
          { name: '채굴권', path: 'miningrights' },
          { name: '아이템', path: 'items' }
        ]
      },
      { name: '결제', path: 'payment' },
      { name: 'WL 컬렉션', path: 'wlcollection' },
      { name: '온체인 지급', path: 'onchain' },
      {
        name: '공지',
        path: 'notice',
        tabs: [
          { name: '인스턴스 메시지', path: '' },
          { name: '푸시 메시지', path: 'push' }
        ]
      },
      {
        name: '점검',
        path: 'inspect',
        tabs: [
          { name: '접속 차단', path: '' },
          { name: '점검 WL', path: 'wl' },
          { name: 'Kick', path: 'kick' }
        ]
      },
      { name: '작업 로그', path: 'log' }
    ]
  },
  {
    title: 'SC 관리',
    name: 'SC 관리',
    path: 'sc',
    role: ['ALL'],
    subMenu: [{ name: 'Gold Center', path: 'goldcenter' }]
  }
];

// 내정보 메뉴
export const userMenuInfo = [
  {
    title: 'Logout',
    name: 'Logout',
    path: 'login'
  }
];

// 유저 관리 - 계정 상태
export const userStatus = [
  { value: USER_STATUS_ACTIVE, label: '정상' },
  { value: USER_STATUS_DORMANCY, label: '휴면' },
  { value: USER_STATUS_WITHDRAWAL, label: '탈퇴' },
  { value: USER_STATUS_BLOCKED, label: '영구 정지' },
  { value: USER_STATUS_TEMP_BLOCKED, label: '기간 정지' }
];

// 유저 정보 조회 - 유저 검색 카테고리
export const searchUserType = [
  { value: USER_SEARCH_TYPE_UID, label: 'UID' },
  { value: USER_SEARCH_TYPE_NICKNAME, label: '닉네임' },
  { value: USER_SEARCH_TYPE_GOOGLE, label: '구글 E-mail' },
  { value: USER_SEARCH_TYPE_APPLE, label: '애플 E-mail' }
];

// 유저 정보 조회 - 유저 검색 카테고리
export const userTire = [
  { value: USER_TIER_PUBLIC, label: 'Public Zone' },
  { value: USER_TIER_ZONEA, label: 'Zone A' },
  { value: USER_TIER_ZONEB, label: 'Zone B' },
  { value: USER_TIER_ZONEC, label: 'Zone C' },
  { value: USER_TIER_ZONED, label: 'Zone D' }
];

// 유저 정보 조회 - 유저 검색 카테고리
export const transportStatus = [
  { value: USER_TRANSPORT_STATUS_WAIT, label: '대기' },
  { value: USER_TRANSPORT_STATUS_FINISH, label: '완료' }
];

// 유저 관리 - 골드 수량변경 증감
export const indecrease = [
  { value: USER_GOLD_CHANGE_TYPE_PLUS, label: '증가' },
  { value: USER_GOLD_CHANGE_TYPE_MINUS, label: '감소' }
];

// 유저 관리 - 변경 상태 선택
export const blockStatus = [
  { value: BLOCK_STATUS_CLEAR, label: '제한 해제' },
  { value: BLOCK_STATUS_BLOCK, label: '영구 제한' },
  { value: BLOCK_STATUS_TEMP, label: '기간 제한' }
];

// 유저 정보 조회 - 플랫폼 검색 타입
export const platformType = [
  { value: USER_PLATFORM_TYPE_GOOGLE, label: '구글' },
  { value: USER_PLATFORM_TYPE_APPLE, label: '애플' }
];

// 운영 관리 - 결제 검색 플랫폼
export const paymentPlatformType = [
  { value: USER_PLATFORM_TYPE_ALL, label: '전체' },
  { value: USER_PLATFORM_TYPE_GOOGLE, label: '구글' },
  { value: USER_PLATFORM_TYPE_APPLE, label: '애플' }
];

// 운영 관리 - 결제 상태
export const paymentType = [
  { value: PAYMENT_TYPE_COMPLETED, label: '구매 완료' },
  { value: PAYMENT_TYPE_CANCELED, label: '환불 완료' }
];

// 운영 관리 - 점검 - 접속 차단 유형
export const inspectLimitType = [
  { value: INSPECT_LIMIT_TYPE_APP, label: 'APP' },
  { value: INSPECT_LIMIT_TYPE_WEB, label: 'WEB' }
];

// 유저 로그 - 로그 종류
// ToDo: 로그 종류가 고정이 아니라면 API 필요
export const adminLogList = [
  { label: '계정 생성', value: ADMIN_LOG_TYPE_SIGNUP, checked: false },
  {
    label: '계정 권한 변경',
    value: ADMIN_LOG_TYPE_PERMISSIONS,
    checked: false
  },
  { label: 'User Kick', value: ADMIN_LOG_TYPE_USER_KICK, checked: false },
  {
    label: 'User 닉네임 변경',
    value: ADMIN_LOG_TYPE_USER_NICKUPDATE,
    checked: false
  },
  { label: '개별 계정 제한', value: ADMIN_LOG_TYPE_USER_BLOCK, checked: false },
  {
    label: '다중 계정 제한',
    value: ADMIN_LOG_TYPE_USER_S_BLOCK,
    checked: false
  },
  {
    label: '개별 계정 제한 해제',
    value: ADMIN_LOG_TYPE_USER_CLEAR,
    checked: false
  },
  {
    label: '다중 계정 제한 해제',
    value: ADMIN_LOG_TYPE_USER_S_CLEAR,
    checked: false
  },
  {
    label: 'User 골드 수량 변경',
    value: ADMIN_LOG_TYPE_USER_GOLDUPDATE,
    checked: false
  },
  { label: 'PFP 삭제', value: ADMIN_LOG_TYPE_USER_PFPREMOVE, checked: false },
  {
    label: '채굴권 해제',
    value: ADMIN_LOG_TYPE_USER_MININGCLEAR,
    checked: false
  },
  { label: 'WL 컬렉션 등록', value: ADMIN_LOG_TYPE_WLC_CREATE, checked: false },
  { label: 'WL 컬렉션 삭제', value: ADMIN_LOG_TYPE_WLC_REMOVE, checked: false },
  { label: 'WL 컬렉션 수정', value: ADMIN_LOG_TYPE_WLC_UPDATE, checked: false },
  {
    label: 'Legend PFP 스테이터스 변경',
    value: ADMIN_LOG_TYPE_WLC_LEGENDUPDATE,
    checked: false
  },
  {
    label: 'Revenue Pot 정산 요청',
    value: ADMIN_LOG_TYPE_REVENUEPOT_CALC,
    checked: false
  },
  {
    label: '접속 차단 일정 등록',
    value: ADMIN_LOG_TYPE_INSPECTION_CREATE,
    checked: false
  },
  {
    label: '접속 차단 일정 수정',
    value: ADMIN_LOG_TYPE_INSPECTION_UPDATE,
    checked: false
  },
  {
    label: '접속 차단 일정 삭제',
    value: ADMIN_LOG_TYPE_INSPECTION_REMOVE,
    checked: false
  },
  {
    label: '점검 WL 등록',
    value: ADMIN_LOG_TYPE_INSPECTION_WLCREATE,
    checked: false
  },
  {
    label: '점검 WL 삭제',
    value: ADMIN_LOG_TYPE_INSPECTION_WLCREMOVE,
    checked: false
  }
];

export const logList = [
  { label: '로그인', value: LOG_TYPE_LOGIN, checked: false },
  { label: '로그아웃', value: LOG_TYPE_LOGOUT, checked: false },
  { label: '계정 생성', value: LOG_TYPE_SIGNUP, checked: false },
  { label: '계정 삭제', value: LOG_TYPE_DELETE, checked: false },
  { label: '계정 연동', value: LOG_TYPE_ACCOUNT_LINK, checked: false },
  { label: '닉네임 변경', value: LOG_TYPE_NICK_CHANGE, checked: false },
  {
    label: '웹 계정 정보 변경',
    value: LOG_TYPE_WEB_ACCOUNT_CHANGE,
    checked: false
  },
  { label: '골드 획득', value: LOG_TYPE_GET_GOLD, checked: false },
  { label: '골드 소모', value: LOG_TYPE_USE_GOLD, checked: false },
  { label: '아이템 획득', value: LOG_TYPE_GET_ITEM, checked: false },
  { label: '아이템 소모', value: LOG_TYPE_USE_ITEM, checked: false },
  { label: '패킹', value: LOG_TYPE_PACKING, checked: false },
  { label: '언패킹', value: LOG_TYPE_UNPACKING, checked: false },
  { label: '골드 전환', value: LOG_TYPE_CONVERT_GOLD, checked: false },
  { label: 'MZT 전환', value: LOG_TYPE_CONVERT_MZT, checked: false },
  {
    label: '채굴권 전환',
    value: LOG_TYPE_CONVERT_MININGRIGHTS,
    checked: false
  },
  { label: '공격', value: LOG_TYPE_ATTACK, checked: false },
  { label: '방어', value: LOG_TYPE_DEFEND, checked: false },
  { label: '반격', value: LOG_TYPE_COUNTERATTACK, checked: false },
  { label: '공격 리스트 리셋', value: LOG_TYPE_RESET_ATTACK, checked: false },
  { label: 'PFP 등록', value: LOG_TYPE_REGISTER_PFP, checked: false },
  { label: 'PFP 스탯 변경', value: LOG_TYPE_MUTATE_PFP, checked: false },
  { label: 'PFP 장착', value: LOG_TYPE_LOCK_PFP, checked: false },
  { label: 'PFP 해제', value: LOG_TYPE_UNLOCK_PFP, checked: false },
  { label: '채굴권 장착', value: LOG_TYPE_LOCK_MININGRIGHTS, checked: false },
  {
    label: '채굴권 장착 해제',
    value: LOG_TYPE_UNLOCK_MININGRIGHTS,
    checked: false
  },
  {
    label: '채굴권 합성',
    value: LOG_TYPE_COMBINE_MININGRIGHTS,
    checked: false
  },
  { label: '박스 생성', value: LOG_TYPE_CREATE_BOX, checked: false },
  { label: '박스 획득', value: LOG_TYPE_GET_BOX, checked: false },
  { label: '채굴 파워 설정', value: LOG_TYPE_SET_MP, checked: false },
  { label: '수송 예약', value: LOG_TYPE_RESERVATION_TRANSPORT, checked: false },
  { label: '수송 시작', value: LOG_TYPE_START_TRANSPORT, checked: false },
  { label: '수송 종료', value: LOG_TYPE_END_TRANSPORT, checked: false },
  { label: '탐사 시작', value: LOG_TYPE_START_EXPLORATION, checked: false },
  {
    label: '탐사 시간 단축',
    value: LOG_TYPE_SHORTEN_EXPLORATION,
    checked: false
  },
  { label: '탐사 종료', value: LOG_TYPE_END_EXPLORATION, checked: false },
  {
    label: '탐사 보상 상자 획득',
    value: LOG_TYPE_GET_EXPLORATION_BOX,
    checked: false
  },
  {
    label: '유료 상품 구매',
    value: LOG_TYPE_GET_PURCHASE_PRODUCTS,
    checked: false
  }
];
