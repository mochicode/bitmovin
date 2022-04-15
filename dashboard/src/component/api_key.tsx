import { FormEvent, useState } from 'react'

type Props = {
	onLoad: (apiKey: string) => void;
}

function ApiKey(props: Props) {
	let [apiKey, setApiKey] = useState('')

	let handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		props.onLoad(apiKey)
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="apiKey"
					required
					onChange={e => setApiKey(e.target.value)}
				/>

				<button>Load Encodings</button>
			</form>
		</div>
	)
}

export default ApiKey