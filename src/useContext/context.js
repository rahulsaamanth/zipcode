import { createContext, useContext } from "react"

export const AppContext = createContext(undefined)

export function useStoreContext() {
  const store = useContext(AppContext)

  if (store === undefined)
    throw new Error("useDataContext must be use with a AppContext")

  return store
}
