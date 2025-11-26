import React, { useState } from 'react';

import AccountTab from '../../components/Stripe/AccountTab';
import BillingTab from './BillingTab';

export const Profile = () => {
  const [activeTab, setActiveTab] = useState('account');
  return (
    <div className='min-h-screen bg-background'>
      {/* Tab Navigation */}
      <div className='border-b border-border bg-card'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex gap-8'>
            <button
              onClick={() => setActiveTab('account')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
                activeTab === 'account'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Account
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors  cursor-pointer ${
                activeTab === 'billing'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Billing
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className='max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8'>
        {activeTab === 'account' && <AccountTab />}
        {activeTab === 'billing' && <BillingTab />}
      </div>
    </div>
  );
};
