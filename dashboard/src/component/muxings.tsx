import { useMatch } from 'react-router-dom'
import { useQuery } from 'react-query'

import { useBitmovin } from '../bitmovin'
import Pagination, { usePage } from './pagination'
import { Card } from './card'

const LIMIT = 5

function Muxings() {
	let currentPage = usePage('muxings')
	let match = useMatch('/:encoding')
	let encoding = match?.params.encoding
	let muxings = useMuxings(currentPage, encoding)

	return (
		<Card>
			<h2>Muxings</h2>

			{ muxings.isLoading &&
				<p>...Loading</p>
			}

			{ muxings.isError &&
				<p>Something went wrong</p>
			}

			{ muxings.isSuccess &&
				<div>
					<Pagination pages={Math.ceil((muxings?.data?.totalCount ?? 0) / LIMIT)} name='muxings' />
					<ul>
						{ muxings?.data?.items?.map(muxing => muxing && 
							<li key={muxing.id}>{ muxing.id }</li>
						) }
					</ul>
				</div>
			}
		</Card>
	)
}

export default Muxings

export function useMuxings(page: number, encodingId?: string) {
	let bitmovin = useBitmovin()

	let options = {
		enabled: encodingId !== undefined
	}

	return useQuery(['muxings', encodingId, page], () => {
		let offset = page * LIMIT

		return bitmovin.encoding.encodings
			.muxings
			.list(encodingId as string, { limit: LIMIT, offset })
	}, options)
} 