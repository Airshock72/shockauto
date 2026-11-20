import { FilePlus2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Card from 'src/core/components/cards/Card.tsx'
import Divider from 'src/core/components/dividers/Divider.tsx'
import { cn } from 'src/core/lib/utils'
import { dockedCardClassName, stepOptions } from 'src/modules/applications/helpers'
import useCreateOrEditApplication from 'src/modules/applications/hooks/useCreateOrEditApplication.ts'
import useDockedCards from 'src/modules/applications/hooks/useDockedCards.ts'
import ApplicationStepper from 'src/modules/applications/views/ApplicationStepper.tsx'
import ApplicationPreviewCard from 'src/modules/applications/views/ApplicationPreviewCard.tsx'
import CategoryTabs from 'src/modules/applications/views/CategoryTabs.tsx'
import ExpandableSection from 'src/modules/applications/views/ExpandableSection.tsx'
import CharacteristicsFields from 'src/modules/applications/views/CharacteristicsFields.tsx'
import { ApplicationStep } from 'src/modules/applications/types'

const CreateOrEditApplication = () => {
  const { t } = useTranslation()
  const {
    category,
    activeStep,
    expandedSteps,
    preview,
    showroom,
    values,
    stepProgress,
    manufacturers,
    models,
    gasolineTypes,
    carCategories,
    changeCategory,
    selectStep,
    toggleStep,
    handleValueChange
  } = useCreateOrEditApplication()
  const { containerRef, asideRef, isDocked } = useDockedCards()

  return (
    <main className='container flex-1 py-8 md:py-12'>
      <div ref={containerRef} className='mx-auto flex w-full max-w-8xl flex-col gap-6'>
        <aside
          ref={asideRef}
          className={cn('grid grid-cols-1 gap-6 lg:grid-cols-2', !isDocked && 'z-10 lg:sticky lg:top-[calc(var(--spacing-header)+1.5rem)]')}
        >
          <div data-dock-card className={cn(isDocked && dockedCardClassName, isDocked && 'left-4')}>
            <Card className={cn('flex h-full animate-fade-up p-5 sm:p-6', isDocked ? 'items-start' : 'items-center')}>
              <ApplicationStepper
                activeStep={activeStep}
                stepProgress={stepProgress}
                onSelect={selectStep}
                isVertical={isDocked}
              />
            </Card>
          </div>

          <div data-dock-card className={cn(isDocked && dockedCardClassName, isDocked && 'right-4')}>
            <ApplicationPreviewCard category={category} preview={preview} showroom={showroom} isVertical={isDocked} />
          </div>
        </aside>

        <Card className='neon-edge relative animate-fade-up' style={{ animationDelay: '100ms' }}>
          <header className='mb-6 flex items-center gap-4'>
            <span className='flex size-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary to-neon text-primary-foreground shadow-[0_0_14px_-3px_var(--neon)]'>
              <FilePlus2 aria-hidden='true' />
            </span>
            <div className='space-y-1'>
              <h1 className='text-display-sm font-bold'>{t('applications.title')}</h1>
              <p className='text-sm text-muted-foreground'>{t('applications.subtitle')}</p>
            </div>
          </header>

          <CategoryTabs value={category} onChange={changeCategory} />

          <Divider className='my-6' />

          <div key={category} role='tabpanel' className='flex flex-col gap-4'>
            {stepOptions.map((step, index) => (
              <ExpandableSection
                key={step.value}
                index={index}
                step={step}
                progress={stepProgress[step.value]}
                isActive={step.value === activeStep}
                isExpanded={expandedSteps.includes(step.value)}
                onToggle={toggleStep}
              >
                {step.value === ApplicationStep.Characteristics && (
                  <CharacteristicsFields
                    values={values}
                    manufacturers={manufacturers}
                    models={models}
                    gasolineTypes={gasolineTypes}
                    carCategories={carCategories}
                    onValueChange={handleValueChange}
                  />
                )}
              </ExpandableSection>
            ))}
          </div>
        </Card>
      </div>
    </main>
  )
}

export default CreateOrEditApplication
