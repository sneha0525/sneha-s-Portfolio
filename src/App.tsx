/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WorkShowcase } from './components/WorkShowcase';
import { ApproachSection } from './components/ApproachSection';
import { CredentialsSection } from './components/CredentialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="qd bg-mist text-ink">
      <Navbar />
      <main>
        <HeroSection />
        <WorkShowcase />
        <ApproachSection />
        <CredentialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
