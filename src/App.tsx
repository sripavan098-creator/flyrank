import { useState } from 'react'
import './App.css'

type Section = 'Profile' | 'Workspace' | 'Notifications' | 'Security' | 'Integrations'

const sections: Section[] = ['Profile', 'Workspace', 'Notifications', 'Security', 'Integrations']

function App() {
  const [active, setActive] = useState<Section>('Profile')
  const [saved, setSaved] = useState(false)
  const [notice, setNotice] = useState('')
  const [form, setForm] = useState({
    name: 'Alex Morgan', email: 'alex@northstar.studio', role: 'Growth lead',
    workspace: 'Northstar Studio', website: 'northstar.studio', language: 'English (US)',
    timezone: 'Pacific Time (UTC−08:00)', reportingLanguage: 'English', searchEngine: 'Google',
  })
  const [notifications, setNotifications] = useState({ report: true, rankings: true, product: false })
  const [security, setSecurity] = useState({ twoFactor: true, loginAlerts: true })

  const update = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }))
    setSaved(false)
  }
  const announce = (message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 2600)
  }
  const save = () => {
    setSaved(true)
    announce('Your settings have been saved.')
  }

  const profileContent = (
    <>
      <SettingsGroup title="Personal details" description="Manage the details associated with your account.">
        <div className="avatar-row">
          <div className="avatar avatar-large" aria-hidden="true">AM</div>
          <div className="avatar-copy"><strong>Profile photo</strong><span>JPG, GIF or PNG. 1 MB max.</span></div>
          <label className="button button-secondary upload-button"><input type="file" accept="image/png,image/jpeg,image/gif" />Upload photo</label>
        </div>
        <div className="form-grid">
          <Field label="Full name" value={form.name} onChange={(value) => update('name', value)} />
          <Field label="Role" value={form.role} onChange={(value) => update('role', value)} />
          <Field wide label="Email address" type="email" value={form.email} onChange={(value) => update('email', value)} hint="Used for sign-in and account notifications." />
        </div>
      </SettingsGroup>
      <SettingsGroup title="Regional preferences" description="Choose how dates and language appear across FlyRank.">
        <div className="form-grid">
          <SelectField label="Language" value={form.language} onChange={(value) => update('language', value)} options={['English (US)', 'English (UK)', 'Deutsch', 'Français', '日本語']} />
          <SelectField label="Time zone" value={form.timezone} onChange={(value) => update('timezone', value)} options={['Pacific Time (UTC−08:00)', 'Mountain Time (UTC−07:00)', 'Central Time (UTC−06:00)', 'Eastern Time (UTC−05:00)', 'London (UTC+00:00)', 'Central Europe (UTC+01:00)']} />
        </div>
      </SettingsGroup>
    </>
  )

  const workspaceContent = (
    <>
      <SettingsGroup title="Workspace details" description="These details appear across reports and shared projects.">
        <div className="form-grid">
          <Field wide label="Workspace name" value={form.workspace} onChange={(value) => update('workspace', value)} />
          <label className="field field-wide"><span>Website</span><div className="input-prefix"><span>https://</span><input value={form.website} onChange={(event) => update('website', event.target.value)} /></div><small>Your primary domain for rank tracking and AI visibility.</small></label>
          <SelectField label="Default reporting language" value={form.reportingLanguage} onChange={(value) => update('reportingLanguage', value)} options={['English', 'German', 'French', 'Japanese']} />
          <SelectField label="Default search engine" value={form.searchEngine} onChange={(value) => update('searchEngine', value)} options={['Google', 'Bing', 'Yahoo']} />
        </div>
      </SettingsGroup>
      <div className="workspace-plan"><div className="plan-mark">N</div><div className="plan-copy"><strong>Northstar Studio</strong><span>Pro workspace · 4 of 10 seats used</span></div><button className="text-button" type="button" onClick={() => announce('Workspace management is coming soon.')}>Manage workspace <span>↗</span></button></div>
    </>
  )

  const notificationsContent = (
    <SettingsGroup title="Email notifications" description="Choose what lands in your inbox. You can change these anytime.">
      <div className="preference-list">
        <Preference title="Weekly performance report" description="A Monday snapshot of rankings, traffic, and visibility." checked={notifications.report} onChange={() => { setNotifications((value) => ({ ...value, report: !value.report })); setSaved(false) }} />
        <Preference title="Ranking changes" description="Get notified when tracked keywords move significantly." checked={notifications.rankings} onChange={() => { setNotifications((value) => ({ ...value, rankings: !value.rankings })); setSaved(false) }} />
        <Preference title="Product news and updates" description="Occasional notes about new features and improvements." checked={notifications.product} onChange={() => { setNotifications((value) => ({ ...value, product: !value.product })); setSaved(false) }} />
      </div>
      <div className="delivery-note"><span className="status-dot" /> Sent to <strong>{form.email}</strong></div>
    </SettingsGroup>
  )

  const securityContent = (
    <>
      <SettingsGroup title="Account protection" description="Extra layers of security help keep your workspace yours.">
        <div className="preference-list">
          <Preference title="Two-factor authentication" description="Require a verification code when signing in on a new device." checked={security.twoFactor} onChange={() => { setSecurity((value) => ({ ...value, twoFactor: !value.twoFactor })); setSaved(false) }} />
          <Preference title="New sign-in alerts" description="Email me when a new device accesses my account." checked={security.loginAlerts} onChange={() => { setSecurity((value) => ({ ...value, loginAlerts: !value.loginAlerts })); setSaved(false) }} />
        </div>
      </SettingsGroup>
      <SettingsGroup title="Active sessions" description="Devices currently signed in to your account.">
        <div className="session-row"><div className="session-icon">⌘</div><div className="session-copy"><strong>MacBook Pro · Chrome</strong><span>San Francisco, CA · This device</span></div><span className="current-session">Current</span></div>
        <button className="text-button danger-button" type="button" onClick={() => announce('Other sessions have been signed out.')}>Sign out of all other sessions</button>
      </SettingsGroup>
    </>
  )

  const integrationsContent = (
    <SettingsGroup title="Connected tools" description="Bring your search data together in one place.">
      <div className="integration-list">
        <Integration mark="G" color="google" title="Google Search Console" description="Import clicks, impressions, and indexed pages." connected onClick={() => announce('Google Search Console settings opened.')} />
        <Integration mark="A" color="analytics" title="Google Analytics 4" description="Connect organic traffic and conversion data." connected onClick={() => announce('Google Analytics settings opened.')} />
        <Integration mark="S" color="slack" title="Slack" description="Send ranking alerts to a channel." onClick={() => announce('Slack connection started.')} />
        <Integration mark="M" color="sheets" title="Google Sheets" description="Export keyword and competitor reports." onClick={() => announce('Google Sheets connection started.')} />
      </div>
    </SettingsGroup>
  )

  const content: Record<Section, React.ReactNode> = {
    Profile: profileContent,
    Workspace: workspaceContent,
    Notifications: notificationsContent,
    Security: securityContent,
    Integrations: integrationsContent,
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#settings" aria-label="FlyRank home"><span className="brand-symbol"><i /><i /><i /></span><span>fly<span>rank</span></span></a>
        <button className="workspace-switcher" type="button" onClick={() => announce('Workspace switcher opened.')}><span className="workspace-avatar">N</span><span className="workspace-label"><strong>Northstar Studio</strong><span>Pro workspace</span></span><span className="chevron">⌄</span></button>
        <div className="sidebar-group-label">WORKSPACE</div>
        <nav className="product-nav" aria-label="Main navigation">
          <a href="#overview"><span className="nav-glyph glyph-overview" />Overview</a>
          <a href="#projects"><span className="nav-glyph glyph-projects" />Projects<span className="nav-count">4</span></a>
          <a href="#rank-tracker"><span className="nav-glyph glyph-rank" />Rank tracker</a>
          <a href="#ai-visibility"><span className="nav-glyph glyph-ai" />AI visibility<span className="new-tag">NEW</span></a>
          <a href="#competitors"><span className="nav-glyph glyph-competitors" />Competitors</a>
        </nav>
        <div className="sidebar-group-label settings-label">PREFERENCES</div>
        <nav className="product-nav" aria-label="Preferences"><a href="#settings" className="nav-active"><span className="nav-glyph glyph-settings" />Settings</a></nav>
        <div className="sidebar-bottom">
          <div className="usage-card"><div className="usage-heading"><span>Monthly credits</span><span>72%</span></div><div className="usage-track"><span /></div><p>7,240 <span>of 10,000 credits</span></p><button type="button" onClick={() => announce('Plan details opened.')}>View plan <span>↗</span></button></div>
          <button className="user-switcher" type="button" onClick={() => announce('Account menu opened.')}><span className="avatar avatar-small">AM</span><span className="user-label"><strong>Alex Morgan</strong><span>alex@northstar.studio</span></span><span className="more-dots">•••</span></button>
        </div>
      </aside>

      <main id="settings" className="main-area">
        <header className="topbar"><div className="breadcrumbs"><span>Workspace</span><span className="crumb-slash">/</span><strong>Settings</strong></div><div className="topbar-actions"><button className="help-link" type="button" onClick={() => announce('Help center opened.')}>Help center <span>↗</span></button><button className="icon-button notification-button" type="button" aria-label="Notifications" onClick={() => announce('You are all caught up.')}><span className="bell-icon" /><i /></button><span className="avatar avatar-top">AM</span></div></header>
        <div className="page-content">
          <div className="page-heading"><div><div className="eyebrow"><span /> WORKSPACE PREFERENCES</div><h1>Settings</h1><p>Fine-tune your FlyRank workspace and account.</p></div><div className="heading-meta"><span className="sync-indicator" />All systems operational</div></div>
          <div className="settings-layout">
            <nav className="settings-nav" aria-label="Settings sections"><span className="settings-nav-title">MANAGE</span>{sections.map((section, index) => <button type="button" key={section} className={active === section ? 'settings-nav-item selected' : 'settings-nav-item'} onClick={() => { setActive(section); setSaved(false) }}><span className={`settings-nav-glyph glyph-${index}`} aria-hidden="true">{['◉', '⌂', '◌', '◇', '⌘'][index]}</span><span>{section}</span>{section === 'Integrations' && <span className="connected-count">2</span>}</button>)}<div className="settings-nav-footnote"><span className="secure-mark">✓</span><span>Your data is encrypted<br />and securely stored.</span></div></nav>
            <div className="settings-content"><div className="content-header"><div><h2>{active}</h2><p>{active === 'Profile' ? 'Your personal account preferences.' : `Manage your ${active.toLowerCase()} preferences.`}</p></div><span className="last-updated">Last updated just now</span></div><div className="settings-body">{content[active]}</div><div className="save-row"><span>{saved ? <><span className="saved-check">✓</span> Changes saved</> : 'Changes are saved only when you click save.'}</span><button className="button button-primary" type="button" onClick={save}>{saved ? 'Saved' : 'Save changes'} <span>{saved ? '✓' : '→'}</span></button></div></div>
          </div>
          <footer className="page-footer"><span>© 2025 FlyRank</span><a href="#privacy">Privacy</a><a href="#terms">Terms</a><span className="footer-version">Made for better search.</span></footer>
        </div>
      </main>
      {notice && <div className="toast" role="status"><span>✓</span>{notice}</div>}
    </div>
  )
}

function SettingsGroup({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <section className="settings-section"><div className="section-heading"><div><h3>{title}</h3><p>{description}</p></div></div>{children}</section>
}

function Field({ label, value, onChange, wide = false, type = 'text', hint }: { label: string; value: string; onChange: (value: string) => void; wide?: boolean; type?: string; hint?: string }) {
  return <label className={wide ? 'field field-wide' : 'field'}><span>{label}</span><input type={type} value={value} onChange={(event) => onChange(event.target.value)} />{hint && <small>{hint}</small>}</label>
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return <label className="field"><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>
}

function Preference({ title, description, checked, onChange }: { title: string; description: string; checked: boolean; onChange: () => void }) {
  return <div className="preference-row"><div className="preference-copy"><strong>{title}</strong><span>{description}</span></div><button className={checked ? 'switch switch-on' : 'switch'} type="button" role="switch" aria-checked={checked} aria-label={title} onClick={onChange}><span /></button></div>
}

function Integration({ mark, color, title, description, connected = false, onClick }: { mark: string; color: string; title: string; description: string; connected?: boolean; onClick: () => void }) {
  return <div className="integration-row"><div className={`integration-mark ${color}`}>{mark}</div><div className="integration-copy"><strong>{title}</strong><span>{description}</span></div>{connected && <span className="connected-label"><i />Connected</span>}<button className="button button-secondary integration-action" type="button" onClick={onClick}>{connected ? 'Manage' : 'Connect'} {!connected && <span>→</span>}</button></div>
}

export default App