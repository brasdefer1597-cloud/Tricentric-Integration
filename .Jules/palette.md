## 2026-03-04 - [Missing CSS Animations]
**Learning:** Components often use custom animation classes (like `animate-shimmer` or `animate-fadeIn`) that are not part of the default Tailwind set. If these aren't defined in the global CSS, the UI feels static and "broken" despite the code referencing them.
**Action:** Always check `global.css` for @keyframes when seeing `animate-` classes in the components, especially in AI-generated or migrated projects.

## 2026-03-04 - [Form Accessibility via Headings]
**Learning:** In complex, multi-section forms, linking inputs to their section headings using `aria-labelledby` is a cleaner and more contextual way to provide labels than using the `label` tag when a heading already exists.
**Action:** Use `aria-labelledby` pointing to existing `h2`/`h3` IDs for form elements in dense layouts.
