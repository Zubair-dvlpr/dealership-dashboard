// LICENSE TABLE
export const licenseColumnData = [
  { name: 'id', title: 'Sr#' },
  { name: 'key', title: 'KEY', sorting: true },
  { name: 'domain', title: 'DOMAIN', sorting: true },

  // NEW FIELDS
  { name: 'dealershipName', title: 'DEALERSHIP NAME', sorting: true },
  { name: 'phone', title: 'PHONE', sorting: true },
  { name: 'email', title: 'EMAIL', sorting: true },
  { name: 'platform', title: 'PLATFORM', sorting: true },

  { name: 'status', title: 'STATUS', sorting: true },
  { name: 'creationDate', title: 'CREATION DATE', sorting: true },
  { name: 'action', title: 'ACTION', sorting: true }
];


export const licenseTableColumnExtensions = [
  { columnName: 'id', width: 80 },
  { columnName: 'key', width: 180 },
  { columnName: 'domain', width: 200 },

  // NEW FIELDS
  { columnName: 'dealershipName', width: 200 },
  { columnName: 'phone', width: 160 },
  { columnName: 'email', width: 230 },
  { columnName: 'platform', width: 150 },

  { columnName: 'status', width: 150 },
  { columnName: 'creationDate', width: 200 },
  { columnName: 'action', width: 150 }
];


export const licenseRowData = [
  {
    id: 1,
    key: 'LIC001',
    domain: 'example.com',
    status: 'active',
    creationDate: '2023-01-01',
    action: 'edit'
  },
  {
    id: 2,
    key: 'LIC001',
    domain: 'example.com',
    status: 'active',
    creationDate: '2023-01-01',
    action: 'edit'
  },
  {
    id: 3,
    key: 'LIC002',
    domain: 'example.com',
    status: 'active',
    creationDate: '2023-01-01',
    action: 'edit'
  },
  {
    id: 4,
    key: 'LIC002',
    domain: 'example.com',
    status: 'active',
    creationDate: '2023-01-01',
    action: 'edit'
  },
  {
    id: 5,
    key: 'LIC002',
    domain: 'example.com',
    status: 'active',
    creationDate: '2023-01-01',
    action: 'edit'
  },
  {
    id: 6,
    key: 'LIC002',
    domain: 'example.com',
    status: 'active',
    creationDate: '2023-01-01',
    action: 'edit'
  }
];


// OFFERS TABLE
export const offersColumnData = [
  { name: 'id', title: 'SR #', sorting: true },
  { name: 'domain', title: 'DOMAIN', sorting: true },
  { name: 'submitted', title: 'SUBMITTED DATE', sorting: true },
  { name: 'vehicle', title: 'VEHICLE', sorting: true },
  { name: 'kilometres', title: 'KM', sorting: true },
  { name: 'marketPrice', title: 'MARKET PRICE', sorting: true },
  { name: 'deductions', title: 'DEDUCTIONS', sorting: true },
  { name: 'finalOffer', title: 'FINAL OFFER', sorting: true },
  { name: 'profit', title: 'PROFIT', sorting: true },
  { name: 'expires', title: 'OFFER EXPIRY DATE', sorting: true },
];


export const offersTableColumnExtensions = [
  { columnName: 'id', width: 100 },               // SR #
  { columnName: 'domain', width: 200 },           // Domain
  { columnName: 'submitted', width: 200 },        // Submitted Date
  { columnName: 'vehicle', width: 280 },          // Vehicle
  { columnName: 'kilometres', width: 150 },       // KM
  { columnName: 'marketPrice', width: 200 },      // Market Price
  { columnName: 'deductions', width: 180 },       // Deductions
  { columnName: 'finalOffer', width: 200 },       // Final Offer
  { columnName: 'profit', width: 200 },           // Profit
  { columnName: 'expires', width: 200 },          // Offer Expiry Date
];


// OFFERS  TABLE
export const appointmentsColumnData = [
  { name: 'submittedDate', title: 'SUBMITTED DATE', sorting: true },
  { name: 'vehicle', title: 'VEHICLE NAME', sorting: true },
  { name: 'kilometres', title: 'KM', sorting: true },
  { name: 'median', title: 'MEDIAN PRICE', sorting: true },
  { name: 'name', title: 'DEALERSHIP NAME', sorting: true },

  { name: 'pickupType', title: 'PICKUP/DROP-OFF TYPE' },
  { name: 'booking_datetime', title: 'SCHEDULED DATE', sorting: true },
  { name: 'booking_time', title: 'TIME', sorting: true },
  { name: 'status', title: 'Status' },
  { name: 'action', title: 'ACTIONS' }
];


export const appointmentsTableColumnExtensions = [
  { columnName: 'submittedDate', width: 180 },
  { columnName: 'vehicle', width: 260 },
  { columnName: 'kilometres', width: 140 },
  { columnName: 'median', width: 160 },
  { columnName: 'name', width: 220 },

  { columnName: 'pickupType', width: 180 },
  { columnName: 'booking_datetime', width: 220 },
  { columnName: 'booking_time', width:80 },
  { columnName: 'status', width: 160 },

  { columnName: 'action', width: 150 }
];


