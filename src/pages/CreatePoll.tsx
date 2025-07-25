import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useCreatePoll } from '@/components/poll/create/useCreatePoll';
import { StepNavigation } from '@/components/poll/create/StepNavigation';
import { QuestionSetupStep } from '@/components/poll/create/QuestionSetupStep';
import { AudienceStep } from '@/components/poll/create/AudienceStep';
import { DistributionStep } from '@/components/poll/create/DistributionStep';
import { PreviewStep } from '@/components/poll/create/PreviewStep';

export default function CreatePoll() {
  const navigate = useNavigate();
  const {
    currentStep,
    questions,
    audience,
    channels,
    isMultipleQuestions,
    isCustomizingRecommendations,
    setAudience,
    setChannels,
    addQuestion,
    updateQuestion,
    addOption,
    removeOption,
    updateOption,
    removeQuestion,
    nextStep,
    prevStep
  } = useCreatePoll();

  const handleLaunch = () => {
    navigate('/polls');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <QuestionSetupStep
            questions={questions}
            onAddQuestion={addQuestion}
            onUpdateQuestion={updateQuestion}
            onRemoveQuestion={removeQuestion}
            onAddOption={addOption}
            onRemoveOption={removeOption}
            onUpdateOption={updateOption}
          />
        );
      case 2:
        return (
          <AudienceStep
            audience={audience}
            onAudienceChange={setAudience}
          />
        );
      case 3:
        return (
          <DistributionStep
            channels={channels}
            onChannelsChange={setChannels}
          />
        );
      case 4:
        return (
          <PreviewStep
            questions={questions}
            audience={audience}
            channels={channels}
            isMultipleQuestions={isMultipleQuestions}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header - Mobile-First Layout */}
      <div className="space-y-3">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(isCustomizingRecommendations ? `/polls/ai-recommendations?question=${encodeURIComponent(questions[0]?.text || '')}` : '/polls')}
          className="gap-2 self-start"
        >
          <ArrowLeft className="h-4 w-4" />
          {isCustomizingRecommendations ? 'Back to Recommendations' : 'Back to Polls'}
        </Button>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">
            {isCustomizingRecommendations ? 'Customize' : 'Create'} {isMultipleQuestions ? 'Survey' : 'Poll'}
          </h1>
          <p className="text-muted-foreground">
            Edit content, change audience, and add details.
          </p>
        </div>
      </div>


      {/* Mobile-First Step Content */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          {renderStepContent()}
        </CardContent>
      </Card>

      <StepNavigation
        currentStep={currentStep}
        onNext={nextStep}
        onPrev={prevStep}
        onLaunch={handleLaunch}
        isMultipleQuestions={isMultipleQuestions}
      />
    </div>
  );
}