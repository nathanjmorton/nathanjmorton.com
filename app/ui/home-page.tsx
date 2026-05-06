import { css } from 'remix/ui'

import { routes } from '../routes.ts'

const FONT_STACK =
  "'JetBrains Mono', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace"

const PROJECTS = [
  {
    name: 'zigc',
    tagline: 'C/C++ package manager powered by Zig',
    description:
      'Scaffolding, dependencies, builds, and binary inspection — no build scripts by hand. Built on Zig\u2019s build system.',
    url: 'https://zigc.nathanjmorton.com',
    github: 'https://github.com/nathanjmorton/zigc',
    features: ['zigc init', 'zigc add', 'zigc build / run', 'zigc check', 'zigc verify'],
  },
  {
    name: 'zigtsc',
    tagline: 'TypeScript subset \u2192 C transpiler',
    description:
      'A compiler written in Zig that transpiles a strict subset of TypeScript directly to idiomatic C. No Wasm intermediate. No runtime.',
    url: 'https://zigtsc.vercel.app',
    github: 'https://github.com/nathanjmorton/zigtsc',
    features: ['Direct TS \u2192 C', 'Written in Zig', 'Type-driven codegen', 'Pairs with zigc'],
  },
  {
    name: 'zigc-bustub',
    tagline: 'Migrating BusTub from CMake to zigc',
    description:
      'A walkthrough of recreating CMU\u2019s BusTub RDBMS as a greenfield zigc project with vendored dependencies hosted on S3.',
    url: 'https://zigc-bustub.vercel.app',
    github: 'https://github.com/nathanjmorton/zigc-bustub',
    features: ['CMake \u2192 zigc', 'Vendored deps', 'S3-hosted registry', 'BusTub RDBMS'],
  },
] as const

export function HomePage() {
  return () => (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>Nathan J. Morton</title>
        <meta name="description" content="Open-source Zig tooling for C and TypeScript developers." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap"
        />
        <script type="module" src={routes.assets.href({ path: 'app/assets/entry.ts' })}></script>
      </head>
      <body mix={bodyStyle}>
        <main mix={mainStyle}>
          <Masthead />
          <ProjectCards />
          <Embeds />
          <Footer />
        </main>
      </body>
    </html>
  )
}

// ----- Sections -----

function Masthead() {
  return () => (
    <section aria-label="Introduction" mix={mastheadStyle}>
      <h1 mix={nameStyle}>Nathan J. Morton</h1>
      <p mix={subtitleStyle}>Open-source Zig tooling for C and TypeScript developers</p>
    </section>
  )
}

function ProjectCards() {
  return () => (
    <section aria-label="Projects" mix={cardsGridStyle}>
      {PROJECTS.map((project) => (
        <ProjectCard
          key={project.name}
          name={project.name}
          tagline={project.tagline}
          description={project.description}
          url={project.url}
          github={project.github}
          features={project.features}
        />
      ))}
    </section>
  )
}

function ProjectCard() {
  return ({
    name,
    tagline,
    description,
    url,
    github,
    features,
  }: {
    name: string
    tagline: string
    description: string
    url: string
    github: string
    features: readonly string[]
  }) => (
    <div mix={cardStyle}>
      <div mix={cardHeaderStyle}>
        <h2 mix={cardTitleStyle}>{name}</h2>
        <p mix={cardTaglineStyle}>{tagline}</p>
      </div>
      <p mix={cardDescStyle}>{description}</p>
      <ul mix={featureListStyle}>
        {features.map((f) => (
          <li key={f} mix={featureItemStyle}>
            <span mix={bulletStyle}>&bull;</span> {f}
          </li>
        ))}
      </ul>
      <div mix={cardLinksStyle}>
        <a href={url} mix={linkBtnStyle}>
          Visit site <span aria-hidden="true">&rarr;</span>
        </a>
        <a href={github} mix={linkBtnSecondaryStyle}>
          <GitHubIcon /> GitHub
        </a>
      </div>
    </div>
  )
}

function Embeds() {
  return () => (
    <section aria-label="Live previews" mix={embedsSectionStyle}>
      <h2 mix={sectionHeadingStyle}>Live previews</h2>
      <div mix={embedsGridStyle}>
        {PROJECTS.map((project) => (
          <div key={project.name} mix={embedWrapperStyle}>
            <div mix={embedLabelStyle}>
              <span mix={dotStyle} />
              {project.url.replace('https://', '')}
            </div>
            <iframe
              src={project.url}
              title={`${project.name} live preview`}
              mix={iframeStyle}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

function Footer() {
  return () => (
    <footer mix={footerStyle}>
      <div mix={footerLinksStyle}>
        <a href="https://github.com/nathanjmorton" mix={footerLinkStyle}>
          <GitHubIcon /> nathanjmorton
        </a>
      </div>
      <p mix={copyrightStyle}>&copy; {new Date().getFullYear()} Nathan J. Morton</p>
    </footer>
  )
}

// ----- Icons -----

function GitHubIcon() {
  return () => (
    <svg viewBox="0 0 20 19.67" fill="none" mix={iconStyle}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.008 0C4.474 0 0 4.507 0 10.083C0 14.54 2.867 18.312 6.843 19.648C7.341 19.748 7.523 19.431 7.523 19.164C7.523 18.93 7.506 18.129 7.506 17.294C4.722 17.895 4.142 16.092 4.142 16.092C3.695 14.924 3.032 14.623 3.032 14.623C2.121 14.006 3.099 14.006 3.099 14.006C4.109 14.072 4.64 15.041 4.64 15.041C5.534 16.576 6.976 16.142 7.556 15.875C7.639 15.224 7.904 14.773 8.186 14.523C5.965 14.289 3.629 13.421 3.629 9.548C3.629 8.447 4.026 7.545 4.656 6.844C4.557 6.594 4.209 5.559 4.756 4.173C4.756 4.173 5.601 3.906 7.506 5.208C8.322 4.987 9.163 4.875 10.008 4.874C10.853 4.874 11.715 4.991 12.51 5.208C14.416 3.906 15.261 4.173 15.261 4.173C15.808 5.559 15.46 6.594 15.36 6.844C16.007 7.545 16.388 8.447 16.388 9.548C16.388 13.421 14.051 14.273 11.814 14.523C12.179 14.84 12.494 15.441 12.494 16.393C12.494 17.745 12.477 18.83 12.477 19.164C12.477 19.431 12.66 19.748 13.157 19.648C17.133 18.312 20 14.54 20 10.083C20.016 4.507 15.526 0 10.008 0Z"
        fill="currentColor"
      />
    </svg>
  )
}

// ----- Styles -----

const bodyStyle = css({
  '--surface-0': '#0d1117',
  '--surface-1': '#161b22',
  '--surface-2': '#1c2128',
  '--surface-3': '#21262d',
  '--text-primary': '#e6edf3',
  '--text-secondary': '#8b949e',
  '--accent': '#58a6ff',
  '--accent-dim': 'rgba(88, 166, 255, 0.15)',
  '--border': '#30363d',
  '@media (prefers-color-scheme: light)': {
    '--surface-0': '#f6f8fa',
    '--surface-1': '#ffffff',
    '--surface-2': '#f0f2f5',
    '--surface-3': '#e8ebef',
    '--text-primary': '#1f2328',
    '--text-secondary': '#656d76',
    '--accent': '#0969da',
    '--accent-dim': 'rgba(9, 105, 218, 0.1)',
    '--border': '#d0d7de',
  },
  '& *, & *::before, & *::after': { boxSizing: 'border-box' },
  margin: 0,
  padding: '64px 24px',
  minHeight: '100vh',
  background: 'var(--surface-0)',
  color: 'var(--text-primary)',
  fontFamily: FONT_STACK,
  fontSize: '14px',
  lineHeight: 1.6,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
})

const mainStyle = css({
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '80px',
})

const mastheadStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  textAlign: 'center',
  padding: '40px 0',
})

const nameStyle = css({
  margin: 0,
  fontSize: '36px',
  fontWeight: 700,
  letterSpacing: '-0.02em',
  lineHeight: 1.2,
  '@media (max-width: 640px)': { fontSize: '28px' },
})

const subtitleStyle = css({
  margin: 0,
  fontSize: '16px',
  color: 'var(--text-secondary)',
  lineHeight: 1.5,
})

const cardsGridStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '24px',
  '@media (max-width: 960px)': { gridTemplateColumns: '1fr' },
})

const cardStyle = css({
  background: 'var(--surface-1)',
  border: '1px solid var(--border)',
  borderRadius: '12px',
  padding: '32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  transition: 'border-color 200ms ease',
  '&:hover': { borderColor: 'var(--accent)' },
})

const cardHeaderStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
})

const cardTitleStyle = css({
  margin: 0,
  fontSize: '22px',
  fontWeight: 700,
  letterSpacing: '-0.01em',
})

const cardTaglineStyle = css({
  margin: 0,
  fontSize: '13px',
  color: 'var(--accent)',
  fontWeight: 400,
})

const cardDescStyle = css({
  margin: 0,
  fontSize: '14px',
  color: 'var(--text-secondary)',
  lineHeight: 1.65,
})

const featureListStyle = css({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
})

const featureItemStyle = css({
  fontSize: '12px',
  color: 'var(--text-secondary)',
  background: 'var(--surface-2)',
  padding: '4px 10px',
  borderRadius: '6px',
  whiteSpace: 'nowrap',
})

const bulletStyle = css({
  color: 'var(--accent)',
  marginRight: '2px',
})

const cardLinksStyle = css({
  display: 'flex',
  gap: '12px',
  marginTop: 'auto',
  paddingTop: '8px',
})

const linkBtnStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '8px 16px',
  borderRadius: '8px',
  fontSize: '13px',
  fontWeight: 700,
  fontFamily: 'inherit',
  color: 'var(--text-primary)',
  background: 'var(--accent-dim)',
  border: '1px solid var(--accent)',
  textDecoration: 'none',
  transition: 'background-color 150ms ease',
  '&:hover': { background: 'var(--accent)', color: '#ffffff' },
})

const linkBtnSecondaryStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '8px 16px',
  borderRadius: '8px',
  fontSize: '13px',
  fontWeight: 400,
  fontFamily: 'inherit',
  color: 'var(--text-secondary)',
  background: 'transparent',
  border: '1px solid var(--border)',
  textDecoration: 'none',
  transition: 'border-color 150ms ease, color 150ms ease',
  '&:hover': { borderColor: 'var(--text-secondary)', color: 'var(--text-primary)' },
})

const embedsSectionStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
})

const sectionHeadingStyle = css({
  margin: 0,
  fontSize: '14px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'var(--text-secondary)',
})

const embedsGridStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '24px',
  '& > :last-child:nth-child(odd)': { gridColumn: '1 / -1' },
  '@media (max-width: 720px)': { gridTemplateColumns: '1fr' },
})

const embedWrapperStyle = css({
  borderRadius: '12px',
  border: '1px solid var(--border)',
  overflow: 'hidden',
  background: 'var(--surface-1)',
})

const embedLabelStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '10px 16px',
  fontSize: '12px',
  color: 'var(--text-secondary)',
  borderBottom: '1px solid var(--border)',
  background: 'var(--surface-2)',
})

const dotStyle = css({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: '#3fb950',
  flexShrink: 0,
})

const iframeStyle = css({
  width: '100%',
  height: '480px',
  border: 'none',
  display: 'block',
  '@media (max-width: 720px)': { height: '360px' },
})

const footerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  paddingTop: '40px',
  borderTop: '1px solid var(--border)',
})

const footerLinksStyle = css({
  display: 'flex',
  gap: '24px',
})

const footerLinkStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  color: 'var(--text-secondary)',
  textDecoration: 'none',
  fontSize: '13px',
  transition: 'color 150ms ease',
  '&:hover': { color: 'var(--text-primary)' },
})

const copyrightStyle = css({
  margin: 0,
  fontSize: '12px',
  color: 'var(--text-secondary)',
  letterSpacing: '0.05em',
})

const iconStyle = css({
  width: '16px',
  height: '16px',
  display: 'inline-block',
  verticalAlign: 'middle',
})
