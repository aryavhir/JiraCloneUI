import { createContext, useContext, useState, ReactNode } from 'react';
import { MessageSquare, GitPullRequest, CheckCircle, AlertCircle } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'comment' | 'pr' | 'issue' | 'complete' | 'assigned' | 'mention';
  title: string;
  message: string;
  time: string;
  read: boolean;
  issueKey?: string;
  icon: any;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'complete',
    title: 'Active Job Search',
    message: 'Actively interviewing for new job opportunities to advance my career as fullstack developer/React developer',
    time: '24 hours ago',
    read: false,
    issueKey: '',
    icon: CheckCircle,
  },
  {
    id: '2',
    type: 'complete',
    title: 'Google Cybersecurity Certificate Completed!',
    message: 'Successfully completed the Google Cybersecurity Professional Certificate and received Credly badge',
    time: '5 days ago',
    read: false,
    issueKey: 'CYBER-1',
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
    title: 'Portfolio Website Updated',
    message: 'New design showcasing cybersecurity and development projects is now live at aryavhir.in',
    time: '20 days ago',
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
    id: '5',
    type: 'complete',
    title: 'Blockchain Voting App Published',
    message: 'Your Solidity smart contract voting system is now deployed on Sepolia ETH testnet',
    time: '2 days ago',
    read: true,
    issueKey: 'VOTE-1',
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

interface NotificationContextType {
  notifications: Notification[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

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

  return (
    <NotificationContext.Provider value={{ notifications, markAsRead, markAllAsRead, deleteNotification, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

