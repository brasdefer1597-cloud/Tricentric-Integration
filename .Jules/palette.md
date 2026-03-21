# 🎨 Palette's Journal - SRAP UX & Accessibility

## 2025-07-24 - [Select Affordance and Checkbox Focus]
**Learning:** Using `appearance-none` on `<select>` elements without providing a custom SVG arrow removes the essential "dropdown" affordance, making the interactive element indistinguishable from a static box. Additionally, custom-styled checkboxes using `opacity-0` on native inputs require explicit focus-visible rings (using Tailwind's `peer-focus-visible`) on their decorative siblings to maintain keyboard accessibility.
**Action:** Always pair `appearance-none` with a custom background-image SVG arrow and ensure all hidden-native custom inputs have `peer-focus-visible:ring` states for accessibility.
