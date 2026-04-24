const fs = require('fs');
const path = require('path');

const GITHUB_USER = 'nhatle26';
const PINNED_REPOS = [
    { owner: 'VIP-lacland', repo: 'library-management-system' },
    { owner: 'nhatle26', repo: 'Project-BasicWebsite' },
    { owner: 'nhatle26', repo: 'FoodHUB' },
    { owner: 'nhatle26', repo: 'PHP-project' }
];

const headers = {
    'User-Agent': 'Portfolio-Builder',
};

if (process.env.GH_TOKEN) {
    headers['Authorization'] = `token ${process.env.GH_TOKEN}`;
}

async function fetchGitHub(url) {
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    return res.json();
}

function formatLangNames(langObj) {
    if (!langObj) return "";
    return Object.entries(langObj)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([name]) => name)
        .join(" · ");
}

async function getRepoData(owner, repoName) {
    const repo = await fetchGitHub(`https://api.github.com/repos/${owner}/${repoName}`);
    const langs = await fetchGitHub(repo.languages_url);
    return {
        ...repo,
        formattedLangs: formatLangNames(langs)
    };
}

async function main() {
    try {
        console.log('Fetching GitHub profile...');
        const profile = await fetchGitHub(`https://api.github.com/users/${GITHUB_USER}`);

        console.log('Fetching pinned repositories...');
        const pinned = await Promise.all(
            PINNED_REPOS.map(item => getRepoData(item.owner, item.repo))
        );

        console.log('Fetching other repositories...');
        const allRepos = await fetchGitHub(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=50`);
        
        const pinnedKeys = new Set(PINNED_REPOS.map(p => `${p.owner}/${p.repo}`.toLowerCase()));
        const filteredOthers = allRepos.filter(r => !pinnedKeys.has(r.full_name.toLowerCase())).slice(0, 10);

        const others = await Promise.all(
            filteredOthers.map(async (r) => {
                const langs = await fetchGitHub(r.languages_url);
                return {
                    ...r,
                    formattedLangs: formatLangNames(langs)
                };
            })
        );

        const data = {
            profile,
            pinned,
            others,
            lastUpdated: new Date().toISOString()
        };

        const dir = path.resolve(__dirname, '../assets/data');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        fs.writeFileSync(
            path.join(dir, 'github-data.json'),
            JSON.stringify(data, null, 2)
        );

        console.log('Success: GitHub data saved to assets/data/github-data.json');
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        process.exit(1);
    }
}

main();