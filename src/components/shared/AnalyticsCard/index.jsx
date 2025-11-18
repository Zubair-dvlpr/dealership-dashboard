import { ExternalLink, DivideIcon as LucideIcon } from 'lucide-react';
import { extractDomain } from '../../../utils/utils';

const AnalyticsCard = ({ title, value, change, changeType, icon: Icon, iconColor, isDomain }) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'increase':
        return '↗';
      case 'decrease':
        return '↘';
      default:
        return '→';
    }
  };

  return (
    <div className='bg-panel/50 border border-border rounded-l-lg rounded-xl p-4 shadow-sm  hover:shadow-md transition-shadow duration-200'>
      <div className='flex items-center justify-between '>
        <div className='flex-1'>
          <p className='text-sm font-medium  mb-1'>{title}</p>
          {isDomain ? (
            <div className='flex items-center gap-2 mt-3'>
              <span className='text-ink text-3xl font-bold  '>
                {extractDomain(value)?.replace('https://', '') ?? 'N/A'}
              </span>
              <ExternalLink
                className='w-5 h-5 cursor-pointer text-gray-600 hover:text-ink'
                onClick={() => window.open(value, '_blank', 'noopener,noreferrer')}
              />
            </div>
          ) : (
            <p className='text-3xl font-bold  mb-2'>{value}</p>
          )}
          {!isDomain ? (
            <div className='flex items-center'>
              <span className={`text-sm font-medium ${getChangeColor()}`}>
                {getChangeIcon()} {change}
              </span>
              <span className='text-sm text-gray-500 ml-1'>vs last month</span>
            </div>
          ) : (
            <div className='py-4' />
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconColor}`}>
          <Icon className='w-6 h-6 text-white' />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
