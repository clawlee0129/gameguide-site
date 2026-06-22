"use client";

interface ContactFormProps {
  dict: Record<string, any>;
}

export default function ContactForm({ dict }: ContactFormProps) {
  const c = dict.contact as Record<string, string>;
  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fields = Object.fromEntries(new FormData(form));
        window.location.href = `mailto:contact@gameguide.guide?subject=${encodeURIComponent(String(fields.subject || ""))}&body=${encodeURIComponent(String(fields.message || "") + "\n\n---\nFrom: " + String(fields.name || "") + " (" + String(fields.email || "") + ")")}`;
      }}
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#9a8a70] mb-1">{c.name}</label>
        <input
          type="text" id="name" name="name" required
          className="w-full px-4 py-2.5 rounded-lg border border-[rgba(201,160,80,0.15)] bg-[#141020] text-[#e2d0b0] focus:ring-2 focus:ring-[#c9a050] focus:border-transparent outline-none transition-colors placeholder:text-[#9a8a70]"
          placeholder={c.namePlaceholder}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#9a8a70] mb-1">{c.email}</label>
        <input
          type="email" id="email" name="email" required
          className="w-full px-4 py-2.5 rounded-lg border border-[rgba(201,160,80,0.15)] bg-[#141020] text-[#e2d0b0] focus:ring-2 focus:ring-[#c9a050] focus:border-transparent outline-none transition-colors placeholder:text-[#9a8a70]"
          placeholder={c.emailPlaceholder}
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-[#9a8a70] mb-1">{c.subject}</label>
        <input
          type="text" id="subject" name="subject" required
          className="w-full px-4 py-2.5 rounded-lg border border-[rgba(201,160,80,0.15)] bg-[#141020] text-[#e2d0b0] focus:ring-2 focus:ring-[#c9a050] focus:border-transparent outline-none transition-colors placeholder:text-[#9a8a70]"
          placeholder={c.subjectPlaceholder}
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#9a8a70] mb-1">{c.message}</label>
        <textarea
          id="message" name="message" required rows={5}
          className="w-full px-4 py-2.5 rounded-lg border border-[rgba(201,160,80,0.15)] bg-[#141020] text-[#e2d0b0] focus:ring-2 focus:ring-[#c9a050] focus:border-transparent outline-none transition-colors resize-y placeholder:text-[#9a8a70]"
          placeholder={c.messagePlaceholder}
        />
      </div>
      <button type="submit" className="w-full py-3 text-base rounded-lg bg-gradient-to-r from-[#c9a050] to-[#8b5a20] text-black font-semibold hover:from-[#e2c870] hover:to-[#c9a050] transition-colors">
        {c.send}
      </button>
    </form>
  );
}
