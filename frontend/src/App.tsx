import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend.
    // For this demo, we'll just log it and show a success message.
    console.log('Contact form submitted:', { name, email, message });
    setSubmitted(true);
    // Optionally reset form fields after submission:
    // setName('');
    // setEmail('');
    // setMessage('');
  };

  return (
    <main className="page">
      <section className="card">
        <h1>Live Preview Demo</h1>
        <p>This frontend is deployed by Render PR Preview.</p>

        <button className="preview-button">
          Click me
        </button>
      </section>

      <section className="card contact-form-card">
        <h2>Contact Us</h2>
        {submitted ? (
          <div className="success-message">
            <p>Thank you for your message! We'll get back to you soon.</p>
            <button onClick={() => setSubmitted(false)} className="preview-button">Send another message</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
              ></textarea>
            </div>
            <button type="submit" className="preview-button">Submit</button>
          </form>
        )}
      </section>
    </main>
  )
}

export default App