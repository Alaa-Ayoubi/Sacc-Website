/* Drop-in replacement for site-data.js.

   Loads the bilingual content from the Django API instead of hardcoding it,
   and turns the two forms into real submissions. It sets the same
   `window.SACC_SITE` object the page already reads, so no rendering code
   changes.

   Usage — replace the site-data.js tag in your HTML with:

     <script>window.SACC_API = 'http://localhost:8000/api/v1';</script>
     <script src="./backend/frontend/sacc-api.js"></script>

   The page script must wait for the data, so load it after this file and
   listen for the `sacc:ready` event (see the bottom of this file).           */
(function () {
  'use strict';

  var BASE = (window.SACC_API || 'http://localhost:8000/api/v1').replace(/\/$/, '');

  function url(path) {
    return BASE + path;
  }

  function request(path, options) {
    return fetch(url(path), options).then(function (response) {
      return response
        .json()
        .catch(function () {
          return {};
        })
        .then(function (body) {
          if (!response.ok) {
            var error = new Error(body.detail || 'Request failed');
            error.status = response.status;
            error.errors = body.errors || {};
            throw error;
          }
          return body;
        });
    });
  }

  /* --- content ---------------------------------------------------------- */

  /* One request returns both languages, so switching AR/EN stays instant. */
  function loadSite() {
    return request('/site/').then(function (data) {
      window.SACC_SITE = data;
      return data;
    });
  }

  /* --- forms ------------------------------------------------------------ */

  /* Field names match the backend serializer. `website` is the honeypot: keep
     the input hidden and never fill it. */
  function submitQuote(values) {
    return request('/leads/quote-requests/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

  /* Sends multipart when a CV file is attached, JSON otherwise. */
  function submitApplication(values) {
    var payload = {
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
      return request('/careers/applications/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    var form = new FormData();
    Object.keys(payload).forEach(function (key) {
      if (payload[key] !== null && payload[key] !== undefined) {
        form.append(key, payload[key]);
      }
    });
    form.append('cv_file', values.cvFile);
    /* No Content-Type header: the browser sets the multipart boundary. */
    return request('/careers/applications/', { method: 'POST', body: form });
  }

  window.SACC = {
    base: BASE,
    loadSite: loadSite,
    submitQuote: submitQuote,
    submitApplication: submitApplication,
    projects: function (params) {
      var query = new URLSearchParams(params || {}).toString();
      return request('/projects/' + (query ? '?' + query : ''));
    },
    openings: function () {
      return request('/careers/openings/');
    },
    health: function () {
      return request('/health/');
    },
  };

  /* Fetch immediately so the page has its content as early as possible.
     Listen with:  document.addEventListener('sacc:ready', render)           */
  loadSite()
    .then(function (data) {
      document.dispatchEvent(new CustomEvent('sacc:ready', { detail: data }));
    })
    .catch(function (error) {
      console.error('[SACC] could not load site content:', error);
      document.dispatchEvent(new CustomEvent('sacc:error', { detail: error }));
    });
})();
