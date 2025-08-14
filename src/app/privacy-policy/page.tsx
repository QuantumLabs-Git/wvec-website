'use client'

import { motion } from 'framer-motion'
import { Shield, FileText, Users, Clock } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-ivory to-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">
              Privacy Policy
            </h1>
            <p className="text-charcoal/70 text-lg">
              How we protect and handle your personal data
            </p>
          </motion.div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-3xl p-8 md:p-12"
          >
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold text-charcoal mb-6 text-center">
                WHIDDON VALLEY EVANGELICAL CHURCH<br />
                DATA PRIVACY NOTICE
              </h2>

              {/* Church Details */}
              <div className="bg-sage/10 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-charcoal mb-4">Church Details</h3>
                <div className="space-y-2 text-charcoal/80">
                  <p><strong>Church:</strong> Whiddon Valley Evangelical Church</p>
                  <p><strong>Charity number:</strong> 1141903</p>
                  <p><strong>Church address:</strong> Stoat Park, Barnstaple, Devon EX32 8PT</p>
                  <p><strong>Church contact:</strong> Stephen Packham</p>
                  <p className="text-sm italic">Contact details on request</p>
                </div>
              </div>

              {/* Policy Information */}
              <div className="bg-steel-blue/10 rounded-xl p-6 mb-8">
                <p className="text-charcoal/80">
                  <strong>This policy first adopted:</strong> 1/11/24<br />
                  <strong>This policy should be reviewed annually.</strong><br />
                  The next review is due by 31/10/25
                </p>
              </div>

              {/* Organisation and Responsibilities */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-charcoal mb-4">
                  Organisation and Responsibilities
                </h3>
                
                <h4 className="text-lg font-medium text-charcoal mb-2">Responsibility of the Trustees</h4>
                <p className="text-charcoal/80 mb-4">
                  Overall responsibility for data privacy rests with the trustees. Specific responsibilities may be delegated to individuals.
                  The trustees of Whiddon Valley Evangelical Church have general responsibility to ensure that the Data Privacy Notice is adhered to.
                </p>
                
                <p className="text-charcoal/80">
                  <strong>Responsibility for the Data Privacy Notice:</strong> Stephen Packham
                </p>
              </div>

              {/* Sections */}
              <div className="space-y-8">
                {/* Section 1 */}
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3">
                    1. Your personal data – what is it?
                  </h3>
                  <p className="text-charcoal/80">
                    Personal data relates to a living individual who can be identified from that data. Identification can be by the information alone or in conjunction with any other information in the data controller's possession or likely to come into such possession. The processing of personal data is governed by the General Data Protection Regulation (the "GDPR").
                  </p>
                </div>

                {/* Section 2 */}
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3">
                    2. Who are we?
                  </h3>
                  <p className="text-charcoal/80">
                    Whiddon Valley Evangelical Church, Barnstaple, is the data controller (contact details below). This means it decides how your personal data is processed and for what purposes.
                  </p>
                </div>

                {/* Section 3 */}
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3">
                    3. How do we process your personal data?
                  </h3>
                  <p className="text-charcoal/80 mb-4">
                    Whiddon Valley Evangelical Church, Barnstaple, complies with its obligations under the "GDPR" by keeping personal data up to date; by storing and destroying it securely; by not collecting or retaining excessive amounts of data; by protecting personal data from loss, misuse, unauthorised access and disclosure and by ensuring that appropriate technical measures are in place to protect personal data.
                  </p>
                  <p className="text-charcoal/80 mb-2">We use your personal data for the following purposes:</p>
                  <ul className="list-disc pl-6 text-charcoal/80 space-y-1">
                    <li>To administer membership records;</li>
                    <li>To manage our employees and volunteers;</li>
                    <li>To maintain our own accounts and records (including the processing of gift aid applications);</li>
                    <li>To inform you of news, events, activities and services running at Whiddon Valley Evangelical Church to HMRC regarding gift aid.</li>
                  </ul>
                </div>

                {/* Section 4 */}
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3">
                    4. What is the legal basis for processing your personal data?
                  </h3>
                  <p className="text-charcoal/80 mb-4">
                    Explicit consent of the data subject so that we can keep you informed about news, events, activities and services and process your gift aid donations and keep you informed about forthcoming events.
                  </p>
                  <p className="text-charcoal/80 mb-2">
                    Processing is carried out by a not-for-profit body with a religious aim provided:
                  </p>
                  <ul className="list-disc pl-6 text-charcoal/80 space-y-1">
                    <li>the processing relates only to members or former members (or those who have regular contact with it in connection with those purposes); and</li>
                    <li>there is no disclosure to a third party without consent.</li>
                  </ul>
                </div>

                {/* Section 5 */}
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3">
                    5. Sharing your personal data
                  </h3>
                  <p className="text-charcoal/80">
                    Your personal data will be treated as strictly confidential and will only be shared with other members of the church in order to carry out a service to other church members or for purposes connected with the church. We will only share your data with third parties outside of the Church with your consent to HMRC regarding gift aid.
                  </p>
                </div>

                {/* Section 6 */}
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3">
                    6. How long do we keep your personal data?
                  </h3>
                  <p className="text-charcoal/80 mb-4">
                    We keep data only as long as required to perform the service you have requested or to comply with our legal and financial obligations.
                  </p>
                  <p className="text-charcoal/80">
                    Specifically, we retain gift aid declarations and associated paperwork for up to 6 years after the calendar year to which they relate.
                  </p>
                </div>

                {/* Section 7 */}
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3">
                    7. Your rights and your personal data
                  </h3>
                  <p className="text-charcoal/80 mb-4">
                    Unless subject to an exemption under the GDPR, you have the following rights with respect to your personal data:
                  </p>
                  <ul className="list-disc pl-6 text-charcoal/80 space-y-2">
                    <li>The right to request a copy of your personal data which Whiddon Valley Evangelical Church holds about you;</li>
                    <li>The right to request that the Whiddon Valley Evangelical Church corrects any personal data if it is found to be inaccurate or out of date;</li>
                    <li>The right to request your personal data is erased where it is no longer necessary for Whiddon Valley Evangelical Church to retain such data;</li>
                    <li>The right to withdraw your consent to the processing at any time;</li>
                    <li>The right, where there is a dispute in relation to the accuracy or processing of your personal data, to request a restriction is placed on further processing;</li>
                    <li>The right to lodge a complaint with the Information Commissioners Office.</li>
                  </ul>
                </div>

                {/* Section 8 */}
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3">
                    8. Further processing
                  </h3>
                  <p className="text-charcoal/80">
                    If we wish to use your personal data for a new purpose, not covered by this Data Protection Notice, then we will provide you with a new notice explaining this new use prior to commencing the processing and setting out the relevant purposes and processing conditions. Where and whenever necessary, we will seek your prior consent to the new processing. We will store your data in lockable storage and on a secure database.
                  </p>
                </div>

                {/* Section 9 */}
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3">
                    9. Contact Details
                  </h3>
                  <p className="text-charcoal/80 mb-4">
                    To exercise all relevant rights, queries of complaints please in the first instance contact Whiddon Valley Evangelical Church at <a href="https://www.wvec.org.uk/contact" className="text-steel-blue hover:text-cyber-teal smooth-transition">https://www.wvec.org.uk/contact</a> and use the contact box at the foot of the page.
                  </p>
                  <p className="text-charcoal/80 mb-4">
                    DPO (Data Protection Officer) at Whiddon Valley Evangelical Church is Stephen Packham to whom all requests for information should be referred to.
                  </p>
                  <p className="text-charcoal/80">
                    You can contact the Information Commissioners Office on 0303 123 1113 or via email <a href="https://ico.org.uk/global/contact-us/email/" className="text-steel-blue hover:text-cyber-teal smooth-transition">https://ico.org.uk/global/contact-us/email/</a> or at the Information Commissioner's Office, Wycliffe House, Water Lane, Wilmslow, Cheshire. SK9 5A
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}