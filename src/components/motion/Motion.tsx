import { motion } from "framer-motion";
import { ComponentProps, ReactNode } from "react";

type MotionDivProps = {
  children: ReactNode;
  className?: string;
} & ComponentProps<typeof motion.div>;

type MotionPProps = {
  children: ReactNode;
  className?: string;
} & ComponentProps<typeof motion.p>;

const MotionDiv: React.FC<MotionDivProps> = ({
  children, 
  className,
  ...rest
}) => {

  return(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`${className}`}
      {...rest}>
      {children}
    </motion.div>
  )
}

const MotionP: React.FC<MotionPProps> = ({
  children, 
  className,
  ...rest
}) => {

  return(
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`${className}`}
      {...rest}>
      {children}
    </motion.p>
  )
}

export default { MotionDiv, MotionP };