import { FolderOpen, Info } from "@mui/icons-material"
import { AppBar, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Stack, Toolbar, Typography } from "@mui/material"
import { useContext, useState } from "react"
import useAppState from "../lib/hooks/use-app-state"
import useWebAPI from "../lib/hooks/use-web-api"
import AppContext from "../state/app-context"

const AppHeader = () => {
  const { state, dispatch } = useContext(AppContext)
  const { hasFileSystemAccess } = useWebAPI()
  const { hasFolderSelected } = useAppState()

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

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
        <Button onClick={() => setIsDialogOpen(true)} startIcon={<Info />} color="inherit">About</Button>
      </Toolbar>
    </AppBar>
    <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
      <DialogTitle>
        About this website
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          This website reads the content of a folder that is picked by you using <a href="https://web.dev/file-system-access/" target="_blank" rel="noreferrer">File System Access API</a> and displays images within that folder. Images are upscaled by <a href="https://github.com/thekevinscott/UpscalerJS" target="_blank" rel="noreferrer">UpscalerJS</a>.
        </DialogContentText>
      </DialogContent>
    </Dialog>
  </>
}
export default AppHeader