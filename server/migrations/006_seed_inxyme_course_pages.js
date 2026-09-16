const db = require('../config/db');

const courses = [
  {
    subdomain: 'sap',
    template_type: 'course-landing',
    content: {
      title: 'SAP Certification & Job-Ready Training Course 2026',
      headline: 'Master SAP S/4HANA, FICO, MM & SD with Industry Experts',
      description: 'Hands-on practical SAP training with real-world case studies, resume prep, and 100% placement assistance.',
      category: 'Enterprise Resource Planning (ERP)',
      duration: '4-6 Months',
      mode: 'Live Interactive Online + Recorded Sessions',
      features: [
        'Global SAP Exam Preparation & Mock Tests',
        'Direct Access to SAP S/4HANA Sandbox Servers',
        'Industry Mentors with 10+ Years Experience',
        '100% Placement Assistance with 300+ Hiring Partners'
      ],
      highlights: [
        { label: 'Highest Package', value: '18 LPA' },
        { label: 'Average CTC', value: '7.5 LPA' },
        { label: 'Hiring Partners', value: '300+' },
        { label: 'Placement Rate', value: '94%' }
      ]
    },
    meta_title: 'SAP Certification & Job-Ready Training Course 2026 | Inxyme',
    meta_description: 'Join Inxyme SAP certification course. Master SAP S/4HANA, FICO, MM & SD with real-time server access and 100% placement support.'
  },
  {
    subdomain: 'data-science',
    template_type: 'course-landing',
    content: {
      title: 'Data Science Certification Course 2026',
      headline: 'Master Data Science, Python, Machine Learning & Big Data',
      description: 'Comprehensive curriculum covering Python, NumPy, Pandas, Scikit-Learn, Power BI, SQL and Deep Learning.',
      category: 'Data Science & Analytics',
      duration: '6 Months',
      mode: 'Live Interactive Classes + Real Projects',
      features: [
        '15+ Real-world Capstone Projects',
        'Power BI, Tableau, SQL & Python Tool Mastery',
        'Dedicated 1-on-1 Mentorship & Doubt Sessions',
        'Guaranteed Interview Opportunities with Top Tech Firms'
      ],
      highlights: [
        { label: 'Highest Package', value: '22 LPA' },
        { label: 'Average CTC', value: '8.2 LPA' },
        { label: 'Projects', value: '15+' },
        { label: 'Placement Rate', value: '96%' }
      ]
    },
    meta_title: 'Data Science Certification Course 2026 | Inxyme E-Learning',
    meta_description: 'Master Data Science with Python, Machine Learning, Deep Learning & Data Visualization. Build 15+ live industry projects.'
  },
  {
    subdomain: 'fde',
    template_type: 'course-landing',
    content: {
      title: 'Full Stack Development (FDE) Certification Course 2026',
      headline: 'Master Full Stack Development with Modern Web & Emerging Tech',
      description: 'Build enterprise-grade web applications using React, Node.js, Next.js, TypeScript, Docker and Cloud Deployment.',
      category: 'Software Engineering',
      duration: '6 Months',
      mode: 'Live Coding + Capstone Architecture',
      features: [
        'End-to-End MERN & Next.js Full Stack Projects',
        'DevOps, Docker & Cloud Deployment Training',
        'DSA, System Design & Interview Preparation',
        'Direct Referrals to High-Growth Startups & MNCs'
      ],
      highlights: [
        { label: 'Highest Package', value: '20 LPA' },
        { label: 'Average CTC', value: '8.0 LPA' },
        { label: 'Live Projects', value: '12+' },
        { label: 'Placement Rate', value: '95%' }
      ]
    },
    meta_title: 'Full Stack Development Course 2026 | FDE Certification | Inxyme',
    meta_description: 'Master Full Stack Development with Emerging Technologies — React, Node.js, MongoDB, TypeScript & Cloud. 100% placement assistance.'
  },
  {
    subdomain: 'ai-ml',
    template_type: 'course-landing',
    content: {
      title: 'AI & Machine Learning Certification Course 2026',
      headline: 'Master Generative AI, LLMs, Deep Learning & PyTorch',
      description: 'Build advanced AI agents, fine-tune LLMs, master computer vision and NLP with industry AI researchers.',
      category: 'Artificial Intelligence & Machine Learning',
      duration: '6 Months',
      mode: 'Hands-on AI Lab + Live Classes',
      features: [
        'Generative AI, LangChain, RAG & LLM Fine-Tuning',
        'Computer Vision & NLP with PyTorch / Hugging Face',
        'Production Model Deployment on AWS / GCP Cloud',
        'Direct Hiring Pipeline with AI Startups & Labs'
      ],
      highlights: [
        { label: 'Highest Package', value: '28 LPA' },
        { label: 'Average CTC', value: '11.5 LPA' },
        { label: 'AI Projects', value: '10+' },
        { label: 'Placement Rate', value: '97%' }
      ]
    },
    meta_title: 'AI & Machine Learning Certification Course 2026 | Inxyme',
    meta_description: 'Master Artificial Intelligence and Machine Learning with Python, TensorFlow, PyTorch, Generative AI, LLMs & Deep Learning. 100% placement support.'
  }
];

module.exports = async function () {
  // 1. Remove old irrelevant landing pages
  await db.execute(
    `DELETE FROM landing_pages WHERE subdomain IN ('engineering', 'medical', 'campaign-video', 'onlinemanipalmba')`
  );
  console.log('Cleaned up old legacy landing page seeds.');

  // 2. Insert or update the 4 Inxyme course subdomains
  for (const course of courses) {
    await db.execute(
      `INSERT INTO landing_pages (subdomain, template_type, content, meta_title, meta_description)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         template_type = VALUES(template_type),
         content = VALUES(content),
         meta_title = VALUES(meta_title),
         meta_description = VALUES(meta_description),
         is_active = TRUE`,
      [
        course.subdomain,
        course.template_type,
        JSON.stringify(course.content),
        course.meta_title,
        course.meta_description
      ]
    );
    console.log(`Seeded course landing page: ${course.subdomain}`);
  }
};
