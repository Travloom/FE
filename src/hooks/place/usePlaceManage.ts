import { fireStore } from "@/firebase/firebaseClient";
import usePlaceStore from "@/stores/usePlaceStore";
import { Category, PlaceType } from "@/types/place/type";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect } from "react"

export const usePlaceManage = (planId: string) => {

  const {
    places,
    setPlaces,
    setSelectedCategory,
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
      if (data) {
        setPlaces('restaurantList', data.restaurantList)
        setPlaces('cafeList', data.cafeList)
        setPlaces('hotelList', data.hotelList)
        setPlaces('attractionList', data.attractionList)
      }
    })

    return () => {
      setSelectedCategory('맛집');
      setPlaces('restaurantList', null);
      setPlaces('cafeList', null);
      setPlaces('hotelList', null);
      setPlaces('attractionList', null);
      setPlaces('searchList', null);
      unsubscribe();
    }
  }, [planId]);

  const updatePlace = async (type: Category, newPlace: PlaceType) => {
    const targetDoc = doc(fireStore, 'travloom', 'plan', `${planId}`, 'places');

    const docSnap = await getDoc(targetDoc);

    if (!docSnap.exists()) return;

    const data = docSnap.data();

    const isAlreadyExist = isAlreadyExisted(type, newPlace)

    const listKey =
      type === 'restaurant' ? 'restaurantList' :
        type === 'cafe' ? 'cafeList' :
          type === 'hotel' ? 'hotelList' : 'attractionList'

    const currentList: PlaceType[] = data[listKey] || [];

    const updatedList = isAlreadyExist
      ? currentList.filter(p => p.placeId !== newPlace.placeId)
      : [...currentList, newPlace];

    await setDoc(targetDoc, {
      ...data,
      [listKey]: updatedList,
    })
  }

  const isAlreadyExisted = (type: Category, newPlace: PlaceType) => {
    const listKey =
      type === 'restaurant' ? 'restaurantList' :
        type === 'cafe' ? 'cafeList' :
          type === 'hotel' ? 'hotelList' : 'attractionList'

    const placeId = newPlace.placeId;

    return places[listKey]?.some(p => p.placeId === placeId) ?? false;
  }

  return { updatePlace, isAlreadyExisted }
}

