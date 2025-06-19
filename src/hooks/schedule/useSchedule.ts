import { useEffect, useMemo, useState } from "react";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { fireStore } from "@/firebase/firebaseClient";
import { throttle } from 'lodash';
import { CustomLayout } from "@/types/schedule/types";
import usePlanStore from "@/stores/usePlanStore";

export const useSchedule = (planId: string) => {

  const {
    isSchedulePending,
    setIsSchedulePending,
  } = usePlanStore();

  const [layout, setLayout] = useState<CustomLayout[]>([]);

  useEffect(() => {
    const checkDocs = async () => {
      const docSnap = await getDoc(targetDoc);
      if (!docSnap.exists()) {
        setIsSchedulePending(true);
        return;
      }
    }

    const targetDoc = doc(fireStore, 'travloom', 'plan', `${planId}`, 'schedules');

    checkDocs();

    const unsubscribe = onSnapshot(targetDoc, (docSnapshot) => {
      const data = docSnapshot.data();
      if (data) {
        setLayout(data.scheduleList);
        setIsSchedulePending(false);
      }
    });

    return () => {
      setLayout([]);
      setIsSchedulePending(true);
      unsubscribe()
    };
  }, [planId]);

  const throttledUpdateSchedule = useMemo(() => {
    return throttle(async (updatedLayout: CustomLayout[]) => {
      const targetDoc = doc(fireStore, 'travloom', 'plan', `${planId}`, 'schedules');
      await setDoc(targetDoc, { scheduleList: updatedLayout });
    }, 1000); // 1000ms = 1초
  }, [planId]);

  const updateSchedule = async (updatedLayout: CustomLayout[]) => {
    const targetDoc = doc(fireStore, 'travloom', 'plan', `${planId}`, 'schedules');

    const docSnap = await getDoc(targetDoc);

    if (!docSnap.exists()) return;
    if (!isSchedulePending) {
      throttledUpdateSchedule(updatedLayout);
    }
  };

  return { layout, setLayout, updateSchedule };
};