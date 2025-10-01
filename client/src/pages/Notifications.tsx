import JiraHeader from '@/components/JiraHeader';
import JiraSidebar from '@/components/JiraSidebar';
import { MessageSquare, GitPullRequest, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockUsers } from '@/data/mockData';
import { useState } from 'react';

interface Notification {
  id: string;
  type: 'comment' | 'pr' | 'issue' | 'complete' | 'assigned' | 'mention';
  title: string;
  message: string;
  time: string;
  read: boolean;
  issueKey?: string;
  icon: any;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'complete',
    title: 'Google Cybersecurity Certificate Completed!',
    message: 'Successfully completed the Google Cybersecurity Professional Certificate and received Credly badge',
    time: '2 hours ago',
    read: false,
    issueKey: 'CYBER-1',
    icon: CheckCircle,
  },
  {
    id: '2',
    type: 'complete',
    title: 'OpenRTB Ad Banner Deployed',
    message: 'Your JavaScript ad banner with impression tracking is now live on Hydro Online platform',
    time: '5 hours ago',
    read: false,
    issueKey: 'HYDRO-1',
    icon: CheckCircle,
  },
  {
    id: '3',
    type: 'issue',
    title: 'Security Audit Completed',
    message: 'Vulnerability assessment for Hydro Online platform completed. 3 medium-risk issues identified and resolved',
    time: '1 day ago',
    read: true,
    issueKey: 'HYDRO-5',
    icon: AlertCircle,
  },
  {
    id: '4',
    type: 'complete',
    title: 'Blockchain Voting App Published',
    message: 'Your Solidity smart contract voting system is now deployed on Sepolia ETH testnet',
    time: '2 days ago',
    read: true,
    issueKey: 'VOTE-1',
    icon: CheckCircle,
  },
  {
    id: '5',
    type: 'complete',
    title: 'Portfolio Website Updated',
    message: 'New design showcasing cybersecurity and development projects is now live at aryavhir.in',
    time: '3 days ago',
    read: true,
    issueKey: 'PORT-1',
    icon: CheckCircle,
  },
  {
    id: '6',
    type: 'complete',
    title: 'TryHackMe Path Completed',
    message: 'Successfully completed Cybersecurity 101 path with 100% completion rate',
    time: '1 week ago',
    read: true,
    issueKey: 'CYBER-2',
    icon: CheckCircle,
  },
  {
    id: '7',
    type: 'issue',
    title: 'Advertisers Portal Beta Released',
    message: 'Campaign management portal is now in beta testing with select advertisers',
    time: '1 week ago',
    read: true,
    issueKey: 'HYDRO-2',
    icon: AlertCircle,
  },
  {
    id: '8',
    type: 'complete',
    title: '15+ Websites Deployed',
    message: 'Milestone reached: Successfully deployed 15+ production-ready websites on Vercel',
    time: '2 weeks ago',
    read: true,
    issueKey: 'PORT-2',
    icon: CheckCircle,
  },
  {
    id: '9',
    type: 'complete',
    title: 'Publisher Rewards System Live',
    message: 'Automated compensation system for publishers is now processing payments',
    time: '2 weeks ago',
    read: true,
    issueKey: 'HYDRO-3',
    icon: CheckCircle,
  },
  {
    id: '10',
    type: 'issue',
    title: 'MetaMask Integration Testing',
    message: 'Web3 integration for crypto purchases is in final testing phase',
    time: '3 weeks ago',
    read: true,
    issueKey: 'HYDRO-4',
    icon: AlertCircle,
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState('all');

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = activeTab === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  return (
    <div className="h-screen bg-jira-gray-50 flex flex-col overflow-hidden">
      <JiraHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <JiraSidebar />
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h1 className="text-2xl font-semibold text-jira-gray-900" data-testid="text-notifications-title">
                    Notifications
                  </h1>
                  <p className="text-sm text-jira-gray-500 mt-1">Stay updated with Aryavhir's latest achievements, project milestones, and career progress</p>
                </div>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-jira-blue hover:text-jira-blue-dark"
                    data-testid="button-mark-all-read"
                  >
                    Mark all as read
                  </Button>
                )}
              </div>
              <p className="text-sm text-jira-gray-600">
                Stay updated with your team's activity and important project updates
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4" data-testid="tabs-notifications">
                <TabsTrigger value="all" data-testid="tab-all">
                  All {notifications.length > 0 && `(${notifications.length})`}
                </TabsTrigger>
                <TabsTrigger value="unread" data-testid="tab-unread">
                  Unread {unreadCount > 0 && `(${unreadCount})`}
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-2">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-12 w-12 text-jira-gray-400 mx-auto mb-4" />
                    <p className="text-jira-gray-600" data-testid="text-no-notifications">
                      {activeTab === 'unread' ? 'No unread notifications' : 'No notifications yet'}
                    </p>
                  </div>
                ) : (
                  filteredNotifications.map(notification => {
                    const IconComponent = notification.icon;
                    return (
                      <div
                        key={notification.id}
                        className={`bg-white border border-jira-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow ${
                          !notification.read ? 'bg-blue-50 border-blue-200' : ''
                        }`}
                        data-testid={`notification-${notification.id}`}
                      >
                        <div className="flex gap-4">
                          <IconComponent className="h-5 w-5 text-jira-gray-500 flex-shrink-0 mt-1" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <p className="text-sm font-medium text-jira-gray-900">
                                {notification.title}
                              </p>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                {!notification.read && (
                                  <div className="h-2 w-2 bg-blue-500 rounded-full" />
                                )}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => deleteNotification(notification.id)}
                                  data-testid={`button-delete-${notification.id}`}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm text-jira-gray-600 mb-2 line-clamp-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-jira-gray-500">
                              <span>{notification.time}</span>
                              {notification.issueKey && (
                                <Badge variant="secondary" className="text-xs">
                                  {notification.issueKey}
                                </Badge>
                              )}
                              {!notification.read && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-jira-blue hover:text-jira-blue-dark"
                                  data-testid={`button-mark-read-${notification.id}`}
                                >
                                  Mark as read
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
