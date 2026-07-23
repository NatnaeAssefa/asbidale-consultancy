import { ContactForm } from "@/components/ContactForm";
import { HeroSignature } from "@/components/HeroSignature";
import { NavigatorSection } from "@/components/NavigatorSection";
import { SiteHeader } from "@/components/SiteHeader";

const services = [
  {
    num: "01",
    title: "Clinical Research & CRO",
    desc: "Comprehensive support for clinical trials, ensuring studies are scientifically robust and fully compliant with international GCP standards.",
    focus:
      "Focus: protocol development, regulatory submissions, site management, biostatistical analysis.",
    tag: "cro" as const,
    tagLabel: "Clinical",
  },
  {
    num: "02",
    title: "AI-Driven Healthcare Solutions",
    desc: "We apply artificial intelligence to enhance diagnostics and clinical workflows, bridging cutting-edge technology and practical patient care.",
    focus:
      "Focus: diagnostic support tools, predictive analytics, clinical decision support integration.",
    tag: "ai" as const,
    tagLabel: "AI & Digital",
  },
  {
    num: "03",
    title: "Monitoring, Evaluation & Health Research",
    desc: "Actionable insights through rigorous program evaluation and real-time digital data collection to drive evidence-based decisions.",
    focus:
      "Focus: impact assessments, midline/endline surveys, interactive digital dashboards.",
    tag: "cro" as const,
    tagLabel: "Clinical",
  },
  {
    num: "04",
    title: "Medical Specialty & Subspecialty Services",
    desc: "Strategic advisory and operational support for institutions developing high-level specialty services and referral networks.",
    focus:
      "Focus: workflow optimization, laboratory planning, oncology & pathology service integration.",
    tag: "cro" as const,
    tagLabel: "Clinical",
  },
  {
    num: "05",
    title: "Digital Health & Telemedicine",
    desc: "We design and implement digital platforms that improve access and efficiency, enabling modern, technology-driven care delivery.",
    focus:
      "Focus: telemedicine implementation, remote monitoring, EMR/EHR customization.",
    tag: "ai" as const,
    tagLabel: "AI & Digital",
  },
  {
    num: "06",
    title: "Training & Capacity Building",
    desc: "Customized programs designed to upskill healthcare professionals and researchers in modern methodologies and innovation.",
    focus:
      "Focus: GCP training, AI/digital health bootcamps, institutional leadership workshops.",
    tag: "ai" as const,
    tagLabel: "AI & Digital",
  },
];

const aiProjects = [
  "Diagnostic imaging",
  "Predictive modeling",
  "NLP for medical records",
  "Patient workflow automation",
  "Clinical decision support",
];

const team = [
  {
    initials: "JH",
    name: "Dr. Jemal Hussein",
    role: "Director",
    desc: "Anatomic pathologist, clinical researcher, and entrepreneur.",
  },
  {
    initials: "KA",
    name: "Dr. Kalid Asrat",
    role: "Vice Director",
    desc: "Consultant pediatrician and AI healthcare innovator.",
  },
  {
    initials: "YY",
    name: "Dr. Yoseph Y.",
    role: "Data & Health Systems Specialist",
    desc: "Focused on health data infrastructure and systems design.",
  },
  {
    initials: "TK",
    name: "Mr. Tilahun K.",
    role: "Operations Manager",
    desc: "Optimizing service delivery and team coordination.",
  },
  {
    initials: "AK",
    name: "Dr. Anatia Kifle",
    role: "Medical Doctor, Clinical Researcher",
    desc: "MSc in Clinical Trials, Addis Ababa University (CDT Africa).",
  },
  {
    initials: "MY",
    name: "Dr. Murriso Y.",
    role: "Operations Manager",
    desc: "Optimizing service delivery and team coordination.",
  },
  {
    initials: "AK",
    name: "Dr. Achenef K.",
    role: "Clinical Trial Data Scientist",
    desc: "Epidemiology and AI innovation.",
  },
  {
    initials: "YA",
    name: "Mr. Yohannes Ayalew",
    role: "HR Manager",
    desc: "People operations and organizational development.",
  },
];

const values = [
  "Integrity",
  "Excellence",
  "Innovation",
  "Collaboration",
  "Accountability",
  "Sustainability",
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        <section className="hero">
          <div className="wrap">
            <div className="hero-grid">
              <div>
                <div className="eyebrow">
                  Est. 2017 &middot; Addis Ababa, Ethiopia
                </div>
                <h1>
                  Bridging medical expertise <em>and</em> AI innovation.
                </h1>
                <p className="hero-lede">
                  Asbidale delivers high-integrity clinical research and
                  data-driven digital health solutions for sponsors, hospitals,
                  and institutions solving the world&apos;s most complex
                  healthcare challenges.
                </p>
                <div className="hero-cta">
                  <a href="#services" className="btn solid">
                    Explore our services
                  </a>
                  <a href="#contact" className="btn">
                    Talk to our team
                  </a>
                </div>
              </div>
              <div className="hero-panel">
                <div className="row">
                  <span>Core discipline</span>
                  <b>Clinical Research</b>
                  <span>
                    CRO services aligned to international GCP standards
                  </span>
                </div>
                <div className="row">
                  <span>Core discipline</span>
                  <b>AI &amp; Digital Health</b>
                  <span>Diagnostics, predictive analytics, telemedicine</span>
                </div>
                <div className="row">
                  <span>Core discipline</span>
                  <b>Strategic Advisory</b>
                  <span>Market, policy, and institutional consulting</span>
                </div>
              </div>
            </div>

            <HeroSignature />
          </div>
        </section>

        <section className="stats tight">
          <div className="wrap">
            <div className="stat">
              <b>2017</b>
              <span>Founded in Addis Ababa</span>
            </div>
            <div className="stat">
              <b>06</b>
              <span>Core service lines</span>
            </div>
            <div className="stat">
              <b>05</b>
              <span>Sister companies in network</span>
            </div>
            <div className="stat">
              <b>09</b>
              <span>National &amp; global partners</span>
            </div>
          </div>
        </section>

        <section id="who-we-are">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">Sec. 01 &mdash; Who we are</div>
                <h2>Bridging innovation and local realities.</h2>
              </div>
              <p>
                A multidisciplinary consultancy at the intersection of science
                and technology, empowering organizations through precision
                research and scalable AI.
              </p>
            </div>

            <p className="about-quote">
              &ldquo;We no longer live in a remote past where time is in
              abundance. For a firm like Asbidale, or a humanitarian mission,
              the delay of gathering and categorizing data manually can mean the
              difference between a successful health intervention and a failed
              one.&rdquo;
            </p>

            <div className="vm-grid">
              <div className="vm-card">
                <h3>Vision</h3>
                <p>
                  To be a globally recognized consultancy that drives innovation,
                  strengthens healthcare systems, and creates sustainable impact
                  for communities and organizations worldwide.
                </p>
              </div>
              <div className="vm-card">
                <h3>Mission</h3>
                <p>
                  To provide high-quality, evidence-based consultancy services
                  that empower healthcare organizations, research institutions,
                  and development partners to make informed decisions and
                  implement lasting solutions.
                </p>
              </div>
              <div className="vm-card">
                <h3>Strategic objectives</h3>
                <p>
                  Research excellence aligned with international standards.
                  Technological advancement in AI and digital health. Capacity
                  building through tailored training. Collaborative growth with
                  local and international partners.
                </p>
              </div>
              <div className="vm-card">
                <h3>Why Asbidale</h3>
                <p>
                  Proven expertise bridging global standards with local insight
                  &mdash; a multidisciplinary team delivering measurable impact
                  through a strong network of national and international
                  partners.
                </p>
              </div>
            </div>

            <div className="eyebrow gold" style={{ marginTop: 56 }}>
              Core values
            </div>
            <div className="values-row">
              {values.map((value) => (
                <span key={value} className="chip">
                  {value}
                </span>
              ))}
            </div>
          </div>
        </section>

        <hr className="rule" />

        <section id="services">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">Sec. 02 &mdash; Core services</div>
                <h2>Six disciplines, one continuum of care.</h2>
              </div>
              <p>
                Advancing health innovation through scientific rigor and
                operational excellence &mdash; from first protocol to deployed
                technology.
              </p>
            </div>

            <div className="service-list">
              {services.map((service) => (
                <div key={service.num} className="service-row">
                  <span className="svc-num">{service.num}</span>
                  <span className="svc-title">{service.title}</span>
                  <span>
                    <span className="svc-desc">{service.desc}</span>
                    <span className="svc-focus">{service.focus}</span>
                  </span>
                  <span className={`tag ${service.tag}`}>
                    {service.tagLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="ai" className="ai-band">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">Sec. 03 &mdash; Applied AI</div>
                <h2>Deployment-ready tools, not research demos.</h2>
              </div>
              <p>
                Our AI projects span diagnostic imaging, predictive modeling,
                and workflow automation &mdash; built for real-world healthcare
                settings.
              </p>
            </div>
            <div className="ai-grid">
              {aiProjects.map((title, index) => (
                <div key={title} className="ai-cell">
                  <span className="n">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h4>{title}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="team">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">Sec. 04 &mdash; Our people</div>
                <h2>Compassionate professionals.</h2>
              </div>
              <p>
                A multidisciplinary team of clinicians, researchers, and
                technologists driving healthcare innovation and impact.
              </p>
            </div>

            <div className="team-grid">
              {team.map((member) => (
                <div key={member.name} className="member">
                  <div className="avatar">
                    <span className="initials">{member.initials}</span>
                  </div>
                  <h4>{member.name}</h4>
                  <span className="role">{member.role}</span>
                  <p className="desc">{member.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="rule" />

        <NavigatorSection />

        <section id="partners" className="partners-band">
          <div className="wrap">
            <div className="section-head partners-head">
              <div>
                <div className="eyebrow">
                  Sec. 06 &mdash; Strategic partners
                </div>
                <h2>An ecosystem, not a client list.</h2>
              </div>
              <p>
                Our partnerships supply scientific rigor, regulatory alignment,
                and end-to-end delivery capacity.
              </p>
            </div>

            <div className="partners-grid">
              <article className="partner-col tone-national">
                <header className="partner-col-head">
                  <span className="partner-idx" aria-hidden="true">
                    01
                  </span>
                  <div>
                    <p className="partner-kicker">Ethiopia</p>
                    <h3>National institutions</h3>
                  </div>
                </header>
                <p className="partner-note">
                  Research excellence, regulatory alignment, and scientific
                  credibility at home.
                </p>
                <ul className="partner-roster">
                  <li>
                    <span className="partner-mark">01</span>
                    <span className="partner-name">
                      Armauer Hansen Research Institute
                      <em>AHRI</em>
                    </span>
                  </li>
                  <li>
                    <span className="partner-mark">02</span>
                    <span className="partner-name">CDT-Africa</span>
                  </li>
                  <li>
                    <span className="partner-mark">03</span>
                    <span className="partner-name">Gondar University</span>
                  </li>
                  <li>
                    <span className="partner-mark">04</span>
                    <span className="partner-name">Gambella Hospital</span>
                  </li>
                </ul>
              </article>

              <article className="partner-col tone-global">
                <header className="partner-col-head">
                  <span className="partner-idx" aria-hidden="true">
                    02
                  </span>
                  <div>
                    <p className="partner-kicker">Worldwide</p>
                    <h3>International partners</h3>
                  </div>
                </header>
                <p className="partner-note">
                  Global health expertise across diagnostics, research, and
                  clinical delivery.
                </p>
                <ul className="partner-roster">
                  <li>
                    <span className="partner-mark">01</span>
                    <span className="partner-name">Abbot RDT division</span>
                  </li>
                  <li>
                    <span className="partner-mark">02</span>
                    <span className="partner-name">ACE Research Africa</span>
                  </li>
                  <li>
                    <span className="partner-mark">03</span>
                    <span className="partner-name">
                      Hargiessa Group Hospital
                      <em>Somaliland</em>
                    </span>
                  </li>
                  <li>
                    <span className="partner-mark">04</span>
                    <span className="partner-name">
                      Allegro Bio
                      <em>Belgium</em>
                    </span>
                  </li>
                  <li>
                    <span className="partner-mark">05</span>
                    <span className="partner-name">InTec Products, Inc.</span>
                  </li>
                </ul>
              </article>

              <article className="partner-col tone-sister">
                <header className="partner-col-head">
                  <span className="partner-idx" aria-hidden="true">
                    03
                  </span>
                  <div>
                    <p className="partner-kicker">Network</p>
                    <h3>Sister companies</h3>
                  </div>
                </header>
                <p className="partner-note">
                  Operational reach across care delivery and medical supply
                  chains.
                </p>
                <ul className="partner-roster">
                  <li>
                    <span className="partner-mark">01</span>
                    <span className="partner-name">
                      Chechela Medical Services PLC
                      <em>Multi-specialty complex</em>
                    </span>
                  </li>
                  <li>
                    <span className="partner-mark">02</span>
                    <span className="partner-name">
                      Ibex Hospital
                      <em>Gondar</em>
                    </span>
                  </li>
                  <li>
                    <span className="partner-mark">03</span>
                    <span className="partner-name">
                      JH Drugs and Medical Supplies Import PLC
                    </span>
                  </li>
                  <li>
                    <span className="partner-mark">04</span>
                    <span className="partner-name">Biljem Trading PLC</span>
                  </li>
                  <li>
                    <span className="partner-mark">05</span>
                    <span className="partner-name">
                      Dr. Kalid and Families Pediatrics Center
                    </span>
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-band">
          <div className="wrap">
            <div className="contact-grid">
              <div>
                <div className="eyebrow gold">Sec. 07 &mdash; Get in touch</div>
                <h2>Let&apos;s discuss your next study or system.</h2>
                <p className="contact-lede">
                  Whether you&apos;re a trial sponsor, a hospital, or a research
                  institution, our team responds within one business day.
                </p>

                <div className="contact-detail">
                  <a href="mailto:info@asbidale.com">
                    <span className="label">Email</span> info@asbidale.com
                  </a>
                  <a href="tel:+251911248265">
                    <span className="label">Phone</span> +251 911 248 265
                  </a>
                  <span className="static">
                    <span className="label">Office</span> Addis Ababa, Ethiopia
                  </span>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="foot-top">
            <div className="foot-brand">
              <span className="brand-word">Asbidale Consultancy Services</span>
              <span className="brand-sub">Pvt. Ltd. Co.</span>
              <p>
                Asbidale Consultancy Services Pvt. Ltd. Co. &mdash; a
                multidisciplinary
                consultancy bridging clinical research and AI innovation across
                Ethiopia and beyond.
              </p>
            </div>
            <div className="foot-cols">
              <div className="foot-col">
                <h5>Sitemap</h5>
                <ul>
                  <li>
                    <a href="#who-we-are">About us</a>
                  </li>
                  <li>
                    <a href="#services">Services</a>
                  </li>
                  <li>
                    <a href="#navigator">Navigator</a>
                  </li>
                  <li>
                    <a href="#team">Team</a>
                  </li>
                  <li>
                    <a href="#partners">Partners</a>
                  </li>
                  <li>
                    <a href="/dashboard">Investigator portal</a>
                  </li>
                  <li>
                    <a href="/sponsor-dashboard">Sponsor workspace</a>
                  </li>
                  <li>
                    <a href="#contact">Contact</a>
                  </li>
                </ul>
              </div>
              <div className="foot-col">
                <h5>Contact</h5>
                <ul>
                  <li>
                    <a href="mailto:info@asbidale.com">info@asbidale.com</a>
                  </li>
                  <li>
                    <a href="tel:+251911248265">+251 911 248 265</a>
                  </li>
                  <li>
                    <span>Addis Ababa, Ethiopia</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="foot-bottom">
            <span>
              &copy; 2026 Asbidale Consultancy Services Pvt. Ltd. Co. All
              rights
              reserved.
            </span>
            <span>
              Clinical Research Organization &middot; AI &amp; Digital Health
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
