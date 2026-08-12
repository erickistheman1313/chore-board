/* Family Chore Schedule -- household chore tracker.
   Everything lives in localStorage on the device; nothing is uploaded. */
(function () {
"use strict";

/* =============== ICONS =============== */
var I = {
  check:"M4 12.5l5 5L20 6.5", /* stroked, handled separately */
  home:"M3 11.2 12 3l9 8.2V21h-6v-6H9v6H3z",
  list:"M4 5h16v2.6H4zm0 5.7h16v2.6H4zm0 5.7h16v2.6H4z",
  chart:"M3.5 20.5V10h4.2v10.5zm6.4 0V3.5h4.2v17zm6.4 0v-7.4H20.5v7.4z",
  wallet:"M3 6h14.5A3.5 3.5 0 0 1 21 9.5V18a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 1 18V6.5A2.5 2.5 0 0 1 3.5 4H16v2H3zm14.2 6.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z",
  gear:"M12 8.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2zm9 5.1v-3l-2.3-.5-.6-1.5 1.3-2-2.1-2.1-2 1.3-1.5-.6L13.3 3h-3l-.5 2.1-1.5.6-2-1.3-2.1 2.1 1.3 2-.6 1.5L3 10.5v3l2.1.5.6 1.5-1.3 2 2.1 2.1 2-1.3 1.5.6.5 2.1h3l.5-2.1 1.5-.6 2 1.3 2.1-2.1-1.3-2 .6-1.5z",
  bed:"M2 6.5h2.4v6.6h7.4V9.4h5.9a4.3 4.3 0 0 1 4.3 4.3v6.3h-2.4v-3.2H4.4v3.2H2z",
  hamper:"M4.4 7.5h15.2l-1.5 13H5.9zM7 3.5h10v2.6H7z",
  hanger:"M10.9 4.4a3.1 3.1 0 1 1 4.2 2.9v1.2l7.4 5.3v2.4H1.5v-2.4l7.4-5.3V6.6a1.1 1.1 0 1 1 2 0z",
  floor:"M3 19.5 10.4 12l-3-3 2.6-2.6 3 3L20.5 2l1.9 1.9-7.4 8.5 3 3-2.6 2.6-3-3-7.5 7.4z",
  trash:"M5.6 6.6h12.8l-1.1 14.1H6.7zM9 2.8h6l1.1 2.5H7.9z",
  desk:"M2.6 4.6h18.8v2.6H2.6zm2 3.4h4.2v11.4H4.6zm10.6 0h4.2v11.4h-4.2z",
  book:"M3.4 3.4h7.4a2.2 2.2 0 0 1 2.2 2.2v14.6a3.3 3.3 0 0 0-2.2-.9H3.4zm17.2 0h-5.4A2.2 2.2 0 0 0 13 5.6v14.6a3.3 3.3 0 0 1 2.2-.9h5.4z",
  pen:"M2.6 21.4l1.1-4.4L15.9 4.8l3.3 3.3L7 20.3zM17.4 3.3l1.5-1.5 3.3 3.3-1.5 1.5z",
  star:"M12 2.2l3 6.5 7.1.9-5.3 4.8 1.4 7L12 17.9 5.8 21.4l1.4-7L1.9 9.6l7.1-.9z",
  robot:"M8.6 1.8h2.2v2.2h2.4V1.8h2.2v2.2a4.4 4.4 0 0 1 4.4 4.4v8.8a3.3 3.3 0 0 1-3.3 3.3H7.5a3.3 3.3 0 0 1-3.3-3.3V8.4A4.4 4.4 0 0 1 8.6 4zM8.8 9.6a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4zm6.4 0a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4z",
  tooth:"M12 2.4c3.2 0 5.3 1.1 6.4 2.2s1.1 4.3 0 8.6-1.1 8.6-3.2 8.6-2.1-5.4-3.2-5.4-1.1 5.4-3.2 5.4-2.1-4.3-3.2-8.6-1.1-7.5 0-8.6S8.8 2.4 12 2.4z",
  shower:"M4.6 2.2h5.3a5.6 5.6 0 0 1 5.6 5.6H4.6zm0 0v19.6H2.2V2.2zM18 10.6a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6zm-3.4 3.8a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6zm6.8 0a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6zM18 18.2a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6z",
  dish:"M2.8 10.9h18.4a9.2 9.2 0 0 1-18.4 0zm2.4 8.6h13.6v2.2H5.2z",
  counter:"M2.6 12.4h18.8v3.2H2.6zm2.8-8.2h6.4v6.4H5.4z",
  stove:"M3.6 4.2h16.8v16.4H3.6zm3.2 3.4a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4zm10.4 0a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4z",
  microwave:"M1.8 4.6h20.4v14.8H1.8zm2.4 2.4v10h11.2V7zm14 2.2a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z",
  table:"M2.6 7.6h18.8v2.6H2.6zm2.4 2.8h2.4v9.4H5zm12 0h2.4v9.4H17z",
  sofa:"M2.6 11.4a2.4 2.4 0 0 1 4.8 0v3h9.2v-3a2.4 2.4 0 0 1 4.8 0v7.8H2.6zm3.6-4.8h11.6v3.6H6.2z",
  duster:"M12 1.8c2.2 0 3.4 2.2 3.4 4.4S14.2 9.8 12 9.8 8.6 8.4 8.6 6.2 9.8 1.8 12 1.8zM10.8 10.6h2.4v11.6h-2.4z",
  vacuum:"M3.4 20.6a6.6 6.6 0 0 1 6.6-6.6h1.8V5.2h5.4V14a6.6 6.6 0 0 1 3.4 6.6z",
  toilet:"M4.6 3.4h3.2v7.4h12.6a7.4 7.4 0 0 1-6.4 7.4v2.4H9.4v-2.4a7.4 7.4 0 0 1-4.8-7.4z",
  mirror:"M7 1.8h10a2.2 2.2 0 0 1 2.2 2.2v13.4a2.2 2.2 0 0 1-2.2 2.2H7a2.2 2.2 0 0 1-2.2-2.2V4A2.2 2.2 0 0 1 7 1.8zm-2.2 19h14.4v2.2H4.8z",
  sink:"M3.4 10.8h17.2v2.4a5.4 5.4 0 0 1-5.4 5.4H8.8a5.4 5.4 0 0 1-5.4-5.4zM10.8 1.8h2.4v8.2h-2.4z",
  dog:"M3.6 8.2 5.8 3.6l3.2 3.2h6l3.2-3.2 2.2 4.6v6.2a5.4 5.4 0 0 1-5.4 5.4H9a5.4 5.4 0 0 1-5.4-5.4z",
  bone:"M4.6 9.2a2.7 2.7 0 1 1 3.2-3.2h8.4a2.7 2.7 0 1 1 3.2 3.2 2.7 2.7 0 1 1-3.2 3.2H7.8a2.7 2.7 0 1 1-3.2-3.2z",
  mop:"M10.8 1.8h2.4v7.4h-2.4zM6.6 9.8h10.8l-2.2 12.4H8.8z",
  laundry:"M3.6 7.4h16.8l-2.2 13.2H5.8zM6.2 3.4h11.6v3.2H6.2z",
  washer:"M3.6 2.6h16.8v18.8H3.6zm8.4 5.2a5.2 5.2 0 1 0 0 10.4 5.2 5.2 0 0 0 0-10.4z",
  stairs:"M2.6 21.4v-4.6h5.2v-4.6H13V7.6h5.2V3h3.2v18.4z",
  toys:"M6 3.4a3.2 3.2 0 1 1 0 6.4 3.2 3.2 0 0 1 0-6.4zm12 0a3.2 3.2 0 1 1 0 6.4 3.2 3.2 0 0 1 0-6.4zM3.4 13.4h17.2v7.2H3.4z",
  bowl:"M2.6 10.6h18.8a9.4 9.4 0 0 1-18.8 0zM7 5.4h10v3.4H7z",
  water:"M12 1.8s6.4 7.4 6.4 11.6a6.4 6.4 0 0 1-12.8 0C5.6 9.2 12 1.8 12 1.8z",
  camera:"M8.8 3.4h6.4l1.1 2.2h4.3v15H3.4v-15h4.3zM12 8a5 5 0 1 0 0 10 5 5 0 0 0 0-10z",
  gift:"M2.6 8.6h18.8v3.4H2.6zm1.2 4.6h16.4v8.2H3.8zM8.4 3a2.2 2.2 0 0 1 3.6 0 2.2 2.2 0 0 1 3.6 0v2.4H8.4z",
  person:"M12 2.6a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8zm-8.4 18.8a8.4 8.4 0 0 1 16.8 0z",
  plus:"M10.7 3.6h2.6v7.1h7.1v2.6h-7.1v7.1h-2.6v-7.1H3.6v-2.6h7.1z",
  mail:"M2.6 5h18.8v14H2.6zm1.8 2 7.6 5.4L19.6 7z",
  flame:"M12 1.8c3.4 4 5.4 6.2 5.4 9.4a5.4 5.4 0 0 1-10.8 0c0-1.4.5-2.6 1.4-3.8.3 1.4 1 2.2 2 2.4-.6-3 .4-6 2-8z"
};
function svg(name, cls){
  var d = I[name] || I.star;
  return '<svg viewBox="0 0 24 24" aria-hidden="true"' + (cls ? ' class="' + cls + '"' : '') + '><path d="' + d + '"/></svg>';
}
var TICK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5"/></svg>';
var CROSS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

/* =============== AVATARS =============== */
var SKIN = "#f6cda6";
function avatar(kind){
  var ink = "#14122a";
  if(kind === "isabel") return '<svg viewBox="0 0 64 64">'+
    '<path d="M9 44c0-24 10-34 23-34s23 10 23 34v18H43c0-8-4-12-11-12s-11 4-11 12H9z" fill="#2b1d3f"/>'+
    '<circle cx="32" cy="34" r="14" fill="'+SKIN+'"/>'+
    '<path d="M18 30c1-13 7-18 14-18s13 5 14 18c-3-8-8-10-14-9s-11 4-14 9z" fill="#2b1d3f"/>'+
    '<circle cx="26" cy="35" r="2.4" fill="'+ink+'"/><circle cx="38" cy="35" r="2.4" fill="'+ink+'"/>'+
    '<path d="M28 42c2 2 6 2 8 0" stroke="'+ink+'" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';
  if(kind === "nuno") return '<svg viewBox="0 0 64 64">'+
    '<path d="M32 4l6 11 7-8-1 12 11-5-8 10 12 2-11 6H15L4 26l12-2-8-10 11 5-1-12 7 8z" fill="#1d1630"/>'+
    '<circle cx="32" cy="36" r="14" fill="'+SKIN+'"/>'+
    '<path d="M18 32c2-10 7-14 14-14s12 4 14 14c-4-6-8-8-14-8s-10 2-14 8z" fill="#1d1630"/>'+
    '<circle cx="26" cy="37" r="2.4" fill="'+ink+'"/><circle cx="38" cy="37" r="2.4" fill="'+ink+'"/>'+
    '<path d="M27 44c3 2 7 2 10 0" stroke="'+ink+'" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';
  return '<svg viewBox="0 0 64 64">'+
    '<path d="M32 10l5 9 6-6-1 10 9-4-6 8 9 2-9 5H19l-9-5 9-2-6-8 9 4-1-10 6 6z" fill="#17102a"/>'+
    '<circle cx="32" cy="38" r="15" fill="'+SKIN+'"/>'+
    '<path d="M17 35c2-9 7-13 15-13s13 4 15 13c-4-6-9-8-15-8s-11 2-15 8z" fill="#17102a"/>'+
    '<circle cx="25" cy="39" r="2.7" fill="'+ink+'"/><circle cx="39" cy="39" r="2.7" fill="'+ink+'"/>'+
    '<path d="M26 45c4 4 8 4 12 0" stroke="'+ink+'" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>';
}

/* =============== PALETTE =============== */
var SWATCH = ["#ffb3ba","#ffd28a","#ffe98a","#b9e6a0","#a5dceb","#a9c4f5","#d6b8f2","#f2b8dd","#e3d3b6","#cfd4e0"];
var DOW = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var DOWFULL = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

/* =============== SEED (the family's poster) =============== */
var ALL = [0,1,2,3,4,5,6];
/* Weekly rotation off the poster: Nuno B/A/B/A, Isabel A/B/A/B, Friday reset. */
var A  = {nuno:[2,4], isabel:[1,3]};      /* Chore A -- downstairs */
var B  = {nuno:[1,3], isabel:[2,4]};      /* Chore B -- upstairs   */
var AM = {nuno:[4],   isabel:[1]};        /* A's sweep & mop lands on Mon/Thu only */
var BM = {nuno:[1],   isabel:[4]};
var FR = {nuno:[5],   isabel:[5]};

function seedChores(){
  var out = [], n = 0;
  function add(title, icon, color, cat, value, who, notes){
    var assign = [];
    for(var k in who) if(who.hasOwnProperty(k)) assign.push({m:k, days:who[k].slice()});
    out.push({id:"c"+(++n), title:title, icon:icon, color:color, cat:cat, value:value,
              assign:assign, notes:notes||"", subs:[], proof:false});
  }
  var both = {nuno:ALL, isabel:ALL};

  add("Make bed","bed",SWATCH[0],"Bedroom",1,both);
  add("Put dirty clothes in hamper","hamper",SWATCH[0],"Bedroom",1,both);
  add("Put clean clothes away","hanger",SWATCH[0],"Bedroom",1,both,"Fold or hang");
  add("Pick up anything on the floor","floor",SWATCH[0],"Bedroom",1,both);
  add("Throw away trash","trash",SWATCH[0],"Bedroom",1,both);
  add("Keep desk / dresser neat","desk",SWATCH[0],"Bedroom",1,both);

  add("Read for 15 minutes","book",SWATCH[3],"Personal Development",1,both);
  add("Write in gratitude journal","pen",SWATCH[3],"Personal Development",1,both);
  add("List 3 things I am grateful for","star",SWATCH[3],"Personal Development",1,both);
  add("Study AI for 1 hour","robot",SWATCH[3],"Personal Development",2,both,"Summer goal: 6 hours per day minimum");

  add("Brush teeth","tooth",SWATCH[4],"Hygiene",1,both);
  add("Take a shower","shower",SWATCH[4],"Hygiene",1,both);

  add("Wash all dishes","dish",SWATCH[1],"Kitchen",2,A);
  add("Wipe down countertops","counter",SWATCH[1],"Kitchen",2,A);
  add("Wipe down stovetop","stove",SWATCH[1],"Kitchen",2,A);
  add("Clean microwave","microwave",SWATCH[1],"Kitchen",2,A,"Inside and out");
  add("Empty trash","trash",SWATCH[1],"Kitchen",2,A);
  add("Wipe down dining room table","table",SWATCH[7],"Dining Room",2,A);
  add("Pick up items that don't belong","toys",SWATCH[6],"Living Room",2,A);
  add("Dust surfaces","duster",SWATCH[6],"Living Room",2,A);
  add("Wipe down tables","table",SWATCH[6],"Living Room",2,A);
  add("Vacuum floor","vacuum",SWATCH[6],"Living Room",2,A);
  add("Scrub toilet (downstairs)","toilet",SWATCH[3],"Bathroom",2,A,"Inside and out");
  add("Clean mirrors (downstairs)","mirror",SWATCH[3],"Bathroom",2,A);
  add("Wipe sink (downstairs)","sink",SWATCH[3],"Bathroom",2,A);

  add("Scrub toilet (upstairs)","toilet",SWATCH[4],"Bathroom",2,B,"Inside and out");
  add("Scrub tub / shower","shower",SWATCH[4],"Bathroom",2,B);
  add("Wipe counters (upstairs)","counter",SWATCH[4],"Bathroom",2,B);
  add("Clean mirrors (upstairs)","mirror",SWATCH[4],"Bathroom",2,B);
  add("Wipe sink (upstairs)","sink",SWATCH[4],"Bathroom",2,B);
  add("Collect dirty laundry","laundry",SWATCH[7],"Laundry",2,B);
  add("Sort laundry","laundry",SWATCH[7],"Laundry",2,B);
  add("Wash laundry","washer",SWATCH[7],"Laundry",2,B);
  add("Transfer laundry to dryer","washer",SWATCH[7],"Laundry",2,B);
  add("Fold clothes","hanger",SWATCH[7],"Laundry",2,B);
  add("Put clothes away","hanger",SWATCH[7],"Laundry",2,B);
  add("Pick up items left on stairs","stairs",SWATCH[5],"Stairs",2,B);

  add("Walk dogs","dog",SWATCH[8],"Dogs",2,{nuno:[1,2,3,4], isabel:[1,2,3,4]});
  add("Pick up after dogs","bone",SWATCH[8],"Dogs",2,{nuno:[1,2,3,4], isabel:[1,2,3,4]});

  add("Sweep & mop kitchen","mop",SWATCH[2],"Sweep & Mop",3,AM);
  add("Sweep & mop living room","mop",SWATCH[2],"Sweep & Mop",3,AM);
  add("Sweep & mop dining room","mop",SWATCH[2],"Sweep & Mop",3,AM);
  add("Sweep & mop bathroom (down)","mop",SWATCH[2],"Sweep & Mop",3,AM);
  add("Sweep & mop bathroom (up)","mop",SWATCH[2],"Sweep & Mop",3,BM);
  add("Sweep & mop hallway","mop",SWATCH[2],"Sweep & Mop",3,BM);
  add("Sweep & mop stairs","mop",SWATCH[2],"Sweep & Mop",3,BM);

  add("Pick up and organize common areas","sofa",SWATCH[1],"Family Reset Day",3,FR);
  add("Take out all trash","trash",SWATCH[1],"Family Reset Day",3,FR);
  add("Check bedrooms for clutter","bed",SWATCH[1],"Family Reset Day",3,FR);
  add("Finish any missed chores","list",SWATCH[1],"Family Reset Day",3,FR);
  add("Prepare the house for the weekend","home",SWATCH[1],"Family Reset Day",3,FR);

  var z = {zion:ALL};
  add("Feed the dogs","bowl",SWATCH[2],"Zion's Jobs",1,z);
  add("Refill dog water bowls","water",SWATCH[2],"Zion's Jobs",1,z);
  add("Fix couch cushions and blankets","sofa",SWATCH[2],"Zion's Jobs",1,z);
  add("Pick up toys and put them away","toys",SWATCH[2],"Zion's Jobs",1,z);
  return out;
}

var SEED_MEMBERS = [
  {id:"isabel", name:"Isabel", age:15, color:"#f2b8dd", face:"isabel"},
  {id:"nuno",   name:"Nuno",   age:13, color:"#a9c4f5", face:"nuno"},
  {id:"zion",   name:"Zion",   age:5,  color:"#ffd28a", face:"zion"}
];

/* =============== STORAGE =============== */
var store = (function(){
  try{ localStorage.setItem("__t","1"); localStorage.removeItem("__t"); return localStorage; }
  catch(e){ var m={}; return {getItem:function(k){return k in m?m[k]:null;},
                              setItem:function(k,v){m[k]=String(v);},
                              removeItem:function(k){delete m[k];}}; }
})();
function read(key, fallback){
  try{ var v = JSON.parse(store.getItem(key) || "null"); return v === null ? fallback : v; }
  catch(e){ return fallback; }
}
function write(key, val){
  try{ store.setItem(key, JSON.stringify(val)); }
  catch(e){ toast("Storage is full -- try clearing old photos"); }
}

var S = {
  members: read("cs2.members", null) || SEED_MEMBERS,
  chores:  read("cs2.chores",  null) || seedChores(),
  done:    read("cs2.done",    {}),
  bal:     read("cs2.bal",     {}),
  rewards: read("cs2.rewards", [{id:"r1", title:"Pizza night", price:40, who:"joint"}]),
  photos:  read("cs2.photos",  {}),
  streak:  read("cs2.streak",  {}),
  cfg:     read("cs2.cfg",     {mode:"allowance", cur:"$", dad:"", role:"admin", me:null, pin:""})
};
function save(what){
  if(!what || what==="members") write("cs2.members", S.members);
  if(!what || what==="chores")  write("cs2.chores",  S.chores);
  if(!what || what==="done")    write("cs2.done",    S.done);
  if(!what || what==="bal")     write("cs2.bal",     S.bal);
  if(!what || what==="rewards") write("cs2.rewards", S.rewards);
  if(!what || what==="photos")  write("cs2.photos",  S.photos);
  if(!what || what==="streak")  write("cs2.streak",  S.streak);
  if(!what || what==="cfg")     write("cs2.cfg",     S.cfg);
}

/* =============== DATES & MONEY =============== */
var today = new Date();
function dkey(d){ return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function shift(d, n){ var x = new Date(d.getTime()); x.setDate(x.getDate()+n); return x; }
function startOfWeek(d){ return shift(d, -d.getDay()); }
function sameDay(a,b){ return dkey(a) === dkey(b); }
function money(v){
  if(S.cfg.mode === "none") return "";
  if(S.cfg.mode === "points") return Math.round(v*10)/10 + (Math.abs(v)===1 ? " pt" : " pts");
  return S.cfg.cur + Number(v).toFixed(2);
}
function memberById(id){ for(var i=0;i<S.members.length;i++) if(S.members[i].id===id) return S.members[i]; return null; }
function me(){ return memberById(S.cfg.me) || S.members[0]; }
function isAdmin(){ return S.cfg.role === "admin"; }

/* Which days is this chore due for this member? */
function daysFor(chore, mid){
  for(var i=0;i<chore.assign.length;i++) if(chore.assign[i].m === mid) return chore.assign[i].days;
  return null;
}
function dueOn(chore, mid, dow){
  var d = daysFor(chore, mid);
  return !!d && d.indexOf(dow) !== -1;
}
function choresFor(mid, dow){
  return S.chores.filter(function(c){ return dueOn(c, mid, dow); });
}
function doneKey(mid, cid){ return mid + "|" + cid; }
function isDone(dateStr, mid, cid){
  var day = S.done[dateStr];
  return !!(day && day[doneKey(mid, cid)]);
}

/* =============== COMPLETION + BALANCE =============== */
function setDone(dateStr, mid, chore, on, photo){
  if(!S.done[dateStr]) S.done[dateStr] = {};
  var k = doneKey(mid, chore.id);
  var was = !!S.done[dateStr][k];
  if(on === was) return;
  if(on){
    S.done[dateStr][k] = {at: Date.now()};
    if(photo){ S.photos[dateStr+"|"+k] = photo; save("photos"); }
    credit(mid, chore.value, chore.title);
  } else {
    delete S.done[dateStr][k];
    if(S.photos[dateStr+"|"+k]){ delete S.photos[dateStr+"|"+k]; save("photos"); }
    credit(mid, -chore.value, "Undid: " + chore.title);
  }
  save("done");
}
function credit(mid, delta, label){
  if(S.cfg.mode === "none" || !delta) return;
  var b = S.bal[mid] || (S.bal[mid] = {v:0, hist:[]});
  b.v = Math.round((b.v + delta) * 100) / 100;
  b.hist.unshift({at: Date.now(), label: label, d: delta, after: b.v});
  if(b.hist.length > 400) b.hist.length = 400;
  save("bal");
}
function balanceOf(mid){ return (S.bal[mid] && S.bal[mid].v) || 0; }

/* =============== STREAKS =============== */
function progressFor(mid, date){
  var dow = date.getDay(), ds = dkey(date);
  var list = choresFor(mid, dow);
  var done = 0;
  for(var i=0;i<list.length;i++) if(isDone(ds, mid, list[i].id)) done++;
  return {done:done, total:list.length, pct: list.length ? Math.round(done/list.length*100) : 0};
}
function bumpStreak(mid){
  var s = S.streak[mid] || {n:0, last:""};
  var tk = dkey(today);
  if(s.last === tk) return;
  s.n = (s.last === dkey(shift(today,-1))) ? s.n + 1 : 1;
  s.last = tk;
  S.streak[mid] = s;
  save("streak");
}
function streakOf(mid){
  var s = S.streak[mid];
  if(!s) return 0;
  return (s.last === dkey(today) || s.last === dkey(shift(today,-1))) ? s.n : 0;
}

/* =============== DOM HELPERS =============== */
function el(id){ return document.getElementById(id); }
function h(tag, cls, html){
  var n = document.createElement(tag);
  if(cls) n.className = cls;
  if(html != null) n.innerHTML = html;
  return n;
}
function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]; }); }
var toastT;
function toast(msg){
  var t = el("toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toastT); toastT = setTimeout(function(){ t.classList.remove("show"); }, 2600);
}

/* =============== SCREEN: HOUSEHOLD =============== */
function renderHome(){
  var root = el("s-home"); root.innerHTML = "";
  var m = me(), p = progressFor(m.id, today), st = streakOf(m.id);

  var card = h("div","me");
  card.innerHTML =
    '<div class="top">' +
      '<span class="av lg" style="--ac:'+m.color+'">'+avatar(m.face)+'</span>' +
      '<div><div class="nm">'+esc(m.name)+'</div><div class="as">'+esc(assignName(m.id, today.getDay()))+'</div></div>' +
      (S.cfg.mode === "none" ? "" :
        '<div class="big"><b class="num">'+money(balanceOf(m.id))+'</b><small>Balance</small></div>') +
    '</div>' +
    '<div class="bar'+(p.pct===100?" good":"")+'"><i style="width:'+p.pct+'%"></i></div>' +
    '<div class="stats">' +
      '<div class="stat"><b class="num">'+(p.total-p.done)+'</b><small>Left today</small></div>' +
      '<div class="stat"><b class="num">'+p.pct+'%</b><small>Done</small></div>' +
      '<div class="stat"><b class="num">'+st+'</b><small>Day streak</small></div>' +
    '</div>';
  root.appendChild(card);

  var sec = h("div","sec");
  sec.appendChild(h("div","cap","Household"));
  var g = h("div","group");
  S.members.forEach(function(x){
    var xp = progressFor(x.id, today);
    var r = h("button","row tap");
    r.innerHTML =
      '<span class="av" style="--ac:'+x.color+'">'+avatar(x.face)+'</span>' +
      '<span class="grow"><span class="t">'+esc(x.name)+'</span>' +
      '<span class="s">'+(xp.total ? xp.done+" of "+xp.total+" done" : "Nothing due today")+
        (streakOf(x.id) > 1 ? ' &middot; '+streakOf(x.id)+' day streak' : '')+'</span></span>' +
      '<span class="rt">'+(S.cfg.mode==="none" ? xp.pct+"%" : '<span class="num">'+money(balanceOf(x.id))+'</span>')+
        '<small>'+(xp.total-xp.done)+' due today</small></span>';
    r.addEventListener("click", function(){
      if(!isAdmin() && x.id !== S.cfg.me){ toast("Ask a parent to switch profiles"); return; }
      S.cfg.me = x.id; save("cfg"); renderAll(); toast("Switched to " + x.name);
    });
    g.appendChild(r);
  });
  sec.appendChild(g);
  root.appendChild(sec);

  if(S.cfg.mode !== "none" && S.rewards.length){
    var rs = h("div","sec");
    rs.appendChild(h("div","cap","Working toward"));
    var rg = h("div","group");
    S.rewards.slice(0,2).forEach(function(rw){ rg.appendChild(rewardCard(rw)); });
    rs.appendChild(rg);
    root.appendChild(rs);
  }

  var em = h("div","sec");
  var btn = h("button","btn", svg("mail") + "<span>Tell Dad I'm Done</span>");
  btn.disabled = !(p.total > 0 && p.done === p.total);
  if(btn.disabled) btn.innerHTML = "<span>" + (p.total ? (p.total-p.done)+" chore"+(p.total-p.done===1?"":"s")+" left" : "Nothing due today") + "</span>";
  btn.addEventListener("click", emailDad);
  em.appendChild(btn);
  root.appendChild(em);
}
function assignName(mid, dow){
  var n = choresFor(mid, dow).length;
  if(!n) return DOWFULL[dow] + " -- nothing due";
  return DOWFULL[dow] + " -- " + n + " chore" + (n===1?"":"s");
}

/* =============== SCREEN: CHORES =============== */
var choreDow = today.getDay();
function renderChores(){
  var root = el("s-chores"); root.innerHTML = "";
  var m = me(), ds = dkey(shift(startOfWeek(today), choreDow));
  var viewingToday = choreDow === today.getDay();
  if(!viewingToday) ds = dkey(shift(startOfWeek(today), choreDow));

  var pick = h("div","sec");
  var seg = h("div","seg");
  DOW.forEach(function(lbl, i){
    var b = h("button", null, lbl);
    b.setAttribute("aria-pressed", String(i === choreDow));
    b.addEventListener("click", function(){ choreDow = i; renderChores(); });
    seg.appendChild(b);
  });
  pick.appendChild(seg);
  root.appendChild(pick);

  var list = choresFor(m.id, choreDow);
  if(!list.length){
    root.appendChild(h("div","group",'<div class="empty">No chores assigned to '+esc(m.name)+' on '+DOWFULL[choreDow]+'.</div>'));
  }

  var cats = [], byCat = {};
  list.forEach(function(c){
    if(!byCat[c.cat]){ byCat[c.cat] = []; cats.push(c.cat); }
    byCat[c.cat].push(c);
  });

  cats.forEach(function(cat){
    var items = byCat[cat];
    var dn = items.filter(function(c){ return isDone(ds, m.id, c.id); }).length;
    var sec = h("div","sec");
    var cap = h("div","cap");
    cap.innerHTML = esc(cat) + '<span class="rt num">'+dn+'/'+items.length+'</span>';
    sec.appendChild(cap);
    var g = h("div","group");
    items.forEach(function(c){ g.appendChild(choreRow(c, m, ds, viewingToday)); });
    sec.appendChild(g);
    root.appendChild(sec);
  });

  if(isAdmin()){
    var add = h("button","btn ghost", svg("plus") + "<span>Add a chore</span>");
    add.addEventListener("click", function(){ openChore(null); });
    root.appendChild(add);
  }
}
function choreRow(c, m, ds, live){
  var on = isDone(ds, m.id, c.id);
  var row = h("div","row" + (on ? " done" : ""));
  var subs = (c.subs && c.subs.length) ? c.subs.length + " steps" : "";
  var bits = [c.notes, subs, S.cfg.mode!=="none" ? money(c.value) : ""].filter(Boolean);

  var chk = h("button","chk", TICK);
  chk.setAttribute("role","checkbox");
  chk.setAttribute("aria-checked", String(on));
  chk.setAttribute("aria-label", (on?"Uncheck ":"Check off ") + c.title);
  chk.addEventListener("click", function(){
    var nowOn = !isDone(ds, m.id, c.id);
    if(nowOn && c.proof){ capturePhoto(function(p){ commit(nowOn, p); }); return; }
    commit(nowOn, null);
  });
  function commit(nowOn, photo){
    setDone(ds, m.id, c, nowOn, photo);
    tap(nowOn ? 14 : 8);
    var p = progressFor(m.id, shift(startOfWeek(today), choreDow));
    if(live && p.total > 0 && p.done === p.total){ bumpStreak(m.id); tap([16,60,16,60,32]); }
    renderChores(); renderHome(); renderChart(); renderMoney(); headline(); syncPips();
    if(live && p.total > 0 && p.done === p.total) toast("All done! " + (streakOf(m.id)>1 ? streakOf(m.id)+" days in a row" : "Go tell Dad"));
  }

  row.appendChild(chk);
  row.appendChild(h("span","tile sm", svg(c.icon)));
  row.querySelector(".tile").style.setProperty("--tc", c.color);
  var grow = h("span","grow", '<span class="t">'+esc(c.title)+'</span>' + (bits.length ? '<span class="s">'+esc(bits.join(" - "))+'</span>' : ''));
  grow.style.cursor = "pointer";
  grow.addEventListener("click", function(){ openDetail(c, m, ds); });
  row.appendChild(grow);

  var shot = S.photos[ds + "|" + doneKey(m.id, c.id)];
  if(shot){
    var th = h("img");
    th.src = shot; th.alt = "Photo proof";
    th.style.cssText = "width:34px;height:34px;border-radius:8px;object-fit:cover;flex:none;cursor:pointer";
    th.addEventListener("click", function(){ openDetail(c, m, ds); });
    row.appendChild(th);
  } else if(c.proof && !on){
    row.appendChild(h("span","tile sm", svg("camera")));
  }

  if(isAdmin()){
    var ed = h("button","mini","Edit");
    ed.addEventListener("click", function(e){ e.stopPropagation(); openChore(c); });
    row.appendChild(ed);
  }
  return row;
}

/* == chore detail: notes, steps, proof == */
function openDetail(c, m, ds){
  openSheet(c.title, function(body){
    var head = h("div","me");
    head.innerHTML = '<div class="top">' +
      '<span class="tile" style="--tc:'+c.color+'">'+svg(c.icon)+'</span>' +
      '<div><div class="nm" style="font-size:17px">'+esc(c.title)+'</div>' +
      '<div class="as">'+esc(c.cat)+'</div></div>' +
      (S.cfg.mode==="none" ? "" : '<div class="big"><b class="num" style="font-size:21px">'+money(c.value)+'</b><small>Worth</small></div>') +
      '</div>';
    body.appendChild(head);

    if(c.notes){
      var n = h("div","sec");
      n.appendChild(h("div","cap","Notes"));
      n.appendChild(h("div","group",'<div style="padding:13px 15px;font-size:15px;line-height:1.45">'+esc(c.notes)+'</div>'));
      body.appendChild(n);
    }

    if(c.subs && c.subs.length){
      var st = h("div","sec");
      st.appendChild(h("div","cap","Steps"));
      var g = h("div","group");
      c.subs.forEach(function(s, i){
        var sk = doneKey(m.id, c.id) + "|s" + i;
        var on = !!(S.done[ds] && S.done[ds][sk]);
        var r = h("div","row" + (on ? " done" : ""));
        var b = h("button","chk", TICK);
        b.setAttribute("role","checkbox");
        b.setAttribute("aria-checked", String(on));
        b.setAttribute("aria-label", s.t || ("Step " + (i+1)));
        b.addEventListener("click", function(){
          if(!S.done[ds]) S.done[ds] = {};
          if(S.done[ds][sk]) delete S.done[ds][sk];
          else S.done[ds][sk] = {at: Date.now()};
          save("done");
          var nowOn = !!S.done[ds][sk];
          b.setAttribute("aria-checked", String(nowOn));
          r.classList.toggle("done", nowOn);
        });
        r.appendChild(b);
        r.appendChild(h("span","grow", '<span class="t">'+esc(s.t || ("Step " + (i+1)))+'</span>'));
        g.appendChild(r);
      });
      st.appendChild(g);
      body.appendChild(st);
    }

    var shot = S.photos[ds + "|" + doneKey(m.id, c.id)];
    if(shot || c.proof){
      var ps = h("div","sec");
      ps.appendChild(h("div","cap", shot ? "Photo proof" : "Photo required"));
      if(shot){
        var img = h("img","shot"); img.src = shot; img.alt = "Photo proof for " + c.title;
        ps.appendChild(img);
      } else {
        ps.appendChild(h("div","group",'<div class="empty">A photo is needed to check this one off.</div>'));
      }
      body.appendChild(ps);
    }

    var who = h("div","sec");
    who.appendChild(h("div","cap","Scheduled"));
    var wg = h("div","group");
    c.assign.forEach(function(a){
      var mm = memberById(a.m); if(!mm) return;
      var r = h("div","row static");
      r.innerHTML = '<span class="av xs" style="--ac:'+mm.color+'">'+avatar(mm.face)+'</span>' +
        '<span class="grow"><span class="t">'+esc(mm.name)+'</span>' +
        '<span class="s">'+a.days.map(function(d){ return DOW[d]; }).join(", ")+'</span></span>';
      wg.appendChild(r);
    });
    who.appendChild(wg);
    body.appendChild(who);

    if(isAdmin()){
      var ed = h("button","btn ghost","Edit this chore");
      ed.addEventListener("click", function(){ closeSheet(); setTimeout(function(){ openChore(c); }, 260); });
      body.appendChild(ed);
    }
  }, null);
}

/* =============== SCREEN: CHART =============== */
var chartScope = "me";
function renderChart(){
  var root = el("s-chart"); root.innerHTML = "";
  var sec = h("div","sec");
  var seg = h("div","seg");
  [["me","Just me"],["all","Everyone"]].forEach(function(o){
    var b = h("button", null, o[1]);
    b.setAttribute("aria-pressed", String(chartScope === o[0]));
    b.addEventListener("click", function(){ chartScope = o[0]; renderChart(); });
    seg.appendChild(b);
  });
  sec.appendChild(seg);
  root.appendChild(sec);

  var sow = startOfWeek(today);
  var rows = [];
  if(chartScope === "me"){
    var m = me();
    S.chores.forEach(function(c){ if(daysFor(c, m.id)) rows.push({c:c, m:m}); });
  } else {
    S.chores.forEach(function(c){
      c.assign.forEach(function(a){
        var mm = memberById(a.m);
        if(mm) rows.push({c:c, m:mm});
      });
    });
  }

  if(!rows.length){ root.appendChild(h("div","group",'<div class="empty">No chores to chart yet.</div>')); return; }

  var wrap = h("div","chartwrap");
  var scroll = h("div","chartscroll");
  var t = h("table","chart");
  var head = "<thead><tr><th class='lead'>This week</th>";
  for(var i=0;i<7;i++){
    var d = shift(sow, i);
    head += "<th"+(sameDay(d,today)?" class='today'":"")+">"+DOW[i]+"</th>";
  }
  head += "</tr></thead>";

  var body = "<tbody>";
  rows.forEach(function(r){
    body += "<tr><td class='lead'><span class='leadcell'>" +
      "<span class='tile sm' style='--tc:"+r.c.color+"'>"+svg(r.c.icon)+"</span>" +
      "<span><span class='t'>"+esc(r.c.title)+"</span>" +
      (chartScope==="all" ? "<span class='s' style='font-size:11px;color:var(--text-3)'>"+esc(r.m.name)+"</span>" : "") +
      "</span></span></td>";
    for(var i=0;i<7;i++){
      var d = shift(sow, i), ds = dkey(d);
      var due = dueOn(r.c, r.m.id, i);
      var mark;
      /* Only call a day "missed" if the app already existed then -- otherwise a
         fresh install opens on a wall of red for days nobody could have used it. */
      var missable = d < today && !sameDay(d, today) && ds >= (S.cfg.since || "");
      if(!due) mark = "<i class='mark dot'></i>";
      else if(isDone(ds, r.m.id, r.c.id)) mark = "<span class='mark ok'>"+TICK+"</span>";
      else if(missable) mark = "<span class='mark no'>"+CROSS+"</span>";
      else mark = "<i class='mark dot'></i>";
      body += "<td><span class='cell'>"+mark+"</span></td>";
    }
    body += "</tr>";
  });
  body += "</tbody>";

  t.innerHTML = head + body;
  scroll.appendChild(t);
  wrap.appendChild(scroll);
  wrap.appendChild(h("div","legend",
    "<span><span class='mark ok' style='width:15px;height:15px'>"+TICK+"</span> Done</span>" +
    "<span><span class='mark no' style='width:15px;height:15px'>"+CROSS+"</span> Missed</span>" +
    "<span><i class='mark dot'></i> Not due</span>"));
  root.appendChild(wrap);
}

/* =============== SCREEN: BALANCES + REWARDS =============== */
function renderMoney(){
  var root = el("s-money"); root.innerHTML = "";
  if(S.cfg.mode === "none"){
    root.appendChild(h("div","group",'<div class="empty">Rewards are turned off.<br>Turn on allowance or points in Settings.</div>'));
    return;
  }

  var sec = h("div","sec");
  sec.appendChild(h("div","cap","Balances"));
  var g = h("div","group");
  S.members.forEach(function(x){
    var r = h("button","row tap");
    r.innerHTML =
      '<span class="av" style="--ac:'+x.color+'">'+avatar(x.face)+'</span>' +
      '<span class="grow"><span class="t">'+esc(x.name)+'</span></span>' +
      '<span class="rt num">'+money(balanceOf(x.id))+'</span><span class="chev"></span>';
    r.addEventListener("click", function(){ openLedger(x); });
    g.appendChild(r);
  });
  sec.appendChild(g);
  root.appendChild(sec);

  var rs = h("div","sec");
  var cap = h("div","cap","Rewards");
  rs.appendChild(cap);
  var rg = h("div","group");
  if(!S.rewards.length) rg.appendChild(h("div","empty","No rewards yet."));
  S.rewards.forEach(function(rw){ rg.appendChild(rewardCard(rw, true)); });
  rs.appendChild(rg);
  root.appendChild(rs);

  if(isAdmin()){
    var add = h("button","btn ghost", svg("gift") + "<span>Create a reward</span>");
    add.addEventListener("click", function(){ openReward(null); });
    root.appendChild(add);
  }
}
function rewardCard(rw, editable){
  var have = rw.who === "joint"
    ? S.members.reduce(function(a,x){ return a + balanceOf(x.id); }, 0)
    : balanceOf(rw.who);
  var pct = rw.price > 0 ? Math.min(100, Math.round(have / rw.price * 100)) : 0;
  var card = h("div","rw");
  card.innerHTML =
    '<div class="top"><span class="tile sm" style="--tc:#ffd28a">'+svg("gift")+'</span>' +
    '<span class="t">'+esc(rw.title)+'</span><span class="p num">'+money(rw.price)+'</span></div>' +
    '<div class="bar'+(pct>=100?" good":"")+'"><i style="width:'+pct+'%"></i></div>' +
    '<div class="meta"><span>'+(rw.who==="joint" ? "Everyone together" : esc((memberById(rw.who)||{name:"?"}).name))+'</span>' +
    '<span class="num">'+money(have)+' / '+money(rw.price)+(pct>=100?" -- ready!":"")+'</span></div>';
  if(editable && isAdmin()){
    card.style.cursor = "pointer";
    card.addEventListener("click", function(){ openReward(rw); });
  }
  return card;
}

/* =============== SCREEN: SETTINGS =============== */
function renderSettings(){
  var root = el("s-set"); root.innerHTML = "";

  var who = h("div","sec");
  who.appendChild(h("div","cap","This device"));
  var wg = h("div","group");
  S.members.forEach(function(x){
    var r = h("button","row tap");
    r.innerHTML =
      '<span class="av" style="--ac:'+x.color+'">'+avatar(x.face)+'</span>' +
      '<span class="grow"><span class="t">'+esc(x.name)+'</span><span class="s">Age '+x.age+'</span></span>' +
      (S.cfg.me === x.id ? '<span class="chip ok">Using</span>' : '');
    r.addEventListener("click", function(){ S.cfg.me = x.id; save("cfg"); renderAll(); });
    wg.appendChild(r);
  });
  who.appendChild(wg);
  root.appendChild(who);

  var mode = h("div","sec");
  mode.appendChild(h("div","cap","Mode"));
  var mg = h("div","group");
  var rr = h("div","row static");
  rr.innerHTML = '<span class="grow"><span class="t">Parent mode</span><span class="s">Kid mode hides editing and balance changes</span></span>';
  var tog = h("button","mini" + (isAdmin() ? " acc" : ""), isAdmin() ? "Parent" : "Kid");
  tog.addEventListener("click", function(){
    if(isAdmin()){ S.cfg.role = "kid"; save("cfg"); renderAll(); return; }
    if(S.cfg.pin){ askPin(); return; }
    S.cfg.role = "admin"; save("cfg"); renderAll();
  });
  rr.appendChild(tog);
  mg.appendChild(rr);

  var pinRow = h("div","row static");
  pinRow.innerHTML = '<span class="grow"><span class="t">Parent PIN</span><span class="s">'+(S.cfg.pin ? "Set -- kids can't switch back" : "Not set")+'</span></span>';
  var pb = h("button","mini", S.cfg.pin ? "Change" : "Set PIN");
  pb.addEventListener("click", function(){
    if(!isAdmin()){ toast("Parent mode only"); return; }
    var v = prompt("Choose a 4-digit PIN (blank to remove):", "");
    if(v === null) return;
    v = v.replace(/\D/g,"").slice(0,4);
    S.cfg.pin = v; save("cfg"); renderSettings();
    toast(v ? "PIN saved" : "PIN removed");
  });
  pinRow.appendChild(pb);
  mg.appendChild(pinRow);
  mode.appendChild(mg);
  root.appendChild(mode);

  var rew = h("div","sec");
  rew.appendChild(h("div","cap","Rewards"));
  var rg2 = h("div","group");
  var seg = h("div","seg");
  seg.style.margin = "11px 13px";
  [["allowance","Allowance"],["points","Points"],["none","No rewards"]].forEach(function(o){
    var b = h("button", null, o[1]);
    b.setAttribute("aria-pressed", String(S.cfg.mode === o[0]));
    b.addEventListener("click", function(){
      if(!isAdmin()){ toast("Parent mode only"); return; }
      S.cfg.mode = o[0]; save("cfg"); renderAll();
    });
    seg.appendChild(b);
  });
  rg2.appendChild(seg);
  rew.appendChild(rg2);
  root.appendChild(rew);

  var mail = h("div","sec");
  mail.appendChild(h("div","cap","Dad's email"));
  var f = h("div","field");
  var inp = h("input","inp");
  inp.type = "email"; inp.placeholder = "dad@example.com"; inp.value = S.cfg.dad || "";
  inp.setAttribute("autocomplete","email");
  inp.addEventListener("change", function(){ S.cfg.dad = inp.value.trim(); save("cfg"); });
  f.appendChild(inp);
  mail.appendChild(f);
  root.appendChild(mail);

  var danger = h("div","sec");
  danger.appendChild(h("div","cap","Data"));
  var d1 = h("button","btn ghost","Reset chores to the family poster");
  d1.addEventListener("click", function(){
    if(!isAdmin()){ toast("Parent mode only"); return; }
    if(!confirm("Replace all chores with the original poster list? Check-offs and balances are kept.")) return;
    S.chores = seedChores(); save("chores"); renderAll(); toast("Chores restored");
  });
  var d2 = h("button","btn danger","Erase everything on this device");
  d2.addEventListener("click", function(){
    if(!isAdmin()){ toast("Parent mode only"); return; }
    if(!confirm("Erase all chores, check-offs, balances and rewards on this device? This cannot be undone.")) return;
    ["members","chores","done","bal","rewards","photos","streak","cfg"].forEach(function(k){ store.removeItem("cs2."+k); });
    location.reload();
  });
  danger.appendChild(d1); danger.appendChild(d2);
  root.appendChild(danger);

  root.appendChild(h("div","empty","Everything stays on this device. Nothing is uploaded."));
}
function askPin(){
  var v = prompt("Enter the parent PIN:", "");
  if(v === null) return;
  if(v.replace(/\D/g,"") === S.cfg.pin){ S.cfg.role = "admin"; save("cfg"); renderAll(); toast("Parent mode on"); }
  else toast("Wrong PIN");
}

/* =============== SHEETS =============== */
var sheetSave = null;
function openSheet(title, buildBody, onSave, saveLabel){
  el("sheetTitle").textContent = title;
  var body = el("sheetBody"); body.innerHTML = "";
  buildBody(body);
  sheetSave = onSave;
  el("sheetSave").textContent = saveLabel || "Save";
  el("sheetSave").classList.toggle("hide", !onSave);
  el("scrim").classList.add("on");
  el("sheet").classList.add("on");
}
function closeSheet(){
  el("scrim").classList.remove("on");
  el("sheet").classList.remove("on");
  sheetSave = null;
}

/* == chore editor == */
function openChore(chore){
  var isNew = !chore;
  var c = chore ? JSON.parse(JSON.stringify(chore)) : {
    id:"c"+Date.now(), title:"", icon:"star", color:SWATCH[4], cat:"Bedroom",
    value:1, assign:[], notes:"", subs:[], proof:false
  };

  openSheet(isNew ? "New chore" : "Edit chore", function(body){
    var f1 = h("div","field",'<label>Name</label>');
    var t = h("input","inp"); t.value = c.title; t.placeholder = "Wash the dishes";
    t.addEventListener("input", function(){ c.title = t.value; });
    f1.appendChild(t); body.appendChild(f1);

    var f2 = h("div","field",'<label>Category</label>');
    var cat = h("input","inp"); cat.value = c.cat; cat.placeholder = "Kitchen";
    cat.setAttribute("list","catlist");
    cat.addEventListener("input", function(){ c.cat = cat.value; });
    f2.appendChild(cat); body.appendChild(f2);

    var f3 = h("div","field",'<label>Icon</label>');
    var ip = h("div","iconpick");
    Object.keys(I).filter(function(k){ return k !== "check"; }).forEach(function(k){
      var b = h("button","ic", svg(k));
      b.type = "button";
      b.setAttribute("aria-pressed", String(c.icon === k));
      b.addEventListener("click", function(){
        c.icon = k;
        ip.querySelectorAll(".ic").forEach(function(x){ x.setAttribute("aria-pressed","false"); });
        b.setAttribute("aria-pressed","true");
      });
      ip.appendChild(b);
    });
    f3.appendChild(ip); body.appendChild(f3);

    var f4 = h("div","field",'<label>Color</label>');
    var sw = h("div","swatches");
    SWATCH.forEach(function(col){
      var b = h("button","sw"); b.type = "button";
      b.style.setProperty("--c", col);
      b.setAttribute("aria-pressed", String(c.color === col));
      b.setAttribute("aria-label","Color "+col);
      b.addEventListener("click", function(){
        c.color = col;
        sw.querySelectorAll(".sw").forEach(function(x){ x.setAttribute("aria-pressed","false"); });
        b.setAttribute("aria-pressed","true");
      });
      sw.appendChild(b);
    });
    f4.appendChild(sw); body.appendChild(f4);

    if(S.cfg.mode !== "none"){
      var f5 = h("div","field",'<label>Worth '+(S.cfg.mode==="points"?"(points)":"("+S.cfg.cur+")")+'</label>');
      var v = h("input","inp"); v.type = "number"; v.step = "0.25"; v.min = "0"; v.value = c.value;
      v.setAttribute("inputmode","decimal");
      v.addEventListener("input", function(){ c.value = parseFloat(v.value) || 0; });
      f5.appendChild(v); body.appendChild(f5);
    }

    var f6 = h("div","field",'<label>Who does it, and on which days</label>');
    var wg = h("div","group who");
    S.members.forEach(function(mm){
      var days = daysFor(c, mm.id);
      var rowEl = h("div","subrow");
      rowEl.style.flexWrap = "wrap";
      var head = h("div", null, "");
      head.style.cssText = "display:flex;align-items:center;gap:10px;width:100%";
      head.innerHTML = '<span class="av xs" style="--ac:'+mm.color+'">'+avatar(mm.face)+'</span>' +
                       '<span style="font-weight:600;font-size:15px">'+esc(mm.name)+'</span>';
      var onBtn = h("button","mini" + (days ? " acc" : ""), days ? "Assigned" : "Not assigned");
      onBtn.type = "button";
      onBtn.style.marginLeft = "auto";
      head.appendChild(onBtn);
      rowEl.appendChild(head);

      var dp = h("div","daypick");
      dp.style.cssText = "width:100%;margin-top:9px";
      if(!days) dp.classList.add("hide");
      DOW.forEach(function(lbl, i){
        var b = h("button", null, lbl.charAt(0));
        b.type = "button";
        b.setAttribute("aria-pressed", String(!!days && days.indexOf(i) !== -1));
        b.setAttribute("aria-label", DOWFULL[i]);
        b.addEventListener("click", function(){
          var cur = daysFor(c, mm.id); if(!cur) return;
          var at = cur.indexOf(i);
          if(at === -1) cur.push(i); else cur.splice(at,1);
          cur.sort();
          b.setAttribute("aria-pressed", String(at === -1));
        });
        dp.appendChild(b);
      });
      rowEl.appendChild(dp);

      onBtn.addEventListener("click", function(){
        var cur = daysFor(c, mm.id);
        if(cur){
          c.assign = c.assign.filter(function(a){ return a.m !== mm.id; });
          dp.classList.add("hide"); onBtn.className = "mini"; onBtn.textContent = "Not assigned";
        } else {
          c.assign.push({m:mm.id, days:[1,2,3,4,5]});
          dp.classList.remove("hide"); onBtn.className = "mini acc"; onBtn.textContent = "Assigned";
          dp.querySelectorAll("button").forEach(function(b,i){ b.setAttribute("aria-pressed", String(i>=1 && i<=5)); });
        }
        onBtn.style.marginLeft = "auto";
      });
      wg.appendChild(rowEl);
    });
    f6.appendChild(wg); body.appendChild(f6);

    var f7 = h("div","field",'<label>Steps (optional)</label>');
    var sg = h("div","group");
    function drawSubs(){
      sg.innerHTML = "";
      c.subs.forEach(function(s, i){
        var r = h("div","subrow");
        var si = h("input","inp"); si.value = s.t; si.placeholder = "Step "+(i+1);
        si.addEventListener("input", function(){ c.subs[i].t = si.value; });
        var rm = h("button","mini","Remove"); rm.type = "button";
        rm.addEventListener("click", function(){ c.subs.splice(i,1); drawSubs(); });
        r.appendChild(si); r.appendChild(rm);
        sg.appendChild(r);
      });
      var addR = h("div","subrow");
      var ab = h("button","mini acc","+ Add step"); ab.type = "button";
      ab.addEventListener("click", function(){ c.subs.push({t:""}); drawSubs(); });
      addR.appendChild(ab); sg.appendChild(addR);
    }
    drawSubs();
    f7.appendChild(sg); body.appendChild(f7);

    var f8 = h("div","field",'<label>Notes</label>');
    var nt = h("textarea","inp"); nt.value = c.notes; nt.placeholder = "Anything they should know";
    nt.addEventListener("input", function(){ c.notes = nt.value; });
    f8.appendChild(nt); body.appendChild(f8);

    var f9 = h("div","group");
    var pr = h("div","row static");
    pr.innerHTML = '<span class="grow"><span class="t">Require a photo</span><span class="s">They must snap proof to check it off</span></span>';
    var pb = h("button","mini" + (c.proof ? " acc" : ""), c.proof ? "On" : "Off");
    pb.type = "button";
    pb.addEventListener("click", function(){
      c.proof = !c.proof;
      pb.className = "mini" + (c.proof ? " acc" : "");
      pb.textContent = c.proof ? "On" : "Off";
    });
    pr.appendChild(pb); f9.appendChild(pr); body.appendChild(f9);

    if(!isNew){
      var del = h("button","btn danger","Delete this chore");
      del.addEventListener("click", function(){
        if(!confirm("Delete \""+c.title+"\"? Past check-offs stay in the history.")) return;
        S.chores = S.chores.filter(function(x){ return x.id !== c.id; });
        save("chores"); closeSheet(); renderAll(); toast("Chore deleted");
      });
      body.appendChild(del);
    }
  }, function(){
    if(!c.title.trim()){ toast("Give the chore a name"); return false; }
    if(!c.assign.length){ toast("Assign it to at least one person"); return false; }
    c.assign = c.assign.filter(function(a){ return a.days.length; });
    if(!c.assign.length){ toast("Pick at least one day"); return false; }
    if(isNew) S.chores.push(c);
    else S.chores = S.chores.map(function(x){ return x.id === c.id ? c : x; });
    save("chores"); renderAll();
    toast(isNew ? "Chore added" : "Chore saved");
    return true;
  });
}

/* == balance ledger == */
function openLedger(m){
  openSheet(m.name + "'s balance", function(body){
    var head = h("div","me");
    head.innerHTML = '<div class="top"><span class="av lg" style="--ac:'+m.color+'">'+avatar(m.face)+'</span>' +
      '<div><div class="nm">'+esc(m.name)+'</div><div class="as">Current balance</div></div>' +
      '<div class="big"><b class="num">'+money(balanceOf(m.id))+'</b></div></div>';
    body.appendChild(head);

    if(isAdmin()){
      var adj = h("button","btn ghost","Make an adjustment");
      adj.addEventListener("click", function(){
        var raw = prompt("Amount to add (use a minus sign to take away):", "");
        if(raw === null) return;
        var amt = parseFloat(raw);
        if(isNaN(amt) || !amt){ toast("Enter a number"); return; }
        var why = prompt("What's it for?", amt > 0 ? "Bonus" : "Cash paid out") || "Adjustment";
        credit(m.id, amt, why);
        closeSheet(); renderAll(); toast("Balance updated");
      });
      body.appendChild(adj);
    }

    var hist = (S.bal[m.id] && S.bal[m.id].hist) || [];
    var sec = h("div","sec");
    sec.appendChild(h("div","cap","History"));
    var g = h("div","group");
    if(!hist.length) g.appendChild(h("div","empty","Nothing yet. Completed chores show up here."));
    hist.slice(0,80).forEach(function(e){
      var d = new Date(e.at);
      var when = sameDay(d, today) ? "Today at " + d.toLocaleTimeString([], {hour:"numeric", minute:"2-digit"})
               : d.toLocaleDateString([], {month:"short", day:"numeric"}) + " at " + d.toLocaleTimeString([], {hour:"numeric", minute:"2-digit"});
      var row = h("div","led");
      row.innerHTML = '<span class="grow"><span class="when">'+esc(when)+'</span><span class="what">'+esc(e.label)+'</span></span>' +
        '<span class="amt"><b class="num '+(e.d>=0?"up":"dn")+'">'+(e.d>=0?"+":"")+money(e.d)+'</b><small class="num">'+money(e.after)+'</small></span>';
      g.appendChild(row);
    });
    sec.appendChild(g);
    body.appendChild(sec);
  }, null);
}

/* == reward editor == */
function openReward(rw){
  var isNew = !rw;
  var r = rw ? JSON.parse(JSON.stringify(rw)) : {id:"r"+Date.now(), title:"", price:20, who:"joint"};
  openSheet(isNew ? "New reward" : "Edit reward", function(body){
    var f1 = h("div","field",'<label>Reward</label>');
    var t = h("input","inp"); t.value = r.title; t.placeholder = "Pizza night";
    t.addEventListener("input", function(){ r.title = t.value; });
    f1.appendChild(t); body.appendChild(f1);

    var f2 = h("div","field",'<label>Costs</label>');
    var p = h("input","inp"); p.type = "number"; p.min = "0"; p.step = "1"; p.value = r.price;
    p.setAttribute("inputmode","decimal");
    p.addEventListener("input", function(){ r.price = parseFloat(p.value) || 0; });
    f2.appendChild(p); body.appendChild(f2);

    var f3 = h("div","field","<label>Who it is for</label>");
    var sel = h("select","inp");
    sel.innerHTML = '<option value="joint">Everyone together</option>' +
      S.members.map(function(m){ return '<option value="'+m.id+'">'+esc(m.name)+'</option>'; }).join("");
    sel.value = r.who;
    sel.addEventListener("change", function(){ r.who = sel.value; });
    f3.appendChild(sel); body.appendChild(f3);

    if(!isNew){
      var del = h("button","btn danger","Delete this reward");
      del.addEventListener("click", function(){
        S.rewards = S.rewards.filter(function(x){ return x.id !== r.id; });
        save("rewards"); closeSheet(); renderAll(); toast("Reward deleted");
      });
      body.appendChild(del);
    }
  }, function(){
    if(!r.title.trim()){ toast("Give the reward a name"); return false; }
    if(isNew) S.rewards.push(r);
    else S.rewards = S.rewards.map(function(x){ return x.id === r.id ? r : x; });
    save("rewards"); renderAll();
    return true;
  });
}

/* == photo proof == */
function capturePhoto(cb){
  var inp = document.createElement("input");
  inp.type = "file"; inp.accept = "image/*"; inp.capture = "environment";
  inp.style.cssText = "position:fixed;left:-9999px";
  document.body.appendChild(inp);
  inp.addEventListener("change", function(){
    var file = inp.files && inp.files[0];
    document.body.removeChild(inp);
    if(!file){ return; }
    var fr = new FileReader();
    fr.onload = function(){
      var img = new Image();
      img.onload = function(){
        /* Downscale hard -- localStorage is only a few megabytes. */
        var max = 420, sc = Math.min(1, max / Math.max(img.width, img.height));
        var cv = document.createElement("canvas");
        cv.width = Math.round(img.width * sc); cv.height = Math.round(img.height * sc);
        cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
        cb(cv.toDataURL("image/jpeg", 0.55));
      };
      img.onerror = function(){ toast("Couldn't read that photo"); };
      img.src = fr.result;
    };
    fr.readAsDataURL(file);
  });
  inp.click();
}

/* =============== EMAIL =============== */
function emailDad(){
  var m = me(), dow = today.getDay(), ds = dkey(today);
  var list = choresFor(m.id, dow);
  if(!list.length){ toast("Nothing due today"); return; }
  var addr = (S.cfg.dad || "").trim();
  if(!addr){ show("set"); toast("Add Dad's email in Settings first"); return; }

  var when = today.toLocaleDateString(undefined, {month:"long", day:"numeric", year:"numeric"});
  var head = m.name + " finished every chore for " + DOWFULL[dow] + ", " + when + ".\n";
  if(S.cfg.mode !== "none") head += "Earned today: " + money(list.reduce(function(a,c){ return a + c.value; }, 0)) +
                                    "  -  Balance: " + money(balanceOf(m.id)) + "\n";
  var st = streakOf(m.id);
  if(st > 1) head += "Streak: " + st + " days in a row\n";

  var cats = [], byCat = {};
  list.forEach(function(c){ if(!byCat[c.cat]){ byCat[c.cat]=[]; cats.push(c.cat); } byCat[c.cat].push(c); });
  var lines = [head];
  cats.forEach(function(cat){
    lines.push(cat.toUpperCase());
    byCat[cat].forEach(function(c){ lines.push("- " + c.title); });
    lines.push("");
  });
  var body = lines.join("\n");
  if(encodeURIComponent(body).length > 1750){
    var brief = [head];
    cats.forEach(function(cat){ brief.push("- " + cat + ": all " + byCat[cat].length + " done"); });
    brief.push("", "Full checklist is in the app.");
    body = brief.join("\n");
  }
  var subject = m.name + " finished all chores - " + DOWFULL[dow] + ", " +
                today.toLocaleDateString(undefined, {month:"short", day:"numeric"});
  window.location.href = "mailto:" + encodeURIComponent(addr) +
    "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  toast("Opening your email app -- press send");
}

/* =============== TABS =============== */
var TABS = [
  {id:"home",   label:"Household", icon:"home"},
  {id:"chores", label:"Chores",    icon:"list"},
  {id:"chart",  label:"Chart",     icon:"chart"},
  {id:"money",  label:"Balances",  icon:"wallet"},
  {id:"set",    label:"Settings",  icon:"gear"}
];
var current = "home";
var scrollMemory = {};
function show(id){
  if(id !== current) scrollMemory[current] = window.scrollY;   /* native apps keep your place */
  var changed = id !== current;
  current = id;
  TABS.forEach(function(t){
    el("s-" + t.id).classList.toggle("on", t.id === id);
    el("tab-" + t.id).setAttribute("aria-selected", String(t.id === id));
  });
  if(changed) tap(8);
  window.scrollTo(0, scrollMemory[id] || 0);
  headline();
}

/* Short buzz on interaction. Android and desktop Chrome honour this;
   iOS Safari has no vibration API, so it is simply a no-op there. */
function tap(ms){
  try{ if(navigator.vibrate) navigator.vibrate(ms || 10); }catch(e){}
}
function buildTabs(){
  var bar = el("tabs"); bar.innerHTML = "";
  TABS.forEach(function(t){
    var b = h("button", null, svg(t.icon) + "<span>" + t.label + "</span>");
    b.id = "tab-" + t.id;
    b.setAttribute("role","tab");
    b.setAttribute("aria-selected", String(current === t.id));
    b.addEventListener("click", function(){ show(t.id); });
    bar.appendChild(b);
  });
}
function syncPips(){
  var left = progressFor(me().id, today);
  var n = left.total - left.done;
  var tab = el("tab-chores");
  var pip = tab.querySelector(".pip");
  if(n > 0){
    if(!pip){ pip = h("span","pip"); tab.appendChild(pip); }
    pip.textContent = n;
  } else if(pip) pip.remove();
}
function headline(){
  var m = me(), p = progressFor(m.id, today);
  var t = TABS.filter(function(x){ return x.id === current; })[0];
  el("hEyebrow").textContent = DOWFULL[today.getDay()] + " - " + today.toLocaleDateString(undefined,{month:"long", day:"numeric"});
  el("hTitle").innerHTML = current === "home"
    ? 'Hi, <span class="soft">' + esc(m.name) + '</span>'
    : esc(t.label);
  el("hSub").textContent = p.total
    ? (p.done === p.total ? "Everything's done today " : p.done + " of " + p.total + " chores done today")
    : "Nothing due today";
}

/* =============== BOOT =============== */
function renderAll(){
  renderHome(); renderChores(); renderChart(); renderMoney(); renderSettings();
  headline(); syncPips();
}

function firstRun(){
  var g = el("pickWho");
  g.innerHTML = "";
  S.members.forEach(function(m){
    var b = h("button","row tap");
    b.innerHTML = '<span class="av lg" style="--ac:'+m.color+'">'+avatar(m.face)+'</span>' +
      '<span class="grow"><span class="t" style="font-size:19px">'+esc(m.name)+'</span><span class="s">Age '+m.age+'</span></span><span class="chev"></span>';
    b.addEventListener("click", function(){
      S.cfg.me = m.id;
      S.cfg.role = "kid";        /* a parent flips this on in Settings */
      save("cfg");
      el("welcome").classList.remove("on");
      el("app").classList.remove("hide");
      renderAll(); show("home");
    });
    g.appendChild(b);
  });
  el("welcome").classList.add("on");
  el("app").classList.add("hide");
}

el("sheetCancel").addEventListener("click", closeSheet);
el("scrim").addEventListener("click", closeSheet);
el("sheetSave").addEventListener("click", function(){
  if(!sheetSave){ closeSheet(); return; }
  if(sheetSave() !== false) closeSheet();
});

/* Rolled past midnight with the app open? Re-key to the new day. */
setInterval(function(){
  var now = new Date();
  if(dkey(now) !== dkey(today)){ today = now; choreDow = now.getDay(); renderAll(); }
}, 60000);

/* =============== INSTALLED-APP BEHAVIOUR =============== */
function installed(){
  return window.navigator.standalone === true ||
         (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches);
}
var deferredPrompt = null;
window.addEventListener("beforeinstallprompt", function(e){
  e.preventDefault();
  deferredPrompt = e;
  maybeOfferInstall();
});
window.addEventListener("appinstalled", function(){
  deferredPrompt = null;
  el("install").classList.remove("on");
  toast("Installed - open it from your Home Screen");
});

function maybeOfferInstall(){
  if(installed() || store.getItem("cs2.noinstall") === "1") return;
  /* No manifest means nothing to install - e.g. the single-file build. */
  if(!document.querySelector('link[rel="manifest"]')) return;
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  var how = el("installHow"), go = el("installGo");
  if(deferredPrompt){
    how.textContent = "Get the full-screen app with its own icon.";
    go.classList.remove("hide");
  } else if(iOS){
    how.innerHTML = "Tap the Share button, then <b>Add to Home Screen</b>. " +
                    "It opens full screen and works offline.";
    go.classList.add("hide");
  } else {
    return;   /* a desktop browser with no install path - do not nag */
  }
  el("install").classList.add("on");
}
el("installGo").addEventListener("click", function(){
  if(!deferredPrompt) return;
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(function(){ deferredPrompt = null; el("install").classList.remove("on"); });
});
el("installX").addEventListener("click", function(){
  store.setItem("cs2.noinstall", "1");
  el("install").classList.remove("on");
});

/* Standalone iOS has no browser chrome to absorb a stray swipe; block the
   two-finger/edge pinch-zoom that otherwise leaves the layout stranded. */
if(installed()){
  document.addEventListener("gesturestart", function(e){ e.preventDefault(); });
}

if(!S.cfg.since){ S.cfg.since = dkey(today); save("cfg"); }

/* Home-screen icon shortcuts arrive as ?tab=chores etc. */
function requestedTab(){
  var m = /[?&]tab=([a-z]+)/.exec(location.search);
  if(!m) return null;
  return TABS.some(function(t){ return t.id === m[1]; }) ? m[1] : null;
}

buildTabs();
if(!S.cfg.me){ firstRun(); }
else { renderAll(); show(requestedTab() || "home"); }

/* Hand off from the launch screen after the first paint. rAF is the nice path,
   but it never fires while the tab is hidden - so a timer races it and whichever
   lands first wins. The launch screen must never be able to trap the UI. */
var booted = false;
function dismissBoot(){
  if(booted) return;
  booted = true;
  var b = el("boot");
  if(b){
    b.classList.add("gone");
    setTimeout(function(){ if(b.parentNode) b.parentNode.removeChild(b); }, 400);
  }
  setTimeout(maybeOfferInstall, 1200);
}
requestAnimationFrame(function(){ requestAnimationFrame(dismissBoot); });
setTimeout(dismissBoot, 700);
window.addEventListener("load", dismissBoot);
document.addEventListener("visibilitychange", function(){ if(!document.hidden) dismissBoot(); });

if("serviceWorker" in navigator){
  window.addEventListener("load", function(){
    navigator.serviceWorker.register("sw.js").catch(function(){ /* fine without offline */ });
  });
}
})();
