import { useState, useEffect } from 'react'
import BitmovinApi from '@bitmovin/api-sdk'
import styled from 'styled-components'

import ApiKey from './component/api_key'
import Encodings from './component/encodings'
import { BitmovinApiCtx, ApiClientState } from './bitmovin'

function App() {

  let [apiKey, setApiKey] = useState('')

  let [bitmovin, setBitmovin] = useState<ApiClientState>(null)
  useEffect(() => {
    if (apiKey === '') {
      return
    }

    setBitmovin(new BitmovinApi({ apiKey }))
  }, [apiKey])

  return (
    <BitmovinApiCtx.Provider value={bitmovin}>
      <Layout>     
        <Header>
          <ApiKey onLoad={setApiKey} />
        </Header>

        <Main>
          { bitmovin === null &&
            <div>
              <p>Enter API Key</p>
            </div>
          }

          { bitmovin !== null &&
            <Encodings />
          }
        </Main>
      </Layout>
    </BitmovinApiCtx.Provider>
  );
}

export default App;

let Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

let Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  
  height: 60px;
  border-bottom: 2px solid #f08916;
`

let Main = styled.main`
  flex-grow: 1;
`