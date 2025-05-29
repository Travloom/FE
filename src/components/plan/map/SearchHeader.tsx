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
        query: searchText,
        location: map.getCenter(),
        radius: 500,
        bounds: map.getBounds(),
      };

      const service = new google.maps.places.PlacesService(map);

      service.textSearch(
        request,
        (
          results: google.maps.places.PlaceResult[] | null,
          status: google.maps.places.PlacesServiceStatus
        ) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {

            const convertedPlaces = results.map(place => convertToPlaceType(place)).filter(Boolean);

            
            console.log(convertedPlaces)
            
            setPlaces('searchList', convertedPlaces)
            map.panTo(results[0].geometry!.location!);
            setIsPending(false);
            
          }
          else {
            setPlaces('searchList', [])
            setIsPending(false);
          }
        }
      );
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