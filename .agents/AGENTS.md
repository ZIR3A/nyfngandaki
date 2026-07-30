
<!-- BEGIN:image-rendering-rule -->
# Image Rendering Standard

When rendering images in this project, ALWAYS use the Next.js <Image /> component with the following structure and styling to maintain UI consistency:

`jsx
<div className="w-full h-full relative overflow-hidden group">
  <Image 
    src={imageSource} 
    alt={"Alt Text"} 
    fill
    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out" 
  />
</div>
``n<!-- END:image-rendering-rule -->

<!-- BEGIN:cursor-effect-rule -->
# Cursor Pointer on CTAs

When rendering Call-To-Action (CTA) elements, buttons, clickable cards, or other interactive anchors, ALWAYS explicitly apply the `cursor-pointer` class to assure immediate interactive visual feedback on hover.
<!-- END:cursor-effect-rule -->
