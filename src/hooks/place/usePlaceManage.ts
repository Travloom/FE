import { fireStore } from "@/firebase/firebaseClient";
import usePlaceStore from "@/stores/usePlaceStore";
import { PlaceType } from "@/types/place/type";
import { convertToPlaceType as convertToPlaceType } from "@/utils/place/convertPlace";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect } from "react"



export const usePlaceManage = (planId: string) => {

  const {
    places,
    setPlaces,
  } = usePlaceStore();

  useEffect(() => {
    const checkDocs = async () => {
      const docSnap = await getDoc(targetDoc);

      if (!docSnap.exists()) {
        await setDoc(targetDoc, {
          restaurantList: [],
          hotelList: [],
          attractionList: [],
        })
      }
    }

    const targetDoc = doc(fireStore, 'travloom', 'plan', `${planId}`, 'places')

    checkDocs();

    const unsubscribe = onSnapshot(targetDoc, (docSnapshot) => {
      const data = docSnapshot.data();
      console.log(data)
      if (data) {
        setPlaces('restaurantList', data.restaurantList)
        setPlaces('hotelList', data.hotelList)
        setPlaces('attractionList', data.attractionList)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [planId]);

  const updatePlace = async (newPlace: google.maps.places.PlaceResult | PlaceType) => {
    const targetDoc = doc(fireStore, 'travloom', 'plan', `${planId}`, 'places');

    const docSnap = await getDoc(targetDoc);

    if (!docSnap.exists()) return;

    const data = docSnap.data();

    const listKey =
      newPlace.types?.includes('restaurant') ? 'restaurantList' :
        newPlace.types?.includes('lodging') ? 'hotelList' : 'attractionList';

    const currentList: PlaceType[] = data[listKey] || [];

    const convertedPlace = (newPlace as any).placeId
      ? newPlace as PlaceType // 이미 PlaceType이라고 가정
      : convertToPlaceType(newPlace);

    if (!convertedPlace) return;

    const updatedList = isAlreadyExisted(newPlace)
      ? currentList.filter(p => p.placeId !== convertedPlace.placeId)
      : [...currentList, convertedPlace];

    await setDoc(targetDoc, {
      ...data,
      [listKey]: updatedList,
    })
  }

  const isAlreadyExisted = (newPlace: google.maps.places.PlaceResult | PlaceType) => {
    const listKey =
      newPlace.types?.includes('restaurant') ? 'restaurantList' :
        newPlace.types?.includes('lodging') ? 'hotelList' : 'attractionList'

    const placeId =
      'placeId' in newPlace ? newPlace.placeId :
        'place_id' in newPlace ? newPlace.place_id :
          undefined;

    return places[listKey]?.some(p => p.placeId === placeId) ?? false;
  }

  return { updatePlace, isAlreadyExisted }
}

