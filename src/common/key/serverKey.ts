'use client';

export const instanceMessageKeys = {
  list: (params: { page: number }) =>
    ['/operation/notice', params.page] as const,
  registration: ['/operation/notice'] as const,
  update: ['/operation/notice'] as const,
  delete: ['/operation/notice'] as const
};

export const pushMessageKeys = {
  list: (params: { page: number }) =>
    ['/operation/notice/push', params.page] as const,
  registration: ['/operation/notice/push'] as const,
  update: ['/operation/notice/push'] as const,
  delete: ['/operation/notice/push'] as const
};

export const userKeys = {
  info: (params: { type: string; keyword: string; provider?: string }) =>
    ['/user/info', params] as const,
  nicknameValidation: ['/user/info/nickname-validation'] as const,
  nicknameUpdate: ['/user/info/nickname'] as const,
  nicknameHistory: ['/user/info/nickname'] as const,
  pfp: (params: {
    type: string;
    keyword: string;
    provider?: string;
    page?: number;
  }) => ['/user/pfp', params] as const,
  miningrights: (params: {
    type: string;
    keyword: string;
    provider?: string;
  }) => ['/user/miningrights', params] as const,
  miningrightsClear: ['/user/miningrights'] as const,
  miningrightsRegistration: ['/user/miningrights-add'] as const,
  items: (params: { type: string; keyword: string; provider?: string }) =>
    ['/user/items', params] as const,
  itemsUpdate: ['/user/items'] as const,
  transport: (params: { type: string; keyword: string; provider?: string }) =>
    ['/user/transport', params] as const,
  exploration: (params: { type: string; keyword: string; provider?: string }) =>
    ['/user/exploration', params] as const,
  kick: ['/user/info/kick'] as const,
  goldUpdate: ['/user/info/gold'] as const,
  pfpDelete: ['/user/pfp'] as const,
  stateUpdate: ['/user/info/state'] as const,
  logs: (params: {
    keyword?: number;
    startDateTime: string;
    endDateTime: string;
    logId: number[];
  }) => ['/user/log', params] as const
};

export const operationKeys = {
  accessUser: ['/operation/access'] as const,
  wlcollection: ['/operation/wlcollection'] as const,
  wlcollectionList: (params: { name: string; page?: number }) =>
    ['/operation/wlcollection', params] as const,
  wlcollectionRegistration: ['/operation/wlcollection'] as const,
  wlcollectionUpdate: ['/operation/wlcollection'] as const,
  wlcollectionDelete: ['/operation/wlcollection'] as const,
  wlcollectionLegendUpdate: ['/operation/wlcollection-legend'] as const,
  wlcollectionLegendDelete: ['/operation/wlcollection-legend'] as const,
  logs: (params: {
    startDateTime: string;
    endDateTime: string;
    logId: number[];
    page?: number;
  }) => ['/operation/log', params] as const,
  inspectLimit: ['/operation/inspect/limit'] as const,
  inspectLimitList: (params: { page?: number }) =>
    ['/operation/inspect/limit', params] as const,
  inspectLimitUpdate: ['/operation/inspect/limit'] as const,
  inspectLimitRegistration: ['/operation/inspect/limit'] as const,
  inspectLimitDelete: ['/operation/inspect/limit'] as const,
  inspectLimitDetail: ['/operation/inspect/limitdetail'] as const,
  inspectWlList: ['/operation/inspect/wl'] as const,
  inspectWlRegistration: ['/operation/inspect/wl'] as const,
  inspectWlDelete: ['/operation/inspect/wl'] as const,

  kickAll: ['/operation/kick-all'] as const,
  kickAllConfirm: (params: { scope?: string }) =>
    ['/operation/kick-all-confirm', params] as const,
  kickAllList: (params: { page?: number }) =>
    ['/operation/kick-all', params] as const,
  kickAllRegistration: ['/operation/kick-all'] as const,
  paymentList: (params: {
    type: string;
    startDateTime?: string;
    endDateTime?: string;
    memberId?: number | string;
    orderId: string;
    page?: number;
  }) => ['/operation/purchase', params] as const
};

export const scManagerKeys = {
  revenuePot: ['/operation/revenuepot'] as const,
  goldInfo: ['gold-info'] as const,
  tokenTransferList: (params: { page?: number; addrType?: string }) =>
    ['token-transfer', params] as const
};
