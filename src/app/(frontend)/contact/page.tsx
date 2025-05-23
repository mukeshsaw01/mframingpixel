'use client'
import React, { useState } from 'react'

const ContactPage = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess(false)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to submit')
      setSuccess(true)
      setForm({ firstName: '', lastName: '', email: '', phone: '' })
    } catch (_err) {
      setError('Submission failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row w-full min-h-[80vh] p-8 md:p-20 gap-12 items-start">
      {/* Left: Contact Info */}
      <div className="flex-1 flex flex-col items-start mb-8 md:mb-0">
        <h1 className="text-4xl font-semibold mb-4">Contact me</h1>
        <div className="mb-2 text-lg text-black">sawmukesh1111@gmail.com</div>
        <div className="mb-6 text-lg text-black">+91 99607 18083</div>
        <div className="mb-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="6" fill="none" />
            <path
              d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7ZM12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7ZM18 6.5C18.2761 6.5 18.5 6.72386 18.5 7C18.5 7.27614 18.2761 7.5 18 7.5C17.7239 7.5 17.5 7.27614 17.5 7C17.5 6.72386 17.7239 6.5 18 6.5Z"
              fill="#000"
            />
          </svg>
        </div>
        <div className="text-lg text-black">
          <a
            href="https://www.instagram.com/mframingpixel_/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @mframingpixel_
          </a>
        </div>
      </div>
      {/* Right: Contact Form */}
      <form className="flex-1 flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col">
            <label className="text-sm mb-1">First Name</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              className="border-b border-gray-400 outline-none py-2"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="text-sm mb-1">Last Name</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="border-b border-gray-400 outline-none py-2"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="border-b border-gray-400 outline-none py-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-1">
            Phone <span className="text-red-500">(required)</span>
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="border-b border-gray-400 outline-none py-2"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="mt-4 px-6 py-2 bg-black text-white rounded disabled:opacity-50 w-32"
        >
          {submitting ? 'Sending...' : 'Send'}
        </button>
        {success && <div className="text-green-600">Thank you! Your message has been sent.</div>}
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  )
}

export default ContactPage
