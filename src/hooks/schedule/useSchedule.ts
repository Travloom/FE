import { useEffect, useMemo, useState } from "react";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { fireStore } from "@/firebase/firebaseClient";
import { throttle } from 'lodash';
import { CustomLayout } from "@/types/schedule/types";
import usePlanStore from "@/stores/usePlanStore";

export const useSchedule = (planId: string) => {

  const {
    isPending,
    setIsPending,
  } = usePlanStore();

  const [layout, setLayout] = useState<CustomLayout[]>([]);

  useEffect(() => {

    const checkDocs = async () => {
      const docSnap = await getDoc(targetDoc);

      if (!docSnap.exists()) {
        await setDoc(targetDoc, {
          scheduleList: [],
        });
      }
    }

    const targetDoc = doc(fireStore, 'travloom', 'plan', `${planId}`, 'schedules');

    checkDocs();

    const unsubscribe = onSnapshot(targetDoc, (docSnapshot) => {
      const data = docSnapshot.data();
      if (data) {
        setLayout(data.scheduleList);
        setIsPending(false);
      }
    });

    return () => {
      unsubscribe()
      setIsPending(true);
    };
  }, [planId]);

  const throttledUpdateSchedule = useMemo(() => {
    return throttle(async (updatedLayout: CustomLayout[]) => {
      const targetDoc = doc(fireStore, 'travloom', 'plan', `${planId}`, 'schedules');
      await setDoc(targetDoc, { scheduleList: updatedLayout });
    }, 1000); // 1000ms = 1초
  }, [planId]);

  const updateSchedule = (updatedLayout: CustomLayout[]) => {
    if (!isPending) {
      throttledUpdateSchedule(updatedLayout);
    }
  };

  return { layout, setLayout, updateSchedule };
};