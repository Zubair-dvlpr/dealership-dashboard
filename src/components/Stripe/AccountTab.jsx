import { useState } from "react";
import { Button } from "../shared";

export default function AccountTab() {
  const [dealerName] = useState("CarBiz"); // locked
  const [phone, setPhone] = useState("(647)-764-7395");
  const [email, setEmail] = useState("sales@carbiz.ca");
  const [address, setAddress] = useState("611 Kingston Rd, Pickering, ON");
  const [website, setWebsite] = useState("https://carbiz.ca");
  const [maps, setMaps] = useState("");
  const [reviews, setReviews] = useState("");
  const [logo, setLogo] = useState("");

  return (
    <div className="cvx-page text-gray-100">

      {/* HEADER */}
      {/* <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Dealer Settings</h1>
        <p className="text-sm text-gray-400 max-w-xl mt-1">
          Manage your dealership profile, branding and CarValueX license.
          Your dealership name and license key are locked by CarValueX.
        </p>
      </div> */}

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1.3fr] gap-4">

        {/* LEFT CARD — Dealer Profile */}
        <div className="">
          <div className="mb-4">
            <div className="text-2xl font-semibold text-white">
              Dealer Profile
            </div>
            <div className="text-base text-gray-400 max-w-xl mt-1">
              This information powers your branded instant-offer pages,
              texts and emails.
            </div>
          </div>

          <div className="flex flex-col gap-4">

            {/* Locked Dealership Name */}
            <div>
              <label className="text-base text-gray-300">
                Dealership Name <span className="text-gray-500">(locked)</span>
              </label>
              <input
                type="text"
                value={dealerName}
                readOnly
                className="w-full mt-1 px-3 py-2 rounded-xl bg-[#020617] border border-dashed border-gray-800 text-gray-400 cursor-default"
              />
              <p className="text-[12px] text-gray-500 mt-1">
                To change the legal store name, contact CarValueX support.
              </p>
            </div>

            {/* Phone */}
            <div>
              <label className="text-base text-gray-300">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-[#020617] border border-gray-800 text-gray-200"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-base text-gray-300">Primary Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-[#020617] border border-gray-800 text-gray-200"
              />
              <p className="text-[12px] text-gray-500 mt-1">
                Used for new offers, bookings and billing receipts.
              </p>
            </div>

            {/* Address */}
            <div>
              <label className="text-base text-gray-300">Showroom Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-[#020617] border border-gray-800 text-gray-200"
              />
            </div>

            {/* Website URL */}
            <div>
              <label className="text-base text-gray-300">Website URL</label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-[#020617] border border-gray-800 text-gray-200"
              />
            </div>

            {/* Google Maps */}
            <div>
              <label className="text-base text-gray-300">Google Maps Link</label>
              <input
                type="url"
                placeholder="https://maps.google.com/?q=CarBiz+Pickering"
                value={maps}
                onChange={(e) => setMaps(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-[#020617] border border-gray-800 text-gray-200"
              />
              <p className="text-[12px] text-gray-500 mt-1">
                Used on booking confirmations & reminder texts.
              </p>
            </div>

            {/* Google Reviews */}
            <div>
              <label className="text-base text-gray-300">Google Reviews Link</label>
              <input
                type="url"
                placeholder="https://g.page/r/XXXXX/review"
                value={reviews}
                onChange={(e) => setReviews(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-[#020617] border border-gray-800 text-gray-200"
              />
              <p className="text-[12px] text-gray-500 mt-1">
                Paste your official Google Reviews URL so CarValueX can
                show your rating on selling pages.
              </p>
            </div>

            {/* Logo */}
            <div>
              <label className="text-base text-gray-300">Dealer Logo</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                  placeholder="https://…/logo.png"
                  className="flex-1 px-3 py-2 rounded-xl bg-[#020617] border border-gray-800 text-gray-200"
                />
                <button className="px-4 py-2 rounded-full border border-gray-700 text-gray-300 hover:bg-gray-800">
                  Upload
                </button>
              </div>
              <p className="text-[12px] text-gray-500 mt-1">
                Transparent PNG/SVG works best.
              </p>
            </div>

            <Button className="mt-2">Save Dealer Profile</Button>
          </div>
        </div>

        {/* RIGHT CARD — License */}
        <div className="rounded-2xl border border-[#111827] bg-[#020617] p-5">
          <div className="mb-4">
            <div className="uppercase tracking-wider text-base text-gray-400">
              CarValueX License
            </div>
            <div className="text-[12px] text-gray-500 mt-1">
              Your license powers your instant-offer pages and dashboard.
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-700 bg-green-900/20 text-green-300 text-base">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Status: Active
          </div>

          <div className="mt-3 p-3 border border-green-900 rounded-xl bg-green-950/20 text-green-200 text-base">
            <strong>License Activated</strong>
            <p>Your domain <code>https://carbiz.ca</code> is activated.</p>
            <p>Key ending in <strong>***8893</strong>.</p>
          </div>

          <div className="flex justify-between text-base mt-3">
            <span className="text-gray-400">Plan</span>
            <span className="text-gray-200 font-medium">Per-Vehicle (CarValueX)</span>
          </div>

          <div className="flex justify-between text-base mt-1">
            <span className="text-gray-400">Bound To</span>
            <span className="text-gray-200 font-medium">CarBiz – Pickering, ON</span>
          </div>

          <p className="text-[12px] text-gray-500 mt-4">
            Your license is managed by CarValueX and cannot be edited.
            To move this license to another domain, contact support.
          </p>

          <p className="text-[12px] text-gray-500 mt-3">
            Need help?  
            <a className="text-blue-300 ml-1" href="mailto:support@carvaluex.com">
              support@carvaluex.com
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
