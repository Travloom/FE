import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface TagButtonProps {
  title: string;
  tagList: string[];
}

const TagButton: React.FC<TagButtonProps> = ({
  title,
  tagList,
}) => {

  const [isSelected, setIsSelected] = useState(false);

  const [currentTag, setCurrentTag] = useState(title);

  const [isHover, setIsHover] = useState(false);

  const [tempTag, setTempTag] = useState<string | null>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleTagButton = (item: string) => {
    if (!isFadingOut) {
      setIsFadingOut(true);
      setTempTag(item);
      setIsSelected(true);
    };
  }

  const handleAnimationComplete = () => {
    if (isFadingOut && tempTag) {
      setCurrentTag(tempTag);
      setTempTag(null);
      setIsFadingOut(false);
    }
  }

  return (
    <div
      className={`
        bg-white text-gray-300 border-[1px] ${isSelected ? `border-point` : `border-gray-300`}
        text-[20px] rounded-[22px] flex flex-col px-4 py-2 w-fit h-fit cursor-pointer transition-all-300-out items-center select-none`}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      <motion.p
        className={`${isSelected ? `text-point` : ``} mt-0.5 transition-all-300-out`}
        initial={{ opacity: 1 }}
        animate={{ opacity: isFadingOut ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        onAnimationComplete={handleAnimationComplete}
      >
        {currentTag}
      </motion.p>
      <AnimatePresence>
        {isHover && tagList && tagList.map((item) => {
          return (
            <motion.div
              key={item}
              initial={{ opacity: 0, width: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, width: "auto", height: "auto", marginTop: 10 }}
              exit={{ opacity: 0, width: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3 }}
              className={`overflow-x-hidden overflow-y-clip hover:text-point`}
              onClick={() => handleTagButton(item)}>
              <p className={`transition-all-300-out`}>{item}</p>
            </motion.div>
          )
        })}
        {isHover &&
          <motion.div
            initial={{ opacity: 0, width: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, width: "auto", height: "auto", marginTop: 10 }}
            exit={{ opacity: 0, width: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3 }}
            className={`overflow-x-hidden overflow-y-clip hover:text-point`}
            onClick={() => { }}>
            <p className={`transition-all-300-out`}>+</p>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}

export default TagButton;