import { Wrapper, Status } from "@googlemaps/react-wrapper";
import GoogleMap from "./GoogleMap";
import { HashLoader } from "react-spinners";

const GoogleMapWrapper = () => {

  const render = (status: Status) => {
    if (status === Status.LOADING) return (
      <div className={`flex justify-center items-center h-1/2`}>
        <HashLoader
          size={30}
          color={`#6c5ce7`} />
      </div>
    )
    if (status === Status.FAILURE) return <div>Status Failure</div>;
    return <GoogleMap />;
  };
  return (
    <Wrapper
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || ""}
      render={render}
      libraries={["places", "marker"]} />
  );
};

export default GoogleMapWrapper;