## 2025-05-14 - Interactive Selection Accessibility
**Learning:** Custom selection cards implemented with \`div\` tags are not keyboard accessible and lack clear state communication for screen readers. Using semantic \`button\` tags with \`aria-pressed\` provides native focus support and clear accessibility state.
**Action:** Always use \`button\` or \`input\` for interactive selection elements and ensure they have appropriate ARIA attributes for state.

## 2025-05-14 - ProgressBar ARIA Roles
**Learning:** Progress bars need explicit ARIA roles and value attributes (\`role="progressbar"\`, \`aria-valuenow\`, etc.) to be correctly interpreted by assistive technologies.
**Action:** Include ARIA progress attributes in all custom progress bar components.

## 2025-05-14 - Real-time Status Announcements
**Learning:** Dynamic UI elements like timers, breathing guides, or status updates are invisible to screen readers if they change without a page reload. Using `aria-live="polite"` and `role="status"` ensures these updates are announced automatically without interrupting the user.
**Action:** Always wrap dynamic text updates in an `aria-live` region to provide real-time feedback to assistive technologies.

## 2025-05-14 - Redundant Decorative Emojis
**Learning:** Emojis and icons used purely for decoration can clutter the screen reader experience if they are not explicitly hidden.
**Action:** Apply `aria-hidden="true"` to decorative emojis or icons that do not provide unique functional information.
