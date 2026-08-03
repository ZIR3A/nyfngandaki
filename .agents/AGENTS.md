
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

<!-- BEGIN:crm-ui-standards -->
# CRM UI Component Standards

When building forms and UI elements in the CRM module, ALWAYS adhere to the following standards:
1. **Localization**: ALWAYS use the `LocalizedInput` (and `LocalizedTextarea` where applicable) component for fields that require both English and Nepali translations on a single form. Do NOT use duplicate side-by-side or stacked inputs.
2. **Notifications**: ALWAYS use the `toast` function from the `sonner` package (e.g. `toast.success()`, `toast.error()`) for all success, error, and informational snackbar messages instead of default alerts or customized toast objects.
3. **Media Uploads**: ALWAYS use the `MediaPicker` component (`@/features/storage/components/MediaPicker`) for file and image uploads. Do NOT create mock dropzones or unfunctional UI elements for uploads.
<!-- END:crm-ui-standards -->
