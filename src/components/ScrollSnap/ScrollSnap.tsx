import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useEffect, useRef, useState } from "react";
import { ScrollSection } from "./ScrollSection";
interface Section {
  title: string;
  content: JSX.Element;
  icon?: JSX.Element;
}

interface ScrollSnapProps {
  sections: Section[];
  className?: string;
}
export const ScrollSnap: React.FC<ScrollSnapProps> = ({
  sections,
  className,
}) => {
  const scrollSnapRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleScrollToNextSection(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    evt.preventDefault();
    if (scrollSnapRef.current) {
      scrollSnapRef.current.scrollBy({
        top: scrollSnapRef.current.clientHeight,
        behavior: "smooth",
      });
    }
  }

  function handleScrollToIndex(index: number) {
    return () => {
      if (scrollSnapRef.current) {
        scrollSnapRef.current.scrollTo({
          top: scrollSnapRef.current.clientHeight * index + 1,
          behavior: "smooth",
        });
      }
    };
  }

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = scrollSnapRef.current?.scrollTop;

      const elementHeight = scrollSnapRef.current?.clientHeight;
      const index = Math.floor(
        (scrollPosition! + elementHeight! / 2) / elementHeight!,
      );

      if (index == currentIndex) return;

      setCurrentIndex(index);
    }

    if (scrollSnapRef.current) {
      scrollSnapRef.current.addEventListener("scroll", handleScroll);

      return () => {
        if (scrollSnapRef?.current) {
          scrollSnapRef?.current?.removeEventListener("scroll", handleScroll);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`h-[100%] max-h-[100%] w-[100%] snap-y snap-mandatory  snap-center overflow-y-auto overscroll-y-contain scroll-smooth 
        ${className}`}
      ref={scrollSnapRef}
    >
      <div className="gap4 absolute left-4 z-50  hidden flex-col">
        {sections.map((section, index) => (
          <div
            key={index}
            className="flex h-[100px] w-full items-center gap-4  text-3xl text-black hover:cursor-pointer"
            onClick={handleScrollToIndex(index)}
          >
            {section.icon ?? <RadioButtonUncheckedIcon />}
            <span>{section.title}</span>
          </div>
        ))}
      </div>

      {sections.map((section, index) => (
        <ScrollSection
          key={index}
          scrollToNextSection={handleScrollToNextSection}
          section={section.content}
          lastSection={index === sections.length - 1}
        />
      ))}
    </div>
  );
};
