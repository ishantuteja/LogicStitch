export const WIZARD_STEPS = [
    {
        id: 'format',
        title: 'What are we building?',
        subtitle: 'Select the primary format or structure of your project.',
        multiselect: false,
        options: [
            { id: 'landing-page', label: 'Landing Page', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'saas-dashboard', label: 'SaaS Dashboard', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'mobile-app', label: 'Mobile App UI', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'portfolio', label: 'Personal Portfolio', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'ecommerce', label: 'E-commerce Store', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'blog', label: 'Blog/Content Platform', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'pitch-deck', label: 'Pitch Deck/Presentation', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'logo-brand', label: 'Logo & Brand Identity', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'ai-chatbot', label: 'AI Chatbot Interface', image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'admin-tool', label: 'Internal Admin Tool', image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'newsletter', label: 'Newsletter Template', image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff0f?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'data-dashboard', label: 'Data Analytics Dashboard', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'course-ui', label: 'Educational Course UI', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'social-media', label: 'Social Media Campaign', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'api-blueprint', label: 'API Architecture Blueprint', image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=400&h=300' },
        ]
    },
    {
        id: 'targetAI',
        title: 'Which AI are we commanding?',
        subtitle: 'Select the intelligence that will execute your prompt.',
        multiselect: false,
        options: [
            { id: 'chatgpt', label: 'ChatGPT', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'claude', label: 'Claude', image: 'https://images.unsplash.com/photo-1691425261314-e0b6edef2b89?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'gemini', label: 'Gemini', image: 'https://images.unsplash.com/photo-1682346764491-9e7ec27e2a96?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'midjourney', label: 'Midjourney', image: 'https://images.unsplash.com/photo-1686191553077-2feaddbcf29b?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'lovable', label: 'Lovable', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'bolt', label: 'Bolt', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'v0dev', label: 'v0.dev', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'cursor', label: 'Cursor', image: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&q=80&w=400&h=300' },
        ]
    },
    {
        id: 'aesthetic',
        title: 'Choose your visual vibe.',
        subtitle: 'What aesthetic defines the look and feel?',
        multiselect: false,
        options: [
            { id: 'minimalist', label: 'Minimalist', image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'corporate', label: 'Corporate', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'playful', label: 'Playful', image: 'https://images.unsplash.com/photo-1534080534278-f09bc119b5b2?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'glassmorphism', label: 'Glassmorphism', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'cyberpunk', label: 'Cyberpunk', image: 'https://images.unsplash.com/photo-1542831371-32f555c86880?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'neo-brutalism', label: 'Neo-brutalism', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=400&h=300' },
        ]
    },
    {
        id: 'features',
        title: 'What does it need to do?',
        subtitle: 'Select all the core features required for this project.',
        multiselect: true,
        options: [
            { id: 'user-auth', label: 'User Auth', image: 'https://images.unsplash.com/photo-1555529733-0e67056058e1?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'relational-db', label: 'Relational Database', image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'payment', label: 'Payment Gateway', image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'charts', label: 'Dynamic Charts', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'seo', label: 'SEO Optimization', image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&q=80&w=400&h=300' },
            { id: 'push-notifications', label: 'Push Notifications', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400&h=300' },
        ]
    }
];
