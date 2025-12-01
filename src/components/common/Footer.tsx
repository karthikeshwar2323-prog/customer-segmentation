import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border/40">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              About Apex Insights
            </h3>
            <p className="text-muted-foreground">
              AI-powered customer segmentation platform helping e-commerce businesses understand and engage their customers through psychological profiling and behavioral analysis.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Features
            </h3>
            <div className="text-muted-foreground space-y-2">
              <p>AI-Powered Segmentation</p>
              <p>Dynamic Pricing</p>
              <p>Personalized Offers</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Platform
            </h3>
            <div className="text-muted-foreground space-y-2">
              <p>Multi-Platform Integration</p>
              <p>Real-time Analytics</p>
              <p>Actionable Insights</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 text-center text-muted-foreground">
          <p>2025 Apex Insights</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
