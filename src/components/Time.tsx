import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Wrapper } from './Wrapper'
import { useRecoilValue } from 'recoil'
import { timeAtom } from '../atom'

const TimeBox = styled(motion.div)`
  width: 300px;
  height: 400px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TimeTxt = styled(motion.div)`
  color: rgba(227, 70, 70, 1);
  font-size: 80pt;
  font-weight: 900;
`

const Colon = styled.div`
  padding: 10px;

  font-size: 100pt;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const timeBoxVariants = {
  initial: {
    opacity: 0,
    scale: 0.7,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
}

const Time = () => {
  const time: number = useRecoilValue(timeAtom)
  const min = Math.floor(time / 60)
  const sec = time % 60

  return (
    <Wrapper>
      <TimeBox
        variants={timeBoxVariants}
        initial="initial"
        animate="animate"
        key={`${min}`}
      >
        <TimeTxt>{min == 0 ? '00' : min}</TimeTxt>
      </TimeBox>

      <Colon>:</Colon>

      <TimeBox
        variants={timeBoxVariants}
        initial="initial"
        animate="animate"
        key={`${sec < 10 ? '0' : ''}${sec}`}
      >
        <TimeTxt>{sec == 0 ? '00' : sec < 10 ? `0${sec}` : sec}</TimeTxt>
      </TimeBox>
    </Wrapper>
  )
}

export default Time
