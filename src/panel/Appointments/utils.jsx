import React, { useState } from "react";
import Modal from "../../components/shared/Modal";
import { useOffersStore } from "../../store/features/offers/useOffersStore";

const ALL_STATUSES = [
  "pending",
  "confirmed",
  "completed",
  "purchased",
  "not-purchased",
  "cancelled",
  "no-show",
  "rescheduled"
];

export const UpdateOfferModal = ({ open, onClose, row }) => {
  const updateStatus = useOffersStore((state) => state.updateStatus);

  const current = row?.status?.toLowerCase();
  const [newStatus, setNewStatus] = useState("");

  if (!row) return null;

  // Remove current status from dropdown
  let allowedStatuses = ALL_STATUSES.filter((s) => s !== current);

  // Custom rule: if already confirmed → hide pending & confirmed
  if (current === "confirmed") {
    allowedStatuses = allowedStatuses.filter(
      (s) => !["pending", "confirmed"].includes(s)
    );
  }

  return (
    <Modal isOpen={open} onClose={onClose} title="Update Appointment Status">
      <div className="space-y-4">

        {/* CURRENT STATUS */}
        <div>
          <label className="block text-gray-400 mb-1">Current Status</label>
          <div className="px-3 py-2 rounded-lg bg-[#23252B] text-gray-200 capitalize">
            {current}
          </div>
        </div>

        {/* UPDATE TO */}
        <div>
          <label className="block text-gray-400 mb-1">Update To</label>

          <select
            className="w-full px-3 py-2 rounded-lg bg-[#23252B] text-white border border-[#2B2D34]"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="">Select Status</option>

            {allowedStatuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            className="px-4 py-2 rounded-lg bg-gray-700 text-white"
            onClick={onClose}
          >
            Close
          </button>

          <button
            className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white"
            onClick={() => {
              if (newStatus) {
                updateStatus(row?.id, newStatus);
                onClose();
              }
            }}
          >
            Update
          </button>
        </div>
      </div>
    </Modal>
  );
};
