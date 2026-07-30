import Background from "./Background";
import Image from "./Image";
import Content from "./Content";

export default function StoryTransition() {
  return (
    <section
      aria-labelledby="story-transition-heading"
      className="relative w-full min-h-[80vh] flex flex-col overflow-hidden"
    >
      <h2 id="story-transition-heading" className="sr-only">
        Our Purpose
      </h2>

      <Background>
        <Image />
      </Background>

      <Content />
    </section>
  );
}
