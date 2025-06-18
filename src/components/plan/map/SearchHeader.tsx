import useMapStore from "@/stores/useMapStore";
import usePlaceStore from "@/stores/usePlaceStore";
import { convertToPlaceType } from "@/utils/place/convertPlace";
import { useState } from "react";

const SearchHeader = () => {

  const {
    map,
  } = useMapStore();

  const {
    setIsPending,
    setPlaces,
  } = usePlaceStore();

  const [searchText, setSearchText] = useState("");

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && map && searchText.trim() !== "") {

      setIsPending(true);

      const request = {
        fields: ["displayName", "types", "editorialSummary", "formattedAddress", "googleMapsURI", "id", "location", "photos", "rating"],
        textQuery: searchText,
        locationBias: map.getCenter(),
      };

      try {
        const results = await google.maps.places.Place.searchByText(request);

        const convertedPlaces = results?.places?.map(place => convertToPlaceType(place)).filter(Boolean);

        setPlaces('searchList', convertedPlaces)

        const firstPlaceLocation = results?.places?.[0].location;

        if (firstPlaceLocation) {
          map.panTo(firstPlaceLocation);
        }

        setIsPending(false);
      } catch (e) {
        console.log(e)
        setPlaces('searchList', [])
        setIsPending(false);
      }

    }
  }

  return (
    <div className={`py-2 w-full flex flex-row gap-2 items-center justify-center`}>
      <input
        className={`
            lg:text-[16px] lg:py-3 
            text-[14px] px-4 py-2 w-full outline-0 rounded-full border border-gray-200 text-gray-300 placeholder:text-gray-200`}
        placeholder='검색어를 입력하세요'
        value={searchText}
        onKeyDown={handleSearch}
        onChange={(e) => setSearchText(e.target.value)} />
    </div>
  )
}

export default SearchHeader;