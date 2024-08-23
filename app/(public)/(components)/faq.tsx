"use client"
import { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';

const faqData = [
  {
    question: "What is Connect?",
    answer: "Connect is a comprehensive platform designed to simplify event management and ticketing for campus-related activities. It allows organizations to create, promote, and manage events while providing students with an easy way to discover and attend campus happenings."
  },
  {
    question: "How do I create an event?",
    answer: "To create an event, log into your account, navigate to the dashboard, click on 'Events' and then 'New Event'. Follow the step-by-step guide to input your event details, set up ticketing, and publish your event."
  },
  {
    question: "Can I sell tickets through Connect?",
    answer: "Not yet. We're working on that. Connect offers integrated ticketing solutions. Currently, you can set up free tickets, manage capacities, and track tickets directly through our platform."
  },
  {
    question: "How do attendees access their tickets?",
    answer: "After purchasing, attendees are given the option to print their ticket. They can also access their tickets through their Connect account or from 'Find Ticket' using their email or ticket code."
  },
  {
    question: "Is there a mobile app for Connect?",
    answer: "Currently, Connect is a web-based platform optimized for both desktop and mobile browsers. We're working on dedicated mobile apps to enhance the user experience further."
  }
];

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-accent/10 last:border-b-0">
      <button
        className="flex justify-between items-center px-4 w-full py-4  shadow rounded-md text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium font-roboto-mono text-lg">{question}</span>
        <Plus className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="py-4 px-4 bg-accent/5 text-gray-500 tracking-wider italic  font-normal rounded-md">{answer}</p>
      </div>
    </div>
  );
};

export const FAQSection = () => {
  return (
    <section id="faq-section" className="main_container py-20 bg-gradient-to-b from-background to-background-alt">
      <div className="sub_container max-w-3xl mx-auto">
        <h2 className="font-bold text-3xl text-center mb-2">Frequently Asked Questions</h2>
        <p className="text-muted-foreground text-center mb-12">Find answers to common questions about Connect</p>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;