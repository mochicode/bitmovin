import styled from 'styled-components'
import Streams from './streams'
import Muxings from './muxings'

function Encoding() {
	return (
		<Wrapper>
			<Streams />
			<Muxings />
		</Wrapper>
	)
}

export default Encoding

let Wrapper = styled.div`
	background: #eef6f9;
	display: flex;
	padding: 2rem;
	align-items: flex-start;
	column-gap: 2rem;
`