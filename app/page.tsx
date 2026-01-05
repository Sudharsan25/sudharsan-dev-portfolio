/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Cloud,
  Database,
  Layers,
  Layout,
  Server,
  Home,
  User,
  Briefcase,
  FolderKanban,
  Mail,
  FileDown,
} from "lucide-react";
import { toast } from "sonner";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    // Get your free access key from https://web3forms.com
    formData.append("access_key", "10715e70-e49c-45a8-bf70-6663b505b511");
    formData.append("subject", "New Contact Form Submission from Portfolio");
    formData.append("from_name", "Portfolio Contact Form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log(data);
      if (data.success) {
        toast.success("Message sent successfully! I'll get back to you soon.", {
          position: "bottom-right",
        });
        formRef.current?.reset();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "experiences", label: "Experiences", icon: Briefcase },
    { id: "works", label: "Works", icon: FolderKanban },
    // { id: "blogs", label: "Blogs" },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map((item) => item.id);
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Check if scrolled
      setIsScrolled(window.scrollY > 50);

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuItems]);

  return (
    <motion.div className="flex min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-6 ${
          isScrolled
            ? "bg-background/70 backdrop-blur-md border-b border-border/50 shadow-sm"
            : "bg-transparent"
        }`}>
        <nav
          className={`mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "max-w-6xl" : "max-w-7xl"
          }`}>
          {/* Logo/Branding */}
          <div className="shrink-0">
            <h1 className="font-serif font-bold text-xl sm:text-2xl text-black">
              Sudharsan
            </h1>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 flex-1 justify-center">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-sans text-sm xl:text-base uppercase px-4 xl:px-6 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                    activeSection === item.id
                      ? "font-bold text-black bg-black/10"
                      : "font-normal text-black/70 hover:text-black hover:bg-black/5"
                  }`}>
                  <IconComponent className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Side: Social Icons & Resume */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Resume Download */}
            <a
              href="/resume.pdf"
              download
              className="p-2 rounded-lg hover:bg-black/10 transition-all duration-300 group"
              title="Download Resume">
              <FileDown className="w-5 h-5 sm:w-6 sm:h-6 text-black group-hover:opacity-70 transition-opacity" />
            </a>

            {/* Social Icons */}
            <a
              href="https://x.com/sudharsandevv"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-black/10 transition-all duration-300 group"
              title="Twitter">
              <Image
                src="/assets/icons/x.svg"
                alt="Twitter"
                height={20}
                width={20}
                className="w-5 h-5 sm:w-6 sm:h-6 group-hover:opacity-70 transition-opacity"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/sudharsans25/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-black/10 transition-all duration-300 group"
              title="LinkedIn">
              <Image
                src="/assets/icons/linkedin.svg"
                alt="LinkedIn"
                height={20}
                width={20}
                className="w-5 h-5 sm:w-6 sm:h-6 group-hover:opacity-70 transition-opacity"
              />
            </a>
            <a
              href="https://github.com/Sudharsan25"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-black/10 transition-all duration-300 group"
              title="GitHub">
              <Image
                src="/assets/icons/github.svg"
                alt="GitHub"
                height={20}
                width={20}
                className="w-5 h-5 sm:w-6 sm:h-6 group-hover:opacity-70 transition-opacity"
              />
            </a>

            {/* Mobile Menu Button */}
            <button
              aria-label="Toggle menu"
              onClick={() => setMobileMenuOpen((s) => !s)}
              className="lg:hidden p-2 rounded-lg bg-black/10 hover:bg-black/20 transition-colors">
              {mobileMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 z-40 bg-background/98 backdrop-blur-md border-b border-border shadow-lg">
          <nav className="flex flex-col p-6 gap-4">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`font-sans text-lg uppercase text-left transition-all duration-300 flex items-center gap-3 py-2 ${
                    activeSection === item.id
                      ? "font-bold text-black"
                      : "font-normal text-black/70"
                  }`}>
                  <IconComponent className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 relative w-full pt-20 lg:pt-24">
        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-20 scroll-mt-0">
          {/* Hero Content */}
          <motion.div
            className="relative z-10 max-w-[600px] mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}>
            {/* Gradient Blob Background */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-12">
              <img
                src="/assets/graphics/gradient-blob.svg"
                alt=""
                className="w-[246px] h-[177px]"
              />
            </div>

            {/* Hero Text */}
            <motion.div
              className="relative mb-16"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}>
              <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[64px] text-black leading-tight mb-8 lg:mb-24">
                Hi, I&apos;m Sudharsan
              </h1>
              <h3 className="font-sans text-lg sm:text-xl md:text-2xl lg:text-[30px] text-black leading-relaxed">
                <span className="font-bold">Full-Stack Developer</span> <br />
                Building scalable systems and intelligent products end to end.
              </h3>
            </motion.div>
          </motion.div>
          {/* <motion.div className="relative">
            <Image
              src="/assets/images/heroimage.png"
              alt="Sudharsan"
              width={800}
              height={800}
              className="w-[800px] h-[800px] object-contain "
            />
          </motion.div> */}
        </section>

        {/* About Section */}
        <section
          id="about"
          className="min-h-screen flex items-center px-6 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-20 scroll-mt-0">
          <motion.div
            className="max-w-4xl mx-auto w-full"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}>
            <motion.h2
              className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[48px] text-black mb-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}>
              About Me
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}>
              <p className="font-sans text-[18px] text-black leading-relaxed mb-6">
                I design and build end-to-end software products that solve real
                problems — from intuitive, accessible user interfaces to
                scalable backend systems and reliable cloud infrastructure.
              </p>

              <p className="font-sans text-[18px] text-black leading-relaxed mb-8">
                I specialize in building modern, production-ready applications
                using a TypeScript-based stack. On the frontend, I create
                responsive and user-focused interfaces with React and Next.js.
                On the backend, I design clean, maintainable services using
                NestJS, RESTful APIs, and relational databases.
              </p>

              <p className="font-sans text-[18px] text-black leading-relaxed mb-8">
                My approach goes beyond writing code — I focus on system design,
                data flow, performance, and long-term maintainability. I enjoy
                working through tradeoffs, designing for scale, and turning
                ambiguous requirements into clear, well-structured solutions.
              </p>

              <p className="font-sans text-[18px] text-black leading-relaxed mb-8">
                I build with a product mindset: understanding the problem first,
                choosing the right tools for the job, and delivering solutions
                that are reliable, extensible, and ready for real-world use.
              </p>
            </motion.div>

            <motion.div
              className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}>
              <h3 className="font-sans font-bold text-[24px] text-black mb-6 flex items-center gap-2">
                <Layers className="w-6 h-6 text-black" />
                Tech Stack
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Programming Languages*/}
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Layout className="w-5 h-5 text-black" strokeWidth={2} />
                    <h4 className="font-sans font-semibold text-[16px] text-black uppercase tracking-wide">
                      Programming Languages
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["JavaScript", "TypeScript", "Python", "SQL"].map(
                      (tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-muted text-black rounded-lg font-sans text-[14px] font-medium border border-border hover:bg-primary/10 hover:border-primary/30 transition-colors">
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </motion.div>
                {/* Frontend */}
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Layout className="w-5 h-5 text-black" strokeWidth={2} />
                    <h4 className="font-sans font-semibold text-[16px] text-black uppercase tracking-wide">
                      Frontend
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Next.js",
                      "React",
                      "Vite",
                      "Redux Toolkit",
                      "TailwindCSS",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-muted text-black rounded-lg font-sans text-[14px] font-medium border border-border hover:bg-primary/10 hover:border-primary/30 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Backend & APIs */}
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Server className="w-5 h-5 text-black" strokeWidth={2} />
                    <h4 className="font-sans font-semibold text-[16px] text-black uppercase tracking-wide">
                      Backend & APIs
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["NestJS", "FastAPI", "REST APIs"].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-muted text-black rounded-lg font-sans text-[14px] font-medium border border-border hover:bg-primary/10 hover:border-primary/30 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Databases & Messaging */}
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  viewport={{ once: true }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Database className="w-5 h-5 text-black" strokeWidth={2} />
                    <h4 className="font-sans font-semibold text-[16px] text-black uppercase tracking-wide">
                      Databases & Messaging
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "PostgreSQL",
                      "MongoDB",
                      "Drizzle ORM",
                      "RabbitMQ",
                      "Redis(Cache)",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-muted text-black rounded-lg font-sans text-[14px] font-medium border border-border hover:bg-primary/10 hover:border-primary/30 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Infrastructure & DevOps */}
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  viewport={{ once: true }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Cloud className="w-5 h-5 text-black" strokeWidth={2} />
                    <h4 className="font-sans font-semibold text-[16px] text-black uppercase tracking-wide">
                      Infrastructure & DevOps
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Docker", "AWS S3", "AWS EC2", "AWS RDS (Aurora)"].map(
                      (tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-muted text-black rounded-lg font-sans text-[14px] font-medium border border-border hover:bg-primary/10 hover:border-primary/30 transition-colors">
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8 sm:mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}>
              {[
                { number: "5+", label: "Years Experience" },
                { number: "50+", label: "Projects Completed" },
                { number: "30+", label: "Happy Clients" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className={`text-center p-6 rounded-lg backdrop-blur-sm border-2 transition-all hover:shadow-lg ${
                    index === 0
                      ? "bg-gradient-to-br from-pearl-aqua-100 to-pearl-aqua-50 border-pearl-aqua-300"
                      : index === 1
                      ? "bg-gradient-to-br from-bubblegum-pink-100 to-bubblegum-pink-50 border-bubblegum-pink-300"
                      : "bg-gradient-to-br from-lavender-blush-100 to-lavender-blush-50 border-lavender-blush-300"
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}>
                  <div className="font-serif font-bold text-[36px] bg-gradient-to-r from-graphite-900 to-coffee-bean-800 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="font-sans text-[14px] text-graphite-700 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div> */}
          </motion.div>
        </section>

        {/* Experiences Section */}
        <section
          id="experiences"
          className="min-h-screen flex items-center px-6 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-20 scroll-mt-0">
          <div className="max-w-6xl w-full mx-auto">
            <motion.h2
              className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[48px] text-black mb-8 sm:mb-12"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}>
              Experience
            </motion.h2>

            <div className="relative">
              {/* Vertical Timeline Line (hidden on small screens) */}
              <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-black/20" />

              <motion.div
                className="space-y-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}>
                {[
                  {
                    role: "Full-Stack Developer",
                    company:
                      "Freelance Consultant · KERA C · Chennai, India (Hybrid)",
                    period: "Oct 2025 – Present",
                    description: [
                      "Building scalable, multi-tenant backend systems using microservice-based and event-driven architectures, ensuring high performance, reliability, and maintainability in production.",

                      "Designed, optimized, and deployed cloud-hosted APIs and infrastructure with a focus on system scalability, low-latency data access, and clean, extensible architecture.",
                    ],
                    tech: "Nest.js, TypeScript, RabbitMQ, Docker, Redis, PostgreSQL, Drizzle ORM, AWS Aurora PostgreSQL, AWS EC2, Clean Architecture",
                    icon: "💼",
                  },
                  {
                    role: "Mobile Application Developer Intern",
                    company: "Parla Dynamics Inc. · Buffalo, New York (Remote)",
                    period: "Jun 2024 – Dec 2024",
                    description: [
                      "Implemented Android app features for a company-wide chat application using modern Android tooling.",
                      "Collaborated in an Agile environment to iterate quickly, resolve bugs, and maintain code quality.",
                    ],
                    tech: "Kotlin, Jetpack Compose, Firebase, JIRA, Agile, Code Review, Android Development",
                    icon: "📱",
                  },
                  {
                    role: "Research Assistant",
                    company:
                      "Centre for Additive Manufacturing · Chennai Institute of Technology · Chennai, India",
                    period: "Mar 2022 – Apr 2023",
                    description: [
                      "Analyzed sensor data from 3D printing machines to uncover relationships between key process parameters.",
                      "Developed predictive ML models to optimize 3D printing hyperparameters and supported publication of findings.",
                    ],
                    tech: "Machine Learning (XGBoost, AdaBoost), Data Analysis, MS Excel, MS Word, MS PowerPoint, Experimental Design",
                    icon: "🧪",
                  },
                ].map((experience, index) => (
                  <motion.div
                    key={experience.company + index}
                    className="relative flex items-start gap-8"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    viewport={{ once: true }}>
                    {/* Timeline Dot */}
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-black rounded-full flex items-center justify-center text-xl md:text-2xl border-4 border-background shadow-lg z-10">
                        {experience.icon}
                      </div>
                    </div>

                    {/* Experience Card */}
                    <motion.div
                      className="flex-1 p-8 bg-card/80 backdrop-blur-sm rounded-xl border-2 border-border hover:border-primary/30 hover:shadow-xl transition-all"
                      whileHover={{ y: -5 }}>
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-sans font-bold text-[24px] text-black">
                            {experience.role}
                          </h3>
                          <p className="font-sans text-[18px] text-black font-medium">
                            {experience.company}
                          </p>
                        </div>
                        <span className="font-sans text-sm md:text-[14px] text-black font-medium md:text-right">
                          {experience.period}
                        </span>
                      </div>

                      {/* Summary points */}
                      <ul className="font-sans text-[16px] text-black leading-relaxed list-disc pl-5 space-y-1 mb-4">
                        {experience.description.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>

                      {/* Tech & Skills */}
                      <p className="font-sans text-[14px] text-black leading-relaxed">
                        <span className="font-semibold">Tech & skills:</span>{" "}
                        {experience.tech}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Works Section */}
        <section
          id="works"
          className="min-h-screen flex items-center px-6 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-20 scroll-mt-0">
          <div className="max-w-6xl w-full mx-auto">
            <motion.h2
              className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[48px] text-black mb-8 sm:mb-12"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}>
              Works
            </motion.h2>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}>
              {[
                {
                  title: "PIVOT: Progress that doesn't break",
                  category: "Full Stack Application",
                  image: "/assets/images/PIVOT.png",
                  liveLink: "https://pivot-jade.vercel.app/",
                  description:
                    "A habit and urge tracking application designed specifically for users with ADHD. The app helps users log, track, and manage their urges in real-time with minimal friction, providing immediate feedback and lifetime statistics to support behavior change.",
                  color: "from-orange-300/40 to-bubblegum-pink-200/40",
                  bgColor: "from-lavender-blush-50 to-bubblegum-pink-50",
                },

                {
                  title: "ATS Resume Analyzer",
                  category: "Web Application",
                  image: "/assets/images/ats-analyzer.png",
                  codeLink:
                    "https://github.com/Sudharsan25/Ats_analyzer_nextjs",
                  liveLink: "https://ats-analyzer-nextjs.vercel.app/",
                  description:
                    "An ATS Resume Analyzer that helps job seekers optimize their resumes for applicant tracking systems with respect to specific job descriptions.",
                  color: "from-orange-300/40 to-bubblegum-pink-200/40",
                  bgColor: "from-lavender-blush-50 to-bubblegum-pink-50",
                },
                {
                  title: "Interview Agent",
                  category: "Full Stack Application",
                  image: "/assets/images/interview-agent.png",
                  codeLink: "https://github.com/Sudharsan25/AI_interview_agent",
                  liveLink: "https://ai-interview-agent-one.vercel.app/home",
                  description:
                    "A full-stack Interview agent that lets users generate dynamic interview questions and let them practice in a simulated interview environment.",
                  color: "from-bubblegum-pink-300/40 to-lavender-blush-200/40",
                  bgColor: "from-bubblegum-pink-50 to-lavender-blush-50",
                },
                {
                  title: "Plant Disease Detection with SSL",
                  category: "Computer Vision",
                  image: "/assets/images/plant-disease-detection.jpg",
                  codeLink:
                    "https://github.com/Sudharsan25/Plant_disease_detection_SSL",
                  liveLink: "",
                  description:
                    "Self-supervised learning models for detecting plant diseases using self-supervised learning techniques.",
                  color: "from-orange-300/40 to-bubblegum-pink-200/40",
                  bgColor: "from-lavender-blush-50 to-bubblegum-pink-50",
                },
                {
                  title: "News Feed Application",
                  category: "Web Application",
                  image: "/assets/images/news-feed.png",
                  codeLink: "https://github.com/Sudharsan25/Global_news_app",
                  liveLink: "https://news-frontend-pi.vercel.app/news",
                  description:
                    "A News feed application that fetches news articles from open source APIs and displays them in a user-friendly interface.",
                  color: "from-bubblegum-pink-300/40 to-lavender-blush-200/40",
                  bgColor: "from-bubblegum-pink-50 to-lavender-blush-50",
                },
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  className="group relative overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm border-2 border-border hover:border-primary/30 transition-all"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <div className="relative p-8">
                    {/* Project Image */}
                    <div className="h-48 rounded-lg mb-6 overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-6xl opacity-20">🎨</span>
                        </div>
                      )}
                    </div>

                    <div className="font-sans text-[14px] text-black uppercase tracking-wide mb-2">
                      {project.category}
                    </div>
                    <h3 className="font-sans font-bold text-[24px] text-black mb-3">
                      {project.title}
                    </h3>
                    <p className="font-sans text-[16px] text-black leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {project.codeLink && (
                        <a
                          href={project.codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-black text-white rounded-lg hover:bg-primary/90 transition-all font-sans text-[14px] font-medium">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                          </svg>
                          Code
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-card border-2 border-border text-black rounded-lg hover:border-secondary hover:bg-secondary/10 transition-all font-sans text-[14px] font-medium">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" x2="21" y1="14" y2="3" />
                          </svg>
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Blogs Section
        <section
          id="blogs"
          className="min-h-screen flex items-center px-16 py-20 scroll-mt-0">
          <div className="max-w-6xl w-full">
            <motion.h2
              className="font-serif font-bold text-[48px] text-foreground mb-12"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, amount: 0.3 }}>
              Blogs
            </motion.h2>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}>
              {[
                {
                  title: "The Future of Design Systems",
                  date: "Dec 20, 2024",
                  readTime: "5 min read",
                  excerpt:
                    "Exploring how design systems are evolving and what it means for modern product teams.",
                  bgColor: "from-pearl-aqua-100 to-pearl-aqua-50",
                  headerColor: "from-pearl-aqua-200 to-pearl-aqua-100",
                  borderColor: "border-pearl-aqua-300",
                },
                {
                  title: "Accessibility in Digital Design",
                  date: "Dec 15, 2024",
                  readTime: "7 min read",
                  excerpt:
                    "Why accessibility should be at the core of every design decision we make.",
                  bgColor: "from-bubblegum-pink-100 to-bubblegum-pink-50",
                  headerColor: "from-bubblegum-pink-200 to-bubblegum-pink-100",
                  borderColor: "border-bubblegum-pink-300",
                },
                {
                  title: "From Wireframes to Prototypes",
                  date: "Dec 10, 2024",
                  readTime: "6 min read",
                  excerpt:
                    "A practical guide to transitioning from low-fidelity to high-fidelity designs.",
                  bgColor: "from-lavender-blush-100 to-lavender-blush-50",
                  headerColor: "from-lavender-blush-200 to-lavender-blush-100",
                  borderColor: "border-lavender-blush-300",
                },
              ].map((blog, index) => (
                <motion.div
                  key={blog.title}
                  className={`bg-gradient-to-br ${blog.bgColor} backdrop-blur-sm rounded-xl overflow-hidden border-2 ${blog.borderColor} hover:shadow-xl transition-all`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  whileHover={{ y: -5 }}>
                  <div
                    className={`h-40 bg-gradient-to-br ${blog.headerColor} flex items-center justify-center`}>
                    <span className="text-5xl">📝</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-[12px] text-foreground/50 mb-3">
                      <span>{blog.date}</span>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </div>
                    <h3 className="font-sans font-bold text-[20px] text-foreground mb-3">
                      {blog.title}
                    </h3>
                    <p className="font-sans text-[14px] text-foreground/70 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section> */}

        {/* Contact Section */}
        <section
          id="contact"
          className="min-h-screen flex items-center px-6 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-20 scroll-mt-0">
          <motion.div
            className="max-w-4xl w-full mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}>
            <motion.h2
              className="font-serif font-bold text-[48px] text-black mb-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}>
              Contact
            </motion.h2>

            <motion.p
              className="font-sans text-[18px] text-black leading-relaxed mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}>
              I&apos;m always interested in hearing about new projects and
              opportunities. Whether you have a question, want to collaborate,
              or just want to say hello, feel free to reach out.
            </motion.p>

            <motion.div
              className="bg-card/90 backdrop-blur-sm rounded-2xl p-10 border-2 border-border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Form */}
                <motion.div
                  className="lg:col-span-1"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}>
                  <form
                    className="space-y-5"
                    onSubmit={handleSubmit}
                    ref={formRef}>
                    <div>
                      <label
                        htmlFor="name"
                        className="block font-sans text-[14px] text-black font-medium mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your name"
                        className="w-full px-4 py-3 font-sans text-[16px] text-black bg-input rounded-lg border-2 border-border focus:border-primary focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block font-sans text-[14px] text-black font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 font-sans text-[16px] text-black bg-input rounded-lg border-2 border-border focus:border-primary focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block font-sans text-[14px] text-black font-medium mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="What's this about?"
                        className="w-full px-4 py-3 font-sans text-[16px] text-black bg-input rounded-lg border-2 border-border focus:border-primary focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block font-sans text-[14px] text-black font-medium mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Write your message here..."
                        className="w-full px-4 py-3 font-sans text-[16px] text-black bg-input rounded-lg border-2 border-border focus:border-primary focus:outline-none transition-colors resize-none"
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 font-sans text-[16px] font-bold text-white bg-black rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </motion.button>
                  </form>
                </motion.div>
                {/* Contact Info */}
                <motion.div
                  className="lg:col-span-1 flex flex-col justify-center"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}>
                  <motion.div
                    className="flex items-start gap-4 p-6 bg-card rounded-xl border-2 border-border hover:border-primary/30 transition-all"
                    whileHover={{ scale: 1.02 }}>
                    <img
                      src="/assets/icons/mail.svg"
                      alt=""
                      className="w-8 h-8 mt-1 flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-sans text-[14px] text-black uppercase tracking-wide mb-1">
                        Email
                      </div>
                      <a
                        href="mailto:sudharsan.0125@gmail.com"
                        className="font-sans text-[16px] sm:text-[18px] font-bold text-black hover:text-black/80 transition-colors break-all">
                        sudharsan.0125@gmail.com
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="mt-6 p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl border-2 border-border"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    viewport={{ once: true }}>
                    <p className="font-sans text-[14px] text-black leading-relaxed">
                      I typically respond within 24 hours. Looking forward to
                      hearing from you! 🚀
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </motion.div>
  );
}
