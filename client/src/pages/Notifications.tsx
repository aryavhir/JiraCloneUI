import JiraHeader from '@/components/JiraHeader';
import JiraSidebar from '@/components/JiraSidebar';
import { MessageSquare, GitPullRequest, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { useNotifications } from '@/contexts/NotificationContext';

export default function Notifications() {
  const { notifications, markAsRead, markAllAsRead, deleteNotification, unreadCount } = useNotifications();
  const [activeTab, setActiveTab] = useState('all');

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
