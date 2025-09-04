
const Settings = () => {
 

    return (
      <div className="space-y-6 md:space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your account and application settings</p>
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Account Settings */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 md:p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Account Settings</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm  font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Admin User"
                    className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:border-primary focus:ring-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                  <input
                    type="email"
                    defaultValue="admin@medicare.com"
                    className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:border-primary focus:ring-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:border-primary focus:ring-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
  
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition">
                  Save Changes
                </button>
              </form>
            </div>
  
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 md:p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Password</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                  <input type="password" className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:border-primary focus:ring-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400" />
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                  <input type="password" className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:border-primary focus:ring-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400" />
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                  <input type="password" className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:border-primary focus:ring-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400" />
                </div>
  
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition">
                  Update Password
                </button>
              </form>
            </div>
          </div>
  
          
        </div>
      </div>
    );
  };
  
  export default Settings;
  