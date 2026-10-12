import { useState, type FormEvent } from 'react'
import './App.css'

type Settings = {
  displayName: string
  email: string
  workspaceName: string
  productUpdates: boolean
  weeklyDigest: boolean
  securityAlerts: boolean
  twoFactorAuthentication: boolean
  sessionTimeout: string
}

type SettingsField = 'displayName' | 'email' | 'workspaceName'
type FieldErrors = Partial<Record<SettingsField, string>>

const defaultSettings: Settings = {
  displayName: 'Alex Morgan',
  email: 'alex@flyrank.io',
  workspaceName: 'FlyRank Studio',
  productUpdates: true,
  weeklyDigest: false,
  securityAlerts: true,
  twoFactorAuthentication: false,
  sessionTimeout: '30',
}

const navigationItems = ['General', 'Notifications', 'Security', 'Integrations']

function isValidEmail(email: string): boolean {
  const input = document.createElement('input')
  input.type = 'email'
  input.required = true
  input.value = email
  return input.checkValidity()
}

function getFieldErrors(settings: Settings): FieldErrors {
  const errors: FieldErrors = {}
  const email = settings.email.trim()

  if (!settings.displayName.trim()) {
    errors.displayName = 'Enter your display name.'
  }

  if (!email) {
    errors.email = 'Enter your email address.'
  } else if (!isValidEmail(email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!settings.workspaceName.trim()) {
    errors.workspaceName = 'Enter a workspace name.'
  }

  return errors
}

function App() {
  const [settings, setSettings] = useState<Settings>({ ...defaultSettings })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [saved, setSaved] = useState(false)

  function updateSetting<Key extends keyof Settings>(
    key: Key,
    value: Settings[Key]
  ) {
    setSettings((current) => ({ ...current, [key]: value }))
    setSaved(false)

    if (key === 'displayName' || key === 'email' || key === 'workspaceName') {
      setErrors((current) => {
        const next = { ...current }
        if (key === 'displayName') delete next.displayName
        if (key === 'email') delete next.email
        if (key === 'workspaceName') delete next.workspaceName
        return next
      })
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = getFieldErrors(settings)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setSaved(false)
      return
    }

    setSettings((current) => ({
      ...current,
      displayName: current.displayName.trim(),
      email: current.email.trim(),
      workspaceName: current.workspaceName.trim(),
    }))
    setSaved(true)
  }

  function resetSettings() {
    setSettings({ ...defaultSettings })
    setErrors({})
    setSaved(false)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Main navigation">
        <a className="brand" href="#settings" aria-label="FlyRank home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M6 22.5 14 6l3.4 8.1L26 10l-8 16-3.3-8.2L6 22.5Z" />
            </svg>
          </span>
          <span>flyrank</span>
        </a>

        <div className="workspace-switcher">
          <span className="workspace-avatar" aria-hidden="true">
            FS
          </span>
          <span className="workspace-details">
            <span className="workspace-label">WORKSPACE</span>
            <span className="workspace-name">FlyRank Studio</span>
          </span>
          <span className="chevron" aria-hidden="true">
            v
          </span>
        </div>

        <nav className="side-nav" aria-label="Settings sections">
          <span className="nav-heading">SETTINGS</span>
          {navigationItems.map((item, index) => (
            <a
              className={`nav-link${index === 0 ? ' active' : ''}`}
              href={`#${item.toLowerCase()}`}
              key={item}
              aria-current={index === 0 ? 'page' : undefined}
            >
              <span className="nav-dot" aria-hidden="true" />
              {item}
            </a>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <span className="help-icon" aria-hidden="true">
              ?
            </span>
            <span>
              <strong>Need a hand?</strong>
              <span>Visit our help center</span>
            </span>
            <span aria-hidden="true">+</span>
          </div>
          <div className="user-card">
            <span className="user-avatar" aria-hidden="true">
              AM
            </span>
            <span className="user-details">
              <strong>Alex Morgan</strong>
              <span>Personal account</span>
            </span>
            <span className="user-menu" aria-hidden="true">
              ...
            </span>
          </div>
        </div>
      </aside>

      <main className="main-content" id="settings">
        <header className="topbar">
          <div className="breadcrumbs">
            <span>Workspace</span>
            <span className="breadcrumb-separator" aria-hidden="true">
              /
            </span>
            <strong>Settings</strong>
          </div>
          <div className="topbar-actions">
            <span className="icon-button" aria-hidden="true">
              <span aria-hidden="true">?</span>
            </span>
            <span
              className="icon-button notification-button"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
              </svg>
              <span className="notification-indicator" />
            </span>
            <span className="topbar-avatar" role="img" aria-label="Alex Morgan">
              AM
            </span>
          </div>
        </header>

        <div className="settings-page">
          <div className="page-heading">
            <div>
              <p className="eyebrow">YOUR ACCOUNT</p>
              <h1>Settings</h1>
              <p className="page-description">
                Manage your profile, workspace, and preferences.
              </p>
            </div>
            <span className="plan-badge">
              <span /> Free plan
            </span>
          </div>

          <form className="settings-form" noValidate onSubmit={handleSubmit}>
            <section
              className="settings-section"
              id="general"
              aria-labelledby="profile-title"
            >
              <div className="section-heading">
                <span className="section-icon profile-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
                  </svg>
                </span>
                <div>
                  <h2 id="profile-title">Profile</h2>
                  <p>Update your personal information.</p>
                </div>
              </div>

              <div className="profile-summary">
                <span className="profile-avatar" aria-hidden="true">
                  AM
                </span>
                <span>
                  <strong>Profile photo</strong>
                  <span>This is how you'll appear across FlyRank.</span>
                </span>
                <button className="secondary-button" type="button" disabled>
                  Change photo
                </button>
              </div>

              <div className="field-grid">
                <div className="field">
                  <label htmlFor="display-name">
                    Display name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    autoComplete="name"
                    aria-describedby={
                      errors.displayName ? 'display-name-error' : undefined
                    }
                    aria-invalid={Boolean(errors.displayName)}
                    id="display-name"
                    onChange={(event) =>
                      updateSetting('displayName', event.target.value)
                    }
                    required
                    value={settings.displayName}
                  />
                  {errors.displayName && (
                    <span
                      className="field-error"
                      id="display-name-error"
                      role="alert"
                    >
                      {errors.displayName}
                    </span>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="email">
                    Email address <span aria-hidden="true">*</span>
                  </label>
                  <input
                    autoComplete="email"
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={Boolean(errors.email)}
                    id="email"
                    onChange={(event) =>
                      updateSetting('email', event.target.value)
                    }
                    required
                    type="email"
                    value={settings.email}
                  />
                  {errors.email && (
                    <span className="field-error" id="email-error" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>
            </section>

            <section
              className="settings-section"
              aria-labelledby="workspace-title"
            >
              <div className="section-heading">
                <span
                  className="section-icon workspace-icon"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24">
                    <rect x="4" y="5" width="16" height="15" rx="2" />
                    <path d="M9 5V3h6v2M4 10h16M9 10v10" />
                  </svg>
                </span>
                <div>
                  <h2 id="workspace-title">Workspace</h2>
                  <p>Customize how your workspace is identified.</p>
                </div>
              </div>
              <div className="field workspace-field">
                <label htmlFor="workspace-name">
                  Workspace name <span aria-hidden="true">*</span>
                </label>
                <input
                  aria-describedby={
                    errors.workspaceName ? 'workspace-name-error' : undefined
                  }
                  aria-invalid={Boolean(errors.workspaceName)}
                  id="workspace-name"
                  onChange={(event) =>
                    updateSetting('workspaceName', event.target.value)
                  }
                  required
                  value={settings.workspaceName}
                />
                {errors.workspaceName && (
                  <span
                    className="field-error"
                    id="workspace-name-error"
                    role="alert"
                  >
                    {errors.workspaceName}
                  </span>
                )}
                <span className="field-hint">
                  This name is visible to everyone in your workspace.
                </span>
              </div>
            </section>

            <section
              className="settings-section"
              id="notifications"
              aria-labelledby="notifications-title"
            >
              <div className="section-heading">
                <span
                  className="section-icon notifications-icon"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
                  </svg>
                </span>
                <div>
                  <h2 id="notifications-title">Notifications</h2>
                  <p>Choose what you'd like to hear about.</p>
                </div>
              </div>
              <div className="preferences-list">
                <label className="preference-row" htmlFor="product-updates">
                  <span>
                    <strong>Product updates</strong>
                    <span>News about new features and improvements.</span>
                  </span>
                  <input
                    checked={settings.productUpdates}
                    id="product-updates"
                    onChange={(event) =>
                      updateSetting('productUpdates', event.target.checked)
                    }
                    type="checkbox"
                  />
                </label>
                <label className="preference-row" htmlFor="weekly-digest">
                  <span>
                    <strong>Weekly performance digest</strong>
                    <span>A weekly summary of your workspace activity.</span>
                  </span>
                  <input
                    checked={settings.weeklyDigest}
                    id="weekly-digest"
                    onChange={(event) =>
                      updateSetting('weeklyDigest', event.target.checked)
                    }
                    type="checkbox"
                  />
                </label>
                <label className="preference-row" htmlFor="security-alerts">
                  <span>
                    <strong>Security alerts</strong>
                    <span>
                      Important updates about sign-ins and account security.
                    </span>
                  </span>
                  <input
                    checked={settings.securityAlerts}
                    id="security-alerts"
                    onChange={(event) =>
                      updateSetting('securityAlerts', event.target.checked)
                    }
                    type="checkbox"
                  />
                </label>
              </div>
            </section>

            <section
              className="settings-section"
              id="security"
              aria-labelledby="security-title"
            >
              <div className="section-heading">
                <span className="section-icon security-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <rect x="5" y="10" width="14" height="11" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
                  </svg>
                </span>
                <div>
                  <h2 id="security-title">Security</h2>
                  <p>Manage your account security preferences.</p>
                </div>
              </div>
              <div className="security-controls">
                <label className="preference-row" htmlFor="two-factor">
                  <span>
                    <strong>Two-factor authentication</strong>
                    <span>Add an extra layer of security to your account.</span>
                  </span>
                  <input
                    checked={settings.twoFactorAuthentication}
                    id="two-factor"
                    onChange={(event) =>
                      updateSetting(
                        'twoFactorAuthentication',
                        event.target.checked
                      )
                    }
                    type="checkbox"
                  />
                </label>
                <div className="timeout-row">
                  <label htmlFor="session-timeout">
                    <strong>Session timeout</strong>
                    <span>Automatically sign out after inactivity.</span>
                  </label>
                  <select
                    id="session-timeout"
                    onChange={(event) =>
                      updateSetting('sessionTimeout', event.target.value)
                    }
                    value={settings.sessionTimeout}
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="240">4 hours</option>
                  </select>
                </div>
              </div>
            </section>

            <section
              className="settings-section integrations-section"
              id="integrations"
              aria-labelledby="integrations-title"
            >
              <div className="section-heading">
                <span
                  className="section-icon integrations-icon"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M9 15 15 9M7 17l-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0M17 7l1-1a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0"
                      transform="translate(1)"
                    />
                  </svg>
                </span>
                <div>
                  <h2 id="integrations-title">Integrations</h2>
                  <p>Connect the tools you use with FlyRank.</p>
                </div>
              </div>
              <div className="integration-empty">
                <span className="integration-empty-icon" aria-hidden="true">
                  +
                </span>
                <div>
                  <strong>No integrations connected</strong>
                  <p>
                    Connected services will appear here. You haven't connected
                    any integrations yet.
                  </p>
                </div>
              </div>
            </section>

            <div className="form-footer">
              <button
                className="reset-button"
                onClick={resetSettings}
                type="button"
              >
                Reset to defaults
              </button>
              <div className="save-actions">
                <span
                  aria-live="polite"
                  className={`save-status${saved ? ' visible' : ''}`}
                >
                  {saved ? 'Changes saved in this session.' : ''}
                </span>
                <button className="save-button" type="submit">
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M4 3h10l3 3v11H3V3h1Zm2 0v5h8V3M6 17v-6h8v6" />
                  </svg>
                  Save changes
                </button>
              </div>
            </div>
          </form>
          <footer className="page-footer">
            <span>Copyright 2025 FlyRank, Inc.</span>
            <span className="footer-links">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Support</span>
            </span>
          </footer>
        </div>
      </main>
    </div>
  )
}

export default App
