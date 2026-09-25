import json, os

T = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'tema')
B = 'https://d8j0ntlcm91z4.cloudfront.net/user_3DvRigiWzRpDDUnGkPjPoaCth02/'
IMG = {k: B + v + '_min.webp' for k, v in {
    'hero': 'hf_20260925_165428_03c42843-a3cb-4e47-b382-1b38e089da7e',
    'problem': 'hf_20260925_165427_afc09ba9-3e63-4526-9e1a-484f7a4b0e75',
    'lifestyle': 'hf_20260925_165427_081c1502-8569-4dff-97c0-97244cb00787',
    'adventure': 'hf_20260925_165427_0c639f2e-f968-437f-a0e0-bda68c2b9f3d',
    'story': 'hf_20260925_165428_dcf582f5-c6ff-4fb7-b8a9-d031a00fb6ac',
    'portrait': 'hf_20260925_165427_cc7da924-b45f-4e8c-87bc-8b5de73704fd',
    'lab': 'hf_20260925_171435_90158d9d-f056-45c5-b9e1-92b0579de57d',
    'chihuahua': 'hf_20260925_171435_07c262e2-8f87-4a9b-8498-5c5c2a9a5324',
    'pitbull': 'hf_20260925_171434_41d38098-e9fc-4ec5-a06c-42c41a990791',
    'doodle': 'hf_20260925_171436_92286780-86ab-4a22-bcd1-4e2faec64e1a',
}.items()}


def blocks(prefix, items):
    out, order = {}, []
    for i, (typ, settings) in enumerate(items):
        k = f'{prefix}-{i + 1}'
        out[k] = {"type": typ, "settings": settings}
        order.append(k)
    return out, order


def sec(typ, settings, items=None, prefix='b', disabled=False):
    d = {"type": typ, "settings": settings}
    if items is not None:
        d["blocks"], d["block_order"] = blocks(prefix, items)
    if disabled:
        d["disabled"] = True
    return d


def template(sections):
    return {"sections": {k: v for k, v in sections}, "order": [k for k, _ in sections]}


def dump(path, data, header=None):
    full = os.path.join(T, path)
    txt = json.dumps(data, indent=2, ensure_ascii=False)
    with open(full, 'w') as f:
        if header:
            f.write('/*\n * ' + header + '\n */\n')
        f.write(txt + '\n')


# ------------------------------------------------------------------ piezas reutilizables
BUY_BENEFITS = [
    ("benefit", {"icon": "shield-check", "text": "Helps repel fleas & ticks for up to [months] months"}),
    ("benefit", {"icon": "leaf", "text": "Plant-powered formula — no harsh chemicals"}),
    ("benefit", {"icon": "drop", "text": "Waterproof: keeps working through baths, swims & rain"}),
    ("benefit", {"icon": "scissors", "text": "One size fits all breeds — adjustable & cut-to-fit"}),
]
BUNDLES = [
    ("bundle", {"option_value": "1 Collar", "title": "1 Collar", "subtitle": "[months] months of protection",
                "subtitle_subscription": "Keeps 1 dog protected all year", "units": 1, "badge": "", "badge_style": "forest",
                "perks": "", "preselect": False}),
    ("bundle", {"option_value": "2 Collars", "title": "2 Collars", "subtitle": "[months2] months of protection — or 2 dogs",
                "subtitle_subscription": "Keeps 2 dogs protected all year", "units": 2, "badge": "Most popular", "badge_style": "forest",
                "perks": "FREE shipping", "preselect": True}),
    ("bundle", {"option_value": "3 Collars", "title": "3 Collars", "subtitle": "[months3] months of protection — or 3 dogs",
                "subtitle_subscription": "Keeps 3 dogs protected all year", "units": 3, "badge": "Best value", "badge_style": "amber",
                "perks": "FREE shipping\nLowest price per collar", "preselect": False}),
]
TABS = [
    ("tab", {"title": "What it is", "icon": "leaf", "use_description": True, "open": False,
             "content": "<p>A slow-release, plant-powered collar that helps keep fleas and ticks away from your dog for up to [months] months. Waterproof, adjustable and made for everyday wear.</p>"}),
    ("tab", {"title": "How to use", "icon": "sparkle", "use_description": False, "open": False,
             "content": "<ol><li>Open the pouch and gently stretch the collar to activate it.</li><li>Fasten it around your dog's neck — two fingers should slide underneath.</li><li>Trim the extra length and throw the scraps away, out of reach of pets and kids.</li><li>Replace it every [months] months (subscribers get the next one automatically).</li></ol>"}),
    ("tab", {"title": "Safety", "icon": "shield-check", "use_description": False, "open": False,
             "content": "<p><strong>For dogs only — never use on cats.</strong> Not for puppies under 12 weeks. Watch your dog for the first 48 hours; if you notice redness or irritation, remove the collar and contact your vet. If your dog is pregnant, nursing, elderly or on medication, check with your vet first. Keep out of reach of children.</p><p>See the package label for the full ingredient list and directions.</p>"}),
    ("tab", {"title": "Shipping & returns", "icon": "truck", "use_description": False, "open": False,
             "content": "<p>Orders are processed in 1–2 business days and usually arrive in 7–12 business days, with tracking. Free shipping on orders of 2+ collars.</p><p>Every order is covered by our [days]-day Happy Dog Guarantee — email us and we'll make it right.</p>"}),
    ("tab", {"title": "Subscribe & Save", "icon": "refresh", "use_description": False, "open": False,
             "content": "<p>Subscribe &amp; Save is pre-selected so your dog never goes unprotected: you pay the lower price today and a fresh pack ships every [months] months at that same lower price.</p><p>Prefer a single order? Choose <strong>One-time purchase</strong> before adding to cart. Subscribers can skip, pause or cancel anytime from their account — no fees.</p>"}),
]


def buy_box(padding_top=24):
    return sec("pw-product", {
        "eyebrow": "Plant-powered flea & tick protection",
        "tagline": "No monthly drops. No pills. Just clip it on and enjoy months of peace of mind.",
        "title_size": 46, "show_price_row": True, "show_rating": True, "reviews_word": "reviews",
        "media_position": "left", "media_ratio": "square", "media_fit": "cover",
        "media_badge": "Plant-powered", "media_badge_icon": "leaf",
        "bundle_option_name": "Pack", "bundle_heading": "Choose your pack", "bundle_hint": "Most dog parents pick 2",
        "per_unit_label": "[price] / collar", "save_label": "Save [percent]",
        "enable_subscriptions": True, "default_purchase": "subscription",
        "purchase_heading": "How do you want it?", "subscribe_title": "Subscribe & Save", "sub_badge_label": "Save [percent]",
        "subscribe_perks": "A fresh pack ships every [months] months — right when protection runs out\nSkip, pause or cancel anytime — no fees\nLocked-in subscriber price on every delivery",
        "plan_select_label": "Delivery frequency", "onetime_title": "One-time purchase",
        "disclosure_subscription": "[price] today, then [price] every delivery ([plan]). Renews automatically until you cancel — skip or cancel anytime from your account.",
        "disclosure_onetime": "One-time purchase. No subscription, no commitment.",
        "button_label": "Add to cart", "button_price": True, "button_shine": True, "sold_out_label": "Sold out",
        "show_dynamic_checkout": False, "show_quantity": False, "quantity_label": "Quantity",
        "assurance_1_icon": "truck", "assurance_1": "Free shipping on 2+ collars",
        "assurance_2_icon": "shield-check", "assurance_2": "[days]-day money-back guarantee",
        "assurance_3_icon": "lock", "assurance_3": "Secure checkout",
        "show_payment_icons": True, "show_delivery": True, "delivery_min": 7, "delivery_max": 12,
        "delivery_text": "Order today — arrives [start] – [end]",
        "show_guarantee": True, "guarantee_days": "[days]", "guarantee_unit": "DAYS", "guarantee_title": "The Happy Dog Guarantee",
        "guarantee_text": "Try it for [days] days. Not happy? Email us and we'll refund you. No awkward questions.",
        "show_sticky": True, "sticky_label": "Add to cart", "bg": "cream", "padding_top": padding_top, "padding_bottom": 72,
    }, BUY_BENEFITS + BUNDLES + TABS, 'pw')


MARQUEE = sec("pw-marquee", {
    "items": "Plant-powered\nUp to [months] months per collar\nWaterproof\nFits every breed\nNo monthly drops\nNo pills\nNo prescription needed",
    "separator": "paw-solid", "speed": 38, "size": 28, "bg": "forest", "padding_top": 24, "padding_bottom": 24})

PROBLEM = sec("pw-problem", {
    "image_url": IMG['problem'], "image_position": "50% 35%", "image_alt": "Dog scratching behind its ear on a sofa",
    "tag": "Sound familiar?", "layout": "left",
    "eyebrow": "The problem", "heading": "Fleas don't just bite. <em>They move in.</em>",
    "text": "<p>By the time you spot one flea on your dog, many more are hiding in the carpet, the couch and the bed you share. Every scratch means less sleep, more stress and a dog who just doesn't feel like themselves.</p><p>Monthly drops are easy to forget, messy to apply and hard to keep up with — especially when flea season never really ends.</p>",
    "source": "Sources: VCA Animal Hospitals and veterinary parasitology references.",
    "bg": "cream", "text_align": "left", "heading_size": 50, "body_size": 18, "padding_top": 96, "padding_bottom": 88,
}, [("stat", {"prefix": "", "value": "50", "suffix": "", "label": "eggs a single female flea can lay every day", "wide": False}),
    ("stat", {"prefix": "", "value": "95", "suffix": "%", "label": "of a flea problem hides in your home — not on your dog", "wide": False})], 'st')

SOLUTION = sec("pw-image-text", {
    "use_product_image": True, "image_url": "", "image_position": "50% 50%", "image_alt": "Pawlio flea & tick collar",
    "ratio": "square", "layout": "right", "float_title": "Up to [months] months", "float_text": "of protection per collar",
    "eyebrow": "Meet Pawlio", "heading": "One collar. <em>Months of peace of mind.</em>",
    "text": "<p>Pawlio's slow-release collar surrounds your dog with plant-powered protection that helps keep fleas and ticks away — day and night, rain or shine. No greasy drops to remember. No pills to hide in their food.</p>",
    "bullets": "Clips on in 10 seconds\nWorks around the clock, rain or shine\nNo prescription needed",
    "signature": "", "button_label": "Protect my dog", "button_style": "primary", "anchor": "",
    "bg": "white", "text_align": "left", "heading_size": 48, "body_size": 18, "padding_top": 96, "padding_bottom": 96,
})

STEPS = sec("pw-steps", {
    "eyebrow": "How it works", "heading": "Protection in <em>3 easy steps</em>", "kicker": "Step",
    "button_label": "", "bg": "cream", "text_align": "center", "heading_size": 46, "body_size": 18, "padding_top": 88, "padding_bottom": 88,
}, [("step", {"icon": "sparkle", "title": "Unpack & stretch", "text": "Take the collar out of the pouch and give it a gentle stretch to activate the plant-oil blend."}),
    ("step", {"icon": "scissors", "title": "Fit & trim", "text": "Buckle it on so two fingers slide underneath, then snip off the extra length."}),
    ("step", {"icon": "calendar", "title": "Relax for months", "text": "Your dog is covered for up to [months] months. Subscribers get the next collar right on time."})], 'sp')

BENEFITS = sec("pw-benefits", {
    "eyebrow": "Why dog parents switch", "heading": "Everything they need. <em>Nothing they don't.</em>", "columns": "3",
    "bg": "white", "text_align": "center", "heading_size": 46, "body_size": 18, "padding_top": 88, "padding_bottom": 88,
}, [("benefit", {"icon": "leaf", "title": "Plant-powered", "text": "Made with plant-derived essential oils instead of harsh synthetic chemicals."}),
    ("benefit", {"icon": "clock", "title": "Lasts for months", "text": "Up to [months] months per collar — far fewer things to remember than monthly drops."}),
    ("benefit", {"icon": "drop", "title": "Waterproof", "text": "Baths, beach days and rainy walks don't slow it down."}),
    ("benefit", {"icon": "ruler", "title": "Fits every breed", "text": "Adjustable and cut-to-fit, from chihuahuas to great danes."}),
    ("benefit", {"icon": "wind", "title": "Light, fresh scent", "text": "A gentle plant scent — not a chemical cloud."}),
    ("benefit", {"icon": "sparkle", "title": "Mess-free", "text": "No greasy residue on fur, furniture or hands."})], 'bn')

LIFESTYLE = sec("pw-image-text", {
    "use_product_image": False, "image_url": IMG['lifestyle'], "image_position": "50% 35%", "image_alt": "Woman cuddling her dog in bed",
    "ratio": "portrait", "layout": "left", "float_title": "", "float_text": "",
    "eyebrow": "Peace of mind", "heading": "Less scratching. <em>More snuggling.</em>",
    "text": "<p>Fewer 2 a.m. scratch-a-thons. No more checking the sheets before bed. Pawlio works quietly around the clock so your nights can go back to being about cuddles.</p>",
    "bullets": "Cuddle-friendly — no greasy residue\nLight, fresh plant scent\nComfortable for all-day, all-night wear",
    "signature": "", "button_label": "See the packs", "button_style": "ghost", "anchor": "",
    "bg": "sand", "text_align": "left", "heading_size": 48, "body_size": 18, "padding_top": 96, "padding_bottom": 96,
})

COMPARISON = sec("pw-comparison", {
    "eyebrow": "The smarter way", "heading": "Pawlio vs. <em>the usual routine</em>",
    "col_brand": "[brand]", "col_2": "Monthly drops", "col_3": "Sprays",
    "note": "Based on typical over-the-counter products. Always follow each product's label.",
    "bg": "cream", "text_align": "center", "heading_size": 46, "body_size": 18, "padding_top": 88, "padding_bottom": 88,
}, [("row", {"feature": "Protection per application", "brand": "Up to [months] months", "v2": "About 1 month", "v3": "A few days"}),
    ("row", {"feature": "Nothing to remember every month", "brand": "yes", "v2": "no", "v3": "no"}),
    ("row", {"feature": "Plant-powered formula", "brand": "yes", "v2": "no", "v3": "Varies"}),
    ("row", {"feature": "No greasy residue on fur", "brand": "yes", "v2": "no", "v3": "Varies"}),
    ("row", {"feature": "Waterproof", "brand": "yes", "v2": "Varies", "v3": "no"})], 'rw')

ADVENTURE = sec("pw-image-text", {
    "use_product_image": False, "image_url": IMG['adventure'], "image_position": "50% 50%", "image_alt": "Australian shepherd running on a forest trail",
    "ratio": "portrait", "layout": "right", "float_title": "", "float_text": "",
    "eyebrow": "Made for adventure", "heading": "Go explore. <em>Leave the hitchhikers behind.</em>",
    "text": "<p>Trails, tall grass, beach days, backyard zoomies — Pawlio goes wherever your dog goes, helping repel fleas and ticks before they hitch a ride home.</p>",
    "bullets": "Waterproof for swims and rainy walks\nLightweight and flexible\nOne size fits all breeds",
    "signature": "", "button_label": "Protect my dog", "button_style": "primary", "anchor": "",
    "bg": "white", "text_align": "left", "heading_size": 48, "body_size": 18, "padding_top": 96, "padding_bottom": 96,
})

SUBSCRIBE = sec("pw-subscribe", {
    "eyebrow": "Subscribe & Save", "heading": "Set it. Forget it. <em>Save every time.</em>",
    "text": "<p>Flea season never really ends. With Subscribe &amp; Save, a fresh collar arrives right before the old one wears off — so your dog is never left unprotected.</p>",
    "tick_1": "Today: your first pack", "tick_2": "Month [months]: a fresh one arrives", "tick_3": "Protected all year long",
    "button_label": "Start saving", "fine_print": "Subscriptions renew automatically at the discounted price until you cancel. Skip, pause or cancel anytime from your account.",
    "bg": "forest", "text_align": "left", "heading_size": 48, "body_size": 18, "padding_top": 104, "padding_bottom": 104,
}, [("perk", {"icon": "percent", "title": "Save on every delivery", "text": "Subscribers always pay less than one-time buyers."}),
    ("perk", {"icon": "calendar", "title": "Perfectly timed", "text": "A fresh pack every [months] months — right when the old one wears off."}),
    ("perk", {"icon": "refresh", "title": "Skip, pause or cancel anytime", "text": "No fees, no phone calls. Manage it all from your account in seconds."})], 'pk')

GUARANTEE = sec("pw-guarantee", {
    "seal_number": "[days]", "seal_unit": "Days", "ring_text": "Money-back guarantee • Happy dog promise • ",
    "eyebrow": "Zero risk", "heading": "The <em>Happy Dog</em> Guarantee",
    "text": "<p>Try [brand] for a full [days] days. If you and your pup aren't completely happy, email us and we'll refund your order. That's how sure we are.</p>",
    "points": "Full refund within [days] days\nReal humans answer every email\nNo complicated forms",
    "button_label": "Try it risk-free", "bg": "cream", "text_align": "center", "heading_size": 48, "body_size": 18,
    "padding_top": 88, "padding_bottom": 88,
})

GALLERY = sec("pw-gallery", {
    "eyebrow": "#PawlioPack", "heading": "Made for <em>every kind of pup</em>",
    "text": "<p>Big or small, couch potato or trail runner — life's better without the itch.</p>",
    "speed": 60, "button_label": "", "bg": "white", "text_align": "center", "heading_size": 46, "body_size": 18,
    "padding_top": 88, "padding_bottom": 72,
}, [("photo", {"image_url": IMG['doodle'], "caption": "Road trips"}),
    ("photo", {"image_url": IMG['lab'], "caption": "Porch naps"}),
    ("photo", {"image_url": IMG['pitbull'], "caption": "Backyard zoomies"}),
    ("photo", {"image_url": IMG['chihuahua'], "caption": "Couch cuddles"}),
    ("photo", {"image_url": IMG['story'], "caption": "Beach days"}),
    ("photo", {"image_url": IMG['adventure'], "caption": "Trail runs"})], 'ph')

REVIEWS = sec("pw-reviews", {
    "eyebrow": "Real dogs. Real parents.", "heading": "Loved by <em>happy pups</em>", "summary": "", "verified_label": "Verified buyer",
    "bg": "cream", "text_align": "center", "heading_size": 46, "body_size": 18, "padding_top": 88, "padding_bottom": 88,
}, [("review", {"rating": 5, "title": "", "quote": "Paste a real customer review here.", "name": "Customer name", "detail": "", "verified": True}),
    ("review", {"rating": 5, "title": "", "quote": "Paste a real customer review here.", "name": "Customer name", "detail": "", "verified": True}),
    ("review", {"rating": 5, "title": "", "quote": "Paste a real customer review here.", "name": "Customer name", "detail": "", "verified": True})],
    'rv', disabled=True)

FAQ_ITEMS = [
    ("faq", {"question": "How long does one collar last?", "answer": "<p>Each collar provides up to [months] months of protection. For nonstop coverage, replace it every [months] months — or keep Subscribe &amp; Save on and we'll send the next one automatically.</p>"}),
    ("faq", {"question": "Is it safe for my dog?", "answer": "<p>Pawlio is made with plant-derived essential oils and designed for everyday wear on dogs 12 weeks and older. Watch your dog for the first 48 hours and remove the collar if you notice any irritation. If your dog is pregnant, nursing, elderly or on medication, check with your vet first. <strong>For dogs only — never use on cats.</strong></p>"}),
    ("faq", {"question": "Will it fit my dog?", "answer": "<p>Yes. It's one size, adjustable and cut-to-fit for every breed. Fasten it so two fingers slide underneath, then trim the excess.</p>"}),
    ("faq", {"question": "Can my dog get wet with it on?", "answer": "<p>Absolutely. Pawlio is waterproof, so baths, swims and rainy walks are no problem.</p>"}),
    ("faq", {"question": "How does Subscribe & Save work?", "answer": "<p>Subscribe &amp; Save is selected by default so your dog never runs out of protection. You pay the discounted price today, and a fresh pack ships every [months] months at that same lower price. Prefer a single order? Pick <strong>One-time purchase</strong> before adding to cart. Skip, pause or cancel anytime from your account — no fees.</p>"}),
    ("faq", {"question": "How do I cancel my subscription?", "answer": "<p>Log in to your account, open <strong>Subscriptions</strong> and click Cancel — it takes less than a minute. Need a hand? Email us and we'll do it for you.</p>"}),
    ("faq", {"question": "When will my order arrive?", "answer": "<p>Orders ship within 1–2 business days and typically arrive in 7–12 business days. You'll get a tracking link by email as soon as your order ships.</p>"}),
    ("faq", {"question": "What if it doesn't work for us?", "answer": "<p>You're covered by our [days]-day Happy Dog Guarantee. Email us within [days] days of delivery and we'll refund your order.</p>"}),
    ("faq", {"question": "Can I use it with other flea treatments?", "answer": "<p>Please ask your vet before combining Pawlio with any other flea or tick product.</p>"}),
]


def faq(layout="split", bg="white"):
    return sec("pw-faq", {
        "eyebrow": "FAQ", "heading": "Questions? <em>We've got answers.</em>", "layout": layout, "open_first": True,
        "contact_text": "Still wondering? Email us:", "email": "", "bg": bg, "text_align": "left",
        "heading_size": 44, "body_size": 18, "padding_top": 88, "padding_bottom": 88,
    }, FAQ_ITEMS, 'fq')


STORY = sec("pw-image-text", {
    "use_product_image": False, "image_url": IMG['story'], "image_position": "50% 35%", "image_alt": "Happy dog on a beach in Puerto Rico",
    "ratio": "portrait", "layout": "left", "float_title": "", "float_text": "",
    "eyebrow": "Our story", "heading": "Born in Puerto Rico, <em>where flea season never ends.</em>",
    "text": "<p>On our island, heat and humidity mean fleas and ticks never take a day off. We were tired of greasy monthly drops, forgotten doses and harsh chemicals — so we started [brand] with one mission: make flea &amp; tick protection simple, long-lasting and plant-powered.</p><p>Every order is backed by real people who love dogs as much as you do.</p>",
    "bullets": "", "signature": "— The [brand] team, Puerto Rico", "button_label": "", "button_style": "primary", "anchor": "",
    "bg": "sand", "text_align": "left", "heading_size": 46, "body_size": 18, "padding_top": 96, "padding_bottom": 96,
})

CTA = sec("pw-cta", {
    "image_url": IMG['portrait'], "image_position": "50% 35%", "image_alt": "Happy beagle smiling at the camera",
    "eyebrow": "Ready when you are", "heading": "Give your dog <em>months</em> of itch-free days.",
    "text": "Plant-powered. Waterproof. Backed by our [days]-day guarantee.",
    "button_label": "Protect my dog", "chips": "Free shipping on 2+\nCancel anytime",
    "bg": "cream", "text_align": "left", "heading_size": 48, "body_size": 18, "padding_top": 32, "padding_bottom": 96,
})

TRUST = sec("pw-trust-bar", {"bg": "white", "padding_top": 24, "padding_bottom": 24}, [
    ("item", {"icon": "truck", "text": "Free shipping on 2+ collars"}),
    ("item", {"icon": "shield-check", "text": "[days]-day money-back guarantee"}),
    ("item", {"icon": "refresh", "text": "Skip or cancel anytime"}),
    ("item", {"icon": "lock", "text": "Secure checkout"})], 'tr')

HERO = sec("pw-hero", {
    "image_url": IMG['hero'], "image_position": "70% 50%", "mobile_image_url": "", "image_alt": "Happy golden retriever running through a sunny meadow",
    "eyebrow": "Plant-powered flea & tick collar", "heading": "Months of protection. <em>Zero monthly hassle.</em>",
    "text": "One clip-on collar helps keep fleas and ticks away for up to [months] months. No greasy drops, no pills, no reminders.",
    "button_label": "Protect my dog", "secondary_label": "How it works", "chips": "[days]-day money-back guarantee\nFree shipping on 2+ collars\nCancel subscriptions anytime",
    "heading_size": 80, "shade": 55, "height": 88, "height_mobile": 88, "text_align": "left", "padding_top": 0, "padding_bottom": 0,
})

HEADER = "IMPORTANT: The contents of this file are auto-generated. Edit sections from the Shopify theme editor."

# ------------------------------------------------------------------ PRODUCTO (la página de los anuncios)
dump('templates/product.json', template([
    ("main", buy_box(24)),
    ("marquee", MARQUEE),
    ("problem", PROBLEM),
    ("solution", SOLUTION),
    ("steps", STEPS),
    ("benefits", BENEFITS),
    ("lifestyle", LIFESTYLE),
    ("comparison", COMPARISON),
    ("adventure", ADVENTURE),
    ("subscribe", SUBSCRIBE),
    ("guarantee", GUARANTEE),
    ("gallery", GALLERY),
    ("reviews", REVIEWS),
    ("faq", faq()),
    ("story", STORY),
    ("cta", CTA),
]))

# ------------------------------------------------------------------ PORTADA
home_buy = buy_box(88)
dump('templates/index.json', template([
    ("hero", HERO),
    ("trust", TRUST),
    ("problem", PROBLEM),
    ("marquee", MARQUEE),
    ("shop", home_buy),
    ("steps", STEPS),
    ("benefits", BENEFITS),
    ("comparison", COMPARISON),
    ("subscribe", SUBSCRIBE),
    ("story", STORY),
    ("gallery", GALLERY),
    ("guarantee", GUARANTEE),
    ("reviews", REVIEWS),
    ("faq", faq()),
    ("cta", CTA),
]))

# ------------------------------------------------------------------ OUR STORY
about_hero = json.loads(json.dumps(HERO))
about_hero["settings"].update({"image_url": IMG['story'], "image_position": "50% 35%", "eyebrow": "Our story",
                               "heading": "Made on an island where <em>flea season never ends.</em>",
                               "text": "[brand] started in Puerto Rico with one simple idea: protecting your dog should be easy, long-lasting and kind.",
                               "button_label": "Shop the collar", "secondary_label": "", "chips": "", "height": 70, "height_mobile": 76})
about_mission = json.loads(json.dumps(STORY))
about_mission["settings"].update({"image_url": IMG['lifestyle'], "layout": "right", "eyebrow": "Why we exist",
                                  "heading": "Dogs are family. <em>Their protection should be simple.</em>",
                                  "bullets": "Plant-powered protection\nMonths per collar, not weeks\nReal humans behind every order",
                                  "button_label": "Protect my dog"})
dump('templates/page.about.json', template([
    ("hero", about_hero), ("mission", about_mission), ("benefits", BENEFITS), ("guarantee", GUARANTEE), ("cta", CTA)]))

# ------------------------------------------------------------------ FAQ
dump('templates/page.faq.json', template([("faq", faq("stacked", "cream")), ("guarantee", GUARANTEE), ("cta", CTA)]))

# ------------------------------------------------------------------ CARRITO
cart = json.load(open(os.path.join(T, 'templates/cart.json')))
cart["sections"]["pw-trust"] = sec("pw-cart-trust", {"bg": "cream", "padding_top": 16, "padding_bottom": 56}, [
    ("item", {"icon": "shield-check", "text": "[days]-day money-back guarantee"}),
    ("item", {"icon": "lock", "text": "Secure, encrypted checkout"}),
    ("item", {"icon": "refresh", "text": "Cancel subscriptions anytime"})], 'ct')
if "pw-trust" not in cart["order"]:
    cart["order"].append("pw-trust")
dump('templates/cart.json', cart)

# ------------------------------------------------------------------ HEADER / FOOTER
hg = json.load(open(os.path.join(T, 'sections/header-group.json')))
ab = hg["sections"]["announcement-bar"]
ab["settings"].update({"color_scheme": "scheme-3", "show_line_separator": False, "auto_rotate": True, "change_slides_speed": 4})
msgs = ["FREE shipping on 2+ collars", "Try it risk-free: 60-day money-back guarantee", "Subscribe & save — skip or cancel anytime"]
ab["blocks"] = {f"announcement-{i + 1}": {"type": "announcement", "settings": {"text": m, "text_alignment": "center", "color_scheme": "scheme-3", "link": ""}} for i, m in enumerate(msgs)}
ab["block_order"] = list(ab["blocks"].keys())
hg["sections"]["header"]["settings"].update({"color_scheme": "scheme-1", "menu_color_scheme": "scheme-1", "sticky_header_type": "always",
                                             "show_line_separator": False, "enable_country_selector": False, "enable_language_selector": False,
                                             "padding_top": 12, "padding_bottom": 12, "margin_bottom": 0})
json.dump(hg, open(os.path.join(T, 'sections/header-group.json'), 'w'), indent=2, ensure_ascii=False)

fg = json.load(open(os.path.join(T, 'sections/footer-group.json')))
fg["sections"] = {"pw-footer": {"type": "pw-footer", "settings": {
    "logo_width": 150, "tagline": "Plant-powered flea & tick protection for dogs who live life outside. Born in Puerto Rico.",
    "show_social": True, "menu_1_title": "Shop", "menu_2_title": "Help", "show_newsletter": True, "news_title": "Join the pack",
    "news_text": "Flea-season tips, new drops and members-only offers. No spam, ever.", "news_placeholder": "Your email",
    "news_button": "Join", "news_success": "Welcome to the pack! Check your inbox.", "show_payment_icons": True, "padding_top": 72}}}
fg["order"] = ["pw-footer"]
json.dump(fg, open(os.path.join(T, 'sections/footer-group.json'), 'w'), indent=2, ensure_ascii=False)
print('templates ok')
