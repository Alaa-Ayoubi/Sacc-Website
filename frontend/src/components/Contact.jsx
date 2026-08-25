/* The contact form.
 *
 * Reaching the company is the point, so there are two equal routes: fill this
 * in, or use the mailto link above it. Only name, email, organization and a
 * message are required — the project type is a convenience.
 *
 * Validation mirrors the backend's rules so a visitor is corrected before a
 * round trip, and field errors coming back from the API are merged into the
 * same display — the server stays the authority.
 *
 * On a free instance the first submission can wait out a cold start of nearly
 * a minute, so the button reports progress rather than appearing stuck.
 */
import { useEffect, useRef, useState } from 'react';

import { useSite } from '../SiteContext.jsx';
import { submitQuote } from '../api.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY = { name: '', email: '', phone: '', company: '', type: '', message: '', website: '' };

/* The API returns snake_case field names; map them back onto the form. */
const FIELD_BY_API = {
  full_name: 'name',
  email: 'email',
  phone: 'phone',
  company: 'company',
  project_type: 'type',
  project_type_other: 'type',
  message: 'message',
};

export default function Contact({ prefill, onPrefillUsed }) {
  const { t, lang, company } = useSite();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | sending | sent | failed
  const [failure, setFailure] = useState('');
  const messageRef = useRef(null);

  // Pre-fill the subject so an emailed enquiry arrives already labelled.
  const mailto = `mailto:${company.email}?subject=${encodeURIComponent(
    `${t.contact.title} — ${t.brandLine}`,
  )}`;

  // A "enquire about X" button elsewhere on the page drops its subject in here.
  useEffect(() => {
    if (!prefill) return;
    setValues((current) => ({ ...current, message: prefill }));
    setState('idle');
    messageRef.current?.focus();
    onPrefillUsed?.();
  }, [prefill, onPrefillUsed]);

  const set = (key) => (event) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: '' }));
    if (state === 'sent') setState('idle');
  };

  const validate = () => {
    const found = {};
    if (!values.name.trim()) found.name = t.contact.errors.name;
    if (!EMAIL.test(values.email)) found.email = t.contact.errors.email;
    if (!values.company.trim()) found.company = t.contact.errors.company;
    if (values.message.trim().length < 10) found.message = t.contact.errors.message;
    return found;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;

    setState('sending');
    setFailure('');
    try {
      const option = t.contact.typeOptions?.find((o) => o.label === values.type);
      await submitQuote({
        ...values,
        projectTypeKey: option?.key || null,
        locale: lang,
      });
      setValues(EMPTY);
      setState('sent');
    } catch (error) {
      const mapped = {};
      for (const [apiField, messages] of Object.entries(error.fields || {})) {
        const field = FIELD_BY_API[apiField];
        if (field) mapped[field] = messages[0];
      }
      setErrors(mapped);
      setFailure(Object.keys(mapped).length ? '' : error.message || t.contact.failure);
      setState('failed');
    }
  };

  const field = (key, label, extra = {}) => (
    <div className="field" key={key}>
      <label htmlFor={`q-${key}`}>{label}</label>
      <input
        id={`q-${key}`}
        value={values[key]}
        onChange={set(key)}
        placeholder={t.contact.placeholders[key]}
        aria-invalid={errors[key] ? 'true' : undefined}
        aria-describedby={errors[key] ? `q-${key}-error` : undefined}
        {...extra}
      />
      {errors[key] && (
        <span className="error" id={`q-${key}-error`} role="alert">
          {errors[key]}
        </span>
      )}
    </div>
  );

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t.contact.eyebrow}</span>
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="section-lead">{t.contact.lead}</p>
        </div>

        <div className="contact-grid">
          <div className="card">
            <div className="info-row">
              <div>
                <div className="info-label">{t.contact.officeHeading}</div>
                <div className="info-value">{t.contact.address}</div>
              </div>
            </div>
            <div className="info-row">
              <div>
                <div className="info-label">{t.contact.hoursHeading}</div>
                {t.contact.hours.map((line) => (
                  <div className="info-value" key={line}>{line}</div>
                ))}
              </div>
            </div>
            <div className="info-row">
              <div>
                <div className="info-label">{t.footer.contactHeading}</div>
                {company.phone && (
                  <div className="info-value">
                    <a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a>
                  </div>
                )}
                {company.mobile && (
                  <div className="info-value">
                    <a href={`tel:${company.mobile.replace(/\s/g, '')}`}>{company.mobile}</a>
                  </div>
                )}
                {company.email && (
                  <div className="info-value">
                    <a href={`mailto:${company.email}`}>{company.email}</a>
                  </div>
                )}
              </div>
            </div>
            <div className="info-row">
              <div>
                <div className="info-label">{t.contact.crLabel}</div>
                <div className="info-value">{company.cr}</div>
              </div>
            </div>
          </div>

          <div>
            {company.email && (
              <p className="or-email">
                {t.contact.orEmail}{' '}
                <a href={mailto}>{company.email}</a>
              </p>
            )}

            <form className="card" onSubmit={onSubmit} noValidate>
              <div className="form-grid">
                {field('name', t.contact.fields.name, { autoComplete: 'name' })}
                {field('email', t.contact.fields.email, { type: 'email', autoComplete: 'email' })}
                {field('company', t.contact.fields.company, { autoComplete: 'organization' })}

                <div className="field">
                  <label htmlFor="q-type">{t.contact.fields.type}</label>
                  <select
                    id="q-type"
                    value={values.type}
                    onChange={set('type')}
                    aria-invalid={errors.type ? 'true' : undefined}
                  >
                    <option value="">{t.contact.placeholders.type}</option>
                    {t.contact.types.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.type && <span className="error" role="alert">{errors.type}</span>}
                </div>

                <div className="field full">
                  <label htmlFor="q-message">{t.contact.fields.message}</label>
                  <textarea
                    id="q-message"
                    ref={messageRef}
                    value={values.message}
                    onChange={set('message')}
                    placeholder={t.contact.placeholders.message}
                    aria-invalid={errors.message ? 'true' : undefined}
                  />
                  {errors.message && <span className="error" role="alert">{errors.message}</span>}
                </div>

                {/* Hidden from people, tempting to bots. */}
                <div className="honeypot" aria-hidden="true">
                  <label htmlFor="q-website">Website</label>
                  <input
                    id="q-website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.website}
                    onChange={set('website')}
                  />
                </div>

                <div className="full">
                  <button type="submit" className="btn btn-primary" disabled={state === 'sending'}>
                    {state === 'sending' ? t.contact.submitting : t.contact.submit}
                  </button>
                </div>

                <div className="full" aria-live="polite">
                  {state === 'sent' && <p className="alert alert-ok">{t.contact.success}</p>}
                  {state === 'failed' && failure && <p className="alert alert-bad">{failure}</p>}
                </div>
                </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
