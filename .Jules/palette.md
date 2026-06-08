## 2025-05-14 - Interactive Selection Accessibility
**Learning:** Custom selection cards implemented with \`div\` tags are not keyboard accessible and lack clear state communication for screen readers. Using semantic \`button\` tags with \`aria-pressed\` provides native focus support and clear accessibility state.
**Action:** Always use \`button\` or \`input\` for interactive selection elements and ensure they have appropriate ARIA attributes for state.

## 2025-05-14 - ProgressBar ARIA Roles
**Learning:** Progress bars need explicit ARIA roles and value attributes (\`role="progressbar"\`, \`aria-valuenow\`, etc.) to be correctly interpreted by assistive technologies.
**Action:** Include ARIA progress attributes in all custom progress bar components.

## 2025-05-15 - SRAP Methodology & Chalamandra Branding Integration
**Learning:** Integrating a specific persona (Chalamandra Magistral) and methodology (SRAP) requires decoupling narrative logic (gamification levels, XP) from UI components to maintain modularity while ensuring the "Sensory Atmosphere" is consistently reflected in both code structure and interactive feedback loops.
**Action:** Created `src/lib/gamification.ts` for narrative-driven level logic and `src/hooks/useEvaluation.ts` for stateful persistence, while documenting the vision in `SRAP_FUNNEL.md`.

## 2025-05-16 - Accessible Dynamic Interfaces
**Learning:** For dynamic components like breathing timers, using `role="status"` and `aria-live="polite"` ensures state changes are announced without interrupting the user. Providing clear external link disclosures in `aria-label` prevents unexpected navigation surprises.
**Action:** Implement ARIA live regions for all timed UI elements and include '(opens in new tab)' in labels for external links.

## 2026-06-08 - StatusFeedback vs. Native Alerts
**Learning:** Native \`alert()\` calls are disruptive and break the immersive experience of the SRAP theme. Implementing a themed \`StatusFeedback\` (toast) system with \`aria-live\` provides non-blocking, accessible communication.
**Action:** Use the \`StatusFeedback\` component for all validation and process status messages; avoid native browser dialogs.

## 2026-06-08 - "Enable-to-Validate" UI Pattern
**Learning:** Disabling action buttons (like 'SAVE') when a form is incomplete creates a "dead end" for users who may not know why it's disabled. Keeping the button enabled and providing specific error feedback via \`StatusFeedback\` on click improves guidance and discoverability of missing fields.
**Action:** Prefer enabling submit buttons and providing actionable validation feedback on click over disabling the button silently.
