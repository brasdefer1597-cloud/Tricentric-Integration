## 2025-05-14 - Interactive Selection Accessibility
**Learning:** Custom selection cards implemented with \`div\` tags are not keyboard accessible and lack clear state communication for screen readers. Using semantic \`button\` tags with \`aria-pressed\` provides native focus support and clear accessibility state.
**Action:** Always use \`button\` or \`input\` for interactive selection elements and ensure they have appropriate ARIA attributes for state.

## 2025-05-14 - ProgressBar ARIA Roles
**Learning:** Progress bars need explicit ARIA roles and value attributes (\`role="progressbar"\`, \`aria-valuenow\`, etc.) to be correctly interpreted by assistive technologies.
**Action:** Include ARIA progress attributes in all custom progress bar components.

## 2026-03-08 - Component Accessibility with role="img"
**Learning:** For components that are visually descriptive but not interactive (like badges), using `role="img"` with a comprehensive `aria-label` provides a much better screen reader experience than allowing it to read multiple fragmented text nodes.
**Action:** Use `role="img"` and `aria-label` for summary-based UI components and hide internal elements with `aria-hidden="true"`.
