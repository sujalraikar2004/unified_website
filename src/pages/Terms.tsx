import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="glass-button mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold gradient-text font-urbanist mb-4">
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-lg">
            Last updated: January 2025
          </p>
        </div>

        <div className="glass-card p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Acceptance of Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using the Unified Student Community platform, you accept and agree to be 
              bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Use License
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Permission is granted to temporarily access the materials on Unified Student Community's 
              platform for personal, non-commercial transitory viewing only. This is the grant of a license, 
              not a transfer of title.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              User Conduct
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to use the platform in a manner consistent with all applicable laws and regulations. 
              You will not engage in any activity that disrupts or interferes with the platform or servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Content Guidelines
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              All content shared on the platform must be respectful, relevant, and appropriate for an 
              educational community. We reserve the right to remove content that violates these guidelines.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Limitation of Liability
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              In no event shall Unified Student Community or its suppliers be liable for any damages 
              arising out of the use or inability to use the materials on the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Contact Information
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:contact@uni.edu" className="text-primary hover:underline">
                contact@uni.edu
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
