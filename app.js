
const PRODUCTS = [
 {id:'piaram',name:'خرمای پیارم ممتاز',type:'پیارم',price:389000,old:445000,discount:13,rating:4.9,reviews:128,weight:'500 گرم',img:'assets/piaram.svg',badge:'پرفروش'},
 {id:'khasoui',name:'خرمای خاصویی تازه',type:'خاصویی',price:279000,old:320000,discount:13,rating:4.8,reviews:84,weight:'500 گرم',img:'assets/khasoui.svg',badge:'ویژه'},
 {id:'kabkab',name:'خرمای کبکاب دست‌چین',type:'کبکاب',price:219000,old:249000,discount:12,rating:4.7,reviews:61,weight:'700 گرم',img:'assets/kabkab.svg',badge:'محبوب'},
 {id:'mazafati',name:'خرمای مرداسنگ درجه یک',type:'مرداسنگ',price:249000,old:285000,discount:13,rating:4.8,reviews:72,weight:'500 گرم',img:'assets/mazafati.svg',badge:'جدید'},
 {id:'zahedi',name:'خرمای زاهدی صادراتی',type:'زاهدی',price:189000,old:210000,discount:10,rating:4.6,reviews:44,weight:'700 گرم',img:'assets/zahedi.svg',badge:''},
 {id:'shahani',name:'خرمای شاهانی نرم و شیرین',type:'شاهانی',price:229000,old:260000,discount:12,rating:4.7,reviews:53,weight:'500 گرم',img:'assets/shahani.svg',badge:''}
];
const CATS=['پیارم','خاصویی','کبکاب','مرداسنگ','زاهدی','شاهانی','پک هدیه'];
const ICONS={
 home:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-7h6v7"/></svg>',
 search:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
 cart:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H7"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>',
 user:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
 heart:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.8 8.8c0 5.4-8.8 10-8.8 10S3.2 14.2 3.2 8.8A4.7 4.7 0 0 1 12 6.3a4.7 4.7 0 0 1 8.8 2.5Z"/></svg>',
 menu:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
 close:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m6 6 12 12M18 6 6 18"/></svg>',
 arrow:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m9 18 6-6-6-6"/></svg>',
 shield:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6z"/><path d="m8 12 2.5 2.5L16 9"/></svg>',
 truck:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z"/><circle cx="7" cy="19" r="1.5"/><circle cx="18" cy="19" r="1.5"/></svg>',
 leaf:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 4C11 4 5 8 5 15c0 3 2 5 5 5 7 0 10-7 10-16Z"/><path d="M4 20c3-5 7-8 12-10"/></svg>',
 check:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 4 4L19 6"/></svg>'
};
const fmt=n=>n.toLocaleString('fa-IR')+' تومان';
const WEIGHTS=[{label:'۵۰۰ گرم',mult:1},{label:'۱ کیلو',mult:1.9},{label:'۲ کیلو',mult:3.6}];
const PROMOS={'KH10':10,'HORMOZ20':20,'JONOOB15':15};
const getCart=()=>JSON.parse(localStorage.getItem('kh_cart')||'[]');
const saveCart=c=>{localStorage.setItem('kh_cart',JSON.stringify(c));updateCartBadge()};
const getWish=()=>JSON.parse(localStorage.getItem('kh_wish')||'[]');
const saveWish=w=>localStorage.setItem('kh_wish',JSON.stringify(w));
const cartCount=()=>getCart().reduce((a,x)=>a+x.qty,0);
const getOrders=()=>JSON.parse(localStorage.getItem('kh_orders')||'[]');
const saveOrders=o=>localStorage.setItem('kh_orders',JSON.stringify(o));
const getPromo=()=>JSON.parse(localStorage.getItem('kh_promo')||'null');
const savePromo=p=>localStorage.setItem('kh_promo',JSON.stringify(p));
function weightIndex(id){const c=getCart();const it=c.find(x=>x.id===id);return it?(it.wIdx||0):0}
function unitPrice(p,wIdx){return Math.round(p.price*WEIGHTS[wIdx||0].mult)}
function updateCartBadge(){document.querySelectorAll('[data-cart-count]').forEach(x=>x.textContent=cartCount())}
function toast(t){const el=document.getElementById('toast');el.textContent=t;el.classList.add('show');clearTimeout(window.tt);window.tt=setTimeout(()=>el.classList.remove('show'),2200)}
function productById(id){return PRODUCTS.find(p=>p.id===id)}
function iconButton(icon,label,action,extra=''){return `<button class="icon-btn ${extra}" aria-label="${label}" onclick="${action}">${ICONS[icon]}</button>`}
function money(n){return fmt(n)}

function header(active='home'){
 return `<div class="topbar"><div class="container"><span>ارسال به سراسر ایران</span><span>تجربه‌ای اصیل از جنوب</span></div></div>
 <header class="header"><div class="container header-main">
   <a class="brand" href="#/"><img src="assets/logo.svg" alt="لوگوی خرمای هرمزگان"><div><strong>خرمای هرمزگان</strong><span>طعم اصیل جنوب</span></div></a>
   <nav class="desktop-nav"><a href="#/products">محصولات</a><a href="#/categories">دسته‌بندی‌ها</a><a href="#/about">داستان ما</a><a href="#/faq">راهنما</a></nav>
   <div class="searchbar"><span class="search-icon">${ICONS.search}</span><input aria-label="جستجوی محصول" placeholder="جستجوی خرما، پک هدیه یا دسته‌بندی..." onfocus="openSearch()"></div>
   <div class="header-actions">
    ${iconButton('heart','علاقه‌مندی‌ها',"location.hash='#/wishlist'")}
    <span class="relative">${iconButton('cart','سبد خرید',"location.hash='#/cart'")}<span class="cart-dot" data-cart-count>${cartCount()}</span></span>
    ${iconButton('user','حساب کاربری',"location.hash='#/account'")}
   </div>
 </div></header>`;
}
function bottomNav(active='home'){
 const items=[['home','خانه','#/'],['menu','دسته‌بندی','#/categories'],['search','جستجو','search'],['cart','سبد خرید','#/cart'],['user','حساب','#/account']];
 return `<nav class="mobile-nav">${items.map(([i,l,h])=>`<button class="${active===l?'active':''}" onclick="${h==='search'?'openSearch()':`location.hash='${h}'`}">${ICONS[i]}<span>${l}</span>${i==='cart'?'<b class="cart-dot" data-cart-count>'+cartCount()+'</b>':''}</button>`).join('')}</nav>`;
}
function footer(){
 return `<footer class="footer"><div class="container footer-grid">
 <div><a class="brand" href="#/"><img src="assets/logo.svg" alt=""><div><strong>خرمای هرمزگان</strong><span>طعم اصیل جنوب</span></div></a><p>یک تجربه مدرن برای انتخاب و خرید خرمای هرمزگان، با تمرکز بر کیفیت، اصالت و بسته‌بندی شایسته.</p></div>
 <div><h3>فروشگاه</h3><div class="footer-links"><a href="#/products">همه محصولات</a><a href="#/categories">دسته‌بندی‌ها</a><a href="#/wishlist">علاقه‌مندی‌ها</a><a href="#/cart">سبد خرید</a></div></div>
 <div><h3>راهنما</h3><div class="footer-links"><a href="#/faq">سؤالات متداول</a><a href="#/shipping">ارسال</a><a href="#/returns">بازگشت کالا</a><a href="#/terms">قوانین</a></div></div>
 <div><h3>ارتباط</h3><div class="footer-links"><a href="#/contact">تماس با ما</a><a href="#/about">درباره ما</a><span>اینستاگرام</span><span>پشتیبانی آنلاین</span></div></div>
 </div><div class="container footer-bottom">© ۱۴۰۵ خرمای هرمزگان — تمامی حقوق محفوظ است. <span>نمادهای اعتماد در نسخه نهایی اضافه خواهند شد.</span></div></footer>`;
}
function layout(content,active='home'){document.getElementById('app').innerHTML=header(active)+content+footer()+bottomNav(active);updateCartBadge();window.scrollTo(0,0)}

function productCard(p){
 const wished=getWish().includes(p.id);
 return `<article class="product-card" data-card="${p.id}">
 <div class="product-media"><a href="#/product?id=${p.id}"><img src="${p.img}" alt="${p.name}" loading="lazy"></a>
 <div class="product-badges">${p.badge?`<span class="badge green">${p.badge}</span>`:''}${p.discount?`<span class="badge sale">${p.discount}٪ تخفیف</span>`:''}</div>
 <button class="icon-btn wish" aria-label="علاقه‌مندی" onclick="toggleWish('${p.id}')">${wished?'<span style="color:#B64136">'+ICONS.heart+'</span>':ICONS.heart}</button></div>
 <div class="product-body"><a href="#/product?id=${p.id}"><h3 class="product-title">${p.name}</h3></a><div class="product-type">${p.type} · انتخاب وزن</div>
 <div class="rating"><span class="stars">★★★★★</span><b>${p.rating}</b><span class="muted">(${p.reviews})</span></div>
 <div class="price product-price" id="cardPrice-${p.id}">${money(p.price)} <s>${money(p.old)}</s></div>
 <div class="weight-row" data-weight="${p.id}">${WEIGHTS.map((w,i)=>`<button class="${i===0?'active':''}" onclick="cardWeight('${p.id}',${i},this)">${w.label}</button>`).join('')}</div>
 <button class="btn btn-primary product-cta" onclick="addToCart('${p.id}',1,cardWeightIdx('${p.id}'))">افزودن به سبد</button></div></article>`;
}
window.__cardW={};
function cardWeightIdx(id){return window.__cardW[id]||0}
function cardWeight(id,idx,btn){
 window.__cardW[id]=idx;
 btn.parentElement.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
 btn.classList.add('active');
 const p=productById(id);const price=unitPrice(p,idx);const old=Math.round(p.old*WEIGHTS[idx].mult);
 const el=document.getElementById('cardPrice-'+id);
 if(el)el.innerHTML=`${money(price)} <s>${money(old)}</s>`;
}
function categoriesBlock(){
 return `<section class="section"><div class="container"><div class="section-head"><div><h2>انتخاب بر اساس نوع خرما</h2><p>برای شروع، طعم مورد علاقه‌ات را پیدا کن.</p></div><a class="link" href="#/categories">همه دسته‌ها</a></div>
 <div class="category-row">${CATS.map(c=>`<a class="category" href="#/products?cat=${encodeURIComponent(c)}"><div class="category-visual"></div><strong>${c}</strong></a>`).join('')}</div></div></section>`;
}
function home(){
 return `<main>
 <section class="hero"><div class="container"><div class="hero-box"><div class="hero-art"><div class="palm"></div></div><div class="hero-copy">
 <div class="hero-eyebrow">خرمای هرمزگان · انتخاب اصیل جنوب</div><h1>طعم آفتاب جنوب،<br>در هر دانه خرما.</h1>
 <p>خرماهای منتخب هرمزگان را با تجربه‌ای ساده، شفاف و مدرن انتخاب کن؛ از پیارم ممتاز تا طعم‌های محبوب جنوب.</p>
 <div><a class="btn btn-primary" style="background:#E8C995;color:#21382C" href="#/products">مشاهده محصولات</a><a class="btn" style="color:#fff;background:rgba(255,255,255,.08);margin-inline-start:7px" href="#/about">داستان ما</a></div>
 <div class="hero-stat"><span>انتخاب دقیق محصول</span><span>بسته‌بندی شایسته</span><span>ارسال سراسری</span></div>
 </div></div></div></section>
 ${categoriesBlock()}
 <section class="section" style="padding-top:15px"><div class="container"><div class="section-head"><div><h2>پرفروش‌ترین‌ها</h2><p>محصولاتی که بیشتر انتخاب شده‌اند.</p></div><a class="link" href="#/products">مشاهده همه</a></div><div class="h-scroll">${PRODUCTS.slice(0,4).map(productCard).join('')}</div></div></section>
 <section class="section"><div class="container"><div class="feature-strip"><div><span class="badge" style="background:#E8C995;color:#5A371F">پیشنهاد ویژه امروز</span><h2>پک منتخب جنوب</h2><p>ترکیبی از طعم‌های محبوب برای یک تجربه متفاوت؛ این بخش در Prototype نمایشی است.</p><a class="btn" style="background:#F7F1E5;color:#5A371F" href="#/products">مشاهده پیشنهادها</a></div><div class="countdown"><div><strong>۰۴</strong><span>ساعت</span></div><div><strong>۲۸</strong><span>دقیقه</span></div><div><strong>۳۶</strong><span>ثانیه</span></div></div></div></div></section>
 <section class="section"><div class="container"><div class="section-head"><div><h2>چرا خرمای هرمزگان؟</h2><p>جزئیات کوچک، تجربه خرید بهتر می‌سازند.</p></div></div><div class="benefits">
 ${[['shield','اصالت و انتخاب','اطلاعات شفاف برای انتخاب مطمئن.'],['leaf','نگاه طبیعی','طراحی و بسته‌بندی با الهام از جنوب.'],['truck','ارسال سراسری','فرآیند ارسال ساده و قابل پیگیری.'],['check','کیفیت تجربه','از انتخاب تا دریافت، بدون پیچیدگی.']].map(x=>`<div class="benefit"><div class="benefit-mark">${ICONS[x[0]]}</div><strong>${x[1]}</strong><p>${x[2]}</p></div>`).join('')}</div></div></section>
 <section class="section"><div class="container story"><div class="story-visual"></div><div class="story-copy"><span class="badge">داستان برند</span><h2>از دل نخلستان‌های هرمزگان</h2><p>خرما فقط یک محصول نیست؛ بخشی از اقلیم، کشاورزی و مهمان‌نوازی جنوب است. «خرمای هرمزگان» تلاش می‌کند همین حس را در یک تجربه خرید امروزی، آرام و دقیق منتقل کند.</p><a class="link" href="#/about">بیشتر درباره ما ${ICONS.arrow}</a></div></div></section>
 <section class="section"><div class="container"><div class="section-head"><div><h2>تازه از تجربه مشتریان</h2><p>نمونه محتوای نمایشی برای Prototype.</p></div></div><div class="review-grid">${[['سارا محمدی','پک پیارم','بسته‌بندی خیلی تمیز بود و انتخاب وزن هم کاربردی بود.'],['رضا احمدی','خرمای خاصویی','صفحه محصول اطلاعات را خیلی سریع منتقل می‌کند.'],['مریم کاظمی','خرمای کبکاب','طراحی ساده است ولی حس محصول را خوب منتقل می‌کند.']].map((r,i)=>`<div class="review"><div class="review-top"><div class="avatar">${r[0][0]}</div><div><strong>${r[0]}</strong><div class="stars">★★★★★</div></div></div><p>${r[2]}</p><small class="muted">${r[1]}</small></div>`).join('')}</div></div></section>
 <section class="section"><div class="container"><div class="section-head"><div><h2>پاسخ پرسش‌های رایج</h2><p>اطلاعات کوتاه برای تصمیم‌گیری سریع‌تر.</p></div><a class="link" href="#/faq">همه سؤالات</a></div>${faqItems().slice(0,3).join('')}</div></section>
 </main>`;
}
function productsPage(params){
 params=params||new URLSearchParams();
 const cat=params.get('cat')||'';
 const sort=params.get('sort')||'popular';
 const minP=Number(params.get('min')||0);
 const maxP=Number(params.get('max')||0);
 let list=PRODUCTS.filter(p=>!cat||p.type===cat);
 if(minP)list=list.filter(p=>p.price>=minP);
 if(maxP)list=list.filter(p=>p.price<=maxP);
 if(sort==='cheap')list=[...list].sort((a,b)=>a.price-b.price);
 else if(sort==='exp')list=[...list].sort((a,b)=>b.price-a.price);
 else if(sort==='new')list=[...list].reverse();
 else list=[...list].sort((a,b)=>b.rating-a.rating);
 const cards=list.length?list.map(productCard).join(''):'';
 return `<main><div class="container"><div class="page-head"><div class="breadcrumb">خانه / محصولات${cat?' / '+cat:''}</div><h1>${cat?cat:'همه محصولات'}</h1><p class="muted">انتخابی از خرماهای هرمزگان برای سلیقه‌های مختلف.</p></div>
 <div class="toolbar"><button class="btn btn-soft filter-btn" onclick="showFilter('${cat}','${minP}','${maxP}')">فیلترها${cat||minP||maxP?' ●':''}</button><select aria-label="مرتب‌سازی" onchange="setSort(this.value,'${cat}')">
 <option value="popular" ${sort==='popular'?'selected':''}>مرتب‌سازی: محبوب‌ترین</option>
 <option value="new" ${sort==='new'?'selected':''}>جدیدترین</option>
 <option value="cheap" ${sort==='cheap'?'selected':''}>ارزان‌ترین</option>
 <option value="exp" ${sort==='exp'?'selected':''}>گران‌ترین</option></select></div>
 ${cat?`<button class="btn btn-outline" style="margin-bottom:12px" onclick="location.hash='#/products'">حذف فیلتر دسته «${cat}» ${ICONS.close}</button>`:''}
 <div class="product-grid">${cards}</div>${list.length?'':emptyState('محصولی پیدا نشد','فیلترها را تغییر بده یا پاک کن.','مشاهده همه محصولات','#/products')}</div></main>`;
}
function setSort(val,cat){
 const p=new URLSearchParams(location.hash.split('?')[1]||'');
 p.set('sort',val); if(cat)p.set('cat',cat); else p.delete('cat');
 location.hash='#/products?'+p.toString();
}
function productDetail(id='piaram'){
 const p=productById(id)||PRODUCTS[0];
 window.__detailW=0;
 return `<main><div class="container"><div class="page-head"><div class="breadcrumb">خانه / محصولات / ${p.name}</div></div>
 <div class="detail"><div><div class="gallery-main"><img src="${p.img}" alt="${p.name}"></div><div class="thumb-row"><button class="thumb active"><img src="${p.img}" alt=""></button><button class="thumb"><img src="${p.img}" alt=""></button><button class="thumb"><img src="${p.img}" alt=""></button></div></div>
 <div class="panel" data-pid="${p.id}"><span class="badge green">${p.badge||'انتخاب ویژه'}</span><h1 class="detail-title">${p.name}</h1><div class="rating"><span class="stars">★★★★★</span><b>${p.rating}</b><span class="muted">بر اساس ${p.reviews} نظر</span></div>
 <div class="price detail-price" id="detailPrice">${money(p.price)} <s>${money(p.old)}</s></div><p class="muted small">قیمت بر اساس وزن انتخابی محاسبه می‌شود</p>
 <div class="info-list"><div class="info-item"><span>نوع خرما</span><b>${p.type}</b></div><div class="info-item"><span>وضعیت</span><b style="color:var(--success)">موجود</b></div><div class="info-item"><span>ارسال</span><b>سراسری</b></div></div>
 <label class="small"><b>وزن</b></label><div class="weight-row">${WEIGHTS.map((w,i)=>`<button class="${i===0?'active':''}" onclick="detailWeight(${i},this)">${w.label}</button>`).join('')}</div>
 <div style="display:flex;align-items:center;gap:10px;margin:15px 0"><span class="small"><b>تعداد</b></span><div class="qty"><button onclick="changeDetailQty(-1)">−</button><span id="detailQty">۱</span><button onclick="changeDetailQty(1)">+</button></div></div>
 <div style="display:flex;gap:8px"><button class="btn btn-primary" style="flex:1" onclick="addToCart('${p.id}',Number(document.getElementById('detailQty').textContent.replace(/[^\d]/g,''))||1,window.__detailW)">افزودن به سبد</button>${iconButton('heart','افزودن به علاقه‌مندی',`toggleWish('${p.id}')`)}</div>
 </div></div>
 <section class="section"><div class="tabs"><button class="tab active">توضیحات</button><button class="tab">مشخصات</button><button class="tab">نظرات</button></div><div class="panel"><h3>درباره محصول</h3><p class="muted small">این متن نمونه برای Prototype است و در نسخه نهایی بر اساس مشخصات واقعی هر محصول تکمیل می‌شود. هدف این بخش، نمایش سلسله‌مراتب محتوا و تجربه خواندن در موبایل است.</p><div class="info-list"><div class="info-item"><span>بسته‌بندی</span><b>بسته‌بندی مناسب ارسال</b></div><div class="info-item"><span>شرایط نگهداری</span><b>جای خشک و خنک</b></div></div></div></section>
 <section class="section"><div class="section-head"><h2>محصولات مشابه</h2></div><div class="product-grid">${PRODUCTS.filter(x=>x.id!==p.id).slice(0,4).map(productCard).join('')}</div></section>
 </div></main><div class="sticky-buy"><span class="price" id="stickyPrice">${money(p.price)}</span><button class="btn btn-primary" onclick="addToCart('${p.id}',Number(document.getElementById('detailQty').textContent.replace(/[^\d]/g,''))||1,window.__detailW)">افزودن به سبد</button></div>`;
}
function changeDetailQty(delta){let n=parseInt(document.getElementById('detailQty').textContent)||1;n=Math.max(1,Math.min(20,n+delta));document.getElementById('detailQty').textContent=n.toLocaleString('fa-IR')}
window.__detailW=0;
function detailWeight(idx,btn){
 window.__detailW=idx;
 btn.parentElement.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
 btn.classList.add('active');
 const id=btn.closest('.panel').dataset.pid;const p=productById(id);
 const price=unitPrice(p,idx);const old=Math.round(p.old*WEIGHTS[idx].mult);
 const el=document.getElementById('detailPrice');
 if(el)el.innerHTML=`${money(price)} <s>${money(old)}</s>`;
 const sb=document.getElementById('stickyPrice');if(sb)sb.textContent=money(price);
}
function addToCart(id,qty=1,wIdx=0){
 const p=productById(id);if(!p)return;
 let c=getCart();
 let item=c.find(x=>x.id===id&&(x.wIdx||0)===wIdx);
 if(item)item.qty+=qty;else c.push({id,qty,wIdx});
 saveCart(c);
 toast(`${p.name} (${WEIGHTS[wIdx].label}) به سبد خرید اضافه شد`);
}
function toggleWish(id){let w=getWish();w=w.includes(id)?w.filter(x=>x!==id):[...w,id];saveWish(w);toast(w.includes(id)?'به علاقه‌مندی‌ها اضافه شد':'از علاقه‌مندی‌ها حذف شد');router()}
function cartLineTotal(x){const p=productById(x.id);return unitPrice(p,x.wIdx||0)*x.qty}
function cartSubtotal(c){return c.reduce((s,x)=>s+cartLineTotal(x),0)}
function cartPage(){
 const c=getCart();
 if(!c.length)return `<main><div class="container">${emptyState('سبد خرید شما خالی است','محصولی را انتخاب کن تا اینجا نمایش داده شود.','مشاهده محصولات','#/products')}</div></main>`;
 const rows=c.map((x,idx)=>{const p=productById(x.id);const w=WEIGHTS[x.wIdx||0];return `<div class="cart-item"><div class="cart-img"><img src="${p.img}" alt="${p.name}"></div><div class="cart-meta"><h3>${p.name}</h3><span class="muted small">${w.label}</span><div class="cart-bottom"><div class="qty"><button onclick="changeCart(${idx},-1)">−</button><span>${x.qty.toLocaleString('fa-IR')}</span><button onclick="changeCart(${idx},1)">+</button></div><b class="price">${money(cartLineTotal(x))}</b></div><button class="btn btn-danger" style="min-height:32px;margin-top:7px;padding:0 10px;font-size:.7rem" onclick="removeCart(${idx})">حذف</button></div></div>`}).join('');
 const subtotal=cartSubtotal(c);const promo=getPromo();const discount=promo?Math.round(subtotal*promo.pct/100):0;
 const ship=(subtotal-discount)>=600000?0:45000;const total=subtotal-discount+ship;
 return `<main><div class="container"><div class="page-head"><h1>سبد خرید</h1><p class="muted">محصولات انتخاب‌شده را بررسی کن.</p></div><div class="layout-2"><div class="cart-list">${rows}</div><aside class="panel summary"><h3>خلاصه سفارش</h3><div class="summary-row"><span>جمع کالاها</span><b>${money(subtotal)}</b></div><div class="summary-row"><span>تخفیف${promo?` (${promo.code})`:''}</span><b style="color:var(--success)">${discount?'-'+money(discount):'—'}</b></div><div class="summary-row"><span>ارسال</span><b>${ship?money(ship):'رایگان'}</b></div><div class="summary-row summary-total"><span>مبلغ نهایی</span><b>${money(total)}</b></div><div class="field" style="margin-top:12px;display:flex;gap:6px"><input id="promoInput" placeholder="کد تخفیف (مثلاً KH10)" value="${promo?promo.code:''}"><button class="btn btn-soft" onclick="applyPromo()">اعمال</button></div><button class="btn btn-primary" style="width:100%" onclick="location.hash='#/checkout'">ادامه و تسویه حساب</button></aside></div></div></main>`;
}
function applyPromo(){
 const code=(document.getElementById('promoInput').value||'').trim().toUpperCase();
 if(!code){savePromo(null);toast('کد تخفیف حذف شد');router();return}
 if(PROMOS[code]){savePromo({code,pct:PROMOS[code]});toast(`کد تخفیف ${code} اعمال شد (${PROMOS[code]}٪)`)}
 else{toast('کد تخفیف معتبر نیست')}
 router();
}
function changeCart(idx,d){let c=getCart();let i=c[idx];if(i){i.qty=Math.max(1,i.qty+d);saveCart(c);router()}}
function removeCart(idx){let c=getCart();c.splice(idx,1);saveCart(c);toast('محصول حذف شد');router()}
function emptyState(title,text,btn,href){return `<div class="empty"><div class="empty-mark">${ICONS.cart}</div><h2>${title}</h2><p>${text}</p><a class="btn btn-primary" href="${href}">${btn}</a></div>`}
function checkout(){
 const c=getCart(); if(!c.length)return `<main><div class="container">${emptyState('سبد خرید خالی است','برای ادامه ابتدا محصولی به سبد اضافه کن.','بازگشت به محصولات','#/products')}</div></main>`;
 const promo=getPromo();const subtotal=cartSubtotal(c);const discount=promo?Math.round(subtotal*promo.pct/100):0;
 const ship=(subtotal-discount)>=600000?0:45000;const total=subtotal-discount+ship;
 return `<main><div class="container"><div class="page-head"><h1>تسویه حساب</h1><p class="muted">یک مسیر ساده و مرحله‌ای برای تکمیل سفارش.</p></div><div class="layout-2"><div>
 <div class="panel"><h3>۱. اطلاعات مشتری</h3><div class="form-grid two"><div class="field"><label>نام و نام خانوادگی</label><input id="ckName" placeholder="مثلاً امیر صالح"></div><div class="field"><label>شماره موبایل</label><input id="ckPhone" inputmode="tel" placeholder="۰۹۱۲..."></div></div></div>
 <div class="panel" style="margin-top:12px"><h3>۲. آدرس</h3><div class="form-grid two"><div class="field"><label>استان</label><select id="ckProvince"><option>هرمزگان</option><option>تهران</option><option>فارس</option></select></div><div class="field"><label>شهر</label><input id="ckCity" placeholder="شهر"></div></div><div class="field"><label>نشانی کامل</label><textarea id="ckAddress" rows="3" style="height:auto;padding-top:12px" placeholder="نشانی"></textarea></div></div>
 <div class="panel" style="margin-top:12px"><h3>۳. روش ارسال</h3><label class="notice" style="display:block"><input type="radio" checked> ارسال عادی · ${ship?money(ship):'رایگان'}</label></div>
 <div class="panel" style="margin-top:12px"><h3>۴. پرداخت</h3><label class="notice" style="display:block"><input type="radio" checked> پرداخت در محل / کارت به کارت (نسخه نمایشی)</label></div>
 <button class="btn btn-primary" style="width:100%;margin-top:12px" onclick="placeOrder(${total})">ثبت سفارش</button>
 </div><aside class="panel summary"><h3>خلاصه سفارش</h3>${c.map(x=>{let p=productById(x.id);return `<div class="summary-row"><span>${p.name} × ${x.qty.toLocaleString('fa-IR')}</span><b>${money(cartLineTotal(x))}</b></div>`}).join('')}<div class="summary-row"><span>تخفیف</span><b style="color:var(--success)">${discount?'-'+money(discount):'—'}</b></div><div class="summary-row"><span>ارسال</span><b>${ship?money(ship):'رایگان'}</b></div><div class="summary-total summary-row"><span>جمع نهایی</span><b>${money(total)}</b></div></aside></div></div></main>`;
}
function placeOrder(total){
 const name=(document.getElementById('ckName').value||'').trim();
 const phone=(document.getElementById('ckPhone').value||'').trim();
 const city=(document.getElementById('ckCity').value||'').trim();
 const address=(document.getElementById('ckAddress').value||'').trim();
 if(!name||!phone||!city||!address){toast('لطفاً همه فیلدهای ضروری را پر کن');return}
 const c=getCart();
 const order={
  id:'KH-'+Date.now().toString().slice(-8),
  date:new Date().toLocaleDateString('fa-IR'),
  items:c.map(x=>{const p=productById(x.id);return {name:p.name,weight:WEIGHTS[x.wIdx||0].label,qty:x.qty,total:cartLineTotal(x)}}),
  total,name,phone,city,address,
  status:'در حال آماده‌سازی'
 };
 const orders=getOrders();orders.unshift(order);saveOrders(orders);
 saveCart([]);savePromo(null);
 toast('سفارش شما با موفقیت ثبت شد');
 location.hash='#/orders';
}
function wishlist(){
 const w=getWish();const ps=PRODUCTS.filter(p=>w.includes(p.id));
 return `<main><div class="container"><div class="page-head"><h1>علاقه‌مندی‌ها</h1><p class="muted">محصولاتی که برای بعد نگه داشته‌ای.</p></div>${ps.length?`<div class="product-grid">${ps.map(productCard).join('')}</div>`:emptyState('هنوز چیزی ذخیره نکرده‌ای','با لمس نشان قلب، محصولات مورد علاقه‌ات را اینجا نگه دار.','مشاهده محصولات','#/products')}</div></main>`;
}
function account(){
 return `<main><div class="container"><div class="page-head"><h1>حساب کاربری</h1><p class="muted">مرکز ساده مدیریت سفارش‌ها و اطلاعات شما.</p></div><div class="benefits"><a class="benefit" href="#/orders"><div class="benefit-mark">${ICONS.cart}</div><strong>سفارش‌های من</strong><p>مشاهده وضعیت و جزئیات سفارش‌ها</p></a><a class="benefit" href="#/wishlist"><div class="benefit-mark">${ICONS.heart}</div><strong>علاقه‌مندی‌ها</strong><p>محصولات ذخیره‌شده</p></a><div class="benefit"><div class="benefit-mark">${ICONS.user}</div><strong>اطلاعات حساب</strong><p>نسخه Prototype — بدون احراز هویت واقعی</p></div><div class="benefit"><div class="benefit-mark">${ICONS.truck}</div><strong>آدرس‌ها</strong><p>مدیریت آدرس‌های ارسال در نسخه نهایی</p></div></div></div></main>`;
}
function orders(){
 const list=getOrders();
 if(!list.length)return `<main><div class="container">${emptyState('هنوز سفارشی ثبت نشده','بعد از تکمیل خرید، سفارش‌هایت اینجا نمایش داده می‌شود.','مشاهده محصولات','#/products')}</div></main>`;
 const rows=list.map(o=>`<div class="order"><div><b>سفارش #${o.id}</b><div class="muted small">${o.items.length.toLocaleString('fa-IR')} قلم · ${money(o.total)} · ${o.date}</div></div><span class="status">${o.status}</span></div>`).join('');
 return `<main><div class="container"><div class="page-head"><h1>سفارش‌های من</h1><p class="muted">تاریخچه سفارش‌های ثبت‌شده شما.</p></div><div class="panel">${rows}</div></div></main>`;
}
function login(register=false){
 return `<main><div class="container" style="max-width:520px"><div class="page-head"><h1>${register?'ساخت حساب کاربری':'ورود به حساب'}</h1><p class="muted">${register?'برای تجربه بهتر خرید، حساب خود را بساز.':'به حساب خود وارد شو و سفارش‌ها را مدیریت کن.'}</p></div><div class="panel"><div class="field"><label>شماره موبایل</label><input inputmode="tel" placeholder="۰۹۱۲..."></div>${register?'<div class="field"><label>نام و نام خانوادگی</label><input placeholder="نام شما"></div>':''}<button class="btn btn-primary" style="width:100%" onclick="toast('احراز هویت در این مرحله فعال نیست.')">${register?'ثبت‌نام':'ورود'}</button><p class="muted small" style="text-align:center">${register?'قبلاً حساب داری؟':'حساب نداری؟'} <a class="link" href="#/${register?'login':'register'}">${register?'ورود':'ثبت‌نام'}</a></p></div></div></main>`;
}
function about(){return `<main><div class="container"><div class="page-head"><h1>درباره خرمای هرمزگان</h1><p class="muted">یک روایت مدرن از محصولی ریشه‌دار در جنوب ایران.</p></div><div class="story"><div class="story-visual"></div><div class="story-copy"><span class="badge">هویت برند</span><h2>اصالت، بدون شلوغی</h2><p>این Prototype زبان بصری برند را بر پایه خرما، نخل، خاک و نور جنوب شکل می‌دهد؛ اما از کلیشه‌های سنتی فاصله می‌گیرد تا حس یک فروشگاه مدرن و حرفه‌ای را بسازد.</p></div></div></div></main>`}
function contact(){return `<main><div class="container" style="max-width:800px"><div class="page-head"><h1>تماس با ما</h1><p class="muted">در نسخه نهایی این فرم به سیستم پشتیبانی متصل می‌شود.</p></div><div class="panel"><div class="form-grid two"><div class="field"><label>نام</label><input placeholder="نام شما"></div><div class="field"><label>موبایل</label><input placeholder="۰۹۱۲..."></div></div><div class="field"><label>موضوع</label><input placeholder="موضوع پیام"></div><div class="field"><label>پیام</label><textarea rows="5" style="height:auto;padding-top:12px" placeholder="پیام شما"></textarea></div><button class="btn btn-primary" onclick="toast('پیام در Prototype ارسال واقعی ندارد.')">ارسال پیام</button></div></div></main>`}
function faqItems(){return [['خرما چگونه ارسال می‌شود؟','روش‌های ارسال در نسخه نهایی بر اساس شهر و سبد خرید محاسبه می‌شوند.'],['چگونه محصول مناسب انتخاب کنم؟','از فیلتر نوع خرما، وزن و امتیاز استفاده کن یا از بخش جستجو کمک بگیر.'],['شرایط نگهداری خرما چیست؟','شرایط دقیق هر محصول در صفحه همان محصول درج خواهد شد.'],['ارسال به چه شهرهایی انجام می‌شود؟','هدف فروشگاه، پوشش سراسری ایران است؛ جزئیات مناطق در نسخه نهایی مشخص می‌شود.'],['زمان ارسال چقدر است؟','زمان ارسال بر اساس مقصد و روش ارسال در مرحله Checkout نمایش داده خواهد شد.']].map(x=>`<details><summary>${x[0]}</summary><p>${x[1]}</p></details>`)}
function faq(){return `<main><div class="container" style="max-width:900px"><div class="page-head"><h1>سؤالات متداول</h1><p class="muted">پاسخ‌های کوتاه برای شروع.</p></div>${faqItems().join('')}</div></main>`}
function categories(){return `<main><div class="container"><div class="page-head"><h1>دسته‌بندی‌ها</h1><p class="muted">خرما را بر اساس نوع و کاربرد انتخاب کن.</p></div><div class="product-grid">${CATS.map((c,i)=>`<a class="category" style="padding:14px" href="#/products?cat=${encodeURIComponent(c)}"><div class="category-visual" style="height:140px"></div><strong>${c}</strong><p class="muted small">محصولات منتخب</p></a>`).join('')}</div></div></main>`}
function searchPage(q=''){
 const ps=PRODUCTS.filter(p=>(p.name+p.type).includes(q));
 return `<main><div class="container"><div class="page-head"><h1>نتایج جستجو</h1><p class="muted">${q?`نتایج برای «${q}»`:'جستجوی خود را وارد کنید.'}</p></div>${ps.length?`<div class="product-grid">${ps.map(productCard).join('')}</div>`:emptyState('نتیجه‌ای پیدا نشد','عبارت دیگری را امتحان کن یا از دسته‌بندی‌ها شروع کن.','مشاهده محصولات','#/products')}</div></main>`;
}
function simplePage(title,desc){return `<main><div class="container" style="max-width:850px"><div class="page-head"><h1>${title}</h1><p class="muted">${desc}</p></div><div class="panel"><p class="muted small">این صفحه در مرحله Prototype برای نمایش ساختار، تایپوگرافی و مسیرهای کاربری ساخته شده است. محتوای حقوقی/عملیاتی نهایی در مرحله پیاده‌سازی اصلی تکمیل می‌شود.</p></div></div></main>`}
function showFilter(cat,minP,maxP){
 const m=document.createElement('div');m.className='modal-backdrop';
 m.innerHTML=`<div class="modal"><div class="modal-head"><h2>فیلتر محصولات</h2><button class="icon-btn" onclick="this.closest('.modal-backdrop').remove()">${ICONS.close}</button></div>
 <div class="field"><label>نوع خرما</label><select id="fCat"><option value="">همه</option>${CATS.filter(c=>c!=='پک هدیه').map(c=>`<option value="${c}" ${cat===c?'selected':''}>${c}</option>`).join('')}</select></div>
 <div class="field"><label>حداقل قیمت (تومان)</label><input id="fMin" inputmode="numeric" placeholder="مثلاً ۲۰۰۰۰۰" value="${minP&&minP!=='0'?minP:''}"></div>
 <div class="field"><label>حداکثر قیمت (تومان)</label><input id="fMax" inputmode="numeric" placeholder="مثلاً ۵۰۰۰۰۰" value="${maxP&&maxP!=='0'?maxP:''}"></div>
 <button class="btn btn-primary" style="width:100%" onclick="applyFilter()">اعمال فیلتر</button>
 <button class="btn btn-outline" style="width:100%;margin-top:8px" onclick="this.closest('.modal-backdrop').remove();location.hash='#/products'">پاک کردن فیلترها</button>
 </div>`;
 document.body.appendChild(m);
}
function applyFilter(){
 const cat=document.getElementById('fCat').value;
 const min=document.getElementById('fMin').value.replace(/[^\d]/g,'');
 const max=document.getElementById('fMax').value.replace(/[^\d]/g,'');
 const p=new URLSearchParams();
 if(cat)p.set('cat',cat); if(min)p.set('min',min); if(max)p.set('max',max);
 document.querySelector('.modal-backdrop')?.remove();
 location.hash='#/products'+(p.toString()?'?'+p.toString():'');
 toast('فیلترها اعمال شد');
}
function openSearch(){
 const old=document.querySelector('.search-overlay');if(old){old.remove();return}
 const o=document.createElement('div');o.className='search-overlay open';o.innerHTML=`<div class="container"><div style="display:flex;justify-content:space-between;align-items:center"><b>جستجو</b><button class="icon-btn" onclick="this.closest('.search-overlay').remove()">${ICONS.close}</button></div><div class="searchbar"><span class="search-icon">${ICONS.search}</span><input id="searchInput" autofocus placeholder="نام خرما یا دسته‌بندی..." oninput="renderSuggestions(this.value)" onkeydown="if(event.key==='Enter')doSearch(this.value)"></div><div id="suggestions" class="suggestions"><p class="muted small">پیشنهادهای محبوب</p>${['پیارم','خاصویی','کبکاب','پک هدیه'].map(x=>`<button class="suggestion" onclick="doSearch('${x}')">${x}</button>`).join('')}</div></div>`;document.body.appendChild(o)}
function renderSuggestions(q){const el=document.getElementById('suggestions');if(!el)return;const hits=PRODUCTS.filter(p=>(p.name+p.type).includes(q)).slice(0,5);el.innerHTML=hits.length?hits.map(p=>`<button class="suggestion" onclick="doSearch('${p.name}')">${p.name}</button>`).join(''):'<p class="muted small">نتیجه‌ای پیدا نشد.</p>'}
function doSearch(q){document.querySelector('.search-overlay')?.remove();location.hash='#/search?q='+encodeURIComponent(q)}
function router(){
 const raw=location.hash.slice(2)||'/';const [path,query]=raw.split('?');const params=new URLSearchParams(query||'');
 let content,active='home';
 if(path==='/')content=home();
 else if(path==='/products'){content=productsPage(params);active='products'}
 else if(path==='/product'){content=productDetail(params.get('id'));active='products'}
 else if(path==='/categories'){content=categories();active='categories'}
 else if(path==='/cart'){content=cartPage();active='cart'}
 else if(path==='/checkout'){content=checkout();active='cart'}
 else if(path==='/wishlist'){content=wishlist();active='account'}
 else if(path==='/account'){content=account();active='account'}
 else if(path==='/orders'){content=orders();active='account'}
 else if(path==='/login'){content=login(false);active='account'}
 else if(path==='/register'){content=login(true);active='account'}
 else if(path==='/about'){content=about()}
 else if(path==='/contact'){content=contact()}
 else if(path==='/faq'){content=faq()}
 else if(path==='/search'){content=searchPage(params.get('q')||'');active='search'}
 else if(path==='/terms'){content=simplePage('قوانین و مقررات','چارچوب استفاده از فروشگاه در نسخه نهایی.')}
 else if(path==='/privacy'){content=simplePage('حریم خصوصی','نحوه استفاده و حفاظت از داده‌ها در نسخه نهایی.')}
 else if(path==='/shipping'){content=simplePage('راهنمای ارسال','اطلاعات روش‌های ارسال و زمان‌بندی در نسخه نهایی تکمیل می‌شود.')}
 else if(path==='/returns'){content=simplePage('بازگشت کالا','شرایط بازگشت و مرجوعی در نسخه نهایی مشخص خواهد شد.')}
 else content=simplePage('صفحه پیدا نشد','مسیر مورد نظر وجود ندارد.');
 layout(content,active)
}
window.addEventListener('hashchange',router);window.addEventListener('storage',updateCartBadge);router();
