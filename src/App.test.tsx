import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('FlyRank settings', () => {
  it('shows field-specific validation for empty names and an invalid email', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.clear(screen.getByRole('textbox', { name: /display name/i }))
    await user.clear(screen.getByRole('textbox', { name: /email address/i }))
    await user.type(
      screen.getByRole('textbox', { name: /email address/i }),
      'not-an-email'
    )
    await user.clear(screen.getByRole('textbox', { name: /workspace name/i }))
    await user.click(screen.getByRole('button', { name: /save changes/i }))

    expect(screen.getByText('Enter your display name.')).toBeInTheDocument()
    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument()
    expect(screen.getByText('Enter a workspace name.')).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: /display name/i })
    ).toHaveAttribute('aria-invalid', 'true')
    expect(
      screen.queryByText('Changes saved in this session.')
    ).not.toBeInTheDocument()

    await user.type(
      screen.getByRole('textbox', { name: /email address/i }),
      'valid@example.com'
    )
    expect(
      screen.queryByText('Enter a valid email address.')
    ).not.toBeInTheDocument()
  })

  it('rejects whitespace-only names and an empty email', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.clear(screen.getByRole('textbox', { name: /display name/i }))
    await user.type(
      screen.getByRole('textbox', { name: /display name/i }),
      '   '
    )
    await user.clear(screen.getByRole('textbox', { name: /email address/i }))
    await user.click(screen.getByRole('button', { name: /save changes/i }))

    expect(screen.getByText('Enter your display name.')).toBeInTheDocument()
    expect(screen.getByText('Enter your email address.')).toBeInTheDocument()
    expect(
      screen.queryByText('Changes saved in this session.')
    ).not.toBeInTheDocument()
  })

  it('accepts valid settings and shows local-only save feedback', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.clear(screen.getByRole('textbox', { name: /display name/i }))
    await user.type(
      screen.getByRole('textbox', { name: /display name/i }),
      '  Jamie Lee  '
    )
    await user.clear(screen.getByRole('textbox', { name: /email address/i }))
    await user.type(
      screen.getByRole('textbox', { name: /email address/i }),
      '  jamie@example.com  '
    )
    await user.click(screen.getByRole('button', { name: /save changes/i }))

    expect(
      screen.getByText('Changes saved in this session.')
    ).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /display name/i })).toHaveValue(
      'Jamie Lee'
    )
    expect(screen.getByRole('textbox', { name: /email address/i })).toHaveValue(
      'jamie@example.com'
    )

    await user.clear(screen.getByRole('textbox', { name: /display name/i }))
    expect(
      screen.queryByText('Changes saved in this session.')
    ).not.toBeInTheDocument()
  })

  it('changes notification and security preferences', async () => {
    const user = userEvent.setup()
    render(<App />)

    const productUpdates = screen.getByRole('checkbox', {
      name: /product updates/i,
    })
    const weeklyDigest = screen.getByRole('checkbox', {
      name: /weekly performance digest/i,
    })
    const twoFactor = screen.getByRole('checkbox', {
      name: /two-factor authentication/i,
    })

    expect(productUpdates).toBeChecked()
    expect(weeklyDigest).not.toBeChecked()
    await user.click(productUpdates)
    await user.click(weeklyDigest)
    await user.click(twoFactor)
    await user.selectOptions(
      screen.getByRole('combobox', { name: /session timeout/i }),
      '60'
    )

    expect(productUpdates).not.toBeChecked()
    expect(weeklyDigest).toBeChecked()
    expect(twoFactor).toBeChecked()
    expect(
      screen.getByRole('combobox', { name: /session timeout/i })
    ).toHaveValue('60')
  })

  it('resets edited settings and feedback to the documented defaults', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.clear(screen.getByRole('textbox', { name: /display name/i }))
    await user.type(
      screen.getByRole('textbox', { name: /display name/i }),
      'Jamie Lee'
    )
    await user.click(
      screen.getByRole('checkbox', { name: /weekly performance digest/i })
    )
    await user.click(screen.getByRole('button', { name: /save changes/i }))
    expect(
      screen.getByText('Changes saved in this session.')
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /reset to defaults/i }))

    expect(screen.getByRole('textbox', { name: /display name/i })).toHaveValue(
      'Alex Morgan'
    )
    expect(screen.getByRole('textbox', { name: /email address/i })).toHaveValue(
      'alex@flyrank.io'
    )
    expect(
      screen.getByRole('textbox', { name: /workspace name/i })
    ).toHaveValue('FlyRank Studio')
    expect(
      screen.getByRole('checkbox', { name: /product updates/i })
    ).toBeChecked()
    expect(
      screen.getByRole('checkbox', { name: /weekly performance digest/i })
    ).not.toBeChecked()
    expect(
      screen.queryByText('Changes saved in this session.')
    ).not.toBeInTheDocument()
  })

  it('allows repeated valid submissions without duplicate or stale error feedback', async () => {
    const user = userEvent.setup()
    render(<App />)
    const saveButton = screen.getByRole('button', { name: /save changes/i })

    await user.click(saveButton)
    await user.click(saveButton)

    expect(
      screen.getByText('Changes saved in this session.')
    ).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()

    fireEvent.change(screen.getByRole('textbox', { name: /email address/i }), {
      target: { value: 'invalid' },
    })
    await user.click(saveButton)

    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument()
    expect(
      screen.queryByText('Changes saved in this session.')
    ).not.toBeInTheDocument()
  })

  it('identifies integrations as disconnected rather than connected', () => {
    render(<App />)

    const integrations = screen.getByRole('region', { name: /integrations/i })
    expect(
      within(integrations).getByText('No integrations connected')
    ).toBeInTheDocument()
    expect(
      within(integrations).getByText(
        /you haven't connected any integrations yet/i
      )
    ).toBeInTheDocument()
  })
})
