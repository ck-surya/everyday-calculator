// Local event hooks only. No network requests, cookies, or persistence.
// A consent-controlled analytics adapter can subscribe when GA4 is configured.
const allowed = {
  calculator_started: [],
  calculation_completed: [],
  validation_error: ['field_name', 'error_code'],
  reset_clicked: [],
  example_selected: ['example_id'],
  discount_preset_selected: ['preset_id'],
};

export function trackUsage(name, parameters = {}) {
  if (!Object.hasOwn(allowed, name)) return;
  const safe = { calculator_type: 'discount' };
  for (const key of allowed[name]) {
    if (typeof parameters[key] === 'string' && /^[a-z0-9_]{1,40}$/.test(parameters[key])) {
      safe[key] = parameters[key];
    }
  }
  document.dispatchEvent(new CustomEvent('everyday:usage', {
    detail: { name, parameters: safe },
  }));
}
