// 세션 유지 기간 (일)
export const SESSION_DAY = 1;

// 리스트 한페이지당 보이는 개시물수
export const PAGE_SIZE = 25;

// 검색된 데이터가 없을때
export const NO_SEARCH_DATA = 'NOSEARCHDATA';

// 검색된 유저정보가 없을때
export const MEMBER_NOT_FOUND = 'MEMBER_NOT_FOUND';

// 유저 조회/유저 관리 - 검색 타입
export const USER_SEARCH_TYPE_GOOGLE = 'GOOGLE';
export const USER_SEARCH_TYPE_APPLE = 'APPLE';
export const USER_SEARCH_TYPE_NICKNAME = 'NICKNAME';
export const USER_SEARCH_TYPE_UID = 'UID';

// 유저 조회/유저 관리 - 계정 상태
export const USER_STATUS_ACTIVE = 'ACTIVE';
export const USER_STATUS_DORMANCY = 'DORMANCY';
export const USER_STATUS_WITHDRAWAL = 'WITHDRAWAL';
export const USER_STATUS_BLOCKED = 'ETERNAL BLOCKED';
export const USER_STATUS_TEMP_BLOCKED = 'TEMP BLOCKED';

// 유저 조회/유저 관리 - 계정 상태 변경 스테이터스
export const BLOCK_STATUS_BLOCK = 'BLOCK';
export const BLOCK_STATUS_TEMP = 'TEMP';
export const BLOCK_STATUS_CLEAR = 'CLEAR';

// 유저 조회/유저 관리 - 플랫폼 검색 타입
export const USER_PLATFORM_TYPE_ALL = 'ALL';
export const USER_PLATFORM_TYPE_GOOGLE = 'GOOGLE';
export const USER_PLATFORM_TYPE_APPLE = 'APPLE';

// 유저 조회/유저 관리 - 티어
export const USER_TIER_PUBLIC = 'TIER_FREE';
export const USER_TIER_ZONEA = 'TIER_1';
export const USER_TIER_ZONEB = 'TIER_2';
export const USER_TIER_ZONEC = 'TIER_3';
export const USER_TIER_ZONED = 'TIER_4';

// 유저 조회/유저 관리 - 수송 상태
export const USER_TRANSPORT_STATUS_WAIT = 'WAIT';
export const USER_TRANSPORT_STATUS_FINISH = 'FINISH';

// 유저 관리 - 유저 Gold 수량 변경 증감
export const USER_GOLD_CHANGE_TYPE_PLUS = 'PLUS';
export const USER_GOLD_CHANGE_TYPE_MINUS = 'MINUS';

// 유저 관리 - items 수량 변경 증감
export const USER_ITEM_CHANGE_TYPE_PLUS = 'PLUS';
export const USER_ITEM_CHANGE_TYPE_MINUS = 'MINUS';

// 유저 관리 - 채굴권 상태
export const MINE_SLOT_FULL = 'MINE_SLOT_FULL';

// 유저 로그 유형
export const LOG_TYPE_LOGIN = 101;
export const LOG_TYPE_LOGOUT = 102;
export const LOG_TYPE_SIGNUP = 103;
export const LOG_TYPE_DELETE = 104;
export const LOG_TYPE_ACCOUNT_LINK = 105;
export const LOG_TYPE_NICK_CHANGE = 106;
export const LOG_TYPE_WEB_ACCOUNT_CHANGE = 107;
export const LOG_TYPE_GET_GOLD = 201;
export const LOG_TYPE_USE_GOLD = 202;
export const LOG_TYPE_GET_ITEM = 203;
export const LOG_TYPE_USE_ITEM = 204;
export const LOG_TYPE_PACKING = 205;
export const LOG_TYPE_UNPACKING = 206;
export const LOG_TYPE_CONVERT_GOLD = 207;
export const LOG_TYPE_CONVERT_MZT = 208;
export const LOG_TYPE_CONVERT_MININGRIGHTS = 209;
export const LOG_TYPE_ATTACK = 301;
export const LOG_TYPE_DEFEND = 302;
export const LOG_TYPE_COUNTERATTACK = 303;
export const LOG_TYPE_RESET_ATTACK = 304;
export const LOG_TYPE_REGISTER_PFP = 401;
export const LOG_TYPE_MUTATE_PFP = 402;
export const LOG_TYPE_LOCK_PFP = 403;
export const LOG_TYPE_UNLOCK_PFP = 404;
export const LOG_TYPE_LOCK_MININGRIGHTS = 501;
export const LOG_TYPE_UNLOCK_MININGRIGHTS = 502;
export const LOG_TYPE_COMBINE_MININGRIGHTS = 503;
export const LOG_TYPE_CREATE_BOX = 504;
export const LOG_TYPE_GET_BOX = 505;
export const LOG_TYPE_SET_MP = 506;
export const LOG_TYPE_RESERVATION_TRANSPORT = 511;
export const LOG_TYPE_START_TRANSPORT = 512;
export const LOG_TYPE_END_TRANSPORT = 513;
export const LOG_TYPE_START_EXPLORATION = 521;
export const LOG_TYPE_SHORTEN_EXPLORATION = 522;
export const LOG_TYPE_END_EXPLORATION = 523;
export const LOG_TYPE_GET_EXPLORATION_BOX = 524;
export const LOG_TYPE_GET_PURCHASE_PRODUCTS = 601;

// Admin 작업 로그 유형
export const ADMIN_LOG_TYPE_SIGNUP = 101;
export const ADMIN_LOG_TYPE_PERMISSIONS = 102;
export const ADMIN_LOG_TYPE_USER_KICK = 201;
export const ADMIN_LOG_TYPE_USER_NICKUPDATE = 202;
export const ADMIN_LOG_TYPE_USER_BLOCK = 203;
export const ADMIN_LOG_TYPE_USER_S_BLOCK = 204;
export const ADMIN_LOG_TYPE_USER_CLEAR = 205;
export const ADMIN_LOG_TYPE_USER_S_CLEAR = 206;
export const ADMIN_LOG_TYPE_USER_GOLDUPDATE = 207;
export const ADMIN_LOG_TYPE_USER_PFPREMOVE = 209;
export const ADMIN_LOG_TYPE_USER_MININGCLEAR = 210;
export const ADMIN_LOG_TYPE_WLC_CREATE = 501;
export const ADMIN_LOG_TYPE_WLC_REMOVE = 502;
export const ADMIN_LOG_TYPE_WLC_UPDATE = 503;
export const ADMIN_LOG_TYPE_WLC_LEGENDUPDATE = 504;
export const ADMIN_LOG_TYPE_REVENUEPOT_CALC = 601;
export const ADMIN_LOG_TYPE_INSPECTION_CREATE = 801;
export const ADMIN_LOG_TYPE_INSPECTION_UPDATE = 802;
export const ADMIN_LOG_TYPE_INSPECTION_REMOVE = 803;
export const ADMIN_LOG_TYPE_INSPECTION_WLCREATE = 804;
export const ADMIN_LOG_TYPE_INSPECTION_WLCREMOVE = 805;

// 운영관리 - 점검 등록시 접속차단 대상
export const INSPECT_LIMIT_TYPE_APP = 'APP';
export const INSPECT_LIMIT_TYPE_WEB = 'WEB';

// 운영관리 - 결제 - 결제 상태
export const PAYMENT_TYPE_COMPLETED = 'COMPLETED';
export const PAYMENT_TYPE_CANCELED = 'CANCELED';
