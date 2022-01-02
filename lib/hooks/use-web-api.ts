import { useMemo } from "react"

const useWebAPI = () => {
  const hasFileSystemAccess = useMemo(() => typeof window !== "undefined" && typeof window.showDirectoryPicker === "function", [])

  return {
    hasFileSystemAccess,
  }
}
export default useWebAPI