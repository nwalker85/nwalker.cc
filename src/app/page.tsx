import { Hero } from '@/components/sections/Hero'
import { JudgmentGap } from '@/components/sections/JudgmentGap'
import { WhatAIDidNotCollapse } from '@/components/sections/WhatAIDidNotCollapse'
import { EnterpriseProof } from '@/components/sections/EnterpriseProof'
import { PlatformThinking } from '@/components/sections/PlatformThinking'
import { AccountableAI } from '@/components/sections/AccountableAI'
import { ContactSection } from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <main>
      <Hero />
      <JudgmentGap />
      <WhatAIDidNotCollapse />
      <EnterpriseProof />
      <PlatformThinking />
      <AccountableAI />
      <ContactSection />
    </main>
  )
}
