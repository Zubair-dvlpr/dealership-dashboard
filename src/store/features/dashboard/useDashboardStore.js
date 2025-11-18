import { create } from 'zustand';
import { BadgeDollarSign, FilePenLine, Gauge, Globe, Key, Target, Users } from 'lucide-react';
import { getAnalyticsFn } from './dashboardFns';
import { formatPrice } from '../../../utils/utils';

export const useDashboardStore = create(set => ({
  state: {
    loading: false,
    data: [],
    error: null
  },
  getAnalytics: async () => {
    set({ loading: true });
    const _data = await getAnalyticsFn();

    // CHECK
    if (_data?.success) {
      const d = _data?.data; // your analytics object

      const metrics = [
        {
          title: 'No. of Offers',
          value: d?.totalNumberOffers?.value || 0,
          change: `${d?.totalNumberOffers?.change?.toFixed() || 0}%`,
          changeType: d?.totalNumberOffers?.change >= 0 ? 'increase' : 'decrease',
          icon: Target,
          iconColor: 'bg-dark'
        },
        {
          title: '$ Value of Offers',
          value: formatPrice(d?.totalValueOffers?.value) || 0,
          change: `${d?.totalValueOffers?.change?.toFixed() || 0}%`,
          changeType: d?.totalValueOffers?.change >= 0 ? 'increase' : 'decrease',
          icon: BadgeDollarSign,
          iconColor: 'bg-dark'
        },
        {
          title: 'Activate License Keys',
          value: d?.activatedKeys?.value || 0,
          change: `${d?.activatedKeys?.change?.toFixed() || 0}%`,
          changeType: d?.activatedKeys?.change >= 0 ? 'increase' : 'decrease',
          icon: Users,
          iconColor: 'bg-dark'
        },
        {
          title: 'Active Dealerships',
          value: d?.activeDealerships?.value || 0,
          change: `${d?.activeDealerships?.change?.toFixed() || 0}%`,
          changeType: d?.activeDealerships?.change >= 0 ? 'increase' : 'decrease',
          icon: Key,
          iconColor: 'bg-dark'
        },
        {
          title: 'Best Performing Dealership',
          value: d?.worstDealership?.domain || 0,
          // subtitle: d?.bestDealership?.domain || '', // domain extra info
          change: `${d.bestDealership?.change?.toFixed() || 0}%`,
          changeType: d?.bestDealership?.change >= 0 ? 'increase' : 'decrease',
          icon: Gauge,
          iconColor: 'bg-dark',
          isDomain: true
        },
        {
          title: 'Worst Performing Dealership',
          value: d?.worstDealership?.domain || 0,
          // subtitle: d?.worstDealership?.domain || '', // domain extra info
          change: `${d?.worstDealership?.change?.toFixed() || 0}%`,
          changeType: d?.worstDealership?.change >= 0 ? 'increase' : 'decrease',
          icon: FilePenLine,
          iconColor: 'bg-dark',
          isDomain: true
        }
      ];

      set({ data: metrics, loading: false, error: null });
    } else {
      set(prev => ({ ...prev, error: error?.message, loading: false }));
    }
  }
}));
