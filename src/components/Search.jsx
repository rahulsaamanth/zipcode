import { useState } from "react"
import { useStoreContext } from "../useContext/context"

const Search = ({}) => {
  const { setData, isLoading, setIsLoading } = useStoreContext()

  // zip code state
  const [code, setCode] = useState("")

  // state to validate the input
  const [valid, setValid] = useState(true)

  const handleChange = (e) => {
    setCode(e.target.value.toString().trim())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // regExp. to check the input is valid or not
    const regex = /^[0-9]{6}$/
    regex.test(code) ? fetchDetails() : setValid(false)
  }

  const fetchDetails = async () => {
    setIsLoading(true)
    const response = await fetch(`https://api.zippopotam.us/in/${code}`)
    response.ok ? setValid(true) : setValid(false)
    const data = await response.json()
    console.log(data)
    setData(data)
    setIsLoading(false)
  }

  return (
    <div className="text-[14px] sm:text-base w-full flex items-center justify-center sm:justify-around flex-col bg-slate-300 h-40 py-10">
      <div className="max-sm:flex-col flex items-center justify-center gap-4">
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center gap-8"
        >
          <label>
            <span className="font-bold">Enter Postal Code:&emsp;</span>
            <input
              type="text"
              value={code}
              placeholder="eg:506002"
              onChange={handleChange}
              className={`border outline-none ${
                valid ? "border-gray-400" : "border-red-500"
              }  rounded-sm py-2 pl-2`}
            />
          </label>
          <button
            type="submit"
            className={`btn ${
              isLoading ? "bg-black/50" : "bg-black"
            } p-2 rounded-sm text-white font-semibold w-[200px]`}
          >
            {isLoading ? "Getting Details..." : "Get Details"}
          </button>
        </form>
        <button
          onClick={() => {
            setData({})
            setCode("")
          }}
          className="btn bg-red-500 p-2 text-white font-semibold w-[200px]"
        >
          Clear Details
        </button>
      </div>
      {!valid && (
        <div className="text-red-500 font-semibold pt-4">
          Retry or Please enter a valid Pincode!
        </div>
      )}
    </div>
  )
}

export default Search
