import { Wrapper, Status } from "@googlemaps/react-wrapper";
import GoogleMap from "./GoogleMap";

const GoogleMapWrapper = () => {

  const render = (status: Status) => {
    if (status === Status.LOADING) return <div>Loading...</div>;
    if (status === Status.FAILURE) return <div>Status Failure</div>;
    return <GoogleMap />;
  };
  return (
    <Wrapper 
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || ""} 
      render={render} 
      libraries={["places", "marker"]}/>
  );
};

export default GoogleMapWrapper;