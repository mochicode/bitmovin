import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export function usePage(name: string) {
	let { search } = useLocation()

	return useMemo(() => {
		let params = new URLSearchParams(search)
		let page = params.get(name)

		if (page === null) {
			return 0
		}

		return parseInt(page, 10) ?? 0

	}, [search])
} 

type Props = {
	pages: number;
	name: string;
}


function Pagination({ pages, name }: Props) {
	let { search } = useLocation()
	let navigation = useNavigate()
	let currentPage = usePage(name)

	let onPrev = () => {
		if (currentPage === 0) {
			return
		}

		let nextPage = currentPage - 1

		let params = new URLSearchParams(search)
		params.set(name, nextPage.toString())

		navigation({
			search: `?${params.toString()}`
		})
	}

	let onNext = () => {
		if (currentPage === (pages - 1)) {
			return
		}

		let nextPage = currentPage + 1

		let params = new URLSearchParams(search)
		params.set(name, nextPage.toString())

		navigation({
			search: `?${params.toString()}`
		})
	}

	return (
		<section>
			<button onClick={onPrev}>
				Prev
			</button>
			<button onClick={onNext}>
				Next
			</button>
		</section>
	)
}

export default Pagination