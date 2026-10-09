// Uniform has its own selection-guide architecture; other service renderers stay unchanged.
export function renderUniform({ nav, footer, cta, responsiveImage, arrow }) {
  const bi = (en, zh) => `<span lang="en">${en}</span><span class="u-zh" lang="zh-Hans">${zh}</span>`;
  const heading = (n, en, zh, copy = '') => `<header class="u-heading"><span class="eyebrow">UNIFORM / ${n}</span><h2>${en}</h2><p class="u-subtitle" lang="zh-Hans">${zh}</p>${copy}</header>`;
  const visual = (asset, label, sizes = '(max-width: 700px) 90vw, 28vw') => `<figure class="u-visual">${responsiveImage(`/visuals/${asset}.jpg`, label, { sizes })}</figure>`;
  const garments = [
    ['Corporate & Workwear', '企业与工作制服', 'Shirts, polos, jackets and aprons for a consistent team presence.', '衬衫、Polo 衫、外套与围裙，建立统一团队形象。'],
    ['Everyday & Events', '日常与活动服装', 'T-shirts, oversized tees and caps for everyday wear and gatherings.', 'T 恤、宽松 T 恤与帽子，适合日常穿着与活动。'],
    ['Sport & Teamwear', '运动与团队服装', 'Jerseys and activewear selected around movement and outdoor use.', '围绕活动需求与户外环境选择球衣及运动服。'],
  ];
  const fabrics = [
    ['Cotton', '棉', ['Soft, natural handfeel', '柔软自然的手感'], ['Generally breathable; retains moisture', '通常透气，但会吸收并保留水分'], ['Everyday wear; care and knit affect lifespan', '适合日常穿着，寿命取决于织法与护理'], ['Indoor teams & everyday tees', '室内团队与日常 T 恤']],
    ['CVC', '棉涤混纺', ['Cotton-rich feel with blended structure', '以棉的触感结合混纺结构'], ['Depends on blend ratio and knit', '取决于混纺比例与织法'], ['Polyester blend supports shape retention', '聚酯混纺有助于保持形状'], ['Daily work & frequently washed uniforms', '日常工作与经常清洗的制服']],
    ['Polyester', '聚酯纤维', ['Smooth; texture varies by construction', '表面顺滑，质感因结构而异'], ['Low moisture absorption; knit affects airflow', '吸湿率低，空气流通取决于织法'], ['Resilient, suitable for repeated wear', '耐穿，适合反复使用'], ['Events, sport & outdoor teams', '活动、运动与户外团队']],
    ['Performance / Dry-Fit', '功能排汗面料', ['Lightweight options; confirm by sample', '可选轻盈款式，以样布确认为准'], ['Designed to move moisture; performance varies', '为导湿设计，效果因面料而异'], ['Depends on yarn, finish and care', '取决于纱线、整理工艺与护理'], ['Active roles & warm environments', '活动量较大的工作与温暖环境']],
  ];
  const attributes = [['Feel','触感'],['Breathability','透气性'],['Durability','耐用性'],['Suitable environment','适用环境']];
  const fits = [
    ['Regular', '常规', 42, 48, 'Straight body, balanced ease.', '直身轮廓，松量适中。'],
    ['Relaxed', '宽松', 49, 55, 'More room through chest and body.', '胸部与衣身预留更多空间。'],
    ['Oversized', '宽大型', 58, 62, 'Dropped shoulders, wider body.', '落肩设计，更宽的衣身。'],
    ['Slim', '修身', 42, 36, 'Shaped waist, closer to the body.', '收腰轮廓，更贴合身体。'],
  ];
  const silhouette = (shoulder, waist) => `<svg viewBox="0 0 180 190" role="img" aria-label="Illustrative garment silhouette"><path d="M70 30 Q90 46 110 30 L${90+shoulder} 44 L${112+shoulder} 80 L${95+shoulder} 94 L${90+shoulder-5} 76 L${90+waist} 160 L${90-waist} 160 L${95-shoulder} 76 L${85-shoulder} 94 L${68-shoulder} 80 L${90-shoulder} 44 Z"/><path class="u-seam" d="M70 30 Q90 60 110 30 M${90-waist} 150 H${90+waist}"/></svg>`;
  const methods = [
    ['Silkscreen','丝网印刷',['Simple artwork, repeat quantities','简单图案与批量制作'],['Solid colour; ink-dependent handfeel','实色效果，触感取决于油墨'],['Good when correctly cured','正确固化后耐用'],['Cotton / blends; polyester needs suitable ink','棉与混纺；聚酯需适配油墨']],
    ['DTF','DTF 印刷',['Detailed, multicolour artwork','细节丰富的多色图案'],['Transfer layer with a noticeable handfeel','表面有转印层触感'],['Good with correct pressing and care','正确压烫与护理后表现良好'],['Cotton, polyester & compatible blends','棉、聚酯及适配混纺']],
    ['Heat Transfer','热转印',['Names, numbers & small logos','名字、号码与小标识'],['Clean cut edges; film-dependent finish','边缘清晰，质感因转印膜而异'],['Depends on film, adhesion and care','取决于材料、粘合与护理'],['Select transfer material for each fabric','按面料选择适配转印材料']],
    ['Sublimation','热升华',['Jerseys & all-over graphics','球衣与全幅图案'],['Dye in the fibre; no raised print layer','染料进入纤维，无凸起印层'],['No transfer layer to peel','没有可剥落的转印层'],['Light-coloured polyester; not ordinary cotton','浅色聚酯，不适用于普通棉']],
    ['Embroidery','刺绣',['Corporate logos, polos, caps & jackets','企业标识、Polo 衫、帽子与外套'],['Raised thread texture','立体线材质感'],['Durable; stitch density and care matter','耐用，需考虑针数密度与护理'],['Structured garments; fine knits need backing','较挺身的服装；薄针织需衬底']],
    ['Woven / Embroidered Patch','织唛／刺绣布章',['Badges & repeatable team branding','徽章与统一团队标识'],['Separate textile badge','独立织物布章'],['Attachment determines longevity','耐用程度取决于固定方式'],['Sew-on or compatible heat application','缝制或适配热压固定']],
  ];
  const process = [
    ['Brief & select','沟通与选款','Confirm use, quantity, budget and timeline.','确认用途、数量、预算与时间。'],
    ['Fabric & fit','面料与版型','Review samples, sizing and garment construction.','确认样布、尺码与服装结构。'],
    ['Artwork & placement','图案与位置','Agree logo size, colours and application method.','确认标识大小、颜色与制作工艺。'],
    ['Confirm & produce','确认与制作','Approve agreed specifications before production.','确认约定规格后安排制作。'],
    ['Check & handover','检查与交付','Review the finished order and organize handover.','检查成品并安排交付。'],
  ];
  return `${nav()}<main id="top" class="inner-page service-detail-page uniform-guide">
    <section class="service-detail-split section-pad"><div class="service-detail-text"><span class="eyebrow">SERVICE 02 · A UNIFORM SELECTION GUIDE</span><h1>Custom Uniform</h1><p class="service-detail-lead" lang="zh-Hans">制服定制</p><p>Made for your team. Chosen for the way they work. Explore garments, materials, fit and branding methods to build a uniform that feels right and carries your identity clearly.</p><p class="bilingual-chinese" lang="zh-Hans">为团队而设计，为实际工作而选择。从服装、面料、版型到品牌制作工艺，搭配舒适、实用且能清晰传达品牌形象的制服。</p><a class="button button-dark" href="/contact">Discuss your uniforms · 洽谈制服项目 ${arrow}</a></div><figure class="service-detail-image">${responsiveImage('/visuals/uniform.jpg','Uniform visual placeholder',{sizes:'(max-width: 900px) 90vw, 45vw',loading:'eager',priority:'high'})}<figcaption>ABOUND CREATION · UNIFORM</figcaption></figure></section>
    <section class="u-section section-pad">${heading('01','Start with the garment.','制服类型')}<div class="u-garments">${garments.map((g,i)=>`<article>${visual('uniform',`${g[0]} placeholder`)}<span class="eyebrow">0${i+1}</span><h3>${bi(g[0],g[1])}</h3><p>${bi(g[2],g[3])}</p></article>`).join('')}</div></section>
    <section class="u-section u-fabrics section-pad">${heading('02','A fabric for every working day.','面料资料库',`<p>${bi('Compare the starting points below, then confirm the actual fabric by sample. Composition, knit, GSM and finish work together.','先了解以下特性，再通过样布确认实际面料。成分、织法、克重与整理工艺共同影响穿着表现。')}</p>`)}<div class="u-fabric-grid">${fabrics.map(f=>`<article><h3>${bi(f[0],f[1])}</h3><dl>${attributes.map((a,i)=>`<div><dt>${bi(...a)}</dt><dd>${bi(...f[i+2])}</dd></div>`).join('')}</dl></article>`).join('')}</div><div class="u-texture"><h3>${bi('Construction matters, too.','织法同样重要。')}</h3><p>${bi('Piqué brings surface texture and structure to polos. Interlock offers a smoother double-knit surface. Microfiber describes fine fibres, not a fixed performance grade. Compare GSM, opacity, stretch and handfeel before choosing.','珠地布带来纹理与挺度；双面针织布表面更平滑。超细纤维描述纤维细度，并非固定的性能等级。选料时也需比较克重、遮透性、弹性与手感。')}</p></div></section>
    <section class="u-section section-pad">${heading('03','Find the right silhouette.','版型与裁剪')}<div class="u-fit-grid">${fits.map(f=>`<article>${silhouette(f[2],f[3])}<h3>${bi(f[0],f[1])}</h3><p>${bi(f[4],f[5])}</p></article>`).join('')}</div><p class="u-note">${bi('Illustrative silhouettes, not sizing patterns. Unisex and sports cuts can be selected around team needs; custom cutting is available for selected projects. Confirm measurements and movement with a sample.','轮廓图仅用于比较，并非尺码纸样。可按团队需求选择男女通用或运动版型；部分项目可定制裁剪。请通过样衣确认尺寸与活动舒适度。')}</p></section>
    <section class="u-section section-pad">${heading('04','The right mark, on the right material.','印刷与品牌加工工艺')}<div class="u-methods">${methods.map((m,i)=>`<article><h3><span class="eyebrow">0${i+1}</span>${bi(m[0],m[1])}</h3><dl>${[['Best use','最佳用途'],['Finish','表面效果'],['Durability','耐用性'],['Garment / fabric','适用服装／面料']].map((a,j)=>`<div><dt>${bi(...a)}</dt><dd>${bi(...m[j+2])}</dd></div>`).join('')}</dl></article>`).join('')}</div><p class="u-note">${bi('Method suitability depends on the actual garment, artwork and care requirements. Confirm compatibility and finish before production.','工艺选择需考虑实际服装、图案与护理要求，制作前确认兼容性与效果。')}</p></section>
    <section class="u-section u-process section-pad">${heading('05','From selection to a finished team look.','定制流程')}<ol>${process.map((p,i)=>`<li><span class="u-step">0${i+1}</span><h3>${bi(p[0],p[1])}</h3><p>${bi(p[2],p[3])}</p></li>`).join('')}</ol></section>
    <section class="u-section u-receive section-pad">${heading('06','Ready for your team.','最终你会得到')}<ul>${[['Selected garments in confirmed sizes','按确认尺码制作的服装'],['Agreed fabric, fit and construction','约定面料、版型与服装结构'],['Brand artwork in approved placements','按确认位置呈现品牌图案'],['Coordinated order and handover details','统一订单与交付安排']].map(p=>`<li>${bi(...p)}</li>`).join('')}</ul></section>
    ${cta()}</main>${footer()}`;
}
