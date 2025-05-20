'use client'

import Button from "@/components/common/Button";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import usePageStore from "../../stores/usePageStore";
import Planner from "@/components/plan/Planner";
import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { fireStore } from "@/firebase/firebaseClient";
import { useParams } from "next/navigation";
import usePlanStore from "@/stores/usePlanStore";
import Motion from "@/components/motion/Motion";

interface tagProps {
  where: string;
  who: string;
  theme: string;
}

const PlanPage = () => {

  const {
    isPagePending,
    setIsPagePending,
  } = usePageStore()

  const {
    setTitle,
  } = usePlanStore();

  useEffect(() => {
    setIsPagePending(false);
  }, [])

  const [planData, setPlanData] = useState<DocumentData | undefined>(undefined);;
  const { planId } = useParams();
  const [tags, setTags] = useState<tagProps | null>();
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {

    const targetDoc = doc(
      fireStore,
      'travloom',
      'plan',
      `${planId}`,
      'info',
    )

    const unsubscribe = onSnapshot(targetDoc, (docSnapshot) => {
      const data = docSnapshot.data();

      setPlanData(data);
      setTags(data?.tags);
      setTitle(data?.title)
      setIsPending(false);

    })

    return () => unsubscribe();
  }, [planId])

  return (
    <>
      <AnimatePresence>
        {!isPagePending && !isPending &&
          <Motion.MotionDiv
            className={`
              lg:p-[60px] lg:pt-[140px]
              pt-[70px] gap-2.5 flex flex-col h-full transition-all-300-out`}>
            <div className={`lg:p-0 px-2.5 flex flex-row justify-between`}>
              <div className={`flex flex-row gap-2.5 transition-all-300-out`}>
                {tags?.where && <Button text={tags?.where} isActive={false} />}
                {tags?.who && <Button text={tags?.who} isActive={false} />}
                {tags?.theme && <Button text={tags?.theme} isActive={false} />}
              </div>
              <Button text={"공유"} isActive={true} />
            </div>
            <Planner/>
          </Motion.MotionDiv>
        }
      </AnimatePresence>
    </>
  )
}

export default PlanPage;