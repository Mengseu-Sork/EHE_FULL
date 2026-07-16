import { useState } from "react";
import bg from "../../assets/images/contact.jpg";

const ACCENT = "green";
const ACCENT_SOFT = "#d4f0e6";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

const CONTACT_INFO = [
  {
    label: "Phone",
    value: (
      <>
        (+855) 12 673 634
        <br />
        (+855) 16 673 634
      </>
    ),
    iconPaths: [
      "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    ],
  },
  {
    label: "Email",
    value: "eheo.kgthom@gmail.com",
    valueClassName: "break-all",
    iconPaths: [
      "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    ],
  },
  {
    label: "Our Office",
    value: (
      <>
        Kampong village, Sangkat Kampong Rotes,
        Krong Stung Sen, Kampong Thom Province, Cambodia
      </>
    ),
    iconPaths: [
      "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
      "M15 11a3 3 0 11-6 0 3 3 0 016 0z",
    ],
  },
];

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent";

function ContactIcon({ paths }) {
  return (
    <svg
      className="w-8 h-8 sm:w-10 sm:h-10"
      style={{ color: ACCENT }}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      {paths.map((d) => (
        <path key={d} strokeLinecap="round" strokeLinejoin="round" d={d} />
      ))}
    </svg>
  );
}


function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    alert("Message sent! We'll get back to you soon.");
    setForm(initialForm);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="relative h-[40vh] lg:h-[70vh] flex items-center overflow-hidden">
        <img
          src={bg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2 text-[10px] md:text-xs font-medium text-emerald-200 mb-2 md:mb-6">
            Contact EHE Organization
          </span>

          <h1 className="max-w-4xl text-xl sm:text-3xl lg:text-5xl font-bold leading-tight text-white">
            Let's Build a
            <span className="block text-emerald-400">
              Sustainable Future Together
            </span>
          </h1>

          <p className="mt-2 md:mt-6 max-w-3xl text-sm md:text-base leading-6 md:leading-8 text-slate-200">
            We'd love to hear from you. Whether you have questions, want to
            collaborate, support our initiatives, or learn more about our work,
            our team is ready to connect with you.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-6 md:py-16 bg-white">
        <div className="max-w-full mx-auto px-6">

          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-emerald-600 font-semibold uppercase tracking-widest text-xs md:text-sm">
              Contact Information
            </span>

            <h2 className="mt-3 text-lg md:text-3xl font-bold text-slate-900">
              Get in Touch
            </h2>

            <p className="mt-3 md:mt-5 text-slate-600 text-sm md:text-base leading-6 md:leading-8">
              We welcome your questions, ideas, and partnership opportunities.
              Feel free to contact us using any of the information below.
            </p>
          </div>

          {/* Contact Information */}
          <section className="bg-white mt-2 md:mt-4">
            <div className="max-w-7xl mx-auto">

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">

                {CONTACT_INFO.map(({ label, value, valueClassName, iconPaths }) => (
                  <div
                    key={label}
                    className="group px-6 py-2 text-center transition duration-300"
                  >
                    {/* Icon */}
                    <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 transition">
                      <div className="text-emerald-600 group-hover:text-white">
                        <ContactIcon paths={iconPaths} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base md:text-lg font-semibold text-slate-900">
                      {label}
                    </h3>

                    {/* Divider */}
                    <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-emerald-500"></div>

                    {/* Value */}
                    <div
                      className={`mt-4 text-sm leading-6 md:leading-7 text-slate-600 ${valueClassName || ""}`}
                    >
                      {value}
                    </div>
                  </div>
                ))}

              </div>

            </div>
          </section>

        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-full mx-auto px-6">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-6">
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              Contact Us
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 items-start mb-4 md:mb-10">

            {/* Left - Map */}
            <div className="relative overflow-hidden rounded-3xl shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(15,23,42,0.18)]">

              <iframe
                title="Office Location"
                src="https://maps.google.com/maps?q=12.6539179,104.9260117(Kampong+Village,+Sangkat+Kampong+Rotes,+Krong+Stung+Sen,+Kampong+Thom+Province,+Cambodia)&z=15&output=embed"
                className="w-full h-[400px] md:h-[600px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />

            </div>

            {/* Right: Send Us a Message */}
            <div className="rounded-3xl border border-gray-200 bg-white p-5 sm:p-6 md:p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(15,23,42,0.18)]">
              <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-4 sm:mb-6">
                Send Us a Message
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Field label="First Name" required>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className={inputClass}
                  />
                </Field>
                <Field label="Last Name" required>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="mb-4">
                <Field label="Email" required>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john.doe@example.com"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="mb-4">
                <Field label="Phone Number">
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+855 00 000 000"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="mb-6">
                <Field label="Message" required>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    className={`${inputClass} resize-none`}
                  />
                </Field>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-3 rounded-lg text-white cursor-pointer font-semibold text-sm transition-opacity hover:opacity-90 active:opacity-80 flex items-center justify-center gap-2"
                style={{ backgroundColor: ACCENT }}
              >
                Send Message
                <svg
                  className="w-4 h-4 rotate-45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}