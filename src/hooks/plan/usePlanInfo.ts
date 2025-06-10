import { useEffect } from "react";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { fireStore } from "@/firebase/firebaseClient";
import usePlanStore from "@/stores/usePlanStore";

export const usePlanInfo = (planId: string) => {

  const {
    setIsInfoPending,
    setDays,
    setTags,
  } = usePlanStore();

  useEffect(() => {

    const checkDocs = async () => {
      const docSnap = await getDoc(targetDoc);

      if (!docSnap.exists()) {
        // 에러 처리
        console.log('Plan Info 존재하지 않음')
      }
    }

    const targetDoc = doc(fireStore, 'travloom', 'plan', `${planId}`, 'info');

    checkDocs();

    const unsubscribe = onSnapshot(targetDoc, (docSnapshot) => {
      const data = docSnapshot.data();

      if (data) {
        setDays(data?.startDate, data?.endDate)
        setTags(data?.tags)
        setIsInfoPending(false)
      }
    });

    return () => {
      unsubscribe()
      setDays(null, null)
      setTags(null)
      setIsInfoPending(true)
    };
  }, [planId]);
};