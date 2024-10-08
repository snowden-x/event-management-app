import Header from "../(components)/header";
import { _event } from "@/lib/routes";
import EventsHeader from "../(components)/events-header";
import EevntsContainer from "../(components)/events-container";
import EevntsContainerV from "../(components)/events-container-v";
import EventsHeaderV from "../(components)/events-header-v";
import Footer from "../(components)/footer";

export const dynamic = 'force-dynamic';

export default async function Events() {
  return (
    <>
      <div className="bg-gray-200/40 dark:bg-zinc-800/40">
        <Header />
        <main className="main_container events_page_h bg-transparent ">
          <div className="sub_container flex min-h-full py-7 gap-5">
            <section className="flex-1">
              <EventsHeader />
              <EevntsContainer />
              <br></br>
              <br></br>
              <EventsHeaderV />
              <EevntsContainerV />
            </section>
          </div>
        </main>

      </div>

      <Footer />
    </>
  );
}