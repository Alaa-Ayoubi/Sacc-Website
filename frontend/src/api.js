/* Talking to the Django backend.
 *
 * The backend runs on a free instance that sleeps when idle, so the first
 * request after a quiet spell can take the better part of a minute. That is
 * fine when someone has just pressed Submit, and not fine for painting the
 * page — so content never blocks rendering: the app starts from the snapshot
 * bundled at build time and swaps in fresh content only if it arrives.
 */

/* In development this is left empty so requests go through Vite's proxy and
 * are same-origin — no CORS involved. A production build points it at the
 * deployed backend, whose CORS allowlist names the live domain. */
const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

/** How long to wait for content before giving up and keeping the snapshot. */
const CONTENT_TIMEOUT_MS = 8000;
/** Form submissions wait much longer — the visitor is expecting a result. */
const SUBMIT_TIMEOUT_MS = 90000;

export class ApiError extends Error {
  constructor(message, { status = 0, fields = {} } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fields = fields;
  }
}

async function request(path, { timeout, ...options } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  let response;
  try {
    response = await fetch(`${BASE}${path}`, { ...options, signal: controller.signal });
  } catch (cause) {
    throw new ApiError(
      cause.name === 'AbortError' ? 'The request timed out.' : 'Could not reach the server.',
    );
  } finally {
    clearTimeout(timer);
  }

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(body.detail || 'The request failed.', {
      status: response.status,
      fields: body.errors || {},
    });
  }
  return body;
}

/** Fetch the whole bilingual bundle. Both languages arrive at once so
 *  switching language never costs another request. */
export function fetchSite() {
  return request('/api/v1/site/', { timeout: CONTENT_TIMEOUT_MS });
}

/** `website` is the honeypot: it stays hidden and empty for real people. */
export function submitQuote(values) {
  return request('/api/v1/leads/quote-requests/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    timeout: SUBMIT_TIMEOUT_MS,
    body: JSON.stringify({
      full_name: values.name,
      email: values.email,
      phone: values.phone || '',
      company: values.company,
      project_type: values.projectTypeKey || null,
      project_type_other: values.projectTypeKey ? '' : values.type || '',
      message: values.message,
      locale: values.locale || 'ar',
      website: values.website || '',
    }),
  });
}

/** Sends multipart when a CV file is attached, JSON otherwise. */
export function submitApplication(values) {
  const payload = {
    full_name: values.name,
    email: values.email,
    phone: values.phone,
    years_experience: values.exp,
    opening: values.roleSlug || null,
    role_other: values.roleSlug ? '' : values.role || '',
    cv_link: values.cv || '',
    note: values.note || '',
    locale: values.locale || 'ar',
    website: values.website || '',
  };

  if (!values.cvFile) {
    return request('/api/v1/careers/applications/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      timeout: SUBMIT_TIMEOUT_MS,
      body: JSON.stringify(payload),
    });
  }

  const form = new FormData();
  for (const [key, value] of Object.entries(payload)) {
    if (value !== null && value !== undefined) form.append(key, value);
  }
  form.append('cv_file', values.cvFile);
  // No Content-Type header: the browser sets the multipart boundary itself.
  return request('/api/v1/careers/applications/', {
    method: 'POST',
    timeout: SUBMIT_TIMEOUT_MS,
    body: form,
  });
}
