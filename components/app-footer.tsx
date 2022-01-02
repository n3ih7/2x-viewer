import { Box, Checkbox, Divider, FormControlLabel, Stack } from "@mui/material"
import { useContext } from "react"
import useAppState from "../lib/hooks/use-app-state"
import AppContext from "../state/app-context"
import AppPagination from "./app-pagination"

const AppFooter = () => {
  const { dispatch } = useContext(AppContext)
  const { isFileOnly, isViewingUpscaled } = useAppState()

  return <Box sx={{ p: 2 }}>
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      <AppPagination />
      <FormControlLabel control={
        <Checkbox checked={isFileOnly} onChange={(_, checked) => {
          if (dispatch) {
            dispatch({
              type: "SET_PREFERENCES",
              payload: {
                isFileOnly: checked
              }
            })
            dispatch({
              type: "SET_CURRENT",
              payload: 0,
            })
          }
        }} />
      } label="File Only" />
      <FormControlLabel control={
        <Checkbox checked={isViewingUpscaled} onChange={(_, checked) => {
          if (dispatch) {
            dispatch({
              type: "SET_PREFERENCES",
              payload: {
                isViewingUpscaled: checked
              }
            })
          }
        }} />
      } label="Upscale" />
    </Stack>
  </Box>
}
export default AppFooter