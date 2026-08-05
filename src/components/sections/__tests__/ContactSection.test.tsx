import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ContactSection } from '../ContactSection'

describe('ContactSection', () => {
  const originalFetch = global.fetch
  const originalLocation = window.location

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { ...originalLocation, href: '' },
    })
  })

  afterEach(() => {
    global.fetch = originalFetch
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    })
    vi.restoreAllMocks()
  })

  it('has no formsubmit action on the contact form', () => {
    const { container } = render(<ContactSection />)
    const form = container.querySelector('form')
    expect(form).toBeTruthy()
    expect(form?.getAttribute('action') ?? '').not.toMatch(/formsubmit/i)
    expect(container.innerHTML).not.toMatch(/formsubmit/i)
  })

  it('POSTs intake JSON with source_property and lane on success', async () => {
    const fetchMock = vi.mocked(fetch)
    fetchMock.mockResolvedValue({ ok: true } as Response)

    render(<ContactSection />)
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Test User' } })
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('Message'), { target: { value: 'Hello' } })
    fireEvent.click(screen.getByRole('button', { name: /Start a Conversation/i }))

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://n8n.ravenhelm.dev/webhook/nwalker-cc-contact-intake')
    expect(init?.method).toBe('POST')
    const body = JSON.parse(String(init?.body))
    expect(body).toMatchObject({
      name: 'Test User',
      email: 'test@example.com',
      message: 'Hello',
      source_property: 'nwalker.cc',
      lane: 'personal',
    })
    expect(await screen.findByText(/Message received/)).toBeTruthy()
  })

  it('falls back to mailto only after a valid attempt fails', async () => {
    const fetchMock = vi.mocked(fetch)
    fetchMock.mockRejectedValue(new Error('network'))

    render(<ContactSection />)
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Test User' } })
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('Message'), { target: { value: 'Hello' } })
    fireEvent.click(screen.getByRole('button', { name: /Start a Conversation/i }))

    await waitFor(() => expect(fetchMock).toHaveBeenCalled())
    await waitFor(() => expect(window.location.href).toMatch(/^mailto:nwalker85@gmail\.com/))
    expect(window.location.href).toContain(encodeURIComponent('Hello'))
  })
})
