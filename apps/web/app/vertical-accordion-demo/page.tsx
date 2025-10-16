'use client';

import React from 'react';
import { VerticalAccordion } from '../components/ui/VerticalAccordion';
import { DealData } from '../components/ui/DealCard';
import { DealCard } from '../components/ui/DealCard';

// Sample data
const sampleDeals: DealData[] = [
  {
    id: '1',
    name: 'Enterprise Software Deal',
    company: 'TechCorp Inc.',
    amount: 'INR 2,50,000',
    owner: 'Sarah Johnson',
    closeDate: 'in 2 weeks'
  },
  {
    id: '2',
    name: 'Marketing Automation',
    company: 'GrowthCo',
    amount: 'INR 1,80,000',
    owner: 'Mike Chen',
    closeDate: 'in 1 week'
  }
];

export default function VerticalAccordionDemo() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Vertical Accordion Demo</h1>
        
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Figma Design Implementation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Collapsed State */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Collapsed State</h3>
              <div className="flex justify-center">
                <VerticalAccordion
                  title="KT Pending"
                  count={3}
                  defaultExpanded={false}
                />
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm">
                  ✅ Text is vertical and rotated 180°<br/>
                  ✅ Chevron is facing up (rotated 90°)<br/>
                  ✅ Pill has exact Figma dimensions (24px × 97px)<br/>
                  ✅ Colors match Figma design (#D0DFF0, #274A72)
                </p>
              </div>
            </div>

            {/* Expanded State */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Expanded State</h3>
              <div className="flex justify-center">
                <VerticalAccordion
                  title="KT Pending"
                  count={3}
                  defaultExpanded={true}
                >
                  <div className="flex flex-col gap-2 ml-4">
                    {sampleDeals.map((deal) => (
                      <DealCard key={deal.id} deal={deal} />
                    ))}
                  </div>
                </VerticalAccordion>
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-green-800 text-sm">
                  ✅ Chevron rotates 180° when expanded<br/>
                  ✅ Content slides in from the left<br/>
                  ✅ Maintains vertical text orientation<br/>
                  ✅ Smooth animations throughout
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">Figma Design Features:</h3>
            <ul className="text-purple-800 text-sm space-y-1">
              <li>🎯 <strong>Exact Dimensions:</strong> 24px width × 97px height pill</li>
              <li>🎯 <strong>Vertical Text:</strong> Uses writing-mode: vertical-rl with 180° rotation</li>
              <li>🎯 <strong>Chevron Up:</strong> Button rotated 90° to face upward</li>
              <li>🎯 <strong>Figma Colors:</strong> #D0DFF0 background, #274A72 text</li>
              <li>🎯 <strong>Typography:</strong> Instrument Sans SemiBold 12px/18px</li>
            </ul>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">Technical Implementation:</h3>
            <div className="text-yellow-800 text-sm font-mono bg-yellow-100 p-2 rounded">
              <pre className="whitespace-pre-wrap">
{`// Vertical text with 180° rotation
writingMode: 'vertical-rl',
textOrientation: 'mixed',
transform: 'rotate(180deg)'

// Chevron button rotated 90° to face up
style={{ transform: 'rotate(90deg)' }}

// Exact Figma dimensions
width: '24px', height: '97px'`}
              </pre>
            </div>
          </div>

          <div className="mt-6 p-4 bg-red-50 rounded-lg">
            <h3 className="font-semibold text-red-900 mb-2">Interactive Features:</h3>
            <ul className="text-red-800 text-sm space-y-1">
              <li>🔄 <strong>Click chevron</strong> to expand/collapse content</li>
              <li>🔄 <strong>Chevron rotation</strong> indicates expanded state</li>
              <li>🔄 <strong>Smooth animations</strong> for all state changes</li>
              <li>🔄 <strong>Keyboard accessible</strong> with Enter/Space keys</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
