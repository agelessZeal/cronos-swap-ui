import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'CroCoinSwap',
  description:
    'The most popular AMM on BSC by user count! Earn CCS through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by CroCoinSwap), NFTs, and more, on a platform you can trust.',
  image: 'https://pancakeswap.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('CroCoinSwap')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('CroCoinSwap')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('CroCoinSwap')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('CroCoinSwap')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('CroCoinSwap')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('CroCoinSwap')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('CroCoinSwap')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('CroCoinSwap')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('CroCoinSwap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('CroCoinSwap')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('CroCoinSwap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('CroCoinSwap')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('CroCoinSwap')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('CroCoinSwap')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('CroCoinSwap')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('CroCoinSwap')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('CroCoinSwap')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('CroCoinSwap')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('CroCoinSwap Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('CroCoinSwap Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('CroCoinSwap Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('CroCoinSwap')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('CroCoinSwap')}`,
      }
    case '/nfts/activity':
      return {
        title: `${t('Activity')} | ${t('CroCoinSwap')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Profile')} | ${t('CroCoinSwap')}`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Pancake Squad')} | ${t('CroCoinSwap')}`,
      }
    default:
      return null
  }
}
