/* ==========================================================================
   PAWLIO · interacciones
   - Animaciones de entrada y cifras animadas
   - Caja de compra: bundles, suscripción, galería, barra fija, entrega estimada
   Todo funciona igual en el editor de Shopify (se reinicia al editar una sección).
   ========================================================================== */
(function () {
  'use strict';

  window.pwReady = true;
  document.documentElement.classList.remove('pw-ready-fallback');

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Dinero ---------- */
  function formatMoney(cents, format) {
    if (typeof cents === 'string') cents = cents.replace('.', '');
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var fmt = format || window.pwMoneyFormat || '${{amount}}';

    function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = precision == null ? 2 : precision;
      thousands = thousands || ',';
      decimal = decimal || '.';
      if (isNaN(number) || number == null) return '0';
      number = (number / 100.0).toFixed(precision);
      var parts = number.split('.');
      var dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
      var centsPart = parts[1] ? decimal + parts[1] : '';
      return dollars + centsPart;
    }

    var match = fmt.match(placeholderRegex);
    switch (match ? match[1] : 'amount') {
      case 'amount': value = formatWithDelimiters(cents, 2); break;
      case 'amount_no_decimals': value = formatWithDelimiters(cents, 0); break;
      case 'amount_with_comma_separator': value = formatWithDelimiters(cents, 2, '.', ','); break;
      case 'amount_no_decimals_with_comma_separator': value = formatWithDelimiters(cents, 0, '.', ','); break;
      case 'amount_with_apostrophe_separator': value = formatWithDelimiters(cents, 2, "'", '.'); break;
      case 'amount_no_decimals_with_space_separator': value = formatWithDelimiters(cents, 0, ' ', ''); break;
      case 'amount_with_space_separator': value = formatWithDelimiters(cents, 2, ' ', ','); break;
      case 'amount_with_period_and_space_separator': value = formatWithDelimiters(cents, 2, ' ', '.'); break;
      default: value = formatWithDelimiters(cents, 2);
    }
    return fmt.replace(placeholderRegex, value);
  }

  function fill(template, map) {
    return String(template || '').replace(/\[(\w+)\]/g, function (all, key) {
      return Object.prototype.hasOwnProperty.call(map, key) ? map[key] : all;
    });
  }

  /* ---------- Animaciones de entrada ---------- */
  var revealObserver = null;
  function initReveal(root) {
    var items = (root || document).querySelectorAll('.pw-reveal:not(.is-in)');
    if (!items.length) return;
    if (reduceMotion || !('IntersectionObserver' in window) || window.Shopify && window.Shopify.designMode) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    }
    items.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Cifras animadas ---------- */
  function initCounters(root) {
    var items = (root || document).querySelectorAll('[data-pw-count]:not([data-pw-counted])');
    if (!items.length) return;
    function run(el) {
      el.setAttribute('data-pw-counted', '');
      var target = parseFloat(el.getAttribute('data-pw-count'));
      if (isNaN(target) || reduceMotion) return;
      var decimals = (String(el.getAttribute('data-pw-count')).split('.')[1] || '').length;
      var start = null;
      var duration = 1600;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 4);
        el.textContent = (target * eased).toFixed(decimals);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = el.getAttribute('data-pw-count');
      }
      requestAnimationFrame(step);
    }
    if (!('IntersectionObserver' in window)) { items.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { run(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Enlaces a la caja de compra ---------- */
  function initAnchors(root) {
    (root || document).querySelectorAll('a[href="#pw-buy"]').forEach(function (a) {
      if (a.dataset.pwAnchor) return;
      a.dataset.pwAnchor = '1';
      a.addEventListener('click', function (e) {
        var target = document.getElementById('pw-buy');
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    });
  }

  /* ---------- Entrega estimada ---------- */
  function addBusinessDays(date, days) {
    var d = new Date(date.getTime());
    var added = 0;
    while (added < days) {
      d.setDate(d.getDate() + 1);
      var day = d.getDay();
      if (day !== 0 && day !== 6) added++;
    }
    return d;
  }

  function initDelivery(root) {
    (root || document).querySelectorAll('[data-pw-delivery]').forEach(function (el) {
      var min = parseInt(el.getAttribute('data-min'), 10) || 5;
      var max = parseInt(el.getAttribute('data-max'), 10) || 10;
      var tpl = el.getAttribute('data-template') || 'Get it [start] – [end]';
      var opts = { weekday: 'short', month: 'short', day: 'numeric' };
      var now = new Date();
      var start = addBusinessDays(now, min).toLocaleDateString('en-US', opts);
      var end = addBusinessDays(now, max).toLocaleDateString('en-US', opts);
      var target = el.querySelector('[data-pw-delivery-text]') || el;
      target.innerHTML = fill(tpl, { start: '<strong>' + start + '</strong>', end: '<strong>' + end + '</strong>' });
      el.hidden = false;
    });
  }

  /* ---------- Galería ---------- */
  function Gallery(root) {
    this.root = root;
    this.track = root.querySelector('[data-pw-track]');
    if (!this.track) return;
    this.slides = Array.prototype.slice.call(this.track.children);
    this.dots = Array.prototype.slice.call(root.querySelectorAll('[data-pw-dot]'));
    this.thumbs = Array.prototype.slice.call(root.querySelectorAll('[data-pw-thumb]'));
    this.index = 0;
    var self = this;
    var ticking = false;
    this.track.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var w = self.track.clientWidth || 1;
        var i = Math.round(self.track.scrollLeft / w);
        if (i !== self.index) self.setActive(i);
      });
    }, { passive: true });
    this.dots.concat(this.thumbs).forEach(function (btn) {
      btn.addEventListener('click', function () { self.go(parseInt(btn.getAttribute('data-index'), 10)); });
    });
    var prev = root.querySelector('[data-pw-prev]');
    var next = root.querySelector('[data-pw-next]');
    if (prev) prev.addEventListener('click', function () { self.go(self.index - 1); });
    if (next) next.addEventListener('click', function () { self.go(self.index + 1); });
  }

  Gallery.prototype.setActive = function (i) {
    this.index = i;
    this.dots.forEach(function (d, n) { d.classList.toggle('is-active', n === i); d.setAttribute('aria-current', n === i ? 'true' : 'false'); });
    this.thumbs.forEach(function (t, n) { t.classList.toggle('is-active', n === i); t.setAttribute('aria-current', n === i ? 'true' : 'false'); });
    var activeThumb = this.thumbs[i];
    if (activeThumb && activeThumb.parentElement) {
      var parent = activeThumb.parentElement;
      var left = activeThumb.offsetLeft - parent.clientWidth / 2 + activeThumb.clientWidth / 2;
      parent.scrollTo({ left: left, behavior: 'smooth' });
    }
  };

  Gallery.prototype.go = function (i) {
    if (!this.slides.length) return;
    var n = this.slides.length;
    i = (i + n) % n;
    this.track.scrollTo({ left: i * this.track.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' });
    this.setActive(i);
  };

  Gallery.prototype.goToMedia = function (mediaId) {
    if (!mediaId) return;
    for (var i = 0; i < this.slides.length; i++) {
      if (String(this.slides[i].getAttribute('data-media-id')) === String(mediaId)) { this.go(i); return; }
    }
  };

  /* ---------- Caja de compra ---------- */
  function Product(root) {
    this.root = root;
    var jsonEl = root.querySelector('[data-pw-json]');
    if (!jsonEl) return;
    try { this.data = JSON.parse(jsonEl.textContent); } catch (e) { return; }
    this.variants = this.data.variants || [];
    if (!this.variants.length) return;

    this.form = root.querySelector('form[action*="/cart/add"]');
    this.idInput = this.form ? this.form.querySelector('input[name="id"]') : null;
    this.planInput = this.form ? this.form.querySelector('input[name="selling_plan"]') : null;
    this.atc = root.querySelector('[data-pw-atc]');
    this.gallery = root.querySelector('[data-pw-gallery]') ? new Gallery(root.querySelector('[data-pw-gallery]')) : null;
    this.strings = this.data.strings || {};

    var current = this.variants.filter(function (v) { return v.id === this.data.current; }, this)[0] || this.variants[0];
    this.options = current.options.slice();
    this.purchase = root.getAttribute('data-purchase') || 'onetime';
    this.planId = this.data.plans && this.data.plans.length ? String(root.getAttribute('data-plan') || this.data.plans[0].id) : null;

    this.bind();
    this.update(false);
    this.initSticky();
  }

  Product.prototype.unitsFor = function (variant) {
    var bi = this.data.bundleIndex;
    if (bi == null || bi < 0) return 1;
    var u = (this.data.units || {})[variant.options[bi]];
    return u && u > 0 ? u : 1;
  };

  Product.prototype.pricing = function (variant, purchase) {
    var units = this.unitsFor(variant);
    var baseline = (this.data.baseline || 0) * units;
    var strike = 0;
    if (variant.compare > variant.price) strike = variant.compare;
    else if (baseline > variant.price) strike = baseline;
    var plan = purchase === 'subscription' && this.planId ? (variant.plans || {})[this.planId] : null;
    var price = plan ? plan.price : variant.price;
    if (plan) strike = Math.max(strike, variant.price);
    if (strike <= price) strike = 0;
    return {
      price: price,
      strike: strike,
      units: units,
      perUnit: Math.floor(price / units),
      save: strike ? Math.floor((strike - price) * 100 / strike) : 0,
      saveAmount: strike ? strike - price : 0,
      hasPlan: !!plan
    };
  };

  Product.prototype.findVariant = function (options) {
    for (var i = 0; i < this.variants.length; i++) {
      var v = this.variants[i];
      var ok = true;
      for (var j = 0; j < options.length; j++) { if (v.options[j] !== options[j]) { ok = false; break; } }
      if (ok) return v;
    }
    return null;
  };

  Product.prototype.bind = function () {
    var self = this;
    this.root.querySelectorAll('[data-pw-option]').forEach(function (input) {
      input.addEventListener('change', function () {
        var idx = parseInt(input.getAttribute('data-pw-option'), 10);
        self.options[idx] = input.value;
        if (!self.findVariant(self.options)) {
          var fallback = self.variants.filter(function (v) { return v.options[idx] === input.value; })[0];
          if (fallback) self.options = fallback.options.slice();
        }
        self.update(true);
      });
    });
    this.root.querySelectorAll('[data-pw-purchase-input]').forEach(function (input) {
      input.addEventListener('change', function () {
        if (!input.checked) return;
        self.purchase = input.value;
        self.update(false);
      });
    });
    var planSelect = this.root.querySelector('[data-pw-plan-select]');
    if (planSelect) {
      planSelect.addEventListener('change', function () { self.planId = planSelect.value; self.update(false); });
      planSelect.addEventListener('click', function (e) { e.stopPropagation(); });
    }
    var qty = this.root.querySelector('[data-pw-qty]');
    if (qty) {
      var input = qty.querySelector('input');
      qty.querySelectorAll('button').forEach(function (b) {
        b.addEventListener('click', function () {
          var v = parseInt(input.value, 10) || 1;
          v = b.getAttribute('data-step') === 'up' ? v + 1 : Math.max(1, v - 1);
          input.value = v;
          self.update(false);
        });
      });
    }
  };

  Product.prototype.update = function (fromUser) {
    var self = this;
    var variant = this.findVariant(this.options) || this.variants[0];
    this.variant = variant;
    var hasPlans = variant.plans && Object.keys(variant.plans).length > 0 && this.data.subscriptions;

    /* Suscripción disponible para esta variante */
    var subOpt = this.root.querySelector('[data-pw-purchase="subscription"]');
    var onceOpt = this.root.querySelector('[data-pw-purchase="onetime"]');
    var purchaseBox = this.root.querySelector('[data-pw-purchase-box]');
    if (purchaseBox) purchaseBox.hidden = !hasPlans;
    if (!hasPlans && this.purchase === 'subscription') this.purchase = 'onetime';
    if (hasPlans && this.planId && !variant.plans[this.planId]) this.planId = Object.keys(variant.plans)[0];
    if (this.data.requiresPlan && hasPlans) this.purchase = 'subscription';

    [subOpt, onceOpt].forEach(function (opt) {
      if (!opt) return;
      var selected = opt.getAttribute('data-pw-purchase') === self.purchase;
      opt.classList.toggle('is-selected', selected);
      var radio = opt.querySelector('[data-pw-purchase-input]');
      if (radio) radio.checked = selected;
    });

    /* Opciones normales */
    this.root.querySelectorAll('[data-pw-option]').forEach(function (input) {
      var idx = parseInt(input.getAttribute('data-pw-option'), 10);
      input.checked = self.options[idx] === input.value;
      var test = self.options.slice();
      test[idx] = input.value;
      var v = self.findVariant(test);
      var wrap = input.closest('[data-pw-card]') || input.parentElement;
      if (wrap) {
        wrap.classList.toggle('is-selected', input.checked);
        wrap.classList.toggle('is-unavailable', !v || !v.available);
      }
      /* Precios en cada tarjeta de bundle */
      if (v && wrap && wrap.hasAttribute('data-pw-card')) {
        var p = self.pricing(v, self.purchase);
        var priceEl = wrap.querySelector('[data-price]');
        var compareEl = wrap.querySelector('[data-compare]');
        var unitEl = wrap.querySelector('[data-unit]');
        var saveEl = wrap.querySelector('[data-save]');
        var subEl = wrap.querySelector('[data-sub-onetime]');
        if (priceEl) priceEl.textContent = formatMoney(p.price);
        if (compareEl) { compareEl.textContent = p.strike ? formatMoney(p.strike) : ''; compareEl.hidden = !p.strike; }
        if (unitEl) {
          unitEl.textContent = p.units > 1 ? fill(self.strings.perUnit, { price: formatMoney(p.perUnit) }) : (unitEl.getAttribute('data-single') || '');
          unitEl.hidden = !unitEl.textContent;
        }
        if (saveEl) {
          saveEl.textContent = p.save > 0 ? fill(self.strings.save, { percent: p.save + '%', amount: formatMoney(p.saveAmount) }) : '';
          saveEl.hidden = p.save <= 0;
        }
        if (subEl) {
          var text = self.purchase === 'subscription' ? subEl.getAttribute('data-sub-subscription') : subEl.getAttribute('data-sub-onetime');
          subEl.textContent = text || subEl.getAttribute('data-sub-onetime') || '';
        }
      }
    });

    /* Precios de suscripción / una vez */
    var once = this.pricing(variant, 'onetime');
    var sub = hasPlans ? this.pricing(variant, 'subscription') : null;
    var current = this.purchase === 'subscription' && sub ? sub : once;
    this.setText('[data-once-price]', formatMoney(once.price));
    this.setText('[data-once-compare]', once.strike ? formatMoney(once.strike) : '', !once.strike);
    if (sub) {
      this.setText('[data-sub-price]', formatMoney(sub.price));
      this.setText('[data-sub-compare]', sub.strike ? formatMoney(sub.strike) : '', !sub.strike);
      var plan = (this.data.plans || []).filter(function (pl) { return String(pl.id) === String(self.planId); })[0];
      var pct = plan && plan.pct ? plan.pct : (variant.price ? Math.floor((variant.price - sub.price) * 100 / variant.price) : 0);
      this.root.querySelectorAll('[data-sub-badge]').forEach(function (el) {
        el.textContent = pct > 0 ? fill(self.strings.subBadge, { percent: pct + '%' }) : '';
        el.hidden = pct <= 0;
      });
      this.root.querySelectorAll('[data-plan-name]').forEach(function (el) { el.textContent = plan ? plan.name : ''; });
    }

    /* Precio grande bajo el título */
    this.setText('[data-pw-price]', formatMoney(current.price));
    this.setText('[data-pw-compare]', current.strike ? formatMoney(current.strike) : '', !current.strike);
    this.root.querySelectorAll('[data-pw-save-badge]').forEach(function (el) {
      el.textContent = current.save > 0 ? fill(self.strings.save, { percent: current.save + '%', amount: formatMoney(current.saveAmount) }) : '';
      el.hidden = current.save <= 0;
    });

    /* Campos del formulario */
    if (this.idInput) {
      this.idInput.value = variant.id;
      this.idInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
    if (this.planInput) {
      var useSub = this.purchase === 'subscription' && hasPlans;
      this.planInput.value = useSub ? this.planId : '';
      this.planInput.disabled = !useSub;
    }
    var qtyInput = this.root.querySelector('[data-pw-qty] input');
    var qty = qtyInput ? Math.max(1, parseInt(qtyInput.value, 10) || 1) : 1;
    var formQty = this.form ? this.form.querySelector('input[name="quantity"]') : null;
    if (formQty) formQty.value = qty;

    /* Botón */
    if (this.atc) {
      var label = this.atc.querySelector('[data-pw-atc-label]');
      var priceEl = this.atc.querySelector('[data-pw-atc-price]');
      var sep = this.atc.querySelector('.pw-atc__sep');
      if (variant.available) {
        this.atc.removeAttribute('disabled');
        this.atc.removeAttribute('aria-disabled');
        if (label) label.textContent = this.strings.addToCart || 'Add to cart';
        if (priceEl) { priceEl.textContent = formatMoney(current.price * qty); priceEl.hidden = false; }
        if (sep) sep.hidden = false;
      } else {
        this.atc.setAttribute('disabled', 'disabled');
        if (label) label.textContent = this.strings.soldOut || 'Sold out';
        if (priceEl) priceEl.hidden = true;
        if (sep) sep.hidden = true;
      }
    }

    /* Texto legal de la suscripción */
    var disclosure = this.root.querySelector('[data-pw-disclosure]');
    if (disclosure) {
      var planNow = (this.data.plans || []).filter(function (pl) { return String(pl.id) === String(self.planId); })[0];
      var tpl = this.purchase === 'subscription' && sub ? this.strings.disclosureSub : this.strings.disclosureOnce;
      disclosure.innerHTML = fill(tpl, {
        price: '<strong>' + formatMoney(current.price * qty) + '</strong>',
        plan: planNow ? planNow.name : ''
      });
      disclosure.hidden = !tpl;
    }

    /* Barra fija */
    var stickyMeta = this.root.querySelector('[data-pw-sticky-meta]');
    if (stickyMeta) {
      var bundleName = this.data.bundleIndex >= 0 ? variant.options[this.data.bundleIndex] : (this.variants.length > 1 ? variant.title : '');
      stickyMeta.innerHTML = (bundleName ? bundleName + ' · ' : '') + '<strong>' + formatMoney(current.price * qty) + '</strong>';
    }
    var stickyBtn = this.root.querySelector('[data-pw-sticky-btn]');
    if (stickyBtn) stickyBtn.disabled = !variant.available;

    /* Galería y URL */
    if (fromUser && this.gallery && variant.media) this.gallery.goToMedia(variant.media);
    if (fromUser && this.root.hasAttribute('data-update-url') && window.history && window.history.replaceState) {
      var url = new URL(window.location.href);
      url.searchParams.set('variant', variant.id);
      window.history.replaceState({}, '', url.toString());
    }
  };

  Product.prototype.setText = function (selector, text, hide) {
    this.root.querySelectorAll(selector).forEach(function (el) {
      el.textContent = text;
      if (hide !== undefined) el.hidden = !!hide;
    });
  };

  Product.prototype.initSticky = function () {
    var sticky = this.root.querySelector('[data-pw-sticky]');
    if (!sticky || !this.atc || !('IntersectionObserver' in window)) return;
    var self = this;
    var footer = document.querySelector('.pw-footer, footer');
    var atcVisible = true;
    var footerVisible = false;
    function render() {
      var passed = self.atc.getBoundingClientRect().bottom < 0;
      var show = !atcVisible && passed && !footerVisible;
      sticky.classList.toggle('is-visible', show);
      sticky.setAttribute('aria-hidden', show ? 'false' : 'true');
      sticky.inert = !show;
    }
    new IntersectionObserver(function (entries) {
      atcVisible = entries[0].isIntersecting;
      render();
    }).observe(this.atc);
    if (footer) {
      new IntersectionObserver(function (entries) { footerVisible = entries[0].isIntersecting; render(); }).observe(footer);
    }
    window.addEventListener('scroll', function () { if (!atcVisible) render(); }, { passive: true });
    var btn = sticky.querySelector('[data-pw-sticky-btn]');
    if (btn) {
      btn.addEventListener('click', function () {
        if (!self.form) return;
        if (typeof self.form.requestSubmit === 'function') self.form.requestSubmit();
        else self.form.querySelector('[type="submit"]').click();
      });
    }
    render();
  };

  function initProducts(root) {
    (root || document).querySelectorAll('[data-pw-product]').forEach(function (el) {
      if (el.pwProduct) return;
      el.pwProduct = new Product(el);
    });
  }

  /* ---------- Arranque ---------- */
  function init(root) {
    initReveal(root);
    initCounters(root);
    initAnchors(root);
    initDelivery(root);
    initProducts(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(document); });
  } else {
    init(document);
  }

  document.addEventListener('shopify:section:load', function (e) { init(e.target); });
  document.addEventListener('shopify:block:select', function (e) {
    var card = e.target.closest && e.target.closest('[data-pw-card]');
    if (card) {
      var input = card.querySelector('input');
      if (input && !input.checked) { input.checked = true; input.dispatchEvent(new Event('change', { bubbles: true })); }
    }
  });

  window.Pawlio = { formatMoney: formatMoney, init: init };
})();
