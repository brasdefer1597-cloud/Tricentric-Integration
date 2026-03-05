## 2025-05-14 - Interactive Selection Accessibility
**Learning:** Custom selection cards implemented with \`div\` tags are not keyboard accessible and lack clear state communication for screen readers. Using semantic \`button\` tags with \`aria-pressed\` provides native focus support and clear accessibility state.
**Action:** Always use \`button\` or \`input\` for interactive selection elements and ensure they have appropriate ARIA attributes for state.

## 2025-05-14 - ProgressBar ARIA Roles
**Learning:** Progress bars need explicit ARIA roles and value attributes (\`role="progressbar"\`, \`aria-valuenow\`, etc.) to be correctly interpreted by assistive technologies.
**Action:** Include ARIA progress attributes in all custom progress bar components.

## 2025-05-14 - Semantic Form Labeling and Grouping
**Learning:** Generic text descriptions for form elements (select, textarea, checkboxes) are insufficient for screen readers. Using semantic `<label>` elements linked by `id` and wrapping checkbox groups in a `<fieldset>` with a `<legend>` significantly improves accessibility and form structure.
**Action:** Always link form inputs to semantic labels and use fieldsets for related checkbox/radio groups.
