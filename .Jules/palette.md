## 2025-05-14 - Interactive Selection Accessibility
**Learning:** Custom selection cards implemented with \`div\` tags are not keyboard accessible and lack clear state communication for screen readers. Using semantic \`button\` tags with \`aria-pressed\` provides native focus support and clear accessibility state.
**Action:** Always use \`button\` or \`input\` for interactive selection elements and ensure they have appropriate ARIA attributes for state.

## 2025-05-14 - ProgressBar ARIA Roles
**Learning:** Progress bars need explicit ARIA roles and value attributes (\`role="progressbar"\`, \`aria-valuenow\`, etc.) to be correctly interpreted by assistive technologies.
**Action:** Include ARIA progress attributes in all custom progress bar components.

## 2025-03-09 - Accessible Live Updates
**Learning:** Dynamic UI changes, like breathing phase timers, must be announced by assistive technologies using `aria-live="polite"` and `role="status"` to prevent information loss for screen reader users.
**Action:** Wrap dynamic text updates in ARIA live regions to ensure they are announced upon state change.
