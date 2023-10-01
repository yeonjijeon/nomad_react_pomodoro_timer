import { atom } from 'recoil'
import { TIMER_MINUTES } from './components/Count'

export const timeAtom = atom({
  key: 'minute',
  default: TIMER_MINUTES * 60,
})

export const roundAtom = atom({
  key: 'round',
  default: 0,
})

export const goalAtom = atom({
  key: 'goal',
  default: 0,
})
