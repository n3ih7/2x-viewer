import { Alert, Button, CircularProgress, Stack } from "@mui/material"
import Image from "next/image"
import { useContext } from "react"
import useAppState from "../lib/hooks/use-app-state"
import useFileContent from "../lib/hooks/use-file-content"
import useUpscaledFileContent from "../lib/hooks/use-upscaled-file-content"
import AppContext from "../state/app-context"

interface IFilePreview {
  handle: FileSystemHandle;
}

const FilePreview = ({ handle }: IFilePreview) => {
  const { dispatch } = useContext(AppContext)
  const { isViewingUpscaled } = useAppState()
  const { content, supported: fileSupported } = useFileContent(handle)
  const { upscaled, supported: upscaleSupported } = useUpscaledFileContent(content)
  const { kind } = handle
  return <>
    {
      kind === "directory"
      && <Stack spacing={2}>
        <Alert severity="warning">{handle.name} is a directory.</Alert>
        <Button onClick={() => {
          if (dispatch) {
            dispatch({
              type: "SET_DIRECTORY",
              payload: handle
            })
          }
        }}>Open This Folder</Button>
      </Stack>
    }
    {
      kind === "file"
      && (
        content
          // eslint-disable-next-line @next/next/no-img-element
          // && <img className={styles.img} src={path} alt={handle.name} />
          ? isViewingUpscaled
            ? upscaled
              ? <Image src={upscaled} alt={handle.name} layout="fill" objectFit="contain" />
              : upscaleSupported
                ? <CircularProgress />
                : <Alert severity="warning">{handle.name} cannot be upscaled. </Alert>
            : <Image src={content} alt={handle.name} layout="fill" objectFit="contain" />
          : fileSupported
            ? <CircularProgress />
            : <Alert severity="error">{handle.name} is not supported. </Alert>
      )
    }
  </>
}
export default FilePreview