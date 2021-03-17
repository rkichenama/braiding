(()=>{"use strict";var e={96:(e,t,r)=>{var a=r(294),l=r(935);const n=(e,t)=>new Array(e).fill(t),s=e=>e?"o":"u",c=e=>{if((e=e.trim()).includes(" "))return[].concat(...e.split(" ").map(c));let t=1,r=!0;try{const[a]=e.match(/\d+/)||[];t=Number(a||1),r=/^o/.test(e)}catch(e){}return n(t,r)},o=e=>{const t=e.split("").map(Number).map(s);t.push("f");let r=t.shift(),a=1;return t.forEach((e=>{r.slice(-1)===e?a+=1:(r+=`${a>1?a:""} ${e}`,a=1)})),r.replace(/ f/g,"")},i=(e,t,r,a,l,n)=>[e,t,r,a,l,n.map((e=>e.map((e=>parseInt(e.map((e=>e?1:0)).join(""),2).toString(36))).join("|"))).join(";")].join(","),m="changeInputs",p="initPattern",u="toggleOver",h="replaceState",g={[h]:(e,{payload:t})=>t,[m]:(e,{payload:t})=>{const r={...e,...t};return g.initPattern(r)},[p]:(e,{payload:t}={payload:{}})=>{const r={...e,...t},{left:a,right:l,rows:s,rightBase:o,leftBase:i}=r,[m,p]=[i,o].map((e=>c(e))),u=n(s,!1).map((e=>[n(a,!0).map(((e,t)=>m[t%m.length])),n(l,!0).map(((e,t)=>p[t%p.length]))]));return{...r,pattern:u}},[u]:(e,{payload:t})=>{const{row:r,side:a,nub:l,over:n}=t;return{...e,pattern:e.pattern.map(((e,t)=>e.map(((e,s)=>e.map(((e,c)=>t===r&&s===a&&c===l?n:e))))))}}},f=({rows:e=24,left:t=12,right:r=12,leftClr:a="#ff00ff",leftBase:l="u4 o4",rightClr:n="#00ffff",rightBase:s="u4 o4",pattern:c=[[],[]]})=>({rows:e,left:t,right:r,leftClr:a,leftBase:l,rightClr:n,rightBase:s,pattern:c}),d=(e,t)=>{const r=g[t.type];return r?(e=>{const{rows:t,leftClr:r,rightClr:a,leftBase:l,rightBase:n,left:s,right:o}=e;return location.hash=`#${t}/${s}/${o}/${r.slice(1)}/${a.slice(1)}/${c(l).map((e=>Number(e))).join("")}/${c(n).map((e=>Number(e))).join("")}`,e})(r(e,t)):e},E={rows:24,left:8,right:8,leftClr:"#333333",leftBase:"u4 o4",rightClr:"#088",rightBase:"u4 o4",pattern:[[],[]]},v=a.createContext(E),C=v,b=({children:e})=>{const[t,r]=(l=E,(0,a.useReducer)(d,l,f));var l;return a.useEffect((()=>{(e=>{let t={};try{if(location.hash.length>1){const[e,r,a,l,n,s,c]=location.hash.slice(1).split("/");t={rows:Number(e),left:Number(r),right:Number(a),leftClr:`#${l}`,rightClr:`#${n}`,leftBase:o(s),rightBase:o(c),pattern:[[],[]]}}}catch(e){}finally{e({type:p,payload:{...E,...t}})}})(r)}),[]),a.createElement(v.Provider,{value:{...t,dispatch:r}},e)},y=()=>{const{dispatch:e,rows:t,left:r,right:l,leftClr:n,leftBase:s,rightClr:c,rightBase:o,pattern:p}=a.useContext(C),u=a.useRef(void 0),g=a.useCallback(((t,r=(e=>e))=>a=>{e({type:m,payload:{[t]:r(a.target.value)}})}),[e]),f=a.useCallback((()=>{const{current:t}=u,r=t.value.trim();if(r.length)try{const{rows:t,left:a,right:l,leftClr:n,rightClr:s,pattern:c}=(e=>{const[t,r,a,l,n,s]=e.split(","),c=[Number(r),Number(a)];return{rows:t,left:r,right:a,leftClr:l,rightClr:n,pattern:s.split(";").map((e=>e.split("|").map(((e,t)=>parseInt(e,36).toString(2).padStart(c[t],"0").split("").map((e=>!!parseInt(e,2)))))))}})(r);e({type:h,payload:{...E,rows:t,left:a,right:l,leftClr:n,rightClr:s,pattern:c}})}catch(e){console.log(e)}}),[u.current]);return a.createElement("div",{id:"controls",className:"x1 y1 w3 h12 as-table"},a.createElement("div",{className:"row"},a.createElement("label",null,"Weave Rows"),a.createElement("input",{type:"range",max:60,min:4,value:t,step:4,onChange:g("rows",(e=>Number(e)))}),a.createElement("span",null,t)),a.createElement("hr",{className:"w12"}),a.createElement("div",{className:"row"},a.createElement("label",null,"Strands on Left"),a.createElement("input",{type:"range",max:16,min:4,value:r,onChange:g("left",(e=>Number(e)))}),a.createElement("span",null,r),a.createElement("label",null,"Left Color(s)"),a.createElement("input",{type:"color",value:n,onChange:g("leftClr")}),a.createElement("label",null,"Base Pattern"),a.createElement("input",{type:"text",value:s,onChange:e=>{e.target.value.length>=1&&g("leftBase")(e)}})),a.createElement("hr",{className:"w12"}),a.createElement("div",{className:"row"},a.createElement("label",null,"Strands on Right"),a.createElement("input",{type:"range",max:16,min:4,value:l,onChange:g("right",(e=>Number(e)))}),a.createElement("span",null,l),a.createElement("label",null,"Right Color(s)"),a.createElement("input",{type:"color",value:c,onChange:g("rightClr")}),a.createElement("label",null,"Base Pattern"),a.createElement("input",{type:"text",value:o,onChange:e=>{e.target.value.length>=1&&g("rightBase")(e)}})),a.createElement("hr",{className:"w12"}),a.createElement("div",{className:"row"},a.createElement("label",{className:"full"},"Current Pattern"),a.createElement("textarea",{rows:5,readOnly:!0,value:i(t,r,l,n,c,p),onChange:()=>{}})),a.createElement("hr",{className:"w12"}),a.createElement("div",{className:"row"},a.createElement("textarea",{rows:5,ref:u}),a.createElement("button",{className:"full",onClick:f},"Import Pattern")))},w=(e,t)=>{let[r,...a]=e,l=[{dir:s(r),count:1}];return a.forEach((e=>{r===e?l[l.length-1].count++:(r=e,l.push({dir:s(r),count:1}))})),t&&(l=l.reverse()),l.map((({dir:e,count:t})=>`${e}${t}`)).join(" ").replace(/1/g,"")},x=e=>t=>{const r=a.useContext(C);return a.createElement(e,Object.assign({},t,r))},N=({onClick:e=(()=>{}),isOver:t})=>a.createElement("div",Object.assign({className:"nub right- left- "+(t?"over":"under")},{onClick:e})),B=({className:e,track:t=[],loc:r,setOver:l})=>a.createElement("div",Object.assign({},{className:e},{"data-dir":w(t)}),t.map(((e,t)=>a.createElement(N,Object.assign({key:t},{isOver:e},{onClick:()=>l(...r,t,!e)}))))),$=x((({dispatch:e,pattern:t=[]})=>t.map((([t,r],l)=>a.createElement(a.Fragment,{key:l},a.createElement(B,{className:"left-hand",loc:[l,0],track:t,setOver:(t,r,a,l)=>{e({type:u,payload:{row:t,side:r,nub:a,over:l}})}}),a.createElement(B,{className:"right-hand",loc:[l,1],track:r,setOver:(t,r,a,l)=>{e({type:u,payload:{row:t,side:r,nub:a,over:l}})}})))))),k=x((({left:e,right:t,leftClr:r,rightClr:l})=>a.createElement("div",{id:"weave",style:{"--clr-left":r,"--clr-right":l,gridTemplateColumns:`calc((24px * ${e}) + (2px * ${e-1})) calc((24px * ${t}) + (2px * ${t-1}))`,transform:`translateY(calc(12px + (28px * 0.7071 * ${Math.max(t,e)})))`}},a.createElement($,null)))),O=()=>a.createElement("div",{id:"sheet",className:"x4 y1 w9 h12",style:{overflowY:"auto"}},a.createElement(k,null)),j=()=>a.createElement(b,null,a.createElement(y,null),a.createElement(O,null));(e=>{const t=e.createElement("main");t.style.display="contents",e.body.appendChild(t),(0,l.render)(a.createElement(j,null),t)})(document)}},t={};function r(a){if(t[a])return t[a].exports;var l=t[a]={exports:{}};return e[a](l,l.exports,r),l.exports}r.m=e,r.x=e=>{},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={514:0},t=[[96,216]],a=e=>{},l=(l,n)=>{for(var s,c,[o,i,m,p]=n,u=0,h=[];u<o.length;u++)c=o[u],r.o(e,c)&&e[c]&&h.push(e[c][0]),e[c]=0;for(s in i)r.o(i,s)&&(r.m[s]=i[s]);for(m&&m(r),l&&l(n);h.length;)h.shift()();return p&&t.push.apply(t,p),a()},n=self.webpackChunkbraiding=self.webpackChunkbraiding||[];function s(){for(var a,l=0;l<t.length;l++){for(var n=t[l],s=!0,c=1;c<n.length;c++){var o=n[c];0!==e[o]&&(s=!1)}s&&(t.splice(l--,1),a=r(r.s=n[0]))}return 0===t.length&&(r.x(),r.x=e=>{}),a}n.forEach(l.bind(null,0)),n.push=l.bind(null,n.push.bind(n));var c=r.x;r.x=()=>(r.x=c||(e=>{}),(a=s)())})(),r.x()})();