import React, { useState } from "react";

const PERF_GOALS = {
  OUTCOME_SALES: ["Maximize Conversions","Maximize Conversion Value","Maximize Link Clicks","Maximize Landing Page Views","Maximize Reach"],
  OUTCOME_LEADS: ["Maximize Leads","Maximize Conversions","Maximize Link Clicks","Maximize Reach"],
  OUTCOME_TRAFFIC: ["Maximize Link Clicks","Maximize Landing Page Views","Maximize Reach","Maximize Impressions"],
  OUTCOME_AWARENESS: ["Maximize Reach","Maximize Impressions","Maximize ThruPlay","Maximize 2-Second Views"],
  OUTCOME_ENGAGEMENT: ["Maximize Post Engagement","Maximize ThruPlay","Maximize Reach"],
  OUTCOME_APP_PROMOTION: ["Maximize App Installs","Maximize App Events","Maximize Link Clicks"],
};
const CTAS = ["Shop Now","Learn More","Sign Up","Book Now","Contact Us","Get Offer","Watch More","Send Message","Subscribe","Download","Get Quote","Apply Now"];
const BOT_TOKEN = "8722904784:AAHgxCtePp_ixkyBjv3mllJ5XP1NBLWlVhg";
const TG_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

const css = {
  app: { maxWidth: 940, margin: "0 auto", padding: "28px 16px 100px" },
  header: { display:"flex", alignItems:"center", gap:16, marginBottom:28, padding:"18px 24px", background:"#121829", border:"1px solid #263050", borderRadius:14 },
  logo: { width:44, height:44, background:"#4070f5", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:900, color:"#fff", flexShrink:0 },
  steps: { display:"flex", gap:3, marginBottom:24, background:"#121829", borderRadius:12, padding:5, border:"1px solid #263050" },
  stepBtn: (a,d) => ({ flex:1, padding:"10px 4px", border:"none", background:a?"#182035":"transparent", color:d?"#1dd17a":a?"#fff":"#6878a0", cursor:"pointer", borderRadius:8, fontSize:11, fontWeight:600, display:"flex", flexDirection:"column", alignItems:"center", gap:5, fontFamily:"inherit" }),
  stepNum: (a,d) => ({ width:22, height:22, borderRadius:"50%", background:d?"#1dd17a":a?"#4070f5":"#1e2840", color:(a||d)?"#fff":"#6878a0", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700 }),
  card: { background:"#121829", border:"1px solid #263050", borderRadius:14, padding:22, marginBottom:12 },
  cardHd: { fontSize:14, fontWeight:700, marginBottom:18, color:"#fff", display:"flex", alignItems:"center", gap:10 },
  cardIco: { width:30, height:30, borderRadius:8, background:"#4070f5", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0 },
  field: { marginBottom:14 },
  lbl: { display:"block", fontSize:12, color:"#6878a0", marginBottom:5, fontWeight:600 },
  inp: { width:"100%", background:"#182035", border:"1px solid #263050", borderRadius:8, padding:"9px 12px", color:"#dde4f5", fontSize:13 },
  sel: { width:"100%", background:"#182035", border:"1px solid #263050", borderRadius:8, padding:"9px 12px", color:"#dde4f5", fontSize:13, cursor:"pointer" },
  ta: { width:"100%", background:"#182035", border:"1px solid #263050", borderRadius:8, padding:"9px 12px", color:"#dde4f5", fontSize:13, resize:"vertical", minHeight:72, lineHeight:1.5 },
  row2: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 },
  row3: { display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 },
  tbtn: (on) => ({ padding:"7px 14px", border:`1px solid ${on?"#4070f5":"#263050"}`, borderRadius:20, background:on?"#4070f5":"transparent", color:on?"#fff":"#6878a0", cursor:"pointer", fontSize:12, fontWeight:600, fontFamily:"inherit" }),
  swr: { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"9px 13px", background:"#182035", borderRadius:8, border:"1px solid #263050", marginBottom:9 },
  sw: (on) => ({ width:38, height:21, background:on?"#4070f5":"#1e2840", borderRadius:11, cursor:"pointer", position:"relative", border:`1px solid ${on?"#4070f5":"#263050"}`, flexShrink:0 }),
  swK: (on) => ({ position:"absolute", top:2, left:on?19:2, width:15, height:15, background:"#fff", borderRadius:"50%", transition:"left .15s" }),
  info: { background:"rgba(64,112,245,.07)", border:"1px solid rgba(64,112,245,.2)", borderRadius:8, padding:"10px 14px", fontSize:12, color:"#7ab4f5", marginBottom:12, lineHeight:1.6 },
  warn: { background:"rgba(245,166,35,.07)", border:"1px solid rgba(245,166,35,.2)", borderRadius:8, padding:"10px 14px", fontSize:12, color:"#fcd34d", marginBottom:12 },
  ok: { background:"rgba(29,209,122,.07)", border:"1px solid rgba(29,209,122,.2)", borderRadius:8, padding:"10px 14px", fontSize:12, color:"#1dd17a", marginBottom:12, lineHeight:1.6 },
  note: { fontSize:11, color:"#3a4868", marginTop:3, fontStyle:"italic" },
  btn: (v,sm) => ({ padding:sm?"6px 14px":"10px 22px", borderRadius:9, border:"none", cursor:"pointer", fontSize:sm?12:13, fontWeight:700, display:"inline-flex", alignItems:"center", gap:7, fontFamily:"inherit", background:v==="primary"?"#4070f5":v==="green"?"#1dd17a":"#1e2840", color:v==="ghost"?"#dde4f5":"#fff", ...(v==="ghost"?{border:"1px solid #263050"}:{}) }),
  navRow: { display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:22, gap:10 },
  acc: { background:"#121829", border:"1px solid #263050", borderRadius:10, marginBottom:8, overflow:"hidden" },
  accHd: { padding:"13px 16px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", fontWeight:600, fontSize:13, color:"#fff", background:"#182035", userSelect:"none" },
  pill: { fontSize:10, padding:"2px 8px", borderRadius:4, background:"rgba(245,166,35,.12)", color:"#f5a623", fontWeight:700, marginRight:8 },
  dv: { border:"none", borderTop:"1px solid #263050", margin:"16px 0" },
  sec: { fontSize:11, fontWeight:700, color:"#3a4868", textTransform:"uppercase", letterSpacing:".7px", marginBottom:10 },
  counter: { display:"flex", alignItems:"center", gap:12, marginBottom:16 },
  cntBtn: { width:32, height:32, borderRadius:8, border:"1px solid #263050", background:"#1e2840", color:"#fff", cursor:"pointer", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontFamily:"inherit" },
  statsGrid: { display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:14 },
  statC: { background:"#182035", border:"1px solid #263050", borderRadius:9, padding:13, textAlign:"center" },
  treeWrap: { background:"#182035", border:"1px solid #263050", borderRadius:9, padding:15, marginBottom:12 },
  treeAdset: { paddingLeft:16, borderLeft:"2px solid #4070f5", marginBottom:6, paddingTop:4, paddingBottom:4 },
  brief: { background:"#182035", border:"1px solid #263050", borderRadius:8, padding:14, fontSize:11.5, fontFamily:"monospace", whiteSpace:"pre-wrap", wordBreak:"break-word", maxHeight:280, overflowY:"auto", marginBottom:12, lineHeight:1.7, color:"#dde4f5" },
  out: { background:"linear-gradient(135deg,rgba(64,112,245,.05),rgba(155,109,255,.05))", border:"1px solid rgba(155,109,255,.25)", borderRadius:12, padding:18, marginTop:12 },
  tagWrap: { background:"#182035", border:"1px solid #263050", borderRadius:8, padding:"6px 8px", display:"flex", flexWrap:"wrap", gap:5, minHeight:38, cursor:"text" },
  tag: (c) => ({ display:"inline-flex", alignItems:"center", gap:4, padding:"3px 9px", borderRadius:5, fontSize:11, fontWeight:600, background:c==="blue"?"rgba(64,112,245,.15)":"rgba(240,64,96,.1)", color:c==="blue"?"#7ab4f5":"#fca5a5" }),
  pfxWrap: { display:"flex" },
  pfx: { padding:"0 11px", background:"#1e2840", border:"1px solid #263050", borderRadius:"8px 0 0 8px", fontSize:12, color:"#6878a0", display:"flex", alignItems:"center", borderRight:"none" },
  pfxInp: { borderRadius:"0 8px 8px 0" },
};

function Sw({ on, set }) {
  return <div style={css.sw(on)} onClick={() => set(!on)}><div style={css.swK(on)} /></div>;
}

function TagInput({ tags, set, color="blue", ph="Type and press Enter" }) {
  const [v, sv] = useState("");
  const add = (s) => { if(s.trim()) set([...tags, s.trim()]); sv(""); };
  return (
    <div style={css.tagWrap} onClick={() => document.getElementById("ti"+ph)?.focus()}>
      {tags.map((t,i) => <span key={i} style={css.tag(color)}>{t} <span style={{cursor:"pointer",opacity:.6,fontSize:10}} onClick={()=>set(tags.filter((_,j)=>j!==i))}>x</span></span>)}
      <input id={"ti"+ph} value={v} onChange={e=>sv(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"||e.key===","){e.preventDefault();add(v);}if(e.key==="Backspace"&&!v&&tags.length)set(tags.slice(0,-1));}} placeholder={tags.length?"":ph} style={{border:"none",background:"transparent",color:"#dde4f5",fontSize:12,minWidth:80,outline:"none",padding:"2px"}} />
    </div>
  );
}

function Tgl({ opts, val, set }) {
  return <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{opts.map(o=><button key={o.v} style={css.tbtn(val===o.v)} onClick={()=>set(o.v)}>{o.l}</button>)}</div>;
}

function Acc({ title, open, toggle, children }) {
  return (
    <div style={css.acc}>
      <div style={css.accHd} onClick={toggle}><span><span style={css.pill}>PAUSED</span>{title}</span><span style={{fontSize:11,color:"#6878a0"}}>{open?"▲":"▼"}</span></div>
      {open && <div style={{padding:18,borderTop:"1px solid #263050"}}>{children}</div>}
    </div>
  );
}

function F({ lbl, note, children }) {
  return <div style={css.field}>{lbl&&<label style={css.lbl}>{lbl}</label>}{children}{note&&<div style={css.note}>{note}</div>}</div>;
}

const defAs = () => ({ name:"", convLoc:"Website", perfGoal:"Maximize Conversions", pixelType:"account_default", pixelCustom:"", convEvent:"Purchase", cprg:"", attrib:"7-day click + 1-day view", budPeriod:"Daily", budget:"", sd:"", st:"", ed:"", loc:"", ageMin:"18", ageMax:"65", gender:"All", langs:[], detail:[], custom:[], excl:[], aplusAud:false, advPl:true, platforms:[], skipStream:false });
const defAd = () => ({ name:"", pageId:"account_default", igId:"account_default", crType:"create", postId:"", format:"Single Image / Video", sd:"", mediaUrl:"", url:"", durl:"", advCr:true, pt:"", hl:"", desc:"", cta:"Shop Now", tracking:true, utmSrc:"{{site_source_name}}", utmMed:"paid_social", utmCamp:"{{campaign.id}}", utmCont:"{{ad.id}}" });

function Step1({ name, setName, chatId, setChatId, onNext }) {
  return (
    <div>
      <div style={css.card}>
        <div style={css.cardHd}><div style={css.cardIco}>🏢</div>Ad Account</div>
        <div style={css.info}>Enter your account name exactly as it appears in <strong>Meta Ads Manager</strong>. n8n will resolve the Account ID automatically.</div>
        <F lbl="Account Name"><input style={css.inp} value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. My Business Account" autoFocus /></F>
        <F lbl="Telegram Chat ID" note="The chat where approval messages are sent. Message @userinfobot on Telegram to get your Chat ID."><input style={css.inp} value={chatId} onChange={e=>setChatId(e.target.value)} placeholder="-1001234567890" /></F>
      </div>
      <div style={css.navRow}><span/><button style={{...css.btn("primary"),opacity:name.trim()?1:.35,cursor:name.trim()?"pointer":"not-allowed"}} onClick={()=>name.trim()&&onNext()}>Next: Campaign Setup →</button></div>
    </div>
  );
}

function Step2({ c, setC, onNext, onBack }) {
  const s = (k,v) => setC({...c,[k]:v});
  return (
    <div>
      <div style={css.card}>
        <div style={css.cardHd}><div style={css.cardIco}>📢</div>Campaign Settings</div>
        <F lbl="Campaign Name"><input style={css.inp} value={c.name} onChange={e=>s("name",e.target.value)} placeholder="e.g. Summer Sale 2025" /></F>
        <F lbl="Objective"><Tgl opts={[{v:"OUTCOME_SALES",l:"SALES"},{v:"OUTCOME_LEADS",l:"LEADS"},{v:"OUTCOME_TRAFFIC",l:"TRAFFIC"},{v:"OUTCOME_AWARENESS",l:"AWARENESS"},{v:"OUTCOME_ENGAGEMENT",l:"ENGAGEMENT"},{v:"OUTCOME_APP_PROMOTION",l:"APP PROMO"}]} val={c.objective} set={v=>s("objective",v)} /></F>
        <F lbl="Budget Type"><Tgl opts={[{v:"CBO",l:"CBO — Campaign Budget"},{v:"ABO",l:"ABO — Ad Set Budget"}]} val={c.budgetType} set={v=>s("budgetType",v)} /></F>
        {c.budgetType==="CBO" && (
          <div style={css.row3}>
            <F lbl="Currency"><select style={css.sel} value={c.currency} onChange={e=>s("currency",e.target.value)}>{["USD","EGP","AED","SAR","EUR","GBP","KWD"].map(v=><option key={v}>{v}</option>)}</select></F>
            <F lbl="Budget Period"><Tgl opts={[{v:"Daily",l:"Daily"},{v:"Lifetime",l:"Lifetime"}]} val={c.budPeriod} set={v=>s("budPeriod",v)} /></F>
            <F lbl="Budget Amount"><div style={css.pfxWrap}><span style={css.pfx}>{c.currency}</span><input style={{...css.inp,...css.pfxInp}} type="number" value={c.budget} onChange={e=>s("budget",e.target.value)} placeholder="0.00" /></div></F>
          </div>
        )}
        {c.budgetType==="ABO" && <div style={css.info}>Budget will be set per Ad Set in the next step.</div>}
        <hr style={css.dv} />
        <F lbl="Bid Strategy"><select style={css.sel} value={c.bidStrategy} onChange={e=>s("bidStrategy",e.target.value)}><option value="LOWEST_COST_WITHOUT_CAP">Lowest Cost (no cap)</option><option value="LOWEST_COST_WITH_BID_CAP">Bid Cap</option><option value="COST_CAP">Cost Cap</option><option value="MINIMUM_ROAS">Minimum ROAS</option></select></F>
        {["LOWEST_COST_WITH_BID_CAP","COST_CAP"].includes(c.bidStrategy)&&<F lbl="Bid / Cost Amount"><input style={css.inp} type="number" value={c.bidAmount} onChange={e=>s("bidAmount",e.target.value)} placeholder="0.00" /></F>}
        {c.bidStrategy==="MINIMUM_ROAS"&&<F lbl="ROAS Target"><input style={css.inp} type="number" value={c.roasVal} onChange={e=>s("roasVal",e.target.value)} placeholder="2.5" /></F>}
      </div>
      <div style={css.navRow}><button style={css.btn("ghost")} onClick={onBack}>← Back</button><button style={css.btn("primary")} onClick={onNext}>Next: Ad Sets →</button></div>
    </div>
  );
}

function AsForm({ a, setA, i, camp, open, toggle }) {
  const s = (k,v) => setA({...a,[k]:v});
  const goals = PERF_GOALS[camp.objective]||PERF_GOALS.OUTCOME_SALES;
  const curr = camp.currency||"USD";
  return (
    <Acc title={`Ad Set ${i+1}: ${a.name||"Ad Set "+(i+1)}`} open={open} toggle={toggle}>
      <F lbl="Ad Set Name"><input style={css.inp} value={a.name} onChange={e=>s("name",e.target.value)} placeholder={"Ad Set "+(i+1)} /></F>
      <hr style={css.dv}/><div style={css.sec}>Conversion Setup</div>
      <div style={css.row2}>
        <F lbl="Conversion Location"><select style={css.sel} value={a.convLoc} onChange={e=>s("convLoc",e.target.value)}>{["Website","App","Messenger","WhatsApp","Instagram","Calls","Lead Form"].map(v=><option key={v}>{v}</option>)}</select></F>
        <F lbl="Performance Goal"><select style={css.sel} value={a.perfGoal} onChange={e=>s("perfGoal",e.target.value)}>{goals.map(g=><option key={g}>{g}</option>)}</select></F>
      </div>
      {["Website","App","Lead Form"].includes(a.convLoc)&&(
        <div style={css.row2}>
          <F lbl="Dataset / Pixel"><select style={css.sel} value={a.pixelType} onChange={e=>s("pixelType",e.target.value)}><option value="account_default">Account Default Pixel</option><option value="custom">Enter manually...</option></select></F>
          {a.pixelType==="custom"&&<F lbl="Pixel ID"><input style={css.inp} value={a.pixelCustom} onChange={e=>s("pixelCustom",e.target.value)} placeholder="123456789" /></F>}
          <F lbl="Conversion Event"><select style={css.sel} value={a.convEvent} onChange={e=>s("convEvent",e.target.value)}>{["Purchase","Add To Cart","Initiate Checkout","Lead","Complete Registration","View Content","Search","Subscribe","Contact"].map(v=><option key={v}>{v}</option>)}</select></F>
        </div>
      )}
      <div style={css.row2}>
        <F lbl="Attribution Window"><select style={css.sel} value={a.attrib} onChange={e=>s("attrib",e.target.value)}>{["7-day click + 1-day view","1-day click","7-day click","1-day click + 1-day view"].map(v=><option key={v}>{v}</option>)}</select></F>
        <F lbl="Cost Per Result Goal (optional)"><input style={css.inp} type="number" value={a.cprg} onChange={e=>s("cprg",e.target.value)} placeholder="0.00" /></F>
      </div>
      {camp.budgetType==="ABO"&&(<><hr style={css.dv}/><div style={css.sec}>Budget (ABO)</div><div style={css.row2}><F lbl="Budget Period"><Tgl opts={[{v:"Daily",l:"Daily"},{v:"Lifetime",l:"Lifetime"}]} val={a.budPeriod} set={v=>s("budPeriod",v)} /></F><F lbl={"Budget ("+curr+")"}><input style={css.inp} type="number" value={a.budget} onChange={e=>s("budget",e.target.value)} placeholder="0.00" /></F></div></>)}
      <hr style={css.dv}/><div style={css.sec}>Schedule</div>
      <div style={css.row3}><F lbl="Start Date"><input style={css.inp} type="date" value={a.sd} onChange={e=>s("sd",e.target.value)} /></F><F lbl="Start Time"><input style={css.inp} type="time" value={a.st} onChange={e=>s("st",e.target.value)} /></F><F lbl="End Date (optional)"><input style={css.inp} type="date" value={a.ed} onChange={e=>s("ed",e.target.value)} /></F></div>
      <hr style={css.dv}/><div style={css.sec}>Audience</div>
      <F lbl="Locations"><input style={css.inp} value={a.loc} onChange={e=>s("loc",e.target.value)} placeholder="United States, Egypt..." /></F>
      <div style={css.row3}>
        <F lbl="Age Min"><select style={css.sel} value={a.ageMin} onChange={e=>s("ageMin",e.target.value)}>{Array.from({length:53},(_,k)=>k+13).map(n=><option key={n}>{n}</option>)}</select></F>
        <F lbl="Age Max"><select style={css.sel} value={a.ageMax} onChange={e=>s("ageMax",e.target.value)}>{Array.from({length:47},(_,k)=>k+19).map(n=><option key={n}>{n}</option>)}<option>65+</option></select></F>
        <F lbl="Gender"><select style={css.sel} value={a.gender} onChange={e=>s("gender",e.target.value)}>{["All","Male","Female"].map(v=><option key={v}>{v}</option>)}</select></F>
      </div>
      <F lbl="Languages">
        <div style={{display:"flex",gap:6,marginBottom:7}}><button style={css.tbtn(false)} onClick={()=>s("langs",[...new Set([...a.langs,"English"])])}>English</button><button style={css.tbtn(false)} onClick={()=>s("langs",[...new Set([...a.langs,"Arabic"])])}>Arabic</button></div>
        <TagInput tags={a.langs} set={v=>s("langs",v)} ph="Type language + Enter" />
      </F>
      <F lbl="Detailed Targeting" note="n8n will match closest available"><TagInput tags={a.detail} set={v=>s("detail",v)} /></F>
      <F lbl="Custom Audiences" note="n8n will create if not found"><TagInput tags={a.custom} set={v=>s("custom",v)} /></F>
      <F lbl="Exclude Audiences"><TagInput tags={a.excl} set={v=>s("excl",v)} color="red" /></F>
      <div style={css.swr}><span>Advantage+ Audience</span><Sw on={a.aplusAud} set={v=>s("aplusAud",v)} /></div>
      <hr style={css.dv}/><div style={css.sec}>Placements</div>
      <div style={css.swr}><span>Advantage+ Placements</span><Sw on={a.advPl} set={v=>s("advPl",v)} /></div>
      {!a.advPl&&<div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:9}}>{["Facebook","Instagram","Messenger","Audience Network","WhatsApp"].map(p=><label key={p} style={{display:"flex",alignItems:"center",gap:5,cursor:"pointer",padding:"5px 11px",border:`1px solid ${a.platforms.includes(p)?"#4070f5":"#263050"}`,borderRadius:6,fontSize:12,color:a.platforms.includes(p)?"#dde4f5":"#6878a0",background:a.platforms.includes(p)?"rgba(64,112,245,.08)":"#182035"}}><input type="checkbox" checked={a.platforms.includes(p)} onChange={e=>s("platforms",e.target.checked?[...a.platforms,p]:a.platforms.filter(x=>x!==p))} style={{accentColor:"#4070f5"}} />{p}</label>)}</div>}
      <div style={css.swr}><span>Exclude Skippable In-Stream Ads</span><Sw on={a.skipStream} set={v=>s("skipStream",v)} /></div>
    </Acc>
  );
}

function Step3({ adSets, setAdSets, onNext, onBack, camp }) {
  const [openIdx, setOpenIdx] = useState(0);
  const updateCount = (n) => {
    n = Math.max(1,Math.min(8,n));
    if(n>adSets.length) setAdSets([...adSets,...Array.from({length:n-adSets.length},defAs)]);
    else setAdSets(adSets.slice(0,n));
  };
  return (
    <div>
      <div style={css.card}>
        <div style={css.cardHd}><div style={css.cardIco}>🎯</div>Ad Sets</div>
        <div style={css.counter}><button style={css.cntBtn} onClick={()=>updateCount(adSets.length-1)}>−</button><span style={{fontSize:17,fontWeight:700,color:"#fff",minWidth:28,textAlign:"center"}}>{adSets.length}</span><button style={css.cntBtn} onClick={()=>updateCount(adSets.length+1)}>+</button><span style={{color:"#6878a0",fontSize:12}}>1 — 8</span></div>
      </div>
      {adSets.map((a,i)=><AsForm key={i} a={a} setA={v=>{const n=[...adSets];n[i]=v;setAdSets(n);}} i={i} camp={camp} open={openIdx===i} toggle={()=>setOpenIdx(openIdx===i?-1:i)} />)}
      <div style={css.navRow}><button style={css.btn("ghost")} onClick={onBack}>← Back</button><button style={css.btn("primary")} onClick={onNext}>Next: Ads →</button></div>
    </div>
  );
}

function AdForm({ ad, setAd, asi, ai, open, toggle }) {
  const s = (k,v) => setAd({...ad,[k]:v});
  const utmUrl = ad.url?`${ad.url}${ad.url.includes("?")?"&":"?"}utm_source=${ad.utmSrc}&utm_medium=${ad.utmMed}&utm_campaign=${ad.utmCamp}&utm_content=${ad.utmCont}`:"";
  return (
    <Acc title={`Ad Set ${asi+1} / Ad ${ai+1}: ${ad.name||"Ad "+(ai+1)}`} open={open} toggle={toggle}>
      <F lbl="Ad Name"><input style={css.inp} value={ad.name} onChange={e=>s("name",e.target.value)} placeholder={"Ad "+(ai+1)} /></F>
      <hr style={css.dv}/><div style={css.sec}>Identity</div>
      <div style={css.row2}><F lbl="Facebook Page"><select style={css.sel} value={ad.pageId} onChange={e=>s("pageId",e.target.value)}><option value="account_default">Account Default Page</option></select></F><F lbl="Instagram Profile"><select style={css.sel} value={ad.igId} onChange={e=>s("igId",e.target.value)}><option value="account_default">Account Default Instagram</option></select></F></div>
      <hr style={css.dv}/><div style={css.sec}>Creation Type</div>
      <Tgl opts={[{v:"create",l:"Create New Ad"},{v:"existing",l:"Use Existing Post"}]} val={ad.crType} set={v=>s("crType",v)} />
      {ad.crType==="existing"?<F lbl="Post ID / URL"><input style={{...css.inp,marginTop:10}} value={ad.postId} onChange={e=>s("postId",e.target.value)} placeholder="https://..." /></F>:(
        <>
          <hr style={css.dv}/>
          <div style={css.row2}><F lbl="Ad Format"><select style={css.sel} value={ad.format} onChange={e=>s("format",e.target.value)}>{["Single Image / Video","Carousel","Catalog Carousel","Collection","Story / Reel"].map(v=><option key={v}>{v}</option>)}</select></F><F lbl="Schedule Date (optional)"><input style={css.inp} type="date" value={ad.sd} onChange={e=>s("sd",e.target.value)} /></F></div>
          <hr style={css.dv}/><div style={css.sec}>Creative</div>
          <F lbl="Media URL / Google Drive Link" note="Google Drive: set to Anyone with the link. n8n downloads and uploads to Meta automatically."><input style={css.inp} value={ad.mediaUrl} onChange={e=>s("mediaUrl",e.target.value)} placeholder="https://drive.google.com/file/d/... or direct URL" /></F>
          <F lbl="Primary Text"><textarea style={css.ta} value={ad.pt} onChange={e=>s("pt",e.target.value)} placeholder="Up to 125 chars recommended" /><div style={{fontSize:11,color:"#3a4868",marginTop:3}}>{ad.pt.length} / 125</div></F>
          <div style={css.row2}><F lbl="Headline (max 40)"><input style={css.inp} value={ad.hl} onChange={e=>s("hl",e.target.value.slice(0,40))} placeholder="Headline" /><div style={{fontSize:11,color:"#3a4868",marginTop:3}}>{ad.hl.length} / 40</div></F><F lbl="Description (max 30)"><input style={css.inp} value={ad.desc} onChange={e=>s("desc",e.target.value.slice(0,30))} placeholder="Description" /><div style={{fontSize:11,color:"#3a4868",marginTop:3}}>{ad.desc.length} / 30</div></F></div>
          <hr style={css.dv}/><div style={css.sec}>Destination</div>
          <div style={css.row2}><F lbl="Website URL"><input style={css.inp} value={ad.url} onChange={e=>s("url",e.target.value)} placeholder="https://..." /></F><F lbl="Display URL (optional)"><input style={css.inp} value={ad.durl} onChange={e=>s("durl",e.target.value)} placeholder="example.com" /></F></div>
          <F lbl="Call to Action"><select style={css.sel} value={ad.cta} onChange={e=>s("cta",e.target.value)}>{CTAS.map(c=><option key={c}>{c}</option>)}</select></F>
          <div style={css.swr}><span>Advantage+ Creative</span><Sw on={ad.advCr} set={v=>s("advCr",v)} /></div>
          <hr style={css.dv}/><div style={css.sec}>UTM Tracking</div>
          <div style={css.swr}><span>Enable UTM Tracking</span><Sw on={ad.tracking} set={v=>s("tracking",v)} /></div>
          {ad.tracking&&(<><div style={css.row2}><F lbl="UTM Source"><select style={css.sel} value={ad.utmSrc} onChange={e=>s("utmSrc",e.target.value)}><option value="{{site_source_name}}">Dynamic</option><option value="facebook">facebook</option><option value="instagram">instagram</option><option value="messenger">messenger</option></select></F><F lbl="UTM Medium"><select style={css.sel} value={ad.utmMed} onChange={e=>s("utmMed",e.target.value)}><option value="paid_social">paid_social</option><option value="cpc">cpc</option><option value="social">social</option></select></F></div><div style={css.row2}><F lbl="UTM Campaign"><input style={css.inp} value={ad.utmCamp} onChange={e=>s("utmCamp",e.target.value)} /></F><F lbl="UTM Content"><input style={css.inp} value={ad.utmCont} onChange={e=>s("utmCont",e.target.value)} /></F></div>{ad.url&&<div style={{background:"#1e2840",border:"1px solid #263050",borderRadius:6,padding:"8px 11px",fontSize:11,color:"#7ab4f5",wordBreak:"break-all",fontFamily:"monospace",lineHeight:1.5}}>{utmUrl}</div>}</>)}
        </>
      )}
    </Acc>
  );
}

function Step4({ adSets, ads, setAds, onNext, onBack }) {
  const [openKey, setOpenKey] = useState("0-0");
  const updateCount = (n) => {
    n = Math.max(1,Math.min(8,n));
    setAds(adSets.map((_,asi)=>{const cur=ads[asi]||[];if(n>cur.length)return [...cur,...Array.from({length:n-cur.length},defAd)];return cur.slice(0,n);}));
  };
  const count = (ads[0]||[]).length;
  return (
    <div>
      <div style={css.card}><div style={css.cardHd}><div style={css.cardIco}>🖼</div>Ads per Ad Set</div><div style={css.counter}><button style={css.cntBtn} onClick={()=>updateCount(count-1)}>−</button><span style={{fontSize:17,fontWeight:700,color:"#fff",minWidth:28,textAlign:"center"}}>{count}</span><button style={css.cntBtn} onClick={()=>updateCount(count+1)}>+</button><span style={{color:"#6878a0",fontSize:12}}>1 — 8</span></div></div>
      {adSets.map((_,asi)=>(ads[asi]||[]).map((ad,ai)=>{const key=`${asi}-${ai}`;return <AdForm key={key} ad={ad} setAd={v=>{const n=ads.map(a=>[...a]);n[asi][ai]=v;setAds(n);}} asi={asi} ai={ai} open={openKey===key} toggle={()=>setOpenKey(openKey===key?"":key)} />;}))}
      <div style={css.navRow}><button style={css.btn("ghost")} onClick={onBack}>← Back</button><button style={css.btn("primary")} onClick={onNext}>Next: Review & Launch →</button></div>
    </div>
  );
}

function buildPayload(accName, chatId, camp, adSets, ads) {
  return {
    account_name: accName,
    chat_id: chatId,
    campaign: { name:camp.name||"Campaign", objective:camp.objective, budget_type:camp.budgetType, currency:camp.currency, bid_strategy:camp.bidStrategy, daily_budget:camp.budgetType==="CBO"&&camp.budPeriod==="Daily"&&camp.budget?Math.round(parseFloat(camp.budget)*100):null, lifetime_budget:camp.budgetType==="CBO"&&camp.budPeriod==="Lifetime"&&camp.budget?Math.round(parseFloat(camp.budget)*100):null, status:"PAUSED" },
    ad_sets: adSets.map((a,i)=>({ name:a.name||`Ad Set ${i+1}`, optimization_goal:a.perfGoal, billing_event:"IMPRESSIONS", targeting:{ age_min:parseInt(a.ageMin), age_max:parseInt(a.ageMax), ...(a.gender==="Male"?{genders:[1]}:a.gender==="Female"?{genders:[2]}:{}), ...(a.loc?{geo_locations:{countries:a.loc.split(",").map(s=>s.trim()).filter(Boolean)}}:{}), ...(a.langs.length?{locales:a.langs}:{}), ...(a.detail.length?{flexible_spec:[{interests:a.detail.map(d=>({name:d}))}]}:{}) }, pixel_id:a.pixelType==="custom"?a.pixelCustom:"Account Default", conversion_event:a.convEvent, start_time:a.sd||null, end_time:a.ed||null, advantage_plus_audience:a.aplusAud, placement:a.advPl?"Advantage+":"Manual", daily_budget:camp.budgetType==="ABO"&&a.budget?Math.round(parseFloat(a.budget)*100):null, custom_audiences:a.custom, excluded_audiences:a.excl, status:"PAUSED" })),
    ads: adSets.flatMap((_,asi)=>(ads[asi]||[]).map((ad,ai)=>({ name:ad.name||`Ad ${ai+1}`, ad_set_index:asi, page_id:ad.pageId, instagram_id:ad.igId, creation_type:ad.crType, existing_post_id:ad.crType==="existing"?ad.postId:null, format:ad.format, creative:{ image_url:ad.mediaUrl, body:ad.pt, title:ad.hl, description:ad.desc, link_url:ad.tracking&&ad.url?`${ad.url}${ad.url.includes("?")?"&":"?"}utm_source=${ad.utmSrc}&utm_medium=${ad.utmMed}&utm_campaign=${ad.utmCamp}&utm_content=${ad.utmCont}`:ad.url, call_to_action:ad.cta.toUpperCase().replace(/ /g,"_") }, advantage_plus_creative:ad.advCr, status:"PAUSED" }))),
  };
}

function Step5({ accName, chatId, camp, adSets, ads, onBack }) {
  const [status, setStatus] = useState("idle");
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);
  const payload = buildPayload(accName, chatId, camp, adSets, ads);
  const brief = JSON.stringify(payload, null, 2);
  const totalAds = adSets.reduce((n,_,i)=>n+(ads[i]||[]).length,0);

  const copy = () => { navigator.clipboard.writeText(brief); setCopied(true); setTimeout(()=>setCopied(false),2000); };
  const send = async () => {
    setStatus("sending");
    try {
      if(!payload.chat_id) throw new Error("Telegram Chat ID is required. Enter it in Step 1.");
      const slim = {
        account_name: payload.account_name,
        chat_id: payload.chat_id,
        campaign: payload.campaign,
        ad_sets: (payload.ad_sets||[]).map(as => ({
          name: as.name, optimization_goal: as.optimization_goal,
          billing_event: as.billing_event, targeting: as.targeting,
          pixel_id: as.pixel_id, conversion_event: as.conversion_event,
          daily_budget: as.daily_budget, start_time: as.start_time,
          end_time: as.end_time, status: as.status,
        })),
        ads: (payload.ads||[]).map(ad => ({
          name: ad.name, ad_set_index: ad.ad_set_index,
          page_id: ad.page_id, format: ad.format,
          creative: ad.creative, status: ad.status,
        })),
      };
      const msgText = JSON.stringify(slim);
      if (msgText.length > 4000) throw new Error("Payload too large ("+msgText.length+" chars > 4000). Reduce ad sets or ads.");
      const r = await fetch(`${TG_API}/sendMessage`, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ chat_id: payload.chat_id, text: msgText }),
      });
      const rd = await r.json();
      if(!rd.ok) throw new Error("Telegram error: " + (rd.description || r.status));
      setStatus("sent");
    } catch(e) { setErr(e.message); setStatus("error"); }
  };

  return (
    <div>
      <div style={css.card}>
        <div style={css.cardHd}><div style={css.cardIco}>📊</div>Summary</div>
        <div style={css.statsGrid}>{[{l:"Account",v:accName},{l:"Objective",v:camp.objective.replace("OUTCOME_","")},{l:"Budget",v:camp.budgetType==="CBO"?`${camp.budget||"—"} ${camp.currency}`:"Per Ad Set"},{l:"Ad Sets / Ads",v:`${adSets.length} / ${totalAds}`}].map(({l,v})=><div key={l} style={css.statC}><div style={{fontSize:11,color:"#6878a0",marginBottom:4}}>{l}</div><div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{v}</div></div>)}</div>
        <div style={css.treeWrap}>
          <div style={{fontWeight:700,color:"#fff",fontSize:13,marginBottom:10}}>📢 {camp.name||"Campaign"} <span style={{fontSize:11,color:"#6878a0",fontWeight:400}}>{camp.objective.replace("OUTCOME_","")}</span></div>
          {adSets.map((a,i)=><div key={i} style={css.treeAdset}><div style={{fontSize:12,color:"#7ab4f5",fontWeight:600,marginBottom:4}}>🎯 {a.name||`Ad Set ${i+1}`}</div>{(ads[i]||[]).map((ad,j)=><div key={j} style={{fontSize:11,color:"#6878a0",padding:"2px 12px"}}>🖼 {ad.name||`Ad ${j+1}`}</div>)}</div>)}
        </div>
      </div>
      <div style={css.card}>
        <div style={css.cardHd}><div style={css.cardIco}>📋</div>JSON Payload</div>
        <div style={css.brief}>{brief}</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}><button style={css.btn("ghost",true)} onClick={copy}>{copied?"✅ Copied!":"📋 Copy"}</button><button style={css.btn("ghost",true)} onClick={()=>window.open(`https://claude.ai/new?q=${encodeURIComponent(brief)}`,"_blank")}>↗ Open in Claude.ai</button></div>
      </div>
      <div style={css.card}>
        <div style={css.cardHd}><div style={css.cardIco}>🚀</div>Send to n8n → Telegram → Meta</div>
        <div style={css.info}>Clicking Send forwards the JSON to n8n. You will receive a <strong>Telegram message</strong> to approve or decline. If approved, the campaign is created in Meta as <strong>PAUSED</strong>.</div>
        {status==="sent"&&<div style={css.ok}>✅ Sent! Check Telegram to approve and create the campaign in Meta.</div>}
        {status==="error"&&<div style={css.warn}>⚠️ Error: {err}. Make sure the n8n workflow is active.</div>}
        <button style={{...css.btn(status==="sent"?"green":"primary"),width:"100%",justifyContent:"center",padding:14,fontSize:14,opacity:status==="sending"||status==="sent"?.5:1,cursor:status==="sending"||status==="sent"?"not-allowed":"pointer"}} onClick={send} disabled={status==="sending"||status==="sent"}>
          {status==="sending"?"⏳ Sending...":status==="sent"?"✅ Sent!":"📤 Send Campaign for Approval"}
        </button>
      </div>
      <div style={css.navRow}><button style={css.btn("ghost")} onClick={onBack}>← Back</button>{status==="sent"&&<button style={css.btn("ghost")} onClick={()=>setStatus("idle")}>Send Again</button>}</div>
    </div>
  );
}

const STEPS = ["Account","Campaign","Ad Sets","Ads","Launch"];
const defCamp = { name:"", objective:"OUTCOME_SALES", budgetType:"CBO", currency:"USD", budPeriod:"Daily", budget:"", bidStrategy:"LOWEST_COST_WITHOUT_CAP", bidAmount:"", roasVal:"" };

export default function App() {
  const [step, setStep] = useState(1);
  const [accName, setAccName] = useState("");
  const [chatId, setChatId] = useState("");
  const [camp, setCamp] = useState(defCamp);
  const [adSets, setAdSets] = useState([defAs()]);
  const [ads, setAds] = useState([[defAd()]]);
  const go = (n) => { window.scrollTo({top:0,behavior:"smooth"}); setStep(n); };

  return (
    <div style={css.app}>
      <div style={css.header}>
        <div style={css.logo}>f</div>
        <div><div style={{fontSize:18,fontWeight:700,color:"#fff",marginBottom:2}}>Meta Campaign Planner</div><div style={{fontSize:12,color:"#6878a0"}}>Build and launch Meta ad campaigns — sends to n8n for approval</div></div>
      </div>
      <div style={css.steps}>
        {STEPS.map((n,i)=>{const a=step===i+1,d=step>i+1;return(<button key={i} style={css.stepBtn(a,d)} onClick={()=>d&&go(i+1)}><span style={css.stepNum(a,d)}>{d?"✓":i+1}</span>{n}</button>);})}
      </div>
      {step===1&&<Step1 name={accName} setName={setAccName} chatId={chatId} setChatId={setChatId} onNext={()=>go(2)} />}
      {step===2&&<Step2 c={camp} setC={setCamp} onNext={()=>go(3)} onBack={()=>go(1)} />}
      {step===3&&<Step3 adSets={adSets} setAdSets={a=>{setAdSets(a);setAds(a.map((_,i)=>ads[i]||[defAd()]));}} onNext={()=>go(4)} onBack={()=>go(2)} camp={camp} />}
      {step===4&&<Step4 adSets={adSets} ads={ads} setAds={setAds} onNext={()=>go(5)} onBack={()=>go(3)} />}
      {step===5&&<Step5 accName={accName} chatId={chatId} camp={camp} adSets={adSets} ads={ads} onBack={()=>go(4)} />}
    </div>
  );
}