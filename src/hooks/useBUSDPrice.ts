import { Currency, currencyEquals, JSBI, Price } from '@pancakeswap/sdk'
import tokens from 'config/constants/tokens'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useMemo } from 'react'
import { multiplyPriceByAmount } from 'utils/prices'
import { wrappedCurrency } from '../utils/wrappedCurrency'
import { PairState, usePairs } from './usePairs'

const { wbnb: WCRO, busd } = tokens

/**
 * Returns the price in BUSD of the input currency
 * @param currency currency to compute the BUSD price of
 */
export default function useBUSDPrice(currency?: Currency): Price | undefined {
  const { chainId } = useActiveWeb3React()
  const wrapped = wrappedCurrency(currency, chainId)
  const tokenPairs: [Currency | undefined, Currency | undefined][] = useMemo(
    () => [
      [chainId && wrapped && currencyEquals(WCRO, wrapped) ? undefined : currency, chainId ? WCRO : undefined],
      [wrapped?.equals(busd) ? undefined : wrapped, busd],
      [chainId ? WCRO : undefined, busd],
    ],
    [chainId, currency, wrapped],
  )
  const [[ethPairState, ethPair], [busdPairState, busdPair], [busdEthPairState, busdEthPair]] = usePairs(tokenPairs)

  return useMemo(() => {
    if (!currency || !wrapped || !chainId) {
      return undefined
    }
    // handle weth/eth
    if (wrapped.equals(WCRO)) {
      if (busdPair) {
        const price = busdPair.priceOf(WCRO)
        return new Price(currency, busd, price.denominator, price.numerator)
      }
      return undefined
    }
    // handle busd
    if (wrapped.equals(busd)) {
      return new Price(busd, busd, '1', '1')
    }

    const ethPairETHAmount = ethPair?.reserveOf(WCRO)
    const ethPairETHBUSDValue: JSBI =
      ethPairETHAmount && busdEthPair ? busdEthPair.priceOf(WCRO).quote(ethPairETHAmount).raw : JSBI.BigInt(0)

    // all other tokens
    // first try the busd pair
    if (busdPairState === PairState.EXISTS && busdPair && busdPair.reserveOf(busd).greaterThan(ethPairETHBUSDValue)) {
      const price = busdPair.priceOf(wrapped)
      return new Price(currency, busd, price.denominator, price.numerator)
    }
    if (ethPairState === PairState.EXISTS && ethPair && busdEthPairState === PairState.EXISTS && busdEthPair) {
      if (busdEthPair.reserveOf(busd).greaterThan('0') && ethPair.reserveOf(WCRO).greaterThan('0')) {
        const ethBusdPrice = busdEthPair.priceOf(busd)
        const currencyEthPrice = ethPair.priceOf(WCRO)
        const busdPrice = ethBusdPrice.multiply(currencyEthPrice).invert()
        return new Price(currency, busd, busdPrice.denominator, busdPrice.numerator)
      }
    }

    return undefined
  }, [chainId, currency, ethPair, ethPairState, busdEthPair, busdEthPairState, busdPair, busdPairState, wrapped])
}

export const useCakeBusdPrice = (): Price | undefined => {
  const cakeBusdPrice = useBUSDPrice(tokens.cake)
  return cakeBusdPrice
}

export const useBUSDCurrencyAmount = (currency: Currency, amount: number): number | undefined => {
  const { chainId } = useActiveWeb3React()
  const busdPrice = useBUSDPrice(currency)
  const wrapped = wrappedCurrency(currency, chainId)
  if (busdPrice) {
    return multiplyPriceByAmount(busdPrice, amount, wrapped.decimals)
  }
  return undefined
}

export const useBUSDCakeAmount = (amount: number): number | undefined => {
  const cakeBusdPrice = useCakeBusdPrice()
  if (cakeBusdPrice) {
    return multiplyPriceByAmount(cakeBusdPrice, amount)
  }
  return undefined
}

export const useBNBBusdPrice = (): Price | undefined => {
  const bnbBusdPrice = useBUSDPrice(tokens.wbnb)
  return bnbBusdPrice
}
