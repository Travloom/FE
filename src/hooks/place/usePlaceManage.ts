import { fireStore } from "@/firebase/firebaseClient";
import usePlaceStore from "@/stores/usePlaceStore";
import { PlaceType } from "@/types/place/type";
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

  const updatePlace = async (newPlace: PlaceType) => {
    const targetDoc = doc(fireStore, 'travloom', 'plan', `${planId}`, 'places');

    const docSnap = await getDoc(targetDoc);

    if (!docSnap.exists()) return;

    const data = docSnap.data();

    const listKey =
      newPlace.types?.includes('restaurant') ? 'restaurantList' :
        newPlace.types?.includes('lodging') ? 'hotelList' : 'attractionList';

    const currentList: PlaceType[] = data[listKey] || [];

    const updatedList = isAlreadyExisted(newPlace)
      ? currentList.filter(p => p.placeId !== newPlace.placeId)
      : [...currentList, newPlace];

    await setDoc(targetDoc, {
      ...data,
      [listKey]: updatedList,
    })
  }

  const isAlreadyExisted = (newPlace: PlaceType) => {
    const listKey =
      newPlace.types?.includes('restaurant') ? 'restaurantList' :
        newPlace.types?.includes('lodging') ? 'hotelList' : 'attractionList'

    const placeId = newPlace.placeId;

    return places[listKey]?.some(p => p.placeId === placeId) ?? false;
  }

  return { updatePlace, isAlreadyExisted }
}

