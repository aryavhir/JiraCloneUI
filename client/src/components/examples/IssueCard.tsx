import IssueCard from '../IssueCard';
import { mockIssues } from '@/data/mockData';

export default function IssueCardExample() {
  const sampleIssue = mockIssues[0]; // Story with assignee
  const bugIssue = mockIssues[2]; // Bug with highest priority
  const unassignedIssue = mockIssues[4]; // Unassigned issue

  return (
    <div className="w-80 space-y-4 p-4">
      <IssueCard issue={sampleIssue} />
      <IssueCard issue={bugIssue} />
      <IssueCard issue={unassignedIssue} />
    </div>
  );
}