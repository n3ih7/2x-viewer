import { Alert } from "@mui/material"
import useAppState from "../lib/hooks/use-app-state"
import useWebAPI from "../lib/hooks/use-web-api"
import AppCanvas from "./app-canvas"
import AppFooter from "./app-footer"
import AppHeader from "./app-header"
import styles from "./shell.module.css"

const Shell = () => {
  const { hasFileSystemAccess } = useWebAPI()
  const { hasFolderSelected } = useAppState()

  return <div className={styles.shell}>
    <div className={styles.app_bar}>
      <AppHeader />
    </div>
    <div className={styles.app_content}>
      {
        hasFileSystemAccess
          ? <AppCanvas />
          : <Alert severity="error">Your browser is not supported!</Alert>
      }
    </div>
    {
      hasFolderSelected
      && <div className={styles.app_footer}>
        <AppFooter />
      </div>
    }
  </div>
}
export default Shell