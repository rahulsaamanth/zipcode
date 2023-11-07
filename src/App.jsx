import { useMemo, useState } from "react"
import Display from "./components/Display"
import Search from "./components/Search"
import { AppContext } from "./useContext/context"

function App() {
  const [data, setData] = useState({})
  // isLoading state to display loading indicator
  const [isLoading, setIsLoading] = useState(false)

  const [selected, setSelected] = useState(null)

  const providerValue = useMemo(
    () => ({
      data,
      setData,
      isLoading,
      setIsLoading,
      selected,
      setSelected,
    }),
    [data, isLoading, selected]
  )

  return (
    <>
      <div className="w-full h-screen">
        <AppContext.Provider value={providerValue}>
          <Search />
          <Display />
        </AppContext.Provider>
      </div>
    </>
  )
}

export default App
