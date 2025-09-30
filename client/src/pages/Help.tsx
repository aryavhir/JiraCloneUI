import JiraHeader from '@/components/JiraHeader';
import JiraSidebar from '@/components/JiraSidebar';
import { HelpCircle, Book, Video, MessageCircle, FileText, ExternalLink, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

const helpTopics = [
  {
    id: '1',
    category: 'Getting Started',
    icon: Book,
    articles: [
      { title: 'Quick Start Guide', description: 'Get up and running with Jira in minutes' },
      { title: 'Creating Your First Project', description: 'Learn how to set up a new project' },
      { title: 'Inviting Team Members', description: 'Add collaborators to your project' },
      { title: 'Understanding Issue Types', description: 'Stories, bugs, tasks, and epics explained' },
    ],
  },
  {
    id: '2',
    category: 'Issues & Workflows',
    icon: FileText,
    articles: [
      { title: 'Creating and Managing Issues', description: 'Work with issues effectively' },
      { title: 'Workflow Customization', description: 'Tailor workflows to your process' },
      { title: 'Using Issue Filters', description: 'Find and organize issues quickly' },
      { title: 'Agile Board Setup', description: 'Configure your Kanban or Scrum board' },
    ],
  },
  {
    id: '3',
    category: 'Collaboration',
    icon: MessageCircle,
    articles: [
      { title: 'Comments and Mentions', description: 'Communicate with your team' },
      { title: 'Notifications Settings', description: 'Stay informed without overwhelm' },
      { title: 'Sharing and Permissions', description: 'Control who sees what' },
      { title: 'Integration with Other Tools', description: 'Connect Jira to your workflow' },
    ],
  },
];

const popularResources = [
  {
    title: 'Video Tutorials',
    description: 'Watch step-by-step guides for common tasks',
    icon: Video,
    link: '#',
  },
  {
    title: 'Community Forum',
    description: 'Get help from other Jira users',
    icon: MessageCircle,
    link: '#',
  },
  {
    title: 'API Documentation',
    description: 'Integrate and extend Jira functionality',
    icon: Book,
    link: '#',
  },
];

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="h-screen bg-jira-gray-50 flex flex-col overflow-hidden">
      <JiraHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <JiraSidebar />
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-6">
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <HelpCircle className="h-8 w-8 text-jira-blue" />
                <h1 className="text-3xl font-semibold text-jira-gray-900" data-testid="text-help-title">
                  Help Center
                </h1>
              </div>
              <p className="text-jira-gray-600 mb-6">
                Find answers, learn best practices, and get the most out of Jira
              </p>

              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-jira-gray-400 h-5 w-5" />
                <Input
                  type="search"
                  placeholder="Search for help articles, guides, and tutorials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-base"
                  data-testid="input-help-search"
                />
              </div>
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
                        <Button variant="ghost" className="p-0 h-auto text-jira-blue">
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
          </div>
        </main>
      </div>
    </div>
  );
}
