'use client';
import { ArrowUpIcon } from '@heroicons/react/outline';
import classes from './ScrollToTop.module.css';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export default function ScrollToTop() {
  return <button onClick={scrollToTop} className={
    classes.container
  }><ArrowUpIcon /></button>
}
