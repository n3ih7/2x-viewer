import { Pagination } from "@mui/material"
import { ChangeEvent, useContext } from "react"
import useAppState from "../lib/hooks/use-app-state"
import AppContext from "../state/app-context"

const AppPagination = () => {
  const { state, dispatch } = useContext(AppContext)
  const { filteredContent } = useAppState()
  const handleChangeCurrent = (_: ChangeEvent<unknown>, current: number) => {
    dispatch && dispatch({
      type: "SET_CURRENT",
      payload: current - 1
    })
  }
  return <>
    <Pagination count={filteredContent?.length ?? 0 + 1} page={(state?.current ?? 0) + 1} onChange={handleChangeCurrent} />
  </>
}
export default AppPagination