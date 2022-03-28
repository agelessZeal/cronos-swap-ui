import { ChainId, Token } from '@pancakeswap/sdk'
import { serializeToken } from 'state/user/hooks/helpers'
import { CHAIN_ID } from './networks'
import { SerializedToken } from './types'

const { MAINNET, TESTNET } = ChainId

interface TokenList {
  [symbol: string]: Token
}

const defineTokens = <T extends TokenList>(t: T) => t

export const mainnetTokens = defineTokens({
  wbnb: new Token(
    MAINNET,
    '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23',
    18,
    'WCRO',
    'Wrapped CRO',
    'https://www.binance.com/',
  ),
  // bnb here points to the wbnb contract. Wherever the currency CRO is required, conditional checks for the symbol 'CRO' can be used
  bnb: new Token(MAINNET, '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23', 18, 'CRO', 'CRO', 'https://www.binance.com/'),
  cake: new Token(
    MAINNET,
    '0xA70caD8524fEBC2162D2246355Cae1bC48E3679C',
    18,
    'CCS',
    'CroCoinSwap',
    'https://pancakeswap.finance/',
  ),
  
  busd: new Token(
    MAINNET,
    '0x6aB6d61428fde76768D7b45D8BFeec19c6eF91A8',
    18,
    'BUSD',
    'Binance USD',
    'https://www.paxos.com/busd/',
  ),

  usdt: new Token(
    MAINNET,
    '0x66e428c3f67a68878562e79A0234c1F83c208770',
    18,
    'USDT',
    'Tether USD',
    'https://tether.to/',
  ),


  eth: new Token(
    MAINNET,
    '0xe44Fd7fCb2b1581822D0c862B68222998a0c299a',
    18,
    'ETH',
    'Ethereum Token',
    'https://ethereum.org/en/',
  ),
  usdc: new Token(
    MAINNET,
    '0xc21223249CA28397B4B6541dfFaEcC539BfF0c59',
    18,
    'USDC',
    'Binance-Peg USD Coin',
    'https://www.centre.io/usdc',
  ),
 

  syrup: new Token(
    MAINNET,
    '0x009cF7bC57584b7998236eff51b98A168DceA9B0',
    18,
    'SYRUP',
    'SyrupBar Token',
    'https://pancakeswap.finance/',
  ),
 
} as const)

export const testnetTokens = defineTokens({
  wbnb: new Token(
    TESTNET,
    '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    18,
    'WCRO',
    'Wrapped CRO',
    'https://www.binance.com/',
  ),
  cake: new Token(
    TESTNET,
    '0xa35062141Fa33BCA92Ce69FeD37D0E8908868AAe',
    18,
    'CCS',
    'CroCoinSwap Token',
    'https://pancakeswap.finance/',
  ),
  busd: new Token(
    TESTNET,
    '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee',
    18,
    'BUSD',
    'Binance USD',
    'https://www.paxos.com/busd/',
  ),
  syrup: new Token(
    TESTNET,
    '0xfE1e507CeB712BDe086f3579d2c03248b2dB77f9',
    18,
    'SYRUP',
    'SyrupBar Token',
    'https://pancakeswap.finance/',
  ),
  bake: new Token(
    TESTNET,
    '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    18,
    'BAKE',
    'Bakeryswap Token',
    'https://www.bakeryswap.org/',
  ),
} as const)

const tokens = () => {
  const chainId = CHAIN_ID

  // If testnet - return list comprised of testnetTokens wherever they exist, and mainnetTokens where they don't
  if (parseInt(chainId, 10) === ChainId.TESTNET) {
    return Object.keys(mainnetTokens).reduce((accum, key) => {
      return { ...accum, [key]: testnetTokens[key] || mainnetTokens[key] }
    }, {} as typeof testnetTokens & typeof mainnetTokens)
  }

  return mainnetTokens
}

const unserializedTokens = tokens()

type SerializedTokenList = Record<keyof typeof unserializedTokens, SerializedToken>

export const serializeTokens = () => {
  const serializedTokens = Object.keys(unserializedTokens).reduce((accum, key) => {
    return { ...accum, [key]: serializeToken(unserializedTokens[key]) }
  }, {} as SerializedTokenList)

  return serializedTokens
}

export default unserializedTokens
