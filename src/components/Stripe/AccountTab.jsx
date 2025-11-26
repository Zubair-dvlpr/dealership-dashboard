import { useState } from 'react';
import { Button } from '../shared';

export default function AccountTab() {
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const handleProfileUpdate = e => {
    e.preventDefault();
    setProfileUpdated(true);
    setTimeout(() => setProfileUpdated(false), 3000);
  };

  const handlePasswordChange = e => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setPasswordUpdated(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowPasswordForm(false);
    setTimeout(() => setPasswordUpdated(false), 3000);
  };

  return (
    <div className='space-y-8'>
      {/* Profile Details Section */}
      <div className='bg-card border border-border rounded-lg p-6 sm:p-8'>
        <h2 className='text-xl font-semibold text-foreground mb-6'>Profile Details</h2>

        {profileUpdated && (
          <div className='mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm'>
            Profile updated successfully!
          </div>
        )}

        <form onSubmit={handleProfileUpdate} className='space-y-6'>
          {/* Full Name */}
          <div>
            <label className='block text-sm font-medium text-foreground mb-2'>Full Name</label>
            <input
              type='text'
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className='w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition'
              placeholder='Enter your full name'
            />
          </div>

          {/* Email */}
          <div>
            <label className='block text-sm font-medium text-foreground mb-2'>Email Address</label>
            <input
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition'
              placeholder='Enter your email'
            />
          </div>

          {/* Save Button */}
          <div className='flex gap-3 pt-4'>
            <Button type='submit'>Save Changes</Button>
          </div>
        </form>
      </div>

      {/* Divider */}
      <div className='border-t border-border'></div>

      {/* Change Password Section */}
      <div className='bg-card border border-border rounded-lg p-6 sm:p-8'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-semibold text-foreground'>Change Password</h2>
          {!showPasswordForm && (
            <Button
              onClick={() => setShowPasswordForm(true)}
              className='px-4 py-2 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition'
            >
              Change Password
            </Button>
          )}
        </div>

        {passwordUpdated && (
          <div className='mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm'>
            Password changed successfully!
          </div>
        )}

        {showPasswordForm && (
          <form onSubmit={handlePasswordChange} className='space-y-6'>
            {/* Current Password */}
            <div>
              <label className='block text-sm font-medium text-foreground mb-2'>
                Current Password
              </label>
              <input
                type='password'
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                className='w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition'
                placeholder='Enter current password'
                required
              />
            </div>

            {/* New Password */}
            <div>
              <label className='block text-sm font-medium text-foreground mb-2'>New Password</label>
              <input
                type='password'
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className='w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition'
                placeholder='Enter new password'
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className='block text-sm font-medium text-foreground mb-2'>
                Confirm Password
              </label>
              <input
                type='password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className='w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition'
                placeholder='Confirm new password'
                required
              />
            </div>

            {/* Action Buttons */}
            <div className='flex gap-3 pt-4'>
              <Button
                type='submit'
                className='px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
              >
                Update Password
              </Button>
              <button
                type='button'
                onClick={() => {
                  setShowPasswordForm(false);
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                }}
                className='px-6 py-2.5 border border-input text-foreground rounded-lg font-medium hover:bg-muted transition'
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
