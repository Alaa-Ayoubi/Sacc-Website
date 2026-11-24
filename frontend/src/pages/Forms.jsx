/* The contact form and the job application. Both are real submissions to the
 * Django API: stored, staff notified, and the visitor told honestly what
 * happened. Field errors from the API land on the field they belong to. */
import { useEffect, useRef, useState } from 'react';
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
      {error && <span className="err" id={`${id}-err`}><Icon name="circle-alert" /><span>{error}</span></span>}
    </div>
  );
}
const aria = (id, error) => ({ 'aria-invalid': error ? 'true' : undefined, 'aria-describedby': error ? `${id}-err` : undefined });

function Status({ state, okText, failText }) {
  return (
    <div aria-live="polite">
      {state === 'sent' && <div className="notice" role="status"><Icon name="check" /><strong>{okText}</strong></div>}
      {state === 'failed' && failText && <div className="notice fail" role="alert"><Icon name="circle-alert" /><span>{failText}</span></div>}
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

  // Arriving from a service, project or fleet page fills in what was being looked at.
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
      <section className="band"><div className="wrap sheet-grid">
        <form className="sheet" id="quote-form" ref={form} noValidate aria-labelledby="qf-h" onSubmit={onSubmit}>
          <h2 id="qf-h">{ui.formH}</h2>
          <div className="fields">
            <Field id="f-name" label={C.fields.name} error={errors.name}>
              <input id="f-name" data-key="name" name="name" type="text" autoComplete="name" placeholder={C.placeholders.name} value={values.name} onChange={set('name')} {...aria('f-name', errors.name)} />
            </Field>
            <Field id="f-email" label={C.fields.email} error={errors.email}>
              <input id="f-email" data-key="email" name="email" type="email" autoComplete="email" dir="ltr" spellCheck={false} placeholder={C.placeholders.email} value={values.email} onChange={set('email')} {...aria('f-email', errors.email)} />
            </Field>
            <Field id="f-company" label={C.fields.company} error={errors.company} full>
              <input id="f-company" data-key="company" name="company" type="text" autoComplete="organization" placeholder={C.placeholders.company} value={values.company} onChange={set('company')} {...aria('f-company', errors.company)} />
            </Field>
            <Field id="f-message" label={C.fields.message} error={errors.message} full>
              <textarea id="f-message" data-key="message" name="message" placeholder={C.placeholders.message} value={values.message} onChange={set('message')} {...aria('f-message', errors.message)} />
            </Field>
            {/* Hidden from people, tempting to bots. */}
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="f-website">{ui.honeypot}</label>
              <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
            </div>
          </div>
          <div className="form-foot">
            <button className="btn btn-quote" type="submit" disabled={state === 'sending'} aria-busy={state === 'sending'}>
              <Icon name="send" className="flip" /><span>{state === 'sending' ? C.submitting : C.submit}</span>
            </button>
          </div>
          <Status state={state} okText={C.success} failText={failure} />
        </form>
        <aside className="aside" aria-labelledby="office-h">
          <h2 id="office-h">{C.officeHeading}</h2>
          <ul className="office">
            <li><Icon name="map-pin" /><span className="k">{ui.office}</span><span>{C.address}</span></li>
            <li><Icon name="phone" /><span className="k">{ui.mobile}</span><a href={tel(company.mobile)}><span className="ltr num">{company.mobile}</span></a></li>
            <li><Icon name="clock" /><span className="k">{C.hoursHeading}</span><span>{C.hours.map((h) => <span key={h} className="hr">{h}</span>)}</span></li>
          </ul>
        </aside>
      </div></section>
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

  // "Apply for this role": choose it in the form and move there.
  const pickRole = (slug) => {
    setValues((v) => ({ ...v, role: slug }));
    setErrors((x) => ({ ...x, role: '' }));
    const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('apply')?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
    setTimeout(() => form.current?.querySelector('#a-name')?.focus({ preventScroll: true }), smooth ? 450 : 0);
  };
  const toForm = (e) => {
    e.preventDefault();
    document.getElementById('apply')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  const WHY_ICON = { Layers: 'layers', GraduationCap: 'graduation-cap', HardHat: 'hard-hat', ShieldCheck: 'shield-check', Briefcase: 'briefcase' };

  const input = (key, id, extra = {}) => (
    <input id={id} data-key={key} name={key} type="text" placeholder={K.placeholders[key]} value={values[key]} onChange={set(key)} {...aria(id, errors[key])} {...extra} />
  );

  return (
    <>
      <PageHead title={K.title} lead={K.lead}><a className="btn btn-outline-light" href="#apply" onClick={toForm}>{K.cta}</a></PageHead>
      <section className="band mist"><div className="wrap">
        <div className="head"><h2>{K.whyTitle}</h2></div>
        <ul className="features">{K.why.map((w) => <li key={w.title}><Icon name={WHY_ICON[w.icon] || 'layers'} /><h3>{w.title}</h3><p>{w.desc}</p></li>)}</ul>
      </div></section>
      <section className="band"><div className="wrap">
        <div className="head"><div><h2>{K.rolesTitle}</h2><p>{K.rolesLead}</p></div></div>
        <table className="roles">
          <thead><tr>
            <th scope="col">{ui.role}</th><th scope="col">{ui.dept}</th><th scope="col">{ui.loc}</th><th scope="col">{ui.type}</th><th scope="col">{ui.exp}</th>
            <th scope="col"><span className="visually-hidden">{ui.apply}</span></th>
          </tr></thead>
          <tbody>
            {K.roles.map((r) => (
              <tr key={r.slug}>
                <td className="t">{r.title}</td>
                <td className="k" data-k={ui.dept}>{r.dept}</td><td className="k" data-k={ui.loc}>{r.location}</td>
                <td className="k" data-k={ui.type}>{r.type}</td><td className="k" data-k={ui.exp}>{r.exp}</td>
                <td><button className="btn btn-outline" type="button" onClick={() => pickRole(r.slug)} aria-label={`${ui.apply}: ${r.title}`}>{ui.apply}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div></section>
      <section className="band mist" id="apply"><div className="wrap sheet-solo">
        <form className="sheet" id="apply-form" ref={form} noValidate aria-labelledby="af-h" onSubmit={onSubmit}>
          <h2 id="af-h">{K.applyTitle}</h2>
          <p>{K.applyLead}</p>
          <div className="fields">
            <Field id="a-name" label={K.fields.name} error={errors.name}>{input('name', 'a-name', { autoComplete: 'name' })}</Field>
            <Field id="a-email" label={K.fields.email} error={errors.email}>{input('email', 'a-email', { type: 'email', autoComplete: 'email', dir: 'ltr', spellCheck: false })}</Field>
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
              <input id="a-cv" data-key="cv" name="cv" type="url" dir="ltr" spellCheck={false} autoComplete="url" placeholder={K.placeholders.cv} value={values.cv} onChange={set('cv')}
                aria-invalid={errors.cv ? 'true' : undefined} aria-describedby={`a-cv-l a-cv-hint${errors.cv ? ' a-cv-err' : ''}`} />
              <div className="file-row">
                <input id="a-file" ref={file} name="cv_file" type="file" accept=".pdf,.doc,.docx" className="visually-hidden"
                  onChange={(e) => { setCvFile(e.target.files[0] || null); setErrors((x) => ({ ...x, cv: '' })); }} />
                <label className="btn btn-outline" htmlFor="a-file"><Icon name="upload" />{K.cvUploadBtn}</label>
                <span>{cvFile ? cvFile.name : K.cvNone}</span>
              </div>
              <span className="hint" id="a-cv-hint">{K.cvHint}</span>
              {errors.cv && <span className="err" id="a-cv-err"><Icon name="circle-alert" /><span>{errors.cv}</span></span>}
            </div>
            <Field id="a-note" label={K.fields.note} error={errors.note} full>
              <textarea id="a-note" data-key="note" name="note" placeholder={K.placeholders.note} value={values.note} onChange={set('note')} {...aria('a-note', errors.note)} />
            </Field>
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="a-website">{ui.honeypot}</label>
              <input id="a-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
            </div>
          </div>
          <div className="form-foot">
            <button className="btn btn-teal" type="submit" disabled={state === 'sending'} aria-busy={state === 'sending'}>
              <Icon name="send" className="flip" /><span>{state === 'sending' ? K.submitting : K.submit}</span>
            </button>
          </div>
          <Status state={state} okText={K.success} failText={failure} />
        </form>
      </div></section>
    </>
  );
}
