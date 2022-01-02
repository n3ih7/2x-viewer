import { useWorker } from "@shopify/react-web-worker"
import { useContext, useEffect, useState } from "react"
import AppContext from "../../state/app-context"
import upscaleWorker from "../workers/upscale.worker"
import useAppState from "./use-app-state"

const useUpscaledFileContent = (url: string | undefined) => {
  const { state } = useContext(AppContext)
  const { isViewingUpscaled } = useAppState()
  const [upscaled, setUpscaled] = useState<string>()
  const [supported, setSupported] = useState<boolean>(true)
  const upscaler = useWorker(upscaleWorker)

  useEffect(() => {
    if (!!url && isViewingUpscaled) {
      setSupported(true)
      upscaler.upscale(url)
        // @ts-expect-error
        .then(setUpscaled)
        .catch(() => setSupported(false))
    }
  }, [isViewingUpscaled, upscaler, url])

  useEffect(() => {
    setUpscaled(undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.current])

  return {
    upscaled,
    supported,
  }
}
export default useUpscaledFileContent