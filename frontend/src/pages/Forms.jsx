/* The contact form and the job application. Both are real submissions to the
 * Django API: stored, staff notified, and the visitor told honestly what
 * happened. Field errors from the API land on the field they belong to. */
import { useEffect, useRef, useState } from 'react';
import { Check, CircleAlert, Upload } from 'lucide-react';

import { useSite } from '../SiteContext.jsx';
import { submitApplication, submitQuote } from '../api.js';
import { Icon, PageHead } from '../components/ui.jsx';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const tel = (n) => `tel:${n.replace(/\s/g, '')}`;

function Field({ id, label, error, full, children }) {
  return (
    <div className={`field${full ? ' full' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <span className="err" id={`${id}-err`}><Icon as={CircleAlert} size={16} /><span>{error}</span></span>}
    </div>
  );
}
const aria = (id, error) => ({ 'aria-invalid': error ? 'true' : undefined, 'aria-describedby': error ? `${id}-err` : undefined });

function Status({ state, okText, failText }) {
  return (
    <div aria-live="polite">
      {state === 'sent' && <div className="notice" role="status"><Icon as={Check} /><strong>{okText}</strong></div>}
      {state === 'failed' && failText && <div className="notice fail" role="alert"><Icon as={CircleAlert} /><span>{failText}</span></div>}
    </div>
  );
}

/** Focus the first field with an error after a failed submit. */
function focusFirst(form, order, errors) {
  const key = order.find((k) => errors[k]);
  if (key) form.querySelector(`[data-key="${key}"]`)?.focus();
}

// ---------- contact form (stored as a quote request) ----------
const Q_EMPTY = { name: '', email: '', company: '', message: '', website: '' };
const Q_BY_API = { full_name: 'name', email: 'email', company: 'company', message: 'message' };

export function Contact() {
  const { t, ui, lang, company, prefill, setPrefill } = useSite();
  const C = t.contact;
  // Arriving with a prefill, the form starts with it already written in.
  const [values, setValues] = useState(() => (prefill?.message ? { ...Q_EMPTY, message: prefill.message } : Q_EMPTY));
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle');
  const [failure, setFailure] = useState('');
  const form = useRef(null);

  // Arriving from a service, project, fleet or approvals page fills in what was being looked at.
  useEffect(() => {
    if (!prefill) return;
    setValues((v) => ({ ...v, message: prefill.message || v.message }));
    setPrefill(null);
  }, [prefill, setPrefill]);

  const set = (key) => (e) => {
    const { value } = e.target;
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((x) => ({ ...x, [key]: '' }));
    if (state !== 'sending') setState('idle');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = {};
    if (!values.name.trim()) found.name = C.errors.name;
    if (!values.email.trim()) found.email = ui.emailRequired;
    else if (!EMAIL.test(values.email.trim())) found.email = C.errors.email;
    if (!values.company.trim()) found.company = C.errors.company;
    if (values.message.trim().length < 10) found.message = C.errors.message;
    setErrors(found);
    if (Object.keys(found).length) { focusFirst(form.current, ['name', 'email', 'company', 'message'], found); return; }

    setState('sending'); setFailure('');
    try {
      await submitQuote({ ...values, projectTypeKey: null, type: '', locale: lang });
      setValues(Q_EMPTY);
      setState('sent');
    } catch (error) {
      const mapped = {};
      for (const [field, messages] of Object.entries(error.fields || {})) {
        if (Q_BY_API[field]) mapped[Q_BY_API[field]] = [].concat(messages)[0];
      }
      setErrors(mapped);
      setFailure(Object.keys(mapped).length ? '' : C.failure);
      setState('failed');
      focusFirst(form.current, ['name', 'email', 'company', 'message'], mapped);
    }
  };

  return (
    <>
      <PageHead title={C.title} lead={C.lead} />
      <section className="sec wrap form-grid">
        <form id="quote-form" ref={form} noValidate aria-labelledby="qf-h" onSubmit={onSubmit}>
          <h2 className="h-head" id="qf-h" style={{ marginBottom: 24 }}>{ui.formH}</h2>
          <div className="fields">
            <Field id="f-name" label={C.fields.name} error={errors.name}>
              <input id="f-name" data-key="name" name="name" autoComplete="name" placeholder={C.placeholders.name} value={values.name} onChange={set('name')} {...aria('f-name', errors.name)} />
            </Field>
            <Field id="f-email" label={C.fields.email} error={errors.email}>
              <input id="f-email" data-key="email" name="email" type="email" autoComplete="email" dir="ltr" placeholder={C.placeholders.email} value={values.email} onChange={set('email')} {...aria('f-email', errors.email)} />
            </Field>
            <Field id="f-company" label={C.fields.company} error={errors.company} full>
              <input id="f-company" data-key="company" name="company" autoComplete="organization" placeholder={C.placeholders.company} value={values.company} onChange={set('company')} {...aria('f-company', errors.company)} />
            </Field>
            <Field id="f-message" label={C.fields.message} error={errors.message} full>
              <textarea id="f-message" data-key="message" name="message" placeholder={C.placeholders.message} value={values.message} onChange={set('message')} {...aria('f-message', errors.message)} />
            </Field>
            {/* Hidden from people, tempting to bots. */}
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="f-website">{ui.honeypot}</label>
              <input id="f-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
            </div>
          </div>
          <div className="form-foot">
            <button className="action" type="submit" disabled={state === 'sending'} aria-busy={state === 'sending'}>
              <span>{state === 'sending' ? C.submitting : C.submit}</span>
            </button>
          </div>
          <Status state={state} okText={C.success} failText={failure} />
        </form>
        <aside aria-label={C.officeHeading}>
          <dl className="aside-list">
            <div><dt>{C.officeHeading}</dt><dd>{C.address}</dd></div>
            <div><dt>{C.hoursHeading}</dt><dd>{C.hours.map((h) => <span key={h} style={{ display: 'block' }}>{h}</span>)}</dd></div>
            <div><dt>{ui.phone}</dt><dd><a href={tel(company.phone)}><span className="ltr num">{company.phone}</span></a></dd></div>
            <div><dt>{ui.mobile}</dt><dd><a href={tel(company.mobile)}><span className="ltr num">{company.mobile}</span></a></dd></div>
            <div><dt>{ui.email}</dt><dd><a href={`mailto:${company.email}`}>{company.email}</a></dd></div>
          </dl>
        </aside>
      </section>
    </>
  );
}

// ---------- job application ----------
const A_EMPTY = { name: '', email: '', phone: '', exp: '', role: '', cv: '', note: '', website: '' };
const A_BY_API = { full_name: 'name', email: 'email', phone: 'phone', years_experience: 'exp', opening: 'role', role_other: 'role', cv_link: 'cv', cv_file: 'cv', note: 'note' };

export function Careers() {
  const { t, ui, lang } = useSite();
  const K = t.careers;
  const [values, setValues] = useState(A_EMPTY);
  const [cvFile, setCvFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle');
  const [failure, setFailure] = useState('');
  const form = useRef(null);
  const file = useRef(null);

  const set = (key) => (e) => {
    const { value } = e.target;
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((x) => ({ ...x, [key]: '' }));
    if (state !== 'sending') setState('idle');
  };

  const pickRole = (slug) => {
    setValues((v) => ({ ...v, role: slug }));
    setErrors((x) => ({ ...x, role: '' }));
    form.current?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    setTimeout(() => form.current?.querySelector('#a-name')?.focus({ preventScroll: true }), 450);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = {};
    if (!values.name.trim()) found.name = K.errors.name;
    if (!values.email.trim()) found.email = ui.emailRequired;
    else if (!EMAIL.test(values.email.trim())) found.email = K.errors.email;
    if (!values.phone.trim()) found.phone = K.errors.phone;
    if (values.exp === '') found.exp = K.errors.exp;
    if (!values.role) found.role = K.errors.role;
    if (!values.cv.trim() && !cvFile) found.cv = K.errors.cv;
    setErrors(found);
    const order = ['name', 'email', 'phone', 'exp', 'role', 'cv'];
    if (Object.keys(found).length) { focusFirst(form.current, order, found); return; }

    setState('sending'); setFailure('');
    try {
      const opening = K.roles.find((r) => r.slug === values.role);
      await submitApplication({
        ...values,
        exp: Number.parseInt(values.exp, 10) || 0,
        roleSlug: opening?.slug || null,
        role: opening ? '' : K.otherRole,
        cvFile,
        locale: lang,
      });
      setValues(A_EMPTY); setCvFile(null);
      if (file.current) file.current.value = '';
      setState('sent');
    } catch (error) {
      const mapped = {};
      for (const [field, messages] of Object.entries(error.fields || {})) {
        if (A_BY_API[field]) mapped[A_BY_API[field]] = [].concat(messages)[0];
      }
      setErrors(mapped);
      setFailure(Object.keys(mapped).length ? '' : K.failure);
      setState('failed');
      focusFirst(form.current, ['name', 'email', 'phone', 'exp', 'role', 'cv', 'note'], mapped);
    }
  };

  const input = (key, id, extra = {}) => (
    <input id={id} data-key={key} name={key} placeholder={K.placeholders[key]} value={values[key]} onChange={set(key)} {...aria(id, errors[key])} {...extra} />
  );

  return (
    <>
      <PageHead title={K.title} lead={K.lead} />
      <section className="sec wrap">
        <h2 className="h-head rise" style={{ marginBottom: 28 }}>{K.whyTitle}</h2>
        <div className="cards">{K.why.map((w, i) => <div key={w.title} className={`card ${i % 2 ? 'lav' : 'teal'} rise`} style={{ '--d': i % 4 }}><span className="node" /><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
      </section>
      <section className="sec wrap">
        <h2 className="h-head rise" style={{ marginBottom: 10 }}>{K.rolesTitle}</h2>
        <p className="muted rise" style={{ marginBottom: 28 }}>{K.rolesLead}</p>
        <ul className="roles">
          {K.roles.map((r) => (
            <li key={r.slug} className="rise">
              <span className="t">{r.title}</span>
              <span className="m">{r.dept} · {r.location} · {r.type} · {r.exp}</span>
              <button className="ghost" type="button" onClick={() => pickRole(r.slug)} aria-label={`${ui.apply}: ${r.title}`}>{ui.apply}</button>
            </li>
          ))}
        </ul>
      </section>
      <section className="sec wrap form-grid" id="apply">
        <form id="apply-form" ref={form} noValidate aria-labelledby="af-h" onSubmit={onSubmit}>
          <h2 className="h-head" id="af-h" style={{ marginBottom: 8 }}>{K.applyTitle}</h2>
          <p className="muted" style={{ marginBottom: 24 }}>{K.applyLead}</p>
          <div className="fields">
            <Field id="a-name" label={K.fields.name} error={errors.name}>{input('name', 'a-name', { autoComplete: 'name' })}</Field>
            <Field id="a-email" label={K.fields.email} error={errors.email}>{input('email', 'a-email', { type: 'email', autoComplete: 'email', dir: 'ltr' })}</Field>
            <Field id="a-phone" label={K.fields.phone} error={errors.phone}>{input('phone', 'a-phone', { type: 'tel', autoComplete: 'tel', dir: 'ltr' })}</Field>
            <Field id="a-exp" label={K.fields.exp} error={errors.exp}>{input('exp', 'a-exp', { type: 'number', min: 0, max: 60, inputMode: 'numeric' })}</Field>
            <Field id="a-role" label={K.fields.role} error={errors.role} full>
              <select id="a-role" data-key="role" name="role" value={values.role} onChange={set('role')} {...aria('a-role', errors.role)}>
                <option value="">{K.placeholders.role}</option>
                {K.roles.map((r) => <option key={r.slug} value={r.slug}>{r.title}</option>)}
                <option value="other">{K.otherRole}</option>
              </select>
            </Field>
            <div className="field full">
              <span className="label" id="a-cv-l">{K.fields.cv}</span>
              <label className="visually-hidden" htmlFor="a-cv">{K.cvLink}</label>
              <input id="a-cv" data-key="cv" name="cv" type="url" dir="ltr" placeholder={K.placeholders.cv} value={values.cv} onChange={set('cv')}
                aria-invalid={errors.cv ? 'true' : undefined} aria-describedby={`a-cv-l a-cv-hint${errors.cv ? ' a-cv-err' : ''}`} />
              <div className="file-row">
                <input id="a-file" ref={file} type="file" accept=".pdf,.doc,.docx" className="visually-hidden"
                  onChange={(e) => { setCvFile(e.target.files[0] || null); setErrors((x) => ({ ...x, cv: '' })); }} />
                <label className="file-btn" htmlFor="a-file"><Icon as={Upload} />{K.cvUploadBtn}</label>
                <span className="hint">{cvFile ? cvFile.name : K.cvNone}</span>
              </div>
              <span className="hint" id="a-cv-hint">{K.cvHint}</span>
              {errors.cv && <span className="err" id="a-cv-err"><Icon as={CircleAlert} size={16} /><span>{errors.cv}</span></span>}
            </div>
            <Field id="a-note" label={K.fields.note} error={errors.note} full>
              <textarea id="a-note" data-key="note" name="note" placeholder={K.placeholders.note} value={values.note} onChange={set('note')} {...aria('a-note', errors.note)} />
            </Field>
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="a-website">{ui.honeypot}</label>
              <input id="a-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
            </div>
          </div>
          <div className="form-foot">
            <button className="action" type="submit" disabled={state === 'sending'} aria-busy={state === 'sending'}>
              <span>{state === 'sending' ? K.submitting : K.submit}</span>
            </button>
          </div>
          <Status state={state} okText={K.success} failText={failure} />
        </form>
      </section>
    </>
  );
}
