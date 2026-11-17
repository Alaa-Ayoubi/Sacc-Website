/* The owner asked that no page try to persuade a client to work with the
 * company, nor a candidate to join it: "we are a company that needs no
 * introduction". Every claim, promise and piece of self-praise is rewritten
 * here as a plain statement, using only facts the content bundle already
 * carries. Nothing new is asserted.
 *
 * These are overrides over frontend/src/data/site-content.json for the
 * prototype only. Once the owner approves the wording, it belongs in the
 * Django admin, which owns the content; the bundle is exported from there.
 *
 * Kept as they are, at the owner's word: the hero's lead sentence and the
 * Chairman's signed quote. The seven values keep their names only. */

export const COPY = {
  ar: {
    intro: {
      title: 'نبذة عن الشركة',
      p1: 'تأسست شركة سنا الأوائل للمقاولات (SACC) عام 2007 في المدينة المنورة، وتعمل في قطاع البنية التحتية في المملكة.',
      p2: 'تشمل إدارة المشاريع في الشركة الجودة والسلامة والاستدامة في مراحل التنفيذ كلها، وفق المتطلبات البيئية والتنظيمية المحلية. وتعمل الشركة في السلامة بمبدأ الإصابات الصفرية.',
      p3: 'تنفّذ الشركة مشاريع متعددة التخصصات بنظام التسليم المفتاحي لجهات حكومية ومطوّرين من القطاع الخاص، بأسطول تملكه وكوادر هندسية وفنية من داخلها.',
    },
    services: {
      lead: 'من التصميم والتنفيذ إلى التشغيل والصيانة.',
      items: [
        { desc: 'تصميم وتنفيذ وتشغيل شبكات توزيع المياه وتجميع مياه الصرف الصحي.' },
        { desc: 'شبكات تصريف مياه الأمطار والسيول، وإدارة المياه السطحية في المدن.' },
        { desc: 'شبكات توزيع الكهرباء وبنية الاتصالات للمناطق السكنية والتجارية والصناعية.' },
        { desc: 'إنشاء الطرق ورصفها وإعادة تأهيلها.' },
        { desc: 'الأعمال الإنشائية لروابط النقل وتقاطعات الطرق متعددة المستويات.' },
        { desc: 'الساحات العامة والحدائق والبنية التحتية المجتمعية.' },
        { desc: 'اختبار مواد الإنشاء وضبط الجودة وفق مواصفات المشروع.' },
        { desc: 'تأجير المعدات الثقيلة من أسطول الشركة، مع الدعم الفني.' },
        { desc: 'إدارة المرافق وصيانة البنية التحتية على المدى الطويل.' },
      ],
    },
    projects: {
      lead: 'ستة مشاريع في المياه والطرق والكهرباء والتطوير العمراني، مع الجهة المالكة وحالة كل مشروع.',
      items: [
        {},
        { desc: 'شبكة توزيع تمدّ القطاع الزراعي وأعمال التشجير في المنطقة بالمياه المعالجة ثلاثيًا.' },
        { desc: 'تهيئة الموقع وتنفيذ الخدمات العميقة والبنية التحتية الأساسية لمجمّع سيكس فلاجز الترفيهي.' },
        { desc: 'أنظمة إمداد المياه والصرف لمحطات شبكة القطار السريع ومرافق الصيانة التابعة لها.' },
      ],
    },
    certifications: {
      lead: 'شهادات الأيزو التي تحملها الشركة، والجهات التي اعتمدتها.',
      commitmentBody: 'ثلاث شهادات أيزو في أنظمة إدارة الجودة والبيئة والصحة والسلامة المهنية، وتأهيل مسبق لدى الجهات المدرجة أدناه.',
    },
    leadership: {
      lead: 'رئيس مجلس الإدارة والمدير العام.',
      leaders: [
        { bio: 'خبرة تتجاوز 35 عامًا في قطاع البنية التحتية والمقاولات، ويضع التوجّه الاستراتيجي للشركة.' },
        { bio: 'يشرف على العمليات اليومية وإدارة المشاريع في جميع قطاعات الشركة.' },
      ],
    },
    journey: {
      milestones: [
        { desc: 'تأسيس الشركة في المدينة المنورة.' },
        { desc: 'تنفيذ مشاريع لشبكات المياه على المستوى الإقليمي.' },
        { desc: 'الحصول على شهادات الأيزو في الجودة والبيئة والسلامة.' },
        { desc: 'الاستثمار في أسطول المعدات الثقيلة.' },
        {},
        { desc: 'تنفيذ مشاريع البنية التحتية بنظام التسليم المفتاحي في مختلف أنحاء المملكة.' },
      ],
    },
    equipment: {
      lead: 'أسطول تملكه الشركة وتشغّله، وتؤجّر منه أيضًا.',
      p1: 'يضم الأسطول أكثر من 150 آلة ومركبة إنشاء ثقيلة مملوكة للشركة، تعمل في مشاريعها دون الاعتماد على التأجير من الغير.',
      p2: 'يشغّل المعدات مشغّلون معتمدون، ويتولى صيانتها فنيون من داخل الشركة.',
      features: [
        { title: 'الصيانة الوقائية', desc: 'برامج صيانة مجدولة.' },
        { title: 'تتبّع الأسطول', desc: 'تتبّع المعدات عبر GPS وأنظمة التتبع.' },
        { title: 'السلامة', desc: 'المعدات مطابقة لمعايير السلامة لدى أرامكو السعودية والشركة السعودية للكهرباء.' },
        { title: 'الورشة المتنقلة', desc: 'ورشة متنقلة على مدار 24/7 للإصلاح في الموقع.' },
      ],
    },
    contact: {
      lead: 'نردّ على استفسارات الجهات والشركات خلال 24 ساعة عمل.',
    },
    careers: {
      title: 'الوظائف',
      lead: 'وظائف هندسية وفنية في المدينة المنورة والرياض ومواقع المشاريع.',
      whyTitle: 'العمل في سنا الأوائل',
      why: [
        { title: 'المشاريع', desc: 'مشاريع لجهات منها شركة المياه الوطنية ووزارة النقل وشركة القدية للاستثمار.' },
        { title: 'التدريب', desc: 'تدريب فني وشهادات مهنية تدعمها الشركة.' },
        { title: 'السلامة', desc: 'العمل وفق معيار ISO 45001 وبرامج السلامة في المواقع.' },
        { title: 'الفريق', desc: 'كوادر هندسية وفنية دائمة، وأسطول ومختبرات داخلية.' },
      ],
      rolesLead: 'للتقديم على وظيفة غير مدرجة، اختر «وظيفة أخرى / تقديم عام» في النموذج، ويُحفظ الطلب للفرص القادمة.',
    },
  },
  en: {
    intro: {
      title: 'Company Overview',
      p1: 'Sana Al-Awael Contracting Company (SACC) was founded in 2007 in Al Madinah and works in infrastructure across the Kingdom.',
      p2: 'Project management at the company covers quality, safety and sustainability in every phase of construction, in line with local environmental and regulatory requirements. Safety works to a zero-harm principle.',
      p3: 'The company delivers multi-disciplinary projects on a turnkey basis for government bodies and private developers, with a fleet it owns and its own engineering and technical staff.',
    },
    services: {
      lead: 'From design and construction to operation and maintenance.',
      items: [
        { desc: 'Design, construction and operation of water distribution and wastewater collection networks.' },
        { desc: 'Stormwater and flood drainage networks, and surface-water management in cities.' },
        { desc: 'Power distribution networks and communications infrastructure for residential, commercial and industrial zones.' },
        { desc: 'Road construction, paving and rehabilitation.' },
        { desc: 'Structural works for transport links and grade-separated junctions.' },
        { desc: 'Public spaces, parks and community infrastructure.' },
        { desc: 'Construction-materials testing and quality control to project specifications.' },
        { desc: "Heavy equipment rental from the company's fleet, with technical support." },
        { desc: 'Long-term facility management and infrastructure maintenance.' },
      ],
    },
    projects: {
      lead: 'Six projects in water, roads, electrical and urban development, each with its owner and status.',
      items: [
        {},
        { desc: 'A distribution network supplying tertiary-treated water for agriculture and landscaping across the region.' },
        { desc: 'Site preparation, deep utilities and base infrastructure for the Six Flags entertainment complex.' },
        { desc: 'Water supply and drainage systems for the high-speed rail stations and their maintenance facilities.' },
      ],
    },
    certifications: {
      lead: 'The ISO certificates the company holds, and the bodies that have approved it.',
      commitmentBody: 'Three ISO certificates, for quality, environmental, and occupational health and safety management systems, and pre-qualification with the bodies listed below.',
    },
    leadership: {
      lead: 'The Chairman and the General Manager.',
      leaders: [
        { bio: "Over 35 years in infrastructure and contracting; sets the company's strategic direction." },
        { bio: "Oversees day-to-day operations and project management across all of the company's divisions." },
      ],
    },
    journey: {
      milestones: [
        { desc: 'The company is founded in Al Madinah.' },
        { desc: 'Water network projects at regional scale.' },
        { desc: 'ISO certification for quality, environment and safety.' },
        { desc: 'Investment in the heavy equipment fleet.' },
        {},
        { desc: 'Turnkey infrastructure projects across the Kingdom.' },
      ],
    },
    equipment: {
      lead: 'A fleet the company owns and operates, and also rents out.',
      p1: 'The fleet holds more than 150 heavy construction machines and vehicles owned by the company, working on its own projects without relying on third-party rental.',
      p2: "The equipment is run by certified operators and maintained by the company's own technicians.",
      features: [
        { title: 'Preventive Maintenance', desc: 'Scheduled maintenance programmes.' },
        { title: 'Fleet Tracking', desc: 'GPS tracking and telematics.' },
        { title: 'Safety', desc: 'Equipment meets the safety standards of Saudi Aramco and SEC.' },
        { title: 'Mobile Workshop', desc: 'A 24/7 mobile workshop for on-site repairs.' },
      ],
    },
    contact: {
      lead: 'Enquiries from public bodies and companies are answered within 24 business hours.',
    },
    careers: {
      title: 'Careers',
      lead: 'Engineering and technical roles in Al Madinah, Riyadh and on project sites.',
      whyTitle: 'Working at SACC',
      why: [
        { title: 'Projects', desc: 'Projects for clients including the National Water Company, the Ministry of Transport and Qiddiya Investment Company.' },
        { title: 'Training', desc: 'Technical training and professional certification supported by the company.' },
        { title: 'Safety', desc: 'Work to ISO 45001 and site safety programmes.' },
        { title: 'The team', desc: 'Permanent engineering and technical staff, with an in-house fleet and laboratory.' },
      ],
      rolesLead: 'To apply for a role not listed, choose “Other role / general application” in the form; the application is kept on file.',
    },
  },
};

/** Lay the overrides over the content: objects merge, arrays of objects merge by position. */
export function withCopy(site) {
  const merge = (base, over) => {
    if (Array.isArray(over)) {
      if (!Array.isArray(base) || over.some((x) => typeof x !== 'object')) return over;
      return base.map((b, i) => (i < over.length ? merge(b, over[i]) : b));
    }
    if (over && typeof over === 'object') {
      const out = { ...base };
      for (const [k, v] of Object.entries(over)) out[k] = merge(base?.[k], v);
      return out;
    }
    return over;
  };
  return { ...site, ar: merge(site.ar, COPY.ar), en: merge(site.en, COPY.en) };
}
