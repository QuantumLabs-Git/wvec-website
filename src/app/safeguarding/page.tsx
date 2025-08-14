'use client'

import { motion } from 'framer-motion'
import { Shield, Heart, Users, Phone, Mail, AlertCircle } from 'lucide-react'

export default function SafeguardingPage() {
  const safeguardingTeam = [
    {
      role: 'Designated Person for Safeguarding (DPS)',
      name: 'KIRSTY HART',
      description: 'She will advise the church on any matters related to the safeguarding of children and adults at risk and take the appropriate action when abuse is disclosed, discovered or suspected.',
      icon: Shield,
    },
    {
      role: 'Deputy Designated Person for Safeguarding (DDPS)',
      name: 'SARAH BRYANT',
      description: 'She will assist the Designated Person for Safeguarding (DPS) in helping the church on any matters related to the safeguarding of children and adults at risk and take the appropriate action when abuse is disclosed, discovered or suspected.',
      icon: Users,
    },
    {
      role: 'Safeguarding Trustee',
      name: 'PASTOR DAVID KAY',
      description: 'He will raise the profile of safeguarding within the church and oversee and monitor the implementation of the safeguarding policy and procedures on behalf of the church trustees.',
      contact: {
        phone: '07504 925 423',
        email: 'davidwvec@gmail.com'
      },
      icon: Heart,
    },
  ]

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
              Safeguarding
            </h1>
            <p className="text-charcoal/70 text-lg">
              Our commitment to protecting and nurturing all in our care
            </p>
          </motion.div>
        </div>
      </section>

      {/* Policy Statement */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-3xl p-8 md:p-12"
          >
            <h2 className="text-2xl font-semibold text-charcoal mb-6 text-center">
              Safeguarding Policy Statement for Whiddon Valley Evangelical Church<br />
              <span className="text-lg font-normal text-charcoal/70">February 2025</span>
            </h2>

            {/* Our Covenant */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-charcoal mb-4">Our Covenant</h3>
              <div className="bg-sage/10 rounded-xl p-6">
                <p className="text-charcoal/80 italic leading-relaxed">
                  The Whiddon Valley Evangelical Church covenant is:
                </p>
                <p className="text-charcoal/80 mt-4 leading-relaxed">
                  In the name of our Lord Jesus Christ, and in obedience to His revealed will, we covenant together to give ourselves solemnly and prayerfully to the Lord and to each other, relying entirely upon the grace of God, the precious blood and righteousness of our Lord and Saviour Jesus Christ, the gracious assistance of the Holy Spirit and the infallible Word of God. We resolve to walk together in the holiness of life, taking the Holy Scriptures as our sole rule in faith, worship, and practice, promising to uphold the doctrine and to obey the laws of God's house, binding ourselves to love one another and to seek each other's good, always striving for peace. We determine to hold fast to the faithful Word, to declare all the counsel of God, and to stand fast in the Faith. We fervently pray that God will grant us his blessing as we unite as a Christian church under our great head, the Lord Jesus Christ.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="mb-8">
              <p className="text-charcoal/80 mb-4">In fulfilling this vision, we:</p>
              <ul className="list-disc pl-6 text-charcoal/80 space-y-2">
                <li>Welcome children and adults at risk into the life of our community</li>
                <li>Run activities for children and adults at risk</li>
              </ul>
            </div>

            {/* Safeguarding Sections */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-charcoal mb-2">Our safeguarding responsibilities</h3>
                <p className="text-charcoal/80">
                  The church recognises its responsibilities in safeguarding all children, young people and adults at risk, regardless of gender, ethnicity or ability.
                </p>
                <p className="text-charcoal/80 mt-2">
                  As members of this church we commit ourselves to the nurturing, protection and safekeeping of all associated with the church and will pray for them regularly. In pursuit of this, we commit ourselves to this policy and to the development of sound procedures to ensure we implement our policy well.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-charcoal mb-2">Prevention and reporting of abuse</h3>
                <p className="text-charcoal/80">
                  It is the duty of each church member to help prevent the abuse of children and adults at risk, and the duty of each church member to respond to concerns about the well-being of children and adults at risk. Any abuse disclosed, discovered or suspected will be reported in accordance with our procedures. The church will fully co-operate with any statutory investigation into any suspected abuse linked with the church.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-charcoal mb-2">Safer recruitment, support and supervision of workers</h3>
                <p className="text-charcoal/80">
                  The church will exercise proper care in the selection and appointment of those working with children and adults at risk, whether paid or voluntary. All workers will be provided with appropriate training, support and supervision to promote the safekeeping of children and adults at risk.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-charcoal mb-2">Respecting children and adults at risk</h3>
                <p className="text-charcoal/80">
                  The church will adopt a code of behaviour for all who are appointed to work with children and adults at risk so that all children and adults are shown the respect that is due to them.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-charcoal mb-2">Safer working practices</h3>
                <p className="text-charcoal/80">
                  The church is committed to providing an environment that is as safe as possible for children and adults at risk and will adopt ways of working with them that promote their safety and well-being.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-charcoal mb-2">A safer community</h3>
                <p className="text-charcoal/80">
                  The church is committed to the prevention of bullying. The church will seek to ensure that the behaviour of any individuals who may pose a risk to children, young people and adults at risk in the community of the church is managed appropriately.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Safeguarding Team */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-charcoal text-center mb-2">
              Safeguarding Contact Points
            </h2>
            <p className="text-charcoal/70 text-center">
              The church has appointed the following individuals to form part of the church safeguarding team:
            </p>
          </motion.div>

          <div className="space-y-6">
            {safeguardingTeam.map((member, index) => {
              const Icon = member.icon
              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-effect rounded-2xl p-6"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-steel-blue/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-steel-blue" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-charcoal text-lg">{member.name}</h3>
                      <p className="text-steel-blue font-medium mb-2">{member.role}</p>
                      <p className="text-charcoal/70 text-sm mb-3">{member.description}</p>
                      {member.contact && (
                        <div className="space-y-1">
                          {member.contact.phone && (
                            <div className="flex items-center space-x-2 text-sm">
                              <Phone className="w-4 h-4 text-charcoal/50" />
                              <a href={`tel:${member.contact.phone.replace(/\s/g, '')}`} className="text-steel-blue hover:text-cyber-teal smooth-transition">
                                {member.contact.phone}
                              </a>
                            </div>
                          )}
                          {member.contact.email && (
                            <div className="flex items-center space-x-2 text-sm">
                              <Mail className="w-4 h-4 text-charcoal/50" />
                              <a href={`mailto:${member.contact.email}`} className="text-steel-blue hover:text-cyber-teal smooth-transition">
                                {member.contact.email}
                              </a>
                            </div>
                          )}
                          <p className="text-xs text-charcoal/60 mt-1">Other contact details on request</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 p-6 bg-steel-blue/10 rounded-xl"
          >
            <p className="text-charcoal/80 text-sm leading-relaxed">
              Our church pastor is also an important part of the Church Safeguarding Team. Where possible, the Church Safeguarding Team will work together if and when issues arise. However, each person has a responsibility to report allegations of abuse as soon as they are raised.
            </p>
            <p className="text-charcoal/60 text-xs mt-3">
              (Further definitions of these roles can be found in Appendix 4 – Safeguarding Roles and Responsibilities. A full copy of the policy is available on request)
            </p>
          </motion.div>
        </div>
      </section>

      {/* Policy Implementation */}
      <section className="py-12 bg-gradient-to-b from-white to-sage/10">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl p-8"
          >
            <h3 className="text-xl font-semibold text-charcoal mb-4 flex items-center space-x-2">
              <AlertCircle className="w-6 h-6 text-steel-blue" />
              <span>Putting our policy into practice</span>
            </h3>
            <ul className="space-y-3 text-charcoal/80">
              <li className="flex items-start space-x-2">
                <span className="text-steel-blue mt-1">•</span>
                <span>A copy of the safeguarding policy statement will be displayed permanently on the church notice board and church office and is available on our church website.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-steel-blue mt-1">•</span>
                <span>Each worker with children and/or adults at risk will be given a full copy of the safeguarding policy and procedures and will be asked to sign to confirm that they will follow them.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-steel-blue mt-1">•</span>
                <span>A full copy of the policy and procedures will be made available on request to any member of, or other person associated with the church.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-steel-blue mt-1">•</span>
                <span>The policy and procedures will be monitored and reviewed annually, and any necessary revisions adopted into the policy and implemented through our procedures.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-steel-blue mt-1">•</span>
                <span>At the church AGM, it will be stated that there is a policy and that it is available for all members to review on request. The outcome of the annual safeguarding review will also be reported on.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  )
}