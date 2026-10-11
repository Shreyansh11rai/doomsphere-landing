export interface LegalDocumentSection {
  id: string;
  title: string;
  paragraphs: readonly string[];
}

export interface LegalDocumentData {
  title: string;
  introduction: string;
  sections: readonly LegalDocumentSection[];
}

export const LEGAL_DOCUMENTS = {
  privacy: {
    title: "Privacy Policy",
    introduction:
      "This policy explains how DoomSphere collects, uses, stores, and shares personal information when you visit our website, contact us, or discuss or receive our digital services. We aim to collect only information relevant to those activities and to handle it with care.",
    sections: [
      {
        id: "information-we-collect",
        title: "1. Information we collect",
        paragraphs: [
          "Information you give us may include your name, email address, telephone number, business name, project requirements, preferred contact times, and any files or other details you choose to share through an enquiry or while working with us.",
          "When you browse our website, basic technical and usage information may be processed by our hosting, performance, or analytics providers. This can include device and browser details, pages visited, approximate usage events, and diagnostic information. Such providers may use cookies or similar technologies according to their own settings and policies.",
          "If we communicate with you through email, telephone, or a messaging service, we may retain the content and contact details needed to manage that conversation and any work you ask us to provide.",
        ],
      },
      {
        id: "how-we-use-information",
        title: "2. How we use information",
        paragraphs: [
          "We use information to respond to enquiries; understand your business needs; prepare recommendations, proposals, and quotes; deliver and support agreed work; coordinate project feedback; maintain our business records; protect our website and systems; and meet applicable legal obligations.",
          "We may also use limited website usage information to understand whether pages are working well and where usability or performance improvements are needed. We do not use enquiry details to send unrelated marketing unless you have asked for it or applicable law permits it.",
        ],
      },
      {
        id: "lawful-handling",
        title: "3. Processing and choices",
        paragraphs: [
          "We handle personal information for the purposes described above and in accordance with applicable Indian data-protection and privacy laws. Depending on the situation, processing may be necessary to respond to your request, take steps before entering an agreement, perform an agreement, meet a legal obligation, or support a legitimate business purpose that does not override your rights.",
          "You may ask us to access, correct, or delete information you have provided, or raise a question about how it is used. Some records may need to be retained where required for an active engagement, legal compliance, security, or the establishment or defence of a legal claim.",
        ],
      },
      {
        id: "sharing",
        title: "4. When information is shared",
        paragraphs: [
          "We do not sell personal information. We may share the minimum information needed with service providers that help us operate our website, communicate with you, process project work, or provide hosting, analytics, and related technical services. Those providers process information under their own terms and applicable safeguards.",
          "We may disclose information if required by law, a valid legal process, or a competent authority, or where reasonably necessary to protect people, our rights, or the security of our services. If a project requires sharing information with a platform or integration selected for you, we will explain the relevant data flow as part of the project scope where practical.",
        ],
      },
      {
        id: "retention-and-security",
        title: "5. Retention and security",
        paragraphs: [
          "We keep information only for as long as it is reasonably needed for the purposes described in this policy, including responding to you, completing agreed services, maintaining appropriate business records, resolving issues, and meeting legal requirements. Retention periods vary based on the type of information and the work involved.",
          "We use reasonable administrative and technical measures intended to protect information from unauthorised access, loss, misuse, or alteration. No website, email transmission, or storage system can be guaranteed completely secure, so please avoid sending sensitive information unless it is needed for the work and an appropriate channel has been agreed.",
        ],
      },
      {
        id: "client-project-data",
        title: "6. Information handled for client projects",
        paragraphs: [
          "A digital project may involve information controlled by you, such as customer enquiries, booking details, or business records. The project proposal should identify the systems involved and the parties responsible for them. Unless we expressly agree otherwise in writing, you remain responsible for the information you collect from your customers, your notices and permissions, and your choice of third-party platforms.",
          "We will use project information only as needed to perform the agreed work and will not access or use client systems beyond the permissions and purpose agreed for that work. Please do not provide credentials through an unsecured message; use an agreed secure sharing method where available.",
        ],
      },
      {
        id: "external-services",
        title: "7. External links and services",
        paragraphs: [
          "Our website or project deliverables may link to or integrate with third-party websites and services. Those services operate under their own privacy practices, terms, and availability. We do not control those practices, and you should review the applicable provider information before using or connecting a service.",
        ],
      },
      {
        id: "children",
        title: "8. Children",
        paragraphs: [
          "Our website and services are intended for businesses and adults. We do not knowingly seek personal information directly from children. If you believe a child has provided personal information to us, please contact us so we can review the matter.",
        ],
      },
      {
        id: "policy-changes",
        title: "9. Changes to this policy",
        paragraphs: [
          "We may update this policy when our services, website, or legal obligations change. The current version will be published on this page with its updated date. Material changes will apply from the time the revised policy is published unless a different date is stated.",
        ],
      },
      {
        id: "privacy-contact",
        title: "10. Contact us",
        paragraphs: [
          "For privacy questions or requests relating to personal information, contact hello@doomsphere.com. You may also write to DoomSphere, Mani, Phoolpur, Varanasi, Uttar Pradesh 221206, India.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    introduction:
      "These terms describe the general conditions for using the DoomSphere website and discussing or purchasing our digital services. The project proposal, quote, or other written order accepted by both parties sets the specific scope, deliverables, schedule, and fees for an engagement. If that written scope conflicts with these general terms, the written scope governs that engagement to the extent of the conflict.",
    sections: [
      {
        id: "about-the-services",
        title: "1. About the services",
        paragraphs: [
          "DoomSphere provides digital services for businesses, which may include website and landing-page design or development, online-store experiences, enquiry and booking flows, WhatsApp setup and automation, workflow automation, search optimisation, content, and marketing support.",
          "The exact service, deliverables, technology, and completion criteria are those recorded in the project proposal or quote. Examples and descriptions on the website are general information and do not, by themselves, create a commitment to deliver a particular feature or business result.",
        ],
      },
      {
        id: "quotes-and-pricing",
        title: "2. Discovery, quotes, and pricing",
        paragraphs: [
          "We usually begin by understanding your goals, existing tools, content, and functional requirements. We then provide a written quote or proposal describing the recommended scope, assumptions, exclusions, fees, and any relevant milestones.",
          "Service charges depend on the requirements and complexity of the work. A fixed pricing ladder can require you to pay for features you do not need or cap features you do need. We therefore prepare a quote around the agreed requirements rather than promising that every project fits a preset tier. Work outside the accepted scope may require a revised quote.",
          "A quote is valid for the period stated in it. Taxes, third-party subscriptions, paid assets, hosting, messaging charges, advertising spend, and other external costs are excluded unless the quote expressly includes them.",
        ],
      },
      {
        id: "payment",
        title: "3. Payment",
        paragraphs: [
          "Fees, payment milestones, due dates, and any advance payment are stated in the accepted quote or proposal. You agree to pay invoices by the stated due date using the agreed payment method. We may pause work after notifying you if an undisputed invoice remains overdue.",
          "Unless the written scope says otherwise, external provider costs and recurring subscriptions are payable by you directly to the relevant provider. A change in provider pricing or usage charges is outside our control.",
          "Any cancellation, rescheduling, or refund terms specific to an engagement will be stated in its accepted written scope. Where no specific term is stated, we will discuss completed work, committed costs, and a fair close-out in good faith, subject to applicable law.",
        ],
      },
      {
        id: "scope-and-changes",
        title: "4. Scope changes",
        paragraphs: [
          "The agreed scope defines what is included. New features, extra pages, additional integrations, substantial content changes, or revisions beyond the agreed review process are changes to scope.",
          "We will explain the likely effect of a requested change on fees and timing before starting the additional work. A change is not included until both parties approve the revised scope in writing.",
        ],
      },
      {
        id: "your-responsibilities",
        title: "5. Your responsibilities",
        paragraphs: [
          "You agree to provide accurate project information, timely feedback, required content and approvals, and lawful access to systems needed for the agreed work. Delays in receiving materials, decisions, or access may affect delivery dates.",
          "You are responsible for ensuring that materials you provide, including text, images, trademarks, customer data, and instructions, may lawfully be used for the project. You are also responsible for the accuracy of business claims, prices, policies, and contact information published on your behalf.",
          "Where a project collects or processes information from your customers, you are responsible for deciding what information to collect, providing appropriate notices, obtaining required permissions, and using the resulting data lawfully. We can implement agreed technical features but do not provide legal advice.",
        ],
      },
      {
        id: "delivery-and-review",
        title: "6. Delivery, review, and acceptance",
        paragraphs: [
          "The proposal will describe the intended deliverables and, where applicable, the review or revision process. Please review work within the review period stated in the proposal and provide one clear, consolidated set of feedback where possible.",
          "A deliverable is considered accepted when you approve it in writing, put it into production or use it for its intended purpose, or do not report a material failure to meet the written acceptance criteria within the agreed review period. This does not limit rights that cannot legally be excluded.",
          "Delivery dates are estimates based on the assumptions and dependencies in the proposal. We will communicate material delays and work with you to agree a reasonable revised schedule.",
        ],
      },
      {
        id: "intellectual-property",
        title: "7. Intellectual property",
        paragraphs: [
          "You retain rights to materials you provide. You grant us permission to use those materials only as needed to perform the agreed services.",
          "Once all fees for the relevant deliverable are paid, rights in the original project materials specifically created for you will be assigned or licensed to you as described in the proposal. If the proposal is silent, we grant you a perpetual, non-exclusive licence to use those paid deliverables for your business purposes.",
          "Our pre-existing tools, reusable know-how, methods, and materials, and third-party or open-source components are not transferred to you. They remain subject to their existing rights and licence terms. We will identify material third-party dependencies where relevant to the agreed work.",
          "We will not use your name, logo, project details, or deliverables in public case studies or marketing without your permission.",
        ],
      },
      {
        id: "third-party-platforms",
        title: "8. Third-party platforms and ongoing services",
        paragraphs: [
          "Websites, messaging integrations, analytics, hosting, payment providers, and other tools may depend on third-party services. Their availability, prices, policies, security, and features are controlled by their providers and may change. We are not responsible for outages or changes outside our reasonable control.",
          "Ongoing hosting, maintenance, content updates, monitoring, support, and subscription management are not included unless expressly listed in the accepted scope. We will clarify any handover or access arrangements as part of delivery.",
        ],
      },
      {
        id: "outcomes-and-advice",
        title: "9. Outcomes and professional advice",
        paragraphs: [
          "We aim to deliver thoughtful work that supports your stated business goals. Search rankings, enquiry volumes, sales, advertising performance, customer behaviour, and operational savings depend on many factors outside our control, so we do not guarantee a particular commercial result unless a specific written commitment says otherwise.",
          "Our services are not legal, tax, financial, or regulatory advice. You should obtain advice from a qualified professional when your decisions require it.",
        ],
      },
      {
        id: "confidentiality-and-security",
        title: "10. Confidentiality and security",
        paragraphs: [
          "Each party will take reasonable care to protect non-public information received from the other party and use it only for the relevant business relationship. This does not apply to information that is public through no breach, already lawfully known, independently developed, or required to be disclosed by law.",
          "Please provide only the access and information needed for the project and use an agreed secure method for sharing credentials. We will use reasonable safeguards but cannot guarantee the security of systems operated by third parties.",
        ],
      },
      {
        id: "suspension-and-termination",
        title: "11. Suspension and termination",
        paragraphs: [
          "Either party may end an engagement as described in its written scope. If no process is specified, either party may give written notice and allow a reasonable opportunity to address a material breach before ending the engagement, except where immediate termination is required by law or necessary to address serious security or misuse concerns.",
          "On termination, you remain responsible for fees for work completed and non-cancellable costs committed up to the effective termination date. We will agree a practical handover of paid deliverables and project materials, subject to payment of outstanding undisputed amounts and applicable law.",
        ],
      },
      {
        id: "liability",
        title: "12. Liability",
        paragraphs: [
          "Nothing in these terms excludes or limits liability that cannot be excluded or limited under applicable law. Subject to that rule, neither party is liable to the other for indirect or consequential loss, loss of anticipated profits, or loss of data arising from an engagement.",
          "To the extent permitted by law, our total liability arising from a specific engagement will not exceed the fees paid or payable for that engagement. This limitation does not apply to liability that applicable law does not permit us to limit.",
        ],
      },
      {
        id: "changes-and-law",
        title: "13. Changes, governing law, and contact",
        paragraphs: [
          "We may update these website terms from time to time. The version published on this page applies to website use from its stated update date. Changes to an active project scope require agreement in writing.",
          "These terms are governed by the laws of India. Courts with jurisdiction in Varanasi, Uttar Pradesh will have jurisdiction, subject to any mandatory rights or jurisdiction rules under applicable law.",
          "For questions about these terms, contact hello@doomsphere.com or write to DoomSphere, Mani, Phoolpur, Varanasi, Uttar Pradesh 221206, India.",
        ],
      },
    ],
  },
} as const satisfies Record<"privacy" | "terms", LegalDocumentData>;
