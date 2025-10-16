import React from 'react';
import { componentStyles, colors, typography, spacing } from '../../lib/colors';

export interface DealData {
  id: string;
  name: string;
  company: string;
  amount: string;
  owner: string;
  closeDate: string;
}

interface DealCardProps {
  deal: DealData;
  className?: string;
}

export const DealCard: React.FC<DealCardProps> = ({ deal, className = '' }) => {
  return (
    <div 
      className={`rounded-md w-full transition-all duration-200 cursor-pointer group ${className}`}
      style={{
        backgroundColor: componentStyles.dealCard.backgroundColor,
        border: componentStyles.dealCard.border,
        padding: componentStyles.dealCard.padding,
        borderRadius: componentStyles.dealCard.borderRadius,
        boxShadow: componentStyles.dealCard.boxShadow
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xl }}>
        {/* Deal Name */}
        <h3 
          className="font-semibold transition-colors duration-200"
          style={{
            fontSize: typography.fontSize.sm,
            color: colors.text.primary,
            fontFamily: typography.fontFamily.sans.join(', ')
          }}
        >
          {deal.name}
        </h3>
        
        {/* Deal Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
          {/* Company */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span 
              className="font-semibold uppercase"
              style={{
                fontSize: typography.fontSize.xs,
                color: colors.text.secondary,
                letterSpacing: '0.96px',
                fontFamily: typography.fontFamily.sans.join(', ')
              }}
            >
              Company
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.xs }}>
              <div 
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: colors.text.muted,
                  borderRadius: spacing.xs,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div 
                  style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: colors.neutral[500],
                    borderRadius: '2px'
                  }}
                ></div>
              </div>
              <span 
                className="font-semibold"
                style={{
                  fontSize: '10px',
                  color: colors.text.tertiary,
                  fontFamily: typography.fontFamily.sans.join(', ')
                }}
              >
                {deal.company}
              </span>
            </div>
          </div>

          {/* Deal Amount */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span 
              className="font-semibold uppercase"
              style={{
                fontSize: '12px',
                color: '#475467',
                letterSpacing: '0.96px',
                fontFamily: '"Instrument Sans", system-ui, sans-serif'
              }}
            >
              Deal Amount
            </span>
            <span 
              className="font-semibold"
              style={{
                fontSize: '10px',
                color: '#101828',
                fontFamily: '"Instrument Sans", system-ui, sans-serif'
              }}
            >
              {deal.amount}
            </span>
          </div>

          {/* Lead Owner */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span 
              className="font-semibold uppercase"
              style={{
                fontSize: '12px',
                color: '#475467',
                letterSpacing: '0.96px',
                fontFamily: '"Instrument Sans", system-ui, sans-serif'
              }}
            >
              Lead Owner
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div 
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#d0d5dd',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div 
                  style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#6b7280',
                    borderRadius: '50%'
                  }}
                ></div>
              </div>
              <span 
                className="font-semibold"
                style={{
                  fontSize: '10px',
                  color: '#101828',
                  fontFamily: '"Instrument Sans", system-ui, sans-serif'
                }}
              >
                {deal.owner}
              </span>
            </div>
          </div>

          {/* Est Close Date */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span 
              className="font-semibold uppercase"
              style={{
                fontSize: '12px',
                color: '#475467',
                letterSpacing: '0.96px',
                fontFamily: '"Instrument Sans", system-ui, sans-serif'
              }}
            >
              Est Close Date
            </span>
            <span 
              className="font-semibold"
              style={{
                fontSize: '10px',
                color: '#101828',
                fontFamily: '"Instrument Sans", system-ui, sans-serif'
              }}
            >
              {deal.closeDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};