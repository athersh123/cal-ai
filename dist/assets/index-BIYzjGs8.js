(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const t of n)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function r(n){const t={};return n.integrity&&(t.integrity=n.integrity),n.referrerPolicy&&(t.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?t.credentials="include":n.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(n){if(n.ep)return;n.ep=!0;const t=r(n);fetch(n.href,t)}})();const ze="nutrivision_state";function U(){return new Date().toISOString().split("T")[0]}function F(e){const i=new Date;return i.setDate(i.getDate()-e),i.toISOString().split("T")[0]}function Ce(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}function me(e,i){const r={...e};for(const a of Object.keys(i))i[a]&&typeof i[a]=="object"&&!Array.isArray(i[a])&&e[a]&&typeof e[a]=="object"&&!Array.isArray(e[a])?r[a]=me(e[a],i[a]):r[a]=i[a];return r}function Le(){const e=U(),i={},r={},a={breakfast:[{id:"eggs",name:"Eggs",category:"protein",calories:156,protein:12.6,carbs:1.2,fat:10.6,fiber:0,serving:2,servingUnit:"large",icon:"🥚",confidence:.98},{id:"oatmeal",name:"Oatmeal",category:"grain",calories:154,protein:5.3,carbs:27,fat:2.6,fiber:4,serving:234,servingUnit:"g",icon:"🥣",confidence:.95},{id:"banana",name:"Banana",category:"fruit",calories:105,protein:1.3,carbs:27,fat:.4,fiber:3.1,serving:1,servingUnit:"medium",icon:"🍌",confidence:.98},{id:"coffee_black",name:"Black Coffee",category:"beverage",calories:2,protein:.3,carbs:0,fat:0,fiber:0,serving:240,servingUnit:"ml",icon:"☕",confidence:.97},{id:"greek_yogurt",name:"Greek Yogurt",category:"dairy",calories:100,protein:17,carbs:6,fat:.7,fiber:0,serving:170,servingUnit:"g",icon:"🥛",confidence:.95},{id:"bread_wheat",name:"Wheat Bread",category:"grain",calories:79,protein:4,carbs:15,fat:1,fiber:1.9,serving:1,servingUnit:"slice",icon:"🍞",confidence:.96},{id:"pancakes",name:"Pancakes",category:"meal",calories:280,protein:8,carbs:40,fat:10,fiber:1.5,serving:3,servingUnit:"pieces",icon:"🥞",confidence:.96}],lunch:[{id:"chicken_breast",name:"Chicken Breast",category:"protein",calories:165,protein:31,carbs:0,fat:3.6,fiber:0,serving:100,servingUnit:"g",icon:"🍗",confidence:.96},{id:"white_rice",name:"White Rice",category:"grain",calories:206,protein:4.3,carbs:45,fat:.4,fiber:.6,serving:158,servingUnit:"g",icon:"🍚",confidence:.95},{id:"caesar_salad",name:"Caesar Salad",category:"meal",calories:180,protein:7,carbs:8,fat:14,fiber:3,serving:1,servingUnit:"bowl",icon:"🥗",confidence:.94},{id:"sandwich",name:"Turkey Sandwich",category:"meal",calories:350,protein:24,carbs:35,fat:12,fiber:3,serving:1,servingUnit:"sandwich",icon:"🥪",confidence:.95},{id:"broccoli",name:"Broccoli",category:"vegetable",calories:55,protein:3.7,carbs:11,fat:.6,fiber:5.1,serving:150,servingUnit:"g",icon:"🥦",confidence:.96}],dinner:[{id:"salmon",name:"Salmon Fillet",category:"protein",calories:208,protein:20,carbs:0,fat:13,fiber:0,serving:100,servingUnit:"g",icon:"🐟",confidence:.95},{id:"pasta",name:"Pasta (cooked)",category:"grain",calories:220,protein:8.1,carbs:43,fat:1.3,fiber:2.5,serving:140,servingUnit:"g",icon:"🍝",confidence:.94},{id:"beef_steak",name:"Beef Steak",category:"protein",calories:271,protein:26,carbs:0,fat:18,fiber:0,serving:100,servingUnit:"g",icon:"🥩",confidence:.95},{id:"sweet_potato",name:"Sweet Potato",category:"vegetable",calories:103,protein:2.3,carbs:24,fat:.1,fiber:3.8,serving:1,servingUnit:"medium",icon:"🍠",confidence:.94},{id:"grilled_chicken_salad",name:"Grilled Chicken Salad",category:"meal",calories:320,protein:35,carbs:12,fat:15,fiber:4,serving:1,servingUnit:"bowl",icon:"🥗",confidence:.94}],snacks:[{id:"almonds",name:"Almonds",category:"snack",calories:164,protein:6,carbs:6,fat:14,fiber:3.5,serving:28,servingUnit:"g",icon:"🥜",confidence:.94},{id:"apple",name:"Apple",category:"fruit",calories:95,protein:.5,carbs:25,fat:.3,fiber:4.4,serving:1,servingUnit:"medium",icon:"🍎",confidence:.97},{id:"protein_bar",name:"Protein Bar",category:"snack",calories:210,protein:20,carbs:22,fat:7,fiber:3,serving:1,servingUnit:"bar",icon:"🍫",confidence:.92}]};function n(p,u){return[...p].sort(()=>Math.random()-.5).slice(0,u).map(c=>({...c,mealId:Ce()}))}for(let p=0;p<7;p++){const u=F(p);i[u]={breakfast:n(a.breakfast,p===0?3:2+Math.floor(Math.random()*2)),lunch:n(a.lunch,2+Math.floor(Math.random()*2)),dinner:p===0?[]:n(a.dinner,2+Math.floor(Math.random()*2)),snacks:Math.random()>.3?n(a.snacks,1+Math.floor(Math.random()*2)):[]},r[u]=1500+Math.floor(Math.random()*1100)}r[e]=1200;const t=[];for(let p=6;p>=0;p--)t.push({date:F(p),weight:parseFloat((72.5-p*.08+(Math.random()*.4-.2)).toFixed(1))});let s=0;for(const p of Object.keys(i))for(const u of["breakfast","lunch","dinner","snacks"])s+=i[p][u].length;return{profile:{name:"Alex",age:28,height:175,weight:72,goal:"maintain",avatar:null},goals:{calories:2200,protein:150,carbs:250,fat:75,water:2500},meals:i,water:r,weightHistory:t,achievements:[{id:"streak_3",unlockedAt:F(2)},{id:"meals_10",unlockedAt:F(3)},{id:"weight_1",unlockedAt:F(5)},{id:"scan_1",unlockedAt:F(4)}],streak:{current:7,best:7,lastLogDate:U()},settings:{theme:"dark",notifications:!0,reminders:!0},onboarded:!0,scanCount:3,totalMealsLogged:s}}function Me(){return{profile:{name:"Alex",age:28,height:175,weight:72,goal:"maintain",avatar:null},goals:{calories:2200,protein:150,carbs:250,fat:75,water:2500},meals:{},water:{},weightHistory:[],achievements:[],streak:{current:0,best:0,lastLogDate:null},settings:{theme:"dark",notifications:!0,reminders:!0},onboarded:!1,scanCount:0,totalMealsLogged:0,session:null,users:[],userProfiles:{}}}function qe(){return(x.session||"").toString().trim().toLowerCase()}function _e(){try{const i=localStorage.getItem(ze);if(i){const r=JSON.parse(i);return me(Me(),r)}}catch(i){console.warn("[Store] Failed to parse localStorage, using defaults.",i)}const e=Le();return te(e),e}function te(e){try{localStorage.setItem(ze,JSON.stringify(e))}catch(i){console.error("[Store] Failed to save to localStorage",i)}}let x=_e();const le=new Set;function re(){for(const e of le)try{e(x)}catch(i){console.error("[Store] Listener error",i)}}const y={getState(){return x},setState(e){x=me(x,e),te(x),re()},subscribe(e){return le.add(e),()=>le.delete(e)},getProfile(){return x.profile},setProfile(e){const i={...x.profile,...e},r=qe();if(r){y.setState({profile:i,userProfiles:{...x.userProfiles||{},[r]:i}});return}y.setState({profile:i})},getGoals(){return x.goals},setGoals(e){y.setState({goals:{...x.goals,...e}})},addMeal(e,i,r){const a=e||U(),n=x.meals[a]||{breakfast:[],lunch:[],dinner:[],snacks:[]},t=r.map(p=>({...p,mealId:p.mealId||Ce()})),s=[...n[i],...t];y.setState({meals:{...x.meals,[a]:{...n,[i]:s}},totalMealsLogged:(x.totalMealsLogged||0)+t.length}),y.updateStreak()},removeMeal(e,i,r){const a=e||U(),n=x.meals[a];if(!n||!n[i])return;const t=n[i].filter(s=>s.mealId!==r);y.setState({meals:{...x.meals,[a]:{...n,[i]:t}}})},getMeals(e){const i=e||U();return x.meals[i]||{breakfast:[],lunch:[],dinner:[],snacks:[]}},getTodayMeals(){return y.getMeals(U())},getDayTotals(e){const i=y.getMeals(e),r={calories:0,protein:0,carbs:0,fat:0};for(const a of["breakfast","lunch","dinner","snacks"])for(const n of i[a])r.calories+=n.calories||0,r.protein+=n.protein||0,r.carbs+=n.carbs||0,r.fat+=n.fat||0;return{calories:Math.round(r.calories),protein:Math.round(r.protein),carbs:Math.round(r.carbs),fat:Math.round(r.fat)}},getTodayTotals(){return y.getDayTotals(U())},getWeekData(){const e=[];for(let i=6;i>=0;i--){const r=F(i),a=y.getDayTotals(r),n=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],t=new Date(r+"T12:00:00");e.push({date:r,label:n[t.getDay()],...a})}return e},getMonthData(){const e=[];for(let i=29;i>=0;i--){const r=F(i),a=y.getDayTotals(r);e.push({date:r,...a})}return e},addWater(e,i){const r=i||U(),a=x.water[r]||0;y.setState({water:{...x.water,[r]:a+e}})},getWater(e){const i=e||U();return x.water[i]||0},logWeight(e,i){const r=i||U(),a=[...x.weightHistory||[]],n=a.findIndex(t=>t.date===r);n>=0?a[n]={date:r,weight:e}:a.push({date:r,weight:e}),a.sort((t,s)=>t.date.localeCompare(s.date)),y.setState({weightHistory:a})},getWeightHistory(){return x.weightHistory||[]},getStreak(){return x.streak},updateStreak(){const e=U(),i={...x.streak},r=y.getMeals(e);if(!(r.breakfast.length+r.lunch.length+r.dinner.length+r.snacks.length>0)||i.lastLogDate===e)return;const n=F(1);i.lastLogDate===n?i.current+=1:i.lastLogDate!==e&&(i.current=1),i.lastLogDate=e,i.best=Math.max(i.best,i.current),y.setState({streak:i})},getUnlockedAchievements(){return x.achievements||[]},unlockAchievement(e){(x.achievements||[]).find(r=>r.id===e)||y.setState({achievements:[...x.achievements||[],{id:e,unlockedAt:U()}]})},incrementScanCount(){y.setState({scanCount:(x.scanCount||0)+1})},getScanCount(){return x.scanCount||0},getTotalMealsLogged(){return x.totalMealsLogged||0},isOnboarded(){return!!x.onboarded},completeOnboarding(){const e=Le();e.onboarded=!0,e.profile={...e.profile,...x.profile},e.goals={...e.goals,...x.goals},e.settings={...e.settings,...x.settings},x=e,te(x),re()},getTheme(){var e;return((e=x.settings)==null?void 0:e.theme)||"dark"},setTheme(e){y.setState({settings:{...x.settings,theme:e}})},resetState(){x=Me(),te(x),re()},login(e,i){const r=(x.users||[]).find(a=>a.username.toLowerCase()===e.toLowerCase());if(r&&r.password===i){const a=r.username.toLowerCase(),t=(x.userProfiles||{})[a]||{...x.profile,name:r.username};return y.setState({session:r.username,profile:t,userProfiles:{...x.userProfiles||{},[a]:t}}),!0}if((x.users||[]).length===0){const a={username:e,password:i},n=e.toLowerCase(),s=(x.userProfiles||{})[n]||{...x.profile,name:e};return y.setState({users:[a],session:e,profile:s,userProfiles:{...x.userProfiles||{},[n]:s}}),!0}return!1},signup(e,i){if((x.users||[]).some(p=>p.username.toLowerCase()===e.toLowerCase()))return!1;const a={username:e,password:i},n=e.toLowerCase(),s=(x.userProfiles||{})[n]||{...x.profile,name:e};return y.setState({users:[...x.users||[],a],session:e,profile:s,userProfiles:{...x.userProfiles||{},[n]:s}}),!0},logout(){y.setState({session:null})},isAuthenticated(){return!!x.session}},C={routes:{},currentRoute:null,previousRoute:null,container:null,onNavigate:null,init(e){this.container=e,window.addEventListener("hashchange",()=>{const i=window.location.hash.slice(1)||"home";this.navigate(i)})},register(e,{render:i,onEnter:r,onLeave:a,hideNav:n}){this.routes[e]={render:i,onEnter:r,onLeave:a,hideNav:n}},navigate(e,i={}){var n;const r=this.routes[e];if(!r){console.warn(`[Router] Route not found: ${e}`);return}if(this.currentRoute===e)return;if(this.previousRoute=this.currentRoute,this.currentRoute=e,this.previousRoute&&((n=this.routes[this.previousRoute])!=null&&n.onLeave))try{this.routes[this.previousRoute].onLeave()}catch(t){console.error(`[Router] Error in onLeave for route: ${this.previousRoute}`,t)}const a=i.transition||"fade";if(this.container.firstElementChild){const t=this.container.firstElementChild;t.classList.remove("screen-enter"),t.classList.add("screen-exit"),setTimeout(()=>{this._renderNewRoute(e,r,a)},200)}else this._renderNewRoute(e,r,a);window.location.hash.slice(1)!==e&&window.history.pushState(null,"",`#${e}`)},_renderNewRoute(e,i,r){this.container.innerHTML="";const a=document.createElement("div");if(a.className=`screen screen-${e} screen-enter screen-transition-${r}`,i.render(a),this.container.appendChild(a),this.onNavigate&&this.onNavigate(e),i.onEnter)try{i.onEnter()}catch(n){console.error(`[Router] Error in onEnter for route: ${e}`,n)}window.lucide&&window.lucide.createIcons()},back(){this.previousRoute?this.navigate(this.previousRoute,{transition:"slide-right"}):this.navigate("home")},getCurrentRoute(){return this.currentRoute}},G={init(){const e=y.getTheme()||"dark";this.set(e)},toggle(){const i=this.getCurrent()==="dark"?"light":"dark";return this.set(i),y.setTheme(i),i},set(e){document.documentElement.classList.add("theme-transitioning"),document.documentElement.setAttribute("data-theme",e);const i=document.querySelector('meta[name="theme-color"]');i&&i.setAttribute("content",e==="dark"?"#0a0a0f":"#f5f5f7"),setTimeout(()=>{document.documentElement.classList.remove("theme-transitioning")},400)},isDark(){return this.getCurrent()==="dark"},getCurrent(){return document.documentElement.getAttribute("data-theme")||"dark"}};function Pe(e="home"){const i=document.createElement("nav");return i.className="nav-bar",[{id:"home",label:"Home",icon:"home"},{id:"diary",label:"Diary",icon:"book-open"},{id:"scanner",label:"Scan",icon:"camera",isFab:!0},{id:"analytics",label:"Trends",icon:"bar-chart-3"},{id:"profile",label:"Profile",icon:"user"}].forEach(a=>{if(a.isFab){const n=document.createElement("button");n.className="nav-fab",n.setAttribute("aria-label","Scan food with AI camera"),n.innerHTML=`
        <div class="fab-circle">
          <i data-lucide="${a.icon}"></i>
        </div>
      `,n.addEventListener("click",()=>{C.navigate("scanner",{transition:"slide-up"})}),i.appendChild(n)}else{const n=document.createElement("button");n.className=`nav-item ${e===a.id?"active":""}`,n.innerHTML=`
        <i data-lucide="${a.icon}"></i>
        <span>${a.label}</span>
      `,n.addEventListener("click",()=>{let t="fade";e==="home"&&a.id==="profile"&&(t="slide-left"),e==="profile"&&a.id==="home"&&(t="slide-right"),C.navigate(a.id,{transition:t})}),i.appendChild(n)}}),i}function L({message:e,type:i="success",duration:r=3e3,icon:a=null}){const n=document.getElementById("toast-container");if(!n)return;const t=document.createElement("div");t.className=`toast toast-${i} glass-card animate-fadeInDown`,t.style.display="flex",t.style.alignItems="center",t.style.gap="12px",t.style.padding="12px 16px",t.style.borderRadius="var(--radius-md)",t.style.boxShadow="0 10px 30px rgba(0,0,0,0.2)",t.style.pointerEvents="auto";const p=a||{success:"check",error:"x",warning:"alert-triangle",info:"info"}[i]||"info";let u="var(--accent-teal)";i==="error"&&(u="var(--accent-red)"),i==="warning"&&(u="var(--accent-yellow)"),i==="info"&&(u="var(--accent-blue)"),t.style.borderLeft=`4px solid ${u}`,t.innerHTML=`
    <div class="toast-icon-circle" style="color: ${u}; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; background: rgba(255,255,255,0.05);">
      <i data-lucide="${p}" style="width: 14px; height: 14px;"></i>
    </div>
    <span class="toast-message" style="font-size: 0.85rem; font-weight: 500; color: var(--text-primary); flex: 1;">
      ${e}
    </span>
    <button class="toast-close" style="color: var(--text-secondary); opacity: 0.6; display: flex; align-items: center;" aria-label="Close notification">
      <i data-lucide="x" style="width: 14px; height: 14px;"></i>
    </button>
  `,n.appendChild(t),window.lucide&&window.lucide.createIcons();function l(){t.classList.remove("animate-fadeInDown"),t.classList.add("animate-fadeOut"),t.style.transform="translateY(-20px)",setTimeout(()=>{t.parentNode===n&&n.removeChild(t)},300)}const c=setTimeout(l,r);t.querySelector(".toast-close").addEventListener("click",d=>{d.stopPropagation(),clearTimeout(c),l()})}function De(e){e.innerHTML=`
    <div class="nv-auth login-screen">
      <div class="nv-auth-orb" style="top:-120px;left:-80px;width:320px;height:320px;background:rgba(108,92,231,0.35);"></div>
      <div class="nv-auth-orb" style="bottom:-100px;right:-60px;width:280px;height:280px;background:rgba(253,121,168,0.25);animation-delay:2s;"></div>
      
      <!-- Animated floating particles background -->
      <div class="floating-particles" style="position: absolute; inset:0; pointer-events:none; z-index: 2; overflow:hidden;"></div>

      <div style="width: 100%; max-width: 360px; z-index: 3; display: flex; flex-direction: column; align-items: center;">
        
        <!-- Logo Branding Header -->
        <div style="text-align: center; margin-bottom: 36px; animation: float 3s ease-in-out infinite;">
          <div style="width: 72px; height: 72px; border-radius: var(--radius-xl); background: var(--gradient-primary); border: 2px solid var(--glass-border); display: flex; align-items: center; justify-content: center; color: white; margin: 0 auto 16px auto; box-shadow: 0 10px 30px rgba(108, 92, 231, 0.35);">
            <i data-lucide="sparkles" style="width: 36px; height: 36px;"></i>
          </div>
          <h1 class="font-display" style="font-size: 2.1rem; font-weight: 900; color: var(--text-primary); margin:0; line-height: 1.15; letter-spacing: -0.5px;">
            NutriVision <span class="text-gradient" style="background: var(--gradient-protein); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">AI</span>
          </h1>
          <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 6px;">Your Intelligent Food Recognition Companion</p>
        </div>

        <!-- Credentials Card -->
        <div class="nv-auth-card nv-glass nv-glow-border login-form-card" style="margin-bottom: 24px;">
          <h3 class="font-display" style="font-size: 1.2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 20px;">Welcome Back</h3>
          
          <form id="login-form" style="display: flex; flex-direction: column; gap: 16px;">
            
            <div class="input-group">
              <label style="font-size: 0.7rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; display: block; margin-bottom: 6px; letter-spacing: 0.5px;">Username</label>
              <div style="position: relative; display: flex; align-items: center;">
                <i data-lucide="user" style="position: absolute; left: 14px; width: 16px; height: 16px; color: var(--text-secondary);"></i>
                <input type="text" id="login-username" required placeholder="alex" style="width:100%; padding: 12px 12px 12px 42px; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: var(--radius-md); color: var(--text-primary); outline: none; font-size: 0.9rem; transition: all var(--transition-fast);" />
              </div>
            </div>

            <div class="input-group" style="margin-bottom: 4px;">
              <label style="font-size: 0.7rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; display: block; margin-bottom: 6px; letter-spacing: 0.5px;">Password</label>
              <div style="position: relative; display: flex; align-items: center;">
                <i data-lucide="lock" style="position: absolute; left: 14px; width: 16px; height: 16px; color: var(--text-secondary);"></i>
                <input type="password" id="login-password" required placeholder="••••••••" style="width:100%; padding: 12px 12px 12px 42px; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: var(--radius-md); color: var(--text-primary); outline: none; font-size: 0.9rem; transition: all var(--transition-fast);" />
              </div>
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; height: 50px; font-size: 0.95rem; font-weight: 700; justify-content: center; box-shadow: var(--shadow-glow); margin-top: 10px;">
              Sign In
            </button>

          </form>
        </div>

        <!-- Footer Redirection Links -->
        <p style="font-size: 0.85rem; color: var(--text-secondary); text-align: center; margin-bottom: 16px;">
          Don't have an account? 
          <a href="#signup" style="color: var(--accent-teal); font-weight: 700; transition: color var(--transition-fast);" id="go-signup">Sign Up</a>
        </p>

        <button class="btn btn-ghost btn-guest-login" style="font-size: 0.8rem; font-weight: 600; color: var(--text-tertiary); text-decoration: underline; padding: 4px 8px;">
          Continue as Guest
        </button>

      </div>
    </div>
  `,window.lucide&&window.lucide.createIcons();const i=e.querySelector(".floating-particles");for(let t=0;t<20;t++){const s=document.createElement("div");s.style.position="absolute",s.style.width=`${Math.random()*8+4}px`,s.style.height=s.style.width,s.style.borderRadius="50%",s.style.background=Math.random()>.5?"var(--accent-teal)":"var(--accent-pink)",s.style.opacity=(Math.random()*.15+.05).toString(),s.style.left=`${Math.random()*100}%`,s.style.top=`${Math.random()*100}%`,s.style.animation=`float ${Math.random()*5+4}s ease-in-out infinite`,i.appendChild(s)}e.querySelectorAll(".input-field").forEach(t=>{t.addEventListener("focus",()=>{t.style.borderColor="var(--accent-teal)",t.style.background="rgba(0, 206, 201, 0.04)",t.style.boxShadow="0 0 10px rgba(0, 206, 201, 0.15)"}),t.addEventListener("blur",()=>{t.style.borderColor="var(--glass-border)",t.style.background="rgba(255,255,255,0.03)",t.style.boxShadow="none"})});const a=e.querySelector("#login-form"),n=e.querySelector(".login-form-card");a.addEventListener("submit",t=>{t.preventDefault();const s=e.querySelector("#login-username").value.trim(),p=e.querySelector("#login-password").value;y.login(s,p)?(L({message:`Successfully logged in as ${s}!`,type:"success"}),y.isOnboarded()?C.navigate("home",{transition:"fade"}):C.navigate("onboarding",{transition:"fade"})):(n.classList.add("animate-shake"),L({message:"Incorrect username or password. Try registering first!",type:"error"}),setTimeout(()=>{n.classList.remove("animate-shake")},500))}),e.querySelector(".btn-guest-login").addEventListener("click",()=>{y.setState({session:"Guest"}),L({message:"Welcome as Guest!",type:"info"}),y.isOnboarded()?C.navigate("home",{transition:"fade"}):C.navigate("onboarding",{transition:"fade"})}),e.querySelector("#go-signup").addEventListener("click",t=>{t.preventDefault(),C.navigate("signup",{transition:"slide-left"})})}function Ue(e){e.innerHTML=`
    <div class="signup-screen" style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100dvh; background: var(--bg-primary); padding: 24px; position: relative; overflow: hidden;">
      
      <!-- Glowing decorative ambient orbs -->
      <div style="position: absolute; top: -150px; right: -50px; width: 350px; height: 350px; background: radial-gradient(circle, rgba(0, 206, 201, 0.25) 0%, rgba(0,0,0,0) 70%); pointer-events: none; z-index: 1; animation: breathe 8s ease-in-out infinite;"></div>
      <div style="position: absolute; bottom: -120px; left: -50px; width: 320px; height: 320px; background: radial-gradient(circle, rgba(108, 92, 231, 0.2) 0%, rgba(0,0,0,0) 70%); pointer-events: none; z-index: 1; animation: breathe 8s ease-in-out infinite 3s;"></div>
      
      <!-- Animated floating particles background -->
      <div class="floating-particles" style="position: absolute; inset:0; pointer-events:none; z-index: 2; overflow:hidden;"></div>

      <div style="width: 100%; max-width: 360px; z-index: 3; display: flex; flex-direction: column; align-items: center;">
        
        <!-- Logo Branding Header -->
        <div style="text-align: center; margin-bottom: 28px; animation: float 3s ease-in-out infinite;">
          <div style="width: 72px; height: 72px; border-radius: var(--radius-xl); background: var(--gradient-primary); border: 2px solid var(--glass-border); display: flex; align-items: center; justify-content: center; color: white; margin: 0 auto 16px auto; box-shadow: 0 10px 30px rgba(108, 92, 231, 0.35);">
            <i data-lucide="sparkles" style="width: 36px; height: 36px;"></i>
          </div>
          <h1 class="font-display" style="font-size: 2.1rem; font-weight: 900; color: var(--text-primary); margin:0; line-height: 1.15; letter-spacing: -0.5px;">
            NutriVision <span class="text-gradient" style="background: var(--gradient-protein); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">AI</span>
          </h1>
          <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 6px;">Create your account to start tracking meals</p>
        </div>

        <!-- Registration Card -->
        <div class="card glass-card signup-form-card" style="width: 100%; padding: 24px; border-radius: var(--radius-xl); box-shadow: 0 20px 40px rgba(0,0,0,0.3); border: 1px solid var(--glass-border); margin-bottom: 24px;">
          <h3 class="font-display" style="font-size: 1.2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 16px;">Sign Up</h3>
          
          <form id="signup-form" style="display: flex; flex-direction: column; gap: 14px;">
            
            <div class="input-group">
              <label style="font-size: 0.7rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; display: block; margin-bottom: 4px; letter-spacing: 0.5px;">Username</label>
              <div style="position: relative; display: flex; align-items: center;">
                <i data-lucide="user" style="position: absolute; left: 14px; width: 16px; height: 16px; color: var(--text-secondary);"></i>
                <input type="text" id="signup-username" required placeholder="alex" style="width:100%; padding: 10px 12px 10px 42px; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: var(--radius-md); color: var(--text-primary); outline: none; font-size: 0.9rem; transition: all var(--transition-fast);" />
              </div>
            </div>

            <div class="input-group">
              <label style="font-size: 0.7rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; display: block; margin-bottom: 4px; letter-spacing: 0.5px;">Password</label>
              <div style="position: relative; display: flex; align-items: center;">
                <i data-lucide="lock" style="position: absolute; left: 14px; width: 16px; height: 16px; color: var(--text-secondary);"></i>
                <input type="password" id="signup-password" required placeholder="••••••••" style="width:100%; padding: 10px 12px 10px 42px; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: var(--radius-md); color: var(--text-primary); outline: none; font-size: 0.9rem; transition: all var(--transition-fast);" />
              </div>
            </div>

            <div class="input-group" style="margin-bottom: 4px;">
              <label style="font-size: 0.7rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; display: block; margin-bottom: 4px; letter-spacing: 0.5px;">Confirm Password</label>
              <div style="position: relative; display: flex; align-items: center;">
                <i data-lucide="lock" style="position: absolute; left: 14px; width: 16px; height: 16px; color: var(--text-secondary);"></i>
                <input type="password" id="signup-confirm-password" required placeholder="••••••••" style="width:100%; padding: 10px 12px 10px 42px; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: var(--radius-md); color: var(--text-primary); outline: none; font-size: 0.9rem; transition: all var(--transition-fast);" />
              </div>
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; height: 48px; font-size: 0.95rem; font-weight: 700; justify-content: center; box-shadow: var(--shadow-glow); margin-top: 8px;">
              Create Account
            </button>

          </form>
        </div>

        <!-- Redirect back to Sign In -->
        <p style="font-size: 0.85rem; color: var(--text-secondary); text-align: center; margin: 0;">
          Already have an account? 
          <a href="#login" style="color: var(--accent-teal); font-weight: 700; transition: color var(--transition-fast);" id="go-login">Sign In</a>
        </p>

      </div>
    </div>
  `,window.lucide&&window.lucide.createIcons();const i=e.querySelector(".floating-particles");for(let t=0;t<20;t++){const s=document.createElement("div");s.style.position="absolute",s.style.width=`${Math.random()*8+4}px`,s.style.height=s.style.width,s.style.borderRadius="50%",s.style.background=Math.random()>.5?"var(--accent-teal)":"var(--accent-pink)",s.style.opacity=(Math.random()*.15+.05).toString(),s.style.left=`${Math.random()*100}%`,s.style.top=`${Math.random()*100}%`,s.style.animation=`float ${Math.random()*5+4}s ease-in-out infinite`,i.appendChild(s)}e.querySelectorAll(".input-field").forEach(t=>{t.addEventListener("focus",()=>{t.style.borderColor="var(--accent-teal)",t.style.background="rgba(0, 206, 201, 0.04)",t.style.boxShadow="0 0 10px rgba(0, 206, 201, 0.15)"}),t.addEventListener("blur",()=>{t.style.borderColor="var(--glass-border)",t.style.background="rgba(255,255,255,0.03)",t.style.boxShadow="none"})});const a=e.querySelector("#signup-form"),n=e.querySelector(".signup-form-card");a.addEventListener("submit",t=>{t.preventDefault();const s=e.querySelector("#signup-username").value.trim(),p=e.querySelector("#signup-password").value,u=e.querySelector("#signup-confirm-password").value;if(p!==u){n.classList.add("animate-shake"),L({message:"Passwords do not match!",type:"error"}),setTimeout(()=>{n.classList.remove("animate-shake")},500);return}if(s.length<3){L({message:"Username must be at least 3 characters.",type:"warning"});return}y.signup(s,p)?(L({message:`Successfully registered account: ${s}!`,type:"success"}),C.navigate("onboarding",{transition:"fade"})):(n.classList.add("animate-shake"),L({message:`Username "${s}" is already taken!`,type:"error"}),setTimeout(()=>{n.classList.remove("animate-shake")},500))}),e.querySelector("#go-login").addEventListener("click",t=>{t.preventDefault(),C.navigate("login",{transition:"slide-right"})})}function je(e){let i=0,r=0,a=0;const n=[{id:"scan",title:"Scan Your Meals",subtitle:"with AI Vision",desc:"Point your camera at any food. Our AI instantly identifies ingredients and estimates full nutritional data in seconds.",gradient:"linear-gradient(135deg, #ff6b9d, #c0392b)",accentColor:"#ff6b9d",bgGlow:"rgba(255,107,157,0.15)",icon:"📸",features:[{icon:"⚡",text:"Instant food recognition"},{icon:"🎯",text:"95%+ accuracy rate"},{icon:"📚",text:"500+ foods in database"}]},{id:"track",title:"Track Macros",subtitle:"Effortlessly",desc:"Watch your animated rings fill up as you log meals. Monitor calories, protein, carbs and fat with beautiful real-time charts.",gradient:"linear-gradient(135deg, #00cec9, #0984e3)",accentColor:"#00cec9",bgGlow:"rgba(0,206,201,0.15)",icon:"📊",features:[{icon:"💧",text:"Water intake tracking"},{icon:"📈",text:"Weekly progress charts"},{icon:"🔥",text:"Calorie goals & streaks"}]},{id:"goals",title:"Customize",subtitle:"Your Goals",desc:"Set your personal targets. Our AI tailors your macro ratios based on your goal — lose fat, build muscle, or maintain.",gradient:"linear-gradient(135deg, #fdcb6e, #e17055)",accentColor:"#fdcb6e",bgGlow:"rgba(253,203,110,0.15)",icon:"🏆",features:[]}];function t(){const l=n[i],c=i===2;if(e.innerHTML=`
      <div class="onboarding-screen" style="display:flex;flex-direction:column;height:100dvh;background:var(--bg-primary);overflow:hidden;position:relative;">
        
        <!-- Background ambient glow -->
        <div style="position:absolute;inset:0;pointer-events:none;z-index:0;">
          <div style="position:absolute;top:-80px;left:50%;transform:translateX(-50%);width:400px;height:400px;background:${l.bgGlow};border-radius:50%;filter:blur(80px);opacity:0.8;transition:background 0.6s ease;"></div>
        </div>

        <!-- Top bar -->
        <div style="position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;padding:52px 24px 0;">
          <div style="display:flex;align-items:center;gap:7px;">
            <div style="width:28px;height:28px;border-radius:8px;background:${l.gradient};display:flex;align-items:center;justify-content:center;font-size:0.85rem;box-shadow:0 4px 12px ${l.bgGlow};">✦</div>
            <span class="font-display" style="font-size:1rem;font-weight:800;color:var(--text-primary);">NutriVision <span style="background:${l.gradient};-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">AI</span></span>
          </div>
          ${i<2?`
            <button class="btn-skip" style="font-size:0.82rem;font-weight:600;color:var(--text-tertiary);padding:5px 10px;border-radius:var(--radius-full);background:rgba(255,255,255,0.04);border:1px solid var(--glass-border);">Skip →</button>
          `:""}
        </div>

        <!-- Main slide content -->
        <div class="onboarding-slides-container" style="position:relative;z-index:2;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px 28px;overflow:hidden;">
          
          ${c?p(l):s(l)}

        </div>

        <!-- Footer -->
        <div style="position:relative;z-index:2;padding:0 24px calc(28px + env(safe-area-inset-bottom,0px));display:flex;flex-direction:column;align-items:center;gap:16px;">
          
          <!-- Step dots -->
          <div style="display:flex;align-items:center;gap:8px;">
            ${n.map((g,o)=>`
              <div style="height:6px;border-radius:var(--radius-full);background:${o===i?l.gradient:"rgba(255,255,255,0.12)"};width:${o===i?"28px":"6px"};transition:all 0.35s cubic-bezier(0.4,0,0.2,1);"></div>
            `).join("")}
          </div>

          <!-- CTA button -->
          <button class="btn-next" style="width:100%;height:54px;border-radius:var(--radius-full);background:${l.gradient};border:none;color:white;font-family:var(--font-display);font-size:1rem;font-weight:700;letter-spacing:0.3px;box-shadow:0 8px 28px ${l.bgGlow};display:flex;align-items:center;justify-content:center;gap:8px;transition:transform 0.15s ease,box-shadow 0.15s ease;cursor:pointer;">
            ${c?'<i data-lucide="rocket" style="width:18px;height:18px;"></i> Get Started':'Continue <i data-lucide="arrow-right" style="width:16px;height:16px;"></i>'}
          </button>
        </div>
      </div>
    `,window.lucide&&window.lucide.createIcons(),c){const g=e.querySelector(".calorie-range"),o=e.querySelector(".calorie-val"),w=e.querySelectorAll(".goal-btn");if(g&&o){g.addEventListener("input",T=>{const $=parseInt(T.target.value);o.textContent=`${$.toLocaleString()} kcal`;const E=($-1200)/2800*100,z=e.querySelector(".range-fill");z&&(z.style.width=E+"%")});const h=(parseInt(g.value)-1200)/2800*100,S=e.querySelector(".range-fill");S&&(S.style.width=h+"%")}w&&(w.forEach(h=>{h.addEventListener("click",()=>{w.forEach(S=>{S.style.borderColor="var(--glass-border)",S.style.background="rgba(255,255,255,0.03)",S.querySelector(".goal-check").style.opacity="0"}),h.style.borderColor=l.accentColor,h.style.background=`${l.bgGlow}`,h.querySelector(".goal-check").style.opacity="1",h.dataset.selected="true"})}),w[0]&&w[0].click())}const d=e.querySelector(".btn-next");d.addEventListener("mousedown",()=>{d.style.transform="scale(0.97)"}),d.addEventListener("mouseup",()=>{d.style.transform="scale(1)"}),d.addEventListener("touchstart",()=>{d.style.transform="scale(0.97)"},{passive:!0}),d.addEventListener("touchend",()=>{d.style.transform="scale(1)"},{passive:!0}),d.addEventListener("click",()=>{i<2?(i++,t()):u()});const f=e.querySelector(".btn-skip");f&&f.addEventListener("click",()=>{i=2,t()});const m=e.querySelector(".onboarding-slides-container");m.addEventListener("touchstart",g=>{r=g.changedTouches[0].screenX},{passive:!0}),m.addEventListener("touchend",g=>{a=g.changedTouches[0].screenX;const o=a-r;o<-55&&i<2&&(i++,t()),o>55&&i>0&&(i--,t())},{passive:!0})}function s(l){return`
      <div class="animate-fadeIn" style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:0;width:100%;">
        
        <!-- Hero illustration card -->
        <div style="position:relative;margin-bottom:32px;">
          <!-- Orbit rings -->
          <div style="position:absolute;inset:-24px;border-radius:50%;border:1px dashed rgba(255,255,255,0.07);animation:spin 18s linear infinite;"></div>
          <div style="position:absolute;inset:-12px;border-radius:50%;border:1px dashed rgba(255,255,255,0.05);animation:spin 12s linear infinite reverse;"></div>
          
          <!-- Main icon circle -->
          <div style="width:110px;height:110px;border-radius:50%;background:${l.gradient};display:flex;align-items:center;justify-content:center;font-size:3.2rem;box-shadow:0 16px 48px ${l.bgGlow},0 0 0 8px rgba(255,255,255,0.05);filter:drop-shadow(0 8px 20px ${l.bgGlow});animation:float 4s ease-in-out infinite;">
            ${l.icon}
          </div>

          <!-- Floating accent dots -->
          <div style="position:absolute;top:-4px;right:-8px;width:18px;height:18px;border-radius:50%;background:${l.gradient};opacity:0.7;animation:float 3s ease-in-out infinite 0.5s;"></div>
          <div style="position:absolute;bottom:4px;left:-12px;width:10px;height:10px;border-radius:50%;background:${l.gradient};opacity:0.5;animation:float 3.5s ease-in-out infinite 1s;"></div>
        </div>

        <!-- Text content -->
        <h2 class="font-display animate-slideUp" style="font-size:2rem;font-weight:900;color:var(--text-primary);line-height:1.1;margin-bottom:6px;">
          ${l.title}
        </h2>
        <h2 class="font-display animate-slideUp" style="font-size:2rem;font-weight:900;line-height:1.1;margin-bottom:18px;background:${l.gradient};-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
          ${l.subtitle}
        </h2>
        <p style="font-size:0.9rem;color:var(--text-secondary);line-height:1.65;max-width:300px;margin-bottom:28px;">
          ${l.desc}
        </p>

        <!-- Feature pills -->
        <div style="display:flex;flex-direction:column;gap:8px;width:100%;max-width:300px;">
          ${l.features.map((c,d)=>`
            <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:rgba(255,255,255,0.03);border:1px solid var(--glass-border);border-radius:var(--radius-md);animation:slideUp 0.4s ease both;animation-delay:${.1+d*.08}s;">
              <span style="font-size:1rem;">${c.icon}</span>
              <span style="font-size:0.83rem;color:var(--text-secondary);font-weight:500;">${c.text}</span>
              <i data-lucide="check" style="width:13px;height:13px;color:${l.accentColor};margin-left:auto;opacity:0.8;"></i>
            </div>
          `).join("")}
        </div>
      </div>
    `}function p(l){const c=[{value:"lose",label:"Lose Weight",sub:"Fat loss & calorie deficit",icon:"🔥"},{value:"maintain",label:"Stay Balanced",sub:"Maintain current weight",icon:"⚖️"},{value:"gain",label:"Build Muscle",sub:"Bulk & muscle growth",icon:"💪"}];return`
      <div class="animate-fadeIn" style="display:flex;flex-direction:column;align-items:center;width:100%;gap:0;">

        <!-- Header -->
        <div style="text-align:center;margin-bottom:24px;">
          <div style="font-size:3rem;margin-bottom:12px;animation:float 3s ease-in-out infinite;">🏆</div>
          <h2 class="font-display" style="font-size:1.75rem;font-weight:900;color:var(--text-primary);line-height:1.1;margin-bottom:4px;">
            Your <span style="background:${l.gradient};-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Goal</span>
          </h2>
          <p style="font-size:0.82rem;color:var(--text-secondary);">We'll set your personalized macro targets</p>
        </div>

        <!-- Name input -->
        <div style="width:100%;max-width:340px;margin-bottom:14px;">
          <label style="font-size:0.72rem;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:6px;">Your Name</label>
          <input type="text" class="input-field name-input" value="Alex" placeholder="Enter your name"
            style="width:100%;padding:13px 14px;border-radius:var(--radius-lg);background:rgba(255,255,255,0.04);border:1px solid var(--glass-border);color:var(--text-primary);font-size:0.92rem;outline:none;transition:border-color 0.2s;box-sizing:border-box;"
            onfocus="this.style.borderColor='${l.accentColor}'" onblur="this.style.borderColor='var(--glass-border)'" />
        </div>

        <!-- Goal selection buttons -->
        <div style="width:100%;max-width:340px;display:flex;flex-direction:column;gap:8px;margin-bottom:16px;">
          ${c.map((d,f)=>`
            <button class="goal-btn" data-goal="${d.value}" data-selected="false"
              style="display:flex;align-items:center;gap:12px;width:100%;padding:12px 14px;border-radius:var(--radius-lg);background:rgba(255,255,255,0.03);border:1px solid var(--glass-border);text-align:left;cursor:pointer;transition:all 0.2s;animation:slideUp 0.4s ease both;animation-delay:${.05+f*.07}s;">
              <div style="width:40px;height:40px;border-radius:var(--radius-md);background:rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0;">${d.icon}</div>
              <div style="flex:1;">
                <div class="font-display" style="font-size:0.9rem;font-weight:700;color:var(--text-primary);">${d.label}</div>
                <div style="font-size:0.74rem;color:var(--text-secondary);margin-top:1px;">${d.sub}</div>
              </div>
              <div class="goal-check" style="width:20px;height:20px;border-radius:50%;background:${l.gradient};display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.2s;flex-shrink:0;">
                <i data-lucide="check" style="width:11px;height:11px;color:white;"></i>
              </div>
            </button>
          `).join("")}
        </div>

        <!-- Calorie target slider -->
        <div style="width:100%;max-width:340px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <label style="font-size:0.72rem;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.5px;">Daily Calorie Target</label>
            <span class="calorie-val font-display" style="font-size:0.95rem;font-weight:800;color:${l.accentColor};">2,200 kcal</span>
          </div>
          <!-- Custom track -->
          <div style="position:relative;height:6px;border-radius:var(--radius-full);background:rgba(255,255,255,0.08);margin-bottom:6px;">
            <div class="range-fill" style="position:absolute;left:0;top:0;height:100%;border-radius:var(--radius-full);background:${l.gradient};width:36%;transition:width 0.1s;"></div>
          </div>
          <input type="range" class="calorie-range" min="1200" max="4000" step="50" value="2200"
            style="width:100%;accent-color:${l.accentColor};margin-top:-14px;opacity:0;height:24px;cursor:pointer;position:relative;z-index:2;" />
          <div style="display:flex;justify-content:space-between;margin-top:2px;">
            <span style="font-size:0.68rem;color:var(--text-tertiary);">1,200</span>
            <span style="font-size:0.68rem;color:var(--text-tertiary);">4,000 kcal</span>
          </div>
        </div>
      </div>
    `}function u(){const l=e.querySelector(".name-input"),c=e.querySelector(".calorie-range"),d=e.querySelector('.goal-btn[data-selected="true"]'),f=l&&l.value.trim()||"Alex",m=d?d.getAttribute("data-goal"):"maintain",g=c?parseInt(c.value):2200;let o=.28,w=.45,h=.27;m==="lose"?(o=.35,w=.35,h=.3):m==="gain"&&(o=.25,w=.5,h=.25);const S=Math.round(g*o/4),T=Math.round(g*w/4),$=Math.round(g*h/9);y.setProfile({name:f,goal:m}),y.setGoals({calories:g,protein:S,carbs:T,fat:$}),y.completeOnboarding(),L({message:`Welcome, ${f}! 🎉 Let's reach your goals!`,type:"success"}),C.navigate("home",{transition:"fade"})}t()}function ee({value:e=0,max:i=100,size:r=120,strokeWidth:a=8,color:n="#6c5ce7",gradientColors:t=null,label:s="",sublabel:p="",showPercentage:u=!1,animate:l=!0,duration:c=1e3}){const d=document.createElement("div");d.className="progress-ring-container",d.style.position="relative",d.style.width=`${r}px`,d.style.height=`${r}px`,d.style.display="flex",d.style.alignItems="center",d.style.justifyContent="center";const f=(r-a)/2,m=2*Math.PI*f,g=`ring-grad-${Math.random().toString(36).substring(2,9)}`,o=i>0?Math.min(e/i,1.2):0,w=m-o*m;let h="";t&&t.length>=2&&(h=`
      <defs>
        <linearGradient id="${g}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${t[0]}" />
          <stop offset="100%" stop-color="${t[1]}" />
        </linearGradient>
      </defs>
    `);const S=t?`url(#${g})`:n;d.innerHTML=`
    <svg width="${r}" height="${r}" style="transform: rotate(-90deg); position: absolute; top:0; left:0;">
      ${h}
      <!-- Background circle -->
      <circle 
        class="progress-ring-bg" 
        stroke="var(--glass-border)" 
        fill="transparent" 
        stroke-width="${a}" 
        r="${f}" 
        cx="${r/2}" 
        cy="${r/2}" 
      />
      <!-- Progress circle -->
      <circle 
        class="progress-ring-circle" 
        stroke="${S}" 
        fill="transparent" 
        stroke-width="${a}" 
        stroke-dasharray="${m} ${m}" 
        stroke-dashoffset="${m}" 
        stroke-linecap="round"
        r="${f}" 
        cx="${r/2}" 
        cy="${r/2}"
        style="transition: stroke-dashoffset ${l?c:0}ms cubic-bezier(0.4, 0, 0.2, 1);"
      />
    </svg>
    <div class="progress-ring-text" style="display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 2; text-align: center; pointer-events: none;">
      <span class="progress-ring-value font-display" style="font-weight: 700; color: var(--text-primary); line-height: 1.1;">
        ${u?"0%":s||"0"}
      </span>
      ${p?`<span class="progress-ring-sublabel" style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px; font-weight: 500;">${p}</span>`:""}
    </div>
  `;const T=d.querySelector(".progress-ring-circle"),$=d.querySelector(".progress-ring-value");return requestAnimationFrame(()=>{if(T.style.strokeDashoffset=w,l){let M=function(A){const P=A-I,N=Math.min(P/c,1),b=N*(2-N),H=Math.round(z+b*(k-z));$&&($.textContent=u?`${H}%`:H.toLocaleString()),N<1?requestAnimationFrame(M):$&&($.textContent=u?`${k}%`:s||k.toLocaleString())};var E=M;let z=0;const k=u?Math.round(o*100):typeof s=="number"?s:parseInt(s)||0,I=performance.now();k>0&&requestAnimationFrame(M)}}),d}function R({title:e,content:i,onClose:r,showHandle:a=!0}){const n=document.getElementById("modal-container");if(!n)return{close:()=>{}};n.innerHTML="",n.classList.add("active");const t=document.createElement("div");t.className="modal-overlay animate-fadeIn";const s=document.createElement("div");s.className="modal-sheet animate-slideUp";let p="";a&&(p='<div class="modal-handle" style="width: 40px; height: 5px; background: rgba(255,255,255,0.2); border-radius: 10px; margin: 8px auto 16px auto; cursor: grab;"></div>');const u=e?`<h3 class="modal-title font-display" style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 16px; padding: 0 4px;">${e}</h3>`:"";s.innerHTML=`
    ${p}
    ${u}
    <div class="modal-content" style="max-height: 70dvh; overflow-y: auto; -webkit-overflow-scrolling: touch; padding-bottom: calc(16px + env(safe-area-inset-bottom, 0px));"></div>
  `;const l=s.querySelector(".modal-content");typeof i=="string"?l.innerHTML=i:i instanceof HTMLElement&&l.appendChild(i),n.appendChild(t),n.appendChild(s),window.lucide&&window.lucide.createIcons();function c(){t.classList.remove("animate-fadeIn"),t.classList.add("animate-fadeOut"),s.classList.remove("animate-slideUp"),s.classList.add("animate-slideDown"),setTimeout(()=>{n.innerHTML="",n.classList.remove("active"),r&&r()},250)}t.addEventListener("click",c);const d=s.querySelector(".modal-handle");if(d){let f=0,m=0,g=!1;d.addEventListener("touchstart",o=>{f=o.touches[0].clientY,g=!0,s.style.transition="none"}),d.addEventListener("touchmove",o=>{if(!g)return;m=o.touches[0].clientY;const w=m-f;w>0&&(s.style.transform=`translateY(${w}px)`)}),d.addEventListener("touchend",o=>{if(!g)return;g=!1,s.style.transition="transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",m-f>100?c():s.style.transform="translateY(0)"})}return{close:c}}const He=encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,0 C150,90 350,90 500,0 L500,120 L0,120 Z" fill="#0984e3" opacity="0.5"/></svg>');function Ne({current:e=0,goal:i=2500,onAdd:r}){const a=document.createElement("div");a.className="water-tracker card glass-card",a.style.display="flex",a.style.flexDirection="column",a.style.gap="16px",a.style.padding="20px";const n=Math.min(Math.round(e/i*100),100);return a.innerHTML=`
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="color: var(--accent-blue); display: flex; align-items: center;">
          <i data-lucide="droplets" style="width: 20px; height: 20px;"></i>
        </div>
        <div>
          <h4 class="font-display" style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin:0;">Water Intake</h4>
          <p style="font-size: 0.75rem; color: var(--text-secondary); margin:0;">Goal: ${i} ml</p>
        </div>
      </div>
      <span class="font-display" style="font-size: 1.1rem; font-weight: 800; color: var(--accent-blue);">${e} <span style="font-size: 0.75rem; font-weight: 500; color: var(--text-secondary);">ml</span></span>
    </div>

    <!-- Liquid display glass container -->
    <div style="display: flex; align-items: center; gap: 20px;">
      <div class="water-glass-container" style="flex: 1; height: 110px; background: rgba(255,255,255,0.03); border: 2px solid rgba(9, 132, 227, 0.2); border-radius: var(--radius-md) var(--radius-md) var(--radius-lg) var(--radius-lg); position: relative; overflow: hidden;">
        <!-- Wave Fill background element -->
        <div class="water-wave-fill" style="position: absolute; bottom: 0; left: 0; width: 100%; height: ${n}%; background: linear-gradient(180deg, rgba(9, 132, 227, 0.6) 0%, rgba(0, 206, 201, 0.4) 100%); transition: height 0.6s cubic-bezier(0.4, 0, 0.2, 1); overflow: hidden;">
          <div class="wave-wave" style="position: absolute; top: -5px; left: 0; width: 200%; height: 10px; background-image: url(data:image/svg+xml,${He}); background-repeat: repeat-x; background-size: 50% 100%; animation: waveFlow 4s linear infinite;"></div>
        </div>
        
        <!-- Center percentage badge -->
        <div style="position: absolute; inset:0; display: flex; align-items: center; justify-content: center; z-index: 3; pointer-events: none;">
          <span class="font-display" style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); text-shadow: 0 2px 4px rgba(0,0,0,0.4);">${n}%</span>
        </div>
      </div>

      <!-- Control Button Panel -->
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <button class="btn btn-sm btn-water-add" data-amount="250" style="padding: 10px 14px; background: rgba(9, 132, 227, 0.1); border: 1px solid rgba(9, 132, 227, 0.25); color: var(--accent-blue); border-radius: var(--radius-md); font-size: 0.8rem; font-weight: 700; white-space: nowrap; display: flex; align-items: center; gap: 4px; transition: all var(--transition-fast);">
          <i data-lucide="plus" style="width: 12px; height: 12px;"></i> +250 ml
        </button>
        <button class="btn btn-sm btn-water-add" data-amount="500" style="padding: 10px 14px; background: rgba(9, 132, 227, 0.15); border: 1px solid rgba(9, 132, 227, 0.3); color: var(--accent-blue); border-radius: var(--radius-md); font-size: 0.8rem; font-weight: 700; white-space: nowrap; display: flex; align-items: center; gap: 4px; transition: all var(--transition-fast);">
          <i data-lucide="plus" style="width: 12px; height: 12px;"></i> +500 ml
        </button>
        <button class="btn btn-sm btn-water-custom" style="padding: 8px 12px; border: 1px solid var(--glass-border); border-radius: var(--radius-md); font-size: 0.75rem; font-weight: 600; color: var(--text-secondary); display: flex; align-items: center; justify-content: center; gap: 4px; transition: all var(--transition-fast);">
          Custom
        </button>
      </div>
    </div>
  `,a.querySelectorAll(".btn-water-add").forEach(t=>{t.addEventListener("click",s=>{const p=parseInt(t.getAttribute("data-amount"));r(p)})}),a.querySelector(".btn-water-custom").addEventListener("click",()=>{const s=R({title:"Log Custom Water",content:`
      <div style="padding: 8px 4px 16px 4px;">
        <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); display: block; margin-bottom: 8px;">Enter amount of water in ml</label>
        <div class="input-group" style="display: flex; gap: 8px;">
          <input type="number" class="input-field water-custom-input" placeholder="250" value="250" min="50" max="2000" style="flex:1; padding: 12px 16px; background: var(--bg-card); border: 1px solid var(--glass-border); border-radius: var(--radius-md); color: var(--text-primary); font-size: 1rem;" />
          <button class="btn btn-primary btn-save-custom-water" style="padding: 0 20px; font-size:0.9rem;">Add</button>
        </div>
      </div>
    `,onClose:()=>{}}),p=document.getElementById("modal-container"),u=p.querySelector(".btn-save-custom-water"),l=p.querySelector(".water-custom-input");u.addEventListener("click",()=>{const c=parseInt(l.value);c&&c>0?(r(c),s.close()):L({message:"Please enter a valid positive number",type:"error"})})}),a}const X=[{id:"n1",text:"Aim for a colorful plate — different colors mean different nutrients.",category:"nutrition",icon:"🌈"},{id:"n2",text:"Eating slowly helps your brain register fullness, reducing overeating by up to 20%.",category:"nutrition",icon:"🧠"},{id:"n3",text:"Fiber-rich foods keep you fuller longer. Try adding beans, lentils, or oats to your meals.",category:"nutrition",icon:"🥣"},{id:"n4",text:"Healthy fats from avocados, nuts, and olive oil support brain function and hormone health.",category:"nutrition",icon:"🥑"},{id:"n5",text:"Try the 80/20 rule: eat nutritious foods 80% of the time and enjoy treats the other 20%.",category:"nutrition",icon:"⚖️"},{id:"n6",text:"Whole grains provide sustained energy compared to refined grains. Choose brown over white.",category:"nutrition",icon:"🌾"},{id:"n7",text:"Meal prepping on weekends can save time and help you make healthier choices all week.",category:"nutrition",icon:"📦"},{id:"n8",text:"Reading food labels helps you stay aware of hidden sugars and sodium.",category:"nutrition",icon:"🏷️"},{id:"n9",text:"Fermented foods like yogurt, kimchi, and sauerkraut support a healthy gut microbiome.",category:"nutrition",icon:"🥬"},{id:"n10",text:"Eating breakfast kickstarts your metabolism and helps with focus throughout the morning.",category:"nutrition",icon:"🌅"},{id:"h1",text:"Drinking water before meals can help you eat less and stay hydrated.",category:"hydration",icon:"💧"},{id:"h2",text:"Carry a water bottle everywhere — you're more likely to drink when it's visible.",category:"hydration",icon:"🧴"},{id:"h3",text:"Herbal teas count toward your daily water intake. Try chamomile or peppermint.",category:"hydration",icon:"🍵"},{id:"h4",text:"Dehydration can masquerade as hunger. Try drinking water first when you feel peckish.",category:"hydration",icon:"🥤"},{id:"h5",text:"Fruits like watermelon and cucumbers are over 90% water — great natural hydrators.",category:"hydration",icon:"🍉"},{id:"h6",text:"Set hourly reminders to sip water. Small, frequent drinks beat chugging all at once.",category:"hydration",icon:"⏰"},{id:"h7",text:"Your urine color is a hydration indicator: pale yellow means well-hydrated.",category:"hydration",icon:"🎨"},{id:"f1",text:"A 30-minute walk burns about 150 calories and boosts your mood significantly.",category:"fitness",icon:"🚶"},{id:"f2",text:"Combining cardio with strength training maximizes fat loss and preserves muscle.",category:"fitness",icon:"💪"},{id:"f3",text:"Stretching for 10 minutes daily reduces injury risk and improves flexibility.",category:"fitness",icon:"🧘"},{id:"f4",text:"Taking the stairs instead of the elevator adds up to significant exercise over time.",category:"fitness",icon:"🏃"},{id:"f5",text:"Post-workout nutrition matters: eat protein within 45 minutes of exercising.",category:"fitness",icon:"🏋️"},{id:"f6",text:"Even 10 minutes of movement is better than none. Every bit counts!",category:"fitness",icon:"⚡"},{id:"m1",text:"Progress, not perfection. Small consistent changes lead to lasting results.",category:"mindset",icon:"🌱"},{id:"m2",text:"Celebrate non-scale victories: better energy, improved sleep, and stronger lifts.",category:"mindset",icon:"🎉"},{id:"m3",text:"Tracking your food isn't about restriction — it's about awareness and empowerment.",category:"mindset",icon:"📊"},{id:"m4",text:"Don't let one bad meal ruin your day. Reset at the next meal and keep going.",category:"mindset",icon:"🔄"},{id:"m5",text:"Visualize your goals. People who write down goals are 42% more likely to achieve them.",category:"mindset",icon:"🎯"},{id:"p1",text:"Protein keeps you full and preserves muscle. Aim for 1.6–2.2 g per kg of body weight.",category:"protein",icon:"🥩"},{id:"p2",text:"Greek yogurt packs up to 17 g of protein per serving — a perfect high-protein snack.",category:"protein",icon:"🥛"},{id:"p3",text:"Spread your protein intake across all meals for optimal muscle protein synthesis.",category:"protein",icon:"🍗"},{id:"p4",text:"Plant-based protein sources like tofu, tempeh, and lentils are excellent alternatives.",category:"protein",icon:"🌿"},{id:"p5",text:"Eggs are one of the most complete protein sources — 6 g of protein per large egg.",category:"protein",icon:"🥚"},{id:"s1",text:"Poor sleep increases hunger hormones. Aim for 7-9 hours per night.",category:"sleep",icon:"😴"},{id:"s2",text:"Avoid heavy meals 2-3 hours before bed for better sleep quality.",category:"sleep",icon:"🌙"},{id:"s3",text:"A consistent sleep schedule helps regulate appetite and metabolism.",category:"sleep",icon:"🛏️"},{id:"s4",text:"Magnesium-rich foods like almonds and spinach can promote better sleep.",category:"sleep",icon:"✨"}];function Be(e){const{calories:i=0,caloriesGoal:r=2200,protein:a=0,proteinGoal:n=150,water:t=0,waterGoal:s=2500}=e||{},p=r>0?i/r:0,u=n>0?a/n:0,l=s>0?t/s:0;let c;return u<.5?c=X.filter(d=>d.category==="protein"):l<.5?c=X.filter(d=>d.category==="hydration"):p>.9&&p<=1.05?c=X.filter(d=>d.category==="mindset"):p>1.1?c=X.filter(d=>d.category==="fitness"):c=X,c[Math.floor(Math.random()*c.length)]}const be=["You're building something incredible — one meal at a time. 🚀","Consistency beats intensity. Keep showing up! 💪","Your body is a reflection of your habits, not a single day. 🌟","Small steps lead to big transformations. Keep going! 🏔️","You didn't come this far to only come this far. 🔥","Every healthy choice is a vote for the person you want to become. 🗳️","Progress isn't always visible, but it's always happening. 🌱","You're one workout away from a better mood. Let's go! 🎯","Nutrition isn't about deprivation — it's about fueling your best self. ⚡","Trust the process. The results will follow. 🏆","Today is another chance to nourish your body and mind. 🧠","You're doing better than you think. Keep it up! 🌈","Healthy habits are the compound interest of self-improvement. 📈","Your future self will thank you for the choices you make today. 🙏","Don't count the days — make the days count. 📅","Discipline is choosing between what you want now and what you want most. 💎","You are what you eat, so eat something awesome! 🥗","The only bad workout is the one that didn't happen. 💥","Fuel your ambition. Track your progress. Own your journey. 🗺️","Great things never came from comfort zones. Push forward! 🚀","Hydrate, nourish, move, rest, repeat. That's the formula. 🔄","Your streak says it all — you're becoming unstoppable! ⚡","AI-powered insights, human-powered dedication. That's you. 🤖","One meal won't make you, and one meal won't break you. Balance is key. ⚖️"];function We(e){function i(){const a=new Date().getHours();return a>=5&&a<12?"Good morning":a>=12&&a<17?"Good afternoon":a>=17&&a<21?"Good evening":"Good night"}function r(){const a=y.getTodayTotals(),n=y.getGoals(),t=y.getProfile(),s=y.getStreak(),p=Math.max(n.calories-a.calories,0),u=Be({...a,water:y.getWater()});e.innerHTML=`
      <div class="nv-home home-screen animate-fadeIn">
        
        <div class="nv-home-hero nv-glass nv-glow-border">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
            <p class="nv-home-greeting">${i()}</p>
            <div style="display:flex;gap:8px;">
              <div class="nv-stat-pill" style="cursor:pointer;" onclick="window.location.hash='#streaks'">🔥 ${s.current||0}</div>
              <div class="nv-stat-pill" style="width:36px;height:36px;padding:0;justify-content:center;cursor:pointer;background:var(--gradient-primary);border:none;" onclick="window.location.hash='#profile'">${(t.name||"A")[0].toUpperCase()}</div>
            </div>
          </div>
          <h1 class="nv-home-title">Hey <span>${t.name||"Alex"}</span></h1>
          <p style="font-size:0.82rem;color:var(--text-secondary);margin:0;line-height:1.5;">${p>0?`${p} kcal left today`:"Daily goal reached! 🎉"}</p>
        </div>

        <!-- Main Calorie Progress Ring Section -->
        <div class="calorie-ring-section nv-glass" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px 20px; margin-bottom: 20px; text-align: center; position: relative; overflow: hidden;">
          <div class="glow-bg" style="position: absolute; top: -50px; left: 50%; transform: translateX(-50%); width: 250px; height: 250px; background: radial-gradient(circle, rgba(253, 121, 168, 0.15) 0%, rgba(0,0,0,0) 70%); pointer-events: none; z-index: 1;"></div>
          <div id="main-calorie-ring-mount" style="position: relative; z-index: 2; margin-bottom: 16px;"></div>
          <div style="z-index: 2; display: flex; gap: 24px; margin-top: 8px; width: 100%; border-top: 1px solid var(--glass-border); padding-top: 16px;">
            <div style="flex:1;">
              <span style="font-size: 0.75rem; color: var(--text-secondary); display: block; margin-bottom: 2px;">Logged</span>
              <span class="font-display" style="font-size: 1.15rem; font-weight: 800; color: var(--accent-pink);">${a.calories} <span style="font-size:0.75rem; font-weight:500; color:var(--text-secondary);">kcal</span></span>
            </div>
            <div style="width: 1px; background: var(--glass-border);"></div>
            <div style="flex:1;">
              <span style="font-size: 0.75rem; color: var(--text-secondary); display: block; margin-bottom: 2px;">Daily Goal</span>
              <span class="font-display" style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary);">${n.calories} <span style="font-size:0.75rem; font-weight:500; color:var(--text-secondary);">kcal</span></span>
            </div>
          </div>
        </div>

        <!-- Macro Rings Row -->
        <div class="nv-macro-grid macro-rings-row">
          <div class="nv-macro-tile nv-macro-tile--protein nv-glass" style="display: flex; flex-direction: column; align-items: center; padding: 16px 8px;">
            <div id="protein-ring-mount" style="margin-bottom: 8px;"></div>
            <span style="font-size: 0.7rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase;">Protein</span>
            <span class="font-display" style="font-size: 0.85rem; font-weight: 700; color: var(--accent-teal); margin-top: 2px;">${a.protein}g / ${n.protein}g</span>
          </div>
          <div class="nv-macro-tile nv-macro-tile--carbs nv-glass" style="display: flex; flex-direction: column; align-items: center; padding: 16px 8px;">
            <div id="carbs-ring-mount" style="margin-bottom: 8px;"></div>
            <span style="font-size: 0.7rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase;">Carbs</span>
            <span class="font-display" style="font-size: 0.85rem; font-weight: 700; color: var(--accent-yellow); margin-top: 2px;">${a.carbs}g / ${n.carbs}g</span>
          </div>
          <div class="nv-macro-tile nv-macro-tile--fat nv-glass" style="display: flex; flex-direction: column; align-items: center; padding: 16px 8px;">
            <div id="fat-ring-mount" style="margin-bottom: 8px;"></div>
            <span style="font-size: 0.7rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase;">Fats</span>
            <span class="font-display" style="font-size: 0.85rem; font-weight: 700; color: var(--accent-purple-light); margin-top: 2px;">${a.fat}g / ${n.fat}g</span>
          </div>
        </div>

        <!-- AI Insight Box -->
        <div class="insight-card nv-glass" style="display: flex; gap: 12px; align-items: flex-start; padding: 16px; margin-bottom: 20px; border-left: 4px solid var(--accent-purple);">
          <div style="color: var(--accent-purple); display:flex; align-items:center; margin-top: 2px;">
            <i data-lucide="brain" style="width: 20px; height: 20px;"></i>
          </div>
          <div style="flex:1;">
            <div style="display:flex; align-items:center; gap: 6px; margin-bottom: 4px;">
              <span class="font-display" style="font-size: 0.85rem; font-weight: 800; color: var(--text-primary);">AI Nutrition Insight</span>
              <span class="badge" style="background: rgba(108, 92, 231, 0.15); color: var(--accent-purple-light); font-size: 0.65rem; padding: 2px 6px; border-radius: var(--radius-full); font-weight:700;">PRO</span>
            </div>
            <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.45; margin:0;">
              ${u}
            </p>
          </div>
        </div>

        <!-- Quick Actions Panel -->
        <div style="margin-bottom: 24px;">
          <h3 class="font-display" style="font-size: 1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 12px;">Quick Log</h3>
          <div class="nv-quick-grid">
            <button class="nv-quick-btn nv-glass btn-action-log" data-action="scan">
              <div class="nv-quick-icon" style="background:rgba(253,121,168,0.15);color:var(--accent-pink);"><i data-lucide="camera" style="width:20px;height:20px;"></i></div>
              <span style="font-size:0.75rem;font-weight:600;color:var(--text-primary);">Scan Food</span>
            </button>
            <button class="nv-quick-btn nv-glass btn-action-log" data-action="water">
              <div class="nv-quick-icon" style="background:rgba(9,132,227,0.15);color:var(--accent-blue);"><i data-lucide="droplets" style="width:20px;height:20px;"></i></div>
              <span style="font-size:0.75rem;font-weight:600;color:var(--text-primary);">Water</span>
            </button>
            <button class="nv-quick-btn nv-glass btn-action-log" data-action="weight">
              <div class="nv-quick-icon" style="background:rgba(0,206,201,0.15);color:var(--accent-teal);"><i data-lucide="scale" style="width:20px;height:20px;"></i></div>
              <span style="font-size:0.75rem;font-weight:600;color:var(--text-primary);">Weight</span>
            </button>
          </div>
        </div>

        <!-- Today's Meals Section -->
        <div class="today-meals-section" style="margin-bottom: 24px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <h3 class="font-display" style="font-size: 1rem; font-weight: 800; color: var(--text-primary); margin:0;">Today's Meals</h3>
            <button style="font-size: 0.75rem; font-weight: 600; color: var(--accent-pink); padding: 4px 8px;" onclick="window.location.hash = '#diary'">See Diary</button>
          </div>
          <div class="today-meals-list" style="display: flex; flex-direction: column; gap: 8px;">
            <!-- Appended dynamically -->
          </div>
        </div>

        <!-- Water Tracker Widget Widget Mount -->
        <div id="water-tracker-mount" style="margin-bottom: 32px;"></div>
      </div>
    `,window.lucide&&window.lucide.createIcons();const l=ee({value:a.calories,max:n.calories,size:180,strokeWidth:12,gradientColors:["#fd79a8","#e17055"],label:p,sublabel:"kcal left",showPercentage:!1,animate:!0});e.querySelector("#main-calorie-ring-mount").appendChild(l);const c=ee({value:a.protein,max:n.protein,size:60,strokeWidth:6,gradientColors:["#00cec9","#55efc4"],showPercentage:!0,animate:!0});e.querySelector("#protein-ring-mount").appendChild(c);const d=ee({value:a.carbs,max:n.carbs,size:60,strokeWidth:6,gradientColors:["#fdcb6e","#f39c12"],showPercentage:!0,animate:!0});e.querySelector("#carbs-ring-mount").appendChild(d);const f=ee({value:a.fat,max:n.fat,size:60,strokeWidth:6,gradientColors:["#6c5ce7","#a29bfe"],showPercentage:!0,animate:!0});e.querySelector("#fat-ring-mount").appendChild(f);const m=e.querySelector(".today-meals-list"),g=y.getTodayMeals(),o=[];if(["breakfast","lunch","dinner","snacks"].forEach(h=>{g[h]&&g[h].forEach(S=>{o.push({...S,mealType:h})})}),o.length===0)m.innerHTML=`
        <div class="card glass-card" style="padding: 24px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; border: 1px dashed var(--glass-border);">
          <span style="font-size: 1.5rem;">🥗</span>
          <p style="font-size: 0.8rem; color: var(--text-secondary); margin:0;">No meals logged today yet. Tap Scan below to start!</p>
        </div>
      `;else if(o.slice(0,3).forEach(h=>{const S=document.createElement("div");S.className="card glass-card",S.style.display="flex",S.style.alignItems="center",S.style.justifyContent="space-between",S.style.padding="12px 16px",S.innerHTML=`
          <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
            <span style="font-size: 1.4rem;">${h.icon||"🍲"}</span>
            <div style="min-width:0;">
              <h4 class="font-display" style="font-size: 0.85rem; font-weight: 600; color: var(--text-primary); margin:0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 160px;">${h.name}</h4>
              <span style="font-size: 0.7rem; color: var(--text-secondary); text-transform: uppercase;">${h.mealType}</span>
            </div>
          </div>
          <span class="font-display" style="font-size: 0.9rem; font-weight: 700; color: var(--accent-pink);">${h.calories} kcal</span>
        `,m.appendChild(S)}),o.length>3){const h=document.createElement("button");h.className="btn btn-ghost btn-sm",h.style.color="var(--text-secondary)",h.style.fontSize="0.75rem",h.style.textAlign="center",h.style.padding="4px 0",h.textContent=`+ ${o.length-3} more items in your diary`,h.addEventListener("click",()=>{C.navigate("diary")}),m.appendChild(h)}const w=Ne({current:y.getWater(),goal:n.water,onAdd:h=>{y.addWater(h),L({message:`Logged +${h}ml water! 💧`,type:"success",duration:1500})}});e.querySelector("#water-tracker-mount").appendChild(w),e.querySelectorAll(".btn-action-log").forEach(h=>{h.addEventListener("click",()=>{const S=h.getAttribute("data-action");if(S==="scan")C.navigate("scanner",{transition:"slide-up"});else if(S==="water")y.addWater(250),L({message:"Added 250ml water! 💧",type:"success",duration:1500});else if(S==="weight"){const T=t.weight||70,$=`
            <div style="padding: 8px 4px 16px 4px;">
              <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); display: block; margin-bottom: 8px;">Enter current weight in kg</label>
              <div class="input-group" style="display: flex; gap: 8px;">
                <input type="number" step="0.1" class="input-field weight-custom-input" placeholder="${T}" value="${T}" style="flex:1; padding: 12px 16px; background: var(--bg-card); border: 1px solid var(--glass-border); border-radius: var(--radius-md); color: var(--text-primary); font-size: 1rem;" />
                <button class="btn btn-primary btn-save-custom-weight" style="padding: 0 20px; font-size:0.9rem;">Log</button>
              </div>
            </div>
          `,E=R({title:"Log Weight Progress",content:$,onClose:()=>{}}),z=document.getElementById("modal-container"),k=z.querySelector(".btn-save-custom-weight"),I=z.querySelector(".weight-custom-input");k.addEventListener("click",()=>{const M=parseFloat(I.value);M&&M>20&&M<300?(y.logWeight(M),y.setProfile({weight:M}),L({message:`Successfully logged weight: ${M} kg! ⚖️`,type:"success"}),E.close()):L({message:"Please enter a valid weight between 20 and 300 kg",type:"error"})})}})})}r(),y.subscribe(()=>{C.getCurrentRoute()==="home"&&r()})}function Fe(){y.updateStreak()}const ye=[{id:"apple",name:"Apple",category:"fruit",calories:95,protein:.5,carbs:25,fat:.3,fiber:4.4,serving:1,servingUnit:"medium",icon:"🍎",confidence:.97},{id:"banana",name:"Banana",category:"fruit",calories:105,protein:1.3,carbs:27,fat:.4,fiber:3.1,serving:1,servingUnit:"medium",icon:"🍌",confidence:.98},{id:"orange",name:"Orange",category:"fruit",calories:62,protein:1.2,carbs:15,fat:.2,fiber:3.1,serving:1,servingUnit:"medium",icon:"🍊",confidence:.96},{id:"strawberries",name:"Strawberries",category:"fruit",calories:49,protein:1,carbs:12,fat:.5,fiber:3,serving:150,servingUnit:"g",icon:"🍓",confidence:.95},{id:"blueberries",name:"Blueberries",category:"fruit",calories:85,protein:1.1,carbs:21,fat:.5,fiber:3.6,serving:150,servingUnit:"g",icon:"🫐",confidence:.93},{id:"grapes",name:"Grapes",category:"fruit",calories:104,protein:1.1,carbs:27,fat:.2,fiber:1.4,serving:150,servingUnit:"g",icon:"🍇",confidence:.94},{id:"watermelon",name:"Watermelon",category:"fruit",calories:86,protein:1.7,carbs:22,fat:.4,fiber:1.1,serving:280,servingUnit:"g",icon:"🍉",confidence:.96},{id:"mango",name:"Mango",category:"fruit",calories:99,protein:1.4,carbs:25,fat:.6,fiber:2.6,serving:165,servingUnit:"g",icon:"🥭",confidence:.95},{id:"pineapple",name:"Pineapple",category:"fruit",calories:82,protein:.9,carbs:22,fat:.2,fiber:2.3,serving:165,servingUnit:"g",icon:"🍍",confidence:.94},{id:"avocado",name:"Avocado",category:"fruit",calories:240,protein:3,carbs:13,fat:22,fiber:10,serving:1,servingUnit:"whole",icon:"🥑",confidence:.97},{id:"broccoli",name:"Broccoli",category:"vegetable",calories:55,protein:3.7,carbs:11,fat:.6,fiber:5.1,serving:150,servingUnit:"g",icon:"🥦",confidence:.96},{id:"spinach",name:"Spinach",category:"vegetable",calories:23,protein:2.9,carbs:3.6,fat:.4,fiber:2.2,serving:100,servingUnit:"g",icon:"🥬",confidence:.93},{id:"carrot",name:"Carrot",category:"vegetable",calories:41,protein:.9,carbs:10,fat:.2,fiber:2.8,serving:1,servingUnit:"medium",icon:"🥕",confidence:.95},{id:"tomato",name:"Tomato",category:"vegetable",calories:22,protein:1.1,carbs:4.8,fat:.2,fiber:1.5,serving:1,servingUnit:"medium",icon:"🍅",confidence:.96},{id:"sweet_potato",name:"Sweet Potato",category:"vegetable",calories:103,protein:2.3,carbs:24,fat:.1,fiber:3.8,serving:1,servingUnit:"medium",icon:"🍠",confidence:.94},{id:"corn",name:"Corn on the Cob",category:"vegetable",calories:88,protein:3.3,carbs:19,fat:1.4,fiber:2,serving:1,servingUnit:"ear",icon:"🌽",confidence:.95},{id:"cucumber",name:"Cucumber",category:"vegetable",calories:16,protein:.7,carbs:3.6,fat:.1,fiber:.5,serving:100,servingUnit:"g",icon:"🥒",confidence:.94},{id:"white_rice",name:"White Rice",category:"grain",calories:206,protein:4.3,carbs:45,fat:.4,fiber:.6,serving:158,servingUnit:"g",icon:"🍚",confidence:.95},{id:"brown_rice",name:"Brown Rice",category:"grain",calories:216,protein:5,carbs:45,fat:1.8,fiber:3.5,serving:158,servingUnit:"g",icon:"🍚",confidence:.92},{id:"pasta",name:"Pasta (cooked)",category:"grain",calories:220,protein:8.1,carbs:43,fat:1.3,fiber:2.5,serving:140,servingUnit:"g",icon:"🍝",confidence:.94},{id:"bread_wheat",name:"Wheat Bread",category:"grain",calories:79,protein:4,carbs:15,fat:1,fiber:1.9,serving:1,servingUnit:"slice",icon:"🍞",confidence:.96},{id:"oatmeal",name:"Oatmeal",category:"grain",calories:154,protein:5.3,carbs:27,fat:2.6,fiber:4,serving:234,servingUnit:"g",icon:"🥣",confidence:.95},{id:"tortilla",name:"Flour Tortilla",category:"grain",calories:146,protein:3.8,carbs:25,fat:3.6,fiber:1.6,serving:1,servingUnit:"large",icon:"🫓",confidence:.93},{id:"granola",name:"Granola",category:"grain",calories:196,protein:4.7,carbs:32,fat:7.2,fiber:3,serving:45,servingUnit:"g",icon:"🥣",confidence:.91},{id:"chicken_breast",name:"Chicken Breast",category:"protein",calories:165,protein:31,carbs:0,fat:3.6,fiber:0,serving:100,servingUnit:"g",icon:"🍗",confidence:.96},{id:"salmon",name:"Salmon Fillet",category:"protein",calories:208,protein:20,carbs:0,fat:13,fiber:0,serving:100,servingUnit:"g",icon:"🐟",confidence:.95},{id:"eggs",name:"Eggs",category:"protein",calories:78,protein:6.3,carbs:.6,fat:5.3,fiber:0,serving:1,servingUnit:"large",icon:"🥚",confidence:.98},{id:"beef_steak",name:"Beef Steak",category:"protein",calories:271,protein:26,carbs:0,fat:18,fiber:0,serving:100,servingUnit:"g",icon:"🥩",confidence:.95},{id:"tofu",name:"Tofu",category:"protein",calories:76,protein:8,carbs:1.9,fat:4.8,fiber:.3,serving:100,servingUnit:"g",icon:"🧈",confidence:.9},{id:"tuna",name:"Tuna (canned)",category:"protein",calories:132,protein:29,carbs:0,fat:1,fiber:0,serving:100,servingUnit:"g",icon:"🐟",confidence:.93},{id:"shrimp",name:"Shrimp",category:"protein",calories:99,protein:24,carbs:.2,fat:.3,fiber:0,serving:100,servingUnit:"g",icon:"🦐",confidence:.94},{id:"turkey_breast",name:"Turkey Breast",category:"protein",calories:135,protein:30,carbs:0,fat:1,fiber:0,serving:100,servingUnit:"g",icon:"🦃",confidence:.93},{id:"milk_whole",name:"Whole Milk",category:"dairy",calories:149,protein:8,carbs:12,fat:8,fiber:0,serving:240,servingUnit:"ml",icon:"🥛",confidence:.97},{id:"greek_yogurt",name:"Greek Yogurt",category:"dairy",calories:100,protein:17,carbs:6,fat:.7,fiber:0,serving:170,servingUnit:"g",icon:"🥛",confidence:.95},{id:"cheddar",name:"Cheddar Cheese",category:"dairy",calories:113,protein:7,carbs:.4,fat:9.3,fiber:0,serving:28,servingUnit:"g",icon:"🧀",confidence:.96},{id:"cottage_cheese",name:"Cottage Cheese",category:"dairy",calories:98,protein:11,carbs:3.4,fat:4.3,fiber:0,serving:113,servingUnit:"g",icon:"🧀",confidence:.91},{id:"butter",name:"Butter",category:"dairy",calories:102,protein:.1,carbs:0,fat:12,fiber:0,serving:14,servingUnit:"g",icon:"🧈",confidence:.95},{id:"almonds",name:"Almonds",category:"snack",calories:164,protein:6,carbs:6,fat:14,fiber:3.5,serving:28,servingUnit:"g",icon:"🥜",confidence:.94},{id:"peanut_butter",name:"Peanut Butter",category:"snack",calories:188,protein:7,carbs:6,fat:16,fiber:1.9,serving:32,servingUnit:"g",icon:"🥜",confidence:.95},{id:"protein_bar",name:"Protein Bar",category:"snack",calories:210,protein:20,carbs:22,fat:7,fiber:3,serving:1,servingUnit:"bar",icon:"🍫",confidence:.92},{id:"dark_chocolate",name:"Dark Chocolate",category:"snack",calories:170,protein:2.2,carbs:13,fat:12,fiber:3.1,serving:30,servingUnit:"g",icon:"🍫",confidence:.93},{id:"chips",name:"Potato Chips",category:"snack",calories:152,protein:2,carbs:15,fat:10,fiber:1.2,serving:28,servingUnit:"g",icon:"🥔",confidence:.94},{id:"trail_mix",name:"Trail Mix",category:"snack",calories:175,protein:4.5,carbs:16,fat:11,fiber:2,serving:35,servingUnit:"g",icon:"🥜",confidence:.9},{id:"coffee_black",name:"Black Coffee",category:"beverage",calories:2,protein:.3,carbs:0,fat:0,fiber:0,serving:240,servingUnit:"ml",icon:"☕",confidence:.97},{id:"latte",name:"Latte",category:"beverage",calories:190,protein:13,carbs:19,fat:7,fiber:0,serving:480,servingUnit:"ml",icon:"☕",confidence:.94},{id:"orange_juice",name:"Orange Juice",category:"beverage",calories:112,protein:1.7,carbs:26,fat:.5,fiber:.5,serving:240,servingUnit:"ml",icon:"🧃",confidence:.96},{id:"smoothie",name:"Fruit Smoothie",category:"beverage",calories:230,protein:4,carbs:44,fat:3.5,fiber:4,serving:350,servingUnit:"ml",icon:"🥤",confidence:.89},{id:"protein_shake",name:"Protein Shake",category:"beverage",calories:160,protein:30,carbs:5,fat:2.5,fiber:1,serving:350,servingUnit:"ml",icon:"🥤",confidence:.91},{id:"green_tea",name:"Green Tea",category:"beverage",calories:2,protein:0,carbs:0,fat:0,fiber:0,serving:240,servingUnit:"ml",icon:"🍵",confidence:.96},{id:"pizza_slice",name:"Pizza Slice",category:"meal",calories:285,protein:12,carbs:36,fat:10,fiber:2.5,serving:1,servingUnit:"slice",icon:"🍕",confidence:.97},{id:"burger",name:"Hamburger",category:"meal",calories:354,protein:20,carbs:29,fat:17,fiber:1.3,serving:1,servingUnit:"burger",icon:"🍔",confidence:.96},{id:"sushi_roll",name:"Sushi Roll",category:"meal",calories:200,protein:9,carbs:38,fat:1,fiber:1,serving:6,servingUnit:"pieces",icon:"🍣",confidence:.93},{id:"caesar_salad",name:"Caesar Salad",category:"meal",calories:180,protein:7,carbs:8,fat:14,fiber:3,serving:1,servingUnit:"bowl",icon:"🥗",confidence:.94},{id:"burrito",name:"Burrito",category:"meal",calories:430,protein:22,carbs:51,fat:14,fiber:6,serving:1,servingUnit:"large",icon:"🌯",confidence:.93},{id:"ramen",name:"Ramen Bowl",category:"meal",calories:436,protein:16,carbs:60,fat:14,fiber:2.5,serving:1,servingUnit:"bowl",icon:"🍜",confidence:.92},{id:"grilled_chicken_salad",name:"Grilled Chicken Salad",category:"meal",calories:320,protein:35,carbs:12,fat:15,fiber:4,serving:1,servingUnit:"bowl",icon:"🥗",confidence:.94},{id:"sandwich",name:"Turkey Sandwich",category:"meal",calories:350,protein:24,carbs:35,fat:12,fiber:3,serving:1,servingUnit:"sandwich",icon:"🥪",confidence:.95},{id:"pancakes",name:"Pancakes",category:"meal",calories:280,protein:8,carbs:40,fat:10,fiber:1.5,serving:3,servingUnit:"pieces",icon:"🥞",confidence:.96},{id:"tacos",name:"Tacos",category:"meal",calories:210,protein:11,carbs:21,fat:10,fiber:2,serving:1,servingUnit:"taco",icon:"🌮",confidence:.95},{id:"fried_rice",name:"Fried Rice",category:"meal",calories:238,protein:5.5,carbs:34,fat:9,fiber:1,serving:200,servingUnit:"g",icon:"🍳",confidence:.91},{id:"mac_cheese",name:"Mac & Cheese",category:"meal",calories:310,protein:11,carbs:38,fat:13,fiber:1.5,serving:200,servingUnit:"g",icon:"🧀",confidence:.93}],ve={breakfast:["eggs","oatmeal","banana","greek_yogurt","coffee_black","latte","pancakes","bread_wheat","granola","orange_juice","apple","blueberries","milk_whole","peanut_butter","avocado","smoothie"],lunch:["chicken_breast","caesar_salad","sandwich","white_rice","sushi_roll","burrito","tacos","grilled_chicken_salad","pasta","broccoli","tomato","corn","tuna","bread_wheat"],dinner:["salmon","beef_steak","chicken_breast","white_rice","brown_rice","pasta","broccoli","sweet_potato","pizza_slice","ramen","fried_rice","burger","mac_cheese","spinach","shrimp","turkey_breast"],snack:["almonds","protein_bar","dark_chocolate","chips","trail_mix","apple","banana","greek_yogurt","peanut_butter","grapes","strawberries","carrot","cottage_cheese","protein_shake","green_tea"]};function he(e){if(!e||typeof e!="string")return[];const i=e.toLowerCase().trim();return i.length===0?[]:ye.map(a=>{const n=a.name.toLowerCase();let t=0;if(n===i)t=1;else if(n.startsWith(i))t=.9+i.length/n.length*.1;else if(n.includes(i))t=.7+i.length/n.length*.15;else{const s=i.split(/\s+/),p=n.split(/\s+/);let u=0;for(const l of s)for(const c of p)if(c.startsWith(l)||l.startsWith(c)){u++;break}if(u>0)t=.4+u/s.length*.35;else{const l=Re(i,n),c=Math.max(i.length,n.length),d=1-l/c;d>.4&&(t=d*.5)}}return t*=a.confidence,{food:{...a},score:t}}).filter(a=>a.score>.2).sort((a,n)=>n.score-a.score).slice(0,3).map(a=>({...a.food,confidence:Math.min(parseFloat(a.score.toFixed(2)),.99)}))}function Re(e,i){const r=e.length,a=i.length,n=Array.from({length:r+1},()=>Array(a+1).fill(0));for(let t=0;t<=r;t++)n[t][0]=t;for(let t=0;t<=a;t++)n[0][t]=t;for(let t=1;t<=r;t++)for(let s=1;s<=a;s++)n[t][s]=e[t-1]===i[s-1]?n[t-1][s-1]:1+Math.min(n[t-1][s],n[t][s-1],n[t-1][s-1]);return n[r][a]}function Oe(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}function ce(e){let i=0;for(let r=0;r<e.length;r++)i=(i<<5)-i+e.charCodeAt(r),i|=0;return Math.abs(i)}function Te(e,i){const r=[...e];let a=i||1;for(let n=r.length-1;n>0;n--){a=a*1103515245+12345&2147483647;const t=a%(n+1);[r[n],r[t]]=[r[t],r[n]]}return r}function Ie(e){return e?e==="snacks"?"snack":ve[e]?e:"snack":"lunch"}function Ee(e,i){const r=e.confidence!=null?Number(e.confidence):.92,a=i%7/100;return{...e,mealId:Oe(),calories:Math.round(Number(e.calories)||0),protein:Math.round((Number(e.protein)||0)*10)/10,carbs:Math.round((Number(e.carbs)||0)*10)/10,fat:Math.round((Number(e.fat)||0)*10)/10,confidence:Math.min(parseFloat((r+a).toFixed(2)),.99)}}const Ge={red:["pizza_slice","burger","beef_steak","tomato","strawberries","apple"],orange:["pizza_slice","burger","sweet_potato","carrot","orange","tacos","fried_rice"],yellow:["banana","corn","pancakes","cheddar","eggs","bread_wheat"],green:["broccoli","spinach","caesar_salad","grilled_chicken_salad","avocado","cucumber"],brown:["chicken_breast","bread_wheat","oatmeal","coffee_black","almonds","burger"],white:["white_rice","pasta","greek_yogurt","eggs","caesar_salad"]};function Ve(e){return new Promise((i,r)=>{const a=new Image;a.crossOrigin="anonymous",a.onload=()=>{try{const n=document.createElement("canvas"),t=48;n.width=t,n.height=t;const s=n.getContext("2d");s.drawImage(a,0,0,t,t);const p=s.getImageData(0,0,t,t).data,u={red:0,orange:0,yellow:0,green:0,brown:0,white:0};for(let l=0;l<p.length;l+=4){const c=p[l],d=p[l+1],f=p[l+2];if(p[l+3]<40)continue;const g=Math.max(c,d,f),o=Math.min(c,d,f),w=g===0?0:(g-o)/g;g>200&&w<.15?u.white++:c>140&&d>90&&f<80&&c>d?u.orange++:c>120&&d<90&&f<90?u.red++:d>100&&d>c&&d>f?u.green++:c>150&&d>130&&f<100?u.yellow++:c>80&&d>50&&f<60&&c>f&&u.brown++}i(u)}catch(n){r(n)}},a.onerror=()=>r(new Error("Image load failed")),a.src=e})}function Ye(e,i){const r=Object.entries(i).filter(([,n])=>n>0).sort((n,t)=>t[1]-n[1]).map(([n])=>n),a=[];for(const n of r){const t=Ge[n]||[];for(const s of t)e.includes(s)&&!a.includes(s)&&a.push(s)}for(const n of e)a.includes(n)||a.push(n);return a}async function xe(e,i="lunch"){const r=Ie(i);let a=[...ve[r]],n=Date.now();if(e&&typeof e=="string"){n=ce(e.slice(0,2e3)+e.slice(-500));try{const l=await Ve(e),c=Ye(a,l);c.length>=2&&(a=c)}catch(l){console.warn("[FoodDB] Color analysis skipped",l)}}const t=2+n%3,u=Te(a,n).slice(0,t).map(l=>ye.find(c=>c.id===l)).filter(Boolean).map(l=>Ee(l,n+ce(l.id)));return u.length===0?de(r):u}function de(e){const i=Ie(e),r=ve[i],a=Date.now(),n=2+a%3;return Te(r,a).slice(0,n).map(p=>ye.find(u=>u.id===p)).filter(Boolean).map(p=>Ee(p,a+ce(p.id)))}const pe="nutrivision_openai_key",Xe=`You are an expert clinical nutritionist analyzing a meal photo.

Identify ONLY food and beverages clearly visible in this image.

Return valid JSON with this exact structure:
{
  "items": [
    {
      "name": "specific food name (e.g. Grilled Chicken Breast, not just chicken)",
      "serving": 1,
      "servingUnit": "piece|g|ml|cup|slice|medium|bowl|plate|sandwich",
      "calories": 0,
      "protein": 0,
      "carbs": 0,
      "fat": 0,
      "confidence": 0.95
    }
  ],
  "mealDescription": "one sentence describing the plate"
}

Rules:
- List each distinct visible food separately (e.g. rice and chicken are two items)
- Estimate nutrition for the ACTUAL portion visible on the plate, not per 100g
- Use realistic USDA-style values
- confidence: 0.5-0.99 based on visibility
- If the image is not food, return {"items":[],"mealDescription":"No food detected"}
- Never guess foods that are not visible`,we={fruit:"🍎",vegetable:"🥦",protein:"🍗",grain:"🍚",dairy:"🥛",snack:"🥜",beverage:"🥤",meal:"🍽️"};function Ke(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}function oe(e){return Math.round((Number(e)||0)*10)/10}function Je(e,i){if(i&&we[i])return we[i];const r=(e||"").toLowerCase();return/chicken|beef|steak|fish|salmon|egg|turkey|shrimp|pork/.test(r)?"🍗":/rice|pasta|bread|oat|noodle|pizza|burger|sandwich|taco/.test(r)?"🍽️":/apple|banana|berry|fruit|orange|mango/.test(r)?"🍎":/salad|broccoli|spinach|vegetable/.test(r)?"🥗":/coffee|tea|juice|water|smoothie|milk/.test(r)?"🥤":"🍲"}function ne(){try{const i=localStorage.getItem(pe);if(i&&i.trim())return i.trim()}catch{}const e=void 0;return e&&String(e).trim()||""}function ke(e){try{e&&e.trim()?localStorage.setItem(pe,e.trim()):localStorage.removeItem(pe)}catch{}}function ge(){return ne().length>10}function Qe(e,i=1024){return new Promise(r=>{const a=new Image;a.onload=()=>{let{width:n,height:t}=a;if(n<=i&&t<=i&&e.length<8e5){r(e);return}const s=i/Math.max(n,t);n=Math.max(1,Math.round(n*s)),t=Math.max(1,Math.round(t*s));const p=document.createElement("canvas");p.width=n,p.height=t,p.getContext("2d").drawImage(a,0,0,n,t),r(p.toDataURL("image/jpeg",.82))},a.onerror=()=>r(e),a.src=e})}function Ze(e){return Array.isArray(e)?e.map((i,r)=>{const a=String(i.name||"").trim();if(!a)return null;const t=he(a)[0]||null,s=Number(i.serving)||(t==null?void 0:t.serving)||1;t&&i.calories==null;let p=Number(i.calories),u=Number(i.protein),l=Number(i.carbs),c=Number(i.fat);return(!p||p<=0)&&t&&(p=t.calories,u=t.protein,l=t.carbs,c=t.fat),{id:(t==null?void 0:t.id)||`vision_${r}_${a.slice(0,12).replace(/\s/g,"_")}`,mealId:Ke(),name:a,category:(t==null?void 0:t.category)||"meal",calories:Math.round(p||0),protein:oe(u),carbs:oe(l),fat:oe(c),fiber:(t==null?void 0:t.fiber)||0,serving:s,servingUnit:i.servingUnit||(t==null?void 0:t.servingUnit)||"serving",icon:(t==null?void 0:t.icon)||Je(a,t==null?void 0:t.category),confidence:Math.min(Math.max(Number(i.confidence)||.88,.5),.99)}}).filter(Boolean).filter(i=>i.calories>0):[]}async function et(e,i){var c,d,f,m,g;const r=await Qe(i),a=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({model:"gpt-4o-mini",messages:[{role:"user",content:[{type:"text",text:Xe},{type:"image_url",image_url:{url:r,detail:"high"}}]}],response_format:{type:"json_object"},max_tokens:1800,temperature:.15})});if(!a.ok){const w=((c=(await a.json().catch(()=>({}))).error)==null?void 0:c.message)||`OpenAI API error (${a.status})`;throw new Error(w)}const t=(m=(f=(d=(await a.json()).choices)==null?void 0:d[0])==null?void 0:f.message)==null?void 0:m.content;if(!t)throw new Error("Empty response from AI");const s=JSON.parse(t),p=s.items||s.foods||[],u=Ze(p);if(u.length===0&&((g=s.mealDescription)!=null&&g.toLowerCase().includes("no food")))throw new Error("No food detected in this image. Try a clearer photo.");const l=u.length?u.reduce((o,w)=>o+w.confidence,0)/u.length:0;return{foods:u,description:s.mealDescription||"",confidence:Math.round(l*100)||90}}async function tt(e,i="lunch"){const r=ne();if(!r)return{foods:await xe(e,i),source:"estimate",message:"For accurate results, add your OpenAI API key in Profile → AI Vision",confidence:75,description:"Estimated from meal type (demo mode)"};try{const a=await et(r,e);if(a.foods.length>0)return{foods:a.foods,source:"vision",message:null,confidence:a.confidence,description:a.description};throw new Error("Could not identify food in this photo.")}catch(a){return console.warn("[FoodVision]",a),{foods:await xe(e,i),source:"fallback",message:a.message||"Vision failed — showing estimate. Fix API key in Profile.",confidence:70,description:""}}}function Ae({food:e,onDelete:i,onEdit:r,onTap:a,showDelete:n=!0}){const t=document.createElement("div");t.className="food-card-wrapper",t.style.position="relative",t.style.overflow="hidden",t.style.borderRadius="var(--radius-lg)",t.style.marginBottom="12px";const s=document.createElement("div");s.className="food-card-action-bg",s.style.position="absolute",s.style.right="0",s.style.top="0",s.style.height="100%",s.style.width="70px",s.style.background="var(--accent-red)",s.style.display="flex",s.style.alignItems="center",s.style.justifyContent="center",s.style.borderRadius="0 var(--radius-lg) var(--radius-lg) 0",s.style.cursor="pointer",s.style.zIndex="1",s.innerHTML='<i data-lucide="trash-2" style="color: white; width: 20px; height: 20px;"></i>';const p=document.createElement("div");p.className="food-card-item card glass-card",p.style.position="relative",p.style.zIndex="2",p.style.transition="transform 0.25s ease",p.style.cursor=a?"pointer":"default";const u=e.icon||"🍲",l=e.confidence?Math.round(e.confidence*100):null;if(p.innerHTML=`
    <div style="display: flex; align-items: center; gap: 12px; width: 100%;">
      <div class="food-emoji" style="font-size: 1.8rem; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.06); border-radius: var(--radius-md); border: 1px solid var(--glass-border);">
        ${u}
      </div>
      <div style="flex: 1; min-width: 0;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
          <h4 class="font-display" style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary); margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px;">
            ${e.name}
          </h4>
          <span class="food-calories font-display" style="font-size: 1rem; font-weight: 700; color: var(--accent-pink);">
            ${Math.round(e.calories)} <span style="font-size: 0.75rem; font-weight: 500; color: var(--text-secondary);">kcal</span>
          </span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 8px;">
          <span>${e.serving} ${e.servingUnit}</span>
          ${l?`
            <span style="display: inline-flex; align-items: center; gap: 3px; color: var(--accent-teal); font-weight: 600;">
              <i data-lucide="sparkles" style="width: 10px; height: 10px;"></i>
              ${l}% match
            </span>
          `:""}
        </div>
        <!-- Macros -->
        <div style="display: flex; flex-wrap: wrap; gap: 6px;">
          <span class="macro-pill p-pill" style="display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: var(--radius-full); font-size: 0.7rem; font-weight: 600; background: rgba(0, 206, 201, 0.08); color: var(--accent-teal);">
            P: ${Math.round(e.protein)}g
          </span>
          <span class="macro-pill c-pill" style="display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: var(--radius-full); font-size: 0.7rem; font-weight: 600; background: rgba(253, 203, 110, 0.08); color: var(--accent-yellow);">
            C: ${Math.round(e.carbs)}g
          </span>
          <span class="macro-pill f-pill" style="display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: var(--radius-full); font-size: 0.7rem; font-weight: 600; background: rgba(108, 92, 231, 0.08); color: var(--accent-purple-light);">
            F: ${Math.round(e.fat)}g
          </span>
        </div>
      </div>
    </div>
  `,t.appendChild(s),t.appendChild(p),a&&p.addEventListener("click",c=>{if(p.style.transform==="translateX(-70px)"){p.style.transform="translateX(0)";return}a(e)}),n&&i){s.addEventListener("click",m=>{m.stopPropagation(),t.style.transition="all 0.3s ease",t.style.transform="translateX(-100%)",t.style.opacity="0",t.style.height="0",t.style.marginBottom="0",t.style.padding="0",setTimeout(()=>{i(e.mealId||e.id)},300)});let c=0,d=0,f=!1;p.addEventListener("touchstart",m=>{c=m.touches[0].clientX,f=!0,p.style.transition="none"},{passive:!0}),p.addEventListener("touchmove",m=>{if(!f)return;d=m.touches[0].clientX;const g=d-c;if(g<0){const o=Math.max(g,-70);p.style.transform=`translateX(${o}px)`}else{const o=Math.min(g-70,0);p.style.transform=`translateX(${o}px)`}},{passive:!0}),p.addEventListener("touchend",()=>{if(!f)return;f=!1,p.style.transition="transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",d-c<-35?p.style.transform="translateX(-70px)":p.style.transform="translateX(0)"}),document.addEventListener("touchstart",m=>{!t.contains(m.target)&&p.style.transform==="translateX(-70px)"&&(p.style.transform="translateX(0)")},{passive:!0})}return t}let V=null,B=null,D=[],ie=null,ae=null,Q=!1,Se={source:"estimate",message:null,confidence:75,description:""};function ue(){ie&&(clearTimeout(ie),ie=null),ae&&(clearInterval(ae),ae=null)}function fe(){V==null||V.getTracks().forEach(e=>e.stop()),V=null}function it(e){let i=!1,r=null;function a(l){const c={calories:0,protein:0,carbs:0,fat:0};return l.forEach(d=>{c.calories+=Number(d.calories)||0,c.protein+=Number(d.protein)||0,c.carbs+=Number(d.carbs)||0,c.fat+=Number(d.fat)||0}),{calories:Math.round(c.calories),protein:Math.round(c.protein*10)/10,carbs:Math.round(c.carbs*10)/10,fat:Math.round(c.fat*10)/10}}function n(){const l=ge();e.innerHTML=`
      <div class="nv-scanner animate-fadeIn">
        <div class="nv-scanner-header">
          <button class="btn-back nv-side-btn" type="button" aria-label="Back">
            <i data-lucide="arrow-left" style="width:20px;height:20px;color:#fff;"></i>
          </button>
          <span class="nv-scanner-title">AI Food Scanner</span>
          <button class="btn-flash nv-side-btn" type="button" aria-label="Flash">
            <i data-lucide="zap" class="flash-icon" style="width:18px;height:18px;color:#fff;"></i>
          </button>
        </div>

        <div class="nv-scanner-viewfinder">
          <video id="scanner-video" autoplay playsinline muted></video>
          <div style="position:absolute;inset:0;pointer-events:none;">
            <div class="scanner-line" style="position:absolute;left:0;width:100%;height:2px;background:linear-gradient(90deg,transparent,#00cec9,transparent);animation:scanLine 2.5s linear infinite;"></div>
            <div style="position:absolute;top:14px;left:50%;transform:translateX(-50%);" class="nv-badge ${l?"nv-badge--vision":"nv-badge--estimate"}">
              ${l?"● AI Vision ON":"○ Demo mode"}
            </div>
          </div>
          <div id="camera-fallback" style="display:none;position:absolute;inset:0;background:#0a0a0f;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:24px;text-align:center;">
            <span style="font-size:3rem;">📷</span>
            <p style="color:rgba(255,255,255,0.7);font-size:0.9rem;max-width:260px;line-height:1.5;">Camera unavailable. Upload a photo from your gallery.</p>
            <button class="nv-btn-primary btn-upload-fallback" style="width:auto;padding:0 24px;">Choose Photo</button>
          </div>
        </div>

        <p style="text-align:center;font-size:0.72rem;color:rgba(255,255,255,0.35);padding:8px 20px 0;">
          ${l?"GPT-4 Vision analyzes your actual meal":"Add API key in Profile for accurate AI"}
        </p>

        <div class="nv-scanner-controls">
          <button class="btn-gallery nv-side-btn" type="button">
            <i data-lucide="image" style="width:20px;height:20px;color:#fff;"></i>
            Gallery
          </button>
          <input type="file" id="scanner-file-input" accept="image/*" style="display:none;" />
          <div class="nv-capture-ring">
            <button class="nv-capture-inner btn-trigger-capture" type="button" aria-label="Capture">
              <i data-lucide="camera" style="width:26px;height:26px;color:#222;"></i>
            </button>
          </div>
          <button class="btn-flip nv-side-btn" type="button">
            <i data-lucide="refresh-cw" style="width:20px;height:20px;color:#fff;"></i>
            Flip
          </button>
        </div>
      </div>
    `,window.lucide&&window.lucide.createIcons(),e.querySelector(".btn-back").addEventListener("click",()=>C.back()),e.querySelector(".btn-flash").addEventListener("click",m=>{const g=m.currentTarget;i=!i;const o=g.querySelector(".flash-icon");o&&(o.style.fill=i?"#fdcb6e":"none",o.style.color=i?"#fdcb6e":"#fff")}),e.querySelector(".btn-trigger-capture").addEventListener("click",()=>{const m=e.querySelector("#scanner-video");if((m==null?void 0:m.readyState)>=2&&m.videoWidth>0){const g=document.createElement("canvas");g.width=m.videoWidth,g.height=m.videoHeight,g.getContext("2d").drawImage(m,0,0),B=g.toDataURL("image/jpeg",.85)}else{B=null,L({message:"Use Gallery if camera is not ready",type:"info"});return}s()});const c=e.querySelector("#scanner-file-input");e.querySelector(".btn-gallery").addEventListener("click",()=>c.click());const d=e.querySelector(".btn-upload-fallback");d&&d.addEventListener("click",()=>c.click()),c.addEventListener("change",m=>{var w;const g=(w=m.target.files)==null?void 0:w[0];if(!g)return;const o=new FileReader;o.onload=h=>{B=h.target.result,c.value="",s()},o.onerror=()=>L({message:"Could not read image",type:"error"}),o.readAsDataURL(g)});let f="environment";e.querySelector(".btn-flip").addEventListener("click",()=>{f=f==="environment"?"user":"environment",fe(),t(e.querySelector("#scanner-video"),e.querySelector("#camera-fallback"),f)}),t(e.querySelector("#scanner-video"),e.querySelector("#camera-fallback"),f)}function t(l,c,d){var f;if(!((f=navigator.mediaDevices)!=null&&f.getUserMedia)){c&&(c.style.display="flex");return}navigator.mediaDevices.getUserMedia({video:{facingMode:d,width:{ideal:1280},height:{ideal:720}}}).then(m=>{V=m,l&&(l.srcObject=V,l.play().catch(()=>{}))}).catch(()=>{c&&(c.style.display="flex")})}function s(){Q=!1,fe(),ue();const l=new Date().getHours();l>=5&&l<10?r="breakfast":l>=10&&l<15?r="lunch":l>=17&&l<22?r="dinner":r="snacks";const c=B;e.innerHTML=`
      <div class="scanner-processing-page animate-fadeIn" style="height:100dvh;background:var(--bg-primary);display:flex;flex-direction:column;">
        <div style="height:42%;position:relative;overflow:hidden;background:#111;">
          ${c?`<img src="${c}" alt="Your meal" style="width:100%;height:100%;object-fit:cover;" />`:'<div style="height:100%;display:flex;align-items:center;justify-content:center;font-size:3rem;">🍽️</div>'}
          <div style="position:absolute;inset:0;background:linear-gradient(180deg,transparent,rgba(10,10,15,0.8));"></div>
          <div class="scanner-line" style="position:absolute;left:0;width:100%;height:2px;background:linear-gradient(90deg,transparent,#00cec9,transparent);animation:scanLine 1.6s linear infinite;"></div>
          <div style="position:absolute;bottom:20px;left:50%;transform:translateX(-50%);" class="nv-badge nv-badge--vision">
            <span style="width:6px;height:6px;border-radius:50%;background:var(--accent-teal);animation:pulse 1s infinite;"></span>
            ${ge()?"GPT-4 Vision analyzing...":"Analyzing image..."}
          </div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;gap:20px;text-align:center;">
          <div style="width:88px;height:88px;border-radius:50%;background:var(--gradient-primary);display:flex;align-items:center;justify-content:center;box-shadow:0 12px 40px rgba(108,92,231,0.5);">
            <i data-lucide="brain" style="width:40px;height:40px;color:#fff;" class="animate-pulse"></i>
          </div>
          <div>
            <h2 class="font-display" style="font-size:1.35rem;font-weight:800;color:var(--text-primary);margin:0 0 8px;">Reading Your Meal</h2>
            <p class="processing-text" style="font-size:0.85rem;color:var(--text-secondary);margin:0;min-height:22px;">Identifying foods and nutrients...</p>
          </div>
          <div id="progress-steps" style="width:100%;max-width:300px;display:flex;flex-direction:column;gap:8px;"></div>
        </div>
      </div>
    `,window.lucide&&window.lucide.createIcons();const d=e.querySelector("#progress-steps");["Detecting food items","Estimating portions","Calculating macros"].forEach((g,o)=>{const w=document.createElement("div");w.className="nv-glass",w.style.cssText="padding:10px 14px;display:flex;align-items:center;gap:10px;opacity:0.35;font-size:0.8rem;color:var(--text-secondary);transition:all 0.3s;",w.innerHTML=`<i data-lucide="loader" style="width:14px;height:14px;"></i><span>${g}</span>`,w.dataset.step=o,d.appendChild(w)}),window.lucide&&window.lucide.createIcons(),e.querySelector(".processing-text");let m=0;ae=setInterval(()=>{const g=e.querySelectorAll("#progress-steps > div");m<g.length&&(g[m].style.opacity="1",g[m].style.borderColor="rgba(0,206,201,0.4)",m++)},700),ie=setTimeout(async()=>{var g;if(ue(),!Q)try{const o=await tt(B,r);Se=o,D=(g=o.foods)!=null&&g.length?[...o.foods]:de(r==="snacks"?"snack":r),Q||(o.message&&o.source!=="vision"&&L({message:o.message,type:"info",duration:4e3}),u(D))}catch(o){console.error("[Scanner]",o),Q||(L({message:o.message||"Analysis failed",type:"error"}),n())}},1800)}function p(){const l=e.querySelector(".nv-correction-input"),c=e.querySelector(".nv-search-dropdown");!l||!c||l.addEventListener("input",()=>{const d=l.value.trim();if(d.length<2){c.classList.remove("open"),c.innerHTML="";return}const f=he(d);if(!f.length){c.innerHTML='<div style="padding:12px;font-size:0.8rem;color:var(--text-secondary);text-align:center;">No matches</div>',c.classList.add("open");return}c.innerHTML="",f.forEach(m=>{const g=document.createElement("div");g.className="nv-search-item",g.innerHTML=`
          <span style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:1.2rem;">${m.icon||"🍲"}</span>
            <span style="font-size:0.85rem;font-weight:600;color:var(--text-primary);">${m.name}</span>
          </span>
          <span style="font-size:0.8rem;font-weight:700;color:var(--accent-pink);">${m.calories} kcal</span>
        `,g.addEventListener("click",()=>{D.push({...m,mealId:Date.now().toString(36)+Math.random().toString(36).slice(2,5)}),l.value="",c.classList.remove("open"),u(D),L({message:`Added ${m.name}`,type:"success",duration:1200})}),c.appendChild(g)}),c.classList.add("open")})}function u(l){var S,T,$,E,z;l!=null&&l.length||(l=D.length?D:de("lunch")),D=l.map(k=>({...k,mealId:k.mealId||Date.now().toString(36)}));const c=r||"lunch",d=a(D),f=B,m=Se,g=m.source==="vision",o=g?"nv-badge--vision":"nv-badge--estimate",w=g?`AI Vision · ${m.confidence}%`:"Estimated · add API key in Profile";e.innerHTML=`
      <div class="nv-results animate-fadeIn">
        <div class="nv-results-hero">
          ${f?`<img src="${f}" alt="Scanned meal" />`:'<div style="height:100%;background:linear-gradient(135deg,#1a1a2e,#0a0a0f);"></div>'}
          <div class="nv-results-hero-overlay"></div>
          <div style="position:absolute;top:16px;left:16px;right:16px;display:flex;justify-content:space-between;align-items:center;z-index:2;">
            <button class="btn-back nv-btn-ghost" type="button" style="padding:8px 12px;background:rgba(0,0,0,0.5);border:none;color:#fff;">
              <i data-lucide="arrow-left" style="width:18px;height:18px;"></i>
            </button>
            <button class="btn-restart nv-btn-ghost" type="button" style="padding:8px 12px;background:rgba(0,0,0,0.5);border:none;color:#fff;font-size:0.78rem;">
              <i data-lucide="scan" style="width:14px;height:14px;"></i> Rescan
            </button>
          </div>
          <div class="nv-results-hero-content">
            <span class="nv-badge ${o}" style="margin-bottom:10px;">${w}</span>
            ${m.description?`<p style="font-size:0.78rem;color:var(--text-secondary);margin:0 0 8px;line-height:1.4;">${m.description}</p>`:""}
            <div style="display:flex;align-items:baseline;gap:6px;">
              <span class="nv-calorie-hero">${d.calories}</span>
              <span style="font-size:1.1rem;color:var(--text-secondary);font-weight:600;">kcal total</span>
            </div>
            <div class="nv-macro-row">
              <div class="nv-macro-chip nv-glass" style="border:1px solid rgba(0,206,201,0.2);">
                <div class="nv-macro-chip-label">Protein</div>
                <div class="nv-macro-chip-value" style="color:var(--accent-teal);">${d.protein}g</div>
              </div>
              <div class="nv-macro-chip nv-glass" style="border:1px solid rgba(253,203,110,0.2);">
                <div class="nv-macro-chip-label">Carbs</div>
                <div class="nv-macro-chip-value" style="color:var(--accent-yellow);">${d.carbs}g</div>
              </div>
              <div class="nv-macro-chip nv-glass" style="border:1px solid rgba(162,155,254,0.2);">
                <div class="nv-macro-chip-label">Fat</div>
                <div class="nv-macro-chip-value" style="color:var(--accent-purple-light);">${d.fat}g</div>
              </div>
            </div>
          </div>
        </div>

        <div class="nv-results-body">
          <div class="nv-correction-bar">
            <input type="text" class="nv-correction-input" placeholder="Wrong item? Search to add correct food..." />
            <button class="nv-btn-ghost btn-fix-results" type="button" style="white-space:nowrap;padding:12px 14px;">
              <i data-lucide="search" style="width:16px;height:16px;"></i>
            </button>
          </div>
          <div class="nv-search-dropdown"></div>

          <h3 class="font-display" style="font-size:0.9rem;font-weight:800;color:var(--text-primary);margin:0 0 10px;display:flex;align-items:center;gap:6px;">
            <i data-lucide="list-checks" style="width:16px;height:16px;color:var(--accent-teal);"></i>
            Detected Items (${D.length})
          </h3>
          <div class="results-ingredients-list"></div>

          <div class="nv-glass" style="padding:14px;margin-top:14px;">
            <label style="font-size:0.7rem;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:10px;">Log as</label>
            <div class="meal-type-chips" style="display:flex;gap:6px;">
              ${["breakfast","lunch","dinner","snacks"].map(k=>`
                <button type="button" class="meal-chip ${k===c?"active":""}" data-type="${k}"
                  style="flex:1;padding:10px 0;border-radius:var(--radius-md);font-size:0.75rem;font-weight:600;border:1px solid ${k===c?"var(--accent-teal)":"var(--glass-border)"};background:${k===c?"rgba(0,206,201,0.12)":"transparent"};color:${k===c?"var(--accent-teal)":"var(--text-secondary)"};">
                  ${k.charAt(0).toUpperCase()+k.slice(1)}
                </button>
              `).join("")}
            </div>
          </div>
        </div>

        <div class="nv-results-footer">
          <button class="nv-btn-primary btn-save-meal" type="button">
            <i data-lucide="plus-circle" style="width:18px;height:18px;"></i>
            Add ${d.calories} kcal to Diary
          </button>
          <button class="nv-btn-ghost btn-cancel-results" type="button" style="width:100%;margin-top:8px;justify-content:center;">Discard</button>
        </div>
      </div>
    `,window.lucide&&window.lucide.createIcons();const h=e.querySelector(".results-ingredients-list");D.forEach(k=>{const I=Ae({food:k,showDelete:!0,onDelete:M=>{const A=D.findIndex(P=>(P.mealId||P.id)===M);if(A>=0&&D.splice(A,1),!D.length){L({message:"Add foods via search or rescan",type:"info"}),n();return}u(D)}});h.appendChild(I)}),p(),(S=e.querySelector(".nv-correction-input"))==null||S.focus(),(T=e.querySelector(".btn-back"))==null||T.addEventListener("click",()=>C.back()),($=e.querySelector(".btn-restart"))==null||$.addEventListener("click",()=>{B=null,D=[],n()}),(E=e.querySelector(".btn-cancel-results"))==null||E.addEventListener("click",()=>{B=null,C.navigate("home")}),(z=e.querySelector(".btn-save-meal"))==null||z.addEventListener("click",()=>{var I;if(!D.length){L({message:"No items to save",type:"warning"});return}const k=((I=e.querySelector(".meal-chip.active"))==null?void 0:I.getAttribute("data-type"))||"lunch";y.addMeal(new Date().toISOString().split("T")[0],k,D),y.incrementScanCount(),B=null,D=[],L({message:`Logged to ${k}!`,type:"success"}),C.navigate("diary",{transition:"slide-left"})}),e.querySelectorAll(".meal-chip").forEach(k=>{k.addEventListener("click",()=>{e.querySelectorAll(".meal-chip").forEach(I=>{I.classList.remove("active"),I.style.borderColor="var(--glass-border)",I.style.background="transparent",I.style.color="var(--text-secondary)"}),k.classList.add("active"),k.style.borderColor="var(--accent-teal)",k.style.background="rgba(0,206,201,0.12)",k.style.color="var(--accent-teal)"})})}n()}function at(){}function nt(){Q=!0,ue(),fe()}let O=new Date().toISOString().split("T")[0];function rt(e){function i(t){const s=new Date;return s.setDate(s.getDate()-t),s.toISOString().split("T")[0]}function r(t){const s=new Date(t+"T12:00:00");return["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][s.getDay()]}function a(){const t=y.getDayTotals(O),s=y.getGoals(),p=y.getMeals(O),u=Math.min(Math.round(t.calories/s.calories*100),100),l=[];for(let c=6;c>=0;c--){const d=i(c),f=d===O,m=d===new Date().toISOString().split("T")[0],g=new Date(d+"T12:00:00").getDate();l.push(`
        <button class="date-pill ${f?"active":""}" data-date="${d}" style="flex-shrink: 0; width: 50px; height: 68px; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: var(--radius-md); border: 1px solid ${f?"var(--accent-pink)":"var(--glass-border)"}; background: ${f?"var(--gradient-calories)":"rgba(255,255,255,0.02)"}; color: ${f?"white":"var(--text-secondary)"}; transition: all var(--transition-fast);">
          <span style="font-size: 0.7rem; font-weight: 600; text-transform: uppercase; margin-bottom: 4px;">${r(d)}</span>
          <span class="font-display" style="font-size: 1.15rem; font-weight: 800; color: ${f?"white":"var(--text-primary)"};">${g}</span>
          ${m&&!f?'<div style="width: 4px; height: 4px; border-radius: 50%; background: var(--accent-pink); margin-top: 3px;"></div>':""}
        </button>
      `)}e.innerHTML=`
      <div class="diary-screen animate-fadeIn" style="padding: 20px 16px 0 16px;">
        
        <!-- Header -->
        <div class="section-header" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
          <div>
            <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Diary</span>
            <h1 class="font-display" style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin:0;">Daily Log</h1>
          </div>
          
          <button class="btn-scan-fab" style="width: 38px; height: 38px; border-radius: 50%; background: var(--gradient-primary); color: white; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-glow);">
            <i data-lucide="camera" style="width: 16px; height: 16px;"></i>
          </button>
        </div>

        <!-- Date Selector list -->
        <div class="diary-date-selector scroll-horizontal" style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 12px; margin-bottom: 20px; -webkit-overflow-scrolling: touch;">
          ${l.join("")}
        </div>

        <!-- Day totals summary box -->
        <div class="card glass-card" style="padding: 16px; margin-bottom: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="font-size: 0.8rem; color: var(--text-secondary); font-weight: 600;">Calorie Target Progress</span>
            <span class="font-display" style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary);">${t.calories} / ${s.calories} kcal</span>
          </div>
          <div class="progress-bar-bg" style="width:100%; height: 6px; background: rgba(255,255,255,0.06); border-radius: var(--radius-full); overflow:hidden;">
            <div class="progress-bar-fill" style="width: ${u}%; height: 100%; background: var(--gradient-calories); border-radius: var(--radius-full); transition: width 0.5s ease;"></div>
          </div>
        </div>

        <!-- Meal sections list -->
        <div class="diary-meals-list" style="display: flex; flex-direction: column; gap: 20px; padding-bottom: 110px;">
          ${["breakfast","lunch","dinner","snacks"].map(c=>{const d=p[c]||[];let f=0;return d.forEach(g=>{f+=g.calories}),`
              <div class="diary-meal-section" data-meal-type="${c}">
                <div class="diary-meal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid var(--glass-border); padding-bottom: 8px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 1.25rem;">${{breakfast:"🌅",lunch:"☀️",dinner:"🌙",snacks:"🍿"}[c]}</span>
                    <div>
                      <h3 class="font-display" style="font-size: 0.95rem; font-weight: 800; color: var(--text-primary); margin:0; text-transform: capitalize;">${c}</h3>
                      <span style="font-size: 0.75rem; color: var(--text-secondary); font-weight: 600;">${f} kcal</span>
                    </div>
                  </div>
                  
                  <button class="btn-add-food-section" data-type="${c}" style="width: 28px; height: 28px; border-radius: 50%; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); display: flex; align-items: center; justify-content: center; color: var(--text-primary); transition: all var(--transition-fast);">
                    <i data-lucide="plus" style="width: 14px; height: 14px;"></i>
                  </button>
                </div>
                
                <div class="diary-meal-items-container-${c}">
                  <!-- Dynamic cards -->
                </div>
              </div>
            `}).join("")}
        </div>

        <!-- Sticky Bottom Totals bar -->
        <div class="diary-total glass-card" style="position: fixed; bottom: calc(var(--nav-height) + 12px); left: 50%; transform: translateX(-50%); width: calc(100% - 32px); max-width: 398px; z-index: 10; display: flex; justify-content: space-between; align-items: center; padding: 14px 20px; border-radius: var(--radius-xl); box-shadow: 0 10px 30px rgba(0,0,0,0.3); background: rgba(18, 18, 26, 0.85); backdrop-filter: blur(24px); border: 1px solid var(--glass-border);">
          <div>
            <span style="font-size: 0.75rem; color: var(--text-secondary); font-weight: 600;">DAILY TOTALS</span>
            <div style="display:flex; gap: 10px; margin-top: 4px;">
              <span class="font-display" style="font-size: 0.8rem; font-weight: 700; color: var(--accent-teal);">P: ${t.protein}g</span>
              <span class="font-display" style="font-size: 0.8rem; font-weight: 700; color: var(--accent-yellow);">C: ${t.carbs}g</span>
              <span class="font-display" style="font-size: 0.8rem; font-weight: 700; color: var(--accent-purple-light);">F: ${t.fat}g</span>
            </div>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 0.75rem; color: var(--text-secondary); font-weight: 600; display:block;">CONSUMED</span>
            <span class="font-display" style="font-size: 1.15rem; font-weight: 800; color: var(--accent-pink);">${t.calories} <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary);">kcal</span></span>
          </div>
        </div>

      </div>
    `,window.lucide&&window.lucide.createIcons(),["breakfast","lunch","dinner","snacks"].forEach(c=>{const d=e.querySelector(`.diary-meal-items-container-${c}`),f=p[c]||[];f.length===0?d.innerHTML=`
          <p style="font-size: 0.75rem; color: var(--text-tertiary); margin: 0; padding: 4px 8px; font-style: italic;">No items logged. Tap + to search.</p>
        `:f.forEach(m=>{const g=Ae({food:m,showDelete:!0,onDelete:o=>{y.removeMeal(O,c,o),L({message:"Item removed from diary",type:"info",duration:1500})}});d.appendChild(g)})}),e.querySelectorAll(".date-pill").forEach(c=>{c.addEventListener("click",()=>{O=c.getAttribute("data-date"),a()})}),e.querySelector(".btn-scan-fab").addEventListener("click",()=>{C.navigate("scanner",{transition:"slide-up"})}),e.querySelectorAll(".btn-add-food-section").forEach(c=>{c.addEventListener("click",()=>{const d=c.getAttribute("data-type");n(d)})})}function n(t){const p=R({title:`Log ${t.charAt(0).toUpperCase()+t.slice(1)}`,content:`
      <div style="padding: 0 4px 16px 4px;">
        <!-- Search bar input -->
        <div class="input-group" style="display: flex; align-items: center; background: rgba(255,255,255,0.04); border: 1px solid var(--glass-border); border-radius: var(--radius-md); padding: 8px 12px; margin-bottom: 16px; gap: 8px;">
          <i data-lucide="search" style="width: 16px; height: 16px; color: var(--text-secondary);"></i>
          <input type="text" class="modal-search-input" placeholder="Search foods... (e.g. apple, salmon, burger)" style="flex:1; border:none; background:transparent; outline:none; color: var(--text-primary); font-size: 0.85rem;" />
        </div>

        <div style="max-height: 250px; overflow-y: auto;" class="search-results-list">
          <p style="font-size: 0.75rem; color: var(--text-secondary); margin:0; text-align: center; padding: 12px 0;">Start typing to search the food database...</p>
        </div>
      </div>
    `,onClose:()=>{}}),u=document.getElementById("modal-container"),l=u.querySelector(".modal-search-input"),c=u.querySelector(".search-results-list");window.lucide&&window.lucide.createIcons(),l.focus(),l.addEventListener("input",d=>{const f=d.target.value.trim();if(!f){c.innerHTML='<p style="font-size: 0.75rem; color: var(--text-secondary); margin:0; text-align: center; padding: 12px 0;">Start typing to search...</p>';return}const m=he(f);m.length===0?c.innerHTML='<p style="font-size: 0.75rem; color: var(--text-secondary); margin:0; text-align: center; padding: 12px 0;">No matching foods found. Try "chicken", "apple", or "rice".</p>':(c.innerHTML="",m.forEach(g=>{const o=document.createElement("div");o.className="card",o.style.display="flex",o.style.alignItems="center",o.style.justifyContent="space-between",o.style.padding="10px 12px",o.style.marginBottom="8px",o.style.cursor="pointer",o.style.background="rgba(255,255,255,0.02)",o.style.border="1px solid var(--glass-border)",o.innerHTML=`
            <div style="display:flex; align-items:center; gap: 10px;">
              <span style="font-size: 1.4rem;">${g.icon||"🍲"}</span>
              <div>
                <h4 style="font-size: 0.85rem; font-weight:600; color: var(--text-primary); margin:0;">${g.name}</h4>
                <span style="font-size: 0.7rem; color: var(--text-secondary);">${g.serving} ${g.servingUnit}</span>
              </div>
            </div>
            <div style="text-align: right; display:flex; align-items:center; gap: 12px;">
              <span class="font-display" style="font-size: 0.85rem; font-weight:700; color: var(--accent-pink);">${g.calories} kcal</span>
              <div style="color: var(--accent-teal);"><i data-lucide="plus" style="width: 14px; height:14px;"></i></div>
            </div>
          `,o.addEventListener("click",()=>{y.addMeal(O,t,[g]),L({message:`Added ${g.name} to ${t}!`,type:"success",duration:1500}),p.close()}),c.appendChild(o)}),window.lucide&&window.lucide.createIcons())})}a(),y.subscribe(()=>{C.getCurrentRoute()==="diary"&&a()})}function ot(){}function st({data:e=[],labels:i=[],colors:r=["#fd79a8","#e17055"],height:a=200,barRadius:n=6,animate:t=!0,showValues:s=!0,gradient:p=!0}){const u=document.createElement("div");u.className="chart-container",u.style.position="relative",u.style.width="100%",u.style.height=`${a}px`;const l=document.createElement("canvas");l.style.width="100%",l.style.height="100%",u.appendChild(l);let c,d=t?0:1;function f(){const o=l.getContext("2d");if(!o)return;const w=window.devicePixelRatio||1,h=l.getBoundingClientRect();l.width=h.width*w,l.height=h.height*w,o.scale(w,w);const S=h.width,T=h.height;if(o.clearRect(0,0,S,T),e.length===0){o.fillStyle="rgba(255, 255, 255, 0.4)",o.font="14px Inter, sans-serif",o.textAlign="center",o.fillText("No data available",S/2,T/2);return}const $=16,E=16,z=28,k=28,I=S-$-E,M=T-z-k,A=Math.max(...e,1e3)*1.1,P=Math.min(I/e.length*.55,36),N=(I-P*e.length)/(e.length-1||1);o.strokeStyle="rgba(255, 255, 255, 0.05)",o.lineWidth=1;for(let b=0;b<=3;b++){const H=z+M*(b/3);o.beginPath(),o.moveTo($,H),o.lineTo(S-E,H),o.stroke()}for(let b=0;b<e.length;b++){const H=e[b],Z=H*d,v=$+b*(P+N)+N/2,q=Z/A*M,_=z+M-q;if(q>0){if(o.save(),o.beginPath(),o.moveTo(v,_+n),o.arcTo(v,_,v+P,_,n),o.arcTo(v+P,_,v+P,_+q,n),o.lineTo(v+P,_+q),o.lineTo(v,_+q),o.closePath(),p&&r.length>=2){const j=o.createLinearGradient(v,_,v,_+q);j.addColorStop(0,r[0]),j.addColorStop(1,r[1]),o.fillStyle=j}else o.fillStyle=r[0]||"#fd79a8";o.fill(),o.restore()}s&&d>=.8&&(o.fillStyle="var(--text-primary)",o.font="bold 11px Outfit, sans-serif",o.textAlign="center",o.fillText(Math.round(H).toString(),v+P/2,_-8)),i[b]&&(o.fillStyle="var(--text-secondary)",o.font="500 11px Inter, sans-serif",o.textAlign="center",o.fillText(i[b],v+P/2,T-8))}}function m(){d<1?(d+=.05,f(),c=requestAnimationFrame(m)):(d=1,f())}const g=new ResizeObserver(()=>{f()});return setTimeout(()=>{g.observe(l),t?m():f()},50),u.cleanup=()=>{cancelAnimationFrame(c),g.disconnect()},u}function lt({data:e=[],labels:i=[],color:r="#00cec9",fillColor:a="rgba(0, 206, 201, 0.08)",height:n=200,animate:t=!0,showDots:s=!0,smooth:p=!0}){const u=document.createElement("div");u.className="chart-container",u.style.position="relative",u.style.width="100%",u.style.height=`${n}px`;const l=document.createElement("canvas");l.style.width="100%",l.style.height="100%",u.appendChild(l);let c,d=t?0:1;function f(){const o=l.getContext("2d");if(!o)return;const w=window.devicePixelRatio||1,h=l.getBoundingClientRect();l.width=h.width*w,l.height=h.height*w,o.scale(w,w);const S=h.width,T=h.height;if(o.clearRect(0,0,S,T),e.length===0){o.fillStyle="rgba(255, 255, 255, 0.4)",o.font="14px Inter, sans-serif",o.textAlign="center",o.fillText("No data available",S/2,T/2);return}const $=32,E=16,z=20,k=28,I=S-$-E,M=T-z-k,A=Math.min(...e)*.98,P=Math.max(...e)*1.02,N=P-A||10,b=[],H=I/(e.length-1||1);for(let v=0;v<e.length;v++){const q=e[v],_=A+(q-A)*d,j=$+v*H,Y=z+M-(_-A)/N*M;b.push({x:j,y:Y})}o.strokeStyle="rgba(255, 255, 255, 0.04)",o.lineWidth=1,o.fillStyle="var(--text-secondary)",o.font="10px Inter, sans-serif",o.textAlign="right",o.textBaseline="middle";const Z=4;for(let v=0;v<Z;v++){const q=v/(Z-1),_=z+M*q,j=P-N*q;o.beginPath(),o.moveTo($,_),o.lineTo(S-E,_),o.stroke(),o.fillText(j.toFixed(1),$-8,_)}if(b.length>0){if(o.save(),o.beginPath(),o.moveTo(b[0].x,z+M),o.lineTo(b[0].x,b[0].y),p&&b.length>2)for(let v=0;v<b.length-1;v++){const q=b[v].x+(b[v+1].x-b[v].x)/2,_=b[v].y,j=b[v].x+(b[v+1].x-b[v].x)/2,Y=b[v+1].y;o.bezierCurveTo(q,_,j,Y,b[v+1].x,b[v+1].y)}else for(let v=1;v<b.length;v++)o.lineTo(b[v].x,b[v].y);if(o.lineTo(b[b.length-1].x,z+M),o.closePath(),a)o.fillStyle=a;else{const v=o.createLinearGradient(0,z,0,z+M);v.addColorStop(0,`${r}25`),v.addColorStop(1,`${r}00`),o.fillStyle=v}if(o.fill(),o.restore(),o.save(),o.beginPath(),o.moveTo(b[0].x,b[0].y),p&&b.length>2)for(let v=0;v<b.length-1;v++){const q=b[v].x+(b[v+1].x-b[v].x)/2,_=b[v].y,j=b[v].x+(b[v+1].x-b[v].x)/2,Y=b[v+1].y;o.bezierCurveTo(q,_,j,Y,b[v+1].x,b[v+1].y)}else for(let v=1;v<b.length;v++)o.lineTo(b[v].x,b[v].y);if(o.strokeStyle=r,o.lineWidth=3,o.stroke(),o.restore(),s&&d>=.8)for(let v=0;v<b.length;v++){const q=b[v];o.beginPath(),o.arc(q.x,q.y,4,0,Math.PI*2),o.fillStyle="var(--bg-primary)",o.fill(),o.strokeStyle=r,o.lineWidth=2,o.stroke(),o.fillStyle="var(--text-primary)",o.font="bold 10px Inter, sans-serif",o.textAlign="center",o.fillText(e[v].toFixed(1),q.x,q.y-10)}}o.textAlign="center",o.fillStyle="var(--text-secondary)",o.font="500 11px Inter, sans-serif";for(let v=0;v<i.length;v++)b[v]&&o.fillText(i[v],b[v].x,T-8)}function m(){d<1?(d+=.05,f(),c=requestAnimationFrame(m)):(d=1,f())}const g=new ResizeObserver(()=>{f()});return setTimeout(()=>{g.observe(l),t?m():f()},50),u.cleanup=()=>{cancelAnimationFrame(c),g.disconnect()},u}let W="week",K=null;function ct(e){function i(){const a=y.getGoals(),n=y.getWeekData(),t=y.getMonthData(),s=y.getStreak(),p=W==="week"?n:t;let u=0,l=0,c=0,d=0,f=0;p.forEach(k=>{u+=k.calories||0,l+=k.protein||0,c+=k.carbs||0,d+=k.fat||0,k.calories>0&&f++});const m=Math.round(u/p.length),g=Math.round(l/p.length),o=Math.round(c/p.length),w=Math.round(d/p.length),h=Math.round(f/p.length*100);let S=Math.round(g/a.protein*100),T=`Your protein intake averages <strong>${g}g/day</strong>, meeting <strong>${S}%</strong> of your target goal. Keep up the high protein density!`;S<80&&(T=`You average <strong>${g}g/day</strong> of protein (target: ${a.protein}g). Try adding greek yogurt or eggs to breakfast to close the gap. 🍳`);let $=`Logging consistency is at <strong>${h}%</strong>. ${h>=80?"Incredible discipline, you are building locked-in habits! 🔥":"Consistency breeds success. Set daily tracking reminders to stay aligned."}`;e.innerHTML=`
      <div class="analytics-screen animate-fadeIn" style="padding: 20px 16px 0 16px;">
        
        <!-- Header -->
        <div style="margin-bottom: 20px;">
          <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Analytics</span>
          <h1 class="font-display" style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin:0;">Progress Trends</h1>
        </div>

        <!-- Weekly / Monthly Tab Selector -->
        <div class="analytics-tabs" style="display: flex; gap: 6px; padding: 4px; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: var(--radius-full); margin-bottom: 20px;">
          <button class="btn-tab-toggle tab-week ${W==="week"?"active":""}" style="flex:1; text-align:center; padding: 8px 0; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 600; color: ${W==="week"?"white":"var(--text-secondary)"}; background: ${W==="week"?"var(--gradient-primary)":"transparent"}; transition: all var(--transition-fast);">
            Weekly View
          </button>
          <button class="btn-tab-toggle tab-month ${W==="month"?"active":""}" style="flex:1; text-align:center; padding: 8px 0; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 600; color: ${W==="month"?"white":"var(--text-secondary)"}; background: ${W==="month"?"var(--gradient-primary)":"transparent"}; transition: all var(--transition-fast);">
            Monthly View
          </button>
        </div>

        <!-- Calorie Bar Chart Card -->
        <div class="card glass-card" style="padding: 16px; margin-bottom: 20px; display:flex; flex-direction:column; gap: 12px;">
          <div>
            <h3 class="font-display" style="font-size: 0.95rem; font-weight: 850; color: var(--text-primary); margin:0;">Calorie Intake</h3>
            <p style="font-size: 0.75rem; color: var(--text-secondary); margin:0;">Average: ${m} kcal / day</p>
          </div>
          
          <div id="calorie-chart-mount" style="width:100%;"></div>
        </div>

        <!-- Macro Breakdown Card -->
        <div class="card glass-card" style="padding: 18px; margin-bottom: 20px; display:flex; flex-direction:column; gap: 14px;">
          <div>
            <h3 class="font-display" style="font-size: 0.95rem; font-weight: 850; color: var(--text-primary); margin:0;">Macro Targets (Averages)</h3>
            <p style="font-size: 0.75rem; color: var(--text-secondary); margin:0;">Avg distribution over this period</p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            <!-- Protein Bar -->
            <div>
              <div style="display:flex; justify-content:space-between; font-size: 0.75rem; margin-bottom: 4px;">
                <span style="font-weight: 600; color: var(--text-primary);">Protein</span>
                <span style="color: var(--text-secondary);">${g}g / ${a.protein}g</span>
              </div>
              <div style="height: 6px; background: rgba(255,255,255,0.06); border-radius: 10px; overflow:hidden;">
                <div style="width: ${Math.min(g/a.protein*100,100)}%; height: 100%; background: var(--gradient-protein); border-radius: 10px;"></div>
              </div>
            </div>
            
            <!-- Carbs Bar -->
            <div>
              <div style="display:flex; justify-content:space-between; font-size: 0.75rem; margin-bottom: 4px;">
                <span style="font-weight: 600; color: var(--text-primary);">Carbs</span>
                <span style="color: var(--text-secondary);">${o}g / ${a.carbs}g</span>
              </div>
              <div style="height: 6px; background: rgba(255,255,255,0.06); border-radius: 10px; overflow:hidden;">
                <div style="width: ${Math.min(o/a.carbs*100,100)}%; height: 100%; background: var(--gradient-carbs); border-radius: 10px;"></div>
              </div>
            </div>

            <!-- Fat Bar -->
            <div>
              <div style="display:flex; justify-content:space-between; font-size: 0.75rem; margin-bottom: 4px;">
                <span style="font-weight: 600; color: var(--text-primary);">Fat</span>
                <span style="color: var(--text-secondary);">${w}g / ${a.fat}g</span>
              </div>
              <div style="height: 6px; background: rgba(255,255,255,0.06); border-radius: 10px; overflow:hidden;">
                <div style="width: ${Math.min(w/a.fat*100,100)}%; height: 100%; background: var(--gradient-fat); border-radius: 10px;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 2x2 Stats Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
          <div class="card glass-card" style="padding: 14px; display: flex; flex-direction: column; gap: 6px;">
            <div style="width: 28px; height: 28px; border-radius: 50%; background: rgba(253, 121, 168, 0.1); color: var(--accent-pink); display: flex; align-items: center; justify-content: center;">
              <i data-lucide="sparkles" style="width: 14px; height: 14px;"></i>
            </div>
            <span style="font-size: 0.7rem; color: var(--text-secondary); font-weight:600;">Avg Intake</span>
            <span class="font-display" style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary);">${m} kcal</span>
          </div>

          <div class="card glass-card" style="padding: 14px; display: flex; flex-direction: column; gap: 6px;">
            <div style="width: 28px; height: 28px; border-radius: 50%; background: rgba(0, 206, 201, 0.1); color: var(--accent-teal); display: flex; align-items: center; justify-content: center;">
              <i data-lucide="flame" style="width: 14px; height: 14px;"></i>
            </div>
            <span style="font-size: 0.7rem; color: var(--text-secondary); font-weight:600;">Current Streak</span>
            <span class="font-display" style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary);">${s.current} days</span>
          </div>

          <div class="card glass-card" style="padding: 14px; display: flex; flex-direction: column; gap: 6px;">
            <div style="width: 28px; height: 28px; border-radius: 50%; background: rgba(253, 203, 110, 0.1); color: var(--accent-yellow); display: flex; align-items: center; justify-content: center;">
              <i data-lucide="target" style="width: 14px; height: 14px;"></i>
            </div>
            <span style="font-size: 0.7rem; color: var(--text-secondary); font-weight:600;">Consistency</span>
            <span class="font-display" style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary);">${h}%</span>
          </div>

          <div class="card glass-card" style="padding: 14px; display: flex; flex-direction: column; gap: 6px;">
            <div style="width: 28px; height: 28px; border-radius: 50%; background: rgba(108, 92, 231, 0.1); color: var(--accent-purple-light); display: flex; align-items: center; justify-content: center;">
              <i data-lucide="utensils" style="width: 14px; height: 14px;"></i>
            </div>
            <span style="font-size: 0.7rem; color: var(--text-secondary); font-weight:600;">Meals Logged</span>
            <span class="font-display" style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary);">${y.getTotalMealsLogged()} meals</span>
          </div>
        </div>

        <!-- Contribution Matrix Streak Calendar -->
        <div class="card glass-card" style="padding: 16px; margin-bottom: 20px;">
          <div>
            <h3 class="font-display" style="font-size: 0.95rem; font-weight: 850; color: var(--text-primary); margin-bottom: 12px;">Activity Map</h3>
          </div>
          <!-- Grid representation of 28 day boxes -->
          <div class="analytics-streak-calendar" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; justify-items: center;">
            ${r()}
          </div>
          <div style="display:flex; justify-content:space-between; font-size: 0.65rem; color: var(--text-secondary); margin-top: 10px; padding: 0 4px;">
            <span>28 days ago</span>
            <span>Today</span>
          </div>
        </div>

        <!-- AI insights analysis -->
        <div class="card glass-card" style="padding: 16px; margin-bottom: 40px; display: flex; flex-direction: column; gap: 12px; border-left: 4px solid var(--accent-teal);">
          <div style="display:flex; align-items:center; gap: 6px;">
            <span style="color: var(--accent-teal); display:flex;"><i data-lucide="brain" style="width: 16px; height: 16px;"></i></span>
            <h3 class="font-display" style="font-size: 0.95rem; font-weight: 800; color: var(--text-primary); margin:0;">AI Trend Analysis</h3>
          </div>
          <ul style="font-size: 0.8rem; color: var(--text-secondary); padding-left: 16px; line-height: 1.6; margin: 0; display:flex; flex-direction:column; gap: 8px;">
            <li>${T}</li>
            <li>${$}</li>
          </ul>
        </div>

      </div>
    `,window.lucide&&window.lucide.createIcons();const E=n.map(k=>k.label),z=n.map(k=>k.calories);K&&typeof K.cleanup=="function"&&K.cleanup(),K=st({data:z,labels:E,colors:["#fd79a8","#e17055"],height:160,barRadius:4,animate:!0,showValues:!0,gradient:!0}),e.querySelector("#calorie-chart-mount").appendChild(K),e.querySelector(".tab-week").addEventListener("click",()=>{W="week",i()}),e.querySelector(".tab-month").addEventListener("click",()=>{W="month",i()})}function r(){const a=[],n=new Date;for(let t=27;t>=0;t--){const s=new Date;s.setDate(n.getDate()-t);const p=s.toISOString().split("T")[0],u=y.getMeals(p),l=u.breakfast.length+u.lunch.length+u.dinner.length+u.snacks.length>0;let c="rgba(255,255,255,0.03)",d="1px solid rgba(255,255,255,0.06)";l&&(c="var(--gradient-protein)",d="none"),a.push(`
        <div style="width: 32px; height: 32px; border-radius: var(--radius-sm); background: ${c}; border: ${d}; position:relative; display:flex; align-items:center; justify-content:center;" title="${p}">
          <span style="font-size: 0.6rem; font-weight:700; color: ${l?"#0a0a0f":"var(--text-tertiary)"};">${s.getDate()}</span>
        </div>
      `)}return a.join("")}i()}function dt(){}let J=null;function pt(e){function i(){var T;const r=y.getState(),a=y.getProfile(),n=y.getGoals(),t=y.getWeightHistory(),s=y.getStreak(),p=y.getTodayTotals(),u=n.calories>0?Math.min(p.calories/n.calories*100,100):0,l=n.water>0?Math.min(y.getWater()/n.water*100,100):0,c=Math.min(s.current/7*100,100),d=Math.round(c*.4+l*.3+u*.3)||65,f=(a.height||175)/100,m=((a.weight||72)/(f*f)).toFixed(1);e.innerHTML=`
      <div class="profile-screen animate-fadeIn" style="padding: 20px 16px 40px 16px;">
        
        <!-- Header -->
        <div style="margin-bottom: 24px; text-align: center; display: flex; flex-direction: column; align-items: center; position: relative;">
          <div style="position: absolute; right:0; top:0;">
            <button class="btn-edit-profile" style="width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); display: flex; align-items: center; justify-content: center; color: var(--text-secondary);">
              <i data-lucide="edit-2" style="width: 14px; height: 14px;"></i>
            </button>
          </div>

          <div class="profile-avatar" style="width: 84px; height: 84px; border-radius: 50%; background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 800; color: white; border: 3px solid var(--glass-border); box-shadow: 0 10px 25px rgba(108, 92, 231, 0.25); margin-bottom: 12px;">
            ${((a.name||r.session||"A")[0]||"A").toUpperCase()}
          </div>
          
          <h2 class="font-display name-title-label" style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin:0;">
            ${a.name||r.session||"Alex"}
          </h2>
          <p style="font-size: 0.75rem; color: var(--text-secondary); margin: 4px 0 0 0; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">
            Goal: ${a.goal==="lose"?"Fat Loss":a.goal==="gain"?"Gain Weight / Muscle":"Maintain Weight"}
          </p>
        </div>

        <!-- 3 Stats cards -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 24px;">
          <div class="card glass-card" style="padding: 12px 6px; text-align: center; display: flex; flex-direction: column; gap: 4px;">
            <span style="font-size: 0.65rem; color: var(--text-secondary); font-weight: 600;">Weight</span>
            <span class="font-display" style="font-size: 1rem; font-weight: 800; color: var(--text-primary);">${a.weight||72} <span style="font-size:0.7rem; font-weight: 500; color: var(--text-secondary);">kg</span></span>
          </div>
          <div class="card glass-card" style="padding: 12px 6px; text-align: center; display: flex; flex-direction: column; gap: 4px;">
            <span style="font-size: 0.65rem; color: var(--text-secondary); font-weight: 600;">Health Score</span>
            <span class="font-display" style="font-size: 1rem; font-weight: 800; color: var(--accent-teal);">${d} <span style="font-size:0.7rem; font-weight: 500; color: var(--text-secondary);">/100</span></span>
          </div>
          <div class="card glass-card" style="padding: 12px 6px; text-align: center; display: flex; flex-direction: column; gap: 4px;">
            <span style="font-size: 0.65rem; color: var(--text-secondary); font-weight: 600;">BMI Index</span>
            <span class="font-display" style="font-size: 1rem; font-weight: 800; color: var(--accent-yellow);">${m}</span>
          </div>
        </div>

        <!-- Daily Target Goals editor list -->
        <div class="card glass-card" style="padding: 18px; margin-bottom: 24px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 14px;">
            <h3 class="font-display" style="font-size: 0.95rem; font-weight: 850; color: var(--text-primary); margin:0;">Daily Target Goals</h3>
            <button class="btn-edit-goals" style="font-size: 0.75rem; font-weight: 600; color: var(--accent-pink);">Configure</button>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display:flex; align-items:center; justify-content:space-between; border-bottom: 1px solid var(--glass-border); padding-bottom: 8px;">
              <span style="font-size: 0.8rem; color: var(--text-secondary);">Calories</span>
              <span class="font-display" style="font-size: 0.85rem; font-weight:700; color: var(--accent-pink);">${n.calories} kcal</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; border-bottom: 1px solid var(--glass-border); padding-bottom: 8px;">
              <span style="font-size: 0.8rem; color: var(--text-secondary);">Protein</span>
              <span class="font-display" style="font-size: 0.85rem; font-weight:700; color: var(--accent-teal);">${n.protein} g</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; border-bottom: 1px solid var(--glass-border); padding-bottom: 8px;">
              <span style="font-size: 0.8rem; color: var(--text-secondary);">Carbohydrates</span>
              <span class="font-display" style="font-size: 0.85rem; font-weight:700; color: var(--accent-yellow);">${n.carbs} g</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; border-bottom: 1px solid var(--glass-border); padding-bottom: 8px;">
              <span style="font-size: 0.8rem; color: var(--text-secondary);">Fat</span>
              <span class="font-display" style="font-size: 0.85rem; font-weight:700; color: var(--accent-purple-light);">${n.fat} g</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between;">
              <span style="font-size: 0.8rem; color: var(--text-secondary);">Water Goal</span>
              <span class="font-display" style="font-size: 0.85rem; font-weight:700; color: var(--accent-blue);">${n.water} ml</span>
            </div>
          </div>
        </div>

        <!-- Weight Progress Canvas Chart -->
        <div class="card glass-card" style="padding: 16px; margin-bottom: 24px; display:flex; flex-direction:column; gap: 12px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h3 class="font-display" style="font-size: 0.95rem; font-weight: 850; color: var(--text-primary); margin:0;">Weight History</h3>
              <p style="font-size: 0.75rem; color: var(--text-secondary); margin:0;">Progress over past week</p>
            </div>
            <button class="btn btn-sm btn-log-weight-profile" style="padding: 6px 12px; background: rgba(0, 206, 201, 0.1); border: 1px solid rgba(0, 206, 201, 0.2); color: var(--accent-teal); border-radius: var(--radius-md); font-size: 0.75rem; font-weight: 700;">
              Log
            </button>
          </div>
          <div id="weight-chart-mount" style="width: 100%;"></div>
        </div>

        <!-- AI Vision API -->
        <div class="card glass-card nv-glow-border" style="padding: 18px; margin-bottom: 20px;">
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
            <div style="width:40px;height:40px;border-radius:12px;background:var(--gradient-protein);display:flex;align-items:center;justify-content:center;">
              <i data-lucide="sparkles" style="width:20px;height:20px;color:white;"></i>
            </div>
            <div>
              <h3 class="font-display" style="font-size:0.95rem;font-weight:800;color:var(--text-primary);margin:0;">AI Food Vision</h3>
              <p style="font-size:0.72rem;color:var(--text-secondary);margin:2px 0 0;">${ge()?"✓ Accurate mode active":"Demo mode — add API key"}</p>
            </div>
          </div>
          <p style="font-size:0.78rem;color:var(--text-secondary);line-height:1.5;margin:0 0 12px;">
            Connect OpenAI for real photo analysis (identifies what's actually on your plate).
          </p>
          <input type="password" class="nv-ai-key-input profile-openai-key" placeholder="sk-..." value="${ne()?"••••••••••••"+ne().slice(-6):""}" autocomplete="off" />
          <div style="display:flex;gap:8px;margin-top:10px;">
            <button class="btn btn-primary btn-save-ai-key" style="flex:1;height:42px;font-size:0.82rem;">Save API Key</button>
            <button class="btn btn-ghost btn-clear-ai-key" style="height:42px;font-size:0.82rem;padding:0 14px;">Clear</button>
          </div>
        </div>

        <!-- Setting Options List -->
        <div class="card glass-card" style="padding: 12px; margin-bottom: 24px; display: flex; flex-direction: column; gap: 4px;">
          <!-- Theme selector toggle -->
          <div class="setting-item" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 8px; border-bottom: 1px solid var(--glass-border); cursor: pointer;" id="toggle-theme-row">
            <div style="display:flex; align-items:center; gap: 10px;">
              <div style="color: var(--accent-purple-light); display:flex;"><i data-lucide="${G.isDark()?"moon":"sun"}" style="width: 18px; height: 18px;"></i></div>
              <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-primary);">Dark Theme Mode</span>
            </div>
            <!-- Switch UI -->
            <div class="switch" style="width: 44px; height: 24px; border-radius: 20px; background: ${G.isDark()?"var(--gradient-primary)":"rgba(255,255,255,0.1)"}; position:relative; transition: background 0.3s;">
              <div class="switch-handle" style="width: 18px; height: 18px; border-radius: 50%; background:white; position:absolute; top:3px; left: ${G.isDark()?"23px":"3px"}; transition: left 0.3s;"></div>
            </div>
          </div>

          <!-- Achievements Navigation link -->
          <div class="setting-item" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 8px; border-bottom: 1px solid var(--glass-border); cursor: pointer;" onclick="window.location.hash = '#streaks'">
            <div style="display:flex; align-items:center; gap: 10px;">
              <div style="color: var(--accent-yellow); display:flex;"><i data-lucide="trophy" style="width: 18px; height: 18px;"></i></div>
              <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-primary);">Achievements & Badges</span>
            </div>
            <div style="color: var(--text-tertiary);"><i data-lucide="chevron-right" style="width: 16px; height: 16px;"></i></div>
          </div>

          <!-- Reset Profile Store Option -->
          <div class="setting-item btn-reset-store-row" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 8px; cursor: pointer;">
            <div style="display:flex; align-items:center; gap: 10px;">
              <div style="color: var(--accent-red); display:flex;"><i data-lucide="trash-2" style="width: 18px; height: 18px;"></i></div>
              <span style="font-size: 0.85rem; font-weight: 600; color: var(--accent-red);">Reset App Data</span>
            </div>
            <div style="color: var(--text-tertiary);"><i data-lucide="chevron-right" style="width: 16px; height: 16px;"></i></div>
          </div>
        </div>

        <!-- Info tagline footer -->
        <p style="font-size: 0.7rem; color: var(--text-tertiary); text-align: center; margin: 0;">
          NutriVision AI v1.0.0 — Build #2026<br/>
          Made with ❤️ and Intelligent Neural Models
        </p>

        <div style="margin-top: 18px;">
          <button class="btn btn-danger btn-block btn-logout" style="height: 46px; font-size: 0.9rem;">
            <i data-lucide="log-out" style="width: 18px; height: 18px;"></i>
            Logout
          </button>
        </div>

      </div>
    `,window.lucide&&window.lucide.createIcons(),(T=e.querySelector(".btn-logout"))==null||T.addEventListener("click",()=>{y.logout(),C.navigate("login",{transition:"fade"}),L({message:"Logged out",type:"success"})});const g=t.map($=>{const E=new Date($.date+"T12:00:00").getDate();return`${new Date($.date+"T12:00:00").getMonth()+1}/${E}`}),o=t.map($=>$.weight);J&&typeof J.cleanup=="function"&&J.cleanup(),J=lt({data:o,labels:g,color:"var(--accent-teal)",height:140,animate:!0,showDots:!0,smooth:!0}),e.querySelector("#weight-chart-mount").appendChild(J),e.querySelector(".btn-edit-profile").addEventListener("click",()=>{const $=`
        <div style="padding: 4px 4px 16px 4px; display:flex; flex-direction:column; gap:16px;">
          <div class="input-group">
            <label style="font-size: 0.75rem; font-weight:700; color: var(--text-secondary); text-transform:uppercase; display:block; margin-bottom: 6px;">Your Name</label>
            <input type="text" class="input-field modal-profile-name" value="${a.name}" style="width:100%; padding:12px; background:var(--bg-card); border:1px solid var(--glass-border); border-radius:var(--radius-md); color:var(--text-primary);" />
          </div>
          <div class="input-group">
            <label style="font-size: 0.75rem; font-weight:700; color: var(--text-secondary); text-transform:uppercase; display:block; margin-bottom: 6px;">Height (cm)</label>
            <input type="number" class="input-field modal-profile-height" value="${a.height||175}" style="width:100%; padding:12px; background:var(--bg-card); border:1px solid var(--glass-border); border-radius:var(--radius-md); color:var(--text-primary);" />
          </div>
          <button class="btn btn-primary btn-save-modal-profile" style="width:100%; padding:14px; font-size:0.95rem;">Save Changes</button>
        </div>
      `,E=R({title:"Edit Personal Details",content:$,onClose:()=>{}}),z=document.getElementById("modal-container");z.querySelector(".btn-save-modal-profile").addEventListener("click",()=>{const k=z.querySelector(".modal-profile-name").value.trim(),I=parseInt(z.querySelector(".modal-profile-height").value);k&&I>100&&I<250?(y.setProfile({name:k,height:I}),L({message:"Profile updated successfully!",type:"success"}),E.close()):L({message:"Please enter valid entries",type:"error"})})}),e.querySelector(".btn-edit-goals").addEventListener("click",()=>{const $=`
        <div style="padding: 4px 4px 16px 4px; display:flex; flex-direction:column; gap:12px; max-height: 380px; overflow-y:auto;">
          <div class="input-group">
            <label style="font-size: 0.7rem; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:4px;">Daily Calories (kcal)</label>
            <input type="number" class="input-field goal-c" value="${n.calories}" style="width:100%; padding:10px; background:var(--bg-card); border:1px solid var(--glass-border); border-radius:var(--radius-md); color:var(--text-primary);" />
          </div>
          <div class="input-group">
            <label style="font-size: 0.7rem; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:4px;">Protein (g)</label>
            <input type="number" class="input-field goal-p" value="${n.protein}" style="width:100%; padding:10px; background:var(--bg-card); border:1px solid var(--glass-border); border-radius:var(--radius-md); color:var(--text-primary);" />
          </div>
          <div class="input-group">
            <label style="font-size: 0.7rem; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:4px;">Carbohydrates (g)</label>
            <input type="number" class="input-field goal-ch" value="${n.carbs}" style="width:100%; padding:10px; background:var(--bg-card); border:1px solid var(--glass-border); border-radius:var(--radius-md); color:var(--text-primary);" />
          </div>
          <div class="input-group">
            <label style="font-size: 0.7rem; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:4px;">Fat (g)</label>
            <input type="number" class="input-field goal-f" value="${n.fat}" style="width:100%; padding:10px; background:var(--bg-card); border:1px solid var(--glass-border); border-radius:var(--radius-md); color:var(--text-primary);" />
          </div>
          <div class="input-group">
            <label style="font-size: 0.7rem; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:4px;">Water Target (ml)</label>
            <input type="number" class="input-field goal-w" value="${n.water}" style="width:100%; padding:10px; background:var(--bg-card); border:1px solid var(--glass-border); border-radius:var(--radius-md); color:var(--text-primary);" />
          </div>
          <button class="btn btn-primary btn-save-goals-modal" style="width:100%; padding:12px; margin-top:8px;">Update Targets</button>
        </div>
      `,E=R({title:"Configure Daily Targets",content:$,onClose:()=>{}}),z=document.getElementById("modal-container");z.querySelector(".btn-save-goals-modal").addEventListener("click",()=>{const k=parseInt(z.querySelector(".goal-c").value),I=parseInt(z.querySelector(".goal-p").value),M=parseInt(z.querySelector(".goal-ch").value),A=parseInt(z.querySelector(".goal-f").value),P=parseInt(z.querySelector(".goal-w").value);k>500&&I>10&&M>10&&A>5&&P>200?(y.setGoals({calories:k,protein:I,carbs:M,fat:A,water:P}),L({message:"Nutrition targets successfully updated!",type:"success"}),E.close()):L({message:"Please enter valid nutrition values",type:"error"})})});const w=e.querySelector(".btn-save-ai-key"),h=e.querySelector(".btn-clear-ai-key"),S=e.querySelector(".profile-openai-key");w&&S&&(w.addEventListener("click",()=>{let $=S.value.trim();if($.startsWith("••••")){L({message:"Enter your full API key (sk-...)",type:"info"});return}if(!$.startsWith("sk-")){L({message:"Invalid key format. Should start with sk-",type:"error"});return}ke($),L({message:"AI Vision enabled! Scan food for accurate results.",type:"success"}),i()}),S.addEventListener("focus",()=>{S.value.startsWith("••••")&&(S.value="")})),h&&h.addEventListener("click",()=>{ke(""),L({message:"API key removed",type:"info"}),i()}),e.querySelector("#toggle-theme-row").addEventListener("click",()=>{G.toggle(),i(),L({message:`Switched to ${G.getCurrent()} mode!`,type:"info",duration:1e3})}),e.querySelector(".btn-reset-store-row").addEventListener("click",()=>{confirm("Are you absolutely sure you want to reset all data and history? This action is permanent.")&&(y.resetState(),L({message:"App reset successfully!",type:"warning"}),C.navigate("onboarding",{transition:"fade"}))}),e.querySelector(".btn-log-weight-profile").addEventListener("click",()=>{const $=a.weight||70,E=`
        <div style="padding: 8px 4px 16px 4px;">
          <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); display: block; margin-bottom: 8px;">Enter current weight in kg</label>
          <div class="input-group" style="display: flex; gap: 8px;">
            <input type="number" step="0.1" class="input-field weight-custom-input" placeholder="${$}" value="${$}" style="flex:1; padding: 12px 16px; background: var(--bg-card); border: 1px solid var(--glass-border); border-radius: var(--radius-md); color: var(--text-primary); font-size: 1rem;" />
            <button class="btn btn-primary btn-save-custom-weight" style="padding: 0 20px; font-size:0.9rem;">Log</button>
          </div>
        </div>
      `,z=R({title:"Log Weight Progress",content:E,onClose:()=>{}}),k=document.getElementById("modal-container"),I=k.querySelector(".btn-save-custom-weight"),M=k.querySelector(".weight-custom-input");I.addEventListener("click",()=>{const A=parseFloat(M.value);A&&A>20&&A<300?(y.logWeight(A),y.setProfile({weight:A}),L({message:`Weight logged: ${A} kg! ⚖️`,type:"success"}),z.close()):L({message:"Please enter a valid weight between 20 and 300 kg",type:"error"})})})}i(),y.subscribe(()=>{C.getCurrentRoute()==="profile"&&i()})}const se=[{id:"streak_3",name:"Getting Started",description:"Log meals for 3 days in a row",icon:"🔥",requirement:{type:"streak",value:3},tier:"bronze"},{id:"streak_7",name:"Week Warrior",description:"Log meals for 7 days in a row",icon:"🔥",requirement:{type:"streak",value:7},tier:"silver"},{id:"streak_14",name:"Consistency King",description:"Log meals for 14 days in a row",icon:"👑",requirement:{type:"streak",value:14},tier:"gold"},{id:"streak_30",name:"Unstoppable",description:"Log meals for 30 days straight",icon:"💎",requirement:{type:"streak",value:30},tier:"gold"},{id:"meals_10",name:"First Steps",description:"Log 10 meals total",icon:"🍽️",requirement:{type:"meals_logged",value:10},tier:"bronze"},{id:"meals_50",name:"Meal Tracker",description:"Log 50 meals total",icon:"📝",requirement:{type:"meals_logged",value:50},tier:"silver"},{id:"meals_100",name:"Century Club",description:"Log 100 meals total",icon:"💯",requirement:{type:"meals_logged",value:100},tier:"gold"},{id:"meals_500",name:"Nutrition Master",description:"Log 500 meals total",icon:"🏆",requirement:{type:"meals_logged",value:500},tier:"gold"},{id:"cal_goal_1",name:"On Target",description:"Hit your calorie goal for the first time",icon:"🎯",requirement:{type:"calories_goal",value:1},tier:"bronze"},{id:"cal_goal_7",name:"Week of Balance",description:"Hit your calorie goal 7 times",icon:"⚖️",requirement:{type:"calories_goal",value:7},tier:"silver"},{id:"cal_goal_30",name:"Calorie Commander",description:"Hit your calorie goal 30 times",icon:"🌟",requirement:{type:"calories_goal",value:30},tier:"gold"},{id:"water_goal_3",name:"Hydration Starter",description:"Hit your water goal 3 times",icon:"💧",requirement:{type:"water_goal",value:3},tier:"bronze"},{id:"water_goal_7",name:"Water Warrior",description:"Hit your water goal 7 times",icon:"🌊",requirement:{type:"water_goal",value:7},tier:"silver"},{id:"water_goal_14",name:"Hydration Hero",description:"Hit your water goal 14 times",icon:"🏊",requirement:{type:"water_goal",value:14},tier:"gold"},{id:"weight_1",name:"First Weigh-In",description:"Log your weight for the first time",icon:"⚖️",requirement:{type:"weight_logged",value:1},tier:"bronze"},{id:"scan_1",name:"AI Spotter",description:"Scan your first meal with AI",icon:"📸",requirement:{type:"scan_count",value:1},tier:"bronze"}];function gt(e){function i(){const n=Math.floor(Math.random()*be.length);return be[n]||"Your health is an investment, not an expense."}function r(n){const s=y.getUnlockedAchievements().find(p=>p.id===n);return s?{unlocked:!0,date:s.unlockedAt}:{unlocked:!1}}function a(){const n=y.getState(),t=y.getStreak(),s=y.getUnlockedAchievements(),p=new Date().getDay(),u=[{text:"Drink 2,000ml of water today",target:2e3,current:y.getWater(),unit:"ml",icon:"droplets",key:"water"},{text:"Log 3 meals into your diary",target:3,current:Object.values(y.getTodayMeals()).flat().length,unit:"items",icon:"utensils",key:"meals"},{text:"Stay under your calorie target",target:n.goals.calories,current:y.getTodayTotals().calories,unit:"kcal",icon:"target",key:"calories",isUnder:!0},{text:"Hit your protein goal",target:n.goals.protein,current:y.getTodayTotals().protein,unit:"g",icon:"sparkles",key:"protein"}],l=u[p%u.length];let c=!1;l.isUnder?c=l.current>0&&l.current<=l.target:c=l.current>=l.target,e.innerHTML=`
      <div class="streaks-screen animate-fadeIn" style="padding: 20px 16px 40px 16px;">
        
        <!-- Header -->
        <div style="margin-bottom: 24px;">
          <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Gamification</span>
          <h1 class="font-display" style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin:0;">Streaks & Awards</h1>
        </div>

        <!-- Giant Flame Hero section -->
        <div class="streaks-hero card glass-card" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 28px 24px; text-align: center; margin-bottom: 20px; position:relative; overflow:hidden;">
          <div class="glow-bg" style="position: absolute; width: 180px; height: 180px; background: radial-gradient(circle, rgba(225, 112, 85, 0.2) 0%, rgba(0,0,0,0) 70%); pointer-events: none; z-index:1;"></div>
          
          <span class="streaks-flame animate-float" style="font-size: 5rem; margin-bottom: 12px; display:inline-block; filter: drop-shadow(0 15px 30px rgba(225, 112, 85, 0.4));">🔥</span>
          <h2 class="font-display" style="font-size: 3rem; font-weight: 900; color: var(--text-primary); line-height: 1.1; margin:0;">
            ${t.current||0}
          </h2>
          <p style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 4px 0 0 0;">
            Day Streak
          </p>
          
          <div style="display: flex; gap: 8px; margin-top: 16px; font-size: 0.75rem; color: var(--text-secondary); background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); padding: 6px 12px; border-radius: var(--radius-full); z-index:2;">
            <span>Best Streak: <strong>${t.best||0} days</strong></span>
          </div>
        </div>

        <!-- AI Motivation quote box -->
        <div class="streaks-message card glass-card" style="display:flex; gap:12px; align-items:center; padding: 14px 16px; margin-bottom: 20px; border-left: 4px solid var(--accent-pink);">
          <span style="color: var(--accent-pink); font-size: 1.25rem;">✨</span>
          <p style="font-size: 0.8rem; color: var(--text-secondary); font-style:italic; line-height: 1.45; margin:0;">
            "${i()}"
          </p>
        </div>

        <!-- Daily Challenge Box -->
        <div class="streaks-challenge card glass-card" style="padding: 16px; border: 1.5px solid ${c?"var(--accent-teal)":"var(--glass-border)"}; margin-bottom: 24px; position:relative; overflow:hidden;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px;">
            <span style="font-size:0.7rem; font-weight: 700; color: ${c?"var(--accent-teal)":"var(--text-secondary)"}; text-transform: uppercase; display:flex; align-items:center; gap: 4px;">
              <i data-lucide="${c?"check":"zap"}" style="width:12px; height:12px;"></i> Daily Challenge
            </span>
            ${c?'<span class="badge" style="background: rgba(0, 206, 201, 0.15); color: var(--accent-teal); font-size:0.65rem; font-weight:700; padding:2px 6px; border-radius: var(--radius-full);">COMPLETED</span>':""}
          </div>
          
          <h4 class="font-display" style="font-size: 0.9rem; font-weight: 750; color: var(--text-primary); margin:0 0 10px 0;">
            ${l.text}
          </h4>

          <!-- Challenge indicator progress -->
          <div style="display:flex; align-items:center; gap: 10px;">
            <div style="flex:1; height: 5px; background: rgba(255,255,255,0.06); border-radius:10px; overflow:hidden;">
              <div style="width: ${c?100:Math.min(Math.round(l.current/l.target*100),100)}%; height: 100%; background: ${c?"var(--gradient-protein)":"var(--gradient-calories)"}; border-radius:10px;"></div>
            </div>
            <span style="font-size: 0.75rem; color: var(--text-secondary); font-weight:600; white-space:nowrap;">
              ${l.current} / ${l.target} ${l.unit}
            </span>
          </div>
        </div>

        <!-- Achievements Badge Grid -->
        <div style="margin-bottom: 24px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 14px;">
            <h3 class="font-display" style="font-size: 1rem; font-weight: 800; color: var(--text-primary); margin:0;">Achievements</h3>
            <span style="font-size: 0.75rem; color: var(--text-secondary); font-weight: 600;">${s.length} / ${se.length} Unlocked</span>
          </div>

          <div class="streaks-badges-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
            ${se.map(d=>{const f=r(d.id),g={gold:"#f39c12",silver:"#bdc3c7",bronze:"#cd7f32"}[d.tier]||"#6c5ce7";return`
                <div class="card glass-card badge-item" data-badge-id="${d.id}" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 16px 8px; text-align: center; cursor: pointer; border: 1.5px solid ${f.unlocked?"rgba(255,255,255,0.08)":"rgba(255,255,255,0.02)"}; opacity: ${f.unlocked?"1":"0.45"}; transition: all var(--transition-fast);">
                  <div class="badge-icon-circle" style="width: 46px; height: 46px; border-radius: 50%; background: ${f.unlocked?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.01)"}; display:flex; align-items:center; justify-content:center; font-size: 1.6rem; margin-bottom: 8px; border: 1.5px solid ${f.unlocked?g:"rgba(255,255,255,0.05)"}; box-shadow: ${f.unlocked?`0 4px 15px ${g}30`:"none"}; position:relative;">
                    ${f.unlocked?d.icon:"🔒"}
                  </div>
                  <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-primary); display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:80px; margin-bottom:2px;">${d.name}</span>
                  <span style="font-size: 0.6rem; color: var(--text-secondary); text-transform:uppercase; font-weight:700; letter-spacing:0.3px;">${d.tier}</span>
                </div>
              `}).join("")}
          </div>
        </div>

      </div>
    `,window.lucide&&window.lucide.createIcons(),e.querySelectorAll(".badge-item").forEach(d=>{d.addEventListener("click",()=>{const f=d.getAttribute("data-badge-id"),m=se.find(w=>w.id===f),g=r(f);if(!m)return;const o=`
          <div style="text-align: center; padding: 12px 16px 24px 16px;">
            <div style="font-size: 3.5rem; margin-bottom: 16px;">
              ${g.unlocked?m.icon:"🔒"}
            </div>
            
            <h3 class="font-display" style="font-size: 1.3rem; font-weight: 800; color: var(--text-primary); margin-bottom: 4px;">
              ${m.name}
            </h3>
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: ${m.tier==="gold"?"#f39c12":m.tier==="silver"?"#bdc3c7":"#cd7f32"}; margin-bottom: 16px; display:block;">
              ${m.tier} Tier Medal
            </span>

            <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0 auto 24px auto; max-width: 250px; line-height: 1.5;">
              ${m.description}
            </p>

            ${g.unlocked?`
              <div style="display: inline-flex; align-items: center; gap: 4px; padding: 6px 16px; background: rgba(0, 206, 201, 0.08); border: 1px solid rgba(0, 206, 201, 0.2); border-radius: var(--radius-full); color: var(--accent-teal); font-size: 0.75rem; font-weight:700;">
                <i data-lucide="check" style="width: 14px; height: 14px;"></i> Unlocked on ${g.date}
              </div>
            `:`
              <div style="display: inline-flex; align-items: center; gap: 4px; padding: 6px 16px; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: var(--radius-full); color: var(--text-secondary); font-size: 0.75rem; font-weight:700;">
                Locked
              </div>
            `}
          </div>
        `;R({title:"Achievement Details",content:o,onClose:()=>{}})})})}a()}function $e(){G.init();const e=document.getElementById("screen-container"),i=document.getElementById("nav-container");if(C.init(e),C.register("login",{render:De,hideNav:!0}),C.register("signup",{render:Ue,hideNav:!0}),C.register("onboarding",{render:je,hideNav:!0}),C.register("home",{render:We,onEnter:Fe}),C.register("scanner",{render:it,onEnter:at,onLeave:nt,hideNav:!0}),C.register("diary",{render:rt,onEnter:ot}),C.register("analytics",{render:ct,onEnter:dt}),C.register("profile",{render:pt}),C.register("streaks",{render:gt}),C.onNavigate=r=>{const a=C.routes[r];a!=null&&a.hideNav?(i.innerHTML="",i.style.display="none"):(i.innerHTML="",i.style.display="block",i.appendChild(Pe(r))),window.lucide&&window.lucide.createIcons()},!y.isAuthenticated())C.navigate("login");else if(!y.isOnboarded())C.navigate("onboarding");else{const r=window.location.hash.slice(1)||"home";["login","signup","onboarding","home","scanner","diary","analytics","profile","streaks"].includes(r)?C.navigate(r):C.navigate("home")}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",$e):$e();
