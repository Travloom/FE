import { useEffect } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { fireStore } from "@/firebase/firebaseClient";
import usePlanStore from "@/stores/usePlanStore";
import usePageAnimateRouter from "../common/usePageAnimateRouter";
import useNoticeModalStore from "@/stores/useAlertModalStore";

export const usePlanInfo = (planId: string, errorFlag: boolean) => {

  const {
    setIsInfoPending,
    setTitle,
    setAuthorEmail,
    setDays,
    setTags,
  } = usePlanStore();

  const {
    setIsNoticeModalOpen,
    setNoticeModalText,
    setIsAlert,
  } = useNoticeModalStore();

  const pageAnimateRouter = usePageAnimateRouter();

  useEffect(() => {
    if (errorFlag) {
      const checkDocs = async () => {
        const docSnap = await getDoc(targetDoc);

        if (!docSnap.exists()) {
          setTitle(null)
          setAuthorEmail(null)
          setDays(null, null)
          setTags(null)
          setIsInfoPending(true)
          return;
        }
      }

      const targetDoc = doc(fireStore, 'travloom', 'plan', `${planId}`, 'info');

      checkDocs();

      const unsubscribe = onSnapshot(targetDoc, (docSnapshot) => {

        if (!docSnapshot.exists()) {
          setNoticeModalText("플랜이 삭제되었습니다.")
          setIsAlert(true)
          setIsNoticeModalOpen(true)
          pageAnimateRouter.replace('/')
        }

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
    }
  }, [planId, errorFlag]);
};