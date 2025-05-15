import { useEffect, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { fireStore } from "@/firebase/firebaseClient";
import { CustomLayout } from "@/types/schedule/types";

export const useSchedule = (planId: string) => {
  const [layout, setLayout] = useState<CustomLayout[]>([]);

  useEffect(() => {
    const targetDoc = doc(fireStore, 'travloom', 'plan', `${planId}`, 'schedules');
    const unsubscribe = onSnapshot(targetDoc, (docSnapshot) => {
      const data = docSnapshot.data();
      if (data) setLayout(data.scheduleList);
    });

    return () => unsubscribe();
  }, [planId]);

  const updateSchedule = async (updatedLayout: CustomLayout[]) => {
    const targetDoc = doc(fireStore, 'travloom', 'plan', `${planId}`, 'schedules');
    await setDoc(targetDoc, { scheduleList: updatedLayout });
  }

  return { layout, setLayout, updateSchedule };
};