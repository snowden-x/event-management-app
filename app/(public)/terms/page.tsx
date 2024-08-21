"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShieldCheck, Eye, Key, Share2, Trash2, HelpCircle, FileText, UserCheck, Scale, Clock, Ban } from 'lucide-react'
import Footer from '../(components)/footer'
import Header from '../(components)/header'

export default function TermsandConditions() {


  return (
    <>
      <Header></Header>
      <div className="container mx-auto p-4 max-w-2xl">
        <h1 className="text-3xl font-medium mb-6 text-center">Our  Policies</h1>
        <p className="mb-4 text-center">We promise to make this as painless as possible. Let's dive in!</p>


        <Tabs defaultValue="privacy" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
          </TabsList>
          <TabsContent value="privacy">
            <Accordion type="single" collapsible className="mb-6">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold">
                  <ShieldCheck className="mr-2" /> What info do we collect?
                </AccordionTrigger>
                <AccordionContent>
                  <p>We collect only what we need to make your experience awesome:</p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Your name (so we can call you something other than "hey you")</li>
                    <li>Your email (for important stuff, not spam, we promise!)</li>
                    <li>Your favorite color (just kidding, we don't need that)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold">
                  <Eye className="mr-2" /> How do we use your info?
                </AccordionTrigger>
                <AccordionContent>
                  <p>We use your info to:</p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Provide our super cool services</li>
                    <li>Improve your experience (we're always learning!)</li>
                    <li>Send you important updates (no spam, we hate it too)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold">
                  <Key className="mr-2" /> How do we keep your info safe?
                </AccordionTrigger>
                <AccordionContent>
                  <p>We treat your data like a dragon guards its gold:</p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>State-of-the-art encryption (fancy tech stuff)</li>
                    <li>Regular security audits (we're always on guard)</li>
                    <li>Limited access (only the cool kids can see it)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-semibold">
                  <Share2 className="mr-2" /> Do we share your info?
                </AccordionTrigger>
                <AccordionContent>
                  <p>We're not gossips, but sometimes we have to share:</p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>With our service providers (they're cool, we promise)</li>
                    <li>If the law says we must (we're law-abiding citizens)</li>
                    <li>If you say it's okay (you're the boss!)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-semibold">
                  <Trash2 className="mr-2" /> How can you control your info?
                </AccordionTrigger>
                <AccordionContent>
                  <p>You're in charge! You can:</p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Access your data (peek behind the curtain)</li>
                    <li>Update your info (people change, we get it)</li>
                    <li>Delete your account (we'll be sad to see you go)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          <TabsContent value="terms">
            <Accordion type="single" collapsible className="mb-6">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold">
                  <FileText className="mr-2" /> What are these terms about?
                </AccordionTrigger>
                <AccordionContent>
                  <p>These terms are the rules of the road for using our awesome service:</p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>They explain what you can (and can't) do</li>
                    <li>They protect both you and us (it's a win-win!)</li>
                    <li>They're actually important (we know, shocking!)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold">
                  <UserCheck className="mr-2" /> Who can use our service?
                </AccordionTrigger>
                <AccordionContent>
                  <p>We welcome everyone* to our service!</p>
                  <p className="text-sm mt-2">*Everyone who:</p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Is old enough (sorry, kids)</li>
                    <li>Follows our community guidelines (be nice!)</li>
                    <li>Doesn't live in a country we're not allowed to operate in (blame geopolitics)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold">
                  <Scale className="mr-2" /> What are your rights and responsibilities?
                </AccordionTrigger>
                <AccordionContent>
                  <p>With great power comes great responsibility:</p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>You can use our service (yay!)</li>
                    <li>You must follow our rules (they're reasonable, we promise)</li>
                    <li>You're responsible for your account (don't let your dog post for you)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-semibold">
                  <Clock className="mr-2" /> How long do these terms last?
                </AccordionTrigger>
                <AccordionContent>
                  <p>Our relationship is ongoing, but like all good things, it can end:</p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>These terms apply as long as you use our service</li>
                    <li>You can stop using our service anytime (we'll miss you!)</li>
                    <li>We may update these terms (we'll let you know)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-semibold">
                  <Ban className="mr-2" /> What happens if someone breaks the rules?
                </AccordionTrigger>
                <AccordionContent>
                  <p>We don't like being the bad guys, but sometimes we have to:</p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>We may suspend accounts that violate our terms</li>
                    <li>We may remove content that breaks the rules</li>
                    <li>In serious cases, we may take legal action (but let's not go there)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <p className="text-sm hidden mb-2">Questions? We've got answers!</p>
          <Button className="hidden" variant="outline">
            <HelpCircle className="mr-2" /> Contact Us
          </Button>
        </div>
      </div>
      <Footer></Footer>
    </>

  )
}