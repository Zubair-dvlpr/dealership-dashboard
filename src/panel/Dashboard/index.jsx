import { useEffect } from 'react';
import AnalyticsCard from '../../components/shared/AnalyticsCard';
import { useDashboardStore } from '../../store/features/dashboard/useDashboardStore';
import Spinner from '../../components/shared/Spinner';
import { MapLocations } from '../../components/Dashboard/Map';
import { AnalyticsSkelton } from '../../components/shared/Skeleton/DashboardSkelton';

export const Dashboard = () => {
  const state = useDashboardStore();

  useEffect(() => {
    state?.getAnalytics();
  }, []);

  if (state?.loading) {
    return <AnalyticsSkelton />;
  }

  return (
    <div className=''>
      <div className='w-full mx-auto'>
        {/* Metrics Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
          {state?.data?.map((metric, index) => (
            <AnalyticsCard
              key={index}
              title={metric?.title}
              value={metric?.value}
              change={metric?.change}
              changeType={metric?.changeType}
              icon={metric?.icon}
              iconColor={metric?.iconColor}
              isDomain={metric?.isDomain}
            />
          ))}
        </div>
      </div>
      <MapLocations />
    </div>
  );
};
