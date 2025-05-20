'use client'

import { KeyboardEvent, useEffect, useRef, useState } from "react";
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

  const [region, setRegion] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const regionRef = useRef<HTMLInputElement>(null);

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

  const handleMouseLeave = () => {
    setIsHover(false);
    setIsEditing(false);
  }

  const handleAddRegionInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      tagList.push(region);
      handleTagButton(region)
      setIsSelected(true);
      setIsEditing(false);
      setRegion("");
    }
  }

  useEffect(() => {
    regionRef.current?.focus();
  }, [isEditing])

  return (
    <div
      className={`
        h-fit w-fit
      bg-white text-gray-300 border-[1px] ${isSelected ? `border-point` : `border-gray-300`}
        lg:text-[20px] lg:px-4 lg:py-2
        text-[14px] px-3 py-1.5 rounded-[22px] flex flex-col w-fit h-fit cursor-pointer transition-all-300-out items-center select-none`}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={handleMouseLeave}>
      <motion.p
        className={`${isSelected ? `text-point` : ``} mt-0.5 transition-all-300-out`}
        initial={{ opacity: 1 }}
        animate={{ opacity: isFadingOut ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        onAnimationComplete={handleAnimationComplete}
      >
        {currentTag}
      </motion.p>
      <AnimatePresence>
        {isHover && tagList && tagList.map((item, index) => {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, width: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, width: "auto", height: "auto", marginTop: 10 }}
              exit={{ opacity: 0, width: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.5 }}
              className={`overflow-x-hidden overflow-y-clip hover:text-point`}
              onClick={() => handleTagButton(item)}>
              <p className={`transition-all-300-out`}>{item}</p>
            </motion.div>
          )
        })}
        {isHover &&
          (!isEditing ? (
            <motion.div
              initial={{ opacity: 0, width: 0, height: "auto", marginTop: 0 }}
              animate={{ opacity: 1, width: "auto", height: "auto", marginTop: 10 }}
              exit={{ opacity: 0, width: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3 }}
              className={`overflow-x-hidden overflow-y-clip hover:text-point`}
              onClick={() => setIsEditing(true)}>
              <p className={`transition-all-300-out`}>+</p>
            </motion.div>
          ) : (
            <motion.input
              initial={{ opacity: 0, width: 0, height: "auto", marginTop: 10 }}
              animate={{ opacity: 1, width: 100, height: "auto", marginTop: 10 }}
              exit={{ opacity: 0, width: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3 }}
              className={`text-center`}
              placeholder={title}
              ref={regionRef}
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              onKeyDown={handleAddRegionInput}>
            </motion.input>
          ))
        }
      </AnimatePresence>
    </div>
  )
}

export default TagButton;