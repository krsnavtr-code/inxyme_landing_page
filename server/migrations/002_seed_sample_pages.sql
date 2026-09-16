INSERT INTO landing_pages (subdomain, template_type, content, meta_title, meta_description) VALUES
(
    'engineering',
    'lead-gen',
    '{"heading": "Engineering Admissions 2026", "subheading": "Get expert guidance for top engineering colleges. Fill the form and our counsellors will reach out.", "buttonText": "Enquire Now", "themeColor": "#2563eb", "backgroundColor": "#f8fafc", "headingColor": "#111827", "textColor": "#4b5563"}',
    'Engineering Courses | Inxyme',
    'Enroll in top engineering and technology certification courses through Inxyme. Get expert guidance from our course advisors.'
),
(
    'medical',
    'general-info',
    '{"heading": "Medical College Guidance", "body": "We help you find the best medical colleges based on your rank, budget and location preferences.", "image": "", "backgroundColor": "#ffffff", "headingColor": "#111827", "textColor": "#374151"}',
    'Data Science & Analytics | Inxyme',
    'Learn Data Science, Machine Learning, and Analytics through Inxyme job-ready certification courses.'
),
(
    'campaign-video',
    'video-layout',
    '{"heading": "Watch Our Latest Campus Tour", "description": "Explore Inxyme partner campuses from the comfort of your home.", "videoUrl": "", "backgroundColor": "#0f172a", "headingColor": "#ffffff", "textColor": "#d1d5db"}',
    'Inxyme Course Video | E-Learning Platform',
    'Watch our latest course demo and explore Inxyme certification programs from the comfort of your home.'
)
ON DUPLICATE KEY UPDATE
    template_type = VALUES(template_type),
    content = VALUES(content),
    meta_title = VALUES(meta_title),
    meta_description = VALUES(meta_description);
