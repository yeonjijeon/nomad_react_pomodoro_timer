import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Wrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const BtnWrapper = styled(Wrapper)`
  padding: 100px;
`

export const BoxWrapper = styled(Wrapper)`
  padding-bottom: 50px;
`
