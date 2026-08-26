/* The careers page and its application form.
 *
 * A candidate satisfies the CV requirement with either a link or an upload —
 * the same rule the backend enforces — so neither field is required alone and
 * the pair is checked together.
 */
import { useEffect, useRef, useState } from 'react';

import { useSite } from '../SiteContext.jsx';
import { submitApplication } from '../api.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_CV_MB = 5;

const EMPTY = {
  name: '', email: '', phone: '', exp: '', role: '', cv: '', note: '', website: '',
};

const FIELD_BY_API = {
  full_name: 'name',
  email: 'email',
  phone: 'phone',
  years_experience: 'exp',
  opening: 'role',
  role_other: 'role',
  cv_link: 'cv',
  cv_file: 'cv',
  note: 'note',
};

export default function Careers({ onBack }) {
  const { t, lang, images } = useSite();
  const [values, setValues] = useState(EMPTY);
  const [cvFile, setCvFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle');
  const [failure, setFailure] = useState('');
  const fileInput = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const set = (key) => (event) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: '' }));
    if (state === 'sent') setState('idle');
  };

  const onFile = (event) => {
    const file = event.target.files?.[0] || null;
    setErrors((current) => ({ ...current, cv: '' }));

    if (file && file.size > MAX_CV_MB * 1024 * 1024) {
      setCvFile(null);
      event.target.value = '';
      setErrors((current) => ({ ...current, cv: t.careers.cvHint }));
      return;
    }
    setCvFile(file);
  };

  const applyFor = (roleTitle) => {
    setValues((current) => ({ ...current, role: roleTitle }));
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const validate = () => {
    const found = {};
    if (!values.name.trim()) found.name = t.careers.errors.name;
    if (!EMAIL.test(values.email)) found.email = t.careers.errors.email;
    if (!values.phone.trim()) found.phone = t.careers.errors.phone;
    if (!String(values.exp).trim()) found.exp = t.careers.errors.exp;
    if (!values.role) found.role = t.careers.errors.role;
    // A link or a file — either is enough.
    if (!values.cv.trim() && !cvFile) found.cv = t.careers.errors.cv;
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
      const opening = t.careers.roles.find((r) => r.title === values.role);
      await submitApplication({
        ...values,
        exp: Number.parseInt(values.exp, 10) || 0,
        roleSlug: opening?.slug || null,
        cvFile,
        locale: lang,
      });
      setValues(EMPTY);
      setCvFile(null);
      if (fileInput.current) fileInput.current.value = '';
      setState('sent');
    } catch (error) {
      const mapped = {};
      for (const [apiField, messages] of Object.entries(error.fields || {})) {
        const field = FIELD_BY_API[apiField];
        if (field) mapped[field] = messages[0];
      }
      setErrors(mapped);
      setFailure(Object.keys(mapped).length ? '' : error.message || t.careers.failure);
      setState('failed');
    }
  };

  const field = (key, label, extra = {}) => (
    <div className="field">
      <label htmlFor={`a-${key}`}>{label}</label>
      <input
        id={`a-${key}`}
        value={values[key]}
        onChange={set(key)}
        placeholder={t.careers.placeholders[key]}
        aria-invalid={errors[key] ? 'true' : undefined}
        {...extra}
      />
      {errors[key] && <span className="error" role="alert">{errors[key]}</span>}
    </div>
  );

  return (
    <>
      <section className="hero" style={{ paddingBlock: '72px 60px' }}>
        <div
          className="hero-bg"
          style={{ backgroundImage: `url(${images.careers || '/assets/photos/public-realm.jpg'})` }}
          aria-hidden="true"
        />
        <div className="container">
          <button
            type="button"
            className="btn btn-ghost"
            style={{ marginBottom: 24 }}
            onClick={onBack}
          >
            {t.backHome}
          </button>
          <span className="eyebrow">{t.careers.badge}</span>
          <h1>{t.careers.title}</h1>
          <p className="hero-lead">{t.careers.lead}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title" style={{ marginTop: 0 }}>{t.careers.whyTitle}</h2>
          <div className="grid grid-4">
            {t.careers.why.map((item) => (
              <article className="card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title" style={{ marginTop: 0 }}>{t.careers.rolesTitle}</h2>
          <p className="section-lead" style={{ marginBottom: 32 }}>{t.careers.rolesLead}</p>

          <div className="grid grid-3">
            {t.careers.roles.map((role) => (
              <article className="card" key={role.slug || role.title}>
                <h3>{role.title}</h3>
                <ul className="tag-list">
                  <li>{role.dept}</li>
                  <li>{role.location}</li>
                  <li>{role.type}</li>
                  <li>{role.exp}</li>
                </ul>
                <button
                  type="button"
                  className="disclosure"
                  onClick={() => applyFor(role.title)}
                >
                  {t.careers.cta} ←
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" ref={formRef}>
        <div className="container" style={{ maxWidth: 900 }}>
          <h2 className="section-title" style={{ marginTop: 0 }}>{t.careers.applyTitle}</h2>
          <p className="section-lead" style={{ marginBottom: 32 }}>{t.careers.applyLead}</p>

          <form className="card" onSubmit={onSubmit} noValidate>
            <div className="form-grid">
              {field('name', t.careers.fields.name, { autoComplete: 'name' })}
              {field('email', t.careers.fields.email, { type: 'email', autoComplete: 'email' })}
              {field('phone', t.careers.fields.phone, { type: 'tel', autoComplete: 'tel' })}
              {field('exp', t.careers.fields.exp, { type: 'number', min: '0', max: '60' })}

              <div className="field">
                <label htmlFor="a-role">{t.careers.fields.role}</label>
                <select
                  id="a-role"
                  value={values.role}
                  onChange={set('role')}
                  aria-invalid={errors.role ? 'true' : undefined}
                >
                  <option value="">{t.careers.placeholders.role}</option>
                  {t.careers.roles.map((role) => (
                    <option key={role.slug || role.title} value={role.title}>
                      {role.title}
                    </option>
                  ))}
                  <option value={t.careers.otherRole}>{t.careers.otherRole}</option>
                </select>
                {errors.role && <span className="error" role="alert">{errors.role}</span>}
              </div>

              <div className="field">
                <label htmlFor="a-cv">{t.careers.cvLink}</label>
                <input
                  id="a-cv"
                  value={values.cv}
                  onChange={set('cv')}
                  placeholder={t.careers.placeholders.cv}
                  aria-invalid={errors.cv ? 'true' : undefined}
                />
              </div>

              <div className="field full">
                <label htmlFor="a-file">{t.careers.cvUpload}</label>
                <div className="file-row">
                  <input
                    id="a-file"
                    ref={fileInput}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={onFile}
                  />
                  <span className="file-name">{cvFile ? cvFile.name : t.careers.cvNone}</span>
                </div>
                <p className="hint">{t.careers.cvHint}</p>
                {errors.cv && <span className="error" role="alert">{errors.cv}</span>}
              </div>

              <div className="field full">
                <label htmlFor="a-note">{t.careers.fields.note}</label>
                <textarea
                  id="a-note"
                  value={values.note}
                  onChange={set('note')}
                  placeholder={t.careers.placeholders.note}
                />
              </div>

              <div className="honeypot" aria-hidden="true">
                <label htmlFor="a-website">Website</label>
                <input
                  id="a-website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.website}
                  onChange={set('website')}
                />
              </div>

              <div className="full">
                <button type="submit" className="btn btn-primary" disabled={state === 'sending'}>
                  {state === 'sending' ? t.careers.submitting : t.careers.submit}
                </button>
              </div>

              <div className="full" aria-live="polite">
                {state === 'sent' && <p className="alert alert-ok">{t.careers.success}</p>}
                {state === 'failed' && failure && <p className="alert alert-bad">{failure}</p>}
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
