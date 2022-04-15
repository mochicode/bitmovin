import { Encoding } from '@bitmovin/api-sdk'
import { format } from 'date-fns';
import { useEffect, useState } from 'react'
import { useBitmovin } from '../bitmovin'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import EncodingDetails from './encoding'
import Pagination, { usePage } from './pagination'

const LIMIT = 10

type Pages = {
	totalCount: number;
	items: { [page: number]: Array<Encoding> }
}

function Encodings() {
	let bitmovin = useBitmovin()

	let page = usePage('page')
	let [pages, setPages] = useState<Pages>({
		totalCount: 0,
		items: {},
	})

	useEffect(() => {
		let start = page * LIMIT
		bitmovin.encoding.encodings
			.list(q => q.limit(LIMIT).offset(start))
			.then(({ items = [], totalCount = 0 }) => {
				setPages(state => {
					return {
						totalCount,
						items: { 
							...state.items,
							[page]: items,
						}
					}
				})
			})
	}, [page])

	
	let items = pages.items[page] ?? []

	let maxPages = Math.ceil(pages.totalCount / LIMIT)
	let [encoding, setEncoding] = useState<string | undefined>(undefined)

	useEffect(() => {
		if (encoding === undefined) {
			return
		}

		let encodingId = encoding

		bitmovin.encoding.encodings.streams.list(encodingId)
			.then(({ items = [] }) => Promise.all(
				items.map(item => {
					if (item.id === undefined) {
						return Promise.resolve(undefined)
					}

					return bitmovin.encoding.encodings.streams.get(encodingId, item.id)
				})
			))
			.then(streams => console.log({ streams }))

		bitmovin.encoding.encodings.muxings.list(encodingId).then(muxings => {
			console.log({ muxings })
		})
	}, [encoding])

	return (
		<Wrapper>		
			<Aside>
				<Pagination pages={maxPages} name='page' />

				<List>
					{ items.map(item => {
						if (item.id === undefined) {
							return null
						}

						return (
							<ListItem key={item.id} onClick={() => setEncoding(item.id)}>
								<Link to={`${item.id}?page=${page}`}>
									<EncodingName title={item.name}>
										{ item.name }
									</EncodingName>
									<div>
										<Info>{ item.status }</Info> 
										<Info>{ item.createdAt && format(item.createdAt, 'yyyy-MM-dd') }</Info>
									</div>
								</Link>
							</ListItem>
						)
					}) }
				</List>
			</Aside>

			<EncodingDetails />
		</Wrapper>
	)
}

export default Encodings

let Aside = styled.aside`
	padding: 1rem;
	height: 100%;
	border-right: 1px solid #cbe0ed;
`

let List = styled.ul`
	list-style-type: none;
	padding: 0;
`

let ListItem = styled.li`
	margin-bottom: 1rem;
	
	a {
		display: flex;
		flex-direction: column;
	}
`

let EncodingName = styled.span`
	font-weight: bold;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`

let Info = styled.span`
	width: 50%;
	display: inline-block;
`

let Wrapper = styled.div`
	display: grid;
	grid-template-columns: 300px 1fr;
	height: 100%;
`

