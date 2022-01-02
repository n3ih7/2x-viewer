import { CssBaseline } from '@mui/material'
import type { AppProps } from 'next/app'
import { useReducer } from 'react'
import polyfill from '../lib/polyfill'
import AppContext from '../state/app-context'
import AppReducer from '../state/app-reducer'

polyfill()

const App = ({ Component, pageProps }: AppProps) => {
  const [state, dispatch] = useReducer(AppReducer, {})
  return <>
    <CssBaseline />
    <AppContext.Provider value={{
      state, dispatch
    }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  </>
}

export default App
