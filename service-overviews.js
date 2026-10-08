import { imageMap, imagePath, serviceImageKeys } from './src/data/image-map.js';
import { outlineIcon } from './icons.js';
// Concise bilingual service stories; imagery remains replaceable demo content.
const stories = {
  branding: {
    intro: ['A clear identity. A connected brand.', '清晰的品牌识别，统一的品牌体验。'],
    sections: [
      ['Brand Foundation', '品牌基础', 'direction', 'We find the idea and visual direction that make your brand distinctive.', '从品牌理念与视觉方向出发，建立属于你的品牌个性。', [['Brand Direction', '品牌方向'], ['Moodboard & Concept', '情绪板与概念']]],
      ['Brand Identity & Applications', '品牌识别与应用', 'gallery', 'One visual language, across the places people meet your brand.', '以统一的视觉语言，连接顾客接触品牌的每个场景。', [['Logo, Colour & Typography', '标识、色彩与字体'], ['Packaging & Printed Materials', '包装与印刷物料'], ['Uniforms & Digital Touchpoints', '制服与数字平台']]],
      ['What You Receive', '最终你会得到', 'list', 'A considered identity system, ready to use and easy to carry forward.', '一套经过完整考虑、可持续使用的品牌视觉系统。', [['Logo & Identity Assets', '标识与品牌视觉素材'], ['Selected Brand Applications', '约定的品牌应用设计'], ['Brand Usage Guidelines', '品牌使用规范']]],
    ],
  },
  uniform: {
    intro: ['Made for your team. Designed for your brand.', '为团队而制作，为品牌而设计。'],
    sections: [
      ['Uniform Types', '制服类型', 'cards', 'A consistent team look, suited to the way you work.', '根据团队的实际工作方式，打造统一的服装形象。', [['Corporate & Workwear', '企业制服、衬衫、Polo 衫与围裙'], ['Everyday & Events', '日常 T 恤、活动服与外套'], ['Sport & Teamwear', '球衣、运动服与团队服']]],
      ['Materials & Customization', '面料与定制', 'materials', 'We help you choose the right feel, fit and finish.', '协助你选择合适的手感、版型与品牌制作方式。', [['Fabric', '面料', 'Cotton, blends and performance fabrics selected for comfort and use.', '根据舒适度与用途，选择棉、混纺或功能面料。'], ['Fit', '版型', 'Regular, relaxed or custom cuts for your team.', '为团队选择常规、宽松或定制裁剪。'], ['Printing & Embroidery', '印刷与刺绣', 'A suitable branding method for your artwork and garments.', '根据图案与服装，搭配适合的品牌制作工艺。']]],
      ['Our Process', '我们的流程', 'process', 'A clear path from your brief to a coordinated team look.', '从需求沟通到统一团队形象，每一步清晰衔接。', [['Brief & Select', '沟通需求与选款'], ['Design & Confirm', '确认设计、面料与尺码'], ['Produce & Deliver', '制作与交付']]],
    ],
  },
  merchandise: {
    intro: ['Bring your brand into everyday life.', '把品牌带进日常生活。'],
    sections: [
      ['Product Categories', '产品类别', 'cards', 'Useful, thoughtful products for customers, teams and occasions.', '为顾客、团队与不同场合搭配实用的品牌周边。', [['Apparel & Bags', '服饰、帽子与帆布袋'], ['Drinkware & Lifestyle', '杯具、水瓶与生活用品'], ['Office & Event Essentials', '办公用品与活动周边']]],
      ['Customization Options', '定制选择', 'feature', 'From a subtle logo to a complete gift set, we connect product, branding and packaging.', '从简洁标识到完整礼品套装，让产品、品牌与包装保持一致。', [['Brand Artwork & Placement', '品牌图案与位置'], ['Printing, Engraving & Embroidery', '印刷、雕刻与刺绣'], ['Packaging & Gift Sets', '包装与礼品套装']]],
      ['Corporate / Event Use Cases', '企业与活动应用', 'uses', 'Made to mark an occasion and keep your brand close.', '为重要场合而制作，让品牌融入日常。', [['Team & Welcome Packs', '员工与迎新礼品'], ['Client Gifts', '客户礼品'], ['Events & Campaigns', '活动与推广周边']]],
    ],
  },
  'marketing-services': {
    intro: ['Content with direction. Communication with purpose.', '有方向的内容，有目的的沟通。'],
    sections: [
      ['What We Do', '我们提供什么', 'list', 'Strategy, design and content that work together for your brand.', '让策略、设计与内容共同服务于品牌。', [['Content Planning', '内容规划'], ['Social Design, Copy & Short Video', '社交设计、文案与短视频'], ['Campaign & Advertising Creative', '活动与广告创意素材']]],
      ['Content Direction', '内容方向', 'pillars', 'A balanced mix of content to build recognition, trust and enquiries.', '通过合适的内容组合，建立品牌认知、信任与询问。', [['Brand & Expertise', '品牌与专业度'], ['Products & Services', '产品与服务'], ['Stories & Social Proof', '故事与客户信任']]],
      ['Workflow', '合作流程', 'process', 'From a clear brief to purposeful, consistent content.', '从明确需求到持续、一致的品牌内容。', [['Understand & Plan', '了解品牌与规划内容'], ['Create & Review', '内容制作与确认'], ['Prepare & Handover', '整理素材与交付']]],
    ],
  },
  graphic: {
    intro: ['Every application. One consistent brand.', '每一次应用，都保持品牌一致。'],
    sections: [
      ['Design Categories', '设计类别', 'categories', 'Clear, considered design across your everyday brand communications.', '为品牌日常沟通带来清晰、统一的设计。', [['Marketing & Social', '营销与社交视觉'], ['Corporate & Print', '企业资料与印刷设计'], ['Packaging', '包装设计'], ['Events & Environmental Graphics', '活动与空间视觉']]],
      ['Selected Applications', '应用展示', 'gallery', 'From a small printed piece to a larger brand presence.', '从小型印刷物料，到更完整的品牌展示。', [['Posters & Social Content', '海报与社交内容'], ['Business Materials & Packaging', '企业物料与包装'], ['Signage & Event Graphics', '标识与活动视觉']]],
    ],
  },
  'photo-videography': {
    intro: ['Tell your brand story through considered imagery.', '以有想法的影像，讲述品牌故事。'],
    sections: [
      ['Photography Types', '摄影类型', 'photo-types', 'Authentic visual content for your brand, people and products.', '为品牌、团队与产品制作真实的视觉内容。', [['Brand & Product', '品牌、产品与美食摄影'], ['Corporate & People', '企业、团队与人物摄影'], ['Events & Social Content', '活动、社交内容与短视频']]],
      ['Shoot Process', '拍摄流程', 'process', 'A thoughtful shoot, from visual direction to final images.', '从视觉方向到最终影像，细致安排每个拍摄步骤。', [['Plan', '确认方向、场景与拍摄内容'], ['Shoot', '摄影与短视频拍摄'], ['Edit & Deliver', '后期处理与素材交付']]],
      ['Visual Gallery', '影像展示', 'photo-gallery', 'Imagery ready for your website, social channels and marketing.', '适用于网站、社交平台与营销的影像素材。', []],
    ],
  },
};

const professionalNotes = {
  branding: {
    expertise: [
      ['Strategy', '策略', 'Positioning gives design a clear purpose.', '品牌定位为设计建立明确目标。'],
      ['Identity', '识别', 'Logo, colour and type create recognition.', '标识、色彩与字体建立辨识度。'],
      ['Application', '应用', 'A coherent system across physical and digital touchpoints.', '统一实体与数字平台的品牌体验。'],
      ['Guidelines', '规范', 'Clear usage rules help teams stay consistent.', '清晰使用规范帮助团队保持一致。'],
    ],
  },
  uniform: {
    expertise: [
      ['Garment', '服装', 'Corporate, everyday and active teamwear.', '企业、日常与运动团队服装。'],
      ['Fabric', '面料', 'Comfort and care matched to working conditions.', '根据工作环境考虑舒适度与护理。'],
      ['Fit', '版型', 'Team sizing, movement and brand appearance.', '兼顾团队尺码、活动与品牌形象。'],
      ['Printing', '加工', 'Screen print, DTF, sublimation, embroidery and patches.', '丝印、DTF、热升华、刺绣与布章。'],
    ],
  },
  merchandise: {
    expertise: [
      ['Product', '产品', 'Useful pieces for recipients and occasions.', '为收礼对象与场合选择实用产品。'],
      ['Material', '材质', 'Consider feel, repeated use and brand positioning.', '考虑质感、日常使用与品牌定位。'],
      ['Printing', '加工', 'Print, engraving or embroidery to suit the surface.', '按产品表面选择印刷、雕刻或刺绣。'],
      ['Packaging', '包装', 'Coordinated individual packs and gift sets.', '搭配单品包装与礼品套装。'],
    ],
  },
  'marketing-services': {
    expertise: [
      ['Strategy', '策略', 'Audience and objectives shape the plan.', '以目标顾客与沟通目标制定规划。'],
      ['Content', '内容', 'Education, stories and proof build trust.', '通过知识、故事与案例建立信任。'],
      ['Creative', '创意', 'Design, copy and video create recognition.', '以设计、文案与影像建立认知。'],
      ['Campaign', '活动', 'Focused messages and calls to action support enquiries.', '通过明确讯息与行动提示推动询问。'],
    ],
  },
  graphic: {
    expertise: [
      ['Digital', '数字', 'Readable posts and consistent campaign visuals.', '清晰帖文与一致的推广视觉。'],
      ['Print', '印刷', 'Hierarchy, size and production-ready artwork.', '考虑信息层级、尺寸与印刷稿件。'],
      ['Corporate', '企业', 'Clear presentations and business materials.', '清晰专业的简报与企业物料。'],
      ['Packaging', '包装', 'Product information within a coherent brand system.', '将产品信息融入统一品牌系统。'],
      ['Event', '活动', 'Connected graphics across signage and spaces.', '串联标识与空间的活动视觉。'],
    ],
  },
  'photo-videography': {
    expertise: [
      ['Planning', '规划', 'Purpose, shot list and visual direction.', '确认用途、拍摄清单与视觉方向。'],
      ['Shooting', '拍摄', 'Brand, product, people and event coverage.', '品牌、产品、人物与活动拍摄。'],
      ['Editing', '后期', 'Consistent colour, retouching and video edits.', '统一调色、修图与影片剪辑。'],
      ['Delivery', '交付', 'Assets prepared for agreed channels and uses.', '按约定渠道与用途整理素材。'],
    ],
  },
};

export function renderServiceOverview(service, { nav, footer, cta, responsiveImage, arrow }) {
  const story = stories[service.slug];
  const bi = (en, zh) => `<span lang="en">${en}</span><span class="sc-zh" lang="zh-Hans">${zh}</span>`;
  const notes = professionalNotes[service.slug];
  const expertise = `<aside class="sc-expertise" aria-labelledby="service-expertise"><h2 id="service-expertise" class="eyebrow">OUR EXPERTISE · 专业考量</h2><dl>${notes.expertise.map(([en,zh,detail,cn])=>`<div><dt>${outlineIcon(en)}<span>${bi(en,zh)}</span></dt><dd>${bi(detail,cn)}</dd></div>`).join('')}</dl></aside>`;
  const slots = imageMap.services[serviceImageKeys[service.slug]];
  const assets = slots.categories || slots.gallery || [];
  const image = (asset, caption, size = '(max-width: 700px) 90vw, 28vw') => `<figure class="sc-image">${responsiveImage(imagePath(asset), `${service.title} visual placeholder`, { sizes: size })}${caption ? `<figcaption>${bi(...caption)}</figcaption>` : ''}</figure>`;
  const sections = story.sections.map(([title,zh,layout,en,cn,items],index) => {
    const header = `<header class="sc-heading"><span class="eyebrow">${service.title} / 0${index+1}</span><h2>${title}</h2><p class="sc-subtitle" lang="zh-Hans">${zh}</p><p>${bi(en,cn)}</p></header>`;
    let content;
    if (layout === 'cards') content = `<div class="sc-cards">${items.map((p,i)=>`<article>${image(assets[i])}<h3>${bi(...p)}</h3></article>`).join('')}</div>`;
    else if (layout === 'gallery' || layout === 'photo-gallery') content = `<div class="sc-gallery">${assets.map((asset,i)=>image(asset,items[i],layout==='photo-gallery'?'(max-width: 700px) 90vw, 44vw':undefined)).join('')}</div>`;
    else if (layout === 'feature') content = `<div class="sc-feature">${image(slots.customization,null,'(max-width: 900px) 90vw, 45vw')}<ul>${items.map(p=>`<li>${bi(...p)}</li>`).join('')}</ul></div>`;
    else if (layout === 'process') content = `<ol class="sc-process">${items.map((p,i)=>`<li><span class="sc-number">0${i+1}</span><h3>${bi(...p)}</h3></li>`).join('')}</ol>`;
    else if (layout === 'materials') content = `<div class="sc-materials">${items.map(p=>`<article><h3>${bi(p[0],p[1])}</h3><p>${bi(p[2],p[3])}</p></article>`).join('')}</div>`;
    else if (layout === 'photo-types') content = `<div class="sc-photo-types">${image(slots.types,null,'(max-width: 900px) 90vw, 50vw')}<ul>${items.map(p=>`<li>${bi(...p)}</li>`).join('')}</ul></div>`;
    else content = `<ul class="sc-items">${items.map((p,i)=>`<li><span class="sc-number">0${i+1}</span><h3>${bi(...p)}</h3></li>`).join('')}</ul>`;
    const composition = layout === 'direction' || layout === 'list' ? ` sc-${layout}` : '';
    return `<section class="sc-section sc-section--${layout}"><div class="page-container${composition}">${header}${content}</div></section>`;
  }).join('');
  const closing = cta().replace('<section class="closing-cta">', '<section class="closing-cta"><div class="page-container">').replace('</section>', '</div></section>');
  return `${nav()}<main id="top" class="inner-page service-detail-page service-concise sc-page-${service.slug}"><section class="service-intro"><div class="page-container service-detail-split"><div class="service-detail-text"><span class="eyebrow">SERVICE ${service.number} · ABOUND CREATION</span><h1>${service.title}</h1><p class="sc-hero-copy">${bi(...story.intro)}</p>${expertise}<a class="button button-dark motion-cta" href="/contact">Start a Project · 开始项目 ${arrow}</a></div><figure class="service-detail-image">${responsiveImage(imagePath(slots.hero),service.alt,{sizes:'(max-width: 900px) 90vw, 45vw',loading:'eager',priority:'high'})}<figcaption>ABOUND CREATION · ${service.title.toUpperCase()}</figcaption></figure></div></section>${sections}${closing}</main>${footer()}`;
}
