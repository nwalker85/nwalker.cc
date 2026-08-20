import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ContactSection } from '../ContactSection'

describe('ContactSection', () => {
  const originalFetch = global.fetch

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    global.fetch = originalFetch
    vi.restoreAllMocks()
  })

  it('does not print a personal mailbox, phone, or formsubmit into the document', () => {
    const { container } = render(<ContactSection />)
    const html = container.innerHTML
    expect(html).not.toMatch(/gmail\.com/i)
    expect(html).not.toMatch(/781-2507/)
    expect(html).not.toMatch(/formsubmit/i)
    expect(html).not.toMatch(/mailto:/i)
    expect(html).not.toMatch(/tel:/i)
    expect(screen.getByText('linkedin.com/in/nwalker85')).toBeTruthy()
    expect(screen.getByText('github.com/nwalker85')).toBeTruthy()
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

  it('stays on-page with an error after a failed intake attempt', async () => {
    const fetchMock = vi.mocked(fetch)
    fetchMock.mockRejectedValue(new Error('network'))

    render(<ContactSection />)
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Test User' } })
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('Message'), { target: { value: 'Hello' } })
    fireEvent.click(screen.getByRole('button', { name: /Start a Conversation/i }))

    await waitFor(() => expect(fetchMock).toHaveBeenCalled())
    expect(await screen.findByText(/The form did not send/)).toBeTruthy()
    expect(document.documentElement.innerHTML).not.toMatch(/gmail\.com/i)
  })
})
