// Shared geometric outline icons. Labels carry meaning; SVGs are decorative.
const shapes = {
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="m14 10 6-6M17 4h3v3"/>',
  identity: '<path d="M12 3 21 12 12 21 3 12Z"/><path d="M8 12h8M12 8v8"/>',
  garment: '<path d="m8 4-5 3 2 5 3-1v9h8v-9l3 1 2-5-5-3c-1 3-7 3-8 0Z"/>',
  cube: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z M4 7.5l8 4.5 8-4.5M12 12v9"/>',
  content: '<rect x="4" y="3" width="16" height="18"/><path d="M8 7h8M8 11h8M8 15h4M8 18h8"/>',
  nodes: '<circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="19" r="2"/><path d="M7 6h10M6 8l5 9M18 8l-5 9"/>',
  check: '<rect x="4" y="4" width="16" height="16"/><path d="m8 12 3 3 5-6"/>',
  layers: '<path d="m3 8 9-5 9 5-9 5ZM3 12l9 5 9-5M3 16l9 5 9-5"/>',
  fabric: '<rect x="4" y="4" width="16" height="16"/><path d="M8 4v16M12 4v16M16 4v16M4 8h16M4 12h16M4 16h16"/>',
  fit: '<path d="M5 4v16h14M9 4H5M9 8H5M9 12H5M9 16H5M9 20v-4M14 20v-4M19 20v-4"/>',
  print: '<path d="M7 8V3h10v5M7 17H4V8h16v9h-3M7 14h10v7H7Z M16 11h1"/>',
  package: '<path d="M4 7h16v14H4ZM3 3h18v4H3ZM12 3v8M9 11h6"/>',
  pen: '<path d="m5 19 2-9 10-6 3 3-6 10ZM7 17l5-5M5 19l2-2"/><circle cx="13" cy="11" r="1"/>',
  campaign: '<path d="m4 9 15-5v14L4 13ZM4 9v4M7 14l2 6h4l-3-5M22 8v6"/>',
  screen: '<rect x="3" y="4" width="18" height="13"/><path d="M12 17v4M8 21h8"/>',
  corporate: '<rect x="3" y="7" width="18" height="14"/><path d="M8 7V3h8v4M3 12h18M10 12v3h4v-3"/>',
  event: '<path d="M5 3h14v15H5ZM8 7h8M8 11h8M8 18l-3 4M16 18l3 4"/>',
  camera: '<path d="M3 7h4l2-3h6l2 3h4v14H3Z"/><circle cx="12" cy="13" r="4"/>',
  edit: '<path d="M3 6h18M3 12h18M3 18h18"/><path d="M7 3v6M16 9v6M10 15v6"/>',
  delivery: '<path d="M4 13v8h16v-8M4 16h5l1 2h4l1-2h5M12 3v10M8 9l4 4 4-4"/>',
};
const categories = { Strategy: 'target', Identity: 'identity', Application: 'layers', Guidelines: 'content', Garment: 'garment', Fabric: 'fabric', Fit: 'fit', Printing: 'print', Product: 'cube', Material: 'layers', Packaging: 'package', Content: 'content', Creative: 'pen', Campaign: 'campaign', Digital: 'screen', Print: 'print', Corporate: 'corporate', Event: 'event', Planning: 'content', Shooting: 'camera', Editing: 'edit', Delivery: 'delivery' };
export function outlineIcon(name) {
  return `<svg class="clarity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter" aria-hidden="true" focusable="false">${shapes[categories[name] || name] || shapes.identity}</svg>`;
}
