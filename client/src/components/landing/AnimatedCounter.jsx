import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function AnimatedCounter({ target, suffix = "", duration = 1.4, prefix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (timestamp) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(easeOut * target));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4 }}
      className="font-display text-3xl sm:text-4xl font-black tracking-tight text-stone-900"
    >
      {prefix}{value.toLocaleString()}{suffix}
    </motion.span>
  );
}
