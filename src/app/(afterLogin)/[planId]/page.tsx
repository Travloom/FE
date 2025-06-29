'use client'

import Button from "@/components/common/Button";
import { useEffect, useRef, useState } from "react";
import Planner from "@/components/plan/Planner";
import Motion from "@/components/motion/Motion";
import usePlanStore from "@/stores/usePlanStore";
import { usePlanInfo } from "@/hooks/plan/usePlanInfo";
import { useParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import useUserStore from "@/stores/useUserStore";
import { PlaneIcon } from "@/assets/svgs";
import { deletePlanRequest, exitPlanRequest, inviteUserRequest, isCollaboratorRequest } from "@/apis/plan";
import { useMutation, useQuery } from "@tanstack/react-query";
import useNoticeModalStore from "@/stores/useAlertModalStore";
import { AxiosError } from "axios";
import usePageAnimateRouter from "@/hooks/common/usePageAnimateRouter";
import { ErrorResponse } from "@/types/error/type";
import TagButton from "@/components/common/TagButton";
import useInitPage from "@/hooks/common/useInitPage";
import useCheckModalStore from "@/stores/useCheckModalStore";
import CheckModal from "@/components/plan/CheckModal";

const PlanPage = () => {

  const {
    authorEmail,
    title,
    tags,
    isInfoPending,
  } = usePlanStore();

  const {
    user,
  } = useUserStore();

  const {
    setIsNoticeModalOpen,
    setNoticeModalText,
    setIsAlert,
  } = useNoticeModalStore();

  const {
    setIsCheckModalOpen,
    setCheckModalText,
    setFn,
  } = useCheckModalStore();

  const { planId }: { planId: string } = useParams();

  const pageAnimateRouter = usePageAnimateRouter();

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [email, setEmail] = useState("");

  const handleOver = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsInviteModalOpen(true);
  }

  const handleLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsInviteModalOpen(false);
      closeTimeoutRef.current = null;
    }, 500);
  }

  const handleNotice = (message: string, isAlert: boolean) => {
    setIsAlert(isAlert)
    setNoticeModalText(message)
    setIsNoticeModalOpen(true)
  }

  const { mutate: invitePlan } = useMutation({
    mutationFn: async () => {
      setIsInviteModalOpen(false)
      const data = await inviteUserRequest(planId, email);
      handleNotice(`${data?.userName}님을 초대하였습니다.`, false);
    },
    onError: (e: AxiosError<ErrorResponse>) => {
      const message = e?.response?.data?.detail || "";
      console.log(e)
      handleNotice(message, true);
    },
  })

  const { mutate: deletePlan } = useMutation({
    mutationFn: async () => {
      await deletePlanRequest(planId);
      pageAnimateRouter.replace('/');
    }
  })

  const { mutate: exitPlan } = useMutation({
    mutationFn: async () => {
      await exitPlanRequest(planId);
      pageAnimateRouter.replace('/');
    }
  })

  const handleDelete = () => {
    setIsCheckModalOpen(true);
    setCheckModalText("정말 삭제하실건가요?");
    setFn(deletePlan);
  }

  const handleExit = () => {
    setIsCheckModalOpen(true);
    setCheckModalText("정말 나가실건가요?");
    setFn(exitPlan);
  }

  const { data: isCollaborator, isPending: isCollabPending, error: collabError } = useQuery({
    queryKey: ["isCollaborator", planId],
    queryFn: async () => isCollaboratorRequest(planId),
    enabled: !!planId,
    retry: 0,
  })

  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && email.trim() !== "") {
      invitePlan();
    }
  }

  useEffect(() => {
    if (collabError) {
      const axiosError = collabError as AxiosError<ErrorResponse>;
      handleNotice(axiosError?.response?.data.detail || "잘못된 접근입니다.", true)
      pageAnimateRouter.replace('/')
    } else {
      if (isCollaborator && !isCollaborator?.isCollaborator) {
        handleNotice("참여 중인 플랜이 아닙니다.", true)
        pageAnimateRouter.replace('/')
      }
    }
  }, [isCollaborator, collabError])

  usePlanInfo(planId, !collabError);

  useInitPage(title);

  return (
    <AnimatePresence>
      {!isInfoPending && !isCollabPending &&
        <Motion.MotionDiv
          className={`
              lg:p-[60px] lg:pt-[90px]
              pt-[70px] gap-2.5 flex flex-col h-full transition-all-300-out`}>
          <div className={`lg:p-0 px-2.5 flex flex-row justify-between gap-2.5`}>
            <div className={`relative`}>
              <TagButton
                title={""}
                tagList={[tags?.region, tags?.people, tags?.companions, tags?.theme].filter((tag) => tag != null)}
                currentTag={"태그"}
                isHome={false}
                className={`absolute z-[200]`} />
            </div>
            <div className={`justify-end flex flex-row gap-2.5`}>
              <div
                className={`relative rounded-[22px]`}
                onMouseEnter={handleOver}
                onMouseLeave={handleLeave}>
                <Button text={"초대"} isActive={true} />
                <AnimatePresence>
                  {isInviteModalOpen &&
                    <Motion.MotionDiv
                      className={`flex flex-col gap-1 absolute right-0 top-10 bg-white p-2.5 border border-gray-300 rounded-[8px] z-[999]`}
                      onMouseEnter={handleOver}
                      onMouseLeave={handleLeave}>
                      <div className={`px-3 py-2 rounded-full border border-gray-300 flex flex-row gap-1`}>
                        <input
                          className={`text-[12px] w-[200px] mt-0.5`}
                          placeholder="초대할 상대방 이메일을 입력해주세요"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onKeyDown={handleEnter} />
                        <PlaneIcon
                          className={`${email.trim() !== "" ? `text-point cursor-pointer` : `text-gray-300`}
                          w-4 transition-all-300-out`}
                          onClick={() => invitePlan()} />
                      </div>
                    </Motion.MotionDiv>
                  }
                </AnimatePresence>
              </div>
              {user?.email === authorEmail ? (
                <Button text={"삭제"} isActive={true} isDelete={true} onClick={handleDelete} />
              ) : (
                <Button text={"나가기"} isActive={true} isDelete={true} onClick={handleExit} />
              )}
            </div>
          </div>
          <Planner />
          <CheckModal />
        </Motion.MotionDiv>
      }
    </AnimatePresence>
  )
}

export default PlanPage;