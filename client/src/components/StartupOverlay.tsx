import { useState, useEffect } from 'react';
import Stepper, { Step } from './stepper/stepper';
import { CheckCircle, Users, BarChart3, GitBranch, Settings, Zap } from 'lucide-react';

interface StartupOverlayProps {
  onComplete?: () => void;
}

export default function StartupOverlay({ onComplete }: StartupOverlayProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    // Check if user has seen the startup overlay before
    const hasSeenStartup = localStorage.getItem('jira-startup-seen');
    if (!hasSeenStartup) {
      setIsVisible(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('jira-startup-seen', 'true');
    setIsVisible(false);
    onComplete?.();
  };


  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-2xl">
        <Stepper
          initialStep={1}
          onStepChange={setCurrentStep}
          onFinalStepCompleted={handleComplete}
          backButtonText="Previous"
          nextButtonText="Next"
          stepCircleContainerClassName="bg-white rounded-xl"
          contentClassName="text-center"
        >
          <Step>
            <div className="py-4 sm:py-8">
              <div className="flex justify-center mb-4 sm:mb-6">
                <img 
                  src="/assets/jira-logo.jpg" 
                  alt="Jira" 
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover"
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Welcome to My Jira Clone!
              </h2>
              <p className="text-gray-600 text-sm sm:text-lg px-2">
                A tool to track my carrer progress and Personal projects. 
                Let's take a quick tour of the key features.
              </p>
            </div>
          </Step>

          <Step>
            <div className="py-4 sm:py-8">
              <div className="flex justify-center mb-4 sm:mb-6">
                <BarChart3 className="h-12 w-12 sm:h-16 sm:w-16 text-blue-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Kanban Board
              </h2>
              <p className="text-gray-600 text-sm sm:text-lg mb-3 sm:mb-4 px-2">
                Organized my experience and projects as tasks in a drag-and-drop kanban board. 
                Issues move between columns as they progress through workflow.
              </p>
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-gray-700 mx-2">
                💡 <strong>Pro tip:</strong> Click and hold any issue card to drag it between columns!
              </div>
            </div>
          </Step>

        
          <Step>
            <div className="py-4 sm:py-8">
              <div className="flex justify-center mb-4 sm:mb-6">
                <GitBranch className="h-12 w-12 sm:h-16 sm:w-16 text-purple-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Code Integration
              </h2>
              <p className="text-gray-600 text-sm sm:text-lg mb-3 sm:mb-4 px-2">
                Connected GitHub repositories and  pull requests associated with thier corresponding projects. 
              </p>
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-gray-700 mx-2">
                💡 <strong>Pro tip:</strong> Check out the Project tab to see more  projects !
              </div>
            </div>
          </Step>

          <Step>
            <div className="py-4 sm:py-8">
              <div className="flex justify-center mb-4 sm:mb-6">
                <Settings className="h-12 w-12 sm:h-16 sm:w-16 text-orange-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Customizable Workflow
              </h2>
              <p className="text-gray-600 text-sm sm:text-lg mb-3 sm:mb-4 px-2">
                Customize my project workflow, add custom columns, create labels, 
                and manage team members .
              </p>
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-gray-700 mx-2">
                💡 <strong>Pro tip:</strong> Visit Project Settings to customize my workflow!
              </div>
            </div>
          </Step>

          <Step>
            <div className="py-4 sm:py-8">
              <div className="flex justify-center mb-4 sm:mb-6">
                <Zap className="h-12 w-12 sm:h-16 sm:w-16 text-yellow-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                You're All Set!
              </h2>
              <p className="text-gray-600 text-sm sm:text-lg mb-4 sm:mb-6 px-2">
                You're ready to start exploring the iteration 1.0 of my jira clone. 
               Drop any feedback or suggestions you have.
              </p>
              <div className="bg-blue-50 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-blue-800 mx-2">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 inline mr-2" />
                <strong>Ready to go!</strong> Click Complete to start using Jira Clone.
              </div>
            </div>
          </Step>
        </Stepper>
      </div>
    </div>
  );
}
