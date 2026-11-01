/**
 * Education timeline. Every optional field is hidden while empty, so fill in
 * only what you want to show. `logo` is an optional image path in /public
 * (shown on a white badge); set it to null to show the `monogram` instead.
 * `cover` is an optional campus photo shown as a banner at the top of the
 * card; `position` is a CSS object-position to choose what stays in frame.
 */

export const education = [
  {
    institution: 'Sri Lanka Institute of Information Technology',
    shortName: 'SLIIT',
    monogram: 'SLIIT',
    qualification: 'BSc (Hons) in Information Technology',
    status: 'Undergraduate',
    location: 'Sri Lanka',
    logo: '/logos/sliit.png',
    cover: { src: '/education/sliit-campus.webp', position: '62% 62%' },
    period: '', // e.g. '2022 – Present'
    coursework: [], // e.g. ['Data Science', 'Machine Learning', 'Database Systems']
    achievements: [],
    activities: [],
  },
  {
    institution: "S. Thomas' College, Mount Lavinia",
    shortName: "S. Thomas' College",
    monogram: 'STC',
    qualification: 'School Education',
    status: '',
    location: 'Mount Lavinia, Sri Lanka',
    logo: '/logos/stc.png',
    cover: { src: '/education/stc-campus.webp', position: '55% 45%' },
    period: '', // e.g. '2008 – 2021'
    examinations: [], // e.g. ['G.C.E. Advanced Level — Stream', 'G.C.E. Ordinary Level']
    achievements: [],
    activities: [],
  },
];
