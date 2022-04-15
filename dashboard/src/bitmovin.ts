import { createContext, useContext } from 'react';
import BitmovinApi from '@bitmovin/api-sdk';

export type ApiClientState = BitmovinApi | null
export let BitmovinApiCtx = createContext<ApiClientState>(null)

export function useBitmovin() {
	let bitmovin = useContext(BitmovinApiCtx)
	
	if (bitmovin === null) {
		throw new Error('faild to initialize the api client')
	}

	return bitmovin
}