// Manually selected, publicly verified reviews. No live rating/count claims.
export const googleReviewProfile = {
  businessName: 'Abound Creation',
  url: 'https://www.google.com/maps/place/Abound+Creation/data=!4m2!3m1!1s0x0:0xae502fe47504efd8',
  verifiedOn: '2026-10-16',
};

export const googleReviews = [
  {
    id: 'constance-chan-01',
    name: 'Constance Chan',
    avatar: '',
    rating: 5,
    text: 'Great experience working with JP! JP is friendly, responsive, and easy to communicate with. Really happy with the design and overall service. Highly recommended! ⭐⭐⭐⭐⭐',
    date: null,
    dateLabelAtVerification: 'a month ago',
    featured: true,
    excerpt: '… JP is friendly, responsive, and easy to communicate with. Really happy with the design and overall service. …',
    url: 'https://share.google/tnJlBb7zMsa5DPIDU',
    source: 'Google Reviews',
  },
  {
    id: 'jing-xuan-01',
    name: 'Jing Xuan',
    avatar: '',
    rating: 5,
    text: 'Nice to work with. Fast response, clear communication and happy with the final outcome.',
    date: null,
    dateLabelAtVerification: '20 hours ago',
    source: 'Google Reviews',
    url: 'https://share.google/o5ynkYRVsj8sVUG1O',
    featured: true,
  },
  {
    id: 'rou-wan-01',
    name: 'rou wan',
    avatar: '',
    rating: 5,
    text: '', // Rating-only review; do not invent testimonial text.
    date: null,
    dateLabelAtVerification: 'a year ago',
    source: 'Google Reviews',
    url: googleReviewProfile.url,
    featured: false,
  },
];

// Preserve curated array order. New imports default to featured: false.
export const getFeaturedReviews = (reviews = googleReviews) =>
  reviews.filter(review => review.rating >= 4 && review.featured === true);

// Detect duplicate imports without modifying/deleting the curated source records.
const normalize = value => value.normalize('NFKC').toLowerCase().replace(/[\p{P}\p{S}\s]+/gu, '');
const ids = new Set();
const fingerprints = new Set();
for (const review of googleReviews) {
  const fingerprint = `${normalize(review.name)}|${review.rating}|${normalize(review.text)}`;
  if (!review.id || ids.has(review.id)) throw new Error(`Duplicate or missing review id: ${review.id}`);
  if (fingerprints.has(fingerprint)) throw new Error(`Duplicate review: ${review.name}`);
  ids.add(review.id);
  fingerprints.add(fingerprint);
}
