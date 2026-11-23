# Analytics setup: next milestone

Status: local usage hooks are prepared; no GA4 tag, analytics requests, recording, cookies or consent storage is installed. Search Console is a separate service and does not measure calculator button clicks.

## Account setup

1. Go to https://analytics.google.com/ and create or select an Analytics account.
2. Create a Google Analytics 4 property named Everyday Calculator. Select your intended reporting timezone (Asia/Kolkata) and currency (INR).
3. Complete Google's account setup yourself, including any terms it presents.
4. In Admin, open Data streams and create a Web stream. Use website host ck-surya.github.io and stream name Everyday Calculator. If the URL field accepts the full path, use https://ck-surya.github.io/everyday-calculator/.
5. Copy the public Measurement ID beginning G-. Do not share passwords, API secrets, tokens, or account credentials.
6. Turn off Enhanced Measurement initially so tracking behavior remains explicit and duplicate form-interaction events are avoided.

## Events prepared in the code

assets/usage-events.mjs dispatches a local everyday:usage event. It does not send data anywhere. Each event includes calculator_type=discount. Only explicitly allowed controlled text parameters are included; original price, discount input, computed amounts, and arbitrary form text are excluded.

| Event | When | Additional parameters |
|---|---|---|
| calculator_started | First input/preset/example/submit per page load | None |
| calculation_completed | Each valid calculation | None |
| validation_error | Each invalid field on submit | field_name, error_code |
| reset_clicked | Reset | None |
| example_selected | Worked-example button | example_id |
| discount_preset_selected | A preset button | preset_id |

Repeated calculations are separate actions. Measure completion with distinct measured sessions, not by dividing raw event counts. Pre-consent events will not be replayed once analytics is connected.

## Implementation once the Measurement ID is supplied

- Load Google's script only after the visitor accepts analytics; declining still permits full calculator use.
- Offer equal accept/decline choices and a persistent settings control for changing the decision.
- Keep advertising storage, advertising personalization, and Google Signals disabled.
- Restrict analytics cookies to the calculator project path. A github.io account may host other projects.
- Send sanitized page URLs without query strings or fragment values. Do not enable user-provided data or send entered amounts.
- Update the privacy page to describe the actual provider, collection, preference storage, and controls before activation.
- Configure needed event-scoped custom dimensions such as calculator_type and field_name. Mark calculation_completed as a key event if desired.

## Verification and limitations

Test in an isolated browser context: no Google requests before choice or after decline; exactly one page view after accept; expected events on each action; no entered amounts in payloads; withdrawal prevents later collection; keyboard and mobile consent controls work. Then verify delivery in GA4 DebugView/Realtime in the owner's property. Browser stubs prove code behavior, not delivery to Google. Blockers and declined consent mean reports are incomplete.

Official references:
- https://support.google.com/analytics/answer/14183469
- https://developers.google.com/analytics/devguides/collection/ga4/events
- https://developers.google.com/tag-platform/security/guides/consent
