'use client';

import BigNumber from 'bignumber.js';

export const useUtils = () => {
  const isServer = typeof window === 'undefined';

  const randomUint32 = () => {
    if (
      !isServer &&
      window &&
      window.crypto &&
      window.crypto.getRandomValues &&
      Uint32Array
    ) {
      const o = new Uint32Array(1);
      window.crypto.getRandomValues(o);
      return o[0];
    } else {
      console.warn('Falling back to pseudo-random client seed');
      return Math.floor(Math.random() * Math.pow(2, 32));
    }
  };

  const fromHexToDec = (num: string) => {
    if (!num) return 0;
    else if (String(num).startsWith('0x'))
      return new BigNumber(num).toString(10);
    else return num;
  };

  const fromDecToHex = (num: string) => {
    if (!num) return 0x0;
    else if (String(num).startsWith('0x')) return num;
    else return '0x' + new BigNumber(num).toString(16);
  };

  const isWalletAddress = (address: string) => {
    const addressLowerCase = address.toLowerCase();
    return /^(hx)[0-9a-f]{40}$/.test(addressLowerCase);
  };

  const isContractAddress = (address: string) => {
    const addressLowerCase = address.toLowerCase();
    return /^(cx)[0-9a-f]{40}$/.test(addressLowerCase);
  };

  const isHex = (hex: string) => {
    if (hex === '') return true;
    return /^0x[0-9A-F]+$/i.test(hex);
  };

  const removeTrailingZeros = (value: any) => {
    value = value.toString();

    if (value.indexOf('.') === -1) {
      return value;
    }

    while (
      (value.slice(-1) === '0' || value.slice(-1) === '.') &&
      value.indexOf('.') !== -1
    ) {
      value = value.substr(0, value.length - 1);
    }
    return value;
  };

  const numberWithCommas = (x: string | number) => {
    x = removeTrailingZeros(x);
    let parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  return {
    randomUint32,
    fromHexToDec,
    fromDecToHex,
    isWalletAddress,
    isContractAddress,
    isHex,
    numberWithCommas
  };
};
