import { RightArrowIcon } from "@/assets/svgs";
import usePageAnimateRouter from "@/hooks/common/usePageAnimateRouter";
import useSidebarStore from "@/stores/useSidebarStore";

interface SidebarItemProps {
  text: string;
  uri: string;
}

const SidebarItem = ({
  text,
  uri,
}: SidebarItemProps) => {

  const {
    setIsSidebarOpen,
  } = useSidebarStore();

  const pageAnimateRouter = usePageAnimateRouter();

  return (
    <div
      className={`flex flex-row justify-between items-center border-b border-gray-200 w-full text-[16px] text-gray-500 px-6 py-5 cursor-pointer`}
      onClick={() => {
        pageAnimateRouter.push(uri)
        setIsSidebarOpen(false)
      }}>
      <p>{text}</p>
      <RightArrowIcon className={`h-4 text-gray-400`} />
    </div>
  )
}

export default SidebarItem;