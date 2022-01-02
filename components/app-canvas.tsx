import useAppState from "../lib/hooks/use-app-state"
import styles from "./app-canvas.module.css"
import FilePreview from "./file-preview"

const AppCanvas = () => {
  const { currentFile } = useAppState()
  return <div className={styles.app_canvas}>
    {
      currentFile
      && <FilePreview handle={currentFile} />
    }
  </div>
}
export default AppCanvas