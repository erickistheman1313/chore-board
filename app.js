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

/* =============== MONOGRAM MEDALLIONS =============== */
/* An engraved brass disc with the person's initial, struck the same way as the
   app icon: solid keyline, dashed keyline, foil letterform. Takes the member so
   a renamed profile re-letters itself. */
var SERIF_STACK = 'Didot,"Bodoni 72","Hoefler Text","Iowan Old Style",Palatino,Georgia,serif';
function avatar(member){
  var name = (member && member.name) || "?";
  var initial = name.charAt(0).toUpperCase();
  return '<svg viewBox="0 0 64 64" role="img" aria-label="' + esc(name) + '">' +
    '<circle cx="32" cy="32" r="30.2" fill="none" stroke="url(#foil)" stroke-width="1.5"/>' +
    '<circle cx="32" cy="32" r="26" fill="none" stroke="url(#foilFaint)" stroke-width="1" ' +
      'stroke-dasharray="1.7 2.9" stroke-linecap="round"/>' +
    '<text x="32" y="32" text-anchor="middle" dominant-baseline="central" ' +
      'font-family=\'' + SERIF_STACK + '\' font-size="30" fill="url(#foil)">' + esc(initial) + '</text>' +
    '</svg>';
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
  photos:  read("cs2.photos",  {}),
  streak:  read("cs2.streak",  {}),
  pins:    read("cs2.pins",    {}),
  fails:   read("cs2.fails",   {}),
  excused: read("cs2.excused", {}),
  cfg:     read("cs2.cfg",     {dad:"", role:"kid", me:null, sound:true})
};
function save(what){
  if(!what || what==="members") write("cs2.members", S.members);
  if(!what || what==="chores")  write("cs2.chores",  S.chores);
  if(!what || what==="done")    write("cs2.done",    S.done);
  if(!what || what==="photos")  write("cs2.photos",  S.photos);
  if(!what || what==="streak")  write("cs2.streak",  S.streak);
  if(!what || what==="pins")    write("cs2.pins",    S.pins);
  if(!what || what==="fails")   write("cs2.fails",   S.fails);
  if(!what || what==="excused") write("cs2.excused", S.excused);
  if(!what || what==="cfg")     write("cs2.cfg",     S.cfg);
}

/* =============== DATES =============== */
var today = new Date();
function dkey(d){ return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function shift(d, n){ var x = new Date(d.getTime()); x.setDate(x.getDate()+n); return x; }
function startOfWeek(d){ return shift(d, -d.getDay()); }
function sameDay(a,b){ return dkey(a) === dkey(b); }
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

/* ---- excused chores ----
   "We ate out, no dishes tonight." Without this a chore nobody could do still
   counts against the day and quietly kills a streak. Parent mode only, or a kid
   would simply excuse the lot and score a hundred percent every night. */
function excusedFor(dateStr, mid, cid){
  var day = S.excused[dateStr];
  return (day && day[doneKey(mid, cid)]) || null;
}
function setExcused(dateStr, mid, cid, why){
  if(!S.excused[dateStr]) S.excused[dateStr] = {};
  var k = doneKey(mid, cid);
  if(why === null){ delete S.excused[dateStr][k]; }
  else S.excused[dateStr][k] = {at: Date.now(), why: (why || "").trim()};
  save("excused");
}

/* =============== COMPLETION =============== */
function setDone(dateStr, mid, chore, on, photo){
  if(!S.done[dateStr]) S.done[dateStr] = {};
  var k = doneKey(mid, chore.id);
  var was = !!S.done[dateStr][k];
  if(on === was) return;
  if(on){
    S.done[dateStr][k] = {at: Date.now()};
    if(photo){ S.photos[dateStr+"|"+k] = photo; save("photos"); }
  } else {
    delete S.done[dateStr][k];
    if(S.photos[dateStr+"|"+k]){ delete S.photos[dateStr+"|"+k]; save("photos"); }
  }
  save("done");
}

/* =============== PIN =============== *
   A four-digit PIN keeps a sibling from opening someone else's list. It is a
   soft lock, not security: only ten thousand combinations exist and everything
   lives in this browser's storage, so anyone determined can get past it. The
   stored value is hashed so the raw digits are not sitting in plain view.
   Parent mode can always reset a forgotten PIN, so nobody gets locked out. */
function pinHash(mid, pin){
  var salt = "chore-board:" + mid + ":";
  if(!(window.crypto && crypto.subtle && crypto.subtle.digest)){
    return Promise.resolve("plain:" + pin);      /* very old browser */
  }
  var bytes = new TextEncoder().encode(salt + pin);
  return crypto.subtle.digest("SHA-256", bytes).then(function(buf){
    var out = "", view = new Uint8Array(buf);
    for(var i=0;i<view.length;i++) out += view[i].toString(16).padStart(2,"0");
    return out;
  });
}
/* ---- lockout after repeated wrong guesses ----
   Five wrong tries jams the pad for a minute. Every jam after that doubles,
   so someone sitting there guessing walks it up into hours. A correct PIN, or
   a parent reset, wipes the slate.
   Honest limit: the deadline is a clock time held on this device, so anyone
   who changes the device clock can skip the wait. Stopping that needs a
   server, which this app deliberately does not have. */
var FAIL_LIMIT = 5;
var JAM_BASE = 60 * 1000;              /* first jam: one minute   */
var JAM_CAP  = 24 * 60 * 60 * 1000;    /* never longer than a day */

function failsFor(mid){
  var f = S.fails[mid];
  if(!f) f = S.fails[mid] = {n:0, strikes:0, until:0};
  return f;
}
function jamLength(strikes){
  return Math.min(JAM_BASE * Math.pow(2, Math.max(0, strikes - 1)), JAM_CAP);
}
function jamLeft(mid){
  var f = failsFor(mid);
  var left = f.until - Date.now();
  return left > 0 ? left : 0;
}
function triesLeft(mid){
  return Math.max(0, FAIL_LIMIT - failsFor(mid).n);
}
/* Returns ms of jam if this failure triggered one, else 0. */
function registerFail(mid){
  var f = failsFor(mid);
  f.n++;
  var jammed = 0;
  if(f.n >= FAIL_LIMIT){
    f.strikes++;
    jammed = jamLength(f.strikes);
    f.until = Date.now() + jammed;
    f.n = 0;
  }
  save("fails");
  return jammed;
}
function clearFails(mid){
  delete S.fails[mid];
  save("fails");
}
function humanJam(ms){
  var s = Math.ceil(ms / 1000);
  if(s < 60) return s + (s === 1 ? " second" : " seconds");
  var m = Math.round(s / 60);
  if(m < 60) return m + (m === 1 ? " minute" : " minutes");
  var hrs = Math.floor(m / 60), rem = m % 60;
  return hrs + (hrs === 1 ? " hour" : " hours") + (rem ? " " + rem + " min" : "");
}
function clockJam(ms){
  var s = Math.max(0, Math.ceil(ms / 1000));
  var hrs = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  var pad2 = function(v){ return String(v).padStart(2, "0"); };
  return hrs > 0 ? hrs + ":" + pad2(m) + ":" + pad2(sec) : m + ":" + pad2(sec);
}

/* The parent is not a profile on the picker, just an id that owns a PIN, so it
   reuses the same hashing, the same keypad and the same lockout as everyone. */
var PARENT = {id:"__parent", name:"Parent", color:"#c9a44c"};
function parentPinSet(){ return hasPin(PARENT.id); }

function hasPin(mid){ return !!S.pins[mid]; }
function setPin(mid, pin){
  return pinHash(mid, pin).then(function(hash){
    S.pins[mid] = hash;
    save("pins");
  });
}
function checkPin(mid, pin){
  return pinHash(mid, pin).then(function(hash){ return S.pins[mid] === hash; });
}
function clearPin(mid){ delete S.pins[mid]; save("pins"); }

/* =============== STREAKS =============== */
function progressFor(mid, date){
  var dow = date.getDay(), ds = dkey(date);
  var list = choresFor(mid, dow);
  var done = 0, total = 0, off = 0;
  for(var i=0;i<list.length;i++){
    if(excusedFor(ds, mid, list[i].id)){ off++; continue; }   /* not counted at all */
    total++;
    if(isDone(ds, mid, list[i].id)) done++;
  }
  return {done:done, total:total, excused:off,
          pct: total ? Math.round(done/total*100) : 0};
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
/* Walks back through the days this device has existed and totals up the record.
   Past days are judged against the chore list as it stands now; the app does not
   keep a history of assignments, so a big edit will re-colour old days. */
function historyStats(mid){
  var since = S.cfg.since || dkey(today);
  var out = {done:0, month:0, best:0, run:0};
  var run = 0;
  var monthKey = dkey(today).slice(0, 7);
  for(var i = 0; i < 400; i++){
    var d = shift(today, -i);
    var ds = dkey(d);
    if(ds < since) break;
    var p = progressFor(mid, d);
    if(!p.total) continue;                       /* nothing was due; skip */
    var complete = p.done === p.total;
    if(complete){
      out.done++;
      if(ds.slice(0, 7) === monthKey) out.month++;
      run++;
      if(run > out.best) out.best = run;
    } else if(i > 0){
      run = 0;                                   /* today unfinished is not a break */
    }
  }
  out.run = streakOf(mid);
  return out;
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
/* Wax seal stamped over the screen when every chore for the day is done. */
function showSeal(m){
  var s = el("seal");
  if(!s) return;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){
    toast(streakOf(m.id) > 1 ? streakOf(m.id) + " days in a row" : "Service complete");
    return;
  }
  var st = streakOf(m.id);
  s.innerHTML =
    '<div class="disc"><div class="ring"></div><div>' +
      '<span class="big">Service</span>' +
      '<span class="big">Complete</span>' +
      '<span class="sm">' + esc(m.name) + '</span>' +
      (st > 1 ? '<span class="yr">' + st + ' days running</span>' : '') +
    '</div></div>';
  s.classList.remove("on");
  void s.offsetWidth;
  s.classList.add("on");
  setTimeout(function(){ s.classList.remove("on"); s.innerHTML = ""; }, 2600);
}

var toastT;
function toast(msg){
  var t = el("toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toastT); toastT = setTimeout(function(){ t.classList.remove("show"); }, 2600);
}

/* =============== LOCK SCREEN =============== */
var pad = {
  entry: "",          /* digits typed so far */
  stage: "",          /* enter | create | confirm */
  member: null,
  firstTry: "",       /* while creating, the first of the two entries */
  msg: "",            /* error text, shown until the next keypress */
  onDone: null
};

function padOpen(member, stage, onDone){
  pad.entry = ""; pad.stage = stage; pad.member = member;
  pad.firstTry = ""; pad.msg = ""; pad.onDone = onDone;
  el("lock").classList.add("on");
  document.body.style.overflow = "hidden";
  padPaint();
  if(jamLeft(member.id) > 0) jamShow(); else jamHide();
}
function padClose(){
  el("lock").classList.remove("on");
  document.body.style.overflow = "";
  pad.onDone = null;
  jamHide();
}

/* ---- the jammed state: the keypad is put away until the clock runs out ---- */
var jamTick = 0;
function jamShow(){
  var lock = el("lock");
  lock.classList.add("jammed");
  clearInterval(jamTick);
  var paint = function(){
    var left = jamLeft(pad.member.id);
    if(left <= 0){ jamHide(); return; }
    el("jamTime").textContent = clockJam(left);
  };
  paint();
  jamTick = setInterval(paint, 250);
}
function jamHide(){
  clearInterval(jamTick); jamTick = 0;
  var lock = el("lock");
  if(lock) lock.classList.remove("jammed");
  if(pad.member && el("lock").classList.contains("on")) padPaint();
}
function padTitle(){
  if(pad.stage === "create")  return "Choose a PIN";
  if(pad.stage === "confirm") return "Enter it again";
  return "Enter your PIN";
}
function padHint(){
  if(pad.msg) return pad.msg;          /* an error outranks the stage hint */
  if(pad.stage === "create")  return "Four digits. You will need this every time you open the app.";
  if(pad.stage === "confirm") return "Just to be sure you will remember it.";
  return "";
}
function padPaint(){
  var m = pad.member;
  el("lockAv").innerHTML = avatar(m);
  el("lockName").textContent = m.name;
  el("lockTitle").textContent = padTitle();
  el("lockHint").textContent = padHint();
  var dots = el("lockDots");
  dots.innerHTML = "";
  for(var i=0;i<4;i++){
    dots.appendChild(h("i", i < pad.entry.length ? "on" : null));
  }
  el("lockSwitch").classList.toggle("hide", pad.stage !== "enter" || S.members.length < 2);
}
function padShake(msg){
  var box = el("lockBox");
  box.classList.remove("shake");
  void box.offsetWidth;
  box.classList.add("shake");
  tap([28, 70, 28]);
  pad.msg = msg || "";               /* stays up until they press a key */
  pad.entry = "";
  setTimeout(padPaint, 340);
}
function padPress(d){
  if(jamLeft(pad.member.id) > 0) return;   /* keys are dead while jammed */
  if(pad.entry.length >= 4) return;
  if(pad.msg){ pad.msg = ""; }       /* clear the error once they start again */
  pad.entry += d;
  tap(8);
  padPaint();
  if(pad.entry.length === 4) setTimeout(padSubmit, 160);
}
function padDelete(){
  if(jamLeft(pad.member.id) > 0) return;
  pad.entry = pad.entry.slice(0, -1);
  tap(6);
  padPaint();
}
function padSubmit(){
  var entered = pad.entry, m = pad.member;

  if(pad.stage === "create"){
    pad.firstTry = entered;
    pad.stage = "confirm";
    pad.entry = "";
    padPaint();
    return;
  }
  if(pad.stage === "confirm"){
    if(entered !== pad.firstTry){
      pad.stage = "create";
      pad.firstTry = "";
      padShake("Those did not match. Start again.");
      return;
    }
    setPin(m.id, entered).then(function(){
      var done = pad.onDone;
      padClose();
      toast("PIN saved");
      if(done) done();
    });
    return;
  }
  checkPin(m.id, entered).then(function(ok){
    if(ok){
      clearFails(m.id);                    /* clean slate on the way in */
      var done = pad.onDone;
      padClose();
      if(done) done();
      return;
    }
    var jammed = registerFail(m.id);
    if(jammed){
      pad.entry = "";
      tap([40, 80, 40, 80, 90]);
      jamShow();
      return;
    }
    var left = triesLeft(m.id);
    padShake("Wrong PIN. " + left + (left === 1 ? " try" : " tries") + " left.");
  });
}

/* Take over the app until the right PIN is entered. */
function lockApp(){
  var m = me();
  el("app").classList.add("hide");
  if(!hasPin(m.id)){
    padOpen(m, "create", function(){ el("app").classList.remove("hide"); renderAll(); show("home"); });
  } else {
    padOpen(m, "enter", function(){ el("app").classList.remove("hide"); renderAll(); show("home"); });
  }
}

/* Switching to another person goes through exactly the same gate as launching:
   their PIN, or choosing one if this device has never seen them. */
function switchTo(x){
  if(x.id === S.cfg.me) return;
  el("app").classList.add("hide");
  enterAs(x);
}

/* =============== SCREEN: HOUSEHOLD =============== */
function renderHome(){
  var root = el("s-home"); root.innerHTML = "";
  var m = me(), p = progressFor(m.id, today), st = streakOf(m.id);

  var card = h("div","me");
  card.innerHTML =
    '<div class="top">' +
      '<span class="av lg" style="--ac:'+m.color+'">'+avatar(m)+'</span>' +
      '<div><div class="nm">'+esc(m.name)+'</div><div class="as">'+esc(assignName(m.id, today.getDay()))+'</div></div>' +
    '</div>' +
    '<div class="bar'+(p.pct===100?" good":"")+'"><i style="width:'+p.pct+'%"></i></div>' +
    '<div class="stats">' +
      '<div class="stat"><b class="num">'+(p.total-p.done)+'</b><small>Left today</small></div>' +
      '<div class="stat"><b class="num">'+p.pct+'%</b><small>Done</small></div>' +
      '<div class="stat"><b class="num">'+st+'</b><small>Day streak</small></div>' +
    '</div>';
  root.appendChild(card);

  var hs = historyStats(m.id);
  var rec = h("div","sec");
  rec.appendChild(h("div","cap","The Record"));
  var rg = h("div","group");
  rg.appendChild(h("div","ledgerstats",
    '<div class="lstat"><b class="num">'+hs.month+'</b><small>Full days this month</small></div>' +
    '<div class="lstat"><b class="num">'+hs.best+'</b><small>Best run ever</small></div>' +
    '<div class="lstat"><b class="num">'+hs.done+'</b><small>Full days all time</small></div>'));
  rec.appendChild(rg);
  root.appendChild(rec);

  var sec = h("div","sec");
  sec.appendChild(h("div","cap","Household"));
  var g = h("div","group");
  S.members.forEach(function(x){
    var xp = progressFor(x.id, today);
    var r = h("button","row tap");
    r.innerHTML =
      '<span class="av" style="--ac:'+x.color+'">'+avatar(x)+'</span>' +
      '<span class="grow"><span class="t">'+esc(x.name)+'</span>' +
      '<span class="s">'+(xp.total ? xp.done+" of "+xp.total+" done" : "Nothing due today")+
        (streakOf(x.id) > 1 ? ' &middot; '+streakOf(x.id)+' day streak' : '')+'</span></span>' +
      '<span class="rt">'+xp.pct+'%' +
        (x.id === S.cfg.me ? '<small>You</small>' : '<small>Locked</small>')+'</span>';
    r.addEventListener("click", function(){ switchTo(x); });
    g.appendChild(r);
  });
  sec.appendChild(g);
  root.appendChild(sec);

  var em = h("div","sec");
  var ready = p.total > 0 && p.done === p.total;

  if(ready){
    /* A line to go with the report - "sorry, the bin was already out" and such. */
    var nf = h("div","field");
    var note = h("textarea","inp");
    note.id = "noteBox";
    note.rows = 2;
    note.placeholder = "Anything to tell Dad? (optional)";
    note.value = noteDraft;
    note.style.minHeight = "62px";
    note.addEventListener("input", function(){ noteDraft = note.value; });
    nf.appendChild(note);
    em.appendChild(nf);
  }

  var btn = h("button","btn", svg("mail") + "<span>Tell Dad I'm Done</span>");
  btn.id = "sendBtn";
  btn.disabled = !ready;
  if(btn.disabled) btn.innerHTML = "<span>" + (p.total ? (p.total-p.done)+" chore"+(p.total-p.done===1?"":"s")+" left" : "Nothing due today") + "</span>";
  btn.addEventListener("click", emailDad);
  em.appendChild(btn);
  if(ready){
    em.appendChild(h("div","sendnote", mailKey()
      ? "Goes straight to Dad's inbox."
      : "Opens your mail app. Add an email key in Settings to send it automatically."));
  }
  root.appendChild(em);
}
function assignName(mid, dow){
  var n = choresFor(mid, dow).length;
  if(!n) return DOWFULL[dow] + " -- nothing due";
  return DOWFULL[dow] + " -- " + n + " chore" + (n===1?"":"s");
}

/* =============== SCREEN: CHORES =============== */
var choreDow = today.getDay();
function renderChores(justPlated){
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
    /* anything struck off tonight drops out of the count entirely */
    var counted = items.filter(function(c){ return !excusedFor(ds, m.id, c.id); });
    var dn = counted.filter(function(c){ return isDone(ds, m.id, c.id); }).length;
    var whole = counted.length > 0 && dn === counted.length;
    var offHere = items.length - counted.length;
    var sec = h("div","sec");
    var cap = h("div","cap");
    cap.innerHTML = esc(cat) +
      '<span class="rt">' +
        (counted.length === 0 ? "all off tonight"
         : whole ? "complete"
         : dn + " of " + counted.length) +
        (offHere && counted.length ? " &middot; " + offHere + " off" : "") +
      '</span>';
    sec.appendChild(cap);
    var g = h("div","group");
    /* brass sweeps across only on the check-off that finished the course */
    if(whole && justPlated === cat) g.classList.add("plated");
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
  var off = excusedFor(ds, m.id, c.id);
  var row = h("div","row" + (on && !off ? " done" : ""));
  var subs = (c.subs && c.subs.length) ? c.subs.length + " steps" : "";
  var bits = [off && off.why ? off.why : null, c.notes, subs].filter(Boolean);

  var chk = h("button","chk", TICK);
  chk.setAttribute("role","checkbox");
  chk.setAttribute("aria-checked", String(on));
  chk.setAttribute("aria-label", (on?"Uncheck ":"Check off ") + c.title);
  chk.addEventListener("click", function(){
    var nowOn = !isDone(ds, m.id, c.id);
    if(nowOn){                       /* ring ripples outward from the tap */
      chk.classList.remove("ring");
      void chk.offsetWidth;
      chk.classList.add("ring");
    }
    if(nowOn && c.proof){ capturePhoto(function(p){ commit(nowOn, p); }); return; }
    commit(nowOn, null);
  });
  function commit(nowOn, photo){
    setDone(ds, m.id, c, nowOn, photo);
    tap(nowOn ? 14 : 8);
    if(nowOn) soundTick(); else soundUntick();

    var p = progressFor(m.id, shift(startOfWeek(today), choreDow));
    var finished = live && p.total > 0 && p.done === p.total;
    if(finished){ bumpStreak(m.id); tap([16,60,16,60,32]); }

    /* did this tick finish the course it belongs to? excused ones do not count */
    var mates = choresFor(m.id, choreDow).filter(function(x){
      return x.cat === c.cat && !excusedFor(ds, m.id, x.id);
    });
    var courseDone = nowOn && mates.every(function(x){ return isDone(ds, m.id, x.id); });
    if(courseDone && !finished) setTimeout(soundCourse, 140);
    if(finished) setTimeout(soundDone, 200);

    /* Let the tick finish drawing before the list re-renders under it. */
    setTimeout(function(){
      var justPlated = nowOn ? c.cat : null;
      renderChores(justPlated); renderHome(); renderChart(); headline(); syncPips();
      if(finished) showSeal(m);
    }, nowOn ? 260 : 0);
  }

  if(off){
    /* struck off tonight: the check goes away entirely so it cannot be ticked */
    row.classList.add("off");
    row.appendChild(h("span","offmark", "\u2014"));
  } else {
    row.appendChild(chk);
  }
  row.appendChild(h("span","tile sm", svg(c.icon)));

  /* name .... served, the way a menu sets a line */
  var mid = h("span","mid");
  var line = h("span","line",
    '<span class="t">' + esc(c.title) + '</span>' +
    '<span class="leader"></span>' +
    '<span class="served">' + (off ? "Off tonight" : on ? "Served" : "") + '</span>');
  mid.appendChild(line);
  if(bits.length) mid.appendChild(h("span","s", esc(bits.join(" \u00B7 "))));
  mid.style.cursor = "pointer";
  mid.addEventListener("click", function(){ openDetail(c, m, ds); });
  row.appendChild(mid);

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
      r.innerHTML = '<span class="av xs" style="--ac:'+mm.color+'">'+avatar(mm)+'</span>' +
        '<span class="grow"><span class="t">'+esc(mm.name)+'</span>' +
        '<span class="s">'+a.days.map(function(d){ return DOW[d]; }).join(", ")+'</span></span>';
      wg.appendChild(r);
    });
    who.appendChild(wg);
    body.appendChild(who);

    /* Striking a chore off for one night. Parent mode only, on purpose. */
    var off = excusedFor(ds, m.id, c.id);
    var exSec = h("div","sec");
    exSec.appendChild(h("div","cap","Tonight"));
    var exg = h("div","group");
    var exRow = h("div","row static");
    exRow.innerHTML = '<span class="grow"><span class="t">' +
      (off ? "Off tonight" : "Needed tonight") + '</span><span class="s">' +
      (off
        ? (off.why ? esc(off.why) : "Struck off, so it will not count against the day.")
        : "Strike it off if it genuinely cannot be done, so it does not cost the streak.") +
      '</span></span>';
    if(isAdmin()){
      var exBtn = h("button","mini" + (off ? " acc" : ""), off ? "Put back" : "Strike off");
      exBtn.addEventListener("click", function(){
        if(off){
          setExcused(ds, m.id, c.id, null);
          closeSheet(); renderAll(); toast("Back on the list");
          return;
        }
        var why = prompt("Why is it off tonight? (optional)", "");
        if(why === null) return;
        setExcused(ds, m.id, c.id, why);
        closeSheet(); renderAll(); toast("Struck off for tonight");
      });
      exRow.appendChild(exBtn);
    }
    exg.appendChild(exRow);
    exSec.appendChild(exg);
    if(!isAdmin()) exSec.appendChild(h("div","empty",
      "Only a parent can strike a chore off, or everyone would strike off the lot."));
    body.appendChild(exSec);

    if(isAdmin()){
      var ed = h("button","btn ghost","Edit this chore");
      ed.addEventListener("click", function(){ closeSheet(); setTimeout(function(){ openChore(c); }, 260); });
      body.appendChild(ed);
    }
  }, null);
}

/* =============== SCREEN: CHART =============== */
var chartScope = "me";
var chartView = "week";
var monthCursor = null;        /* first of the month being looked at */

function renderChart(){
  var root = el("s-chart"); root.innerHTML = "";

  var vsec = h("div","sec");
  var vseg = h("div","seg");
  [["week","This week"],["month","By month"]].forEach(function(o){
    var b = h("button", null, o[1]);
    b.setAttribute("aria-pressed", String(chartView === o[0]));
    b.addEventListener("click", function(){ chartView = o[0]; renderChart(); });
    vseg.appendChild(b);
  });
  vsec.appendChild(vseg);
  root.appendChild(vsec);

  if(chartView === "month"){ renderMonth(root); return; }

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
      else if(excusedFor(ds, r.m.id, r.c.id)) mark = "<span class='mark skip'>&mdash;</span>";
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
    "<span><span class='mark skip'>&mdash;</span> Off</span>" +
    "<span><i class='mark dot'></i> Not due</span>"));
  root.appendChild(wrap);
}

/* A month at a glance: one square per day, filled when everything was done,
   ringed when some of it was, faint when nothing was ever due. */
function renderMonth(root){
  var m = me();
  var cur = monthCursor || new Date(today.getFullYear(), today.getMonth(), 1);
  monthCursor = cur;
  var since = S.cfg.since || dkey(today);

  var head = h("div","monthhead");
  var prev = h("button","monthnav","\u2039");
  prev.setAttribute("aria-label","Previous month");
  prev.addEventListener("click", function(){
    monthCursor = new Date(cur.getFullYear(), cur.getMonth() - 1, 1);
    renderChart();
  });
  var next = h("button","monthnav","\u203A");
  next.setAttribute("aria-label","Next month");
  var atThisMonth = cur.getFullYear() === today.getFullYear() && cur.getMonth() === today.getMonth();
  next.disabled = atThisMonth;
  next.addEventListener("click", function(){
    monthCursor = new Date(cur.getFullYear(), cur.getMonth() + 1, 1);
    renderChart();
  });
  head.appendChild(prev);
  head.appendChild(h("div","monthname",
    cur.toLocaleDateString(undefined, {month:"long", year:"numeric"})));
  head.appendChild(next);
  root.appendChild(head);

  var wrap = h("div","chartwrap");
  var grid = h("div","monthgrid");
  ["S","M","T","W","T","F","S"].forEach(function(d, i){
    grid.appendChild(h("div","monthdow", d));
  });

  var firstDow = new Date(cur.getFullYear(), cur.getMonth(), 1).getDay();
  for(var b = 0; b < firstDow; b++) grid.appendChild(h("div","monthcell blank"));

  var daysIn = new Date(cur.getFullYear(), cur.getMonth() + 1, 0).getDate();
  var full = 0, partial = 0;
  for(var d = 1; d <= daysIn; d++){
    var date = new Date(cur.getFullYear(), cur.getMonth(), d);
    var ds = dkey(date);
    var cell = h("div","monthcell");
    var label = h("span","mday", String(d));

    if(ds > dkey(today) || ds < since){
      cell.classList.add("out");                 /* future, or before the app existed */
    } else {
      var p = progressFor(m.id, date);
      if(!p.total) cell.classList.add("none");
      else if(p.done === p.total){ cell.classList.add("full"); full++; }
      else if(p.done > 0){ cell.classList.add("part"); partial++; }
      else cell.classList.add("miss");
      cell.title = p.total ? p.done + " of " + p.total + " done" : "Nothing due";
    }
    if(sameDay(date, today)) cell.classList.add("today");
    cell.appendChild(label);
    grid.appendChild(cell);
  }
  wrap.appendChild(grid);
  wrap.appendChild(h("div","legend",
    "<span><i class='key full'></i> All done</span>" +
    "<span><i class='key part'></i> Some done</span>" +
    "<span><i class='key miss'></i> None</span>"));
  root.appendChild(wrap);

  var sum = h("div","sec");
  sum.appendChild(h("div","cap", esc(m.name) + " this month"));
  var sg = h("div","group");
  sg.appendChild(h("div","ledgerstats",
    '<div class="lstat"><b class="num">' + full + '</b><small>Full days</small></div>' +
    '<div class="lstat"><b class="num">' + partial + '</b><small>Part days</small></div>' +
    '<div class="lstat"><b class="num">' + streakOf(m.id) + '</b><small>Streak now</small></div>'));
  sum.appendChild(sg);
  root.appendChild(sum);
}

/* =============== SCREEN: SETTINGS =============== */
function renderSettings(){
  var root = el("s-set"); root.innerHTML = "";

  var who = h("div","sec");
  who.appendChild(h("div","cap","This device"));
  var wg = h("div","group");
  S.members.forEach(function(x){
    var r = h("div","row" + (S.cfg.me === x.id ? " static" : " tap"));
    var main = h("button","rowmain");
    main.innerHTML =
      '<span class="av" style="--ac:'+x.color+'">'+avatar(x)+'</span>' +
      '<span class="grow"><span class="t">'+esc(x.name)+'</span><span class="s">Age '+x.age+
        (hasPin(x.id) ? ' &middot; PIN set' : ' &middot; no PIN yet')+'</span></span>' +
      (S.cfg.me === x.id ? '<span class="chip ok">Using</span>' : '<span class="chev"></span>');
    main.addEventListener("click", function(){ switchTo(x); });
    r.appendChild(main);
    if(isAdmin()){
      var ed = h("button","mini","Edit");
      ed.addEventListener("click", function(e){ e.stopPropagation(); openMember(x); });
      r.appendChild(ed);
    }
    wg.appendChild(r);
  });
  who.appendChild(wg);
  if(isAdmin()){
    var addM = h("button","btn ghost", svg("plus") + "<span>Add someone</span>");
    addM.addEventListener("click", function(){ openMember(null); });
    who.appendChild(addM);
  }

  /* ---- your own PIN: first thing in Settings, so it is easy to find ---- */
  var mine = h("div","sec");
  mine.appendChild(h("div","cap","Your PIN"));
  var pg = h("div","group");
  var myRow = h("div","row static");
  myRow.innerHTML = '<span class="grow"><span class="t">' + esc(me().name) + '\u2019s PIN</span>' +
    '<span class="s">' + (hasPin(me().id)
      ? "Asked for every time the app opens"
      : "Not set yet") + '</span></span>';
  var changeBtn = h("button","mini acc", hasPin(me().id) ? "Change" : "Set PIN");
  changeBtn.addEventListener("click", function(){
    var m = me();
    if(!hasPin(m.id)){ padOpen(m, "create", function(){ renderSettings(); }); return; }
    /* prove the old one first, then pick a new one */
    padOpen(m, "enter", function(){
      padOpen(m, "create", function(){ renderSettings(); });
    });
  });
  myRow.appendChild(changeBtn);
  pg.appendChild(myRow);
  mine.appendChild(pg);
  mine.appendChild(h("div","empty",
    "Five wrong tries locks the pad for a minute, and each lock after that lasts " +
    "twice as long. It keeps a brother or sister out \u2014 it is not a real password."));
  root.appendChild(mine);
  root.appendChild(who);

  /* ---- parent mode ----
     Editing is always behind a PIN. Whoever sets this up claims the parent PIN
     first; after that nobody can add, edit or delete a chore without it, so a
     brother or sister can only ever tick things off. */
  var mode = h("div","sec");
  mode.appendChild(h("div","cap","Parent mode"));
  var mg = h("div","group");
  var rr = h("div","row static");
  rr.innerHTML = '<span class="grow"><span class="t">Parent mode</span>' +
    '<span class="s">' + (parentPinSet()
      ? "Needs the parent PIN. Lets you add and edit chores, and reset a forgotten PIN."
      : "Not claimed yet \u2014 turning it on will ask you to choose the parent PIN.") +
    '</span></span>';
  var tog = h("button","mini" + (isAdmin() ? " acc" : ""), isAdmin() ? "On" : "Off");
  tog.addEventListener("click", function(){
    if(isAdmin()){
      S.cfg.role = "kid"; save("cfg"); renderAll();
      toast("Parent mode off");
      return;
    }
    padOpen(PARENT, parentPinSet() ? "enter" : "create", function(){
      S.cfg.role = "admin"; save("cfg"); renderAll(); show("set");
      toast(parentPinSet() ? "Parent mode on" : "Parent PIN claimed");
    });
  });
  rr.appendChild(tog);
  mg.appendChild(rr);

  var ppRow = h("div","row static");
  ppRow.innerHTML = '<span class="grow"><span class="t">Parent PIN</span><span class="s">' +
    (parentPinSet()
      ? "Set. Keep it to yourself \u2014 it is what stops the chore list being changed."
      : "Not set yet") + '</span></span>';
  var ppBtn = h("button","mini" + (parentPinSet() ? "" : " acc"), parentPinSet() ? "Change" : "Set");
  ppBtn.addEventListener("click", function(){
    if(!parentPinSet()){
      padOpen(PARENT, "create", function(){ renderSettings(); });
      return;
    }
    /* prove the old parent PIN before choosing a new one */
    padOpen(PARENT, "enter", function(){
      padOpen(PARENT, "create", function(){ renderSettings(); });
    });
  });
  ppRow.appendChild(ppBtn);
  mg.appendChild(ppRow);

  if(isAdmin()){
    S.members.forEach(function(x){
      if(!hasPin(x.id)) return;
      var jam = jamLeft(x.id);
      var rz = h("div","row static");
      rz.innerHTML = '<span class="grow"><span class="t">Reset ' + esc(x.name) + '\u2019s PIN</span>' +
        '<span class="s">' + (jam > 0
          ? "Locked out for another " + esc(humanJam(jam)) + " \u2014 this lifts it"
          : "Use this if they forget it") + '</span></span>';
      var rb = h("button","mini","Reset");
      rb.addEventListener("click", function(){
        if(!confirm("Clear " + x.name + "'s PIN? They will choose a new one next time.")) return;
        clearPin(x.id);
        clearFails(x.id);      /* lift any lockout too, or they stay stuck out */
        renderSettings();
        toast(x.name + "'s PIN cleared");
      });
      rz.appendChild(rb);
      mg.appendChild(rz);
    });
  }
  mode.appendChild(mg);
  root.appendChild(mode);

  /* ---- sending ---- */
  var mail = h("div","sec");
  mail.appendChild(h("div","cap","Sending"));

  var f = h("div","field", "<label>Dad's email</label>");
  var inp = h("input","inp");
  inp.type = "email"; inp.placeholder = "dad@example.com"; inp.value = S.cfg.dad || "";
  inp.setAttribute("autocomplete","email");
  inp.addEventListener("change", function(){ S.cfg.dad = inp.value.trim(); save("cfg"); renderHome(); });
  f.appendChild(inp);
  mail.appendChild(f);

  var kf = h("div","field", "<label>Email key</label>");
  var kin = h("input","inp");
  kin.type = "text"; kin.placeholder = "paste the key from web3forms.com";
  kin.value = S.cfg.mailKey || "";
  kin.setAttribute("autocomplete","off");
  kin.setAttribute("autocapitalize","off");
  kin.setAttribute("spellcheck","false");
  kin.addEventListener("change", function(){
    S.cfg.mailKey = kin.value.trim(); save("cfg"); renderSettings(); renderHome();
  });
  kf.appendChild(kin);
  mail.appendChild(kf);

  var status = h("div","group");
  var srow = h("div","row static");
  srow.innerHTML = '<span class="grow"><span class="t">' +
    (mailKey() ? "Sends on its own" : "Opens your mail app") + '</span>' +
    '<span class="s">' + (mailKey()
      ? "Tapping the button emails Dad straight away. The key decides where it lands, so it has to be made with his address."
      : "Without a key the button hands the note to your mail app and you press send yourself.") +
    '</span></span>';
  status.appendChild(srow);
  mail.appendChild(status);

  if(mailKey()){
    var testBtn = h("button","btn ghost","Send a test email");
    testBtn.addEventListener("click", function(){
      if(testBtn.disabled) return;
      testBtn.disabled = true; testBtn.textContent = "Sending...";
      postReport({
        subject: "Test from the chore board",
        body: "This is a test from " + me().name + "'s chore board.\n\n" +
              "If this arrived, the button on the Household screen will reach you too."
      }).then(function(){
        testBtn.textContent = "Test sent";
        toast("Test sent - check Dad's inbox");
      }).catch(function(err){
        testBtn.disabled = false; testBtn.textContent = "Send a test email";
        toast("Failed: " + (err && err.message ? err.message : "no connection"));
      });
    });
    mail.appendChild(testBtn);
  }

  mail.appendChild(h("div","empty",
    "The key is free from web3forms.com. Put Dad's address in when you make it, " +
    "then paste the key here on each phone. It is stored only on this device."));
  root.appendChild(mail);

  /* ---- sound ---- */
  var snd = h("div","sec");
  snd.appendChild(h("div","cap","Sound"));
  var sg = h("div","group");
  var sRow = h("div","row static");
  sRow.innerHTML = '<span class="grow"><span class="t">Chimes</span>' +
    '<span class="s">A tick as you go, and a little fanfare when the day is finished</span></span>';
  var sBtn = h("button","mini" + (S.cfg.sound ? " acc" : ""), S.cfg.sound ? "On" : "Off");
  sBtn.addEventListener("click", function(){
    S.cfg.sound = !S.cfg.sound; save("cfg");
    if(S.cfg.sound) soundCourse();        /* let them hear what they just turned on */
    renderSettings();
  });
  sRow.appendChild(sBtn);
  sg.appendChild(sRow);
  snd.appendChild(sg);
  root.appendChild(snd);

  /* ---- backup ---- */
  var bk = h("div","sec");
  bk.appendChild(h("div","cap","Backup"));
  var bg = h("div","group");
  var bRow = h("div","row static");
  bRow.innerHTML = '<span class="grow"><span class="t">Save a copy</span>' +
    '<span class="s">Everything is kept on this phone only. Clearing Safari\u2019s website data would wipe it.</span></span>';
  bg.appendChild(bRow);
  bk.appendChild(bg);

  var saveBtn = h("button","btn ghost","Save a backup file");
  saveBtn.addEventListener("click", downloadBackup);
  bk.appendChild(saveBtn);

  var copyBtn = h("button","mini","Copy backup as text");
  copyBtn.style.cssText = "width:100%;min-height:44px";
  copyBtn.addEventListener("click", copyBackup);
  bk.appendChild(copyBtn);

  var restoreBtn = h("button","btn ghost","Restore from a backup");
  restoreBtn.addEventListener("click", function(){
    if(!isAdmin()){ toast("Parent mode only"); return; }
    restoreFromFile();
  });
  bk.appendChild(restoreBtn);

  var pasteBtn = h("button","mini","Restore from pasted text");
  pasteBtn.style.cssText = "width:100%;min-height:44px";
  pasteBtn.addEventListener("click", function(){
    if(!isAdmin()){ toast("Parent mode only"); return; }
    var text = prompt("Paste the backup text here:", "");
    if(text) finishRestore(text);
  });
  bk.appendChild(pasteBtn);
  root.appendChild(bk);

  var danger = h("div","sec");
  danger.appendChild(h("div","cap","Data"));
  var d1 = h("button","btn ghost","Reset chores to the family poster");
  d1.addEventListener("click", function(){
    if(!isAdmin()){ toast("Parent mode only"); return; }
    if(!confirm("Replace all chores with the original poster list? Check-offs are kept.")) return;
    S.chores = seedChores(); save("chores"); renderAll(); toast("Chores restored");
  });
  var d2 = h("button","btn danger","Erase everything on this device");
  d2.addEventListener("click", function(){
    if(!isAdmin()){ toast("Parent mode only"); return; }
    if(!confirm("Erase all chores, check-offs, streaks and PINs on this device? This cannot be undone.")) return;
    ["members","chores","done","photos","streak","pins","fails","excused","cfg"].forEach(function(k){ store.removeItem("cs2."+k); });
    location.reload();
  });
  danger.appendChild(d1); danger.appendChild(d2);
  root.appendChild(danger);

  root.appendChild(h("div","empty","Everything stays on this device. Nothing is uploaded."));
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
    assign:[], notes:"", subs:[], proof:false
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

    var f6 = h("div","field",'<label>Who does it, and on which days</label>');
    var wg = h("div","group who");
    S.members.forEach(function(mm){
      var days = daysFor(c, mm.id);
      var rowEl = h("div","subrow");
      rowEl.style.flexWrap = "wrap";
      var head = h("div", null, "");
      head.style.cssText = "display:flex;align-items:center;gap:10px;width:100%";
      head.innerHTML = '<span class="av xs" style="--ac:'+mm.color+'">'+avatar(mm)+'</span>' +
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
      var dup = h("button","btn ghost","Duplicate this chore");
      dup.addEventListener("click", function(){
        var copy = JSON.parse(JSON.stringify(c));
        copy.id = "c" + Date.now();
        copy.title = c.title + " (copy)";
        S.chores.push(copy);
        save("chores"); closeSheet(); renderAll();
        toast("Copied - edit the new one");
        setTimeout(function(){ openChore(copy); }, 320);
      });
      body.appendChild(dup);

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


/* == who is in the family == */
function openMember(member){
  var isNew = !member;
  var m = member ? JSON.parse(JSON.stringify(member)) : {
    id: "m" + Date.now(), name: "", age: 10, color: SWATCH[4]
  };

  openSheet(isNew ? "Add someone" : "Edit " + member.name, function(body){
    var f1 = h("div","field","<label>Name</label>");
    var t = h("input","inp");
    t.value = m.name; t.placeholder = "Their name";
    t.setAttribute("autocapitalize","words");
    t.addEventListener("input", function(){ m.name = t.value; });
    f1.appendChild(t); body.appendChild(f1);

    var f2 = h("div","field","<label>Age</label>");
    var a = h("input","inp");
    a.type = "number"; a.min = "1"; a.max = "120"; a.value = m.age;
    a.setAttribute("inputmode","numeric");
    a.addEventListener("input", function(){ m.age = parseInt(a.value, 10) || 0; });
    f2.appendChild(a); body.appendChild(f2);

    var f3 = h("div","field","<label>Colour</label>");
    var sw = h("div","swatches");
    SWATCH.forEach(function(col){
      var b = h("button","sw"); b.type = "button";
      b.style.setProperty("--c", col);
      b.setAttribute("aria-pressed", String(m.color === col));
      b.setAttribute("aria-label","Colour " + col);
      b.addEventListener("click", function(){
        m.color = col;
        sw.querySelectorAll(".sw").forEach(function(x){ x.setAttribute("aria-pressed","false"); });
        b.setAttribute("aria-pressed","true");
      });
      sw.appendChild(b);
    });
    f3.appendChild(sw); body.appendChild(f3);

    body.appendChild(h("div","empty",
      "The medallion takes the first letter of the name, so renaming re-letters it."));

    if(!isNew && S.members.length > 1){
      var del = h("button","btn danger","Remove " + esc(member.name));
      del.addEventListener("click", function(){
        if(!confirm("Remove " + member.name + "?\n\nTheir PIN, streak and check-offs go too, and they come off every chore. This cannot be undone.")) return;
        removeMember(member.id);
        closeSheet(); renderAll();
        toast(member.name + " removed");
      });
      body.appendChild(del);
    }
  }, function(){
    if(!m.name.trim()){ toast("Give them a name"); return false; }
    m.name = m.name.trim();
    if(isNew){
      S.members.push(m);
    } else {
      S.members = S.members.map(function(x){ return x.id === m.id ? m : x; });
    }
    save("members"); renderAll();
    toast(isNew ? m.name + " added" : "Saved");
    return true;
  });
}

/* Pulls someone out cleanly: off every chore, and their own records with them. */
function removeMember(id){
  S.members = S.members.filter(function(x){ return x.id !== id; });
  S.chores.forEach(function(c){
    c.assign = c.assign.filter(function(a){ return a.m !== id; });
  });
  /* a chore nobody is assigned to would sit in the list doing nothing */
  S.chores = S.chores.filter(function(c){ return c.assign.length; });
  delete S.pins[id]; delete S.fails[id]; delete S.streak[id];
  Object.keys(S.done).forEach(function(d){
    Object.keys(S.done[d]).forEach(function(k){ if(k.indexOf(id + "|") === 0) delete S.done[d][k]; });
  });
  Object.keys(S.excused).forEach(function(d){
    Object.keys(S.excused[d]).forEach(function(k){ if(k.indexOf(id + "|") === 0) delete S.excused[d][k]; });
  });
  if(S.cfg.me === id) S.cfg.me = S.members.length ? S.members[0].id : null;
  save();
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

/* =============== BACKUP =============== */
/* Everything lives in this browser, and clearing Safari's website data wipes it
   without warning - streaks, history, the lot. This is the escape hatch. */
var BACKUP_KEYS = ["members","chores","done","photos","streak","pins","fails","excused","cfg"];

function makeBackup(){
  /* Members and chores sit in memory until something edits them, so flush
     everything first - otherwise a backup taken before any edit would restore
     without a chore list. */
  save();
  var bundle = {app:"family-chore-board", version:1, saved:new Date().toISOString(), data:{}};
  BACKUP_KEYS.forEach(function(k){
    var raw = store.getItem("cs2." + k);
    if(raw !== null) bundle.data[k] = raw;      /* kept as strings; no re-parsing to corrupt */
  });
  return JSON.stringify(bundle);
}

function backupFilename(){
  return "chore-board-" + dkey(new Date()) + ".json";
}

function downloadBackup(){
  var text = makeBackup();
  try{
    var blob = new Blob([text], {type:"application/json"});
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = backupFilename();
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function(){ URL.revokeObjectURL(url); }, 4000);
    toast("Backup saved");
  }catch(e){
    toast("Couldn't save a file - use Copy instead");
  }
}

function copyBackup(){
  var text = makeBackup();
  function fallback(){
    var ta = document.createElement("textarea");
    ta.value = text; ta.style.cssText = "position:fixed;top:-1000px";
    document.body.appendChild(ta); ta.select();
    try{ document.execCommand("copy"); toast("Backup copied - paste it somewhere safe"); }
    catch(e){ toast("Couldn't copy on this device"); }
    document.body.removeChild(ta);
  }
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(function(){
      toast("Backup copied - paste it somewhere safe");
    }, fallback);
  } else fallback();
}

/* Returns an error string, or null when the restore went through. */
function applyBackup(text){
  var bundle;
  try{ bundle = JSON.parse(text); }
  catch(e){ return "That is not a backup file."; }
  if(!bundle || bundle.app !== "family-chore-board" || !bundle.data){
    return "That file is not from this app.";
  }
  var keys = Object.keys(bundle.data);
  if(!keys.length) return "That backup is empty.";

  BACKUP_KEYS.forEach(function(k){ store.removeItem("cs2." + k); });
  keys.forEach(function(k){
    if(BACKUP_KEYS.indexOf(k) === -1) return;    /* ignore anything unexpected */
    store.setItem("cs2." + k, bundle.data[k]);
  });
  return null;
}

function restoreFromFile(){
  var inp = document.createElement("input");
  inp.type = "file";
  inp.accept = "application/json,.json";
  inp.style.cssText = "position:fixed;left:-9999px";
  document.body.appendChild(inp);
  inp.addEventListener("change", function(){
    var f = inp.files && inp.files[0];
    document.body.removeChild(inp);
    if(!f) return;
    var fr = new FileReader();
    fr.onload = function(){ finishRestore(String(fr.result)); };
    fr.onerror = function(){ toast("Couldn't read that file"); };
    fr.readAsText(f);
  });
  inp.click();
}

function finishRestore(text){
  if(!confirm("Restoring replaces everything on this device - chores, check-offs, streaks and PINs.\n\nCarry on?")) return;
  var err = applyBackup(text);
  if(err){ toast(err); return; }
  toast("Restored - reopening");
  setTimeout(function(){ location.reload(); }, 700);
}

/* =============== EMAIL =============== */
/* Builds the note home. `brief` keeps it inside a mailto URL, which some mail
   apps drop past ~2000 characters; the real send has no such limit. */
function buildReport(brief){
  var m = me(), dow = today.getDay();
  var list = choresFor(m.id, dow);
  var when = today.toLocaleDateString(undefined, {month:"long", day:"numeric", year:"numeric"});
  var head = m.name + " finished every chore for " + DOWFULL[dow] + ", " + when + ".\n";
  var st = streakOf(m.id);
  if(st > 1) head += "Streak: " + st + " days in a row\n";

  var ds = dkey(today);
  var offList = list.filter(function(c){ return excusedFor(ds, m.id, c.id); });
  var doneList = list.filter(function(c){ return !excusedFor(ds, m.id, c.id); });

  var cats = [], byCat = {};
  doneList.forEach(function(c){ if(!byCat[c.cat]){ byCat[c.cat]=[]; cats.push(c.cat); } byCat[c.cat].push(c); });

  var lines = [head];
  var note = (noteDraft || "").trim();
  if(note) lines.push("A note from " + m.name + ":\n" + note + "\n");
  cats.forEach(function(cat){
    lines.push(cat.toUpperCase());
    byCat[cat].forEach(function(c){ lines.push("- " + c.title); });
    lines.push("");
  });
  /* say plainly what was struck off, so it never looks like a quiet skip */
  if(offList.length){
    lines.push("OFF TONIGHT");
    offList.forEach(function(c){
      var why = excusedFor(ds, m.id, c.id);
      lines.push("- " + c.title + (why && why.why ? " (" + why.why + ")" : ""));
    });
    lines.push("");
  }
  var body = lines.join("\n");

  if(brief && encodeURIComponent(body).length > 1750){
    var short = [head];
    cats.forEach(function(cat){ short.push("- " + cat + ": all " + byCat[cat].length + " done"); });
    short.push("", "Full checklist is in the app.");
    body = short.join("\n");
  }
  return {
    subject: m.name + " finished all chores - " + DOWFULL[dow] + ", " +
             today.toLocaleDateString(undefined, {month:"short", day:"numeric"}),
    body: body,
    count: list.length
  };
}

var noteDraft = "";      /* the optional line to Dad, cleared once it is sent */

function mailKey(){ return (S.cfg.mailKey || "").trim(); }

/* Hands the note to Web3Forms, which posts it on to whichever address the key
   was created with. The key is typed into Settings rather than baked into the
   source, so it never appears in the public repo and each device carries its own. */
function postReport(report){
  return fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {"Content-Type": "application/json", "Accept": "application/json"},
    body: JSON.stringify({
      access_key: mailKey(),
      subject: report.subject,
      from_name: "Family Chore Board",
      replyto: (S.cfg.dad || "").trim() || undefined,
      name: me().name,
      message: report.body
    })
  }).then(function(res){
    return res.json().catch(function(){ throw new Error("Mail service sent back something unreadable"); });
  }).then(function(j){
    if(!j || !j.success) throw new Error((j && j.message) || "The mail service refused it");
    return j;
  });
}

function mailtoFallback(report){
  var addr = (S.cfg.dad || "").trim();
  if(!addr){ show("set"); toast("Add Dad's email in Settings first"); return; }
  window.location.href = "mailto:" + encodeURIComponent(addr) +
    "?subject=" + encodeURIComponent(report.subject) + "&body=" + encodeURIComponent(report.body);
  toast("Opening your mail app - press send");
}

var sending = false;
function emailDad(){
  if(sending) return;                       /* one tap, one email */
  var m = me(), dow = today.getDay();
  if(!choresFor(m.id, dow).length){ toast("Nothing due today"); return; }

  /* No key set up yet, so fall back to handing it to the mail app. */
  if(!mailKey()){ mailtoFallback(buildReport(true)); return; }

  var btn = el("sendBtn");
  var report = buildReport(false);
  sending = true;
  if(btn){ btn.disabled = true; btn.innerHTML = "<span>Sending...</span>"; }

  postReport(report).then(function(){
    sending = false;
    if(btn){ btn.innerHTML = "<span>Sent to Dad</span>"; btn.classList.add("sent"); }
    tap([14, 60, 14]);
    toast("Sent to Dad");
    noteDraft = "";                       /* it has gone; do not send it twice */
    S.cfg.lastSent = Date.now(); save("cfg");
    setTimeout(renderHome, 2200);
  }).catch(function(err){
    sending = false;
    if(btn){ btn.disabled = false; }
    renderHome();
    toast("Couldn't send: " + (err && err.message ? err.message : "no connection"));
    /* Offer the old route rather than leaving them stuck. */
    setTimeout(function(){
      if(confirm("Couldn't send it automatically.\n\nOpen your mail app instead?")) mailtoFallback(buildReport(true));
    }, 400);
  });
}

/* =============== TABS =============== */
var TABS = [
  {id:"home",   label:"Household", icon:"home"},
  {id:"chores", label:"Chores",    icon:"list"},
  {id:"chart",  label:"Chart",     icon:"chart"},
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

/* =============== SOUND =============== */
/* Synthesised rather than loaded: no audio files to download, works offline,
   and iOS only lets audio start from a real tap, which a check-off always is. */
var audioCtx = null;
function tone(freq, dur, gain, type){
  if(!S.cfg.sound) return;
  try{
    var AC = window.AudioContext || window.webkitAudioContext;
    if(!AC) return;
    if(!audioCtx) audioCtx = new AC();
    if(audioCtx.state === "suspended") audioCtx.resume();
    var t = audioCtx.currentTime;
    var o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.type = type || "sine";
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain || 0.05, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (dur || 0.16));
    o.connect(g); g.connect(audioCtx.destination);
    o.start(t); o.stop(t + (dur || 0.16) + 0.03);
  }catch(e){ /* silence is an acceptable failure */ }
}
function soundTick(){ tone(920, 0.10, 0.04); }
function soundUntick(){ tone(420, 0.09, 0.03); }
function soundCourse(){ tone(660, 0.13, 0.05); setTimeout(function(){ tone(990, 0.18, 0.05); }, 95); }
function soundDone(){                       /* a small fanfare, C-E-G-C */
  [523.25, 659.25, 783.99, 1046.5].forEach(function(f, i){
    setTimeout(function(){ tone(f, 0.4, 0.06, "triangle"); }, i * 115);
  });
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
  el("hEyebrow").textContent = DOWFULL[today.getDay()] + " \u00B7 " +
    today.toLocaleDateString(undefined, {month:"long", day:"numeric"});

  /* The board is set like a menu: a course title, then a line in italics. */
  var TITLE = {
    home:   'Today for <span class="soft">' + esc(m.name) + '</span>',
    chores: 'The <span class="soft">Menu</span>',
    chart:  'The <span class="soft">Week</span>',
    money:  'The <span class="soft">Account</span>',
    set:    'The <span class="soft">Arrangements</span>'
  };
  el("hTitle").innerHTML = TITLE[current] || esc(t.label);

  el("hSub").textContent = !p.total
    ? "Nothing served today"
    : p.done === p.total
      ? "Every course complete"
      : p.done + " of " + p.total + " courses complete";
}

/* =============== BOOT =============== */
function renderAll(){
  renderHome(); renderChores(); renderChart(); renderSettings();
  buildCatList(); headline(); syncPips();
}

/* The way in, every single launch: see the profiles, tap yours, enter your PIN.
   Nobody lands inside somebody else's list by default. */
function showPicker(){
  var g = el("pickWho");
  g.innerHTML = "";
  S.members.forEach(function(m){
    var jam = jamLeft(m.id);
    var status = jam > 0 ? "Locked " + humanJam(jam)
               : hasPin(m.id) ? "PIN set"
               : "Set a PIN";
    var b = h("button", "pickrow");
    b.type = "button";
    b.innerHTML =
      '<span class="av">' + avatar(m) + '</span>' +
      '<span><span class="nm">' + esc(m.name) + '</span>' +
      '<span class="st' + (jam > 0 ? " warn" : "") + '">' + esc(status) + '</span></span>' +
      '<span class="go" aria-hidden="true"></span>';
    b.addEventListener("click", function(){ enterAs(m); });
    g.appendChild(b);
  });
  el("welcome").classList.add("on");
  el("app").classList.add("hide");
  document.body.style.overflow = "hidden";
  tap(6);
}
function hidePicker(){
  el("welcome").classList.remove("on");
  document.body.style.overflow = "";
}

/* Tapping a name: prove the PIN (or choose one the first time), then go in. */
function enterAs(m){
  var first = !hasPin(m.id);
  hidePicker();
  padOpen(m, first ? "create" : "enter", function(){
    S.cfg.me = m.id;
    if(S.cfg.role !== "admin") S.cfg.role = "kid";
    save("cfg");
    el("app").classList.remove("hide");
    renderAll();
    show(requestedTab() || "home");
    /* Say once, on the way in, where the PIN lives from now on. */
    if(!S.cfg.pinTold){
      S.cfg.pinTold = 1; save("cfg");
      setTimeout(function(){ toast("Change your PIN any time in Settings"); }, 900);
    }
  });
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

/* Category suggestions for the chore editor, derived from the chores that
   actually exist. Kept out of index.html so the served page carries no names. */
function buildCatList(){
  var dl = el("catlist");
  if(!dl) return;
  var seen = {}, out = [];
  S.chores.forEach(function(c){ if(c.cat && !seen[c.cat]){ seen[c.cat] = 1; out.push(c.cat); } });
  dl.innerHTML = out.map(function(c){ return '<option value="' + esc(c) + '"></option>'; }).join("");
}

/* Parent mode never survives a restart. Leaving it latched on would mean a
   sibling picking the phone up later inherits the ability to edit chores. */
if(S.cfg.role === "admin"){ S.cfg.role = "kid"; }
if("parentPin" in S.cfg){ delete S.cfg.parentPin; }   /* moved into S.pins */
save("cfg");

buildTabs();
buildCatList();
/* Render behind the picker so the app is ready the moment a PIN lands. */
if(S.cfg.me) renderAll();
showPicker();

function backToPicker(){
  padClose();
  el("app").classList.add("hide");
  showPicker();
}
el("lockSwitch").addEventListener("click", backToPicker);
el("jamSwitch").addEventListener("click", backToPicker);
el("lockDel").addEventListener("click", padDelete);
for(var pk = 0; pk <= 9; pk++){
  (function(d){
    el("key" + d).addEventListener("click", function(){ padPress(String(d)); });
  })(pk);
}
document.addEventListener("keydown", function(e){
  if(!el("lock").classList.contains("on")) return;
  if(/^[0-9]$/.test(e.key)) padPress(e.key);
  else if(e.key === "Backspace") padDelete();
});

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
