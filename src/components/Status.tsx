import { BoxWrapper } from './Wrapper'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { goalAtom, roundAtom } from '../atom'
import { TOTAL_GOAL_CNT, TOTAL_ROUND_CNT } from './Count'

const BottomBox = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    padding: 5px;
    font-size: 20pt;
    font-weight: 500;
  }
`

const Status = () => {
  const roundCnt = useRecoilValue(roundAtom)
  const goalCnt = useRecoilValue(goalAtom)

  return (
    <BoxWrapper>
      <BottomBox>
        <span>
          {roundCnt} / {TOTAL_ROUND_CNT}
        </span>
        <span>ROUND</span>
      </BottomBox>
      <BottomBox>
        <span>
          {goalCnt} / {TOTAL_GOAL_CNT}
        </span>
        <span>GOAL</span>
      </BottomBox>
    </BoxWrapper>
  )
}

export default Status
