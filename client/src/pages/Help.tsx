import JiraHeader from '@/components/JiraHeader';
import JiraSidebar from '@/components/JiraSidebar';
import { HelpCircle, Book, Video, MessageCircle, FileText, ExternalLink, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { resetStartupOverlay } from '@/utils/startup';

const helpTopics = [
  {
    id: '1',
    category: 'About Aryavhir Koul',
    icon: Book,
    articles: [
      { title: 'Professional Background', description: 'Learn about Aryavhir\'s experience as a Software Development Engineer at Hydro Online' },
      { title: 'Cybersecurity Expertise', description: 'Google Cybersecurity Certificate and TryHackMe training achievements' },
      { title: 'Technical Skills', description: 'Full-stack development, blockchain, and security technologies' },
      { title: 'Personal Projects', description: 'Portfolio of 15+ deployed websites and open-source contributions' },
    ],
  },
  {
    id: '2',
    category: 'Current Work at Hydro Online',
    icon: FileText,
    articles: [
      { title: 'AdTech Platform Development', description: 'OpenRTB compliant JavaScript ad banners with real-time tracking' },
      { title: 'Campaign Management Portal', description: 'React.js, Go, and TypeScript based advertiser dashboard' },
      { title: 'Publisher Rewards System', description: 'Automated compensation calculation and payment processing' },
      { title: 'Crypto Payment Integration', description: 'MetaMask, MoonPay, and PayPal payment solutions' },
    ],
  },
  {
    id: '3',
    category: 'Cybersecurity Projects',
    icon: MessageCircle,
    articles: [
      { title: 'Security Audits & Assessments', description: 'Vulnerability scanning and compliance verification projects' },
      { title: 'Incident Response Training', description: 'Simulated data breach scenarios and recovery procedures' },
      { title: 'Blockchain Security', description: 'Smart contract audits and DeFi protocol assessments' },
      { title: 'Security Tool Development', description: 'Open-source tools for automated vulnerability scanning' },
    ],
  },
];

const popularResources = [
  {
    title: 'Portfolio Website',
    description: 'Visit aryavhir.in to see all projects and achievements',
    icon: ExternalLink,
    link: 'https://aryavhir.in'
  },
  {
    title: 'GitHub Profile',
    description: 'Explore open-source contributions and project repositories',
    icon: ExternalLink,
    link: 'https://github.com/aryavhir'
  },
  {
    title: 'LinkedIn Profile',
    description: 'Connect professionally and view career updates',
    icon: ExternalLink,
    link: 'https://www.linkedin.com/in/aryavhir-koul-04a08k/'
  },
  {
    title: 'Cybersecurity Certificates',
    description: 'View Google Cybersecurity Certificate and other achievements',
    icon: ExternalLink,
    link: 'https://github.com/aryavhir/Google-Cybersecurity-Professional-Certificate-coursera-'
  },
];

export default function Help() {
  return (
    <div className="h-screen bg-jira-gray-50 flex flex-col overflow-hidden">
      <JiraHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <JiraSidebar />
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-6">
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-jira-blue-light rounded-full">
                  <HelpCircle className="h-8 w-8 text-jira-blue" />
                </div>
                <h1 className="text-3xl font-semibold text-jira-gray-900" data-testid="text-help-title">
                  About Aryavhir Koul
                </h1>
              </div>
              <p className="text-lg text-jira-gray-600 max-w-2xl mx-auto">
                Learn about Aryavhir's professional journey, technical expertise, and current projects in cybersecurity and full-stack development.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-jira-gray-900 mb-4">Popular Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {popularResources.map((resource) => {
                  const IconComponent = resource.icon;
                  return (
                    <Card key={resource.title} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-jira-blue-light rounded-lg">
                            <IconComponent className="h-5 w-5 text-jira-blue" />
                          </div>
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                        </div>
                        <CardDescription>{resource.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button 
                          variant="ghost" 
                          className="p-0 h-auto text-jira-blue"
                          onClick={() => window.open(resource.link, '_blank', 'noopener,noreferrer')}
                        >
                          Explore <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-jira-gray-900 mb-4">Browse by Topic</h2>
              <div className="space-y-6">
                {helpTopics.map((topic) => {
                  const IconComponent = topic.icon;
                  return (
                    <Card key={topic.id}>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-6 w-6 text-jira-blue" />
                          <CardTitle>{topic.category}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {topic.articles.map((article) => (
                            <div
                              key={article.title}
                              className="p-4 border border-jira-gray-200 rounded-lg hover:border-jira-blue hover:bg-jira-blue-light/20 cursor-pointer transition-colors"
                              data-testid={`article-${article.title.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                              <h4 className="font-medium text-jira-gray-900 mb-1">
                                {article.title}
                              </h4>
                              <p className="text-sm text-jira-gray-600">
                                {article.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            <Card className="mt-8 bg-jira-blue-light border-jira-blue">
              <CardHeader>
                <CardTitle>Still need help?</CardTitle>
                <CardDescription>
                  Our support team is here to assist you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Button data-testid="button-contact-support">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                  <Button variant="outline" data-testid="button-community">
                    Join Community
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Developer Section */}
            <Card className="mt-8 border-orange-200 bg-orange-50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Settings className="h-6 w-6 text-orange-600" />
                  <CardTitle className="text-orange-800">Developer Tools</CardTitle>
                </div>
                <CardDescription className="text-orange-700">
                  Tools for developers and testing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-orange-800 mb-2">Startup Overlay</h4>
                    <p className="text-sm text-orange-700 mb-3">
                      Reset the startup overlay to see it again. This is useful for testing or if you want to see the welcome tour again.
                    </p>
                    <Button 
                      onClick={resetStartupOverlay}
                      variant="outline"
                      className="border-orange-300 text-orange-700 hover:bg-orange-100"
                    >
                      Reset Startup Overlay
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
