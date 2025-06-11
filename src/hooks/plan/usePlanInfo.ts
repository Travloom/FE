import { useEffect } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { fireStore } from "@/firebase/firebaseClient";
import usePlanStore from "@/stores/usePlanStore";

export const usePlanInfo = (planId: string) => {

  const {
    setIsInfoPending,
    setTitle,
    setAuthorEmail,
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
        setTitle(data?.title)
        setAuthorEmail(data?.authorEmail)
        setDays(data?.startDate, data?.endDate)
        setTags(data?.tags)
        setIsInfoPending(false)
      }
    });

    return () => {
      setTitle(null)
      setAuthorEmail(null)
      setDays(null, null)
      setTags(null)
      setIsInfoPending(true)
      unsubscribe()
    };
  }, [planId]);
};