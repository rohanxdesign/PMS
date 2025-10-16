'use client';

import React from 'react';
import { KanbanColumn } from '../components/ui/KanbanColumn';
import { DealData } from '../components/ui/DealCard';

// Simple test data
const testDeals: DealData[] = [
  {
    id: '1',
    name: 'Deal Name',
    company: 'Test Company',
    amount: 'INR 22,000',
    owner: 'Kshitiz Regmi',
    closeDate: 'in 2 weeks'
  }
];

export default function StylingTest() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Styling Test</h1>
        
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Testing Inline Styles</h2>
          
          {/* Test the exact Figma specs */}
          <div className="flex justify-center">
            <div 
              style={{
                width: '293px',
                height: '672px',
                padding: '12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: '8px',
                borderRadius: '12px',
                backgroundColor: '#F5F9FC',
                border: '2px solid #e5e7eb'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', width: '100%' }}>
                {/* Header */}
                <div 
                  style={{
                    padding: '3px 6px',
                    borderRadius: '4px',
                    gap: '8px',
                    backgroundColor: '#D0DFF0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span 
                    style={{
                      fontFamily: '"Instrument Sans", system-ui, sans-serif',
                      fontSize: '12px',
                      fontWeight: 600,
                      lineHeight: '18px',
                      color: '#274A72'
                    }}
                  >
                    KT Pending (1)
                  </span>
                </div>
                
                {/* Card */}
                <div 
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(208, 223, 240, 0.64)',
                    padding: '12px',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                    <h3 
                      style={{
                        fontSize: '14px',
                        color: '#1d2939',
                        fontFamily: '"Instrument Sans", system-ui, sans-serif',
                        fontWeight: 600
                      }}
                    >
                      Deal Name
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span 
                          style={{
                            fontSize: '12px',
                            color: '#475467',
                            letterSpacing: '0.96px',
                            fontFamily: '"Instrument Sans", system-ui, sans-serif',
                            fontWeight: 600,
                            textTransform: 'uppercase'
                          }}
                        >
                          Company
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <div 
                            style={{
                              width: '16px',
                              height: '16px',
                              backgroundColor: '#d0d5dd',
                              borderRadius: '4px'
                            }}
                          ></div>
                          <span 
                            style={{
                              fontSize: '10px',
                              color: '#101828',
                              fontFamily: '"Instrument Sans", system-ui, sans-serif',
                              fontWeight: 600
                            }}
                          >
                            Test Company
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">Expected Result:</h3>
            <p className="text-green-800 text-sm">
              You should see a properly styled Kanban column with the exact Figma colors and dimensions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
