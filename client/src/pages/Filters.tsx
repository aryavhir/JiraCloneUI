import JiraHeader from '@/components/JiraHeader';
import JiraSidebar from '@/components/JiraSidebar';
import { Filter, Plus, Star, Clock, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

interface SavedFilter {
  id: string;
  name: string;
  description: string;
  issueCount: number;
  starred: boolean;
  lastUsed: string;
  owner: string;
}

const mockFilters: SavedFilter[] = [
  {
    id: '1',
    name: 'My open issues',
    description: 'Issues assigned to me that are not done',
    issueCount: 5,
    starred: true,
    lastUsed: '2 hours ago',
    owner: 'You',
  },
  {
    id: '2',
    name: 'Reported by me',
    description: 'All issues I have reported',
    issueCount: 8,
    starred: false,
    lastUsed: '1 day ago',
    owner: 'You',
  },
  {
    id: '3',
    name: 'Recently updated',
    description: 'Issues updated in the last 7 days',
    issueCount: 12,
    starred: true,
    lastUsed: '3 hours ago',
    owner: 'You',
  },
  {
    id: '4',
    name: 'High priority bugs',
    description: 'All bugs with high or highest priority',
    issueCount: 3,
    starred: false,
    lastUsed: '5 days ago',
    owner: 'You',
  },
  {
    id: '5',
    name: 'Sprint backlog',
    description: 'Issues in the current sprint',
    issueCount: 15,
    starred: false,
    lastUsed: '1 week ago',
    owner: 'Sarah Johnson',
  },
];

export default function Filters() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SavedFilter[]>(mockFilters);

  const toggleStar = (id: string) => {
    setFilters(prev =>
      prev.map(filter =>
        filter.id === id ? { ...filter, starred: !filter.starred } : filter
      )
    );
  };

  const filteredFilters = filters.filter(filter =>
    filter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    filter.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const myFilters = filteredFilters.filter(f => f.owner === 'You');
  const starredFilters = filteredFilters.filter(f => f.starred);

  return (
    <div className="h-screen bg-jira-gray-50 flex flex-col overflow-hidden">
      <JiraHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <JiraSidebar />
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Filter className="h-6 w-6 text-jira-blue" />
                  <h1 className="text-2xl font-semibold text-jira-gray-900" data-testid="text-filters-title">
                    Filters
                  </h1>
                </div>
                <Button data-testid="button-create-filter">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Filter
                </Button>
              </div>
              <p className="text-sm text-jira-gray-600 mb-4">
                Save and manage your custom issue filters
              </p>

              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-jira-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search filters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-filters"
                />
              </div>
            </div>

            <Tabs defaultValue="my-filters" className="w-full">
              <TabsList className="mb-6" data-testid="tabs-filters">
                <TabsTrigger value="my-filters" data-testid="tab-my-filters">
                  <User className="h-4 w-4 mr-2" />
                  My Filters
                </TabsTrigger>
                <TabsTrigger value="starred" data-testid="tab-starred">
                  <Star className="h-4 w-4 mr-2" />
                  Starred
                </TabsTrigger>
                <TabsTrigger value="all" data-testid="tab-all">
                  <Filter className="h-4 w-4 mr-2" />
                  All Filters
                </TabsTrigger>
              </TabsList>

              <TabsContent value="my-filters" className="space-y-3">
                {myFilters.length === 0 ? (
                  <div className="text-center py-12">
                    <Filter className="h-12 w-12 text-jira-gray-400 mx-auto mb-4" />
                    <p className="text-jira-gray-600">No filters found</p>
                    <Button className="mt-4" data-testid="button-create-first-filter">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Filter
                    </Button>
                  </div>
                ) : (
                  myFilters.map(filter => (
                    <Card key={filter.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <CardTitle className="text-lg">{filter.name}</CardTitle>
                              <Badge variant="secondary" className="text-xs">
                                {filter.issueCount} issues
                              </Badge>
                            </div>
                            <CardDescription>{filter.description}</CardDescription>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toggleStar(filter.id)}
                            data-testid={`button-star-${filter.id}`}
                          >
                            <Star
                              className={`h-4 w-4 ${
                                filter.starred ? 'fill-yellow-400 text-yellow-400' : ''
                              }`}
                            />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-jira-gray-600">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Last used {filter.lastUsed}
                            </span>
                            <span>Owner: {filter.owner}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" data-testid={`button-view-${filter.id}`}>
                              View Results
                            </Button>
                            <Button variant="ghost" size="sm" data-testid={`button-edit-${filter.id}`}>
                              Edit
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="starred" className="space-y-3">
                {starredFilters.length === 0 ? (
                  <div className="text-center py-12">
                    <Star className="h-12 w-12 text-jira-gray-400 mx-auto mb-4" />
                    <p className="text-jira-gray-600">No starred filters yet</p>
                    <p className="text-sm text-jira-gray-500 mt-2">
                      Star filters to quickly find them here
                    </p>
                  </div>
                ) : (
                  starredFilters.map(filter => (
                    <Card key={filter.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <CardTitle className="text-lg">{filter.name}</CardTitle>
                              <Badge variant="secondary" className="text-xs">
                                {filter.issueCount} issues
                              </Badge>
                            </div>
                            <CardDescription>{filter.description}</CardDescription>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toggleStar(filter.id)}
                          >
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-jira-gray-600">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Last used {filter.lastUsed}
                            </span>
                            <span>Owner: {filter.owner}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Results
                            </Button>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="all" className="space-y-3">
                {filteredFilters.map(filter => (
                  <Card key={filter.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle className="text-lg">{filter.name}</CardTitle>
                            <Badge variant="secondary" className="text-xs">
                              {filter.issueCount} issues
                            </Badge>
                          </div>
                          <CardDescription>{filter.description}</CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => toggleStar(filter.id)}
                        >
                          <Star
                            className={`h-4 w-4 ${
                              filter.starred ? 'fill-yellow-400 text-yellow-400' : ''
                            }`}
                          />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-jira-gray-600">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Last used {filter.lastUsed}
                          </span>
                          <span>Owner: {filter.owner}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Results
                          </Button>
                          {filter.owner === 'You' && (
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
