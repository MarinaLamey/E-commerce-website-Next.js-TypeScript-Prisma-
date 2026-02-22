import { benefitsSection } from "@/utils/constants";
import "./benefitssection.css";

const BenefitsSection = () => {
  return (
    <div className='relative mx-auto conStyle mt-9 py-6 shadow-lg overflow-hidden'>
      <div className="flex items-center benifitAnimation">
        
        <div className="flex items-center justify-around min-w-full gap-8 px-4">
          {benefitsSection.map((bene, beneIndex) => {
            const Icon = bene.icon;
            return (
              <div key={beneIndex} className='flex flex-col items-center gap-4 min-w-[250px]'>
                <div className='rounded-full p-5 bg-neutral-200'>
                  <Icon size={40} color='#771011'/>
                </div>
                <p className='text-xl md:text-2xl font-normal whitespace-nowrap'>{bene.title}</p>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-around min-w-full gap-8 px-4" aria-hidden="true">
          {benefitsSection.map((bene, beneIndex) => {
            const Icon = bene.icon;
            return (
              <div key={`clone-${beneIndex}`} className='flex flex-col items-center gap-4 min-w-[250px]'>
                <div className='rounded-full p-5 bg-neutral-200'>
                  <Icon size={40} color='#771011'/>
                </div>
                <p className='text-xl md:text-2xl font-normal whitespace-nowrap'>{bene.title}</p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default BenefitsSection;