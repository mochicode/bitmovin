import { useMatch } from 'react-router-dom'
import { useQuery } from 'react-query'

import { useBitmovin } from '../bitmovin'
import Pagination, { usePage } from './pagination'
import { Card } from './card'

const LIMIT = 5

function Streams() {
	let currentPage = usePage('streams')
	let match = useMatch('/:encoding')
	let encoding = match?.params.encoding
	let streams = useStreams(currentPage, encoding)

	return (
		<Card>
			<h2>Streams</h2>
			{ streams.isLoading &&
				<p>...Loading</p>
			}

			{ streams.isError &&
				<p>Something went wrong</p>
			}

			{ streams.isSuccess &&
				<div>
					<Pagination pages={Math.ceil((streams?.data?.totalCount ?? 0) / LIMIT)} name='streams' />
					<ul>
						{ streams?.data?.items?.map(stream => stream && 
							<li key={stream.id}>{ stream.id }</li>
						) }
					</ul>
				</div>
			}
		</Card>
	)
}

export default Streams

function useStreams(page: number, encodingId?: string) {
	let bitmovin = useBitmovin()

	let options = {
		enabled: encodingId !== undefined
	}

	return useQuery(['streams', encodingId, page], () => {
		let offset = page * LIMIT

		return bitmovin.encoding.encodings
			.streams
			.list(encodingId as string, { limit: LIMIT, offset })
	}, options)
}