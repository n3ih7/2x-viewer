import { useContext, useEffect, useMemo } from "react"
import AppContext from "../../state/app-context"
import enumerateDirectory from "../utils/enumerate-directory"

const useAppState = () => {
  const { state, dispatch } = useContext(AppContext)

  // Watche for root changes
  useEffect(() => {
    enumerateDirectory(state?.root).then(handles => {
      if (dispatch) {
        dispatch({
          type: "SET_CURRENT",
          payload: 0
        })
        dispatch({
          type: "SET_CONTENT",
          payload: handles
        })
      }
    })
  }, [dispatch, state?.root])

  const filteredContent = useMemo(() => state?.content?.filter(handle => {
    if (state?.preferences?.isFileOnly) {
      return handle.kind === "file"
    }
    return true
  }), [state?.content, state?.preferences?.isFileOnly])
  const hasFolderSelected = useMemo(() => typeof state?.root !== "undefined", [state?.root])
  const currentFile = useMemo(() => state?.content?.at(state?.current ?? 0), [state])

  // Preferences
  const isFileOnly = useMemo(() => state?.preferences?.isFileOnly ?? false, [state?.preferences?.isFileOnly])
  const isViewingUpscaled = useMemo(() => state?.preferences?.isViewingUpscaled ?? false, [state?.preferences?.isViewingUpscaled])

  return {
    currentFile,
    filteredContent,
    hasFolderSelected,
    
    isFileOnly,
    isViewingUpscaled,
  }
}
export default useAppState