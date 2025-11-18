import {
  Delete,
  ExternalLink,
  Info,
  Mail,
  Phone,
  Settings,
  Trash,
  User,
} from 'lucide-react';
import Popover from '../Popover';
import { extractDomain, formatPrice } from '../../../utils/utils';
import { useState } from 'react';
import Modal from '../Modal';

// LICENSE STATUS
export const LicenseStatus = (row) => {
  const isActive = row?.row?.status;
  return (
    <span
      className={`inline-flex items-center px-2 rounded-full text-sm font-medium shadow-sm ${
        isActive
          ? 'bg-green-700 border border-panel'
          : 'bg-yellow-700 border border-panel'
      }`}
    >
      {isActive ? 'Activated' : 'Pending'}
    </span>
  );
};

// LICENSE STATUS
export const LicenseDate = (row) => {
  const creationDate = new Date(row?.row?.creationDate).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );
  // console.log("row", row.submitted);
  return <span>{creationDate ?? 'N/A'}</span>;
};

// LICENSE STATUS
export const PriceFormate = ({ number }) => {
  const formattedPrice = formatPrice(number);
  return (
    <span
      className={`inline-flex items-center px-2 rounded-full text-sm font-medium shadow-sm bg-muted/50 border border-panel/50`}
    >
      {formattedPrice ?? 'N/A'}
    </span>
  );
};

// LICENSE STATUS
export const Link = (row) => {
  if (!row?.row?.shortLink) return <span className='text-gray-400'>N/A</span>;

  const shortUrl = extractDomain(row?.row?.shortLink);
  return (
    <div className='flex items-center gap-2'>
      <span className='text-ink'>{shortUrl}</span>
      <ExternalLink
        className='w-5 h-5 cursor-pointer text-gray-600 hover:text-ink'
        onClick={() =>
          window.open(row?.row?.shortLink, '_blank', 'noopener,noreferrer')
        }
      />
    </div>
  );
};
// LICENSE STATUS
export const Action = ({ onDelete, onInfo, row }) => {
  return (
    <div className='flex gap-4 flex-row-reverse'>
      <button onClick={() => onDelete(row)}>
        <Trash className='size-5 text-red-700 cursor-pointer' />
      </button>
      <button onClick={() => onInfo(row)}>
        <Info className='size-5  cursor-pointer' />
      </button>
    </div>
  );
};

// LICENSE STATUS
export const TableActions = (row) => {
  return (
    <Popover
      content={<div className='py-6 px-2'>Inprogress</div>}
      position='bottom'
      align='right'
      width='w-[15rem]'
    >
      <Settings className='w-5 h-5 text-ink/50 cursor-pointer' />
    </Popover>
  );
};

export const ActionInfo = (row) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className='w-full ml-3'>
        <Info
          className='w-5 h-5 text-ink/50 cursor-pointer'
          onClick={() => setIsOpen(true)}
        />
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position='center'
        title={'Dealership Info'}
      >
        <div className='divide-y divide-ink border border-innk/20 rounded-md'>
          {/* Name */}
          <div className='flex items-center justify-between px-3 py-2 text-sm'>
            <div className='flex items-center gap-2'>
              <User className='w-4 h-4 text-gray-500' />
              <span className='font-medium text-ink/50'>Name</span>
            </div>
            <span className='text-ink'>{row?.row?.name || 'N/A'}</span>
          </div>

          {/* Phone */}
          <div className='flex items-center justify-between px-3 py-2 text-sm'>
            <div className='flex items-center gap-2'>
              <Phone className='w-4 h-4 text-gray-500' />
              <span className='font-medium text-ink/50'>Phone</span>
            </div>
            <span className='text-ink'>{row?.row?.phone || 'N/A'}</span>
          </div>

          {/* Email */}
          <div className='flex items-center justify-between px-3 py-2 text-sm'>
            <div className='flex items-center gap-2'>
              <Mail className='w-4 h-4 text-gray-500' />
              <span className='font-medium text-ink/50'>Email</span>
            </div>
            <span className='text-ink'>{row?.row?.email || 'N/A'}</span>
          </div>
        </div>
      </Modal>
    </>
  );
};
