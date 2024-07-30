import Header from "../(components)/header";
import { _event } from "@/lib/routes";
import EventsHeader from "../(components)/events-header";
import EevntsContainer from "../(components)/events-container";
import EevntsContainerV from "../(components)/events-container-v";
import EventsHeaderV from "../(components)/events-header-v";
import Footer from "../(components)/footer";

export default async function Events() {
  return (
    <>
      <Header />
      <main className="main_container events_page_h bg-gray-50 ">
        <div className="sub_container flex min-h-full py-7 gap-5">
          <section className="flex-1">
            <EventsHeader />
            <EevntsContainer/>
            <br></br>
            <br></br>
            <EventsHeaderV />
            <EevntsContainerV/>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}