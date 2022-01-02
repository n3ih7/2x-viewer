import { useContext, useEffect, useState } from "react"
import AppContext from "../../state/app-context"

const useFileContent = (handle: FileSystemHandle | undefined) => {
  const { state } = useContext(AppContext)
  const [content, setContent] = useState<string>()
  const [supported, setSupported] = useState<boolean>(true)

  useEffect(() => {
    if (!handle) return
    if (handle.kind === "file") {
      setSupported(true)
      handle.getFile()
        .then(file => {
          if (file.type.startsWith("image")) {
            const url = URL.createObjectURL(file)
            setContent(url)
          } else {
            setSupported(false)
            setContent(undefined)
          }
        })
        .catch(() => setSupported(false))
    }
    return () => {
      if (content) URL.revokeObjectURL(content)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handle])

  useEffect(() => {
    setContent(undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.current])

  return {
    content,
    supported,
  }
}
export default useFileContent