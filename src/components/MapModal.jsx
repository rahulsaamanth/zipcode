import "mapbox-gl/dist/mapbox-gl.css"
import Map, { Marker, NavigationControl } from "react-map-gl"
import { useStoreContext } from "../useContext/context"

const MapModal = () => {
  const { selected, setSelected } = useStoreContext()

  if (!selected) return <></>

  return (
    <div
      onClick={() => setSelected(null)}
      className="z-50 cursor-pointer fixed bg-black/50 inset-0"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[600px] mx-auto px-8 cursor-default text-white mt-28 mr-32 h-[350px]"
      >
        <div className="font-bold text-[18px] bg-black/30 text-center">
          Click anywhere outside the map to EXIT.
        </div>
        <Map
          mapboxAccessToken="pk.eyJ1IjoicmFodWwtc2FhbWFudGgiLCJhIjoiY2xucmZoOGJpMTZnajJxcGJyZXowaHlrbiJ9.pD1vYthkTUYtHdpoo6lrXA"
          initialViewState={{
            longitude: selected.longitude,
            latitude: selected.latitude,
            zoom: 7,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          <Marker
            longitude={selected.longitude}
            latitude={selected.latitude}
            anchor="bottom"
          >
            <img src="./pin.png" width={20} height={20} />
          </Marker>
          <NavigationControl />
        </Map>
      </div>
    </div>
  )
}

export default MapModal
