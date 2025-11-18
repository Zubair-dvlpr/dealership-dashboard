import React, { useState } from "react";
import Modal from ".";
import Button from "../Button";


export default function CreateLicenseModal({ isOpen, onClose, onSubmit, loading }) {
  const [form, setForm] = useState({
    dealershipName: "",
    phone: "",
    email: "",
    websiteDomain: "",
    platform: "WordPress"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(form);
    if (!form.dealershipName || !form.phone || !form.email || !form.websiteDomain)
      return alert("Please fill all fields.");

    onSubmit(form);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New License">
      <div className="space-y-4">

        <input name="dealershipName" placeholder="Dealership Name"
               value={form.dealershipName} onChange={handleChange}
               className="w-full bg-panel border p-2 rounded" />

        <input name="phone" placeholder="Phone Number"
               value={form.phone} onChange={handleChange}
               className="w-full bg-panel border p-2 rounded" />

        <input type="email" name="email" placeholder="Email Address"
               value={form.email} onChange={handleChange}
               className="w-full bg-panel border p-2 rounded" />

        <input name="websiteDomain" placeholder="Website Domain"
               value={form.websiteDomain} onChange={handleChange}
               className="w-full bg-panel border p-2 rounded" />

        <select name="platform" value={form.platform} onChange={handleChange}
                className="w-full bg-panel border p-2 rounded">
          <option value="WordPress">WordPress</option>
          <option value="Other">Other</option>
        </select>

        <Button loading={loading} className="w-full border hover:border-gray-400 transition" onClick={handleSubmit}>
          Create License
        </Button>
      </div>
    </Modal>
  );
}
