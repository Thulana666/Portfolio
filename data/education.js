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
    location: 'Malabe, Sri Lanka',
    logo: '/logos/sliit.png',
    cover: { src: '/education/sliit-campus.webp', position: '62% 62%' },
    period: 'May 2023 – Present',
    coursework: [], // e.g. ['Data Science', 'Machine Learning', 'Database Systems']
    achievements: ['Certificate of Appreciation, Rotaract Club of SLIIT (Rotary Year 2023–24)'],
    activities: [
      'Student Ambassador (2024 – Present)',
      'Batch Representative (2023 – Present)',
      'Committee Member, Club Service Avenue, Rotaract Club of SLIIT (2023 – 2025)',
      'Chorister & Crew Member, SLIIT Choir (2023 – Present)',
    ],
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
    period: '2014 – 2022',
    examinations: [
      'G.C.E. Advanced Level, Biological Science stream (2022)',
      'G.C.E. Ordinary Level (2019)',
    ],
    achievements: [],
    activities: [],
  },
];
