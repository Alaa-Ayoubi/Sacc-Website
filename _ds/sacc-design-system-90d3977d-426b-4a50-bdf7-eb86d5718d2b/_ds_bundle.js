/* @ds-bundle: {"format":4,"namespace":"SACCDesignSystem_90d397","components":[{"name":"EquipmentCard","sourcePath":"components/cards/EquipmentCard.jsx"},{"name":"LeadershipCard","sourcePath":"components/cards/LeadershipCard.jsx"},{"name":"ProjectCard","sourcePath":"components/cards/ProjectCard.jsx"},{"name":"ServiceCard","sourcePath":"components/cards/ServiceCard.jsx"},{"name":"StatCard","sourcePath":"components/cards/StatCard.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"CardHeader","sourcePath":"components/core/Card.jsx"},{"name":"CardTitle","sourcePath":"components/core/Card.jsx"},{"name":"CardDescription","sourcePath":"components/core/Card.jsx"},{"name":"CardContent","sourcePath":"components/core/Card.jsx"},{"name":"CardFooter","sourcePath":"components/core/Card.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Label","sourcePath":"components/core/Label.jsx"},{"name":"FieldError","sourcePath":"components/core/Label.jsx"},{"name":"Select","sourcePath":"components/core/Select.jsx"},{"name":"Textarea","sourcePath":"components/core/Textarea.jsx"},{"name":"ContactForm","sourcePath":"components/forms/ContactForm.jsx"},{"name":"Icon","sourcePath":"components/icons/Icon.jsx"},{"name":"IconTile","sourcePath":"components/icons/Icon.jsx"},{"name":"Footer","sourcePath":"components/site/Footer.jsx"},{"name":"Header","sourcePath":"components/site/Header.jsx"},{"name":"PageHero","sourcePath":"components/site/PageHero.jsx"}],"sourceHashes":{"components/cards/EquipmentCard.jsx":"49bac43d158f","components/cards/LeadershipCard.jsx":"136d2ac231a3","components/cards/ProjectCard.jsx":"cedf363dca17","components/cards/ServiceCard.jsx":"03f9e91a0611","components/cards/StatCard.jsx":"1ec7e66722e5","components/core/Badge.jsx":"96942a7e83ed","components/core/Button.jsx":"a93e1c4cd0aa","components/core/Card.jsx":"add51b05ed79","components/core/Input.jsx":"36c014e7425e","components/core/Label.jsx":"3304b398280a","components/core/Select.jsx":"5c7fdba59777","components/core/Textarea.jsx":"03c416f831aa","components/forms/ContactForm.jsx":"fbd6fa92350e","components/icons/Icon.jsx":"a6796651a9d3","components/site/Footer.jsx":"c1deaf23984a","components/site/Header.jsx":"4d19b15c3c33","components/site/PageHero.jsx":"b25f3e4a4151","ui_kits/website/CertificationsScreen.jsx":"dfab8cd01b9e","ui_kits/website/ContactScreen.jsx":"b20d52ef8a1b","ui_kits/website/HomeScreen.jsx":"4855d5d827a2","ui_kits/website/ProjectsScreen.jsx":"6b7f17ba6d1b","ui_kits/website/ServicesScreen.jsx":"429f6cb4e208","ui_kits/website/Shell.jsx":"4864ee37b1da","ui_kits/website/data.js":"104150e53f8c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SACCDesignSystem_90d397 = window.SACCDesignSystem_90d397 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const styles = {
  hero: {
    background: 'hsl(var(--accent) / 0.2)',
    color: 'var(--color-gold)',
    border: '1px solid hsl(var(--accent) / 0.3)',
    borderRadius: 'var(--radius-full)',
    padding: '4px 12px',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--weight-semibold)',
    letterSpacing: 'var(--tracking-eyebrow)'
  },
  accent: {
    background: 'var(--color-gold)',
    color: 'hsl(var(--accent-foreground))',
    borderRadius: 'var(--radius-lg)',
    padding: '4px 12px',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--weight-semibold)'
  },
  primary: {
    background: 'var(--color-navy)',
    color: '#fff',
    borderRadius: 'var(--radius-lg)',
    padding: '4px 12px',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--weight-semibold)'
  },
  muted: {
    background: 'var(--surface-muted)',
    color: 'var(--text-body)',
    borderRadius: 'var(--radius-lg)',
    padding: '4px 8px',
    fontSize: 'var(--text-xs)'
  },
  glass: {
    background: 'var(--surface-glass)',
    backdropFilter: 'blur(var(--blur-chip))',
    color: 'var(--color-navy)',
    borderRadius: 'var(--radius-full)',
    padding: '4px 12px',
    fontSize: 'var(--text-xs)',
    fontWeight: 'var(--weight-bold)'
  }
};
function Badge({
  variant = 'muted',
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: 'inline-block',
      fontFamily: 'var(--font-sans)',
      lineHeight: 1.4,
      ...styles[variant],
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  whiteSpace: 'nowrap',
  borderRadius: 'var(--radius-md)',
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--text-sm)',
  fontWeight: 'var(--weight-medium)',
  lineHeight: 1,
  border: '1px solid transparent',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'color var(--dur-base), background-color var(--dur-base), opacity var(--dur-base), border-color var(--dur-base)'
};
const variants = {
  default: {
    background: 'hsl(var(--button-primary-bg))',
    color: 'hsl(var(--button-primary-text))',
    boxShadow: 'var(--shadow)'
  },
  secondary: {
    background: 'hsl(var(--button-secondary-bg))',
    color: 'hsl(var(--button-secondary-text))',
    boxShadow: 'var(--shadow-sm)'
  },
  outline: {
    background: 'hsl(var(--button-outline-bg))',
    color: 'hsl(var(--button-outline-text))',
    borderColor: 'hsl(var(--input))',
    boxShadow: 'var(--shadow-sm)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-heading)'
  },
  link: {
    background: 'transparent',
    color: 'hsl(var(--button-primary-bg))',
    padding: 0,
    height: 'auto',
    textUnderlineOffset: '4px'
  },
  destructive: {
    background: 'hsl(var(--destructive))',
    color: 'hsl(var(--destructive-foreground))',
    boxShadow: 'var(--shadow-sm)'
  },
  accent: {
    background: 'var(--color-gold)',
    color: 'var(--color-navy)',
    fontWeight: 'var(--weight-semibold)'
  }
};
const sizes = {
  default: {
    height: '36px',
    padding: '0 16px'
  },
  sm: {
    height: '32px',
    padding: '0 12px',
    fontSize: 'var(--text-xs)'
  },
  lg: {
    height: '40px',
    padding: '0 32px'
  },
  icon: {
    height: '36px',
    width: '36px',
    padding: 0
  }
};
const hovers = {
  default: {
    opacity: 0.9
  },
  secondary: {
    opacity: 0.8
  },
  accent: {
    opacity: 0.9
  },
  destructive: {
    opacity: 0.9
  },
  outline: {
    background: 'var(--color-gold)',
    color: '#fff',
    borderColor: 'var(--color-gold)'
  },
  ghost: {
    background: 'var(--color-gold)',
    color: '#fff'
  },
  link: {
    textDecoration: 'underline'
  }
};
function Button({
  variant = 'default',
  size = 'default',
  as = 'button',
  pill = false,
  block = false,
  disabled = false,
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({}, rest, {
    disabled: Tag === 'button' ? disabled : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      ...base,
      ...sizes[size],
      ...variants[variant],
      ...(hover && !disabled ? hovers[variant] : null),
      ...(pill ? {
        borderRadius: 'var(--radius-full)'
      } : null),
      ...(block ? {
        width: '100%'
      } : null),
      ...(press && !disabled ? {
        transform: 'scale(var(--press-scale))'
      } : null),
      ...(disabled ? {
        opacity: 0.5,
        pointerEvents: 'none'
      } : null),
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  interactive = false,
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--border-hairline)',
      background: 'var(--surface-card)',
      color: 'var(--text-heading)',
      boxShadow: hover && interactive ? 'var(--shadow-xl)' : 'var(--shadow)',
      transition: 'box-shadow var(--dur-base), border-color var(--dur-base), transform var(--dur-base)',
      transform: hover && interactive ? 'translateY(var(--hover-lift))' : 'none',
      borderColor: hover && interactive ? 'var(--border-hover)' : 'var(--border-hairline)',
      ...style
    }
  }), children);
}
function CardHeader({
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      padding: 'var(--card-pad)',
      ...style
    }
  }), children);
}
function CardTitle({
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-semibold)',
      lineHeight: 1,
      letterSpacing: '-0.01em',
      ...style
    }
  }), children);
}
function CardDescription({
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)',
      ...style
    }
  }), children);
}
function CardContent({
  pad = 'md',
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      padding: pad === 'lg' ? 'var(--card-pad-lg)' : 'var(--card-pad)',
      ...style
    }
  }), children);
}
function CardFooter({
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      padding: 'var(--card-pad)',
      paddingTop: 0,
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  invalid = false,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("input", _extends({}, rest, {
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    },
    style: {
      display: 'flex',
      width: '100%',
      height: '36px',
      padding: '4px 12px',
      borderRadius: 'var(--radius-md)',
      border: '1px solid ' + (invalid ? 'hsl(var(--destructive))' : 'hsl(var(--input))'),
      background: 'transparent',
      color: 'var(--text-heading)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      boxShadow: focus ? '0 0 0 1px var(--focus-ring)' : 'var(--shadow-sm)',
      outline: 'none',
      transition: 'box-shadow var(--dur-base), border-color var(--dur-base)',
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Label.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Label({
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", _extends({}, rest, {
    style: {
      display: 'block',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--text-heading)',
      ...style
    }
  }), children);
}
function FieldError({
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("p", _extends({}, rest, {
    style: {
      margin: '4px 0 0',
      fontSize: 'var(--text-sm)',
      color: 'hsl(var(--destructive))',
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Label, FieldError });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Label.jsx", error: String((e && e.message) || e) }); }

// components/core/Select.jsx
try { (() => {
function Select({
  options = [],
  value,
  placeholder = 'Select…',
  invalid = false,
  onChange,
  style
}) {
  const [open, setOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOpen(!open),
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '8px',
      width: '100%',
      height: '36px',
      padding: '0 12px',
      borderRadius: 'var(--radius-md)',
      border: '1px solid ' + (invalid ? 'hsl(var(--destructive))' : 'hsl(var(--input))'),
      background: 'transparent',
      boxShadow: 'var(--shadow-sm)',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      color: value ? 'var(--text-heading)' : 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("span", null, value || placeholder), /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    style: {
      opacity: 0.5,
      transform: open ? 'rotate(180deg)' : 'none',
      transition: 'transform var(--dur-base)'
    }
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  }))), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '40px',
      left: 0,
      right: 0,
      zIndex: 30,
      padding: '4px',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-hairline)',
      background: 'hsl(var(--popover))',
      boxShadow: 'var(--shadow-lg)'
    }
  }, options.map(opt => /*#__PURE__*/React.createElement("div", {
    key: opt,
    onClick: () => {
      onChange && onChange(opt);
      setOpen(false);
    },
    style: {
      padding: '6px 8px',
      borderRadius: 'var(--radius-sm)',
      fontSize: 'var(--text-sm)',
      cursor: 'pointer',
      background: opt === value ? 'var(--surface-muted)' : 'transparent'
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = 'var(--surface-muted)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = opt === value ? 'var(--surface-muted)' : 'transparent';
    }
  }, opt))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Select.jsx", error: String((e && e.message) || e) }); }

// components/core/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Textarea({
  invalid = false,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("textarea", _extends({}, rest, {
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      display: 'block',
      width: '100%',
      minHeight: '150px',
      padding: '8px 12px',
      borderRadius: 'var(--radius-md)',
      border: '1px solid ' + (invalid ? 'hsl(var(--destructive))' : 'hsl(var(--input))'),
      background: 'transparent',
      color: 'var(--text-heading)',
      resize: 'vertical',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      lineHeight: 'var(--leading-relaxed)',
      boxShadow: focus ? '0 0 0 1px var(--focus-ring)' : 'var(--shadow-sm)',
      outline: 'none',
      transition: 'box-shadow var(--dur-base), border-color var(--dur-base)',
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/icons/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Lucide is the site's only icon set (lucide-react). Here the glyph data is read
   from the UMD build on the page — window.lucide.icons.<PascalName> is a 3-tuple
   [tag, attrs, children], and the children are the real paths — so no glyph is
   ever redrawn by hand.

   Deliberately hook-free: this component is rendered inside host documents that
   may carry more than one React copy, where any hook call would throw. */
function Icon({
  name,
  size = 24,
  strokeWidth = 2,
  color = 'currentColor',
  style,
  ...rest
}) {
  const lib = typeof window !== 'undefined' && window.lucide ? window.lucide.icons : null;
  const node = lib ? lib[name] : null;
  const parts = node && Array.isArray(node[2]) ? node[2] : [];
  return /*#__PURE__*/React.createElement("svg", _extends({}, rest, {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: 'block',
      flexShrink: 0,
      ...style
    }
  }), parts.map(([tag, attrs], i) => React.createElement(tag, {
    key: i,
    ...attrs
  })));
}
function IconTile({
  name,
  tone = 'accent',
  size = 64,
  style
}) {
  const tones = {
    accent: {
      background: 'hsl(var(--accent) / 0.1)',
      color: 'var(--color-gold)'
    },
    navy: {
      background: 'hsl(var(--primary) / 0.05)',
      color: 'var(--color-navy)'
    },
    solid: {
      background: 'var(--color-gold)',
      color: 'var(--color-navy)'
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: 'var(--icon-tile)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background var(--dur-base)',
      ...tones[tone],
      ...style
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: name,
    size: Math.round(size / 2)
  }));
}
Object.assign(__ds_scope, { Icon, IconTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icons/Icon.jsx", error: String((e && e.message) || e) }); }

// components/cards/EquipmentCard.jsx
try { (() => {
function Spec({
  icon,
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 16,
    color: "var(--color-gold)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-body)'
    }
  }, label, ":"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--color-navy)'
    }
  }, value));
}
function EquipmentCard({
  equipment,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const e = equipment;
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    interactive: true,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      overflow: 'hidden',
      height: '100%',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '192px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: e.image,
    alt: e.name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transform: hover ? 'scale(var(--hover-scale))' : 'none',
      transition: 'transform var(--dur-slow)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 'var(--space-4)',
      left: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    variant: "primary"
  }, e.category))), /*#__PURE__*/React.createElement(__ds_scope.CardContent, null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 var(--space-3)',
      fontFamily: 'var(--font-display)',
      fontSize: '1.25rem',
      fontWeight: 'var(--weight-semibold)',
      color: hover ? 'var(--color-gold)' : 'var(--text-heading)',
      transition: 'color var(--dur-base)'
    }
  }, e.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      marginBottom: 'var(--space-4)'
    }
  }, e.model && /*#__PURE__*/React.createElement(Spec, {
    icon: "Settings",
    label: "Model",
    value: e.model
  }), e.capacity && /*#__PURE__*/React.createElement(Spec, {
    icon: "Gauge",
    label: "Capacity",
    value: e.capacity
  }), e.year && /*#__PURE__*/React.createElement(Spec, {
    icon: "Calendar",
    label: "Year",
    value: e.year
  })), e.capabilities && e.capabilities.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 'var(--space-4)',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-heading)',
      marginBottom: 'var(--space-2)'
    }
  }, "Capabilities:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--space-2)'
    }
  }, e.capabilities.map(c => /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    key: c,
    variant: "muted"
  }, c))))));
}
Object.assign(__ds_scope, { EquipmentCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/EquipmentCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/LeadershipCard.jsx
try { (() => {
function LeadershipCard({
  member,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const m = member;
  const initials = m.name.split(' ').map(n => n[0]).join('');
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    interactive: true,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      height: '100%',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.CardContent, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      marginBottom: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '128px',
      height: '128px',
      margin: '0 auto',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      background: 'var(--surface-muted)'
    }
  }, m.image ? /*#__PURE__*/React.createElement("img", {
    src: m.image,
    alt: m.name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transform: hover ? 'scale(var(--hover-scale))' : 'none',
      transition: 'transform var(--dur-slow)'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'hsl(var(--accent) / 0.1)',
      fontSize: '2.25rem',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--color-gold)'
    }
  }, initials)), m.linkedin && /*#__PURE__*/React.createElement("a", {
    href: m.linkedin,
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": m.name + ' LinkedIn profile',
    style: {
      position: 'absolute',
      bottom: '-20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '40px',
      height: '40px',
      background: 'var(--color-gold)',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-lg)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "Linkedin",
    size: 20,
    color: "var(--color-navy)"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      paddingTop: m.linkedin ? 'var(--space-4)' : 0
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 4px',
      fontFamily: 'var(--font-display)',
      fontSize: '1.25rem',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-heading)'
    }
  }, m.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 var(--space-4)',
      color: 'var(--color-gold)',
      fontWeight: 'var(--weight-medium)'
    }
  }, m.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)',
      lineHeight: 'var(--leading-relaxed)'
    }
  }, m.bio))));
}
Object.assign(__ds_scope, { LeadershipCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/LeadershipCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/ProjectCard.jsx
try { (() => {
function Meta({
  icon,
  children,
  strong
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      fontSize: 'var(--text-sm)',
      color: strong ? 'var(--color-navy)' : 'var(--text-body)',
      fontWeight: strong ? 'var(--weight-medium)' : 'var(--weight-regular)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 16,
    color: "var(--color-gold)"
  }), /*#__PURE__*/React.createElement("span", null, children));
}
function ProjectCard({
  project,
  expanded = false,
  onToggle,
  expandLabel = 'View details',
  collapseLabel = 'Close',
  style
}) {
  const [hover, setHover] = React.useState(false);
  const p = project;
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    interactive: true,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      overflow: 'hidden',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '224px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: p.image,
    alt: p.title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transform: hover ? 'scale(var(--hover-scale))' : 'none',
      transition: 'transform var(--dur-slow)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 'var(--space-4)',
      right: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    variant: "glass"
  }, p.category))), /*#__PURE__*/React.createElement(__ds_scope.CardContent, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 var(--space-3)',
      fontFamily: 'var(--font-display)',
      fontSize: '1.25rem',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--color-navy)'
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 var(--space-6)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)',
      flexGrow: 1
    }
  }, p.desc), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
      paddingTop: 'var(--space-4)',
      borderTop: '1px solid var(--border-hairline)',
      marginBottom: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Meta, {
    icon: "MapPin"
  }, p.location), /*#__PURE__*/React.createElement(Meta, {
    icon: "Building"
  }, p.client), /*#__PURE__*/React.createElement(Meta, {
    icon: "CheckCircle2",
    strong: true
  }, p.status)), expanded && p.scope && /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: '0 0 var(--space-3)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--color-navy)'
    }
  }, "Scope of works"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'grid',
      gap: 'var(--space-2)'
    }
  }, p.scope.map(s => /*#__PURE__*/React.createElement("li", {
    key: s,
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      alignItems: 'flex-start',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '6px',
      height: '6px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--color-gold)',
      flexShrink: 0,
      marginTop: '7px'
    }
  }), s)))), /*#__PURE__*/React.createElement("button", {
    onClick: onToggle,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-2)',
      width: '100%',
      height: '36px',
      borderRadius: 'var(--radius-md)',
      border: '1px solid hsl(var(--input))',
      background: 'var(--surface-card)',
      color: 'var(--color-navy)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      cursor: 'pointer',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "Plus",
    size: 16,
    style: {
      transform: expanded ? 'rotate(45deg)' : 'none',
      transition: 'transform var(--dur-base)'
    }
  }), expanded ? collapseLabel : expandLabel)));
}
Object.assign(__ds_scope, { ProjectCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ProjectCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/ServiceCard.jsx
try { (() => {
function ServiceCard({
  icon,
  title,
  description,
  benefits = [],
  cta = 'Learn more',
  onCta,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    interactive: true,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      height: '100%',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.CardContent, {
    pad: "lg",
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconTile, {
    name: icon,
    tone: hover ? 'solid' : 'accent',
    size: 64,
    style: {
      marginBottom: 'var(--space-6)'
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 var(--space-4)',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h3)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-heading)',
      lineHeight: 'var(--leading-snug)'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 var(--space-6)',
      color: 'var(--text-body)',
      lineHeight: 'var(--leading-relaxed)',
      flexGrow: 1
    }
  }, description), benefits.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
      marginBottom: 'var(--space-6)'
    }
  }, benefits.map(b => /*#__PURE__*/React.createElement("div", {
    key: b,
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "ArrowRight",
    size: 16,
    color: "var(--color-gold)",
    style: {
      marginTop: '3px'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-heading)',
      opacity: 0.8
    }
  }, b)))), /*#__PURE__*/React.createElement("button", {
    onClick: onCta,
    style: {
      marginTop: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: hover ? 'var(--space-3)' : 'var(--space-2)',
      background: 'none',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      color: 'var(--color-gold)',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: 'var(--text-sm)',
      transition: 'gap var(--dur-base)'
    }
  }, /*#__PURE__*/React.createElement("span", null, cta), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "ArrowRight",
    size: 16
  }))));
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/StatCard.jsx
try { (() => {
function StatCard({
  value,
  label,
  icon,
  variant = 'card',
  style
}) {
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 22,
    color: "var(--color-gold)",
    style: {
      margin: '0 auto 12px'
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-stat)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--color-navy)',
      lineHeight: 1,
      marginBottom: '8px'
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)',
      fontWeight: variant === 'card' ? 'var(--weight-medium)' : 'var(--weight-regular)'
    }
  }, label));
  if (variant === 'bare') {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '32px 16px',
        textAlign: 'center',
        ...style
      }
    }, inner);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-lg)',
      padding: 'var(--card-pad)',
      textAlign: 'center',
      ...style
    }
  }, inner);
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/ContactForm.jsx
try { (() => {
const PROJECT_TYPES = ['Water Systems', 'Roads', 'Bridges', 'Urban Development', 'Equipment Rental', 'Other'];
function ContactForm({
  projectTypes = PROJECT_TYPES,
  onSubmit,
  style
}) {
  const [data, setData] = React.useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: ''
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const set = (k, v) => {
    setData(d => ({
      ...d,
      [k]: v
    }));
    if (errors[k]) setErrors(e => ({
      ...e,
      [k]: ''
    }));
  };
  const submit = e => {
    e.preventDefault();
    const err = {};
    if (!data.name.trim()) err.name = 'Name is required';
    if (!data.email.trim()) err.email = 'Email is required';else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) err.email = 'Please enter a valid email address';
    if (!data.company.trim()) err.company = 'Company name is required';
    if (!data.projectType) err.projectType = 'Please select a project type';
    if (!data.message.trim()) err.message = 'Message is required';else if (data.message.trim().length < 10) err.message = 'Message must be at least 10 characters';
    setErrors(err);
    if (Object.keys(err).length) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      onSubmit && onSubmit(data);
    }, 900);
  };
  const field = {
    marginBottom: 'var(--space-6)'
  };
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    style: {
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: field
  }, /*#__PURE__*/React.createElement(__ds_scope.Label, {
    htmlFor: "cf-name"
  }, "Full Name *"), /*#__PURE__*/React.createElement(__ds_scope.Input, {
    id: "cf-name",
    value: data.name,
    placeholder: "Enter your full name",
    invalid: !!errors.name,
    onChange: e => set('name', e.target.value),
    style: {
      marginTop: 'var(--space-2)'
    }
  }), errors.name && /*#__PURE__*/React.createElement(__ds_scope.FieldError, null, errors.name)), /*#__PURE__*/React.createElement("div", {
    style: field
  }, /*#__PURE__*/React.createElement(__ds_scope.Label, {
    htmlFor: "cf-email"
  }, "Email Address *"), /*#__PURE__*/React.createElement(__ds_scope.Input, {
    id: "cf-email",
    type: "email",
    value: data.email,
    placeholder: "your.email@company.com",
    invalid: !!errors.email,
    onChange: e => set('email', e.target.value),
    style: {
      marginTop: 'var(--space-2)'
    }
  }), errors.email && /*#__PURE__*/React.createElement(__ds_scope.FieldError, null, errors.email)), /*#__PURE__*/React.createElement("div", {
    style: field
  }, /*#__PURE__*/React.createElement(__ds_scope.Label, {
    htmlFor: "cf-company"
  }, "Company Name *"), /*#__PURE__*/React.createElement(__ds_scope.Input, {
    id: "cf-company",
    value: data.company,
    placeholder: "Your company name",
    invalid: !!errors.company,
    onChange: e => set('company', e.target.value),
    style: {
      marginTop: 'var(--space-2)'
    }
  }), errors.company && /*#__PURE__*/React.createElement(__ds_scope.FieldError, null, errors.company)), /*#__PURE__*/React.createElement("div", {
    style: field
  }, /*#__PURE__*/React.createElement(__ds_scope.Label, null, "Project Type *"), /*#__PURE__*/React.createElement(__ds_scope.Select, {
    options: projectTypes,
    value: data.projectType,
    placeholder: "Select project type",
    invalid: !!errors.projectType,
    onChange: v => set('projectType', v),
    style: {
      marginTop: 'var(--space-2)'
    }
  }), errors.projectType && /*#__PURE__*/React.createElement(__ds_scope.FieldError, null, errors.projectType)), /*#__PURE__*/React.createElement("div", {
    style: field
  }, /*#__PURE__*/React.createElement(__ds_scope.Label, {
    htmlFor: "cf-message"
  }, "Message *"), /*#__PURE__*/React.createElement(__ds_scope.Textarea, {
    id: "cf-message",
    value: data.message,
    placeholder: "Tell us about your project requirements...",
    invalid: !!errors.message,
    onChange: e => set('message', e.target.value),
    style: {
      marginTop: 'var(--space-2)'
    }
  }), errors.message && /*#__PURE__*/React.createElement(__ds_scope.FieldError, null, errors.message)), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "accent",
    block: true,
    type: "submit",
    disabled: loading
  }, loading ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "Loader2",
    size: 16
  }), " Submitting...") : sent ? 'Inquiry submitted' : 'Submit Inquiry'), sent && /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 'var(--space-4)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)'
    }
  }, "Thank you for your inquiry. We will respond within 24 hours for enterprise inquiries."));
}
Object.assign(__ds_scope, { ContactForm });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/ContactForm.jsx", error: String((e && e.message) || e) }); }

// components/site/Footer.jsx
try { (() => {
function Footer({
  logoSrc = 'assets/logo-full.webp',
  tagline,
  cr = 'CR: 4650242007',
  links = [],
  certs = [],
  address = [],
  phones = [],
  email,
  rights,
  style
}) {
  const col = {
    display: 'flex',
    flexDirection: 'column'
  };
  const heading = {
    margin: '0 0 var(--space-6)',
    fontFamily: 'var(--font-display)',
    fontSize: '1.125rem',
    fontWeight: 'var(--weight-semibold)',
    color: '#fff'
  };
  const dim = {
    color: 'rgb(255 255 255 / 0.8)',
    fontSize: 'var(--text-sm)',
    textDecoration: 'none'
  };
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--color-navy)',
      color: '#fff',
      padding: '80px 0 40px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--container-pad-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
      gap: 'var(--space-12)',
      marginBottom: 'var(--space-16)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...col,
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "SACC \u2014 Sana Al-Awael Contracting Company",
    style: {
      height: '50px',
      width: 'auto',
      objectFit: 'contain',
      alignSelf: 'flex-start'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      ...dim,
      lineHeight: 'var(--leading-relaxed)'
    }
  }, tagline), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      color: 'var(--color-gold)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "ShieldCheck",
    size: 18
  }), /*#__PURE__*/React.createElement("span", null, cr))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: heading
  }, "Quick Links"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'grid',
      gap: 'var(--space-3)'
    }
  }, links.map(l => /*#__PURE__*/React.createElement("li", {
    key: l.label
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: dim
  }, l.label))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: heading
  }, "Certifications & Approvals"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'grid',
      gap: 'var(--space-3)'
    }
  }, certs.map(c => /*#__PURE__*/React.createElement("li", {
    key: c,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      ...dim
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '6px',
      height: '6px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--color-gold)',
      flexShrink: 0
    }
  }), c)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: heading
  }, "Contact Us"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'grid',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("li", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      ...dim
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "MapPin",
    size: 18,
    color: "var(--color-gold)",
    style: {
      marginTop: '2px'
    }
  }), /*#__PURE__*/React.createElement("span", null, address.map((a, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, a, /*#__PURE__*/React.createElement("br", null))))), /*#__PURE__*/React.createElement("li", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      ...dim
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "Phone",
    size: 18,
    color: "var(--color-gold)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, phones.map(p => /*#__PURE__*/React.createElement("span", {
    key: p
  }, p)))), /*#__PURE__*/React.createElement("li", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      ...dim
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "Mail",
    size: 18,
    color: "var(--color-gold)"
  }), /*#__PURE__*/React.createElement("span", null, email))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-on-dark)',
      paddingTop: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'rgb(255 255 255 / 0.6)',
      fontSize: 'var(--text-sm)'
    }
  }, rights))));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/Footer.jsx", error: String((e && e.message) || e) }); }

// components/site/Header.jsx
try { (() => {
function Header({
  logoSrc = 'assets/logo-full.webp',
  items = [],
  active = '/',
  scrolled = false,
  languageLabel = 'العربية',
  onNavigate,
  style
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      width: '100%',
      zIndex: 50,
      background: scrolled ? 'hsl(var(--primary) / 0.95)' : 'var(--color-navy)',
      backdropFilter: scrolled ? 'blur(var(--blur-glass))' : 'none',
      boxShadow: scrolled ? 'var(--shadow-lg)' : 'none',
      padding: scrolled ? '12px 0' : '20px 0',
      transition: 'all var(--dur-base)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--container-pad-lg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate && onNavigate('/');
    },
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "SACC \u2014 Sana Al-Awael Contracting Company",
    style: {
      height: '55px',
      width: 'auto',
      objectFit: 'contain'
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    }
  }, items.map(item => {
    const on = item.path === active;
    return /*#__PURE__*/React.createElement("a", {
      key: item.path,
      href: "#",
      onClick: e => {
        e.preventDefault();
        onNavigate && onNavigate(item.path);
      },
      style: {
        position: 'relative',
        padding: '8px 16px',
        borderRadius: 'var(--radius-md)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--weight-medium)',
        textDecoration: 'none',
        color: on ? 'var(--color-gold)' : 'rgb(255 255 255 / 0.8)',
        transition: 'color var(--dur-base), background var(--dur-base)'
      },
      onMouseEnter: e => {
        if (!on) {
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.background = 'var(--border-on-dark)';
        }
      },
      onMouseLeave: e => {
        if (!on) {
          e.currentTarget.style.color = 'rgb(255 255 255 / 0.8)';
          e.currentTarget.style.background = 'transparent';
        }
      }
    }, item.name, on && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '2px',
        borderRadius: 'var(--radius-full)',
        background: 'var(--color-gold)'
      }
    }));
  }), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      padding: '8px 12px',
      borderRadius: 'var(--radius-md)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      color: 'rgb(255 255 255 / 0.8)',
      textDecoration: 'none'
    }
  }, languageLabel))));
}
Object.assign(__ds_scope, { Header });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/Header.jsx", error: String((e && e.message) || e) }); }

// components/site/PageHero.jsx
try { (() => {
function PageHero({
  title,
  lead,
  children,
  image,
  badge,
  align = 'left',
  style
}) {
  const dark = !image;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      background: 'var(--color-navy)',
      color: '#fff',
      padding: image ? '160px 0' : '80px 0',
      minHeight: image ? '540px' : 0,
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      ...style
    }
  }, image && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--overlay-hero)',
      mixBlendMode: 'multiply'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--container-pad-lg)',
      width: '100%',
      textAlign: align
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: image ? '48rem' : '42rem',
      marginLeft: align === 'center' ? 'auto' : 0,
      marginRight: align === 'center' ? 'auto' : 0
    }
  }, badge && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 'var(--space-6)'
    }
  }, badge), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '0 0 var(--space-6)',
      fontFamily: 'var(--font-display)',
      fontSize: image ? 'var(--text-h1-lg)' : 'var(--text-h1-md)',
      fontWeight: 'var(--weight-bold)',
      lineHeight: 'var(--leading-tight)',
      letterSpacing: 'var(--tracking-h1)',
      color: '#fff'
    }
  }, title), lead && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 var(--space-10)',
      fontSize: image ? 'var(--text-lead-md)' : 'var(--text-lead)',
      fontWeight: image ? 'var(--weight-light)' : 'var(--weight-regular)',
      color: 'rgb(255 255 255 / 0.85)',
      maxWidth: 'var(--measure-body)'
    }
  }, lead), children && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--space-4)'
    }
  }, children))));
}
Object.assign(__ds_scope, { PageHero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/PageHero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/CertificationsScreen.jsx
try { (() => {
const {
  Button,
  PageHero,
  Icon,
  EquipmentCard,
  LeadershipCard
} = window.SACCDesignSystem_90d397;
function CertificationsScreen({
  go
}) {
  const d = window.SACC_DATA;
  const c = d.certifications;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHero, {
    title: c.heroTitle,
    lead: c.heroLead
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => go('/contact')
  }, "Request Our Certificates")), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '48rem',
      margin: '0 auto var(--space-16)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ShieldCheck",
    size: 48,
    color: "var(--color-gold)",
    style: {
      margin: '0 auto var(--space-6)'
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 0 var(--space-6)',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h2-md)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--color-navy)',
      lineHeight: 'var(--leading-tight)'
    }
  }, c.commitmentTitle), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-body-lg)',
      color: 'var(--text-body)',
      lineHeight: 'var(--leading-relaxed)'
    }
  }, c.commitmentBody)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-12)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-muted)',
      padding: 'var(--card-pad-lg)',
      borderRadius: 'var(--radius-2xl)',
      border: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      marginBottom: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Award",
    size: 32,
    color: "var(--color-navy)"
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: '1.5rem',
      color: 'var(--color-navy)'
    }
  }, "ISO Standards")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-6)'
    }
  }, c.iso.map(i => /*#__PURE__*/React.createElement("div", {
    key: i.title,
    style: {
      display: 'flex',
      gap: 'var(--space-4)',
      background: 'var(--surface-card)',
      padding: 'var(--space-4)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '48px',
      height: '48px',
      flexShrink: 0,
      background: 'hsl(var(--accent) / 0.1)',
      borderRadius: 'var(--radius-sm)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--color-gold)'
    }
  }, "ISO"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: '0 0 2px',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-body-lg)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--color-navy)'
    }
  }, i.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)'
    }
  }, i.desc)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-navy)',
      padding: 'var(--card-pad-lg)',
      borderRadius: 'var(--radius-2xl)',
      color: '#fff',
      boxShadow: 'var(--shadow-xl)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      marginBottom: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "CheckCircle",
    size: 32,
    color: "var(--color-gold)"
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: '1.5rem',
      color: '#fff'
    }
  }, "Client Approvals")), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '0 0 var(--space-8)',
      padding: 0,
      listStyle: 'none',
      display: 'grid',
      gap: 'var(--space-4)',
      flexGrow: 1
    }
  }, c.approvals.map(a => /*#__PURE__*/React.createElement("li", {
    key: a,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      background: 'var(--surface-on-dark)',
      border: '1px solid var(--border-on-dark)',
      borderRadius: 'var(--radius-sm)',
      padding: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '8px',
      height: '8px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--color-gold)',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--weight-medium)',
      color: 'rgb(255 255 255 / 0.9)',
      fontSize: 'var(--text-sm)'
    }
  }, a)))), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    block: true,
    onClick: () => go('/projects')
  }, "View Our Projects")))), /*#__PURE__*/React.createElement(Section, {
    bg: "muted"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    title: "Fleet & People",
    lead: "A 150+ machine fleet and the team that runs it."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--space-6)',
      alignItems: 'start'
    }
  }, d.equipment.map(e => /*#__PURE__*/React.createElement(EquipmentCard, {
    key: e.name,
    equipment: e
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--space-6)',
      marginTop: 'var(--space-8)',
      alignItems: 'start'
    }
  }, d.leadership.map(m => /*#__PURE__*/React.createElement(LeadershipCard, {
    key: m.name,
    member: m
  })))));
}
Object.assign(window, {
  CertificationsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/CertificationsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ContactScreen.jsx
try { (() => {
const {
  PageHero,
  Card,
  CardContent,
  ContactForm,
  Icon,
  Badge
} = window.SACCDesignSystem_90d397;
function ContactScreen() {
  const d = window.SACC_DATA;
  const c = d.contact;
  const row = {
    display: 'flex',
    gap: 'var(--space-3)',
    alignItems: 'flex-start',
    fontSize: 'var(--text-sm)',
    color: 'var(--text-body)'
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHero, {
    title: c.heroTitle,
    lead: c.heroLead
  }), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.1fr 1fr',
      gap: 'var(--space-16)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, {
    pad: "lg"
  }, /*#__PURE__*/React.createElement(ContactForm, null))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 var(--space-6)',
      fontFamily: 'var(--font-display)',
      fontSize: '1.5rem',
      color: 'var(--color-navy)'
    }
  }, c.officeHeading), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: row
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "MapPin",
    size: 18,
    color: "var(--color-gold)"
  }), /*#__PURE__*/React.createElement("span", null, d.footer.address.join(' '))), /*#__PURE__*/React.createElement("div", {
    style: row
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Phone",
    size: 18,
    color: "var(--color-gold)"
  }), /*#__PURE__*/React.createElement("span", null, d.footer.phones.join(' · '))), /*#__PURE__*/React.createElement("div", {
    style: row
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Mail",
    size: 18,
    color: "var(--color-gold)"
  }), /*#__PURE__*/React.createElement("span", null, d.footer.email)), /*#__PURE__*/React.createElement("div", {
    style: row
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ShieldCheck",
    size: 18,
    color: "var(--color-gold)"
  }), /*#__PURE__*/React.createElement("span", null, c.cr)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-muted)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-2xl)',
      padding: 'var(--card-pad-lg)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 var(--space-4)',
      fontFamily: 'var(--font-display)',
      fontSize: '1.25rem',
      color: 'var(--color-navy)'
    }
  }, c.hoursHeading), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'grid',
      gap: 'var(--space-2)'
    }
  }, c.hours.map(h => /*#__PURE__*/React.createElement("li", {
    key: h,
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)'
    }
  }, h)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      flexWrap: 'wrap'
    }
  }, d.footer.certs.slice(0, 3).map(x => /*#__PURE__*/React.createElement(Badge, {
    key: x,
    variant: "muted"
  }, x)))))));
}
Object.assign(window, {
  ContactScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ContactScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeScreen.jsx
try { (() => {
const {
  Button,
  Badge,
  Card,
  CardContent,
  StatCard,
  ServiceCard,
  PageHero,
  Icon
} = window.SACCDesignSystem_90d397;
function HomeScreen({
  go
}) {
  const d = window.SACC_DATA;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHero, {
    image: d.hero.image,
    badge: /*#__PURE__*/React.createElement(Badge, {
      variant: "hero"
    }, d.hero.badge),
    title: d.hero.title,
    lead: d.hero.lead
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => go('/services')
  }, "Explore Our Services"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary",
    onClick: () => go('/contact')
  }, "Contact Us")), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '64px',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 0 var(--space-6)',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h2-lg)',
      fontWeight: 'var(--weight-bold)',
      lineHeight: 'var(--leading-tight)',
      letterSpacing: 'var(--tracking-h2)',
      color: 'var(--color-navy)'
    }
  }, d.about.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 var(--space-6)',
      fontSize: 'var(--text-body-lg)',
      color: 'var(--text-body)',
      lineHeight: 'var(--leading-relaxed)',
      maxWidth: 'var(--measure-body)'
    }
  }, d.about.body1), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 var(--space-8)',
      color: 'var(--text-body)',
      lineHeight: 'var(--leading-relaxed)',
      maxWidth: 'var(--measure-body)'
    }
  }, d.about.body2), /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    style: {
      fontSize: 'var(--text-body-lg)',
      fontWeight: 'var(--weight-semibold)'
    },
    onClick: () => go('/about')
  }, d.about.cta)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-4)'
    }
  }, d.stats.map(s => /*#__PURE__*/React.createElement(StatCard, {
    key: s.label,
    value: s.value,
    label: s.label
  }))))), /*#__PURE__*/React.createElement(Section, {
    bg: "slate"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    onDark: true,
    center: true,
    title: "Why Choose SACC",
    lead: "Our competitive advantages ensure project success from inception to handover."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 'var(--space-6)'
    }
  }, d.reasons.map(r => /*#__PURE__*/React.createElement("div", {
    key: r,
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      alignItems: 'flex-start',
      background: 'var(--surface-on-dark)',
      border: '1px solid var(--border-on-dark)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "CheckCircle2",
    size: 20,
    color: "var(--color-gold)",
    style: {
      marginTop: '2px'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--weight-medium)',
      color: 'rgb(255 255 255 / 0.9)',
      fontSize: 'var(--text-sm)'
    }
  }, r))))), /*#__PURE__*/React.createElement(Section, {
    bg: "muted"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    title: "Core Services",
    lead: "Comprehensive infrastructure capabilities delivered with precision.",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      onClick: () => go('/services')
    }, "View All Services")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--space-6)'
    }
  }, d.services.slice(0, 6).map(s => /*#__PURE__*/React.createElement(ServiceCard, {
    key: s.title,
    icon: s.icon,
    title: s.title,
    description: s.desc,
    cta: "Learn More",
    onCta: () => go('/services')
  })))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-navy)',
      borderRadius: 'var(--radius-2xl)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-2xl)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '64px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Award",
    size: 40,
    color: "var(--color-gold)",
    style: {
      marginBottom: 'var(--space-6)'
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 0 var(--space-6)',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h2-md)',
      fontWeight: 'var(--weight-bold)',
      lineHeight: 'var(--leading-tight)'
    }
  }, d.chairman.title), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: '0 0 var(--space-8)',
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontSize: 'var(--text-lead)',
      color: 'rgb(255 255 255 / 0.9)',
      lineHeight: 'var(--leading-relaxed)'
    }
  }, d.chairman.quote), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 'var(--weight-bold)',
      fontSize: 'var(--text-body-lg)'
    }
  }, d.chairman.name), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--color-gold)',
      fontSize: 'var(--text-sm)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-eyebrow)',
      marginTop: '2px'
    }
  }, d.chairman.role), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => go('/leadership')
  }, d.chairman.cta))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: '360px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: d.chairman.image,
    alt: d.chairman.name,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'grayscale(1)',
      mixBlendMode: 'luminosity',
      opacity: 0.8
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--overlay-portrait)'
    }
  })))));
}
Object.assign(window, {
  HomeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ProjectsScreen.jsx
try { (() => {
const {
  Button,
  PageHero,
  ProjectCard,
  StatCard
} = window.SACCDesignSystem_90d397;
function ProjectsScreen({
  go
}) {
  const d = window.SACC_DATA;
  const [filter, setFilter] = React.useState('all');
  const [openId, setOpenId] = React.useState(null);
  const items = filter === 'all' ? d.projects : d.projects.filter(p => p.key === filter);
  const stats = [{
    icon: 'Layers',
    value: d.projects.length,
    label: 'Projects delivered'
  }, {
    icon: 'Landmark',
    value: new Set(d.projects.map(p => p.client)).size,
    label: 'Government & semi-government clients'
  }, {
    icon: 'Map',
    value: new Set(d.projects.map(p => p.location)).size,
    label: 'Cities and regions'
  }, {
    icon: 'CheckCircle2',
    value: d.projects.filter(p => p.status === 'Completed').length,
    label: 'Completed'
  }];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHero, {
    title: "Project Portfolio",
    lead: "Showcasing our capability to deliver complex infrastructure projects on time and to the highest standards."
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => go('/contact')
  }, "Discuss Your Next Project")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-muted)',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--container-pad-lg)',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)'
    }
  }, stats.map(s => /*#__PURE__*/React.createElement(StatCard, {
    key: s.label,
    variant: "bare",
    icon: s.icon,
    value: s.value,
    label: s.label
  })))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--space-3)',
      marginBottom: 'var(--space-12)'
    }
  }, d.projectCategories.map(c => /*#__PURE__*/React.createElement(Button, {
    key: c.key,
    pill: true,
    variant: filter === c.key ? 'default' : 'secondary',
    onClick: () => {
      setFilter(c.key);
      setOpenId(null);
    }
  }, c.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--space-8)',
      alignItems: 'start'
    }
  }, items.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    style: openId === p.id ? {
      gridColumn: 'span 3'
    } : null
  }, /*#__PURE__*/React.createElement(ProjectCard, {
    project: p,
    expanded: openId === p.id,
    onToggle: () => setOpenId(openId === p.id ? null : p.id)
  })))), items.length === 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      color: 'var(--text-body)',
      padding: '48px 0'
    }
  }, "No projects in this category yet.")));
}
Object.assign(window, {
  ProjectsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ProjectsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ServicesScreen.jsx
try { (() => {
const {
  Button,
  PageHero,
  IconTile,
  Icon
} = window.SACCDesignSystem_90d397;
function ServicesScreen({
  go
}) {
  const d = window.SACC_DATA;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHero, {
    title: "Integrated Services",
    lead: "Delivering end-to-end infrastructure solutions with precision, quality, and technical excellence."
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => go('/contact')
  }, "Request a Consultation")), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '96px'
    }
  }, d.services.slice(0, 4).map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.title,
    style: {
      display: 'flex',
      flexDirection: i % 2 ? 'row-reverse' : 'row',
      gap: '48px',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '50%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-2xl)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-xl)',
      aspectRatio: '4 / 3'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: s.image,
    alt: s.title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--overlay-image)',
      mixBlendMode: 'multiply'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(IconTile, {
    name: s.icon,
    tone: "accent",
    size: 56
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: '1.875rem',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--color-navy)',
      lineHeight: 'var(--leading-snug)'
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-body-lg)',
      color: 'var(--text-body)',
      lineHeight: 'var(--leading-relaxed)',
      maxWidth: 'var(--measure-body)'
    }
  }, s.desc), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 'var(--space-4)',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: '0 0 var(--space-4)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-body)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--color-navy)'
    }
  }, "Technical Capabilities:"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '0 0 var(--space-6)',
      padding: 0,
      listStyle: 'none',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-3)'
    }
  }, s.capabilities.map(c => /*#__PURE__*/React.createElement("li", {
    key: c,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '6px',
      height: '6px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--color-gold)',
      flexShrink: 0
    }
  }), c))), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => go('/contact')
  }, "Inquire About ", s.title))))))));
}
Object.assign(window, {
  ServicesScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ServicesScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Shell.jsx
try { (() => {
const {
  Button,
  Icon
} = window.SACCDesignSystem_90d397;
function Section({
  bg = 'page',
  children,
  style
}) {
  const bgs = {
    page: 'var(--surface-page)',
    muted: 'var(--surface-muted)',
    navy: 'var(--color-navy)',
    slate: 'var(--color-slate)'
  };
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: bgs[bg],
      padding: '80px 0',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--container-pad-lg)'
    }
  }, children));
}
function SectionHead({
  title,
  lead,
  onDark = false,
  center = false,
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 'var(--space-8)',
      marginBottom: 'var(--space-12)',
      textAlign: center ? 'center' : 'left',
      flexDirection: center ? 'column' : 'row'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '42rem',
      margin: center ? '0 auto' : 0
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 0 var(--space-4)',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h2-lg)',
      fontWeight: 'var(--weight-bold)',
      lineHeight: 'var(--leading-tight)',
      letterSpacing: 'var(--tracking-h2)',
      color: onDark ? '#fff' : 'var(--color-navy)'
    }
  }, title), lead && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: onDark ? 'rgb(255 255 255 / 0.8)' : 'var(--text-body)',
      maxWidth: 'var(--measure-body)'
    }
  }, lead)), action);
}
Object.assign(window, {
  Section,
  SectionHead
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.js
try { (() => {
window.SACC_DATA = {
  nav: [{
    name: 'Home',
    path: '/'
  }, {
    name: 'About',
    path: '/about'
  }, {
    name: 'Services',
    path: '/services'
  }, {
    name: 'Projects',
    path: '/projects'
  }, {
    name: 'Equipment',
    path: '/equipment'
  }, {
    name: 'Certifications',
    path: '/certifications'
  }, {
    name: 'Leadership',
    path: '/leadership'
  }, {
    name: 'Contact',
    path: '/contact'
  }],
  hero: {
    badge: 'ENGINEERING EXCELLENCE',
    title: 'Fabricating the Future Starts Today',
    lead: "Delivering integrated infrastructure solutions, from advanced water networks to complex urban development, powering the Kingdom's growth.",
    image: 'https://images.unsplash.com/photo-1614058427323-4959d1ddfe0b'
  },
  about: {
    title: 'Building the Foundation of Tomorrow',
    body1: 'Founded in 2007, Sana Al-Awael Contracting Company (SACC) has established itself as a premier infrastructure developer in Saudi Arabia. We specialize in delivering complex, large-scale projects that form the backbone of modern communities.',
    body2: 'Our expertise spans water networks, sewerage, roads, electrical systems, drainage, bridges, and comprehensive urban development. Backed by a modern equipment fleet and a commitment to safety, we turn visionary blueprints into enduring realities.',
    cta: 'Read Our Full Story →'
  },
  stats: [{
    value: '2007',
    label: 'Established'
  }, {
    value: '35+',
    label: 'Years Leadership Experience'
  }, {
    value: '150+',
    label: 'Equipment Fleet'
  }, {
    value: '100%',
    label: 'Safety Compliance'
  }],
  reasons: ['ISO Certified (9001, 14001, 45001)', 'NWC Approved Contractor', '35+ Years Leadership Expertise', 'Modern Heavy Equipment Fleet', 'Integrated Turnkey Solutions', 'Zero-Harm Safety Culture', 'On-Time Reliable Delivery', 'Trusted by Government & Private Sectors'],
  services: [{
    icon: 'Droplets',
    title: 'Water & Sewerage Networks',
    desc: 'Design, installation, and commissioning of comprehensive water distribution and wastewater collection systems.',
    capabilities: ['Main transmission lines', 'Pumping stations', 'Reservoirs', 'House connections'],
    image: 'https://images.unsplash.com/photo-1614195975309-a3baf592274f'
  }, {
    icon: 'CloudRain',
    title: 'Stormwater & Drainage Systems',
    desc: 'Advanced drainage solutions designed to protect urban infrastructure from flooding and manage surface water effectively.',
    capabilities: ['Box culverts', 'Open channels', 'Retention basins', 'Micro-tunneling'],
    image: 'https://horizons-cdn.hostinger.com/452dd903-afe9-42ac-8b4c-5c4b979ffaf2/9ca88518e2da2ef0f72ea8ba1ef7c485.jpg'
  }, {
    icon: 'Zap',
    title: 'Electrical & Solar Energy',
    desc: 'Robust power distribution and modern communication infrastructure for residential, commercial, and industrial zones.',
    capabilities: ['High/Medium/Low voltage networks', 'Substations', 'Street lighting', 'Fiber optic networks'],
    image: 'https://horizons-cdn.hostinger.com/452dd903-afe9-42ac-8b4c-5c4b979ffaf2/74d65ac0771e13d4ae20d9c36da6a002.jpg'
  }, {
    icon: 'Route',
    title: 'Roads & Asphalt Works',
    desc: 'High-quality road construction, paving, and rehabilitation services meeting international transportation standards.',
    capabilities: ['Earthworks & grading', 'Asphalt paving', 'Traffic safety systems', 'Road marking'],
    image: 'https://horizons-cdn.hostinger.com/452dd903-afe9-42ac-8b4c-5c4b979ffaf2/0ee767b1ad6a6c135b51e48993a3465f.jpg'
  }, {
    icon: 'Router',
    title: 'Bridges & Tunnels',
    desc: 'Complex structural engineering and construction for critical transportation links and grade separations.',
    capabilities: ['Concrete structures', 'Underpasses', 'Retaining walls', 'Structural rehabilitation'],
    image: 'https://images.unsplash.com/photo-1660638983526-d059117b910f'
  }, {
    icon: 'Building2',
    title: 'Landscaping & Urban Development',
    desc: 'Creating sustainable, aesthetically pleasing public spaces, parks, and community infrastructure.',
    capabilities: ['Hardscaping', 'Irrigation systems', 'Public parks', 'Pedestrian walkways'],
    image: 'https://horizons-cdn.hostinger.com/452dd903-afe9-42ac-8b4c-5c4b979ffaf2/fe90b22a280af627db8dde84d95bb038.jpg'
  }, {
    icon: 'ShieldCheck',
    title: 'Quality Control & Laboratory Services',
    desc: 'Rigorous material testing and quality assurance protocols ensuring compliance with project specifications.',
    capabilities: ['Soil testing', 'Asphalt analysis', 'Concrete testing', 'Field density tests'],
    image: 'https://horizons-cdn.hostinger.com/452dd903-afe9-42ac-8b4c-5c4b979ffaf2/a08bd408fb9cb46035fe88b4d10df759.webp'
  }, {
    icon: 'Truck',
    title: 'Equipment Rental & Technical Support',
    desc: 'Modern heavy machinery fleet with technical support across the Kingdom.',
    capabilities: ['Excavators', 'Loaders', 'Tippers', 'Operator support'],
    image: 'https://horizons-cdn.hostinger.com/452dd903-afe9-42ac-8b4c-5c4b979ffaf2/170e3ecc615f477a1f6c16510fdc0943.jpg'
  }, {
    icon: 'Settings',
    title: 'Operation & Maintenance',
    desc: 'Long-term facility management and infrastructure upkeep.',
    capabilities: ['Network O&M', 'Preventive maintenance', 'Emergency response', 'Asset reporting'],
    image: 'https://horizons-cdn.hostinger.com/452dd903-afe9-42ac-8b4c-5c4b979ffaf2/128edc4885024e1cbd744761744d201e.jpg'
  }],
  chairman: {
    title: 'A Legacy of Leadership',
    quote: '"Our commitment to engineering excellence and sustainable development drives every project we undertake. We don\'t just build infrastructure; we build the foundation for future generations."',
    name: 'Eng. Wasef Zeitoun',
    role: 'Chairman',
    cta: 'Meet Our Leadership',
    image: 'https://horizons-cdn.hostinger.com/452dd903-afe9-42ac-8b4c-5c4b979ffaf2/54ad47034b10af4059ad230ab0ad21d9.jpg'
  },
  projectCategories: [{
    key: 'all',
    label: 'All'
  }, {
    key: 'water',
    label: 'Water Infrastructure'
  }, {
    key: 'roads',
    label: 'Roads & Asphalt'
  }, {
    key: 'electrical',
    label: 'Electrical Infrastructure'
  }, {
    key: 'urban',
    label: 'Urban Development'
  }],
  projects: [{
    id: 1,
    key: 'water',
    title: 'Outfall Line for ISTP3',
    location: 'Al Madinah',
    category: 'Water Infrastructure',
    client: 'National Water Company',
    status: 'Completed',
    desc: 'Construction of a major sewerage outfall line supporting the Independent Sewage Treatment Plant 3, involving deep excavation and large-diameter pipe installation.',
    scope: ['Deep excavation works', 'Large-diameter pipe installation', 'Sewerage outfall line construction'],
    image: 'https://horizons-cdn.hostinger.com/452dd903-afe9-42ac-8b4c-5c4b979ffaf2/fe90b22a280af627db8dde84d95bb038.jpg'
  }, {
    id: 2,
    key: 'water',
    title: 'Reused Water Network Project',
    location: 'Al Madinah',
    category: 'Water Infrastructure',
    client: 'Ministry of Environment, Water and Agriculture',
    status: 'Completed',
    desc: 'Extensive water distribution network designed to supply treated sewage effluent (TSE) for agricultural and landscaping use across the region.',
    scope: ['Treated sewage effluent (TSE) distribution', 'Regional network extension', 'Agricultural and landscaping supply'],
    image: 'https://images.unsplash.com/photo-1614195975309-a3baf592274f'
  }, {
    id: 3,
    key: 'urban',
    title: 'Urban Development Works',
    location: 'Al Madinah',
    category: 'Urban Development',
    client: 'Al Madinah Municipality',
    status: 'Completed',
    desc: 'Integrated urban development package covering roads, hardscaping and public space delivery.',
    scope: ['Hardscaping', 'Pedestrian walkways', 'Public lighting'],
    image: 'https://horizons-cdn.hostinger.com/452dd903-afe9-42ac-8b4c-5c4b979ffaf2/f90aea0ed9efb167c5e0f909c0dfd546.png'
  }, {
    id: 4,
    key: 'roads',
    title: 'Roads & Asphalt Package',
    location: 'Al Madinah',
    category: 'Roads & Asphalt',
    client: 'Ministry of Transport',
    status: 'Completed',
    desc: 'Road construction and asphalt rehabilitation works delivered to international transportation standards.',
    scope: ['Earthworks & grading', 'Asphalt paving', 'Road marking'],
    image: 'https://horizons-cdn.hostinger.com/452dd903-afe9-42ac-8b4c-5c4b979ffaf2/170e3ecc615f477a1f6c16510fdc0943.jpg'
  }, {
    id: 5,
    key: 'electrical',
    title: 'Electrical Distribution Network',
    location: 'Al Madinah',
    category: 'Electrical Infrastructure',
    client: 'Saudi Electricity Company',
    status: 'Completed',
    desc: 'Medium and low voltage distribution network with substations and street lighting.',
    scope: ['MV/LV networks', 'Substations', 'Street lighting'],
    image: 'https://horizons-cdn.hostinger.com/452dd903-afe9-42ac-8b4c-5c4b979ffaf2/dbf9273f0e607726fb87885bddfdffa1.jpg'
  }, {
    id: 6,
    key: 'urban',
    title: 'Landscaping & Public Realm',
    location: 'Al Madinah',
    category: 'Urban Development',
    client: 'Al Madinah Municipality',
    status: 'Completed',
    desc: 'Public parks and pedestrian realm delivery including irrigation and hardscaping.',
    scope: ['Public parks', 'Irrigation systems', 'Hardscaping'],
    image: 'https://images.unsplash.com/photo-1692639448483-4eaa1c3801ef'
  }],
  equipment: [{
    name: 'Hydraulic Excavators',
    category: 'Excavation',
    model: 'Fleet standard',
    capacity: 'Up to 36 t',
    year: '2018–2023',
    capabilities: ['Deep excavation', 'Trenching', 'Bulk earthworks'],
    image: 'https://images.unsplash.com/photo-1603814744247-ca3e77714471'
  }, {
    name: 'Asphalt Paving Train',
    category: 'Roads',
    model: 'Paver + rollers',
    capacity: 'Highway grade',
    capabilities: ['Asphalt paving', 'Compaction'],
    image: 'https://horizons-cdn.hostinger.com/452dd903-afe9-42ac-8b4c-5c4b979ffaf2/0ee767b1ad6a6c135b51e48993a3465f.jpg'
  }, {
    name: 'Heavy Haulage & Tippers',
    category: 'Logistics',
    model: 'Tipper fleet',
    capacity: '150+ units total fleet',
    capabilities: ['Material haulage', 'Site logistics'],
    image: 'https://horizons-cdn.hostinger.com/452dd903-afe9-42ac-8b4c-5c4b979ffaf2/170e3ecc615f477a1f6c16510fdc0943.jpg'
  }],
  certifications: {
    heroTitle: 'Certifications & Approvals',
    heroLead: 'Independently audited management systems and client approvals underpinning every project we deliver.',
    commitmentTitle: 'Quality, Environment and Safety, Certified',
    commitmentBody: 'Our management systems are certified to three international standards and audited annually. Every project is delivered under the same documented quality, environmental and occupational health procedures.',
    iso: [{
      title: 'ISO 9001:2015',
      desc: 'Quality management systems'
    }, {
      title: 'ISO 14001:2015',
      desc: 'Environmental management systems'
    }, {
      title: 'ISO 45001:2018',
      desc: 'Occupational health and safety management'
    }],
    approvals: ['NWC Approved Contractor', 'Saudi Contractors Authority', 'Ministry of Environment, Water and Agriculture', 'Al Madinah Municipality']
  },
  leadership: [{
    name: 'Eng. Wasef Zeitoun',
    title: 'Chairman',
    bio: 'More than 35 years directing large-scale infrastructure delivery across the Kingdom.',
    image: 'https://horizons-cdn.hostinger.com/452dd903-afe9-42ac-8b4c-5c4b979ffaf2/54ad47034b10af4059ad230ab0ad21d9.jpg',
    linkedin: '#'
  }, {
    name: 'SACC Executive Team',
    title: 'Operations',
    bio: 'Project directors, QA/QC leads and plant managers covering water, roads and urban packages.'
  }],
  footer: {
    tagline: 'Fabricating the future through integrated infrastructure solutions, engineering excellence, and unwavering commitment to quality since 2007.',
    links: [{
      label: 'About'
    }, {
      label: 'Services'
    }, {
      label: 'Projects'
    }, {
      label: 'Equipment'
    }, {
      label: 'Leadership'
    }, {
      label: 'Contact'
    }],
    certs: ['ISO 9001:2015 Quality', 'ISO 14001:2015 Environmental', 'ISO 45001:2018 Safety', 'NWC Approved Contractor', 'Saudi Contractors Authority'],
    address: ['Al Madinah Al Munawwarah,', 'Kingdom of Saudi Arabia'],
    phones: ['+966 14 848 4014', '+966 50 426 6876'],
    email: 'contact@sanasacc.com',
    rights: '© 2026 Sana Al-Awael Contracting Company. All rights reserved.'
  },
  contact: {
    heroTitle: 'Contact Us',
    heroLead: 'Tell us about your project. Enterprise enquiries receive a response within 24 hours.',
    officeHeading: 'Head Office',
    hoursHeading: 'Working Hours',
    hours: ['Sunday – Thursday, 08:00 – 17:00', 'Friday & Saturday, closed'],
    cr: 'CR 4650242007'
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.js", error: String((e && e.message) || e) }); }

__ds_ns.EquipmentCard = __ds_scope.EquipmentCard;

__ds_ns.LeadershipCard = __ds_scope.LeadershipCard;

__ds_ns.ProjectCard = __ds_scope.ProjectCard;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardHeader = __ds_scope.CardHeader;

__ds_ns.CardTitle = __ds_scope.CardTitle;

__ds_ns.CardDescription = __ds_scope.CardDescription;

__ds_ns.CardContent = __ds_scope.CardContent;

__ds_ns.CardFooter = __ds_scope.CardFooter;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Label = __ds_scope.Label;

__ds_ns.FieldError = __ds_scope.FieldError;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.ContactForm = __ds_scope.ContactForm;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconTile = __ds_scope.IconTile;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.Header = __ds_scope.Header;

__ds_ns.PageHero = __ds_scope.PageHero;

})();
