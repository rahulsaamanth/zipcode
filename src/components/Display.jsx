import * as _ from "lodash"
import { ClipLoader } from "react-spinners"
import MapModal from "./MapModal"
import { useStoreContext } from "../useContext/context"

const Display = ({}) => {
  const { data, isLoading, setSelected } = useStoreContext()

  if (_.isEmpty(data)) return <></>

  if (isLoading)
    return (
      <div className="w-full grid place-items-center mt-12">
        <ClipLoader size={75} speedMultiplier={2} />
      </div>
    )
  const places = data.places

  const postcode = data["post code"]
  const state = data.places[0].state

  return (
    <div className="h-screen w-full flex items-center justify-start flex-col text-4xl">
      <div className="mt-36 flex flex-col justify-center space-y-8 max-w-3xl">
        <div className="space-x-4">
          <span>Pincode:</span>
          <span>{postcode}</span>
        </div>
        <div className="space-x-4">
          <span>Country:</span>
          <span>{data.country}</span>
        </div>
        <div className="space-x-4">
          <span>State&nbsp;&nbsp;:</span>
          {/* as the api is accessing old data, Telangana is directly included in it */}
          <span>{postcode.startsWith("50") ? "Telangana" : state}</span>
        </div>
        <div>
          Places&nbsp;:
          <div className="flex items-center justify-evenly gap-8 py-8 flex-col">
            {places.map((place) => (
              <div
                key={place["place name"]}
                onClick={() => setSelected(place)}
                className="text-center"
              >
                <h2 className="underline cursor-pointer text-blue-500 text-2xl hover:scale-125 hover:duration-100 hover:text-red-500 active:text-blue-500 active:scale-0 active:duration-100">
                  {place["place name"]}
                  <sup>&#8599;</sup>
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MapModal />
    </div>
  )
}

export default Display
