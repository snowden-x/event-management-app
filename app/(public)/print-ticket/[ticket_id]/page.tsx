"use client";
import { FetchedPublicAttendeesProps, QueryProps } from "@/lib/types";
import Header from "../../(components)/header";
import { useGetPublicTicket } from "@/lib/query-hooks";
import SpinnerIcon from "@/components/icons/spinner-icon";
import { cn, convertTo12HourFormat, formatDate } from "@/lib/utils";
import Footer from "../../(components)/footer";
import QRCodeGenerator from "../../(components)/qrcode-generator";
import { useRef, useEffect } from "react";
import html2pdf from "html2pdf.js";
import {Download } from "lucide-react";

export default function Ticket({ params }: QueryProps) {
  const ticketID = params.ticket_id;
  const { data: attendee, isLoading } = useGetPublicTicket(ticketID);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && attendee && contentRef.current) {
      const ticketDetailElement = contentRef.current.querySelector('#ticket-detail');

      if (ticketDetailElement) {
        const opt = {
          margin: 10,
          filename: `Event Ticket.pdf`,
          image: { type: 'jpeg', quality: 1 },
          html2canvas: { scale: 4, logging: true, dpi: 300, letterRendering: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(ticketDetailElement).save().then(() => {
          console.log('PDF generated and downloaded');
        }).catch((err: any) => console.error('Error generating PDF:', err));
      }
    }
  }, [isLoading, attendee, ticketID]);

  return (
    <>
      <Header />
      <main className="main_container flex-1 px-4" ref={contentRef}>
        <section className="py-7 flex justify-center">
          <h1 className="text-xl font-medium text-gray-900 dark:text-white">Your Ticket</h1>
        </section>
        {isLoading ?
          (<Loading />) :
          (<TicketDetail attendee={attendee as FetchedPublicAttendeesProps} />)
        }
      </main>
      <Footer />
    </>
  );
}

const Loading = () => (
  <div className="flex justify-center items-center h-40">
    <SpinnerIcon className="w-10 h-10 text-gray-600" />
  </div>
);

const TicketDetail = ({ attendee }: { attendee: FetchedPublicAttendeesProps }) => {
  const { full_name, email, ticket_code, tickets } = attendee;
  const { name: ticketName, events, } = tickets;
  const { name, headline, banner, event_date, start_at } = events;

  return (
    <div id="ticket-detail" className="max-w-md mx-auto bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl overflow-hidden shadow-2xl my-8 relative">
      <div className="p-8 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-indigo-800 font-roboto-mono">{name}</h1>
          <Download className="text-indigo-600 cursor-pointer hover:text-indigo-800 transition-colors" size={34} />
        </div>
        
        <div className="text-center mb-8">
          <h2 className="text-2xl text-black dark:text-black font-roboto-mono font-bold">
            {headline}
          </h2>
          <p className="text-indigo-600 font-roboto-mono mt-4 font-medium">Show this ticket at the entrance.</p>
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="flex justify-between">
            <span className="text-indigo-700 font-roboto-mono">Date</span>
            <span className="font-semibold text-indigo-800 font-roboto-mono">{formatDate(event_date)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-indigo-700 font-roboto-mono">Time</span>
            <span className="font-semibold text-indigo-800 font-roboto-mono">{convertTo12HourFormat(start_at)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-indigo-700 font-roboto-mono">Ticket Code</span>
            <span className="font-semibold text-indigo-800">#{ticket_code}</span>
          </div>
        </div>
        
        <div className="border-t border-indigo-200 pt-6">
          <div className="text-center">
            <p className="text-indigo-600 font-roboto-mono mb-1">Thanks, </p>
            <p className="font-semibold text-indigo-800 text-lg capitalize font-roboto-mono">{full_name}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-indigo-800 p-6 flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg">
          <QRCodeGenerator value={ticket_code} size={150} />
        </div>
      </div>
    </div>
  );
};
