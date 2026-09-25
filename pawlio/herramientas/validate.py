import json, re, os, glob
T=os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'tema')
def schema_of(name):
    p=os.path.join(T,'sections',name+'.liquid')
    if not os.path.exists(p): return None
    s=open(p).read()
    m=re.search(r'\{%-?\s*schema\s*-?%\}(.*?)\{%-?\s*endschema\s*-?%\}', s, re.S)
    if not m: return {}
    return json.loads(m.group(1))
errs=[]
def check_setting(ctx, st, val):
    t=st['type']
    if t=='select':
        vals=[o['value'] for o in st['options']]
        if val not in vals: errs.append(f"{ctx}: select {st['id']}={val!r} not in {vals}")
    if t=='range':
        if not isinstance(val,(int,float)): errs.append(f"{ctx}: range {st['id']} not number {val!r}")
        elif val<st['min'] or val>st['max'] or (val-st['min'])%st['step']!=0: errs.append(f"{ctx}: range {st['id']}={val} out of {st['min']}-{st['max']} step {st['step']}")
    if t=='checkbox' and not isinstance(val,bool): errs.append(f"{ctx}: checkbox {st['id']} not bool")
    if t in ('richtext',) and val and not re.match(r'^\s*<(p|ul|ol|h[1-6])', val): errs.append(f"{ctx}: richtext {st['id']} must start with block tag")
    if t=='inline_richtext' and re.search(r'<(p|div|br)', val or ''): errs.append(f"{ctx}: inline_richtext {st['id']} has block tag")
# schema self checks
for p in glob.glob(T+'/sections/pw-*.liquid'):
    name=os.path.basename(p)[:-7]
    sc=schema_of(name)
    if len(sc['name'])>25: errs.append(f"{name}: name too long")
    allsets=[('section',s) for s in sc.get('settings',[])]+[(b.get('type'),s) for b in sc.get('blocks',[]) for s in b.get('settings',[])]
    for b in sc.get('blocks',[]):
        if 'name' in b and len(b['name'])>25: errs.append(f"{name}: block name too long {b['name']}")
    ids=set()
    for where,st in allsets:
        if 'id' not in st: continue
        if st['type']=='range':
            steps=(st['max']-st['min'])/st['step']
            if steps>101: errs.append(f"{name}/{where}: range {st['id']} too many steps {steps}")
            if 'unit' in st and len(st['unit'])>3: errs.append(f"{name}: unit too long")
        if 'default' in st: check_setting(f"{name}/{where} default", st, st['default'])
        if st['type'] in ('url','image_picker','product','link_list') and 'default' in st and st['type']!='link_list': errs.append(f"{name}: {st['type']} {st['id']} has default")
    for pr in sc.get('presets',[]):
        if len(pr['name'])>25: errs.append(f"{name}: preset name too long")
# templates
for p in glob.glob(T+'/templates/*.json')+glob.glob(T+'/sections/*group.json'):
    d=json.load(open(p))
    fn=os.path.basename(p)
    secs=d['sections']
    for k in d['order']:
        if k not in secs: errs.append(f"{fn}: order {k} missing")
    for k,sec in secs.items():
        sc=schema_of(sec['type'])
        if sc is None: errs.append(f"{fn}: section type {sec['type']} missing"); continue
        if not sec['type'].startswith('pw-'): continue
        smap={s['id']:s for s in sc.get('settings',[]) if 'id' in s}
        for sk,sv in sec.get('settings',{}).items():
            if sk not in smap: errs.append(f"{fn}/{k}: unknown setting {sk}"); continue
            check_setting(f"{fn}/{k}", smap[sk], sv)
        btypes={b['type']:b for b in sc.get('blocks',[])}
        for bk,b in sec.get('blocks',{}).items():
            if b['type'] not in btypes: errs.append(f"{fn}/{k}: block type {b['type']} missing"); continue
            bmap={s['id']:s for s in btypes[b['type']].get('settings',[]) if 'id' in s}
            for sk,sv in b.get('settings',{}).items():
                if sk not in bmap: errs.append(f"{fn}/{k}/{bk}: unknown block setting {sk}"); continue
                check_setting(f"{fn}/{k}/{bk}", bmap[sk], sv)
        if 'block_order' in sec:
            for bk in sec['block_order']:
                if bk not in sec['blocks']: errs.append(f"{fn}/{k}: block_order {bk} missing")
        mb=sc.get('max_blocks')
        if mb and len(sec.get('blocks',{}))>mb: errs.append(f"{fn}/{k}: too many blocks")
# settings_data vs schema
ss=json.load(open(T+'/config/settings_schema.json'))
smap={s['id']:s for g in ss for s in g.get('settings',[]) if 'id' in s}
cur=json.load(open(T+'/config/settings_data.json'))['current']
for k,v in cur.items():
    if k not in smap: errs.append(f"settings_data: unknown {k}"); continue
    if smap[k]['type'] in ('select','range','checkbox'): check_setting('settings_data',smap[k],v)
for g in ss:
    for st in g.get('settings',[]):
        if 'id' in st and 'default' in st: check_setting('settings_schema default', st, st['default'])
        if st.get('type')=='range' and (st['max']-st['min'])/st['step']>101: errs.append(f"settings_schema range {st['id']} too many steps")
print('\n'.join(errs) or 'ALL GOOD')
