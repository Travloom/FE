'use client'

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface TagButtonProps {
  title: string;
  tagList: string[];
  currentTag: string;
  setCurrentTag: (value: string) => void;
}

const TagButton: React.FC<TagButtonProps> = ({
  title,
  tagList,
  currentTag,
  setCurrentTag,
}) => {

  const [isHover, setIsHover] = useState(false);

  const [tagInput, setTagInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const regionRef = useRef<HTMLInputElement>(null);

  const [tempTag, setTempTag] = useState<string | null>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleTagButton = (item: string) => {
    if (!isFadingOut) {
      setIsFadingOut(true);
      setTempTag(item);
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

  const handleAddTagInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      tagList.push(tagInput);
      handleTagButton(tagInput)
      setIsEditing(false);
      setTagInput("");
      setIsHover(false);
    }
  }

  useEffect(() => {
    regionRef.current?.focus();
  }, [isEditing])

  return (
    <div
      className={`
        h-fit w-fit
      bg-white text-gray-300 border-[1px] ${currentTag !== title ? `border-point` : `border-gray-300`}
        lg:text-[18px] lg:px-3 lg:py-1.5 lg:rounded-[18px]
        text-[14px] px-3 py-1.5 rounded-[16px] flex flex-col w-fit h-fit cursor-pointer transition-all-300-out items-center select-none`}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={handleMouseLeave}>
      <motion.p
        className={`${currentTag !== title ? `text-point` : ``} mt-0.5 transition-all-300-out`}
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
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTagInput}>
            </motion.input>
          ))
        }
      </AnimatePresence>
    </div>
  )
}

export default TagButton;