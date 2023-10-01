import { BtnWrapper } from './Wrapper'
import styled from 'styled-components'
import { motion, Variants } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { goalAtom, roundAtom, timeAtom } from '../atom'
import { TIMER_MINUTES, TOTAL_GOAL_CNT, TOTAL_ROUND_CNT } from './Count'

const Btn = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`

const btnVariants: Variants = {
  hover: { scale: 1.2 },
  click: { scale: 0.8 },
}

const Svg = styled.svg`
  fill: white;
  width: 130px;
  height: 130px;
`

const useTimer = () => {
  const time = useRecoilValue(timeAtom)
  const setTime = useSetRecoilState(timeAtom)

  const ref = useRef<NodeJS.Timeout | null>(null)

  // 재생
  const play = useCallback(() => {
    if (ref.current != null) {
      return
    }

    if (time > 0) {
      ref.current = setInterval(() => {
        setTime((prev) => prev - 1)
      }, 1000)
      return
    }
  }, [])

  // 정지
  const stop = useCallback(() => {
    if (ref.current == null) {
      return
    }

    clearInterval(ref.current)
    ref.current = null
  }, [])

  return { play, stop }
}

const TimerBtn = () => {
  const time = useRecoilValue(timeAtom)
  const roundCnt = useRecoilValue(roundAtom)
  const goalCnt = useRecoilValue(goalAtom)

  const setTime = useSetRecoilState(timeAtom)
  const setRoundCnt = useSetRecoilState(roundAtom)
  const setGoalCnt = useSetRecoilState(goalAtom)

  const [isPlaying, setIsPlaying] = useState(false)
  const { play, stop } = useTimer()

  const onClick = () => {
    setIsPlaying((prev) => !prev)
  }

  useEffect(() => {
    if (isPlaying) {
      if (roundCnt !== TOTAL_ROUND_CNT && goalCnt !== TOTAL_GOAL_CNT) {
        play()
      }
    } else {
      stop()
    }
  }, [isPlaying])

  useEffect(() => {
    if (time == 0) {
      if (roundCnt + 1 == TOTAL_ROUND_CNT) {
        if (goalCnt + 1 == TOTAL_GOAL_CNT) {
          setRoundCnt(TOTAL_ROUND_CNT)
          setGoalCnt(TOTAL_GOAL_CNT)
          setIsPlaying(false)
          stop()
          return
        } else {
          setRoundCnt(0)
          setGoalCnt((prev) => prev + 1)
        }
      } else {
        setRoundCnt((prev) => prev + 1)
      }

      setTime(TIMER_MINUTES * 60)
      play()
    }
  }, [time])

  return (
    <BtnWrapper>
      <Btn
        variants={btnVariants}
        whileHover="hover"
        whileTap="click"
        onClick={onClick}
      >
        <Svg
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {isPlaying ? (
            <motion.path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z"></motion.path>
          ) : (
            <motion.path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></motion.path>
          )}
        </Svg>
      </Btn>
    </BtnWrapper>
  )
}

export default TimerBtn
