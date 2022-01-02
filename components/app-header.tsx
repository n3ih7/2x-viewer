import { FolderOpen } from "@mui/icons-material"
import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material"
import { useContext } from "react"
import useAppState from "../lib/hooks/use-app-state"
import useWebAPI from "../lib/hooks/use-web-api"
import AppContext from "../state/app-context"

const AppHeader = () => {
  const { state, dispatch } = useContext(AppContext)
  const { hasFileSystemAccess } = useWebAPI()
  const { hasFolderSelected } = useAppState()
  const handlePickFolder = () => {
    window.showDirectoryPicker()
      .then(dir => dispatch && dispatch({
        type: "SET_DIRECTORY",
        payload: dir
      }))
      .catch(e => console.error(e))
  }

  return <>
    <AppBar position="relative">
      <Toolbar>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ flexGrow: 1 }}>
          <Typography variant="h6">
            2× Viewer
          </Typography>
          {
            hasFolderSelected
            && <Typography>{state?.root?.name}</Typography>
          }
        </Stack>
        {
          hasFileSystemAccess
          && <Button onClick={handlePickFolder} startIcon={<FolderOpen />} color="inherit">Open Folder</Button>
        }
      </Toolbar>
    </AppBar>
  </>
}
export default AppHeader