import { useEffect, useMemo, useState } from "react";
import { doc, getDoc, onSnapshot, updateDoc, deleteField, UpdateData, DocumentData } from "firebase/firestore";
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

  const targetDoc = useMemo(() => doc(fireStore, 'travloom', 'plan', `${planId}`, 'schedules'), [planId]);

  useEffect(() => {
    const checkDocs = async () => {
      const docSnap = await getDoc(targetDoc);
      if (!docSnap.exists()) {
        setIsSchedulePending(true);
        return;
      }
    }

    checkDocs();

    const unsubscribe = onSnapshot(targetDoc, (docSnapshot) => {
      const data = docSnapshot.data();
      if (data) {
        if (data.scheduleMap) {
          setLayout(Object.values(data.scheduleMap) as CustomLayout[]);
        } else if (data.scheduleList) {
          setLayout(data.scheduleList);
        }
        setIsSchedulePending(false);
      }
    });

    return () => {
      setLayout([]);
      setIsSchedulePending(true);
      unsubscribe()
    };
  }, [planId, targetDoc, setIsSchedulePending]);

  const throttledUpdateSchedule = useMemo(() => {
    return throttle(async (updatedLayout: CustomLayout[]) => {
      const docSnap = await getDoc(targetDoc);
      if (!docSnap.exists()) return;
      
      const data = docSnap.data();
      const currentMap: Record<string, CustomLayout> = data?.scheduleMap || {};
      const currentIds = new Set(Object.keys(currentMap));
      const updatedIds = new Set(updatedLayout.map(item => String(item.i)));

      const updatePayload: UpdateData<DocumentData> = {};

      updatedLayout.forEach((item) => {
        const itemId = String(item.i);
        const currentItem = currentMap[itemId];
        
        if (JSON.stringify(currentItem) !== JSON.stringify(item)) {
          updatePayload[`scheduleMap.${itemId}`] = item;
        }
      });

      currentIds.forEach(id => {
        if (!updatedIds.has(id)) {
          updatePayload[`scheduleMap.${id}`] = deleteField();
        }
      });

      if (Object.keys(updatePayload).length > 0) {
        try {
          await updateDoc(targetDoc, updatePayload);
          
          if (data?.scheduleList) {
            await updateDoc(targetDoc, { scheduleList: deleteField() });
          }
        } catch (error) {
          console.error("Atomic update failed:", error);
        }
      }
    }, 1000);
  }, [targetDoc]);

  const updateSchedule = async (updatedLayout: CustomLayout[]) => {
    if (!isSchedulePending) {
      throttledUpdateSchedule(updatedLayout);
    }
  };

  return { layout, setLayout, updateSchedule };
};